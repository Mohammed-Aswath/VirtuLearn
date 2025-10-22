/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Placeholder email service for notifications
 * BACKEND CONTRACT: export send(to, subject, text)
 * TODO: Integrate real provider (SES/SendGrid) later
 */

async function send(to, subject, text) {
  // eslint-disable-next-line no-console
  console.log('[email.mock] to=%s subject=%s text=%s', to, subject, text);
}

module.exports = { send };


