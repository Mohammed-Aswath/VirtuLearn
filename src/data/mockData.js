// Mock data for VirtuLearn - Ready for backend integration

export const mockStudents = [
  {
    id: 'S001',
    name: 'Alex Johnson',
    email: 'alex.johnson@school.edu',
    class: 'Grade 10-A',
    avatar: '/avatars/student1.png',
    totalScore: 485,
    rank: 12
  }
];

export const mockTeachers = [
  {
    id: 'T001',
    name: 'Dr. Sarah Williams',
    email: 'sarah.williams@school.edu',
    subjects: ['Physics', 'Chemistry'],
    avatar: '/avatars/teacher1.png',
    studentsCount: 145
  }
];

export const mockExperiments = [
  {
    id: 'EXP001',
    title: 'Ohm\'s Law Verification',
    subject: 'Physics',
    description: 'Explore the relationship between voltage, current, and resistance',
    difficulty: 'Medium',
    duration: '30 mins',
    arcwareUrl: 'https://arcware.example.com/ohms-law',
    thumbnailUrl: '/experiments/ohms-law.jpg'
  },
  {
    id: 'EXP002',
    title: 'Chemical Bonding Simulation',
    subject: 'Chemistry',
    description: 'Visualize ionic and covalent bond formation in 3D',
    difficulty: 'Hard',
    duration: '45 mins',
    arcwareUrl: 'https://arcware.example.com/bonding',
    thumbnailUrl: '/experiments/bonding.jpg'
  },
  {
    id: 'EXP003',
    title: 'Plant Cell Structure',
    subject: 'Biology',
    description: 'Interactive exploration of plant cell organelles',
    difficulty: 'Easy',
    duration: '25 mins',
    arcwareUrl: 'https://arcware.example.com/plant-cell',
    thumbnailUrl: '/experiments/plant-cell.jpg'
  },
  {
    id: 'EXP004',
    title: 'Projectile Motion Lab',
    subject: 'Physics',
    description: 'Analyze trajectory and motion of projectiles',
    difficulty: 'Medium',
    duration: '35 mins',
    arcwareUrl: 'https://arcware.example.com/projectile',
    thumbnailUrl: '/experiments/projectile.jpg'
  }
];

export const mockQuizzes = [
  {
    id: 'Q001',
    title: 'Newton\'s Laws of Motion',
    subject: 'Physics',
    totalQuestions: 20,
    duration: 30,
    dueDate: '2025-11-05',
    status: 'pending',
    marksObtained: null,
    totalMarks: 100
  },
  {
    id: 'Q002',
    title: 'Chemical Reactions',
    subject: 'Chemistry',
    totalQuestions: 15,
    duration: 25,
    completedDate: '2025-10-15',
    status: 'attended',
    marksObtained: 82,
    totalMarks: 100
  },
  {
    id: 'Q003',
    title: 'Cell Biology Basics',
    subject: 'Biology',
    totalQuestions: 18,
    duration: 30,
    completedDate: '2025-10-10',
    status: 'attended',
    marksObtained: 91,
    totalMarks: 100
  },
  {
    id: 'Q004',
    title: 'Thermodynamics',
    subject: 'Physics',
    totalQuestions: 20,
    duration: 35,
    dueDate: '2025-10-01',
    status: 'missed',
    marksObtained: null,
    totalMarks: 100
  }
];

export const mockQuizAnalysis = {
  Q002: {
    strengths: [
      'Excellent understanding of balancing equations',
      'Strong grasp of reaction types',
      'Good problem-solving in stoichiometry'
    ],
    weaknesses: [
      'Need practice with redox reactions',
      'Confusion in identifying oxidation states'
    ],
    suggestions: [
      'Review oxidation-reduction concepts with examples',
      'Practice more problems on electron transfer',
      'Watch recommended videos on electrochemistry'
    ],
    topicWiseScore: [
      { topic: 'Balancing Equations', score: 95 },
      { topic: 'Reaction Types', score: 88 },
      { topic: 'Stoichiometry', score: 85 },
      { topic: 'Redox Reactions', score: 62 }
    ]
  },
  Q003: {
    strengths: [
      'Outstanding knowledge of cell structure',
      'Perfect score on organelle functions',
      'Excellent understanding of cell division'
    ],
    weaknesses: [
      'Minor confusion in plant vs animal cell differences'
    ],
    suggestions: [
      'Create a comparison chart for plant and animal cells',
      'Review cell wall and chloroplast functions'
    ],
    topicWiseScore: [
      { topic: 'Cell Structure', score: 100 },
      { topic: 'Organelles', score: 95 },
      { topic: 'Cell Division', score: 90 },
      { topic: 'Cell Types', score: 80 }
    ]
  }
};

export const mockCommunityPosts = [
  {
    id: 'POST001',
    authorId: 'T001',
    authorName: 'Dr. Sarah Williams',
    authorRole: 'teacher',
    subject: 'Physics',
    title: 'Important: Upcoming Lab Safety Guidelines',
    content: 'Students, please review the updated lab safety protocols before our next practical session. Special attention to electrical equipment handling.',
    mediaUrl: '/posts/safety-guide.pdf',
    mediaType: 'pdf',
    createdAt: '2025-10-17T10:30:00Z',
    likes: 24,
    comments: 8
  },
  {
    id: 'POST002',
    authorId: 'T001',
    authorName: 'Dr. Sarah Williams',
    authorRole: 'teacher',
    subject: 'Chemistry',
    title: 'Amazing Chemistry Demonstration Video',
    content: 'Check out this fascinating demonstration of chemical equilibrium in action. Great visual representation for exam preparation!',
    mediaUrl: 'https://youtube.com/demo123',
    mediaType: 'video',
    createdAt: '2025-10-16T14:20:00Z',
    likes: 42,
    comments: 15
  },
  {
    id: 'POST003',
    authorId: 'T002',
    authorName: 'Prof. Michael Chen',
    authorRole: 'teacher',
    subject: 'Biology',
    title: 'Photosynthesis Study Resources',
    content: 'I have compiled a comprehensive guide on photosynthesis with diagrams and practice questions. Perfect for your midterm preparation.',
    mediaUrl: '/posts/photosynthesis-guide.pdf',
    mediaType: 'pdf',
    createdAt: '2025-10-15T09:15:00Z',
    likes: 56,
    comments: 22
  }
];

export const mockExperimentLogs = [
  {
    id: 'LOG001',
    experimentId: 'EXP001',
    studentId: 'S001',
    studentName: 'Alex Johnson',
    class: 'Grade 10-A',
    completedDate: '2025-10-12',
    setup: 'Connected circuit with ammeter, voltmeter, resistor, and power supply',
    procedure: 'Varied voltage from 2V to 10V in steps of 2V. Recorded current readings at each step.',
    observation: 'Current increased linearly with voltage. Resistance remained constant at 10Ω',
    analysis: 'V/I ratio consistently equals 10, confirming Ohm\'s Law',
    conclusion: 'Ohm\'s Law verified: V = IR holds true for ohmic conductors',
    score: 95,
    feedback: 'Excellent work! Clear observations and accurate calculations.'
  },
  {
    id: 'LOG002',
    experimentId: 'EXP003',
    studentId: 'S001',
    studentName: 'Alex Johnson',
    class: 'Grade 10-A',
    completedDate: '2025-10-08',
    setup: 'Prepared microscope slide with onion peel sample',
    procedure: 'Stained with iodine solution, observed under different magnifications',
    observation: 'Cell wall, nucleus, and cytoplasm clearly visible. Cell wall appeared thick',
    analysis: 'Rectangular cells with prominent cell wall indicate plant tissue',
    conclusion: 'Successfully identified key plant cell structures',
    score: 88,
    feedback: 'Good observation skills. Could improve diagram labeling.'
  }
];

export const mockChatHistory = [
  {
    id: 'CHAT001',
    role: 'user',
    message: 'Can you explain Newton\'s third law with an example?',
    timestamp: '2025-10-17T15:30:00Z'
  },
  {
    id: 'CHAT002',
    role: 'assistant',
    message: 'Newton\'s third law states that for every action, there is an equal and opposite reaction. For example, when you push against a wall, the wall pushes back with equal force. That\'s why your hand doesn\'t go through the wall!',
    timestamp: '2025-10-17T15:30:15Z'
  },
  {
    id: 'CHAT003',
    role: 'user',
    message: 'What about rocket propulsion?',
    timestamp: '2025-10-17T15:31:00Z'
  },
  {
    id: 'CHAT004',
    role: 'assistant',
    message: 'Great question! Rockets demonstrate Newton\'s third law perfectly. The rocket expels hot gases downward (action), and the gases push the rocket upward (reaction). This works even in space where there\'s no air!',
    timestamp: '2025-10-17T15:31:20Z'
  }
];

export const mockClasses = [
  { id: 'C001', name: 'Grade 10-A', students: 35 },
  { id: 'C002', name: 'Grade 10-B', students: 32 },
  { id: 'C003', name: 'Grade 11-A', students: 28 },
  { id: 'C004', name: 'Grade 11-B', students: 30 }
];

export const subjects = ['Physics', 'Chemistry', 'Biology'];

// TODO: Replace all mock data with API calls to:
// - GET /api/students
// - GET /api/teachers
// - GET /api/experiments
// - GET /api/quizzes
// - GET /api/community/posts
// - GET /api/experiment-logs
// - POST /api/auth/login
// - POST /api/quizzes/create
// - POST /api/experiments/assign
// - POST /api/community/posts
