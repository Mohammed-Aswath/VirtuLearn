/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Gemini service proxy with rate limiting and simple queue
 * BACKEND CONTRACT: chat(userId, context, message), generateQuizFromFile(input)
 * TODO: Replace mocks with real Gemini API calls using fetch/axios
 */

let queue = { add: (fn) => Promise.resolve().then(fn) };
const geminiConfig = require('../config/gemini');
try {
  // p-queue v8 is ESM; in Jest/CommonJS it may fail to load. Fallback to a stub in that case.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const PQueue = require('p-queue').default;
  queue = new PQueue({ interval: 60 * 1000, intervalCap: geminiConfig.rateLimitPerMin });
} catch (_err) {
  // Using simple immediate queue stub (sufficient for tests / when ESM not supported)
}

/**
 * @param {string} userId
 * @param {any} context
 * @param {string} message
 */
async function chat(userId, context, message) {
  return queue.add(async () => {
    const fallback = () => ({
      messages: [
        { role: 'user', message },
        { role: 'assistant', message: `Here's a helpful explanation about: "${message}". Think about the key principles and try a related practice question.` },
      ],
      suggestion: 'Would you like a quick practice quiz?',
    });

    if (!geminiConfig.apiKey) {
      return fallback();
    }

    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), geminiConfig.timeoutMs);
      const endpoint = `${geminiConfig.endpointBase}/${encodeURIComponent(geminiConfig.model)}:generateContent?key=${geminiConfig.apiKey}`;

      const history = Array.isArray(context) ? context.slice(-6) : [];
      const contents = [
        ...history.map((m) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: String(m.message || m.text || '') }],
        })),
        { role: 'user', parts: [{ text: message }] },
      ];

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({ contents, safetySettings: [], generationConfig: { temperature: 0.8, topK: 40, topP: 0.95 } }),
      });
      clearTimeout(id);

      if (!res.ok) throw new Error(`Gemini HTTP ${res.status}`);
      const data = await res.json();
      const text =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        data?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data ||
        '';

      if (!text) return fallback();
      return {
        messages: [
          { role: 'user', message },
          { role: 'assistant', message: text },
        ],
        suggestion: 'Would you like a quick practice quiz?',
      };
    } catch (_err) {
      return fallback();
    }
  });
}

/**
 * @param {{ fileUrl?: string, prompt?: string }} input
 */
async function generateQuizFromFile(input) {
  return queue.add(async () => {
    if (!geminiConfig.apiKey) {
      // Mock quiz draft
      return {
        quizDraft: {
          title: 'Draft Quiz from AI',
          subject: 'Physics',
          questions: [
            { prompt: 'What is inertia?', choices: ['A', 'B', 'C', 'D'], correctIndex: 0 },
            { prompt: 'Unit of force?', choices: ['N', 'J', 'W', 'Pa'], correctIndex: 0 },
          ],
        },
      };
    }
    // TODO: Real implementation — similar to chat() above, use geminiConfig.model and geminiConfig.timeoutMs
    return { quizDraft: { title: 'Draft', subject: 'Physics', questions: [] } };
  });
}

module.exports = { chat, generateQuizFromFile };


