export type StudyType = 'Foundation Phase' | 'Intermediate Phase' | 'Senior Phase' | 'FET Phase' | 'University';
export type ModuleType = 'Exam' | 'Portfolio' | 'Assessment Only';

export type AssessmentStatus = 'Done' | 'In Progress' | 'Missed' | 'Incomplete';

export interface PastPaper {
  id: string;
  subject: string;
  year: number;
  month: 'Feb/Mar' | 'May/June' | 'Oct/Nov' | 'March' | 'June' | 'October' | 'November';
  paperNumber: 1 | 2 | 3;
  province?: 'Gauteng' | 'Western Cape' | 'KwaZulu-Natal' | 'Eastern Cape' | 'Free State' | 'Limpopo' | 'Mpumalanga' | 'North West' | 'Northern Cape';
  board: 'DBE' | 'IEB' | 'SACAI';
  url: string;
  memoUrl?: string;
}

export interface Assessment {
  id: string;
  title: string;
  dueDate: string;
  dueTime?: string;
  weight: number;
  markReceived?: number;
  studyUnits?: string[];
  status?: AssessmentStatus;
}

export interface UnitResource {
  id: string;
  name: string;
  type: 'file' | 'link' | 'text';
  content: string;
  timestamp: any;
}

export interface StudyUnit {
  id: string;
  unitNumber: string;
  name: string;
  completed: boolean;
  notes?: string;
  summary?: string;
  learningOutcomes?: string[];
  resources?: UnitResource[];
  flashcards?: Flashcard[];
  quiz?: Quiz;
  practiceExams?: PracticeExam[];
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  nextReview?: any;
  interval?: number; // in days
  easeFactor?: number;
}

export interface PracticeExamQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  keyConcepts?: string[];
}

export interface PracticeExam {
  id: string;
  title: string;
  questions: PracticeExamQuestion[];
  timeLimit?: number; // in minutes
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  lastScore?: number;
  completedAt?: any;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  keyConcepts?: string[];
}

export interface Quiz {
  id: string;
  questions: QuizQuestion[];
  lastScore?: number;
  completedAt?: any;
}

export interface ModuleChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: any;
}

export interface YoutubeVideo {
  id: string;
  url: string;
  title?: string;
  summary?: string;
  timestamp: any;
}

export interface VideoSlide {
  title: string;
  content: string;
  narration: string;
}

export interface Module {
  id: string;
  title: string;
  moduleType: ModuleType;
  examDate?: string;
  portfolioDate?: string;
  assessments: Assessment[];
  units?: StudyUnit[];
  yearMarkWeight?: number; // % contribution of assignments to final mark
  examWeight?: number;     // % contribution of exam/portfolio to final mark
  examMark?: number;       // mark received in exam/portfolio
  passMark?: number;       // target mark to pass (default 50)
  notes?: any;          // Extracted text from uploaded notes
  summary?: any;        // AI generated summary
  flashcards?: Flashcard[]; // AI generated flashcards
  quiz?: Quiz;             // AI generated quiz
  practiceExams?: PracticeExam[]; // AI generated practice exams
  chatHistory?: ModuleChatMessage[]; // Study chatbot history
  homeworkSolutions?: { id: string; question: string; solution: string; timestamp: any }[];
  diagrams?: { id: string; prompt: string; code: string; timestamp: any }[];
  mindMaps?: { id: string; prompt: string; code: string; timestamp: any }[];
  voiceTutorHistory?: { id: string; text: string; audioUrl?: string; language?: string; timestamp: any }[];
  masteryScore?: number;   // 0-100 progress tracking
  videoExplanationUrl?: string; // Generated video explanation
  voiceTutorEnabled?: boolean;
  youtubeVideos?: YoutubeVideo[];
  aiOverview?: string; // AI generated overview for the module card
  learningOutcomes?: string[]; // AI identified learning outcomes
  resources?: UnitResource[];
  isLanguage?: boolean; // Explicitly indicate if this is a language module
  videoSlides?: VideoSlide[];
  videoAudioUrl?: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name or emoji
  category: 'completion' | 'quiz' | 'habit' | 'social';
  unlockedAt?: any;
}

export interface StudyStats {
  currentStreak: number;
  longestStreak: number;
  totalStudyHours: number;
  quizzesCompleted: number;
  perfectScores: number;
  modulesCompleted: number;
  lastStudyDate?: any;
}

export interface UserProfile {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  institution: string;
  studentLevel: StudyType;
  yearGrade: string;
  country?: string;
  cellPhone?: string;
  dateOfBirth?: string;
  address?: string;
  defaultPassMark?: number; // Global default pass mark
  trackLogin?: boolean;
  autoUpdateTime?: boolean;
  autoSaveSettings?: boolean;
  timezone?: string;
  lastLogin?: any;
  photoURL?: string;
  bannerURL?: string;
  bio?: string;
  themeColor?: string;
  interests?: string[];
  socialLinks?: { platform: string; url: string }[];
  sharedWith?: string[]; // UIDs of users who can see this profile
  badges?: Badge[];
  studyStats?: StudyStats;
  studyPreferences?: {
    preferredStartTime: string; // "09:00"
    preferredEndTime: string;   // "21:00"
    sessionDuration: number;    // minutes
    breakDuration: number;      // minutes
  };
  curriculum?: string;
  apsSubjects?: APSSubject[];
  availability?: {
    day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
    startTime: string;
    endTime: string;
    enabled: boolean;
  }[];
  voiceTutorSettings?: {
    voiceName: 'Puck' | 'Charon' | 'Kore' | 'Fenrir' | 'Zephyr';
    speakingRate: number;
    pitch: number;
    volume: number;
  };
}

export interface Community {
  id: string;
  name: string;
  description?: string;
  category?: string;
  moduleTitle: string;
  studentLevel: string;
  members: string[];
  pinnedMessages?: string[]; // IDs of pinned messages
  resources?: { id: string; name: string; content: string; type: string; timestamp: any; addedBy: string; addedByName: string }[];
  avatarColor?: string;
  inviteCode?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: any;
}

export interface ScheduleItem {
  id: string;
  title: string;
  type: 'assignment' | 'assessment_due' | 'exam_prep' | 'exam' | 'portfolio_prep' | 'portfolio' | 'study_session';
  start: Date;
  end: Date;
  moduleId?: string;
  completed?: boolean;
}

export interface StudyLog {
  id: string;
  moduleId: string;
  unitId?: string;
  startTime: any;
  endTime: any;
  duration: number; // in minutes
  notes?: string;
  timestamp: any;
}

export interface University {
  id: string;
  name: string;
  location: string;
  website: string;
  prospectusUrl: string;
  logoUrl?: string;
  description?: string;
  scoringSystem?: 'standard' | 'uct';
  apsRequirements?: {
    course: string;
    minAps: number;
    subjects?: string[];
  }[];
}

export interface APSSubject {
  name: string;
  mark: number;
  grade11Mark?: number;
  grade12Mark?: number;
  isLanguage?: boolean;
  isMaths?: boolean;
  isLO?: boolean;
}

export interface AppState {
  profile: UserProfile | null;
  modules: Module[];
}
