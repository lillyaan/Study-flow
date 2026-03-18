import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Check,
  Plus, 
  Trash2, 
  Calendar, 
  BookOpen, 
  Settings, 
  Save, 
  RotateCcw, 
  Download, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  ShieldAlert,
  WifiOff,
  LayoutDashboard,
  Quote,
  LogOut,
  User,
  Users,
  MessageSquare,
  MoreHorizontal,
  Share2,
  FileText,
  Image as ImageIcon,
  FileSpreadsheet,
  File as FileWord,
  Send,
  Search,
  UserPlus,
  ArrowLeft,
  ArrowRight,
  Edit3,
  X,
  Award,
  Square,
  ChevronDown,
  Sparkles,
  Workflow,
  Network,
  ChevronLeft,
  ChevronRight,
  List,
  Video,
  Play,
  Pause,
  Volume1,
  Volume2,
  Mic,
  Upload,
  Paperclip,
  Link as LinkIcon,
  Type as TypeIcon,
  ExternalLink,
  Brain,
  Target,
  Layers,
  HelpCircle,
  MessageCircle,
  Youtube,
  Languages,
  TrendingUp,
  Copy,
  Info,
  Globe,
  Menu,
  Bell,
  Search as SearchIcon,
  Filter,
  Download as DownloadIcon,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Shield,
  ShieldCheck,
  Zap,
  Star,
  Heart,
  ThumbsUp,
  ThumbsDown,
  GraduationCap,
  Briefcase,
  ClipboardCheck,
  Pin,
  Linkedin,
  Github,
  Twitter,
  Bookmark,
  Activity,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';
import StudyHabitsDashboard from './components/StudyHabitsDashboard';
import UniversityPortal from './components/UniversityPortal';
import PastPapersView from './components/PastPapersView';
import { LiveTutorView, VisualsView, ResearchView } from './components/AIFeatures';

// Set worker for pdfjs
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url
).toString();

function addWavHeader(base64Data: string, sampleRate: number = 24000) {
  const binaryString = window.atob(base64Data);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  const dataSize = bytes.length;
  const header = new ArrayBuffer(44);
  const view = new DataView(header);

  // RIFF identifier
  view.setUint32(0, 0x52494646, false); // "RIFF"
  // file length
  view.setUint32(4, 36 + dataSize, true);
  // RIFF type
  view.setUint32(8, 0x57415645, false); // "WAVE"
  // format chunk identifier
  view.setUint32(12, 0x666d7420, false); // "fmt "
  // format chunk length
  view.setUint32(16, 16, true);
  // sample format (raw)
  view.setUint16(20, 1, true);
  // channel count
  view.setUint16(22, 1, true);
  // sample rate
  view.setUint32(24, sampleRate, true);
  // byte rate (sample rate * block align)
  view.setUint32(28, sampleRate * 2, true);
  // block align (channel count * bytes per sample)
  view.setUint16(32, 2, true);
  // bits per sample
  view.setUint16(34, 16, true);
  // data chunk identifier
  view.setUint32(36, 0x64617461, false); // "data"
  // data chunk length
  view.setUint32(40, dataSize, true);

  const wavBlob = new Blob([header, bytes], { type: 'audio/wav' });
  return URL.createObjectURL(wavBlob);
}

const isSchoolLevel = (level: StudyType) => ['Foundation Phase', 'Intermediate Phase', 'Senior Phase', 'FET Phase'].includes(level);

const getGradeOptions = (level: StudyType) => {
  switch (level) {
    case 'Foundation Phase': return ['Grade R', 'Grade 1', 'Grade 2', 'Grade 3'];
    case 'Intermediate Phase': return ['Grade 4', 'Grade 5', 'Grade 6'];
    case 'Senior Phase': return ['Grade 7', 'Grade 8', 'Grade 9'];
    case 'FET Phase': return ['Grade 10', 'Grade 11', 'Grade 12'];
    case 'University': return ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Honours', 'Masters', 'PhD'];
    default: return [];
  }
};

const getGradeNumber = (grade: string) => {
  const match = grade.match(/\d+/);
  return match ? parseInt(match[0]) : 0;
};

const isLanguageModule = (module: Module) => {
  if (module.isLanguage !== undefined) return module.isLanguage;
  
  const saLanguages = [
    'isiZulu', 'isiXhosa', 'Afrikaans', 'Sepedi', 'English', 'Setswana', 'Sesotho', 'Xitsonga', 'siSwati', 'Tshivenda', 'isiNdebele',
    'Zulu', 'Xhosa', 'Sotho', 'Tswana', 'Venda', 'Ndebele', 'Swati', 'Tsonga'
  ];
  const title = module.title.toLowerCase();
  return saLanguages.some(lang => title.includes(lang.toLowerCase())) || 
         title.includes('language') || 
         title.includes('linguistics');
};
import { 
  format, 
  addDays, 
  isSameDay, 
  parseISO, 
  startOfDay, 
  addMinutes, 
  isBefore, 
  isAfter,
  differenceInDays,
  setHours,
  setMinutes,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addMonths,
  subMonths,
  isToday,
  isTomorrow
} from 'date-fns';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  GoogleAuthProvider, 
  signInWithPopup,
  updateProfile,
  deleteUser
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  onSnapshot, 
  query, 
  where, 
  orderBy, 
  addDoc, 
  deleteDoc,
  serverTimestamp,
  arrayUnion,
  getDocs,
  writeBatch,
  deleteField,
  getDocFromServer
} from 'firebase/firestore';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType } from 'docx';
import { saveAs } from 'file-saver';
import { GoogleGenAI, Modality } from "@google/genai";
import { checkAndAwardBadges, updateStudyStreak, AVAILABLE_BADGES } from './services/badgeService';
import Markdown from 'react-markdown';
import mermaid from 'mermaid';

import { auth, db } from './firebase';
import { 
  AppState, 
  Module, 
  Assessment, 
  UserProfile, 
  ScheduleItem, 
  Badge,
  StudyStats,
  ModuleType, 
  StudyType,
  StudyUnit,
  UnitResource,
  Community,
  ChatMessage,
  Flashcard,
  ModuleChatMessage,
  PracticeExam,
  YoutubeVideo,
  StudyLog,
  VideoSlide,
  PastPaper
} from './types';

// --- Constants ---

const QUOTES = [
  { t: "Commit to the Lord whatever you do, and He will establish your plans.", r: "Proverbs 16:3" },
  { t: "Discipline is choosing what you want most over what you want now.", r: "Motivation" },
  { t: "Start where you are. Use what you have. Do what you can.", r: "Arthur Ashe" },
  { t: "The secret of getting ahead is getting started.", r: "Mark Twain" },
  { t: "It always seems impossible until it's done.", r: "Nelson Mandela" },
];

// --- Components ---

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
        active 
          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' 
          : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function AIErrorMessage({ message, onRetry }: { message: string, onRetry?: () => void }) {
  const getErrorInfo = (msg: string) => {
    const lowerMsg = msg.toLowerCase();
    if (lowerMsg.includes('quota') || lowerMsg.includes('429')) {
      return {
        title: "Quota Exceeded",
        description: "You've reached the free limit for AI requests. Please wait a few minutes or try again tomorrow.",
        icon: <Clock size={16} />,
        guidance: "Try simplifying your request or checking back later."
      };
    }
    if (lowerMsg.includes('safety') || lowerMsg.includes('blocked')) {
      return {
        title: "Content Filtered",
        description: "The AI couldn't process this request due to safety filters.",
        icon: <ShieldAlert size={16} />,
        guidance: "Try rephrasing your prompt or using different content."
      };
    }
    if (lowerMsg.includes('network') || lowerMsg.includes('fetch') || lowerMsg.includes('offline')) {
      return {
        title: "Connection Issue",
        description: "We're having trouble reaching the AI service right now.",
        icon: <WifiOff size={16} />,
        guidance: "Please check your internet connection and try again."
      };
    }
    if (lowerMsg.includes('api key')) {
      return {
        title: "Configuration Error",
        description: "There's an issue with the AI setup (API Key).",
        icon: <Settings size={16} />,
        guidance: "Please refresh the page or contact support if this persists."
      };
    }
    if (lowerMsg.includes('invalid')) {
      return {
        title: "Invalid Request",
        description: msg,
        icon: <AlertCircle size={16} />,
        guidance: "Please try again or contact support if this persists."
      };
    }
    return {
      title: "AI Generation Error",
      description: msg,
      icon: <AlertCircle size={16} />,
      guidance: "An unexpected error occurred while generating content."
    };
  };

  const info = getErrorInfo(message);

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-5 bg-red-50 text-red-600 rounded-3xl border border-red-100 shadow-sm space-y-3"
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
          {info.icon}
        </div>
        <div className="flex-1">
          <h6 className="font-bold text-red-800 text-sm">{info.title}</h6>
          <p className="text-xs text-red-600/80 mt-0.5 leading-relaxed">{info.description}</p>
        </div>
      </div>
      
      <div className="pl-11 space-y-3">
        <p className="text-[10px] font-medium text-red-500/60 uppercase tracking-widest">Guidance: {info.guidance}</p>
        {onRetry && (
          <button 
            onClick={onRetry}
            className="px-5 py-2 bg-white text-red-600 border border-red-200 rounded-xl text-xs font-bold hover:bg-red-100 transition-all flex items-center gap-2 shadow-sm"
          >
            <RotateCcw size={12} />
            Try Again
          </button>
        )}
      </div>
    </motion.div>
  );
}

function ConfirmDialog({ isOpen, title, message, onConfirm, onClose, confirmText = "Confirm", isDanger = false }: any) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="p-8">
              <div className={`w-12 h-12 ${isDanger ? 'bg-red-50 text-red-600' : 'bg-indigo-50 text-indigo-600'} rounded-2xl flex items-center justify-center mb-6`}>
                {isDanger ? <AlertCircle size={24} /> : <CheckCircle2 size={24} />}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
              <p className="text-slate-500 leading-relaxed">{message}</p>
            </div>
            <div className="flex border-t border-slate-100">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-4 text-sm font-bold text-slate-400 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className={`flex-1 px-6 py-4 text-sm font-bold ${isDanger ? 'text-red-600' : 'text-indigo-600'} hover:bg-slate-50 transition-colors border-l border-slate-100`}
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function LogStudyModal({ isOpen, onClose, modules, onLogStudy, initialModuleId }: any) {
  const [form, setForm] = useState({
    moduleId: initialModuleId || '',
    unitId: '',
    duration: 30,
    notes: ''
  });

  useEffect(() => {
    if (initialModuleId) {
      setForm(prev => ({ ...prev, moduleId: initialModuleId }));
    }
  }, [initialModuleId]);

  const selectedModule = modules.find((m: any) => m.id === form.moduleId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.moduleId) return;

    const endTime = new Date();
    const startTime = new Date(endTime.getTime() - form.duration * 60000);

    await onLogStudy({
      moduleId: form.moduleId,
      unitId: form.unitId || undefined,
      startTime,
      endTime,
      duration: form.duration,
      notes: form.notes
    });

    onClose();
    setForm({ moduleId: '', unitId: '', duration: 30, notes: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl"
      >
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-indigo-600 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Clock size={20} />
            </div>
            <h3 className="text-xl font-bold">Log Study Session</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-all">
            <Plus size={24} className="rotate-45" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select Module</label>
            <select 
              required
              value={form.moduleId}
              onChange={(e) => setForm({ ...form, moduleId: e.target.value, unitId: '' })}
              className="w-full bg-slate-50 border-none rounded-2xl px-4 py-4 text-sm font-bold focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Choose a module...</option>
              {modules.map((m: any) => (
                <option key={m.id} value={m.id}>{m.title}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Unit (Optional)</label>
            <select 
              value={form.unitId}
              onChange={(e) => setForm({ ...form, unitId: e.target.value })}
              className="w-full bg-slate-50 border-none rounded-2xl px-4 py-4 text-sm font-bold focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
              disabled={!form.moduleId}
            >
              <option value="">Select a unit...</option>
              {selectedModule?.units?.map((u: any) => (
                <option key={u.id} value={u.id}>{u.unitNumber}: {u.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Duration</label>
              <div className="relative">
                <input 
                  type="number"
                  required
                  min="1"
                  value={form.duration}
                  onChange={(e) => setForm({ ...form, duration: parseInt(e.target.value) || 0 })}
                  className="w-full bg-slate-50 border-none rounded-2xl px-4 py-4 text-sm font-bold focus:ring-2 focus:ring-indigo-500 pr-12"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">min</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Date</label>
              <div className="w-full bg-slate-50 border-none rounded-2xl px-4 py-4 text-sm font-bold text-slate-400">
                Today
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Notes</label>
            <textarea 
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="What did you focus on during this session?"
              className="w-full bg-slate-50 border-none rounded-2xl px-4 py-4 text-sm font-bold focus:ring-2 focus:ring-indigo-500 h-24 resize-none"
            />
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-2"
            >
              <Check size={18} />
              Save Study Session
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [activeCommunity, setActiveCommunity] = useState<Community | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sharedProfiles, setSharedProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function testConnection() {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if (error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration. The client is offline.");
        }
      }
    }
    testConnection();
  }, []);

  const [activeTab, setActiveTab] = useState<'dashboard' | 'modules' | 'schedule' | 'marks' | 'communities' | 'sharing' | 'settings' | 'virtual_classroom' | 'youtube' | 'analytics' | 'university_portal' | 'past_papers'>('dashboard');
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [studyLogs, setStudyLogs] = useState<StudyLog[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [scheduleError, setScheduleError] = useState<string | null>(null);
  const [isAiTutorOpen, setIsAiTutorOpen] = useState(true);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isLogStudyModalOpen, setIsLogStudyModalOpen] = useState(false);
  const [selectedLogModuleId, setSelectedLogModuleId] = useState<string | null>(null);
  const [editingScheduleItem, setEditingScheduleItem] = useState<ScheduleItem | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    confirmText?: string;
    isDanger?: boolean;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
    confirmText: 'Confirm',
    isDanger: false
  });

  const confirmAction = (title: string, message: string, onConfirm: () => void, confirmText: string = "Confirm", isDanger: boolean = false) => {
    setConfirmDialog({
      isOpen: true,
      title,
      message,
      onConfirm,
      confirmText,
      isDanger
    });
  };

  // Study Streak Tracking
  useEffect(() => {
    if (user && profile) {
      const updatedStats = updateStudyStreak(profile.studyStats);
      const lastStudyDateStr = profile.studyStats?.lastStudyDate ? 
        (typeof profile.studyStats.lastStudyDate === 'string' ? profile.studyStats.lastStudyDate : profile.studyStats.lastStudyDate.toDate?.()?.toISOString() || profile.studyStats.lastStudyDate.toISOString?.() || String(profile.studyStats.lastStudyDate)) 
        : null;
      
      const todayStr = new Date().toDateString();
      const lastStudyDayStr = lastStudyDateStr ? new Date(lastStudyDateStr).toDateString() : null;

      if (todayStr !== lastStudyDayStr) {
        const { newBadges } = checkAndAwardBadges(profile, updatedStats);
        updateDoc(doc(db, 'users', user.uid), {
          studyStats: {
            ...updatedStats,
            lastStudyDate: serverTimestamp()
          },
          badges: [...(profile.badges || []), ...newBadges]
        });
      }
    }
  }, [user, profile?.uid]);

  // Auth State
  useEffect(() => {
    let unsubscribeSchedule: (() => void) | undefined;
    let unsubscribeStudyLogs: (() => void) | undefined;
    let unsubscribeModules: (() => void) | undefined;
    let unsubscribeSharedProfiles: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUser(u);
        const p = await fetchProfile(u.uid);
        if (p?.trackLogin) {
          await updateDoc(doc(db, 'users', u.uid), {
            lastLogin: serverTimestamp()
          });
        }
        unsubscribeModules = fetchModules(u.uid);
        unsubscribeSharedProfiles = fetchSharedProfiles(u.uid);
        unsubscribeSchedule = fetchSchedule(u.uid);
        unsubscribeStudyLogs = fetchStudyLogs(u.uid);
      } else {
        setUser(null);
        setProfile(null);
        setModules([]);
        setSchedule([]);
        setStudyLogs([]);
        if (unsubscribeSchedule) unsubscribeSchedule();
        if (unsubscribeStudyLogs) unsubscribeStudyLogs();
        if (unsubscribeModules) unsubscribeModules();
        if (unsubscribeSharedProfiles) unsubscribeSharedProfiles();
      }
      setLoading(false);
    });
    return () => {
      unsubscribeAuth();
      if (unsubscribeSchedule) unsubscribeSchedule();
      if (unsubscribeStudyLogs) unsubscribeStudyLogs();
      if (unsubscribeModules) unsubscribeModules();
      if (unsubscribeSharedProfiles) unsubscribeSharedProfiles();
    };
  }, []);

  // Data Fetching
  const fetchSchedule = (uid: string) => {
    const q = query(collection(db, 'users', uid, 'schedule'), orderBy('start', 'asc'));
    return onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
        start: doc.data().start.toDate(),
        end: doc.data().end.toDate()
      })) as ScheduleItem[];
      setSchedule(items);
    });
  };

  const fetchStudyLogs = (uid: string) => {
    const q = query(collection(db, 'users', uid, 'studyLogs'), orderBy('timestamp', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const logs = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
        startTime: doc.data().startTime.toDate(),
        endTime: doc.data().endTime.toDate()
      })) as StudyLog[];
      setStudyLogs(logs);
    });
  };

  const fetchProfile = async (uid: string) => {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data() as UserProfile;
      setProfile(data);
      return data;
    }
    return null;
  };

  const fetchModules = (uid: string) => {
    const q = collection(db, 'users', uid, 'modules');
    return onSnapshot(q, (snapshot) => {
      const mods: Module[] = [];
      snapshot.forEach((doc) => {
        mods.push({ id: doc.id, ...doc.data() } as Module);
      });
      setModules(mods);
    });
  };

  const fetchSharedProfiles = (uid: string) => {
    const q = query(collection(db, 'users'), where('sharedWith', 'array-contains', uid));
    return onSnapshot(q, (snapshot) => {
      const profiles: UserProfile[] = [];
      snapshot.forEach((doc) => {
        profiles.push(doc.data() as UserProfile);
      });
      setSharedProfiles(profiles);
    });
  };

  // Community & Chat
  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'communities'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const comms: Community[] = [];
      snapshot.forEach((doc) => {
        comms.push({ id: doc.id, ...doc.data() } as Community);
      });
      setCommunities(comms);
    });
    return unsubscribe;
  }, [user]);

  useEffect(() => {
    if (!activeCommunity) return;
    const q = query(
      collection(db, 'communities', activeCommunity.id, 'messages'),
      orderBy('timestamp', 'asc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: ChatMessage[] = [];
      snapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() } as ChatMessage);
      });
      setMessages(msgs);
    });
    return unsubscribe;
  }, [activeCommunity]);

  // Schedule Generation
  useEffect(() => {
    if (modules.length > 0) {
      generateSchedule();
    }
  }, [modules]);

  const generateSchedule = () => {
    const newSchedule: ScheduleItem[] = [];
    const today = startOfDay(new Date());
    
    modules.forEach(module => {
      if (module.moduleType === 'Exam' && module.examDate) {
        const examDate = parseISO(module.examDate);
        newSchedule.push({
          id: crypto.randomUUID(),
          title: `${module.title} - Exam`,
          type: 'exam',
          start: examDate,
          end: addMinutes(examDate, 180),
          moduleId: module.id
        });
      }

      if (module.moduleType === 'Portfolio' && module.portfolioDate) {
        const portfolioDate = parseISO(module.portfolioDate);
        newSchedule.push({
          id: crypto.randomUUID(),
          title: `${module.title} - Portfolio Submission`,
          type: 'portfolio',
          start: portfolioDate,
          end: addMinutes(portfolioDate, 60),
          moduleId: module.id
        });
      }

      module.assessments?.forEach(assessment => {
        if (!assessment.dueDate) return;
        let dueDate = parseISO(assessment.dueDate);
        
        if (assessment.dueTime) {
          const [hours, minutes] = assessment.dueTime.split(':').map(Number);
          if (!isNaN(hours) && !isNaN(minutes)) {
            dueDate = setHours(setMinutes(dueDate, minutes), hours);
          }
        } else {
          // Default to end of day if no time is set
          dueDate = setHours(setMinutes(dueDate, 59), 23);
        }

        newSchedule.push({
          id: crypto.randomUUID(),
          title: `${module.title} - ${assessment.title} Due`,
          type: 'assessment_due',
          start: dueDate,
          end: addMinutes(dueDate, 30),
          moduleId: module.id
        });

        const daysUntil = differenceInDays(dueDate, today);
        if (daysUntil > 0) {
          const sessions = Math.min(daysUntil, 5);
          for (let i = 1; i <= sessions; i++) {
            const studyDate = addDays(dueDate, -i);
            if (isAfter(studyDate, today)) {
              newSchedule.push({
                id: crypto.randomUUID(),
                title: `${module.title} Study Session`,
                type: 'study_session',
                start: setHours(setMinutes(studyDate, 0), 19),
                end: setHours(setMinutes(studyDate, 0), 20),
                moduleId: module.id
              });
            }
          }
        }
      });
    });

    newSchedule.sort((a, b) => a.start.getTime() - b.start.getTime());
    setSchedule(newSchedule);
  };

  const generateSmartSchedule = async () => {
    if (!profile || modules.length === 0) return;
    setIsGenerating(true);
    setScheduleError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const model = "gemini-3.1-pro-preview";
      
      const prompt = `
        As an expert academic planner, generate a detailed study timetable for the next 14 days.
        
        User Profile:
        - Level: ${profile.studentLevel}
        - Preferred Study Hours: ${profile.studyPreferences?.preferredStartTime || '09:00'} to ${profile.studyPreferences?.preferredEndTime || '21:00'}
        - Session Duration: ${profile.studyPreferences?.sessionDuration || 60} minutes
        - Break Duration: ${profile.studyPreferences?.breakDuration || 15} minutes
        - Weekly Availability (Days of the week): ${JSON.stringify(profile.availability || [])}
        
        Modules and Assessments:
        ${JSON.stringify(modules.map(m => ({
          id: m.id,
          title: m.title,
          type: m.moduleType,
          examDate: m.examDate,
          portfolioDate: m.portfolioDate,
          assessments: m.assessments.map(a => ({ title: a.title, dueDate: a.dueDate, weight: a.weight }))
        })))}
        
        Current Date: ${format(new Date(), 'yyyy-MM-dd')}
        
        Rules:
        1. Prioritize assessments with earlier due dates and higher weights.
        2. ONLY schedule study sessions during the "Weekly Availability" slots that are enabled. If none are enabled, use the "Preferred Study Hours" daily.
        3. For modules with an "Exam" type, schedule "exam_prep" sessions starting at least 7 days before the examDate.
        4. For modules with a "Portfolio" type, schedule "portfolio_prep" sessions regularly leading up to the portfolioDate.
        5. Explicitly schedule dedicated time blocks for:
           - Working on specific assignments (type: 'assignment')
           - Preparing for upcoming exams (type: 'exam_prep')
           - Working on portfolios (type: 'portfolio_prep')
        6. Include general study sessions (type: 'study_session') for ongoing module work.
        7. Include breaks of approximately ${profile.studyPreferences?.breakDuration || 15} minutes between sessions.
        8. Study sessions should be approximately ${profile.studyPreferences?.sessionDuration || 60} minutes long.
        9. Return ONLY a JSON array of objects with: { title, type, start (ISO string), end (ISO string), moduleId (optional) }.
      `;

      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });

      if (!response.text) {
        throw new Error("AI failed to generate a study schedule. Please try again.");
      }

      const aiSchedule = JSON.parse(response.text);
      if (!Array.isArray(aiSchedule) || aiSchedule.length === 0) {
        throw new Error("AI generated an empty or invalid schedule. Please try again.");
      }

      const batch = writeBatch(db);
      
      // Clear existing schedule for a fresh start
      const existingDocs = await getDocs(collection(db, 'users', user.uid, 'schedule'));
      existingDocs.forEach(d => batch.delete(d.ref));

      aiSchedule.forEach((item: any) => {
        const docRef = doc(collection(db, 'users', user.uid, 'schedule'));
        batch.set(docRef, {
          ...item,
          start: new Date(item.start),
          end: new Date(item.end)
        });
      });
      
      await batch.commit();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error: any) {
      console.error("AI Generation Error:", error);
      setScheduleError(`Failed to generate smart timetable: ${error.message || 'Unknown error'}. Please check your connection and try again.`);
    } finally {
      setIsGenerating(false);
    }
  };

  // --- Handlers ---

  const handleAddSchedule = async (item: Omit<ScheduleItem, 'id'>) => {
    if (!user) return;
    await addDoc(collection(db, 'users', user.uid, 'schedule'), item);
  };

  const handleEditSchedule = async (id: string, updates: Partial<ScheduleItem>) => {
    if (!user) return;
    try {
      await updateDoc(doc(db, 'users', user.uid, 'schedule', id), updates);
    } catch (error: any) {
      if (error.code === 'not-found') {
        console.warn("Schedule item not found, skipping update:", id);
      } else {
        throw error;
      }
    }
  };

  const handleDeleteSchedule = async (id: string) => {
    if (!user) return;
    confirmAction(
      "Delete Schedule Item",
      "Are you sure you want to remove this item from your timetable? This action cannot be undone.",
      async () => {
        await deleteDoc(doc(db, 'users', user.uid, 'schedule', id));
      }
    );
  };

  const handleLogout = () => signOut(auth);

  const handleShareApp = () => {
    const appUrl = window.location.origin;
    if (navigator.share) {
      navigator.share({
        title: 'Pfunzo AI',
        text: 'Check out Pfunzo AI - the ultimate AI-powered study companion!',
        url: appUrl,
      }).catch(err => {
        console.error("Error sharing:", err);
        copyToClipboard(appUrl);
      });
    } else {
      copyToClipboard(appUrl);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    });
  };

  const handleAddModule = async () => {
    if (!user) return;
    const newMod = {
      title: 'New Module',
      moduleType: 'Exam',
      assessments: [],
      units: []
    };
    await addDoc(collection(db, 'users', user.uid, 'modules'), newMod);
  };

  const handleUpdateModule = async (id: string, updates: any) => {
    if (!user || !profile) return;
    await updateDoc(doc(db, 'users', user.uid, 'modules', id), updates);
    
    // Check for module completion badge
    if (updates.units) {
      const allCompleted = updates.units.every((u: any) => u.completed);
      if (allCompleted) {
        const stats = profile.studyStats || {
          currentStreak: 0,
          longestStreak: 0,
          totalStudyHours: 0,
          quizzesCompleted: 0,
          perfectScores: 0,
          modulesCompleted: 0,
          lastStudyDate: null
        };
        
        const updatedStats = {
          ...stats,
          modulesCompleted: stats.modulesCompleted + 1
        };
        
        const { newBadges } = checkAndAwardBadges(profile, updatedStats);
        await updateDoc(doc(db, 'users', user.uid), {
          badges: [...(profile.badges || []), ...newBadges],
          studyStats: updatedStats
        });
      }
    }
  };

  const handleLogStudy = async (log: Omit<StudyLog, 'id' | 'timestamp'>) => {
    if (!user) return;
    try {
      await addDoc(collection(db, 'users', user.uid, 'studyLogs'), {
        ...log,
        timestamp: serverTimestamp()
      });
      
      // Update total study hours in stats
      if (profile) {
        const currentStats = profile.studyStats || {
          currentStreak: 0,
          longestStreak: 0,
          totalStudyHours: 0,
          quizzesCompleted: 0,
          perfectScores: 0,
          modulesCompleted: 0,
          lastStudyDate: null
        };
        
        const updatedStats = {
          ...currentStats,
          totalStudyHours: currentStats.totalStudyHours + (log.duration / 60)
        };
        
        await updateDoc(doc(db, 'users', user.uid), {
          studyStats: updatedStats
        });
      }
    } catch (error) {
      console.error("Error logging study session:", error);
    }
  };

  const handleDeleteLog = async (id: string) => {
    if (!user || !profile) return;
    confirmAction(
      "Delete Study Log",
      "Are you sure you want to delete this study log? Your total study hours will be updated accordingly.",
      async () => {
        const logToDelete = studyLogs.find(l => l.id === id);
        if (logToDelete) {
          await deleteDoc(doc(db, 'users', user.uid, 'studyLogs', id));
          
          // Update total study hours in stats
          const currentStats = profile.studyStats || {
            currentStreak: 0,
            longestStreak: 0,
            totalStudyHours: 0,
            quizzesCompleted: 0,
            perfectScores: 0,
            modulesCompleted: 0,
            lastStudyDate: null
          };
          
          const updatedStats = {
            ...currentStats,
            totalStudyHours: Math.max(0, currentStats.totalStudyHours - (logToDelete.duration / 60))
          };
          
          await updateDoc(doc(db, 'users', user.uid), {
            studyStats: updatedStats
          });
        }
      }
    );
  };

  const handleUpdateUnit = async (moduleId: string, unitId: string, updates: any) => {
    const module = modules.find(m => m.id === moduleId);
    if (!module || !module.units) return;

    const updatedUnits = module.units.map(u => 
      u.id === unitId ? { ...u, ...updates } : u
    );

    await handleUpdateModule(moduleId, { units: updatedUnits });
  };

  const handleUpdateStats = async (statsUpdate: Partial<StudyStats>) => {
    if (!user || !profile) return;
    const currentStats = profile.studyStats || {
      currentStreak: 0,
      longestStreak: 0,
      totalStudyHours: 0,
      quizzesCompleted: 0,
      perfectScores: 0,
      modulesCompleted: 0,
      lastStudyDate: null
    };
    
    const updatedStats = { ...currentStats, ...statsUpdate };
    const { newBadges } = checkAndAwardBadges(profile, updatedStats);
    
    await updateDoc(doc(db, 'users', user.uid), {
      studyStats: updatedStats,
      badges: [...(profile.badges || []), ...newBadges]
    });
  };

  const handleRemoveModule = async (id: string) => {
    if (!user) return;
    confirmAction(
      "Delete Module",
      "Are you sure you want to delete this module? All associated assessments and study units will be permanently removed.",
      async () => {
        await deleteDoc(doc(db, 'users', user.uid, 'modules', id));
      }
    );
  };

  const handleSendMessage = async (text: string) => {
    if (!user || !activeCommunity || !text.trim()) return;
    await addDoc(collection(db, 'communities', activeCommunity.id, 'messages'), {
      senderId: user.uid,
      senderName: profile?.username || user.email,
      text,
      timestamp: serverTimestamp()
    });
  };

  const handleJoinCommunity = async (commId: string) => {
    if (!user) return;
    await updateDoc(doc(db, 'communities', commId), {
      members: arrayUnion(user.uid)
    });
  };

  const handlePinMessage = async (commId: string, message: ChatMessage) => {
    if (!user) return;
    await updateDoc(doc(db, 'communities', commId), {
      pinnedMessages: arrayUnion({
        id: message.id,
        text: message.text,
        senderName: message.senderName,
        timestamp: message.timestamp
      })
    });
  };

  const handleAddResource = async (commId: string, resource: { title: string, url: string, type: 'link' | 'file' }) => {
    if (!user) return;
    await updateDoc(doc(db, 'communities', commId), {
      resources: arrayUnion({
        id: crypto.randomUUID(),
        ...resource,
        addedBy: user.uid,
        addedAt: serverTimestamp()
      })
    });
  };

  const handleSaveResourceToModule = async (moduleId: string, resource: any) => {
    try {
      const moduleRef = doc(db, 'modules', moduleId);
      const module = modules.find(m => m.id === moduleId);
      if (!module) return;

      const updatedResources = [
        ...(module.resources || []),
        {
          id: Math.random().toString(36).substr(2, 9),
          name: resource.title || resource.name,
          type: resource.type,
          content: resource.url || resource.content,
          timestamp: Date.now()
        }
      ];

      await updateDoc(moduleRef, { resources: updatedResources });
      confirmAction("Saved!", `Successfully saved "${resource.title || resource.name}" to ${module.title}`, () => {});
    } catch (error) {
      console.error("Error saving resource to module:", error);
    }
  };

  const handleShareProfile = async (friendEmail: string) => {
    if (!user) return;
    const q = query(collection(db, 'users'), where('email', '==', friendEmail));
    const snap = await getDocs(q);
    if (!snap.empty) {
      const friendId = snap.docs[0].id;
      await updateDoc(doc(db, 'users', user.uid), {
        sharedWith: arrayUnion(friendId)
      });
      alert("Profile shared successfully!");
    } else {
      alert("User not found.");
    }
  };

  // --- Export Functions ---

  const exportToPDF = async () => {
    const element = document.getElementById('export-area');
    if (!element) return;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('Pfunzo_Plan.pdf');
  };

  const exportToPNG = async () => {
    const element = document.getElementById('export-area');
    if (!element) return;
    const canvas = await html2canvas(element);
    const link = document.createElement('a');
    link.download = 'Pfunzo_Plan.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    
    // Modules Sheet
    const moduleData = modules.map(m => ({
      Module: m.title,
      Type: m.moduleType,
      ExamDate: m.examDate || 'N/A',
      Assessments: m.assessments?.map(a => `${a.title} (${a.dueDate}${a.dueTime ? ' @ ' + a.dueTime : ''})`).join(', ')
    }));
    const wsModules = XLSX.utils.json_to_sheet(moduleData);
    XLSX.utils.book_append_sheet(wb, wsModules, "Modules");

    // Schedule Sheet
    const scheduleData = schedule.map(item => ({
      Date: format(item.start, 'yyyy-MM-dd'),
      Time: format(item.start, 'HH:mm'),
      Title: item.title,
      Type: item.type.replace('_', ' ')
    }));
    const wsSchedule = XLSX.utils.json_to_sheet(scheduleData);
    XLSX.utils.book_append_sheet(wb, wsSchedule, "Timetable");

    XLSX.writeFile(wb, "Pfunzo_Full_Plan.xlsx");
  };

  const exportToWord = async () => {
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({ text: "Pfunzo Planner Report", bold: true, size: 36 }),
            ],
            spacing: { after: 400 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `Generated for: ${profile?.firstName} ${profile?.lastName}`, size: 24 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `Date: ${format(new Date(), 'PPP')}`, size: 24 }),
            ],
            spacing: { after: 600 }
          }),

          new Paragraph({
            children: [new TextRun({ text: "Modules & Assessments", bold: true, size: 28, underline: {} })],
            spacing: { before: 400, after: 200 }
          }),
          ...modules.flatMap(m => [
            new Paragraph({
              children: [new TextRun({ text: `\nModule: ${m.title} (${m.moduleType})`, bold: true, size: 24 })],
            }),
            ...(m.assessments || []).map(a => new Paragraph({
              children: [new TextRun({ text: `  • ${a.title} - Due: ${a.dueDate}${a.dueTime ? ' @ ' + a.dueTime : ''} (Weight: ${a.weight}%)`, size: 20 })],
            }))
          ]),

          new Paragraph({
            children: [new TextRun({ text: "\nTimetable / Schedule", bold: true, size: 28, underline: {} })],
            spacing: { before: 600, after: 200 }
          }),
          ...schedule.map(item => new Paragraph({
            children: [
              new TextRun({ text: `${format(item.start, 'MMM d, HH:mm')} - `, bold: true, size: 20 }),
              new TextRun({ text: `${item.title} (${item.type.replace('_', ' ')})`, size: 20 }),
            ]
          }))
        ],
      }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "Pfunzo_Report.docx");
  };

  const handleExport = async (format: string) => {
    if (format === 'pdf') await exportToPDF();
    else if (format === 'png') await exportToPNG();
    else if (format === 'excel') exportToExcel();
    else if (format === 'word') await exportToWord();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthScreen />;
  }

  if (!profile) {
    return <OnboardingScreen onComplete={() => fetchProfile(user.uid)} />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <BookOpen size={22} />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">Pfunzo</h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Academic Planner</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 overflow-hidden flex items-center justify-center">
                {profile.photoURL ? (
                  <img src={profile.photoURL} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={16} className="text-indigo-600" />
                )}
              </div>
              <span className="text-xs font-bold text-slate-600 pr-1">{profile.username}</span>
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-red-600 transition-colors"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      {showSuccess && (
        <div className="max-w-7xl mx-auto px-4 mt-6">
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="bg-emerald-50 text-emerald-600 px-6 py-4 rounded-2xl font-bold flex items-center gap-2 border border-emerald-100 shadow-sm"
          >
            <CheckCircle2 size={20} />
            Action completed successfully!
          </motion.div>
        </div>
      )}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Horizontal Navigation Menu Bar */}
        <nav className="flex flex-wrap items-center gap-2 mb-8 bg-white p-2 rounded-3xl border border-slate-100 shadow-sm overflow-x-auto no-scrollbar">
          <SidebarItem active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={<LayoutDashboard size={18} />} label="Dashboard" />
          <SidebarItem active={activeTab === 'modules'} onClick={() => setActiveTab('modules')} icon={<BookOpen size={18} />} label={isSchoolLevel(profile.studentLevel) ? 'Subjects' : 'Modules'} count={modules.length} />
          {profile.studentLevel === 'FET Phase' && (
            <SidebarItem active={activeTab === 'past_papers'} onClick={() => setActiveTab('past_papers')} icon={<FileText size={18} />} label="Past Papers" />
          )}
          
          <div className="flex items-center gap-1 bg-indigo-50/50 p-1 rounded-2xl border border-indigo-100/50">
            <SidebarItem active={activeTab === 'youtube'} onClick={() => setActiveTab('youtube')} icon={<Youtube size={18} />} label="YouTube" />
            <SidebarItem active={activeTab === 'virtual_classroom'} onClick={() => setActiveTab('virtual_classroom')} icon={<Video size={18} />} label="Live Lessons" />
          </div>

          <SidebarItem active={activeTab === 'schedule'} onClick={() => setActiveTab('schedule')} icon={<Calendar size={18} />} label="Timetable" count={schedule.length} />
          <SidebarItem active={activeTab === 'marks'} onClick={() => setActiveTab('marks')} icon={<CheckCircle2 size={18} />} label="Marks" />
          
          {isSchoolLevel(profile.studentLevel) && getGradeNumber(profile.yearGrade) >= 10 && (
            <SidebarItem active={activeTab === 'university_portal'} onClick={() => setActiveTab('university_portal')} icon={<GraduationCap size={18} />} label="Uni Portal" />
          )}

          <SidebarItem active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} icon={<Activity size={18} />} label="Analytics" />
          <SidebarItem active={activeTab === 'communities'} onClick={() => setActiveTab('communities')} icon={<Users size={18} />} label="Communities" />
          <SidebarItem active={activeTab === 'sharing'} onClick={() => setActiveTab('sharing')} icon={<Share2 size={18} />} label="Sharing" />
          <SidebarItem active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} icon={<Settings size={18} />} label="Settings" />
          
          <div className="ml-auto pl-4 border-l border-slate-100">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddModule}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-semibold transition-all shadow-lg shadow-indigo-100"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">New {isSchoolLevel(profile.studentLevel) ? 'Subject' : 'Module'}</span>
            </motion.button>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar (Profile & Quote) */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-3xl bg-indigo-50 overflow-hidden mb-4 flex items-center justify-center border-4 border-white shadow-lg">
                {profile.photoURL ? (
                  <img src={profile.photoURL} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={32} className="text-indigo-600" />
                )}
              </div>
              <h3 className="font-bold text-slate-800">{profile.firstName} {profile.lastName}</h3>
              <p className="text-xs text-slate-400 font-medium">{profile.institution}</p>
            </div>
            <QuoteCard />
            <div className="bg-indigo-600 p-6 rounded-[2rem] shadow-xl shadow-indigo-100 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-white/20 transition-all duration-500" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                  <UserPlus size={20} className="text-white" />
                </div>
                <h4 className="font-bold text-lg mb-2">Invite a Friend</h4>
                <p className="text-xs text-indigo-100 mb-6 leading-relaxed">Know someone who needs a study boost? Share Pfunzo AI with them!</p>
                <button 
                  onClick={handleShareApp}
                  className="w-full py-3 bg-white text-indigo-600 rounded-2xl text-xs font-bold hover:bg-indigo-50 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Share2 size={14} />
                  Share App Link
                </button>
              </div>
            </div>
          </aside>

          {/* Content */}
          <div className="lg:col-span-9">
            <AnimatePresence mode="wait">
              {activeTab === 'dashboard' && (
                <DashboardView 
                  profile={profile} 
                  schedule={schedule} 
                  studyLogs={studyLogs}
                  modules={modules} 
                  onExport={handleExport} 
                  setActiveTab={setActiveTab} 
                  onGenerate={generateSmartSchedule}
                  isGenerating={isGenerating}
                  error={scheduleError}
                  onLogStudy={handleLogStudy}
                  onDeleteLog={handleDeleteLog}
                  onUpdateModule={handleUpdateModule}
                  onShareApp={handleShareApp}
                />
              )}
              {activeTab === 'modules' && (
                <ModulesView 
                  profile={profile} 
                  modules={modules} 
                  communities={communities} 
                  schedule={schedule} 
                  onUpdate={handleUpdateModule} 
                  onUpdateStats={handleUpdateStats} 
                  onRemove={handleRemoveModule} 
                  onConfirm={confirmAction}
                  onLogStudy={(moduleId: string) => {
                    setSelectedLogModuleId(moduleId);
                    setIsLogStudyModalOpen(true);
                  }}
                />
              )}
              {activeTab === 'schedule' && (
                <TimetableView 
                  schedule={schedule} 
                  modules={modules}
                  onExport={handleExport} 
                  onGenerate={generateSmartSchedule} 
                  isGenerating={isGenerating}
                  error={scheduleError}
                  onAdd={(initialData?: any) => {
                    setEditingScheduleItem(initialData || null);
                    setIsScheduleModalOpen(true);
                  }}
                  onEdit={(item: ScheduleItem) => {
                    setEditingScheduleItem(item);
                    setIsScheduleModalOpen(true);
                  }}
                  onDelete={handleDeleteSchedule}
                  onUpdate={handleEditSchedule}
                />
              )}
              {activeTab === 'marks' && <MarksView modules={modules} onUpdate={handleUpdateModule} />}
              {activeTab === 'analytics' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Study Analytics & Progress</h2>
                    <p className="text-slate-500">Track your study habits, intensity, and module progress in one place.</p>
                  </div>
                  <StudyHabitsDashboard 
                    modules={modules} 
                    schedule={schedule} 
                    studyLogs={studyLogs}
                    onLogStudy={handleLogStudy}
                    onDeleteLog={handleDeleteLog}
                    onUpdateUnit={handleUpdateUnit}
                  />
                </div>
              )}
              {activeTab === 'virtual_classroom' && <VirtualClassroomView modules={modules} />}
              {activeTab === 'youtube' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">YouTube Study Resources</h2>
                    <p className="text-slate-500">Search and analyze YouTube videos for your {isSchoolLevel(profile.studentLevel) ? 'subjects' : 'modules'}.</p>
                  </div>
                  {modules.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                      <div className="lg:col-span-1 space-y-2">
                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-4">Select {isSchoolLevel(profile.studentLevel) ? 'Subject' : 'Module'}</h3>
                        <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 no-scrollbar">
                          {modules.map(m => (
                            <button
                              key={m.id}
                              onClick={() => setSelectedModuleId(m.id)}
                              className={`w-full text-left px-4 py-3 rounded-2xl transition-all ${
                                selectedModuleId === m.id 
                                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-100'
                              }`}
                            >
                              <div className="font-bold text-sm truncate">{m.title}</div>
                              <div className="text-[10px] opacity-70">{m.moduleType}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="lg:col-span-3">
                        {selectedModuleId ? (
                          <YoutubeView 
                            module={modules.find(m => m.id === selectedModuleId)!} 
                            onUpdate={(updates) => handleUpdateModule(selectedModuleId, updates)} 
                          />
                        ) : (
                          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-12 text-center">
                            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                              <Youtube className="text-indigo-600" size={32} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 mb-2">Select a {isSchoolLevel(profile.studentLevel) ? 'Subject' : 'Module'}</h3>
                            <p className="text-slate-500 max-w-xs mx-auto">Choose a {isSchoolLevel(profile.studentLevel) ? 'subject' : 'module'} from the list to manage its YouTube study resources.</p>
                          </div>
                         )}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-12 text-center">
                      <BookOpen className="text-slate-200 mx-auto mb-4" size={48} />
                      <h3 className="text-lg font-bold text-slate-800 mb-2">No {isSchoolLevel(profile.studentLevel) ? 'Subjects' : 'Modules'} Found</h3>
                      <p className="text-slate-500">Add a {isSchoolLevel(profile.studentLevel) ? 'subject' : 'module'} first to use YouTube Study Resources.</p>
                    </div>
                  )}
                </div>
              )}
              {activeTab === 'communities' && (
                <CommunitiesView 
                  communities={communities} 
                  activeCommunity={activeCommunity} 
                  setActiveCommunity={setActiveCommunity} 
                  messages={messages} 
                  onSendMessage={handleSendMessage}
                  onJoin={handleJoinCommunity}
                  onPinMessage={handlePinMessage}
                  onAddResource={handleAddResource}
                  onSaveResourceToModule={handleSaveResourceToModule}
                  user={user}
                  profile={profile}
                  modules={modules}
                  onConfirm={confirmAction}
                />
              )}
              {activeTab === 'university_portal' && <UniversityPortal profile={profile} modules={modules} onUpdateProfile={(p) => updateDoc(doc(db, 'users', user.uid), p)} />}
              {activeTab === 'sharing' && <SharingView sharedProfiles={sharedProfiles} onShare={handleShareProfile} />}
              {activeTab === 'past_papers' && (
                <PastPapersView profile={profile} />
              )}
              {activeTab === 'settings' && <SettingsView profile={profile} onUpdate={(p: any) => updateDoc(doc(db, 'users', user.uid), p)} />}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Export Utility Bar (Hidden but used for html2canvas) */}
      <div id="export-area" className="fixed -left-[9999px] top-0 w-[800px] bg-white p-10">
        <h1 className="text-3xl font-bold mb-4">Pfunzo Planner Report</h1>
        <p className="text-slate-500 mb-8">Generated for {profile.firstName} {profile.lastName} on {format(new Date(), 'PPP')}</p>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-bold border-b-2 border-indigo-600 pb-2 mb-4">{isSchoolLevel(profile.studentLevel) ? 'Subjects' : 'Modules'} & Assessments</h2>
            <div className="space-y-6">
              {modules.map(m => (
                <div key={m.id} className="border-l-4 border-indigo-100 pl-4 py-2">
                  <h3 className="text-lg font-bold">{m.title} ({m.moduleType})</h3>
                  <div className="mt-2 space-y-1">
                    {m.assessments?.map(a => (
                      <p key={a.id} className="text-sm text-slate-600">• {a.title} - Due: {a.dueDate} {a.dueTime ? `@ ${a.dueTime}` : ''} ({a.weight}%)</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold border-b-2 border-indigo-600 pb-2 mb-4">Timetable / Schedule</h2>
            <div className="space-y-2">
              {schedule.map(item => (
                <div key={item.id} className="flex gap-4 text-sm border-b border-slate-50 py-2">
                  <span className="font-mono font-bold w-32">{format(item.start, 'MMM d, HH:mm')}</span>
                  <span className="flex-1">{item.title}</span>
                  <span className="text-slate-400 italic">{item.type.replace('_', ' ')}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <AnimatePresence>
        {isScheduleModalOpen && (
          <ScheduleModal 
            item={editingScheduleItem}
            modules={modules}
            onClose={() => setIsScheduleModalOpen(false)}
            onSave={async (data: any) => {
              if (editingScheduleItem) {
                await handleEditSchedule(editingScheduleItem.id, data);
              } else {
                await handleAddSchedule(data);
              }
              setIsScheduleModalOpen(false);
            }}
          />
        )}
      </AnimatePresence>

      <LogStudyModal 
        isOpen={isLogStudyModalOpen} 
        onClose={() => {
          setIsLogStudyModalOpen(false);
          setSelectedLogModuleId(null);
        }}
        modules={modules}
        onLogStudy={handleLogStudy}
        initialModuleId={selectedLogModuleId}
      />
      <ConfirmDialog 
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        onConfirm={confirmDialog.onConfirm}
        onClose={() => setConfirmDialog(prev => ({ ...prev, isOpen: false }))}
        confirmText={confirmDialog.confirmText}
        isDanger={confirmDialog.isDanger}
      />
    </div>
  );
}

// --- Sub-Views ---

function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      if (err.code === 'auth/operation-not-allowed') {
        setError('Email/Password sign-up is not enabled in the Firebase Console. Please enable it at: https://console.firebase.google.com/project/spatial-dryad-442306-g3/authentication/providers');
      } else {
        setError(err.message);
      }
    }
  };

  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-[2rem] p-10 shadow-2xl shadow-slate-200 border border-slate-100"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-xl shadow-indigo-100">
            <BookOpen size={32} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Pfunzo</h1>
          <p className="text-slate-400 mt-2">{isLogin ? 'Welcome back to your flow' : 'Start your academic journey'}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="email" 
            placeholder="Email Address" 
            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-xs text-red-500 px-2">{error}</p>}
          <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-[0.98]">
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-4 text-slate-400 font-bold">Or continue with</span></div>
        </div>

        <button 
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-600 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all active:scale-[0.98]"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
          Google Account
        </button>

        <p className="text-center text-sm text-slate-400 mt-8">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button onClick={() => setIsLogin(!isLogin)} className="text-indigo-600 font-bold hover:underline">
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </motion.div>
    </div>
  );
}

function OnboardingScreen({ onComplete }: { onComplete: () => void }) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    institution: '',
    studentLevel: 'University' as StudyType,
    yearGrade: '1st Year'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return;

    await setDoc(doc(db, 'users', user.uid), {
      ...form,
      uid: user.uid,
      email: user.email,
      sharedWith: []
    });
    onComplete();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full bg-white rounded-[2.5rem] p-12 shadow-2xl shadow-slate-200 border border-slate-100"
      >
        <h1 className="text-3xl font-bold mb-2">Complete Your Profile</h1>
        <p className="text-slate-400 mb-10">Tell us a bit about your studies to personalize your experience.</p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputGroup label="First Name" value={form.firstName} onChange={(v) => setForm({...form, firstName: v})} required />
          <InputGroup label="Last Name" value={form.lastName} onChange={(v) => setForm({...form, lastName: v})} required />
          <InputGroup label="Username" value={form.username} onChange={(v) => setForm({...form, username: v})} required />
          <InputGroup label="School / University" value={form.institution} onChange={(v) => setForm({...form, institution: v})} required />
          <SelectGroup label="I am a..." value={form.studentLevel} options={['Foundation Phase', 'Intermediate Phase', 'Senior Phase', 'FET Phase', 'University']} onChange={(v) => setForm({...form, studentLevel: v as StudyType, yearGrade: getGradeOptions(v as StudyType)[0]})} />
          <SelectGroup label={form.studentLevel === 'University' ? 'Year of Study' : 'Grade'} value={form.yearGrade} options={getGradeOptions(form.studentLevel)} onChange={(v) => setForm({...form, yearGrade: v})} />
          
          <div className="md:col-span-2 pt-6">
            <button className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all">
              Complete Setup
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-2 text-indigo-600 font-bold bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100">
      <Clock size={16} />
      <span className="tabular-nums">{format(time, 'HH:mm:ss')}</span>
    </div>
  );
}

function ProgressMilestones({ profile }: { profile: UserProfile }) {
  const stats = profile.studyStats;
  if (!stats) return null;

  const milestones = [
    { label: 'Next Streak Milestone', current: stats.currentStreak, target: stats.currentStreak < 3 ? 3 : 7, unit: 'days' },
    { label: 'Quiz Mastery', current: stats.perfectScores, target: 5, unit: 'perfect scores' },
    { label: 'Module Completion', current: stats.modulesCompleted, target: 3, unit: 'modules' }
  ];

  return (
    <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
      <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
        <TrendingUp size={20} className="text-indigo-600" />
        Progress Milestones
      </h3>
      <div className="space-y-6">
        {milestones.map((m, i) => (
          <div key={i} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-bold text-slate-700">{m.label}</span>
              <span className="text-slate-400 font-medium">{m.current} / {m.target} {m.unit}</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((m.current / m.target) * 100, 100)}%` }}
                className="h-full bg-indigo-600 rounded-full"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BadgesSection({ profile }: { profile: UserProfile }) {
  const badges = profile.badges || [];
  const stats = profile.studyStats;

  return (
    <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Award size={20} className="text-amber-500" />
          Achievements
        </h3>
        {stats && (
          <div className="flex items-center gap-2 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
            <span className="text-xs font-bold text-amber-700">{stats.currentStreak} Day Streak 🔥</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {AVAILABLE_BADGES.map((badge) => {
          const isUnlocked = badges.some(b => b.id === badge.id);
          return (
            <div 
              key={badge.id}
              className={`flex flex-col items-center text-center p-4 rounded-2xl border transition-all ${
                isUnlocked 
                  ? 'bg-white border-amber-100 shadow-sm' 
                  : 'bg-slate-50 border-slate-100 opacity-40 grayscale'
              }`}
            >
              <div className={`text-3xl mb-2 ${isUnlocked ? 'animate-bounce-subtle' : ''}`}>
                {badge.icon}
              </div>
              <p className={`text-xs font-bold ${isUnlocked ? 'text-slate-800' : 'text-slate-400'}`}>
                {badge.title}
              </p>
              {isUnlocked && (
                <p className="text-[10px] text-amber-600 font-medium mt-1">Unlocked!</p>
              )}
            </div>
          );
        })}
      </div>
      
      {badges.length === 0 && (
        <div className="mt-6 p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-center">
          <p className="text-xs text-slate-400">Start studying to unlock your first achievement!</p>
        </div>
      )}
    </div>
  );
}

function DashboardView({ profile, schedule, studyLogs, modules, onExport, setActiveTab, onGenerate, isGenerating, error, onLogStudy, onDeleteLog, onUpdateModule, onShareApp }: any) {
  const [now, setNow] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const today = startOfDay(now);
  const hasSchedule = schedule.length > 0;

  const handleUpdateUnit = async (moduleId: string, unitId: string, completed: boolean) => {
    const module = modules.find((m: any) => m.id === moduleId);
    if (!module || !module.units) return;
    
    const newUnits = module.units.map((u: any) => 
      u.id === unitId ? { ...u, completed } : u
    );
    
    await onUpdateModule(moduleId, { units: newUnits });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-baseline gap-3">
            <h2 className="text-3xl font-bold tracking-tight">Hello, {profile.firstName}!</h2>
            <span className="text-slate-400 font-medium">{format(now, 'EEEE, MMMM do')}</span>
          </div>
          <div className="flex items-center gap-4 mt-1">
            <p className="text-slate-400">Here's what's happening in your study flow today.</p>
            {profile.autoUpdateTime && <LiveClock />}
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => onLogStudy()}
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 group"
          >
            <Plus size={18} className="group-hover:rotate-90 transition-transform" />
            Log Session
          </button>
          <ExportMenu onExport={onExport} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label={isSchoolLevel(profile.studentLevel) ? 'Subjects' : 'Modules'} value={modules.length} icon={<BookOpen className="text-blue-500" />} />
        <StatCard label="Study Streak" value={`${profile.studyStats?.currentStreak || 0} Days`} icon={<Zap className="text-amber-500" />} />
        <StatCard label="Exams" value={modules.filter((m: any) => m.moduleType === 'Exam').length} icon={<AlertCircle className="text-amber-500" />} />
        <StatCard label="Badges" value={profile.badges?.length || 0} icon={<Award className="text-purple-500" />} />
      </div>

      {error && (
        <AIErrorMessage message={error} onRetry={onGenerate} />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {/* Study Habits Visualization Component */}
          <StudyHabitsDashboard 
            modules={modules} 
            schedule={schedule} 
            studyLogs={studyLogs}
            onLogStudy={onLogStudy}
            onDeleteLog={onDeleteLog}
            onUpdateUnit={handleUpdateUnit}
          />

          <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Calendar size={20} className="text-indigo-600" />
              Upcoming Sessions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {schedule
                .filter((s: any) => isAfter(s.end, now) || isSameDay(s.start, today))
                .slice(0, 4)
                .map((item: any) => (
                <div key={item.id} className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-all group">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${
                    item.type === 'exam' ? 'bg-red-100 text-red-600' : 
                    item.type === 'assessment_due' ? 'bg-amber-100 text-amber-600' : 
                    'bg-white text-indigo-600'
                  }`}>
                    <Clock size={22} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-slate-800 truncate">{item.title}</p>
                    <p className="text-xs text-slate-400 font-medium">
                      {isToday(item.start) ? 'Today' : isTomorrow(item.start) ? 'Tomorrow' : format(item.start, 'EEEE, MMM d')} • {format(item.start, 'HH:mm')}
                    </p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg">
                      <CheckCircle2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
              {schedule.length === 0 && (
                <div className="col-span-2 text-center py-12">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar size={32} className="text-slate-200" />
                  </div>
                  <p className="text-slate-400 italic">No sessions scheduled yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-indigo-600 rounded-[2rem] p-8 text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">Study Smart</h3>
              <p className="text-indigo-100 text-sm leading-relaxed mb-6">
                {hasSchedule 
                  ? "Your personalized timetable is ready. Stay on track and reach your goals." 
                  : "Plan your study journey with AI. Generate a smart timetable based on your modules."}
              </p>
              {hasSchedule ? (
                <button 
                  onClick={() => setActiveTab('schedule')}
                  className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-indigo-50 transition-all"
                >
                  View Full Schedule
                </button>
              ) : (
                <button 
                  onClick={onGenerate}
                  disabled={isGenerating || modules.length === 0}
                  className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-indigo-50 transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {isGenerating ? <RotateCcw className="animate-spin" size={16} /> : <Sparkles size={16} />}
                  {isGenerating ? "Generating..." : "Generate Schedule"}
                </button>
              )}
            </div>
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          </div>

          {isSchoolLevel(profile.studentLevel) && getGradeNumber(profile.yearGrade) >= 10 && (
            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-indigo-100 transition-all duration-500" />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                  <GraduationCap size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">APS Calculators</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-6">
                  Easily check your APS score and see which universities you qualify for. Explore APS calculators for all South African universities in one place. Perfect for Grade 10 to 12 learners planning their future.
                </p>
                <button 
                  onClick={() => setActiveTab('university_portal')}
                  className="w-full py-3 bg-indigo-600 text-white rounded-2xl text-xs font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2"
                >
                  Explore Uni Portal
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          <BadgesSection profile={profile} />

          <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <ProgressItem label="Study Progress" value={65} color="bg-indigo-600" />
              <ProgressItem label="Assignments" value={40} color="bg-emerald-500" />
              <ProgressItem label="Exam Prep" value={20} color="bg-amber-500" />
            </div>
          </div>

          <ProgressMilestones profile={profile} />
        </div>
      </div>
    </motion.div>
  );
}

function ModulesView({ profile, modules, communities, schedule, onUpdate, onUpdateStats, onRemove, onConfirm, onLogStudy }: any) {
  const [filter, setFilter] = useState<string>('all');
  const [moduleDetailTab, setModuleDetailTab] = useState<'ai_suite' | 'diagrams' | 'youtube' | 'live_lessons' | 'live_tutor' | 'visuals' | 'research'>('ai_suite');
  const [viewMode, setViewMode] = useState<'list' | 'translator'>('list');

  const filteredModules = filter === 'all' 
    ? modules 
    : modules.filter((m: any) => m.id === filter);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {filter !== 'all' && (
            <button 
              onClick={() => { setFilter('all'); setViewMode('list'); }}
              className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-400 hover:text-slate-600"
              title={`Back to all ${isSchoolLevel(profile.studentLevel) ? 'subjects' : 'modules'}`}
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <h2 className="text-2xl font-bold">
            {filter === 'all' ? (viewMode === 'list' ? `Your ${isSchoolLevel(profile.studentLevel) ? 'Subjects' : 'Modules'}` : 'Academic Translator') : modules.find((m: any) => m.id === filter)?.title}
          </h2>
        </div>
        
        <div className="flex items-center gap-3">
          {filter === 'all' && (
            <div className="flex bg-white p-1 rounded-xl border border-slate-100 shadow-sm mr-2">
              <button 
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${viewMode === 'list' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                <BookOpen size={14} />
                {isSchoolLevel(profile.studentLevel) ? 'Subjects' : 'Modules'}
              </button>
              <button 
                onClick={() => setViewMode('translator')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${viewMode === 'translator' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                <Languages size={14} />
                Translator
              </button>
            </div>
          )}
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select:</span>
          <select 
            value={filter}
            onChange={(e) => { setFilter(e.target.value); setViewMode('list'); }}
            className="bg-white border border-slate-100 rounded-xl px-4 py-2 text-sm font-bold text-slate-600 shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all cursor-pointer"
          >
            <option value="all">All {isSchoolLevel(profile.studentLevel) ? 'Subjects' : 'Modules'}</option>
            {modules.map((m: any) => (
              <option key={m.id} value={m.id}>{m.title}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filter === 'all' && viewMode === 'translator' ? (
          <TranslatorView />
        ) : (
          <>
            {filteredModules.map((module: any) => (
              <ModuleCard 
                key={module.id} 
                module={module} 
                profile={profile}
                modules={modules}
                communities={communities}
                schedule={schedule}
                onUpdate={(u: any) => onUpdate(module.id, u)} 
                onRemove={() => onRemove(module.id)}
                onConfirm={onConfirm}
                onViewDetails={() => setFilter(module.id)}
                onLogStudy={() => onLogStudy(module.id)}
                isDetailed={filter !== 'all'}
              />
            ))}
          </>
        )}
        {filter !== 'all' && filteredModules[0] && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm overflow-x-auto no-scrollbar">
              <TabButton 
                active={moduleDetailTab === 'ai_suite'} 
                onClick={() => setModuleDetailTab('ai_suite')} 
                icon={<Sparkles size={16} />} 
                label="AI Study Suite" 
              />
              <TabButton 
                active={moduleDetailTab === 'diagrams'} 
                onClick={() => setModuleDetailTab('diagrams')} 
                icon={<Workflow size={16} />} 
                label="AI Diagrams" 
              />
              <TabButton 
                active={moduleDetailTab === 'youtube'} 
                onClick={() => setModuleDetailTab('youtube')} 
                icon={<Youtube size={16} />} 
                label="YouTube" 
              />
              <TabButton 
                active={moduleDetailTab === 'live_lessons'} 
                onClick={() => setModuleDetailTab('live_lessons')} 
                icon={<Video size={16} />} 
                label="Live Lessons" 
              />
              <TabButton 
                active={moduleDetailTab === 'live_tutor'} 
                onClick={() => setModuleDetailTab('live_tutor')} 
                icon={<Mic size={16} />} 
                label="Live Tutor" 
              />
              <TabButton 
                active={moduleDetailTab === 'visuals'} 
                onClick={() => setModuleDetailTab('visuals')} 
                icon={<ImageIcon size={16} />} 
                label="Visuals" 
              />
              <TabButton 
                active={moduleDetailTab === 'research'} 
                onClick={() => setModuleDetailTab('research')} 
                icon={<SearchIcon size={16} />} 
                label="Research" 
              />
            </div>

            <AnimatePresence mode="wait">
              {moduleDetailTab === 'ai_suite' && (
                <motion.div 
                  key="ai_suite"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <VideoExplanationGenerator module={filteredModules[0]} />
                  <StudyMaterials 
                    module={filteredModules[0]} 
                    onUpdate={(u: any) => onUpdate(filteredModules[0].id, u)} 
                    onUpdateStats={onUpdateStats}
                    profile={profile}
                    modules={modules}
                    communities={communities}
                    schedule={schedule}
                    onConfirm={onConfirm}
                  />
                </motion.div>
              )}
              {moduleDetailTab === 'diagrams' && (
                <motion.div 
                  key="diagrams"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <DiagramGeneratorView 
                    profile={profile} 
                    module={filteredModules[0]} 
                    onUpdate={(u: any) => onUpdate(filteredModules[0].id, u)} 
                  />
                </motion.div>
              )}
              {moduleDetailTab === 'youtube' && (
                <motion.div 
                  key="youtube"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <YoutubeView 
                    module={filteredModules[0]} 
                    onUpdate={(u: any) => onUpdate(filteredModules[0].id, u)} 
                  />
                </motion.div>
              )}
              {moduleDetailTab === 'live_lessons' && (
                <motion.div 
                  key="live_lessons"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <VirtualClassroomView modules={[filteredModules[0]]} />
                </motion.div>
              )}
              {moduleDetailTab === 'live_tutor' && (
                <motion.div 
                  key="live_tutor"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <LiveTutorView module={filteredModules[0]} />
                </motion.div>
              )}
              {moduleDetailTab === 'visuals' && (
                <motion.div 
                  key="visuals"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <VisualsView module={filteredModules[0]} onUpdate={(u: any) => onUpdate(filteredModules[0].id, u)} />
                </motion.div>
              )}
              {moduleDetailTab === 'research' && (
                <motion.div 
                  key="research"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <ResearchView module={filteredModules[0]} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
        {filteredModules.length === 0 && (
          <div className="bg-white rounded-[2rem] p-16 border-2 border-dashed border-slate-100 text-center">
            <BookOpen size={48} className="mx-auto text-slate-200 mb-4" />
            <p className="text-slate-400">
              {filter === 'all' ? `No ${isSchoolLevel(profile.studentLevel) ? 'subjects' : 'modules'} added yet. Click "New ${isSchoolLevel(profile.studentLevel) ? 'Subject' : 'Module'}" to start.` : `Selected ${isSchoolLevel(profile.studentLevel) ? 'subject' : 'module'} not found.`}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function VirtualClassroomView({ modules }: any) {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [recordingType, setRecordingType] = useState<'screen' | 'camera' | null>(null);

  const startRecording = async (type: 'screen' | 'camera') => {
    try {
      let mediaStream;
      if (type === 'screen') {
        mediaStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
      } else {
        mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      }
      
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      const recorder = new MediaRecorder(mediaStream);
      const chunks: Blob[] = [];
      
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `lesson-recording-${new Date().toISOString()}.webm`;
        a.click();
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setRecordingType(type);
    } catch (err) {
      console.error("Error starting recording:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setIsRecording(false);
    setRecordingType(null);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Virtual Classroom</h2>
          <p className="text-slate-400">Record your live lessons and study sessions for later review.</p>
        </div>
        <div className="flex gap-3">
          {!isRecording ? (
            <>
              <button 
                onClick={() => startRecording('camera')}
                className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
              >
                <Video size={18} />
                Record Camera
              </button>
              <button 
                onClick={() => startRecording('screen')}
                className="flex items-center gap-2 bg-slate-800 text-white px-6 py-3 rounded-2xl font-bold hover:bg-slate-900 transition-all shadow-lg shadow-slate-100"
              >
                <LayoutDashboard size={18} />
                Record Screen
              </button>
            </>
          ) : (
            <button 
              onClick={stopRecording}
              className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-100"
            >
              <Square size={18} />
              Stop Recording
            </button>
          )}
        </div>
      </div>

      <div className="bg-slate-900 rounded-[2rem] aspect-video overflow-hidden relative flex items-center justify-center border-4 border-slate-800 shadow-2xl">
        {isRecording ? (
          <video ref={videoRef} autoPlay muted className="w-full h-full object-cover" />
        ) : (
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-600">
              <Video size={40} />
            </div>
            <p className="text-slate-500 font-medium">Camera/Screen preview will appear here</p>
          </div>
        )}
        
        {isRecording && (
          <div className="absolute top-6 left-6 flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full text-xs font-bold animate-pulse">
            <div className="w-2 h-2 bg-white rounded-full" />
            LIVE RECORDING
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Mic size={18} className="text-indigo-600" />
            Audio Settings
          </h3>
          <p className="text-sm text-slate-500 mb-4">Ensure your microphone is connected for clear audio capture.</p>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 w-1/2" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Sparkles size={18} className="text-indigo-600" />
            AI Transcription
          </h3>
          <p className="text-sm text-slate-500">Recordings can be automatically transcribed and summarized by AI for your notes.</p>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Save size={18} className="text-indigo-600" />
            Auto-Save
          </h3>
          <p className="text-sm text-slate-500">Lessons are saved locally to your device after recording stops.</p>
        </div>
      </div>
    </motion.div>
  );
}

function CommunitiesView({ communities, activeCommunity, setActiveCommunity, messages, onSendMessage, onJoin, onPinMessage, onAddResource, onSaveResourceToModule, user, profile, modules, onConfirm }: any) {
  const [msg, setMsg] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeSubTab, setActiveSubTab] = useState<'chat' | 'resources' | 'members'>('chat');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [joinCode, setJoinCode] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [savingResource, setSavingResource] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const CATEGORIES = ['All', 'Study Group', 'Exam Prep', 'General', 'Q&A', 'Resources'];

  const handleJoinByCode = async () => {
    if (!joinCode.trim()) return;
    setIsJoining(true);
    try {
      const q = query(collection(db, 'communities'), where('inviteCode', '==', joinCode.trim().toUpperCase()));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        onConfirm("Invalid Code", "No community found with this invite code.", () => {});
        return;
      }

      const communityDoc = querySnapshot.docs[0];
      const communityData = communityDoc.data();
      
      if (communityData.members.includes(user.uid)) {
        onConfirm("Already a Member", "You are already a member of this community.", () => {});
        setActiveCommunity({ id: communityDoc.id, ...communityData });
        return;
      }

      const communityRef = doc(db, 'communities', communityDoc.id);
      await updateDoc(communityRef, {
        members: arrayUnion(user.uid)
      });

      onConfirm("Joined!", `You have successfully joined ${communityData.name}`, () => {});
      
      // Award Social Learner badge
      if (profile && !profile.badges?.some((b: any) => b.id === 'social_learner')) {
        const badge = AVAILABLE_BADGES.find(b => b.id === 'social_learner')!;
        await updateDoc(doc(db, 'users', user.uid), {
          badges: arrayUnion({ ...badge, unlockedAt: new Date() })
        });
      }

      setActiveCommunity({ id: communityDoc.id, ...communityData });
      setJoinCode('');
    } catch (error) {
      console.error("Error joining community:", error);
      onConfirm("Error", "Failed to join community. Please try again.", () => {});
    } finally {
      setIsJoining(false);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, activeSubTab]);

  const filteredCommunities = communities.filter((c: any) => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         c.moduleTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (activeCommunity) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-[calc(100vh-12rem)] flex flex-col bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        {/* Community Header */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button onClick={() => { setActiveCommunity(null); setActiveSubTab('chat'); }} className="p-2 hover:bg-white rounded-xl transition-all">
                <ArrowLeft size={20} />
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg">{activeCommunity.name}</h3>
                  {activeCommunity.category && (
                    <span className="text-[10px] font-bold bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {activeCommunity.category}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{activeCommunity.moduleTitle}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsInviteModalOpen(true)}
                className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-600 hover:text-indigo-600 hover:border-indigo-100 shadow-sm transition-all flex items-center gap-2 text-xs font-bold"
              >
                <UserPlus size={16} />
                Invite
              </button>
              <div className="flex bg-white p-1 rounded-xl border border-slate-100 shadow-sm">
              <button 
                onClick={() => setActiveSubTab('chat')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${activeSubTab === 'chat' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                <MessageSquare size={14} />
                Chat
              </button>
              <button 
                onClick={() => setActiveSubTab('resources')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${activeSubTab === 'resources' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                <Layers size={14} />
                Resources
              </button>
              <button 
                onClick={() => setActiveSubTab('members')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${activeSubTab === 'members' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                <Users size={14} />
                Members
              </button>
            </div>
          </div>
        </div>
      </div>

        {/* Community Content */}
        <div className="flex-1 overflow-hidden flex">
          <div className="flex-1 flex flex-col min-w-0">
            {activeSubTab === 'chat' && (
              <>
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30">
                  {messages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8">
                      <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-200 mb-4">
                        <MessageCircle size={32} />
                      </div>
                      <p className="text-slate-400 italic">No messages yet. Start the conversation!</p>
                    </div>
                  )}
                  {messages.map((m: any) => (
                    <div key={m.id} className={`flex flex-col ${m.senderId === user.uid ? 'items-end' : 'items-start'}`}>
                      <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm relative group ${
                        m.senderId === user.uid ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
                      }`}>
                        {m.senderId !== user.uid && <p className="text-[10px] font-bold uppercase tracking-wider mb-1 opacity-50">{m.senderName}</p>}
                        <p className="text-sm leading-relaxed">{m.text}</p>
                        
                        <button 
                          onClick={() => onPinMessage(activeCommunity.id, m)}
                          className="absolute -right-8 top-0 p-1.5 text-slate-300 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-all"
                          title="Pin message"
                        >
                          <Pin size={14} />
                        </button>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1 px-1">{m.timestamp?.toDate ? format(m.timestamp.toDate(), 'HH:mm') : 'Just now'}</p>
                    </div>
                  ))}
                </div>

                <div className="p-6 border-t border-slate-100 bg-white">
                  <form 
                    onSubmit={(e) => { e.preventDefault(); onSendMessage(msg); setMsg(''); }}
                    className="flex gap-3"
                  >
                    <input 
                      className="flex-1 bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
                      placeholder="Type your message..."
                      value={msg}
                      onChange={(e) => setMsg(e.target.value)}
                    />
                    <button className="bg-indigo-600 text-white p-4 rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-[0.98]">
                      <Send size={20} />
                    </button>
                  </form>
                </div>
              </>
            )}

            {activeSubTab === 'resources' && (
              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-800">Shared Resources</h4>
                  <button 
                    onClick={() => setIsResourceModalOpen(true)}
                    className="text-indigo-600 text-xs font-bold hover:underline flex items-center gap-1"
                  >
                    <Plus size={14} /> Add Resource
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(activeCommunity.resources || []).length === 0 ? (
                    <div className="col-span-full py-12 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                      <Layers size={32} className="mx-auto text-slate-200 mb-2" />
                      <p className="text-slate-400 italic text-sm">No resources shared yet.</p>
                    </div>
                  ) : (
                    activeCommunity.resources.map((res: any) => (
                      <div key={res.id} className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center gap-4">
                        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                          {res.type === 'link' ? <LinkIcon size={18} /> : <FileText size={18} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold truncate">{res.title}</p>
                          <div className="flex items-center gap-3">
                            <a href={res.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-indigo-600 hover:underline truncate block">
                              {res.url}
                            </a>
                            <button 
                              onClick={() => setSavingResource(res)}
                              className="text-[10px] font-bold text-slate-400 hover:text-indigo-600 flex items-center gap-1 transition-colors"
                            >
                              <Bookmark size={10} /> Save
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeSubTab === 'members' && (
              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                <h4 className="font-bold text-slate-800">Community Members ({activeCommunity.members?.length || 0})</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activeCommunity.members?.map((memberId: string) => (
                    <div key={memberId} className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                        <User size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold">{memberId === user.uid ? 'You' : 'Member'}</p>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest">Student</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar for Pinned Messages */}
          {activeSubTab === 'chat' && (
            <div className="hidden xl:block w-80 border-l border-slate-100 bg-slate-50/20 p-6 overflow-y-auto">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                <Pin size={14} className="text-indigo-600" />
                Pinned Messages
              </h4>
              <div className="space-y-4">
                {(activeCommunity.pinnedMessages || []).length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No pinned messages yet. Hover over a message to pin it.</p>
                ) : (
                  activeCommunity.pinnedMessages.map((p: any) => (
                    <div key={p.id} className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{p.text}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-[9px] font-bold text-slate-400 uppercase">{p.senderName}</span>
                        <button className="text-[9px] font-bold text-indigo-600 hover:underline">Jump</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Add Resource Modal */}
        <AnimatePresence>
          {isResourceModalOpen && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsResourceModalOpen(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-md bg-white rounded-[2.5rem] p-8 shadow-2xl">
                <h3 className="text-xl font-bold mb-6">Add Resource</h3>
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const title = formData.get('title') as string;
                  const url = formData.get('url') as string;
                  const type = formData.get('type') as 'link' | 'file';
                  if (title && url) {
                    await onAddResource(activeCommunity.id, { title, url, type });
                    setIsResourceModalOpen(false);
                  }
                }} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Title</label>
                    <input name="title" required placeholder="e.g. Lecture Notes PDF" className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">URL</label>
                    <input name="url" required placeholder="https://..." className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Type</label>
                    <select name="type" className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500">
                      <option value="link">Link</option>
                      <option value="file">File</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
                    Share Resource
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        {/* Invite Modal */}
        <AnimatePresence>
          {isInviteModalOpen && activeCommunity && (
            <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-[32px] shadow-2xl w-full max-w-md overflow-hidden"
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-slate-900">Invite Members</h3>
                    <button onClick={() => setIsInviteModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                      <X size={20} className="text-slate-400" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Community Invite Code</p>
                      <div className="flex items-center gap-2 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <span className="flex-1 font-mono font-bold text-lg text-slate-700 tracking-wider">
                          {activeCommunity.inviteCode || 'GENERATING...'}
                        </span>
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(activeCommunity.inviteCode || '');
                            onConfirm("Copied!", "Invite code copied to clipboard.", () => {});
                          }}
                          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        >
                          <Copy size={18} />
                        </button>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Invite Link</p>
                      <div className="flex items-center gap-2 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <span className="flex-1 text-xs text-slate-500 truncate">
                          {`${window.location.origin}/join/${activeCommunity.inviteCode}`}
                        </span>
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(`${window.location.origin}/join/${activeCommunity.inviteCode}`);
                            onConfirm("Copied!", "Invite link copied to clipboard.", () => {});
                          }}
                          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        >
                          <Copy size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-start gap-3">
                      <Info size={18} className="text-indigo-600 shrink-0 mt-0.5" />
                      <p className="text-xs text-indigo-700 leading-relaxed">
                        Share this code or link with your classmates. They can use the "Join" box in the Study Communities tab to join instantly.
                      </p>
                    </div>
                  </div>

                  <button 
                    onClick={() => setIsInviteModalOpen(false)}
                    className="w-full mt-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Save Resource to Module Modal */}
        <AnimatePresence>
          {savingResource && (
            <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-[32px] shadow-2xl w-full max-w-md overflow-hidden"
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-slate-900">Save to Module</h3>
                    <button onClick={() => setSavingResource(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                      <X size={20} className="text-slate-400" />
                    </button>
                  </div>

                  <div className="mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        {savingResource.type === 'link' ? <LinkIcon size={20} /> : <FileText size={20} />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{savingResource.title}</p>
                        <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">{savingResource.type}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select Module</p>
                    <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                      {modules.map((module: any) => (
                        <button
                          key={module.id}
                          onClick={() => {
                            onSaveResourceToModule(module.id, savingResource);
                            setSavingResource(null);
                          }}
                          className="w-full p-4 flex items-center justify-between bg-white border border-slate-100 rounded-2xl hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                              <BookOpen size={16} />
                            </div>
                            <span className="text-sm font-bold text-slate-700">{module.title}</span>
                          </div>
                          <ChevronRight size={16} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                        </button>
                      ))}
                      {modules.length === 0 && (
                        <p className="text-center py-8 text-sm text-slate-400">No modules found. Create a module first.</p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Study Communities</h2>
          <p className="text-slate-400 mt-1">Connect with students studying the same modules as you.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white border border-slate-100 rounded-2xl p-1 shadow-sm">
            <input 
              type="text" 
              placeholder="Enter Code" 
              className="bg-transparent border-none text-xs font-bold px-4 py-2 w-24 focus:ring-0"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
            />
            <button 
              onClick={handleJoinByCode}
              disabled={isJoining || !joinCode.trim()}
              className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all disabled:opacity-50"
            >
              {isJoining ? 'Joining...' : 'Join'}
            </button>
          </div>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <Plus size={20} />
            Create Community
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text"
            placeholder="Search by community name or module..."
            className="w-full bg-white border border-slate-100 rounded-2xl pl-12 pr-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${
                selectedCategory === cat 
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100' 
                  : 'bg-white text-slate-500 border-slate-100 hover:border-indigo-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Communities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCommunities.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-white rounded-[3rem] border border-dashed border-slate-200">
            <Users size={48} className="mx-auto text-slate-200 mb-4" />
            <h3 className="text-lg font-bold text-slate-400">No communities found</h3>
            <p className="text-sm text-slate-300 mt-2">Try adjusting your search or create a new community!</p>
          </div>
        ) : (
          filteredCommunities.map((c: any) => (
            <motion.div 
              key={c.id} 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all group flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg ${c.avatarColor || 'bg-indigo-600'}`}>
                  <Users size={28} />
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-[10px] font-bold bg-slate-50 text-slate-400 px-3 py-1.5 rounded-full uppercase tracking-widest border border-slate-100">
                    {c.members?.length || 0} Members
                  </span>
                  {c.category && (
                    <span className="text-[9px] font-bold bg-indigo-50 text-indigo-600 px-2 py-1 rounded-lg uppercase tracking-wider">
                      {c.category}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="font-bold text-xl mb-2 group-hover:text-indigo-600 transition-colors">{c.name}</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">{c.moduleTitle}</p>
                {c.description && (
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-6 italic">
                    "{c.description}"
                  </p>
                )}
              </div>
              
              <div className="mt-auto">
                {c.members?.includes(user.uid) ? (
                  <button 
                    onClick={() => setActiveCommunity(c)}
                    className="w-full flex items-center justify-center gap-2 bg-indigo-50 text-indigo-600 py-4 rounded-2xl font-bold text-sm hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                  >
                    <MessageSquare size={18} />
                    Open Chat
                  </button>
                ) : (
                  <button 
                    onClick={() => onJoin(c.id)}
                    className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-[0.98]"
                  >
                    Join Community
                  </button>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Create Community Modal */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-[3rem] shadow-2xl overflow-hidden"
            >
              <div className="p-10">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold">Create New Community</h2>
                  <button onClick={() => setIsCreateModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
                    <X size={24} />
                  </button>
                </div>

                <form 
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const name = formData.get('name') as string;
                    const moduleTitle = formData.get('moduleTitle') as string;
                    const description = formData.get('description') as string;
                    const category = formData.get('category') as string;
                    
                    const colors = ['bg-indigo-600', 'bg-emerald-500', 'bg-rose-500', 'bg-amber-500', 'bg-sky-500', 'bg-violet-500'];
                    const avatarColor = colors[Math.floor(Math.random() * colors.length)];
                    const inviteCode = Math.random().toString(36).substring(2, 8).toUpperCase();

                    if (name && moduleTitle) {
                      await addDoc(collection(db, 'communities'), {
                        name,
                        moduleTitle,
                        description,
                        category,
                        avatarColor,
                        inviteCode,
                        members: [user.uid],
                        studentLevel: profile?.studentLevel || 'University',
                        pinnedMessages: [],
                        resources: [],
                        createdAt: serverTimestamp()
                      });
                      setIsCreateModalOpen(false);
                    }
                  }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Community Name</label>
                      <input 
                        name="name"
                        required
                        placeholder="e.g. Physics 101 Study Group"
                        className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Module / Subject</label>
                      <input 
                        name="moduleTitle"
                        required
                        placeholder="e.g. PHY101"
                        className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Category</label>
                    <select 
                      name="category"
                      className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
                    >
                      {CATEGORIES.filter(c => c !== 'All').map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Description (Optional)</label>
                    <textarea 
                      name="description"
                      rows={3}
                      placeholder="What is this community about?"
                      className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-[0.98]"
                  >
                    Create Community
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SharingView({ sharedProfiles, onShare }: any) {
  const [email, setEmail] = useState('');

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
        <h2 className="text-2xl font-bold mb-2">Share Your Progress</h2>
        <p className="text-slate-400 mb-8">Invite friends or parents to track your study flow and marks.</p>
        
        <form 
          onSubmit={(e) => { e.preventDefault(); onShare(email); setEmail(''); }}
          className="flex flex-col md:flex-row gap-4"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
            <input 
              className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
              placeholder="Enter friend's email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
            <UserPlus size={20} />
            Invite
          </button>
        </form>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 px-4">Shared With You</h3>
        {sharedProfiles.map((p: any) => (
          <div key={p.uid} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                <User size={24} />
              </div>
              <div>
                <h4 className="font-bold">{p.firstName} {p.lastName}</h4>
                <p className="text-xs text-slate-400">{p.institution} • {p.yearGrade}</p>
              </div>
            </div>
            <button className="bg-slate-50 text-slate-600 px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-indigo-50 hover:text-indigo-600 transition-all">
              View Profile
            </button>
          </div>
        ))}
        {sharedProfiles.length === 0 && (
          <div className="text-center py-12 bg-white rounded-[2rem] border border-dashed border-slate-100">
            <Share2 size={32} className="mx-auto text-slate-200 mb-2" />
            <p className="text-slate-400 italic text-sm">No profiles shared with you yet.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// --- Mermaid Component ---
function Mermaid({ chart, id }: { chart: string, id?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && chart) {
      mermaid.initialize({ startOnLoad: true, theme: 'neutral', securityLevel: 'loose' });
      mermaid.contentLoaded();
      
      // Clear previous content
      ref.current.removeAttribute('data-processed');
      ref.current.innerHTML = chart;
      
      try {
        mermaid.render('mermaid-svg-' + (id || Math.random().toString(36).substr(2, 9)), chart).then(({ svg }) => {
          if (ref.current) {
            ref.current.innerHTML = svg;
          }
        });
      } catch (err) {
        console.error('Mermaid render error:', err);
      }
    }
  }, [chart, id]);

  return <div id={id} key={chart} ref={ref} className="mermaid flex justify-center py-8 bg-slate-50 rounded-3xl overflow-x-auto" />;
}

function HomeworkSolverView({ profile, module, onUpdate }: { profile: UserProfile, module?: Module, onUpdate: (updates: Partial<Module>) => void }) {
  const [isSolving, setIsSolving] = useState(false);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const solveHomework = async (data: { text: string; image?: string; excelData?: any[] }) => {
    setIsSolving(true);
    setError('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const parts: any[] = [];
      
      if (data.image) {
        const base64Data = data.image.split(',')[1];
        parts.push({
          inlineData: {
            data: base64Data,
            mimeType: "image/png"
          }
        });
      }

      let promptText = data.text;
      if (data.excelData) {
        promptText += `\n\nData from Excel: ${JSON.stringify(data.excelData)}`;
      }

      if (!promptText && !data.image) {
        throw new Error("Please provide a problem description or an image.");
      }

      parts.push({ text: `You are an expert tutor. Solve the following homework problem for a ${profile.studentLevel} student named ${profile.firstName}. 
        Provide a clear, step-by-step explanation that aligns with their current academic level.
        
        ${module ? `Context: This is for the module "${module.title}". 
        - Module Type: ${module.moduleType}
        - Current Mastery: ${module.masteryScore || 0}%
        ${module.learningOutcomes?.length ? `- Learning Outcomes to focus on: ${module.learningOutcomes.join(', ')}` : ''}` : ''}
        ${module?.notes ? `Module Notes: ${module.notes.substring(0, 5000)}` : ''}
        
        Problem: ${promptText || 'Please solve the problem in the attached image.'}` });

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: { parts },
      });

      if (!response.text) {
        throw new Error("The AI was unable to generate a solution. Please try rephrasing your problem or providing more context.");
      }

      const newSolution = {
        id: Math.random().toString(36).substr(2, 9),
        question: data.text || 'Image/File based problem',
        solution: response.text,
        timestamp: new Date()
      };

      if (module) {
        const updatedSolutions = [newSolution, ...(module.homeworkSolutions || [])];
        onUpdate({ homeworkSolutions: updatedSolutions });
      }
    } catch (err: any) {
      console.error("Homework Solver Error:", err);
      setError(err.message || 'An unexpected error occurred while solving the problem. Please try again.');
    } finally {
      setIsSolving(false);
    }
  };

  const handleDelete = (id: string) => {
    if (module) {
      const updatedSolutions = (module.homeworkSolutions || []).filter(s => s.id !== id);
      onUpdate({ homeworkSolutions: updatedSolutions });
    }
  };

  const handleEdit = (id: string, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = () => {
    if (module && editingId) {
      const updatedSolutions = (module.homeworkSolutions || []).map(s => 
        s.id === editingId ? { ...s, solution: editText } : s
      );
      onUpdate({ homeworkSolutions: updatedSolutions });
      setEditingId(null);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
        <h2 className="text-2xl font-bold mb-2">Homework Solver</h2>
        <p className="text-slate-400 mb-8">Upload documents, photos, Excel files or type your problem to get a step-by-step solution.</p>
        
        {error && (
          <div className="mb-6">
            <AIErrorMessage 
              message={error} 
              onRetry={() => setError('')} 
            />
          </div>
        )}
        
        <UniversalInput 
          onProcess={solveHomework} 
          isProcessing={isSolving} 
          placeholder="Describe your homework problem or paste the question here..."
          buttonLabel={isSolving ? "Solving..." : "Solve Problem"}
        />
      </div>

      <div className="space-y-6">
        {module?.homeworkSolutions?.map((item) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm relative group"
          >
            <div className="absolute top-6 right-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <SpeechButton text={item.solution} />
              <CopyButton text={item.solution} />
              <button 
                onClick={() => handleEdit(item.id, item.solution)}
                className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
              >
                <Edit3 size={18} />
              </button>
              <button 
                onClick={() => handleDelete(item.id)}
                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="mb-6">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Problem</span>
              <p className="text-slate-700 font-medium">{item.question}</p>
            </div>

            <div className="h-px bg-slate-50 mb-6" />

            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <CheckCircle2 size={20} className="text-emerald-500" />
              Solution & Explanation
            </h3>

            {editingId === item.id ? (
              <div className="space-y-4">
                <textarea 
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm min-h-[200px] outline-none"
                />
                <div className="flex justify-end gap-2">
                  <button onClick={() => setEditingId(null)} className="px-4 py-2 text-sm font-bold text-slate-500">Cancel</button>
                  <button onClick={saveEdit} className="px-4 py-2 text-sm font-bold bg-indigo-600 text-white rounded-xl">Save Changes</button>
                </div>
              </div>
            ) : (
              <div className="max-w-none">
                <Markdown
                  components={{
                    h1: ({ ...props }) => <h1 className="text-2xl font-bold mb-4 text-slate-900" {...props} />,
                    h2: ({ ...props }) => <h2 className="text-xl font-bold mb-3 mt-6 text-slate-800" {...props} />,
                    h3: ({ ...props }) => <h3 className="text-lg font-bold mb-2 mt-4 text-slate-800" {...props} />,
                    p: ({ ...props }) => <p className="mb-4 text-slate-700 leading-relaxed" {...props} />,
                    ul: ({ ...props }) => <ul className="list-disc pl-6 mb-4 space-y-2 text-slate-700" {...props} />,
                    ol: ({ ...props }) => <ol className="list-decimal pl-6 mb-4 space-y-2 text-slate-700" {...props} />,
                    li: ({ ...props }) => <li className="pl-1" {...props} />,
                    code: ({ ...props }) => <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm font-mono text-indigo-600" {...props} />,
                    pre: ({ ...props }) => <pre className="bg-slate-900 text-slate-100 p-4 rounded-2xl overflow-x-auto mb-4 text-sm font-mono" {...props} />,
                    blockquote: ({ ...props }) => <blockquote className="border-l-4 border-indigo-200 pl-4 italic text-slate-600 mb-4" {...props} />,
                  }}
                >
                  {item.solution}
                </Markdown>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function DiagramGeneratorView({ profile, module, onUpdate }: { profile: UserProfile, module?: Module, onUpdate: (updates: Partial<Module>) => void }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editCode, setEditCode] = useState('');
  const [editPrompt, setEditPrompt] = useState('');

  const generateDiagram = async (data: { text: string; image?: string; excelData?: any[] }) => {
    setIsGenerating(true);
    setError('');

    try {
      if (!data.text && !data.image && (!data.excelData || data.excelData.length === 0)) {
        throw new Error("Please provide some content to generate a diagram from.");
      }

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const parts: any[] = [];
      
      if (data.image) {
        const base64Data = data.image.split(',')[1];
        parts.push({
          inlineData: {
            data: base64Data,
            mimeType: "image/png"
          }
        });
      }

      let promptText = data.text;
      if (data.excelData) {
        promptText += `\n\nData from Excel: ${JSON.stringify(data.excelData)}`;
      }

      parts.push({ text: `You are a diagram expert. Create a visually appealing Mermaid.js diagram based on this description for a ${profile.studentLevel} student named ${profile.firstName}: "${promptText}". 
        
        ${module ? `Context: This is for the module "${module.title}".
        - Module Type: ${module.moduleType}
        - Current Mastery: ${module.masteryScore || 0}%
        ${module.learningOutcomes?.length ? `- Learning Outcomes to focus on: ${module.learningOutcomes.join(', ')}` : ''}` : ''}
        ${module?.notes ? `Module Notes Context: ${module.notes.substring(0, 5000)}` : ''}
        
        Requirements:
        1. Use the most appropriate Mermaid diagram type (graph TD/LR, sequenceDiagram, classDiagram, stateDiagram-v2, gantt, pie, etc.).
        2. Add COLOUR and STYLING to the diagram using Mermaid's "style" or "classDef" commands to make it visually engaging and help distinguish different parts of the process/structure.
        3. Use clear labels and logical flow.
        4. Return ONLY the raw Mermaid code. Do not include markdown code blocks (like \`\`\`mermaid). Just the code itself.` });

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: { parts },
      });

      if (!response.text) {
        throw new Error("AI failed to generate a diagram. Please try again.");
      }

      let code = response.text || '';
      code = code.replace(/```mermaid/g, '').replace(/```/g, '').trim();

      const newDiagram = {
        id: Math.random().toString(36).substr(2, 9),
        prompt: data.text || 'Image/File based diagram',
        code: code,
        timestamp: new Date()
      };

      if (module) {
        const updatedDiagrams = [newDiagram, ...(module.diagrams || [])];
        onUpdate({ diagrams: updatedDiagrams });
      }
    } catch (err: any) {
      console.error('Error generating diagram:', err);
      setError(err.message || 'Failed to generate diagram. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDelete = (id: string) => {
    if (module) {
      const updatedDiagrams = (module.diagrams || []).filter(d => d.id !== id);
      onUpdate({ diagrams: updatedDiagrams });
    }
  };

  const handleEdit = (id: string, code: string, prompt: string) => {
    setEditingId(id);
    setEditCode(code);
    setEditPrompt(prompt);
  };

  const saveEdit = () => {
    if (module && editingId) {
      const updatedDiagrams = (module.diagrams || []).map(d => 
        d.id === editingId ? { ...d, code: editCode, prompt: editPrompt } : d
      );
      onUpdate({ diagrams: updatedDiagrams });
      setEditingId(null);
    }
  };

  const generateFromNotes = () => {
    if (module?.notes) {
      generateDiagram({ text: `Create a comprehensive diagram that summarizes the key concepts and relationships in these module notes: ${module.notes.substring(0, 3000)}` });
    } else {
      setError("No module notes found to generate a diagram from.");
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                  <Workflow size={20} />
                </div>
                AI Diagram Generator
              </h2>
              <p className="text-slate-400 mt-2">Describe a process, system, or flow to generate a visual diagram automatically.</p>
            </div>
            {module?.notes && (
              <button 
                onClick={generateFromNotes}
                disabled={isGenerating}
                className="flex items-center gap-2 px-6 py-3 bg-indigo-50 text-indigo-600 rounded-2xl text-xs font-bold hover:bg-indigo-100 transition-all disabled:opacity-50"
              >
                <Sparkles size={16} />
                Generate from Notes
              </button>
            )}
          </div>
          
          <UniversalInput 
            onProcess={generateDiagram} 
            isProcessing={isGenerating} 
            placeholder="Describe the diagram you want to create (e.g., 'A flowchart for photosynthesis' or 'A sequence diagram for user login')..."
            buttonLabel={isGenerating ? "Generating..." : "Generate Diagram"}
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-2xl border border-red-100 text-sm font-medium">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {module?.diagrams?.map((item) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm relative group"
          >
            <div className="absolute top-8 right-8 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
              <button 
                onClick={() => handleEdit(item.id, item.code, item.prompt)}
                className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-indigo-600 shadow-sm hover:shadow-md transition-all"
                title="Edit Diagram"
              >
                <Edit3 size={18} />
              </button>
              <button 
                onClick={() => handleDelete(item.id)}
                className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-red-500 shadow-sm hover:shadow-md transition-all"
                title="Delete Diagram"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="mb-6">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Prompt</span>
              <p className="text-slate-700 font-medium">{item.prompt}</p>
            </div>

            <div className="h-px bg-slate-50 mb-6" />

            {editingId === item.id ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Prompt / Description</label>
                  <input 
                    type="text"
                    value={editPrompt}
                    onChange={(e) => setEditPrompt(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mermaid Code</label>
                  <textarea 
                    value={editCode}
                    onChange={(e) => setEditCode(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs font-mono min-h-[300px] outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <button onClick={() => setEditingId(null)} className="px-6 py-3 text-sm font-bold text-slate-500 hover:bg-slate-50 rounded-xl transition-all">Cancel</button>
                  <button onClick={saveEdit} className="px-8 py-3 text-sm font-bold bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">Save Changes</button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <Mermaid chart={item.code} id={`mermaid-svg-${item.id}`} />
                <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Mermaid Code</h4>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => {
                          const svg = document.querySelector(`#mermaid-svg-${item.id} svg`);
                          if (svg) {
                            const svgData = new XMLSerializer().serializeToString(svg);
                            const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
                            const svgUrl = URL.createObjectURL(svgBlob);
                            const downloadLink = document.createElement('a');
                            downloadLink.href = svgUrl;
                            downloadLink.download = `diagram-${item.id}.svg`;
                            document.body.appendChild(downloadLink);
                            downloadLink.click();
                            document.body.removeChild(downloadLink);
                          }
                        }}
                        className="p-2 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-indigo-600 shadow-sm hover:shadow-md transition-all flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"
                      >
                        <Download size={14} />
                        SVG
                      </button>
                      <CopyButton text={item.code} className="!bg-white shadow-sm" />
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-100 overflow-x-auto">
                    <pre className="text-xs font-mono text-slate-600 leading-relaxed">{item.code}</pre>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function MindMapCreatorView({ profile, module, onUpdate }: { profile: UserProfile, module?: Module, onUpdate: (updates: Partial<Module>) => void }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editCode, setEditCode] = useState('');

  const generateMindMap = async (data: { text: string; image?: string; excelData?: any[] }) => {
    setIsGenerating(true);
    setError('');

    try {
      if (!data.text && !data.image && (!data.excelData || data.excelData.length === 0)) {
        throw new Error("Please provide some content to generate a mind map from.");
      }

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const parts: any[] = [];
      
      if (data.image) {
        const base64Data = data.image.split(',')[1];
        parts.push({
          inlineData: {
            data: base64Data,
            mimeType: "image/png"
          }
        });
      }

      let promptText = data.text;
      if (data.excelData) {
        promptText += `\n\nData from Excel: ${JSON.stringify(data.excelData)}`;
      }

      parts.push({ text: `You are a mind map expert. Create a visually appealing and comprehensive Mermaid.js mindmap based on this topic for a ${profile.studentLevel} student named ${profile.firstName}: "${promptText}". 
        
        ${module ? `Context: This is for the module "${module.title}".
        - Module Type: ${module.moduleType}
        - Current Mastery: ${module.masteryScore || 0}%
        ${module.learningOutcomes?.length ? `- Learning Outcomes to focus on: ${module.learningOutcomes.join(', ')}` : ''}` : ''}
        ${module?.notes ? `Module Notes Context: ${module.notes.substring(0, 5000)}` : ''}
        
        Requirements:
        1. Use the "mindmap" Mermaid type.
        2. Add COLOUR and STYLING to the mindmap to make it visually engaging and help distinguish different branches.
        3. Use clear labels and a logical hierarchical structure.
        4. Return ONLY the raw Mermaid code. Do not include markdown code blocks (like \`\`\`mermaid). Just the code itself.` });

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: { parts },
      });

      if (!response.text) {
        throw new Error("AI failed to generate a mind map. Please try again.");
      }

      let code = response.text || '';
      code = code.replace(/```mermaid/g, '').replace(/```/g, '').trim();

      const newMindMap = {
        id: Math.random().toString(36).substr(2, 9),
        prompt: data.text || 'Image/File based mind map',
        code: code,
        timestamp: new Date()
      };

      if (module) {
        const updatedMindMaps = [newMindMap, ...(module.mindMaps || [])];
        onUpdate({ mindMaps: updatedMindMaps });
      }
    } catch (err: any) {
      console.error('Error generating mind map:', err);
      setError(err.message || 'Failed to generate mind map. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDelete = (id: string) => {
    if (module) {
      const updatedMindMaps = (module.mindMaps || []).filter(m => m.id !== id);
      onUpdate({ mindMaps: updatedMindMaps });
    }
  };

  const handleEdit = (id: string, code: string) => {
    setEditingId(id);
    setEditCode(code);
  };

  const saveEdit = () => {
    if (module && editingId) {
      const updatedMindMaps = (module.mindMaps || []).map(m => 
        m.id === editingId ? { ...m, code: editCode } : m
      );
      onUpdate({ mindMaps: updatedMindMaps });
      setEditingId(null);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
        <h2 className="text-2xl font-bold mb-2">AI Mind Map Creator</h2>
        <p className="text-slate-400 mb-8">Enter a topic or upload files to generate a comprehensive mind map for study and brainstorming.</p>
        
        {error && (
          <div className="mb-6">
            <AIErrorMessage 
              message={error} 
              onRetry={() => setError('')} 
            />
          </div>
        )}
        
        <UniversalInput 
          onProcess={generateMindMap} 
          isProcessing={isGenerating} 
          placeholder="Enter a topic or paste content to mind map..."
          buttonLabel={isGenerating ? "Creating..." : "Create Mind Map"}
        />
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-2xl border border-red-100 text-sm font-medium">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {module?.mindMaps?.map((item) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm relative group"
          >
            <div className="absolute top-6 right-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => handleEdit(item.id, item.code)}
                className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
              >
                <Edit3 size={18} />
              </button>
              <button 
                onClick={() => handleDelete(item.id)}
                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="mb-6">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Topic</span>
              <p className="text-slate-700 font-medium">{item.prompt}</p>
            </div>

            <div className="h-px bg-slate-50 mb-6" />

            {editingId === item.id ? (
              <div className="space-y-4">
                <textarea 
                  value={editCode}
                  onChange={(e) => setEditCode(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs font-mono min-h-[200px] outline-none"
                />
                <div className="flex justify-end gap-2">
                  <button onClick={() => setEditingId(null)} className="px-4 py-2 text-sm font-bold text-slate-500">Cancel</button>
                  <button onClick={saveEdit} className="px-4 py-2 text-sm font-bold bg-indigo-600 text-white rounded-xl">Save Changes</button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <Mermaid chart={item.code} />
                <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Mermaid Code</h4>
                    <CopyButton text={item.code} className="!bg-white shadow-sm" />
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-100 overflow-x-auto">
                    <pre className="text-xs font-mono text-slate-600 leading-relaxed">{item.code}</pre>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function TranslatorView({ module }: { module?: Module }) {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('Auto-detect');
  const [targetLanguage, setTargetLanguage] = useState('isiZulu');
  const [subjectField, setSubjectField] = useState('General Academic');
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const languages = [
    'isiZulu', 'isiXhosa', 'Afrikaans', 'Sepedi', 'English', 'Setswana', 'Sesotho', 'Xitsonga', 'siSwati', 'Tshivenda', 'isiNdebele',
    'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Chinese', 'Japanese', 'Korean', 'Russian', 'Arabic', 'Hindi', 'Bengali', 'Turkish', 'Vietnamese', 'Thai', 'Dutch', 'Greek', 'Hebrew', 'Indonesian', 'Malay', 'Polish', 'Swedish', 'Norwegian', 'Danish', 'Finnish', 'Czech', 'Hungarian', 'Romanian', 'Ukrainian'
  ];

  const subjects = [
    'General Academic', 'Natural Sciences', 'Social Sciences', 'Humanities', 'Law & Jurisprudence', 'Medicine & Health', 'Engineering & Tech', 'Business & Economics', 'Mathematics', 'Computer Science', 'Architecture', 'Agriculture', 'Environmental Science', 'Education', 'Psychology', 'Linguistics', 'Political Science', 'Theology'
  ];

  const handleTranslate = async () => {
    if (!text.trim()) return;
    setIsTranslating(true);
    setError(null);
    
    const maxRetries = 3;
    let attempt = 0;

    const performTranslation = async (): Promise<boolean> => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const prompt = `You are a world-class academic translator specializing in ${subjectField}, with deep expertise in South African linguistic and educational standards. 
        Translate the following text from ${sourceLanguage === 'Auto-detect' ? 'its original language' : sourceLanguage} to ${targetLanguage}.
        
        CRITICAL REQUIREMENTS FOR ACADEMIC EXCELLENCE:
        1. ACADEMIC CONTEXT: Use formal, scholarly language appropriate for university-level research, specifically adhering to the academic standards of South African higher education institutions (like UCT, Wits, UP, etc.).
        2. TERMINOLOGY: Apply precise technical terms for the field of ${subjectField}. For South African languages (like isiZulu, isiXhosa, Afrikaans, etc.), ensure that modern academic terminology is used correctly, avoiding colloquialisms and using standard orthography.
        3. CULTURAL NUANCE: Maintain the original meaning while respecting the linguistic conventions and academic tone of ${targetLanguage}.
        4. GRAMMAR & SYNTAX: Ensure flawless grammatical structure. The translation must read as if it were originally written by a subject-matter expert in ${targetLanguage}.
        5. FORMATTING: Preserve all citations, mathematical notations, and structural formatting.
        6. NO HALLUCINATIONS: If a term is untranslatable or lacks a standardized academic equivalent in ${targetLanguage}, keep the original term in brackets or provide the most accepted scholarly equivalent.
        7. SOUTH AFRICAN FOCUS: If the target is a South African language, ensure the translation reflects the formal register used in South African textbooks and academic journals.

        TEXT TO TRANSLATE:
        ${text}`;

        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: prompt,
        });
        
        if (response.text) {
          setTranslatedText(response.text);
          return true;
        } else {
          throw new Error("AI failed to generate a translation. Please try again with a shorter text or different settings.");
        }
      } catch (err: any) {
        const errorMsg = err?.message || String(err);
        
        if (errorMsg.includes('429') || errorMsg.includes('RESOURCE_EXHAUSTED')) {
          if (attempt < maxRetries) {
            attempt++;
            const delay = Math.pow(2, attempt) * 1000;
            await new Promise(resolve => setTimeout(resolve, delay));
            return performTranslation();
          }
          throw new Error("The translation service is currently busy due to high demand. Please try again in a few minutes.");
        }
        throw new Error(`Translation failed: ${errorMsg}. Please try again.`);
      }
    };

    try {
      await performTranslation();
    } catch (error: any) {
      console.error('Translation error:', error);
      setError(error.message || 'Failed to translate. Please check your connection and try again.');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
              <Languages size={24} />
            </div>
            <div>
              <h5 className="font-bold text-slate-800">AI Academic Translator</h5>
              <p className="text-xs text-slate-400 font-medium">Professional translations for your study materials</p>
            </div>
          </div>
          
          {error && (
            <div className="mb-6">
              <AIErrorMessage 
                message={error} 
                onRetry={() => setError(null)} 
              />
            </div>
          )}
          
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Subject:</span>
              <select 
                value={subjectField}
                onChange={(e) => setSubjectField(e.target.value)}
                className="bg-slate-50 border-none rounded-xl px-4 py-2 text-sm font-bold text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer"
              >
                {subjects.map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>

            <div className="w-px h-8 bg-slate-100 hidden md:block" />

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">From:</span>
              <select 
                value={sourceLanguage}
                onChange={(e) => setSourceLanguage(e.target.value)}
                className="bg-slate-50 border-none rounded-xl px-4 py-2 text-sm font-bold text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer"
              >
                <option value="Auto-detect">Auto-detect</option>
                {languages.map(lang => (
                  <option key={`source-${lang}`} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            <button 
              onClick={() => {
                if (sourceLanguage !== 'Auto-detect') {
                  const temp = sourceLanguage;
                  setSourceLanguage(targetLanguage);
                  setTargetLanguage(temp);
                }
              }}
              disabled={sourceLanguage === 'Auto-detect'}
              className="p-2 hover:bg-slate-100 rounded-full transition-all text-slate-400 hover:text-indigo-600 disabled:opacity-30"
              title="Swap Languages"
            >
              <RotateCcw size={16} className={sourceLanguage !== 'Auto-detect' ? "hover:rotate-180 transition-transform duration-500" : ""} />
            </button>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">To:</span>
              <select 
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
                className="bg-slate-50 border-none rounded-xl px-4 py-2 text-sm font-bold text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer"
              >
                {languages.map(lang => (
                  <option key={`target-${lang}`} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6">
            <AIErrorMessage message={error} onRetry={handleTranslate} />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between px-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Source Text</label>
              <div className="flex items-center gap-2">
                {text && (
                  <>
                    <SpeechButton text={text} className="!bg-transparent !p-0 !text-slate-400 hover:!text-indigo-600 !shadow-none font-bold text-[10px] uppercase tracking-widest flex items-center gap-1" />
                    <button 
                      onClick={() => setText('')}
                      className="text-[10px] font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-widest"
                    >
                      Clear
                    </button>
                  </>
                )}
                {module?.notes && (
                  <button 
                    onClick={() => setText(module.notes || '')}
                    className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700 transition-colors uppercase tracking-widest flex items-center gap-1"
                  >
                    <FileText size={10} />
                    Load from Notes
                  </button>
                )}
              </div>
            </div>
            <div className="relative">
              <textarea 
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter academic text to translate..."
                className="w-full h-64 bg-slate-50 border-none rounded-[2rem] p-6 text-sm leading-relaxed text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
              />
              <button 
                onClick={handleTranslate}
                disabled={isTranslating || !text.trim()}
                className="absolute bottom-4 right-4 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {isTranslating ? (
                  <>
                    <RotateCcw size={16} className="animate-spin" />
                    Translating...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Translate
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between px-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Translation</label>
              <div className="flex items-center gap-3">
                {translatedText && (
                  <>
                    <SpeechButton text={translatedText} className="!bg-transparent !p-0 !text-indigo-600 hover:!text-indigo-700 !shadow-none font-bold text-[10px] uppercase tracking-widest flex items-center gap-1" />
                    <button 
                      onClick={() => handleCopy(translatedText)}
                      className="flex items-center gap-1 text-[10px] font-bold text-indigo-600 hover:text-indigo-700 transition-colors uppercase tracking-widest"
                    >
                      <Copy size={12} />
                      Copy
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="w-full h-64 bg-indigo-50/30 border border-indigo-100/50 rounded-[2rem] p-6 text-sm leading-relaxed text-slate-700 overflow-y-auto">
              {isTranslating ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-3">
                  <div className="flex gap-1">
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 bg-indigo-400 rounded-full" />
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 bg-indigo-400 rounded-full" />
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 bg-indigo-400 rounded-full" />
                  </div>
                  <p className="font-medium">AI is processing your translation...</p>
                </div>
              ) : translatedText ? (
                <div className="whitespace-pre-wrap">{translatedText}</div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-300 text-center px-8">
                  <Languages size={32} className="mb-3 opacity-20" />
                  <p className="text-xs font-medium italic">Your translation will appear here after you click translate.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100 flex gap-4">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-amber-600 shrink-0 shadow-sm">
          <Info size={20} />
        </div>
        <div>
          <h6 className="font-bold text-amber-900 text-sm">Academic Context Enabled</h6>
          <p className="text-xs text-amber-800/70 leading-relaxed mt-1">
            Our AI is specifically tuned for academic literature. It will prioritize technical accuracy and formal terminology over casual language, making it perfect for research papers, textbooks, and lecture notes.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function SlideExplanationView({ module, onUpdate }: { module: Module, onUpdate: (updates: Partial<Module>) => void }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [slides, setSlides] = useState<VideoSlide[]>(module.videoSlides || []);
  const [audioUrl, setAudioUrl] = useState<string | null>(module.videoAudioUrl || null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const generateSlides = async () => {
    if (!module.notes && !module.summary) {
      setError("Please add some notes or a summary first to generate a video explanation.");
      return;
    }

    setIsGenerating(true);
    setError(null);
    setStatus('Generating slides and scripts...');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      // 1. Generate 5 slides
      const slideResponse = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Create a 5-slide educational video explanation for the module "${module.title}" based on these notes: ${module.summary || module.notes?.substring(0, 5000)}. 
        For each slide, provide:
        1. A brief title.
        2. A short paragraph of text to be displayed on the slide.
        3. A 10-15 second narration script that explains the slide's content clearly.
        Return the result as a JSON object with a "slides" array containing objects with "title", "content", and "narration".`,
        config: { responseMimeType: "application/json" }
      });

      const data = JSON.parse(slideResponse.text || '{}');
      if (!data.slides || !Array.isArray(data.slides)) {
        throw new Error("Failed to generate slides. Please try again.");
      }

      setSlides(data.slides);
      setStatus('Synthesizing narration audio...');

      // 2. Synthesize audio for all narrations
      // We'll combine all narrations into one audio file for simplicity, or generate them individually.
      // The prompt says "Synthesize the narration into an audio file", which implies one.
      const fullNarration = data.slides.map((s: any, i: number) => `Slide ${i + 1}: ${s.narration}`).join('. ');
      
      const ttsResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: fullNarration }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });

      const base64Audio = ttsResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        const audioBlobUrl = addWavHeader(base64Audio);
        setAudioUrl(audioBlobUrl);
        onUpdate({ videoSlides: data.slides, videoAudioUrl: audioBlobUrl });
        setStatus('Explanation generated successfully!');
      } else {
        throw new Error("Failed to generate audio narration.");
      }
    } catch (err: any) {
      console.error('Slide generation error:', err);
      setError(err.message || "Failed to generate video explanation. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
              <Layers size={24} />
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-800">5-Slide Video Explanation</h4>
              <p className="text-sm text-slate-400">AI-generated slides and narration for your module.</p>
            </div>
          </div>
          <button
            onClick={generateSlides}
            disabled={isGenerating}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold text-xs shadow-lg hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {isGenerating ? <RotateCcw className="animate-spin" size={16} /> : <Sparkles size={16} />}
            {slides.length > 0 ? 'Regenerate' : 'Generate Explanation'}
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-medium flex items-center gap-2 border border-red-100">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        {isGenerating && (
          <div className="text-center py-12 space-y-4">
            <div className="flex justify-center gap-2">
              <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-3 h-3 bg-indigo-600 rounded-full" />
              <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }} className="w-3 h-3 bg-indigo-600 rounded-full" />
              <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.6 }} className="w-3 h-3 bg-indigo-600 rounded-full" />
            </div>
            <p className="text-sm font-bold text-slate-600 animate-pulse">{status}</p>
          </div>
        )}

        {slides.length > 0 && !isGenerating && (
          <div className="space-y-8">
            <div className="relative aspect-video bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl flex items-center justify-center p-12 text-center text-white">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-6 max-w-2xl"
                >
                  <h5 className="text-3xl font-black tracking-tight text-indigo-400">{slides[currentSlide].title}</h5>
                  <p className="text-xl leading-relaxed font-medium">{slides[currentSlide].content}</p>
                </motion.div>
              </AnimatePresence>
              
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
                <button 
                  onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
                  disabled={currentSlide === 0}
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white disabled:opacity-30 transition-all"
                >
                  <ChevronLeft size={24} />
                </button>
                <div className="flex gap-2">
                  {slides.map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-2 h-2 rounded-full transition-all ${i === currentSlide ? 'bg-indigo-500 w-6' : 'bg-white/30'}`} 
                    />
                  ))}
                </div>
                <button 
                  onClick={() => setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1))}
                  disabled={currentSlide === slides.length - 1}
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white disabled:opacity-30 transition-all"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
              
              <div className="absolute top-8 right-8 text-xs font-bold text-white/40 uppercase tracking-widest">
                Slide {currentSlide + 1} / {slides.length}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                <h6 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Mic size={14} className="text-indigo-600" />
                  Narration Script
                </h6>
                <p className="text-sm text-slate-600 leading-relaxed italic">
                  "{slides[currentSlide].narration}"
                </p>
              </div>
              
              <div className="bg-indigo-50 rounded-3xl p-6 border border-indigo-100 flex flex-col justify-center items-center text-center space-y-4">
                <h6 className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Full Audio Narration</h6>
                {audioUrl ? (
                  <>
                    <audio src={audioUrl} controls className="w-full" />
                    <a 
                      href={audioUrl} 
                      download={`${module.title}_explanation.wav`}
                      className="flex items-center gap-2 text-indigo-600 font-bold text-xs hover:underline"
                    >
                      <Download size={14} />
                      Download Audio File
                    </a>
                  </>
                ) : (
                  <p className="text-xs text-indigo-300 italic">Audio not generated yet.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function VideoGeneratorView({ module, onUpdate }: { module: Module, onUpdate: (updates: Partial<Module>) => void }) {
  const [activeSubTab, setActiveSubTab] = useState<'veo' | 'slides'>('slides');
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(module.videoExplanationUrl || null);

  const generateVideo = async () => {
    if (!module.notes && !module.summary) {
      setError("Please add some notes or a summary first to generate a video explanation.");
      return;
    }

    setIsGenerating(true);
    setError(null);
    setStatus('Preparing script...');

    try {
      // 1. Check for API key
      if (!(await (window as any).aistudio.hasSelectedApiKey())) {
        setStatus('Please select a Gemini API key to continue.');
        await (window as any).aistudio.openSelectKey();
      }

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      // 2. Generate a prompt for the video
      setStatus('Generating video prompt...');
      const promptResponse = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Create a highly descriptive visual prompt for a 5-second academic video explanation based on these notes: ${module.summary || module.notes?.substring(0, 2000)}. The video should be educational, clear, and visually engaging. Return only the prompt text.`,
      });
      const videoPrompt = promptResponse.text || `An educational animation explaining ${module.title}`;

      // 3. Start video generation
      setStatus('Starting video generation (this may take a minute)...');
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: videoPrompt,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      // 4. Poll for completion
      const messages = [
        "Synthesizing visual elements...",
        "Rendering AI narration...",
        "Almost there, finalizing the lesson...",
        "Polishing the video explanation..."
      ];
      let msgIndex = 0;

      while (!operation.done) {
        setStatus(messages[msgIndex % messages.length]);
        msgIndex++;
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        // Fetch the video with the API key
        const response = await fetch(downloadLink, {
          method: 'GET',
          headers: {
            'x-goog-api-key': process.env.GEMINI_API_KEY as string,
          },
        });
        const blob = await response.blob();
        const localUrl = URL.createObjectURL(blob);
        setVideoUrl(localUrl);
        onUpdate({ videoExplanationUrl: localUrl });
        setStatus('Video generated successfully!');
      } else {
        throw new Error("Failed to get video download link.");
      }
    } catch (err: any) {
      console.error('Video generation error:', err);
      if (err.message?.includes("Requested entity was not found")) {
        setError("API Key error. Please try selecting your key again.");
        await (window as any).aistudio.openSelectKey();
      } else {
        setError("Failed to generate video. Please try again later.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex bg-white p-1 rounded-2xl border border-slate-100 shadow-sm w-fit">
        <button 
          onClick={() => setActiveSubTab('slides')}
          className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${activeSubTab === 'slides' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          Slide Explanation
        </button>
        <button 
          onClick={() => setActiveSubTab('veo')}
          className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${activeSubTab === 'veo' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          AI Video (Veo)
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeSubTab === 'slides' ? (
          <motion.div key="slides" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
            <SlideExplanationView module={module} onUpdate={onUpdate} />
          </motion.div>
        ) : (
          <motion.div key="veo" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                  <Video size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-800">AI Video Lesson Generator</h4>
                  <p className="text-sm text-slate-400">Create short, visual AI-narrated explanations from your notes.</p>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-medium flex items-center gap-2 border border-red-100">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}

              <div className="aspect-video bg-slate-50 rounded-[2rem] border border-dashed border-slate-200 flex flex-col items-center justify-center overflow-hidden relative">
                {videoUrl ? (
                  <video src={videoUrl} controls className="w-full h-full object-cover" />
                ) : isGenerating ? (
                  <div className="text-center space-y-4">
                    <div className="flex justify-center gap-2">
                      <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-3 h-3 bg-indigo-600 rounded-full" />
                      <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }} className="w-3 h-3 bg-indigo-600 rounded-full" />
                      <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.6 }} className="w-3 h-3 bg-indigo-600 rounded-full" />
                    </div>
                    <p className="text-sm font-bold text-slate-600 animate-pulse">{status}</p>
                    <p className="text-[10px] text-slate-400 italic">This usually takes 60-90 seconds</p>
                  </div>
                ) : (
                  <div className="text-center space-y-4 px-8">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm text-slate-300">
                      <Play size={32} />
                    </div>
                    <p className="text-sm text-slate-400 font-medium">No video generated yet. Click the button below to create a visual lesson from your study materials.</p>
                  </div>
                )}
              </div>

              <div className="flex justify-center">
                <button
                  onClick={generateVideo}
                  disabled={isGenerating}
                  className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {isGenerating ? <RotateCcw className="animate-spin" size={18} /> : <Sparkles size={18} />}
                  {videoUrl ? 'Regenerate Video Lesson' : 'Generate AI Video Lesson'}
                </button>
              </div>

              <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100">
                <p className="text-[10px] text-indigo-600 font-medium leading-relaxed">
                  <strong>Note:</strong> This feature uses Veo, a state-of-the-art video generation model. It requires a paid Gemini API key from a Google Cloud project with billing enabled.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function AIChatView({ profile, modules, schedule, module }: { profile: UserProfile, modules: any[], schedule: any[], module?: Module }) {
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: `Hi ${profile.firstName}! I'm your Pfunzo AI assistant. ${module ? `How can I help you with your studies for "${module.title}" today?` : "How can I help you with your studies or planning today?"}` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<{ name: string; content: string; type: string }[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    for (const file of Array.from(files)) {
      try {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const base64 = e.target?.result as string;
            setAttachedFiles(prev => [...prev, { name: file.name, content: base64, type: 'image' }]);
          };
          reader.readAsDataURL(file);
        } else {
          const text = await file.text();
          setAttachedFiles(prev => [...prev, { name: file.name, content: text, type: 'text' }]);
        }
      } catch (error) {
        console.error('File upload error:', error);
      }
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if ((!input.trim() && attachedFiles.length === 0) || isLoading) return;

    const userMessage = input.trim() || (attachedFiles.length > 0 ? `Sent ${attachedFiles.length} files` : '');
    let fullPrompt = input;
    if (attachedFiles.length > 0) {
      fullPrompt += "\n\nAttached Files Context:\n" + attachedFiles.map(f => `File: ${f.name}\nContent: ${f.type === 'image' ? '[Image Attached]' : f.content}`).join('\n---\n');
    }

    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setAttachedFiles([]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const now = new Date();
      const modulesContext = modules.map(m => {
        const assessments = m.assessments?.map((a: any) => `- ${a.title} (Due: ${a.dueDate}, Weight: ${a.weight}%, Status: ${a.status || 'Pending'}${a.markReceived ? `, Mark: ${a.markReceived}%` : ''})`).join('\n  ');
        const outcomes = m.learningOutcomes?.map(o => `- ${o}`).join('\n  ') || 'None identified';
        return `- ${m.title} (${m.moduleType}): ${m.units?.length || 0} units, Mastery: ${m.masteryScore || 0}%\n  Assessments:\n  ${assessments || 'None'}\n  Learning Outcomes:\n  ${outcomes}`;
      }).join('\n');
      
      const scheduleContext = schedule
        .filter((s: any) => isAfter(s.start, now))
        .slice(0, 10)
        .map(s => `- ${s.title} (${s.type}): ${format(s.start, 'EEEE, MMM d, HH:mm')} to ${format(s.end, 'HH:mm')}`)
        .join('\n');

      const studyPrefs = profile.studyPreferences ? `
      - Preferred Hours: ${profile.studyPreferences.preferredStartTime} to ${profile.studyPreferences.preferredEndTime}
      - Session Duration: ${profile.studyPreferences.sessionDuration} minutes
      - Break Duration: ${profile.studyPreferences.breakDuration} minutes
      ` : 'Not set';

      const availability = profile.availability?.filter(a => a.enabled).map(a => `- ${a.day}: ${a.startTime} - ${a.endTime}`).join('\n') || 'Not set';

      const contents: any[] = [
        { role: 'user', parts: [{ text: `You are Pfunzo AI, a highly context-aware, helpful, and encouraging academic assistant for a ${profile.studentLevel} student named ${profile.firstName}.
          Your goal is to help them with study materials, explain complex topics, and assist with academic planning.
          
          CURRENT TIME: ${format(now, 'EEEE, MMMM d, yyyy, HH:mm')}
          
          ${module ? `CURRENT FOCUS: You are currently assisting the student with the module "${module.title}".` : ''}
          ${module?.notes ? `MODULE NOTES: ${module.notes.substring(0, 5000)}` : ''}

          Student Learning Preferences:
          ${studyPrefs}
          
          Weekly Availability:
          ${availability}

          Current Student Context:
          - Level: ${profile.studentLevel}
          - Institution: ${profile.institution}
          - Modules & Assessments:
          ${modulesContext || 'No modules added yet.'}
          - Upcoming Schedule (Next 10 sessions):
          ${scheduleContext || 'No upcoming sessions.'}
          
          Guidelines:
          1. Use the student's schedule and preferences to give better advice. For example, if they have a deadline coming up, remind them or suggest study blocks.
          2. If they ask about their progress, refer to their modules and assessments.
          3. Be concise, accurate, and supportive. Use markdown for formatting.` }] }
      ];

      // Add history
      messages.forEach(m => {
        contents.push({
          role: m.role,
          parts: [{ text: m.text }]
        });
      });

      // Add current message with parts
      const currentParts: any[] = [{ text: fullPrompt }];
      attachedFiles.forEach(file => {
        if (file.type === 'image') {
          currentParts.push({
            inlineData: {
              mimeType: "image/jpeg",
              data: file.content.split(',')[1]
            }
          });
        }
      });

      contents.push({ role: 'user', parts: currentParts });

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: contents
      });

      if (!response.text) {
        throw new Error("I'm sorry, I couldn't process that. Please try rephrasing your question or providing more context.");
      }

      const modelResponse = response.text;
      setMessages(prev => [...prev, { role: 'model', text: modelResponse }]);
    } catch (err: any) {
      console.error("AI Chat Error:", err);
      setMessages(prev => [...prev, { role: 'model', text: `Sorry, I encountered an error: ${err.message || "Please check your connection and try again."}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-[calc(100vh-12rem)] flex flex-col bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-100">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Pfunzo AI Chat</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Always here to help</p>
          </div>
        </div>
        <button 
          onClick={() => setMessages([{ role: 'model', text: `Hi ${profile.firstName}! I'm your Pfunzo AI assistant. ${module ? `How can I help you with your studies for "${module.title}" today?` : "How can I help you with your studies or planning today?"}` }])}
          className="text-[10px] font-bold text-slate-400 hover:text-red-500 uppercase tracking-widest transition-colors"
        >
          Clear Chat
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50/30">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-5 rounded-3xl shadow-sm ${
              m.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
            }`}>
              <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-headings:text-inherit prose-strong:text-inherit prose-code:text-indigo-200">
                <Markdown>{m.text}</Markdown>
              </div>
              <div className="mt-3 flex justify-end">
                <SpeechButton 
                  text={m.text} 
                  className={`!bg-transparent !p-0 !shadow-none !border-none ${m.role === 'user' ? '!text-indigo-100 hover:!text-white' : '!text-slate-400 hover:!text-indigo-600'}`} 
                />
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-5 rounded-3xl border border-slate-100 rounded-tl-none shadow-sm flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-white border-t border-slate-100">
        {attachedFiles.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {attachedFiles.map((file, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 text-[10px] font-bold text-slate-600">
                {file.type === 'image' ? <ImageIcon size={12} /> : <FileText size={12} />}
                <span className="max-w-[100px] truncate">{file.name}</span>
                <button onClick={() => setAttachedFiles(prev => prev.filter((_, i) => i !== idx))} className="text-slate-400 hover:text-red-500">
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
        <form onSubmit={handleSend} className="flex gap-3">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            multiple 
            className="hidden" 
            accept=".pdf,.docx,.txt,.xlsx,.xls,image/*"
          />
          <button 
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-14 h-14 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center hover:text-indigo-600 transition-all"
          >
            <Paperclip size={20} />
          </button>
          <input 
            className="flex-1 bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
            placeholder="Ask me anything about your studies..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <button 
            type="submit"
            disabled={isLoading || (!input.trim() && attachedFiles.length === 0)}
            className="bg-indigo-600 text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </motion.div>
  );
}

// --- Helper Components ---

function SidebarItem({ active, onClick, icon, label, count, isSubItem }: any) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all ${
        active 
          ? 'bg-white text-indigo-600 shadow-sm border border-slate-100' 
          : 'text-slate-500 hover:bg-white/50 hover:text-slate-800'
      } ${isSubItem ? 'pl-8' : ''}`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="font-bold text-sm tracking-tight">{label}</span>
      </div>
      {count !== undefined && (
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${active ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-400'}`}>
          {count}
        </span>
      )}
    </button>
  );
}

function InteractiveExplanation({ explanation, keyConcepts, moduleId, moduleTitle }: { explanation: string, keyConcepts?: string[], moduleId: string, moduleTitle: string }) {
  const [deepDive, setDeepDive] = useState<{ concept: string; explanation: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDeepDive = async (concept: string) => {
    setIsLoading(true);
    setDeepDive(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Explain the concept of "${concept}" in detail, specifically in the context of the module "${moduleTitle}". 
        Provide:
        1. A clear, academic definition.
        2. 2-3 practical examples.
        3. Why this concept is important for this module.
        Use markdown for formatting.`,
      });
      setDeepDive({ concept, explanation: response.text || "No further information available." });
    } catch (error) {
      console.error("Deep dive error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!keyConcepts || keyConcepts.length === 0) {
    return <p className="text-sm text-indigo-900/80">{explanation}</p>;
  }

  // Sort concepts by length descending to match longest ones first
  const sortedConcepts = [...keyConcepts].sort((a, b) => b.length - a.length);
  // Escape regex special characters
  const escapedConcepts = sortedConcepts.map(c => c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp(`(${escapedConcepts.join('|')})`, 'gi');
  const parts = explanation.split(regex);

  return (
    <div className="relative">
      <p className="text-sm text-indigo-900/80 leading-relaxed">
        {parts.map((part, i) => {
          const isConcept = keyConcepts.some(c => c.toLowerCase() === part.toLowerCase());
          if (isConcept) {
            return (
              <button
                key={i}
                onClick={() => handleDeepDive(part)}
                className="text-indigo-600 font-bold underline decoration-indigo-300 hover:decoration-indigo-600 transition-all px-0.5"
              >
                {part}
              </button>
            );
          }
          return part;
        })}
      </p>

      <AnimatePresence>
        {(isLoading || deepDive) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mt-4 p-4 bg-white rounded-2xl border border-indigo-100 shadow-lg z-10"
          >
            <div className="flex justify-between items-center mb-2">
              <h6 className="font-bold text-indigo-900 flex items-center gap-2">
                <Search size={14} />
                Deep Dive: {deepDive?.concept || 'Analyzing...'}
              </h6>
              <button onClick={() => setDeepDive(null)} className="text-slate-400 hover:text-slate-600">
                <X size={16} />
              </button>
            </div>
            {isLoading ? (
              <div className="flex items-center gap-2 text-xs text-slate-400 py-4">
                <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                Diving deeper into the concept...
              </div>
            ) : (
              <div className="text-xs text-slate-600 prose prose-sm max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                <Markdown>{deepDive?.explanation}</Markdown>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ModuleQuiz({ module, onUpdate, onUpdateStats, selectedUnitId }: { module: Module, onUpdate: (updates: Partial<Module>) => void, onUpdateStats?: (stats: any) => void, selectedUnitId?: string | null }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedUnit = module.units?.find(u => u.id === selectedUnitId);
  const currentQuiz = selectedUnit ? selectedUnit.quiz : module.quiz;

  const generateQuiz = async (data: { text: string; image?: string; excelData?: any[] }) => {
    setIsGenerating(true);
    setError(null);
    try {
      if (!data.text && !data.image && (!data.excelData || data.excelData.length === 0)) {
        throw new Error("Please provide some content to generate a quiz from.");
      }

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      let contextText = data.text;
      if (data.excelData) {
        contextText += `\n\nData from Excel: ${JSON.stringify(data.excelData)}`;
      }

      const unitContext = selectedUnit ? `specifically for Unit ${selectedUnit.unitNumber}: "${selectedUnit.name}"` : '';
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate a 5-question multiple choice quiz from the following content for the module "${module.title}" ${unitContext}. 
        Each question should have 4 options and one correct answer. 
        Include a detailed, educational explanation for the correct answer.
        Also, identify 2-4 "keyConcepts" (short phrases or terms) that appear in the explanation which are central to understanding the answer.
        Return the result as a JSON array of objects with "question", "options" (array of strings), "correctAnswer" (index 0-3), "explanation" (string), and "keyConcepts" (array of strings) properties.
        
        Content:
        ${contextText}
        ${module.notes ? `Module Notes Context: ${module.notes.substring(0, 5000)}` : ''}`,
        config: { responseMimeType: "application/json" }
      });

      if (!response.text) {
        throw new Error("AI failed to generate a quiz. Please try again.");
      }

      const questions = JSON.parse(response.text);
      if (!Array.isArray(questions) || questions.length === 0) {
        throw new Error("AI failed to generate valid quiz questions. Please try again.");
      }

      onUpdate({ 
        quiz: { 
          id: Math.random().toString(36).substr(2, 9), 
          questions: questions.map((q: any) => ({ ...q, id: Math.random().toString(36).substr(2, 9) })) 
        } 
      });
      setCurrentQuestionIdx(0);
      setQuizComplete(false);
      setScore(0);
      setIsAnswered(false);
      setSelectedOption(null);
    } catch (error: any) {
      console.error('Error generating quiz:', error);
      setError(error.message || 'An unexpected error occurred while generating your quiz. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleOptionSelect = (idx: number) => {
    if (isAnswered || !currentQuiz) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === currentQuiz.questions[currentQuestionIdx].correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (!currentQuiz) return;
    if (currentQuestionIdx < currentQuiz.questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setIsAnswered(false);
      setSelectedOption(null);
    } else {
      setQuizComplete(true);
      const finalScore = Math.round(((score + (selectedOption === currentQuiz.questions[currentQuestionIdx].correctAnswer ? 1 : 0)) / currentQuiz.questions.length) * 100);
      onUpdate({ 
        quiz: { ...currentQuiz, lastScore: finalScore, completedAt: new Date() },
        masteryScore: Math.round((finalScore + (module.masteryScore || 0)) / 2) // Simple mastery update
      });

      // Track achievements
      if (onUpdateStats) {
        onUpdateStats({
          quizzesCompleted: (module.quiz?.lastScore !== undefined ? 1 : 0) + 1, // This is a bit naive but okay for now
          perfectScores: finalScore === 100 ? 1 : 0
        });
      }
    }
  };

  if (!currentQuiz) {
    return (
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-10">
        <div className="text-center mb-8">
          <HelpCircle size={48} className="mx-auto text-indigo-200 mb-4" />
          <h5 className="text-xl font-bold text-slate-800 mb-2">
            {selectedUnit ? `Unit ${selectedUnit.unitNumber} Knowledge Check` : 'Knowledge Check'}
          </h5>
          <p className="text-slate-500 max-w-md mx-auto">
            {selectedUnit 
              ? `Generate a custom quiz for Unit ${selectedUnit.unitNumber} to test your understanding of this specific topic.`
              : 'Generate a custom quiz based on your notes or uploaded material to test your understanding.'}
          </p>
        </div>
        
        {error && <AIErrorMessage message={error} onRetry={() => generateQuiz({ text: '' })} />}

        <UniversalInput 
          onProcess={generateQuiz} 
          isProcessing={isGenerating} 
          placeholder={selectedUnit ? `What should the Unit ${selectedUnit.unitNumber} quiz cover?` : "What should the quiz cover? Paste text or upload files..."}
          buttonLabel={isGenerating ? "Generating Quiz..." : "Generate Quiz"}
        />
      </div>
    );
  }

  const currentQuestion = currentQuiz.questions[currentQuestionIdx];

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
            <HelpCircle size={20} />
          </div>
          <div>
            <h5 className="font-bold text-slate-800">
              {selectedUnit ? `Unit ${selectedUnit.unitNumber} Quiz` : 'Module Quiz'}
            </h5>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Question {currentQuestionIdx + 1} of {currentQuiz.questions.length}</p>
          </div>
        </div>
        <button 
          onClick={() => generateQuiz({ text: '' })}
          className="text-xs font-bold text-indigo-600 hover:underline"
        >
          New Quiz
        </button>
      </div>

      <div className="p-8">
        {quizComplete ? (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
              <Award size={40} />
            </div>
            <h6 className="text-2xl font-bold text-slate-800 mb-1">Quiz Complete!</h6>
            <p className="text-slate-500 mb-6">You scored {currentQuiz.lastScore}%</p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => generateQuiz({ text: '' })}
                className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-all"
              >
                Try Another
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <h6 className="text-lg font-bold text-slate-800 leading-tight flex-1">{currentQuestion.question}</h6>
              <SpeechButton text={currentQuestion.question} className="!bg-slate-50 !p-2 !shadow-none !border-none !text-slate-400 hover:!text-indigo-600" />
            </div>
            <div className="grid grid-cols-1 gap-3">
              {currentQuestion.options.map((option, idx) => (
                <div key={idx} className="relative group">
                  <button
                    onClick={() => handleOptionSelect(idx)}
                    disabled={isAnswered}
                    className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                      isAnswered 
                        ? idx === currentQuestion.correctAnswer 
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                          : idx === selectedOption 
                            ? 'bg-red-50 border-red-200 text-red-700'
                            : 'bg-slate-50 border-slate-100 text-slate-400'
                        : 'bg-white border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 text-slate-600'
                    }`}
                  >
                    <span className="font-medium text-sm pr-10">{option}</span>
                    {isAnswered && idx === currentQuestion.correctAnswer && <CheckCircle2 size={18} />}
                    {isAnswered && idx === selectedOption && idx !== currentQuestion.correctAnswer && <X size={18} />}
                  </button>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <SpeechButton text={option} className="!bg-transparent !p-1.5 !shadow-none !border-none !text-slate-300 hover:!text-indigo-400" />
                  </div>
                </div>
              ))}
            </div>

            <AnimatePresence>
              {isAnswered && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 relative group">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Explanation</p>
                      <SpeechButton text={currentQuestion.explanation} className="!bg-transparent !p-0 !shadow-none !border-none !text-indigo-300 hover:!text-indigo-600" />
                    </div>
                    <InteractiveExplanation 
                      explanation={currentQuestion.explanation} 
                      keyConcepts={currentQuestion.keyConcepts}
                      moduleId={module.id}
                      moduleTitle={module.title}
                    />
                  </div>
                  <button 
                    onClick={nextQuestion}
                    className="w-full bg-slate-800 text-white py-3 rounded-2xl font-bold hover:bg-slate-900 transition-all"
                  >
                    {currentQuestionIdx === module.quiz!.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

function ModuleChatbot({ profile, schedule, module, onUpdate, onConfirm }: { 
  profile: UserProfile,
  schedule: ScheduleItem[],
  module: Module, 
  onUpdate: (updates: Partial<Module>) => void,
  onConfirm: (title: string, message: string, onConfirm: () => void) => void
}) {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<{ name: string; content: string; type: string }[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [module.chatHistory]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    for (const file of Array.from(files)) {
      try {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const base64 = e.target?.result as string;
            setAttachedFiles(prev => [...prev, { name: file.name, content: base64, type: 'image' }]);
          };
          reader.readAsDataURL(file);
        } else if (file.type === 'application/pdf') {
          const arrayBuffer = await file.arrayBuffer();
          const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
          let fullText = '';
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            const strings = content.items.map((item: any) => ('str' in item ? item.str : ''));
            fullText += strings.join(' ') + '\n';
          }
          setAttachedFiles(prev => [...prev, { name: file.name, content: fullText, type: 'text' }]);
        } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
          const arrayBuffer = await file.arrayBuffer();
          const result = await mammoth.extractRawText({ arrayBuffer });
          setAttachedFiles(prev => [...prev, { name: file.name, content: result.value, type: 'text' }]);
        } else {
          const text = await file.text();
          setAttachedFiles(prev => [...prev, { name: file.name, content: text, type: 'text' }]);
        }
      } catch (error) {
        console.error('File upload error:', error);
      }
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSend = async () => {
    if (!input.trim() && attachedFiles.length === 0) return;

    let fullText = input;
    if (attachedFiles.length > 0) {
      fullText += "\n\nAttached Files Context:\n" + attachedFiles.map(f => `File: ${f.name}\nContent: ${f.type === 'image' ? '[Image Attached]' : f.content}`).join('\n---\n');
    }

    const userMsg: ModuleChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      role: 'user',
      text: input || (attachedFiles.length > 0 ? `Sent ${attachedFiles.length} files` : ''),
      timestamp: new Date()
    };

    const newHistory = [...(module.chatHistory || []), userMsg];
    onUpdate({ chatHistory: newHistory });
    setInput('');
    setAttachedFiles([]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const now = new Date();
      const studyPrefs = profile.studyPreferences ? `
      - Preferred Hours: ${profile.studyPreferences.preferredStartTime} to ${profile.studyPreferences.preferredEndTime}
      - Session Duration: ${profile.studyPreferences.sessionDuration} minutes
      - Break Duration: ${profile.studyPreferences.breakDuration} minutes
      ` : 'Not set';

      const availability = profile.availability?.filter(a => a.enabled).map(a => `- ${a.day}: ${a.startTime} - ${a.endTime}`).join('\n') || 'Not set';

      const upcomingForModule = schedule
        .filter(s => s.moduleId === module.id && isAfter(s.start, now))
        .slice(0, 5)
        .map(s => `- ${s.title}: ${format(s.start, 'MMM d, HH:mm')}`)
        .join('\n');

      let systemInstruction = `You are Pfunzo AI, a specialized study assistant for the module "${module.title}". 
      Your goal is to help the student understand the material, answer questions, and provide explanations based on the provided module content.
      
      CURRENT TIME: ${format(now, 'EEEE, MMMM d, yyyy, HH:mm')}

      Student Context:
      - Name: ${profile.firstName}
      - Level: ${profile.studentLevel}
      - Learning Preferences: ${studyPrefs}
      - Availability: ${availability}
      - Upcoming Sessions for this Module:
      ${upcomingForModule || 'No upcoming sessions scheduled for this module.'}

      Module Context:
      - Title: ${module.title}
      - Type: ${module.moduleType}
      - Mastery Score: ${module.masteryScore || 0}%
      ${module.summary ? `- Summary: ${module.summary.substring(0, 2000)}` : ''}
      ${module.units?.length ? `- Units: ${module.units.map(u => `${u.unitNumber}: ${u.name}`).join(', ')}` : ''}
      ${module.assessments?.length ? `- Assessments: ${module.assessments.map(a => `${a.title} (Due: ${a.dueDate}${a.dueTime ? ' @ ' + a.dueTime : ''}, Status: ${a.status || 'Pending'}${a.markReceived ? `, Mark: ${a.markReceived}%` : ''})`).join(', ')}` : ''}
      ${module.learningOutcomes?.length ? `- Learning Outcomes: ${module.learningOutcomes.join(', ')}` : ''}
      
      Primary Source Material (Notes):
      ${module.notes?.substring(0, 15000) || 'No notes available.'}
      
      Guidelines:
      1. Always prioritize the provided notes and module context when answering.
      2. If the answer is not in the notes, use your general knowledge but mention that it's not explicitly in the module materials.
      3. Use the student's learning preferences and upcoming schedule to provide tailored advice (e.g., suggesting when to study next).
      4. Be concise, encouraging, and academic in tone.
      5. Use markdown for formatting (bolding, lists, code blocks).
      6. If images are provided, analyze them in the context of the module.`;

      if (isLanguageModule(module)) {
        systemInstruction = `You are Pfunzo AI, an advanced South African language AI Tutor and Study Assistant for the module "${module.title}". 
        You help students learn South African languages from beginner level (age 3) to university level.

        CURRENT TIME: ${format(now, 'EEEE, MMMM d, yyyy, HH:mm')}

        Student Context:
        - Name: ${profile.firstName}
        - Level: ${profile.studentLevel}
        - Learning Preferences: ${studyPrefs}
        - Upcoming Sessions for this Module:
        ${upcomingForModule || 'No upcoming sessions scheduled for this module.'}

        Your role combines:
        • South African language teacher
        • Pronunciation coach
        • Study tutor
        • Academic assistant
        • Academic assistant

        You must teach in a clear, patient, and structured way similar to a real teacher.

        Focus on these five pillars:
        1. Vocabulary: Teach new words, English translations, and example sentences.
        2. Grammar: Explain rules in simple English while keeping South African language examples.
        3. Reading: Provide short passages and help understand vocabulary and sentence meaning.
        4. Pronunciation: Break difficult words into syllables and explain how to pronounce them. Gently correct pronunciation attempts.
        5. Writing: Ask the student to construct sentences and correct grammar, spelling, and word order.

        When the student uploads or pastes study notes, transform them into a structured study guide including:
        • Original South African language text
        • English translation
        • Simple English explanation
        • Key vocabulary list
        • Summary of the section
        • Practice questions
        • Flashcards

        Always keep the South African language text but add English explanations.
        Act supportive and encouraging. If the student struggles, simplify and break concepts into smaller steps.
        Regularly quiz the student and repeat difficult words.
        
        Module Context:
        - Title: ${module.title}
        ${module.notes?.substring(0, 10000) || ''}`;
      }

      const contents: any[] = [];

      (module.chatHistory || []).forEach(m => {
        contents.push({
          role: m.role,
          parts: [{ text: m.text }]
        });
      });

      const currentParts: any[] = [{ text: fullText }];
      attachedFiles.forEach(file => {
        if (file.type === 'image') {
          currentParts.push({
            inlineData: {
              mimeType: "image/jpeg",
              data: file.content.split(',')[1]
            }
          });
        }
      });

      contents.push({ role: 'user', parts: currentParts });

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: contents,
        config: {
          systemInstruction: systemInstruction
        }
      });

      if (!response.text) {
        throw new Error("I'm sorry, I couldn't process that. Please try rephrasing your question or providing more context.");
      }

      const aiMsg: ModuleChatMessage = {
        id: Math.random().toString(36).substr(2, 9),
        role: 'model',
        text: response.text,
        timestamp: new Date()
      };

      onUpdate({ chatHistory: [...newHistory, aiMsg] });
    } catch (error: any) {
      console.error('Chat error:', error);
      const errorMsg: ModuleChatMessage = {
        id: Math.random().toString(36).substr(2, 9),
        role: 'model',
        text: `I'm sorry, I encountered an error: ${error.message || "Please check your connection and try again."}. If the problem persists, try refreshing the page.`,
        timestamp: new Date()
      };
      onUpdate({ chatHistory: [...newHistory, errorMsg] });
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col h-[600px]">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
            <MessageCircle size={20} />
          </div>
          <div>
            <h5 className="font-bold text-slate-800">Study Chatbot</h5>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ask anything about your notes</p>
          </div>
        </div>
        <button 
          onClick={() => {
            if (module.chatHistory?.length) {
              onConfirm(
                "Clear Chat History",
                "Are you sure you want to clear the chat history for this module? This cannot be undone.",
                () => onUpdate({ chatHistory: [] })
              );
            }
          }}
          className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors"
        >
          Clear
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
        {(!module.chatHistory || module.chatHistory.length === 0) && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
              <MessageSquare size={32} />
            </div>
            <p className="text-sm text-slate-400 font-medium">Start a conversation about your study materials.</p>
          </div>
        )}
        {module.chatHistory?.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${
              msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none shadow-md shadow-indigo-100' 
                : 'bg-slate-100 text-slate-700 rounded-tl-none'
            }`}>
              <div className="prose prose-sm prose-invert max-w-none">
                <Markdown>{msg.text}</Markdown>
              </div>
            </div>
            <span className="text-[9px] font-bold text-slate-300 mt-1 uppercase tracking-widest">
              {msg.role === 'user' ? 'You' : 'Gemini'} • {msg.timestamp?.toDate ? format(msg.timestamp.toDate(), 'HH:mm') : format(new Date(msg.timestamp), 'HH:mm')}
            </span>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none flex gap-1">
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-slate-50 border-t border-slate-100">
        {attachedFiles.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {attachedFiles.map((file, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-[10px] font-bold text-slate-600">
                {file.type === 'image' ? <ImageIcon size={12} /> : <FileText size={12} />}
                <span className="max-w-[100px] truncate">{file.name}</span>
                <button onClick={() => setAttachedFiles(prev => prev.filter((_, i) => i !== idx))} className="text-slate-400 hover:text-red-500">
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex items-center gap-3">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            multiple 
            className="hidden" 
            accept=".pdf,.docx,.txt,.xlsx,.xls,image/*"
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="p-3 bg-white rounded-2xl text-slate-400 hover:text-indigo-600 border border-slate-200 transition-colors"
          >
            <Paperclip size={20} />
          </button>
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 bg-white border border-slate-200 rounded-2xl px-6 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
          <button 
            onClick={handleSend}
            disabled={isTyping || (!input.trim() && attachedFiles.length === 0)}
            className="p-3 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 disabled:opacity-50 shadow-lg shadow-indigo-100 transition-all"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

function AIStudyAssistant({ profile, module, onUpdate, onConfirm }: {
  profile: UserProfile;
  module: Module;
  onUpdate: (updates: Partial<Module>) => void;
  onConfirm: (title: string, message: string, onConfirm: () => void) => void;
}) {
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string; type?: 'explanation' | 'quiz' | 'tip' }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const generateResponse = async (prompt: string, type?: 'explanation' | 'quiz' | 'tip') => {
    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const systemInstruction = `You are an expert AI Study Assistant for the module "${module.title}".
      Student Profile: ${profile.firstName} ${profile.lastName}, Level: ${profile.studentLevel}, Grade: ${profile.yearGrade}.
      
      Your goals:
      1. Provide clear, academic explanations of complex concepts.
      2. Generate interactive quizzes to test knowledge.
      3. Offer personalized study tips based on the student's context.
      
      Context from module:
      ${module.notes ? `Module Notes: ${module.notes.substring(0, 2000)}` : 'No notes provided yet.'}
      ${module.units?.map(u => `Unit ${u.unitNumber}: ${u.name}`).join('\n')}
      
      Always be encouraging, academic yet accessible, and focused on the learning outcomes.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: { systemInstruction }
      });

      const text = response.text || "I'm sorry, I couldn't process that request.";
      setMessages(prev => [...prev, { role: 'model', text, type }]);
    } catch (error) {
      console.error('AI Assistant Error:', error);
      setMessages(prev => [...prev, { role: 'model', text: "I encountered an error while trying to help. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    await generateResponse(userMsg);
  };

  const quickActions = [
    { label: 'Explain a Concept', icon: <BookOpen size={14} />, prompt: 'Can you explain a key concept from this module in simple terms?', type: 'explanation' as const },
    { label: 'Quick Quiz', icon: <HelpCircle size={14} />, prompt: 'Generate a 5-question multiple choice quiz based on the module content.', type: 'quiz' as const },
    { label: 'Study Tips', icon: <Sparkles size={14} />, prompt: 'Give me 3 personalized study tips for this module based on my profile.', type: 'tip' as const },
  ];

  const handleClear = () => {
    onConfirm(
      "Clear Chat History",
      "Are you sure you want to clear the current chat history? This action cannot be undone.",
      () => setMessages([])
    );
  };

  const handleSaveChat = () => {
    if (messages.length === 0) return;
    
    const chatText = messages.map(m => 
      `${m.role.toUpperCase()}: ${m.text}\n`
    ).join('\n---\n\n');
    
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${module.title}_Study_Chat_${new Date().toLocaleDateString()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-indigo-50/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
            <Sparkles size={20} />
          </div>
          <div>
            <h5 className="font-bold text-slate-800">AI Study Assistant</h5>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Personalized Learning Partner</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSaveChat}
            disabled={messages.length === 0}
            className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl transition-all disabled:opacity-30"
            title="Save Chat History"
          >
            <Download size={18} />
          </button>
          <button
            onClick={handleClear}
            disabled={messages.length === 0}
            className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-white rounded-xl transition-all disabled:opacity-30"
            title="Clear Chat"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/20 custom-scrollbar">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-200 mb-6 animate-pulse">
              <Brain size={40} />
            </div>
            <h6 className="text-lg font-bold text-slate-800 mb-2">Hello, {profile.firstName}!</h6>
            <p className="text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">
              I'm your AI Study Assistant. I can explain concepts, quiz you, or give you study tips. How can I help you today?
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8 w-full max-w-lg">
              {quickActions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setMessages([{ role: 'user', text: action.label }]);
                    generateResponse(action.prompt, action.type);
                  }}
                  className="p-4 bg-white border border-slate-100 rounded-2xl hover:border-indigo-200 hover:bg-indigo-50/50 transition-all group text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    {action.icon}
                  </div>
                  <p className="text-xs font-bold text-slate-700">{action.label}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={idx}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] p-5 rounded-3xl shadow-sm ${
              m.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
            }`}>
              <div className="prose prose-sm max-w-none prose-slate text-inherit!">
                <ReactMarkdown>{m.text}</ReactMarkdown>
              </div>
              {m.type && (
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2">
                  <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                    m.type === 'explanation' ? 'bg-emerald-50 text-emerald-600' :
                    m.type === 'quiz' ? 'bg-amber-50 text-amber-600' :
                    'bg-indigo-50 text-indigo-600'
                  }`}>
                    {m.type}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-100 p-4 rounded-3xl rounded-tl-none shadow-sm flex items-center gap-3">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Thinking...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-white border-t border-slate-100">
        <form onSubmit={handleSend} className="relative">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about this module..."
            className="w-full bg-slate-50 border-none rounded-2xl pl-6 pr-14 py-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}

function FlashcardItem({ card, index, onUpdate, onDelete }: { card: Flashcard, index: number, onUpdate?: (updates: Partial<Flashcard>) => void, onDelete?: () => void }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState(card.question);
  const [editedAnswer, setEditedAnswer] = useState(card.answer);

  const handleSpacedRepetition = (difficulty: 'hard' | 'good' | 'easy') => {
    if (!onUpdate) return;
    
    let interval = card.interval || 1;
    let easeFactor = card.easeFactor || 2.5;
    
    if (difficulty === 'hard') {
      interval = 1;
      easeFactor = Math.max(1.3, easeFactor - 0.2);
    } else if (difficulty === 'good') {
      interval = Math.ceil(interval * easeFactor);
    } else if (difficulty === 'easy') {
      interval = Math.ceil(interval * easeFactor * 1.3);
      easeFactor = easeFactor + 0.1;
    }
    
    onUpdate({
      interval,
      easeFactor,
      nextReview: addDays(new Date(), interval)
    });
    setIsFlipped(false);
  };

  const handleSave = () => {
    if (onUpdate) {
      onUpdate({ question: editedQuestion, answer: editedAnswer });
      setIsEditing(false);
    }
  };

  return (
    <div className="relative h-64 w-full perspective-1000 group">
      <motion.div
        className="w-full h-full relative preserve-3d transition-all duration-500"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front */}
        <div 
          className="absolute inset-0 backface-hidden bg-white p-6 rounded-3xl border border-slate-100 flex flex-col justify-center items-center text-center shadow-sm cursor-pointer"
          onClick={() => !isEditing && setIsFlipped(true)}
        >
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <SpeechButton 
              text={card.question} 
              className="!p-2 !bg-slate-50 !text-slate-400 hover:!text-indigo-600 !rounded-xl !border-none !shadow-none" 
            />
            <button 
              onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}
              className="p-2 bg-slate-50 text-slate-400 hover:text-indigo-600 rounded-xl transition-colors"
            >
              <Edit3 size={14} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onDelete?.(); }}
              className="p-2 bg-slate-50 text-slate-400 hover:text-red-500 rounded-xl transition-colors"
            >
              <Trash2 size={14} />
            </button>
          </div>

          <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-2">Question {index + 1}</p>
          {isEditing ? (
            <div className="w-full space-y-2" onClick={e => e.stopPropagation()}>
              <textarea 
                value={editedQuestion}
                onChange={e => setEditedQuestion(e.target.value)}
                className="w-full text-xs p-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                rows={3}
              />
              <div className="flex gap-2">
                <button onClick={handleSave} className="flex-1 bg-indigo-600 text-white text-[10px] font-bold py-2 rounded-xl">Save</button>
                <button onClick={() => setIsEditing(false)} className="flex-1 bg-slate-100 text-slate-600 text-[10px] font-bold py-2 rounded-xl">Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <p className="text-sm font-bold text-slate-800">{card.question}</p>
              {card.nextReview && (
                <p className="mt-4 text-[9px] text-slate-400 font-bold">Next Review: {format(new Date(card.nextReview), 'MMM d')}</p>
              )}
              <p className="mt-2 text-[9px] text-slate-300 uppercase font-bold">Click to reveal</p>
            </>
          )}
        </div>

        {/* Back */}
        <div 
          className="absolute inset-0 backface-hidden bg-indigo-600 p-6 rounded-3xl border border-indigo-500 flex flex-col justify-between items-center text-center shadow-sm text-white"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <SpeechButton 
              text={card.answer} 
              className="!p-2 !bg-white/10 !text-indigo-100 hover:!text-white !rounded-xl !border-none !shadow-none" 
            />
          </div>
          <div className="flex-1 flex flex-col justify-center items-center">
            <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest mb-2">Answer</p>
            {isEditing ? (
              <div className="w-full" onClick={e => e.stopPropagation()}>
                <textarea 
                  value={editedAnswer}
                  onChange={e => setEditedAnswer(e.target.value)}
                  className="w-full text-xs p-2 bg-indigo-700 border border-indigo-500 rounded-xl text-white focus:ring-2 focus:ring-white/20 outline-none"
                  rows={4}
                />
              </div>
            ) : (
              <p className="text-sm font-medium leading-relaxed">{card.answer}</p>
            )}
          </div>
          
          <div className="w-full grid grid-cols-3 gap-2 mt-4" onClick={e => e.stopPropagation()}>
            <button 
              onClick={(e) => { e.stopPropagation(); handleSpacedRepetition('hard'); }}
              className="bg-red-500/20 hover:bg-red-500/40 text-[10px] font-bold py-2 rounded-xl transition-all border border-red-400/30"
            >
              Hard
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); handleSpacedRepetition('good'); }}
              className="bg-white/10 hover:bg-white/20 text-[10px] font-bold py-2 rounded-xl transition-all border border-white/20"
            >
              Good
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); handleSpacedRepetition('easy'); }}
              className="bg-emerald-500/20 hover:bg-emerald-500/40 text-[10px] font-bold py-2 rounded-xl transition-all border border-emerald-400/30"
            >
              Easy
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function CopyButton({ text, className = "" }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button 
      onClick={handleCopy}
      className={`flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all ${className}`}
    >
      {copied ? (
        <>
          <CheckCircle2 size={14} className="text-emerald-500" />
          <span className="text-emerald-600">Copied!</span>
        </>
      ) : (
        <>
          <Copy size={14} />
          <span>Copy</span>
        </>
      )}
    </button>
  );
}

function SpeechButton({ text, className = "" }: { text: string, className?: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleSpeak = async () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
      return;
    }

    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
      return;
    }

    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        const audioUrl = addWavHeader(base64Audio);
        const audio = new Audio(audioUrl);
        audioRef.current = audio;
        audio.onended = () => setIsPlaying(false);
        audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('TTS error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <button 
      onClick={handleSpeak}
      disabled={isLoading}
      className={`flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all disabled:opacity-50 ${className}`}
      title={isPlaying ? "Stop Reading" : "Read Aloud"}
    >
      {isLoading ? (
        <RotateCcw size={14} className="animate-spin" />
      ) : isPlaying ? (
        <Square size={14} fill="currentColor" />
      ) : (
        <Volume2 size={14} />
      )}
      {isLoading ? 'Loading...' : isPlaying ? 'Stop' : 'Read Aloud'}
    </button>
  );
}
interface UniversalInputProps {
  onProcess: (data: { text: string; image?: string; excelData?: any[] }) => void;
  isProcessing: boolean;
  placeholder?: string;
  buttonLabel?: string;
}

function UniversalInput({ onProcess, isProcessing, placeholder, buttonLabel }: UniversalInputProps) {
  const [text, setText] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [excelData, setExcelData] = useState<any[] | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    setIsUploading(true);
    try {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else if (file.type === 'application/pdf') {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const strings = content.items.map((item: any) => item.str || '');
          fullText += strings.join(' ') + '\n';
        }
        setText(prev => prev + (prev ? '\n' : '') + fullText);
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        setText(prev => prev + (prev ? '\n' : '') + result.value);
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel') {
        const arrayBuffer = await file.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer);
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);
        setExcelData(data);
        setText(prev => prev + (prev ? '\n' : '') + `[Excel Data Attached: ${data.length} rows]`);
      } else if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
        const content = await file.text();
        setText(prev => prev + (prev ? '\n' : '') + content);
      }
    } catch (error) {
      console.error('Error processing file:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await processFile(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handlePaste = async (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].kind === 'file') {
        const file = items[i].getAsFile();
        if (file) {
          processFile(file);
        }
      }
    }
  };

  const handleClear = () => {
    setText('');
    setImage(null);
    setExcelData(null);
  };

  const handleSubmit = () => {
    if (!text && !image && !excelData) return;
    onProcess({ text, image: image || undefined, excelData: excelData || undefined });
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onPaste={handlePaste}
          placeholder={placeholder || "Paste text or upload files..."}
          className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-indigo-500 min-h-[120px] outline-none transition-all"
        />
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          {image && (
            <div className="relative group">
              <img src={image} alt="Preview" className="w-10 h-10 rounded-lg object-cover border border-slate-200" />
              <button 
                onClick={() => setImage(null)}
                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={10} />
              </button>
            </div>
          )}
          <button 
            onClick={handleClear}
            className="p-2 text-slate-400 hover:text-red-500 transition-colors"
            title="Clear All"
          >
            <RotateCcw size={18} />
          </button>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
            title="Upload Files"
          >
            <Upload size={18} />
          </button>
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf,.docx,.txt,.xlsx,.xls,image/*"
          />
        </div>
      </div>
      
      <button
        onClick={handleSubmit}
        disabled={isProcessing || (!text && !image && !excelData)}
        className="w-full bg-indigo-600 text-white py-3 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isProcessing ? <RotateCcw className="animate-spin" size={18} /> : <Sparkles size={18} />}
        {buttonLabel || "Process with AI"}
      </button>
    </div>
  );
}

const getYoutubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

function YoutubeView({ module, onUpdate }: { module: Module, onUpdate: (updates: Partial<Module>) => void }) {
  const [url, setUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeVideo, setActiveVideo] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAddVideo = async () => {
    const videoId = getYoutubeId(url);
    if (!videoId) {
      setError("Invalid YouTube URL. Please provide a valid YouTube link.");
      return;
    }

    setIsProcessing(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analyze this YouTube video: ${url}. 
        Provide a title and a brief summary of what this video covers in the context of the module "${module.title}".
        Return the result as JSON with "title" and "summary" fields.`,
        config: { 
          tools: [{ urlContext: {} }],
          responseMimeType: "application/json" 
        }
      });

      const data = JSON.parse(response.text);
      const newVideo = {
        id: Math.random().toString(36).substr(2, 9),
        url,
        title: data.title || "YouTube Video",
        summary: data.summary || "No summary available.",
        timestamp: new Date()
      };

      onUpdate({ youtubeVideos: [...(module.youtubeVideos || []), newVideo] });
      setUrl('');
    } catch (error) {
      console.error("Error processing YouTube video:", error);
      // Fallback if urlContext fails or other error
      const newVideo = {
        id: Math.random().toString(36).substr(2, 9),
        url,
        title: "YouTube Video",
        summary: "Could not auto-generate summary. You can still watch the video below.",
        timestamp: new Date()
      };
      onUpdate({ youtubeVideos: [...(module.youtubeVideos || []), newVideo] });
      setUrl('');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
        <div className="flex items-center justify-between mb-6">
          <h5 className="font-bold text-slate-800 flex items-center gap-2">
            <Youtube size={18} className="text-red-600" />
            YouTube Study Resources
          </h5>
        </div>

        {error && (
          <div className="mb-6">
            <AIErrorMessage message={error} onRetry={() => setError(null)} />
          </div>
        )}

        <div className="flex gap-3">
          <input 
            className="flex-1 bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
            placeholder="Paste YouTube video URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button 
            onClick={handleAddVideo}
            disabled={isProcessing || !url.trim()}
            className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {isProcessing ? <RotateCcw className="animate-spin" size={18} /> : <Plus size={18} />}
            {isProcessing ? 'Processing...' : 'Add Video'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 space-y-4">
          <h6 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-2">Video Library</h6>
          {module.youtubeVideos?.length ? (
            module.youtubeVideos.map((video) => (
              <button 
                key={video.id}
                onClick={() => setActiveVideo(video)}
                className={`w-full text-left p-4 rounded-2xl border transition-all ${
                  activeVideo?.id === video.id 
                    ? 'bg-indigo-50 border-indigo-200 shadow-sm' 
                    : 'bg-white border-slate-100 hover:border-indigo-100 hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${activeVideo?.id === video.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    <Youtube size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-bold truncate ${activeVideo?.id === video.id ? 'text-indigo-900' : 'text-slate-700'}`}>
                      {video.title}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Added {video.timestamp?.toDate ? format(video.timestamp.toDate(), 'MMM d') : 'Just now'}</p>
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-8 text-center">
              <p className="text-xs text-slate-400 italic">No videos added yet.</p>
            </div>
          )}
        </div>

        <div className="lg:col-span-8">
          {activeVideo ? (
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
              <div className="aspect-video bg-slate-900">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src={`https://www.youtube.com/embed/${getYoutubeId(activeVideo.url)}`}
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <h5 className="text-xl font-bold text-slate-800">{activeVideo.title}</h5>
                  <button 
                    onClick={() => {
                      const newVideos = module.youtubeVideos?.filter(v => v.id !== activeVideo.id);
                      onUpdate({ youtubeVideos: newVideos });
                      setActiveVideo(null);
                    }}
                    className="p-2 text-slate-300 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <h6 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                    <Brain size={14} className="text-indigo-600" />
                    AI Video Insights
                  </h6>
                  <div className="prose prose-sm max-w-none text-slate-600 leading-relaxed">
                    <Markdown>{activeVideo.summary}</Markdown>
                  </div>
                </div>
                <div className="mt-6 flex gap-3">
                  <button 
                    onClick={() => {
                      // Logic to add summary to module notes
                      onUpdate({ notes: (module.notes || '') + `\n\n### Video Summary: ${activeVideo.title}\n${activeVideo.summary}` });
                    }}
                    className="flex-1 flex items-center justify-center gap-2 bg-indigo-50 text-indigo-600 px-6 py-3 rounded-xl text-xs font-bold hover:bg-indigo-100 transition-all"
                  >
                    <Plus size={14} /> Add to Module Notes
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] bg-white rounded-[2.5rem] border border-dashed border-slate-200 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-200">
                <Youtube size={40} />
              </div>
              <h5 className="text-lg font-bold text-slate-400">Select a video to watch</h5>
              <p className="text-sm text-slate-300 max-w-xs mt-2">Choose a video from your library to watch and view AI insights.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PronunciationCoach({ module, onUpdate }: { module: Module, onUpdate: (updates: any) => void }) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [targetText, setTargetText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setFeedback(null);
      setError(null);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      setError("Could not access microphone. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };
  const analyzePronunciation = async () => {
    if (!audioBlob || !targetText) return;

    setIsAnalyzing(true);
    setError(null);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        try {
          const base64Audio = (reader.result as string).split(',')[1];
          const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
          
          const prompt = `You are a professional South African language pronunciation coach. 
          The student is trying to pronounce the following word or phrase: "${targetText}".
          
          Analyze the provided audio recording and provide immediate, constructive feedback.
          1. Accuracy Score (0-100%).
          2. Specific corrections (break down syllables if needed).
          3. Tips for improvement (e.g., tongue placement, emphasis).
          4. A supportive message.
          
          Format the response using markdown.`;

          const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-native-audio-preview-09-2025",
            contents: [
              { text: prompt },
              {
                inlineData: {
                  mimeType: "audio/webm",
                  data: base64Audio
                }
              }
            ]
          });

          if (!response.text) {
            throw new Error("AI failed to provide feedback. Please try recording again.");
          }

          setFeedback(response.text);
        } catch (innerError: any) {
          console.error("Inner pronunciation analysis error:", innerError);
          setError(innerError.message || 'Failed to analyze audio. Please try recording again.');
        } finally {
          setIsAnalyzing(false);
        }
      };
    } catch (error: any) {
      console.error("Error analyzing pronunciation:", error);
      setError(error.message || 'An unexpected error occurred. Please try again.');
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
            <Mic size={20} />
          </div>
          <div>
            <h5 className="font-bold text-slate-800">Pronunciation Coach</h5>
            <p className="text-xs text-slate-500">Record your voice and get AI feedback on your South African language pronunciation.</p>
          </div>
        </div>

        <div className="space-y-4">
          {error && <AIErrorMessage message={error} onRetry={analyzePronunciation} />}
          
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Word or Phrase to Practice</label>
            <input 
              type="text" 
              value={targetText}
              onChange={(e) => setTargetText(e.target.value)}
              placeholder="e.g., Sawubona, Dumelang, Goeie môre..."
              className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm font-medium"
            />
            <div className="flex flex-wrap gap-2 mt-3">
              {['Sawubona', 'Dumelang', 'Goeie môre', 'Molo', 'Thobela'].map(phrase => (
                <button 
                  key={phrase}
                  onClick={() => setTargetText(phrase)}
                  className="px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-bold hover:bg-indigo-100 transition-colors"
                >
                  {phrase}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center py-8 border-2 border-dashed border-slate-100 rounded-[2rem] bg-slate-50/50">
            {!isRecording ? (
              <button 
                onClick={startRecording}
                disabled={!targetText}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg ${!targetText ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:scale-110 active:scale-95'}`}
              >
                <Mic size={24} />
              </button>
            ) : (
              <button 
                onClick={stopRecording}
                className="w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center animate-pulse shadow-lg hover:scale-110 active:scale-95 transition-all"
              >
                <Square size={24} fill="currentColor" />
              </button>
            )}
            <p className="mt-4 text-xs font-bold text-slate-500">
              {isRecording ? "Recording... Click to stop" : audioBlob ? "Recording captured!" : "Click to start recording"}
            </p>
          </div>

          {audioBlob && !isRecording && (
            <div className="flex flex-col items-center gap-4">
              <audio src={URL.createObjectURL(audioBlob)} controls className="w-full max-w-xs h-10" />
              <button 
                onClick={analyzePronunciation}
                disabled={isAnalyzing}
                className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Get AI Feedback
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {feedback && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-indigo-50 p-8 rounded-[2.5rem] border border-indigo-100"
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={18} className="text-indigo-600" />
            <h6 className="font-bold text-indigo-900">AI Feedback</h6>
          </div>
          <div className="prose prose-sm prose-indigo max-w-none text-indigo-800">
            <Markdown>{feedback}</Markdown>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function NotesEditor({ 
  notes, 
  learningOutcomes, 
  onUpdate, 
  isEditing, 
  setIsEditing, 
  editedNotes, 
  setEditedNotes, 
  isGenerating, 
  generateAutoNotes, 
  refineNotes, 
  isUploading, 
  handleFileUpload,
  moduleTitle,
  unitContext,
  error,
  setError
}: {
  notes?: string;
  learningOutcomes?: string[];
  onUpdate: (updates: { notes?: string; learningOutcomes?: string[] }) => void;
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
  editedNotes: string;
  setEditedNotes: (val: string) => void;
  isGenerating: boolean;
  generateAutoNotes: () => void;
  refineNotes: () => void;
  isUploading: boolean;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  moduleTitle: string;
  unitContext: string;
  error?: string | null;
  setError?: (val: string | null) => void;
}) {
  return (
    <div className="space-y-6">
      {error && (
        <AIErrorMessage message={error} onRetry={() => setError?.(null)} />
      )}
      <div className="flex justify-between items-center px-2">
        <h6 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
          {isEditing ? 'Edit Notes' : 'Study Notes'}
        </h6>
        <div className="flex items-center gap-2">
          {notes && !isEditing && (
            <button 
              onClick={() => {
                setEditedNotes(notes || '');
                setIsEditing(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-bold text-slate-600 hover:bg-slate-50 transition-all"
            >
              <Edit3 size={12} />
              Edit
            </button>
          )}
          <button 
            onClick={refineNotes}
            disabled={isGenerating || (isEditing ? !editedNotes.trim() : !notes?.trim())}
            className="text-[10px] font-bold text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg border border-indigo-100 flex items-center gap-2 disabled:opacity-50 transition-all"
          >
            {isGenerating ? <RotateCcw className="animate-spin" size={12} /> : <Sparkles size={12} />}
            AI Refine & Expand
          </button>
        </div>
      </div>

      {learningOutcomes && learningOutcomes.length > 0 && (
        <div className="p-6 bg-indigo-50/50 rounded-3xl border border-indigo-100/50">
          <div className="flex items-center gap-2 mb-4">
            <Target size={16} className="text-indigo-600" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600">Learning Outcomes</span>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {learningOutcomes.map((lo, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-indigo-900 font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                {lo}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {!notes || isEditing ? (
        <div className="space-y-6">
          <textarea
            value={editedNotes}
            onChange={(e) => setEditedNotes(e.target.value)}
            placeholder="Type or paste your notes here..."
            className="w-full h-96 bg-slate-50 border-none rounded-[2rem] p-8 text-sm focus:ring-2 focus:ring-indigo-500 transition-all resize-none font-medium text-slate-700"
          />

          {!notes && !isEditing && (
            <div className="flex flex-col gap-3">
              <UniversalInput 
                onProcess={async (data) => {
                  let text = data.text;
                  if (data.excelData) text += `\n\nExcel Data: ${JSON.stringify(data.excelData)}`;
                  setEditedNotes(text);
                  setIsEditing(true);
                }} 
                isProcessing={isUploading} 
                placeholder="Or upload files to extract text..."
                buttonLabel={isUploading ? "Uploading..." : "Extract from Files"}
              />
              <button 
                onClick={generateAutoNotes}
                disabled={isGenerating}
                className="text-xs font-bold text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-xl border border-indigo-100 flex items-center gap-2 mx-auto disabled:opacity-50 transition-all"
              >
                {isGenerating ? <RotateCcw className="animate-spin" size={14} /> : <Sparkles size={14} />}
                Generate Detailed Notes with AI
              </button>
            </div>
          )}

          <div className="flex justify-end gap-3">
            {isEditing && (
              <button 
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
            )}
            <button 
              onClick={() => {
                onUpdate({ notes: editedNotes });
                setIsEditing(false);
              }}
              disabled={!editedNotes.trim()}
              className="px-8 py-3 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all disabled:opacity-50"
            >
              Save Notes
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="p-8 bg-slate-50/50 rounded-3xl border border-slate-100 max-h-[600px] overflow-y-auto">
            <div className="prose prose-sm max-w-none">
              <Markdown>{notes}</Markdown>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <SpeechButton text={notes || ''} />
            <CopyButton text={notes || ''} />
            <button 
              onClick={() => {
                setEditedNotes(notes || '');
                setIsEditing(true);
              }}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all"
            >
              <Edit3 size={14} />
              Edit Notes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function StudyMaterials({ module, onUpdate, onUpdateStats, profile, modules, communities, schedule, onConfirm }: { 
  module: Module, 
  onUpdate: (updates: Partial<Module>) => void,
  onUpdateStats?: (stats: any) => void,
  profile: UserProfile,
  modules: Module[],
  communities: Community[],
  schedule: ScheduleItem[],
  onConfirm: (title: string, message: string, onConfirm: () => void) => void
}) {
  const [activeTab, setActiveTab] = useState<'units' | 'summary' | 'flashcards' | 'quiz' | 'chat' | 'exams' | 'voice' | 'homework' | 'mindmap' | 'generalChat' | 'youtube' | 'translator' | 'resources' | 'video' | 'pronunciation' | 'virtual_classroom' | 'grades' | 'aiAssistant'>(module.units?.length ? 'units' : (module.notes ? 'summary' : 'units'));
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isGeneratingFlashcards, setIsGeneratingFlashcards] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isGeneratingNotes, setIsGeneratingNotes] = useState(false);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [editedNotes, setEditedNotes] = useState('');
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);
  const [isAddingResource, setIsAddingResource] = useState(false);
  const [newResource, setNewResource] = useState({ name: '', type: 'link' as 'link' | 'text', content: '' });
  const [isUploadingResource, setIsUploadingResource] = useState(false);
  const [isGeneratingUnits, setIsGeneratingUnits] = useState(false);
  const [sharingResource, setSharingResource] = useState<UnitResource | null>(null);
  const [expandedUnitId, setExpandedUnitId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const stats = useMemo(() => {
    const units = module.units || [];
    const completedUnits = units.filter(u => u.completed).length;
    const unitProgress = units.length > 0 ? Math.round((completedUnits / units.length) * 100) : 0;
    return { completedUnits, unitProgress, totalUnits: units.length };
  }, [module.units]);

  const selectedUnit = module.units?.find(u => u.id === selectedUnitId);
  const currentNotes = selectedUnit ? selectedUnit.notes : module.notes;
  const currentSummary = selectedUnit ? selectedUnit.summary : module.summary;
  const currentLearningOutcomes = selectedUnit ? selectedUnit.learningOutcomes : module.learningOutcomes;
  const currentResources = selectedUnit ? selectedUnit.resources : module.resources;
  const currentFlashcards = selectedUnit ? selectedUnit.flashcards : module.flashcards;
  const currentQuiz = selectedUnit ? selectedUnit.quiz : module.quiz;
  const currentPracticeExams = selectedUnit ? selectedUnit.practiceExams : module.practiceExams;

  const handleUpdate = (updates: any) => {
    if (selectedUnitId) {
      const newUnits = (module.units || []).map(u => 
        u.id === selectedUnitId ? { ...u, ...updates } : u
      );
      onUpdate({ units: newUnits });
    } else {
      onUpdate(updates);
    }
  };

  const handleShareToCommunity = async (communityId: string) => {
    if (!sharingResource) return;
    
    try {
      const communityRef = doc(db, 'communities', communityId);
      const community = communities.find(c => c.id === communityId);
      if (!community) return;

      const updatedResources = [
        ...(community.resources || []),
        {
          id: Math.random().toString(36).substr(2, 9),
          name: sharingResource.name,
          type: sharingResource.type === 'file' ? 'text' : sharingResource.type,
          content: sharingResource.content,
          timestamp: Date.now(),
          addedBy: profile.uid,
          addedByName: `${profile.firstName} ${profile.lastName}`
        }
      ];

      await updateDoc(communityRef, { resources: updatedResources });
      setSharingResource(null);
      onConfirm("Shared!", `Successfully shared "${sharingResource.name}" to ${community.name}`, () => {});
    } catch (error) {
      console.error("Error sharing resource:", error);
    }
  };

  const handleResourceUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingResource(true);
    try {
      let text = '';
      if (file.type === 'application/pdf') {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const strings = content.items.map((item: any) => ('str' in item ? item.str : ''));
          fullText += strings.join(' ') + '\n';
        }
        text = fullText;
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        text = result.value;
      } else if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
        text = await file.text();
      } else {
        console.error('Unsupported file type');
        return;
      }

      const resource: UnitResource = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: 'file',
        content: text.substring(0, 100000), // Limit size
        timestamp: new Date()
      };

      handleUpdate({ resources: [...(currentResources || []), resource] });
    } catch (error) {
      console.error('Error uploading resource:', error);
    } finally {
      setIsUploadingResource(false);
      e.target.value = '';
    }
  };

  const addLinkResource = () => {
    if (!newResource.name || !newResource.content) return;
    
    const resource: UnitResource = {
      id: Math.random().toString(36).substr(2, 9),
      name: newResource.name,
      type: newResource.type,
      content: newResource.content,
      timestamp: new Date()
    };

    handleUpdate({ resources: [...(currentResources || []), resource] });
    setNewResource({ name: '', type: 'link', content: '' });
    setIsAddingResource(false);
  };

  const deleteResource = (id: string) => {
    const filtered = (currentResources || []).filter(r => r.id !== id);
    handleUpdate({ resources: filtered });
  };

  const generateAIUnits = async () => {
    if (!module.title) {
      setError("Module title is required to generate units.");
      return;
    }
    setIsGeneratingUnits(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `Break down the academic module "${module.title}" into a logical sequence of 5-8 study units.
      For each unit, provide:
      1. Unit Number
      2. Unit Name
      3. A brief 1-sentence summary of what it covers.
      
      Return the result as a JSON array of objects with keys: "unitNumber", "name", "summary".`;
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });
      
      if (!response.text) {
        throw new Error("AI failed to generate study units. Please try again.");
      }

      const suggestedUnits = JSON.parse(response.text);
      if (!Array.isArray(suggestedUnits) || suggestedUnits.length === 0) {
        throw new Error("AI failed to generate a valid unit sequence. Please try again.");
      }

      const newUnits = suggestedUnits.map((u: any) => ({
        id: Math.random().toString(36).substr(2, 9),
        unitNumber: u.unitNumber.toString(),
        name: u.name,
        summary: u.summary,
        completed: false
      }));
      
      onUpdate({ units: [...(module.units || []), ...newUnits] });
    } catch (e: any) {
      console.error('Error generating units:', e);
      setError(e.message || 'Failed to generate study units. Please try again.');
    } finally {
      setIsGeneratingUnits(false);
    }
  };

  const mainTabs = [
    { id: 'units', label: 'Units & Notes', icon: <List size={16} /> },
    { id: 'summary', label: 'Summary', icon: <Brain size={16} /> },
    { id: 'resources', label: 'Resources', icon: <Paperclip size={16} /> },
    { id: 'grades', label: 'Grades', icon: <Award size={16} /> },
    { id: 'translator', label: 'Translator', icon: <Languages size={16} /> },
    { id: 'flashcards', label: 'Flashcards', icon: <Layers size={16} /> },
    { id: 'quiz', label: 'Quiz', icon: <HelpCircle size={16} /> },
    { id: 'chat', label: 'Chatbot', icon: <MessageCircle size={16} /> },
    { id: 'aiAssistant', label: 'Study Assistant', icon: <Sparkles size={16} /> },
  ];

  if (isLanguageModule(module)) {
    mainTabs.splice(4, 0, { id: 'pronunciation', label: 'Pronunciation', icon: <Mic size={16} /> });
  }

  const moreTabs = [
    { id: 'exams', label: 'Practice Exams', icon: <Award size={16} /> },
    { id: 'voice', label: 'Voice Tutor', icon: <Volume2 size={16} /> },
    { id: 'homework', label: 'Homework Solver', icon: <FileText size={16} /> },
    { id: 'mindmap', label: 'Mind Map Creator', icon: <Network size={16} /> },
    { id: 'generalChat', label: 'AI Study Chat', icon: <MessageSquare size={16} /> },
    { id: 'video', label: 'Video Generator', icon: <Video size={16} /> },
  ];

  const extractLearningOutcomes = async (text: string) => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const loPrompt = `Identify and extract a simple list of 3-5 key Learning Outcomes from the following academic content:
      ${text.substring(0, 5000)}
      Return only a JSON array of strings.`;
      
      const loResponse = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: loPrompt,
        config: { responseMimeType: "application/json" }
      });
      
      return JSON.parse(loResponse.text);
    } catch (e) {
      console.error('Error extracting learning outcomes:', e);
      return null;
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      let text = '';
      if (file.type === 'application/pdf') {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const strings = content.items.map((item: any) => {
            if ('str' in item) return item.str;
            return '';
          });
          fullText += strings.join(' ') + '\n';
        }
        text = fullText;
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        text = result.value;
      } else if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
        text = await file.text();
      } else {
        console.error('Unsupported file type:', file.type);
        // We'll show a message in the UI instead of alert
        return;
      }

      if (!text || text.trim().length === 0) {
        throw new Error('No text could be extracted from this file.');
      }

      // Firestore document limit is 1MB. 
      // Let's limit text to ~800KB to leave room for other fields.
      if (text.length > 800000) {
        text = text.substring(0, 800000) + "\n\n[Note: Text truncated due to size limits]";
      }

      const outcomes = await extractLearningOutcomes(text);
      if (outcomes) {
        handleUpdate({ notes: text, learningOutcomes: outcomes });
      } else {
        handleUpdate({ notes: text });
      }
    } catch (error: any) {
      console.error('Error uploading file:', error);
      // In a real app we'd use a toast, but for now we'll log it
    } finally {
      setIsUploading(false);
      // Reset input
      e.target.value = '';
    }
  };

  const generateAutoNotes = async () => {
    setIsGeneratingNotes(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const unitContext = selectedUnit ? `specifically for Unit ${selectedUnit.unitNumber}: "${selectedUnit.name}" (Summary: ${selectedUnit.summary || 'N/A'})` : '';
      const prompt = `
        You are an expert academic note-taker. Generate comprehensive, high-quality academic study notes for the module "${module.title}" ${unitContext}.
        
        Module Context:
        - Units: ${module.units?.map(u => u.name).join(', ')}
        - Assessments: ${module.assessments?.map(a => a.title).join(', ')}
        
        CRITICAL GUIDELINES FOR TOP-TIER NOTES:
        1. LEARNING OUTCOMES: First, identify and list the core Learning Outcomes for this module/content. Structure the entire set of notes around these outcomes.
        2. ACTIVE PROCESSING: Do not just record information. Curate, structure, and synthesize the content to make complex information manageable and memorable.
        3. STRUCTURE & ORGANIZATION:
           - Use clear, hierarchical Headings and Subheadings.
           - Use consistent formatting: bullet points, numbered lists, and strategic indentation.
           - Ensure logical flow that is easy to scan and review.
        4. ACTIVE SYNTHESIS:
           - Write in a personalized, student-friendly tone (as if explaining oneself).
           - Condense information into core concepts; avoid fluff.
           - Highlight key points, definitions, and formulas using bold text or callout blocks.
        5. VISUALS & INTERACTIVITY:
           - Describe where diagrams or flowcharts would be helpful.
           - Include specific Examples and Case Studies to make abstract concepts concrete.
           - Use symbols and abbreviations for speed and clarity.
        6. PEDAGOGICAL TOOLS:
           - Use the Cornell Method style: Include "Questions in the Margins" (as a separate section or side-note) to facilitate self-testing.
           - Include a "Summary Section" at the end of each major topic with key takeaways.
           - Add "Annotations" for potential exam questions or areas needing further research.
        7. CONTENT SCOPE:
           - Define Key Vocabulary clearly.
           - Create Contextual Links to previously learned material (if applicable).
           - Focus on the "Core Essence" of the required knowledge.

        Structure the output using the Outline Method combined with Cornell Method elements.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: prompt,
      });
      
      if (!response.text) {
        throw new Error("AI failed to generate study notes. Please try again.");
      }

      const outcomes = await extractLearningOutcomes(response.text);
      if (outcomes) {
        handleUpdate({ notes: response.text, learningOutcomes: outcomes });
      } else {
        handleUpdate({ notes: response.text });
      }
    } catch (error: any) {
      console.error('Error generating auto notes:', error);
      setError(error.message || 'Failed to generate study notes. Please check your connection and try again.');
    } finally {
      setIsGeneratingNotes(false);
    }
  };

  const refineNotes = async () => {
    const sourceText = isEditingNotes ? editedNotes : currentNotes;
    if (!sourceText) {
      setError("No notes found to refine. Please provide some content first.");
      return;
    }
    setIsGeneratingNotes(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const unitContext = selectedUnit ? `specifically for Unit ${selectedUnit.unitNumber}: "${selectedUnit.name}"` : '';
      let prompt = `
        Refine the following raw study notes into a comprehensive, high-quality academic study guide for the module "${module.title}" ${unitContext}.
        
        Raw Notes:
        ${sourceText.substring(0, 10000)}
        
        CRITICAL GUIDELINES FOR TOP-TIER NOTES:
        1. LEARNING OUTCOMES: Identify the learning outcomes from the source and structure the notes based on them.
        2. ACTIVE PROCESSING: Curate, structure, and synthesize the content. Actively process information rather than passively recording it.
        3. STRUCTURE & ORGANIZATION:
           - Use clear Headings and Subheadings.
           - Use consistent formatting (bullets, numbered lists, indentation).
        4. ACTIVE SYNTHESIS:
           - Translate information into personal language.
           - Condense into core concepts.
           - Highlight key points, definitions, and formulas.
        5. VISUALS & INTERACTIVITY:
           - Suggest diagrams/flowcharts.
           - Include Examples and Case Studies.
        6. PEDAGOGICAL TOOLS:
           - Use Cornell Method elements (Questions in the Margins).
           - Include a concise Summary Section at the end of each topic.
           - Add Annotations for exam tips or confusing points.
        7. CONTENT SCOPE:
           - Define Key Vocabulary.
           - Connect to Contextual Links.
           - Focus on the "Core Essence".

        Raw Content to process:
        ${sourceText}
      `;

      if (isLanguageModule(module)) {
        prompt = `
          You are an advanced South African language AI Tutor. Transform the following notes into a structured, visually engaging study guide for the module "${module.title}".
          
          The study guide MUST include:
          • Original South African language text
          • English translation
          • Simple English explanation
          • Key vocabulary list (with syllables and pronunciation guides)
          • Summary of the section
          • Practice questions
          • Flashcards (formatted clearly)

          Make the notes visually engaging using markdown tables, structured summaries, and creative visual explanations.
          Always keep the South African language text but add English explanations.
          Act supportive and encouraging.

          Raw Notes:
          ${sourceText}
        `;
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: prompt,
      });
      
      if (!response.text) {
        throw new Error("AI failed to refine your notes. Please try again.");
      }

      if (isEditingNotes) {
        setEditedNotes(response.text || '');
      } else {
        handleUpdate({ notes: response.text });
      }
    } catch (error: any) {
      console.error('Error refining notes:', error);
      setError(error.message || 'Failed to refine notes. Please try again.');
    } finally {
      setIsGeneratingNotes(false);
    }
  };

  const generateSummary = async (data: { text: string; image?: string; excelData?: any[] }) => {
    setIsSummarizing(true);
    setError(null);
    try {
      if (!data.text && !data.image && (!data.excelData || data.excelData.length === 0)) {
        throw new Error("Please provide some content to summarize.");
      }

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      let contextText = data.text;
      if (data.excelData) {
        contextText += `\n\nData from Excel: ${JSON.stringify(data.excelData)}`;
      }

      const unitContext = selectedUnit ? `specifically for Unit ${selectedUnit.unitNumber}: "${selectedUnit.name}"` : '';
      let prompt = `Summarize the following content for the module "${module.title}" ${unitContext}. 
        
        CRITICAL GUIDELINES:
        1. Structure the summary based on the identified Learning Outcomes.
        2. Use a curated, structured, and synthesized approach.
        3. Actively process the information to make it manageable and memorable.
        4. Use clear headings, subheadings, and consistent formatting.
        5. Focus on the "Core Essence" and Key Vocabulary.
        6. Include a brief "Key Takeaways" summary at the end.
        
        Content:
        ${contextText}
        ${currentNotes ? `Context: ${currentNotes.substring(0, 5000)}` : ''}`;

      if (isLanguageModule(module)) {
        prompt = `Summarize the following South African language content for the module "${module.title}". 
        
        CRITICAL GUIDELINES:
        1. Provide the Original South African language text summary.
        2. Provide an English translation for the summary.
        3. Include a Simple English explanation of the key concepts.
        4. List Key Vocabulary with English translations.
        5. Act as a supportive South African language teacher.
        
        Content:
        ${contextText}
        ${currentNotes ? `Context: ${currentNotes.substring(0, 5000)}` : ''}`;
      }

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      if (!response.text) {
        throw new Error("AI failed to generate a summary. Please try again.");
      }

      handleUpdate({ summary: response.text });
    } catch (error: any) {
      console.error('Error generating summary:', error);
      setError(error.message || 'Failed to generate summary. Please try again.');
    } finally {
      setIsSummarizing(false);
    }
  };

  const generateFlashcards = async (data: { text: string; image?: string; excelData?: any[] }) => {
    setIsGeneratingFlashcards(true);
    setError(null);
    try {
      if (!data.text && !data.image && (!data.excelData || data.excelData.length === 0)) {
        throw new Error("Please provide some content to generate flashcards from.");
      }

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      let contextText = data.text;
      if (data.excelData) {
        contextText += `\n\nData from Excel: ${JSON.stringify(data.excelData)}`;
      }

      const unitContext = selectedUnit ? `specifically for Unit ${selectedUnit.unitNumber}: "${selectedUnit.name}"` : '';
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate 10 flashcards from the following content for the module "${module.title}" ${unitContext}. 
        Each flashcard should have a question and a clear, concise answer.
        Return the result as a JSON array of objects with "question" and "answer" properties.
        
        Content:
        ${contextText}
        ${currentNotes ? `Context: ${currentNotes.substring(0, 5000)}` : ''}`,
        config: { responseMimeType: "application/json" }
      });

      if (!response.text) {
        throw new Error("AI failed to generate flashcards. Please try again.");
      }

      const cards = JSON.parse(response.text);
      if (!Array.isArray(cards) || cards.length === 0) {
        throw new Error("AI failed to generate valid flashcards. Please try again.");
      }

      onUpdate({ flashcards: cards.map((c: any) => ({ ...c, id: Math.random().toString(36).substr(2, 9) })) });
    } catch (error: any) {
      console.error('Error generating flashcards:', error);
      setError(error.message || 'Failed to generate flashcards. Please try again.');
    } finally {
      setIsGeneratingFlashcards(false);
    }
  };

  return (
    <div className="mt-8 space-y-6">
      {/* Share Resource Modal */}
      <AnimatePresence>
        {sharingResource && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[32px] shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-slate-900">Share Resource</h3>
                  <button onClick={() => setSharingResource(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <X size={20} className="text-slate-400" />
                  </button>
                </div>

                <div className="mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      {sharingResource.type === 'link' ? <LinkIcon size={20} /> : <FileText size={20} />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{sharingResource.name}</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">{sharingResource.type}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select Community</p>
                  <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                    {communities.filter(c => c.members.includes(profile.uid)).map(community => (
                      <button
                        key={community.id}
                        onClick={() => handleShareToCommunity(community.id)}
                        className="w-full p-4 flex items-center justify-between bg-white border border-slate-100 rounded-2xl hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs ${community.avatarColor || 'bg-indigo-500'}`}>
                            {community.name[0]}
                          </div>
                          <span className="text-sm font-bold text-slate-700">{community.name}</span>
                        </div>
                        <ChevronRight size={16} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                      </button>
                    ))}
                    {communities.filter(c => c.members.includes(profile.uid)).length === 0 && (
                      <p className="text-center py-8 text-sm text-slate-400">You haven't joined any communities yet.</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
            <Brain size={24} />
          </div>
          <div>
            <h4 className="text-xl font-bold text-slate-800">AI Study Suite</h4>
            <div className="flex items-center gap-4 mt-1">
              <div className="flex items-center gap-2">
                <select 
                  value={selectedUnitId || ''} 
                  onChange={(e) => setSelectedUnitId(e.target.value || null)}
                  className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg border-none outline-none cursor-pointer hover:bg-indigo-100 transition-colors"
                >
                  <option value="">Module Overview</option>
                  {module.units?.map(unit => (
                    <option key={unit.id} value={unit.id}>Unit {unit.unitNumber}: {unit.name}</option>
                  ))}
                </select>
                <button
                  onClick={() => onUpdate({ isLanguage: !isLanguageModule(module) })}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                    isLanguageModule(module)
                      ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                  title={isLanguageModule(module) ? "Mark as non-language module" : "Mark as language module"}
                >
                  <Languages size={12} />
                  {isLanguageModule(module) ? 'Language' : 'General'}
                </button>
              </div>

              {module.units && module.units.length > 0 && (
                <div className="flex items-center gap-3">
                  <div className="h-1.5 w-32 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${stats.unitProgress}%` }}
                      className="h-full bg-indigo-500"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-indigo-600">{stats.unitProgress}% Complete</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 bg-slate-100/50 p-1.5 rounded-[2rem] border border-slate-200/50">
          {mainTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-[1.5rem] text-xs font-bold transition-all ${
                activeTab === tab.id 
                  ? 'bg-white text-indigo-600 shadow-sm border border-slate-200/50' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
          
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-[1.5rem] text-xs font-bold transition-all ${
                moreTabs.some(t => t.id === activeTab)
                  ? 'bg-white text-indigo-600 shadow-sm border border-slate-200/50'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'
              }`}
            >
              <MoreHorizontal size={16} />
              {moreTabs.find(t => t.id === activeTab)?.label || 'More Tools'}
              <ChevronDown size={14} className={`ml-1 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-64 bg-white border border-slate-100 shadow-2xl rounded-[2rem] p-3 z-50 overflow-hidden"
                  >
                    <div className="px-4 py-2 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Advanced Tools</span>
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                      {moreTabs.map((tab) => (
                        <button 
                          key={tab.id}
                          onClick={() => { setActiveTab(tab.id as any); setIsDropdownOpen(false); }} 
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                            activeTab === tab.id ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <div className={`p-1.5 rounded-lg ${activeTab === tab.id ? 'bg-white shadow-sm' : 'bg-slate-50'}`}>
                            {tab.icon}
                          </div>
                          {tab.label}
                        </button>
                      ))}
                    </div>
                    <div className="h-px bg-slate-100 my-3 mx-2" />
                    <label className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-indigo-600 hover:bg-indigo-50 cursor-pointer transition-all group">
                      <div className="p-1.5 rounded-lg bg-indigo-100 group-hover:bg-white transition-colors">
                        <Upload size={14} />
                      </div>
                      {isUploading ? 'Uploading...' : 'Upload Study Material'}
                      <input type="file" className="hidden" accept=".pdf,.docx,.txt" onChange={handleFileUpload} disabled={isUploading} />
                    </label>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="min-h-[500px]">
        {error && (
          <div className="mb-6">
            <AIErrorMessage message={error} onRetry={() => setError(null)} />
          </div>
        )}
        <AnimatePresence mode="wait">
          {activeTab === 'units' && (
            <motion.div 
              key="units"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h5 className="font-bold text-slate-800 flex items-center gap-2 text-xl">
                      <List size={24} className="text-indigo-600" />
                      Units & Study Notes
                    </h5>
                    <p className="text-xs text-slate-400 mt-1">Manage your study units and their corresponding notes in one place</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={generateAIUnits}
                      disabled={isGeneratingUnits}
                      className="flex items-center gap-2 px-6 py-3 bg-indigo-50 text-indigo-600 rounded-2xl text-xs font-bold hover:bg-indigo-100 transition-all disabled:opacity-50"
                    >
                      {isGeneratingUnits ? <RotateCcw className="animate-spin" size={16} /> : <Sparkles size={16} />}
                      AI Suggest Units
                    </button>
                    <button 
                      onClick={() => {
                        const newUnits = (module.units || []).map(u => ({ ...u, completed: true }));
                        onUpdate({ units: newUnits });
                      }}
                      className="flex items-center gap-2 px-6 py-3 bg-emerald-50 text-emerald-600 rounded-2xl text-xs font-bold hover:bg-emerald-100 transition-all"
                    >
                      <CheckCircle2 size={16} />
                      Mark All Completed
                    </button>
                    <button 
                      onClick={() => {
                        const newUnit = { 
                          id: Math.random().toString(36).substr(2, 9), 
                          unitNumber: (module.units?.length || 0) + 1 + '', 
                          name: '', 
                          completed: false 
                        };
                        onUpdate({ units: [...(module.units || []), newUnit] });
                      }}
                      className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"
                    >
                      <Plus size={16} />
                      Add New Unit
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Module Overview Notes Section */}
                  <div className={`border-2 transition-all rounded-[2.5rem] overflow-hidden ${expandedUnitId === 'module-overview' ? 'border-indigo-100 bg-indigo-50/10' : 'border-slate-50 bg-slate-50/30'}`}>
                    <button 
                      onClick={() => {
                        const newId = expandedUnitId === 'module-overview' ? null : 'module-overview';
                        setExpandedUnitId(newId);
                        setSelectedUnitId(null);
                        setIsEditingNotes(false);
                      }}
                      className="w-full flex items-center justify-between p-6 hover:bg-white/50 transition-all text-left"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                          <BookOpen size={20} />
                        </div>
                        <div>
                          <h6 className="font-bold text-slate-800">Module Overview Notes</h6>
                          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">General syllabus & high-level notes</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {module.notes && <FileText size={16} className="text-indigo-400" />}
                        <ChevronDown size={20} className={`text-slate-400 transition-transform ${expandedUnitId === 'module-overview' ? 'rotate-180' : ''}`} />
                      </div>
                    </button>

                    <AnimatePresence>
                      {expandedUnitId === 'module-overview' && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-8 pt-0">
                            <div className="h-px bg-indigo-100 mb-8" />
                            <NotesEditor 
                              notes={module.notes} 
                              learningOutcomes={module.learningOutcomes}
                              onUpdate={(updates) => onUpdate(updates)}
                              isEditing={isEditingNotes}
                              setIsEditing={setIsEditingNotes}
                              editedNotes={editedNotes}
                              setEditedNotes={setEditedNotes}
                              isGenerating={isGeneratingNotes}
                              generateAutoNotes={generateAutoNotes}
                              refineNotes={refineNotes}
                              isUploading={isUploading}
                              handleFileUpload={handleFileUpload}
                              moduleTitle={module.title}
                              unitContext=""
                              error={error}
                              setError={setError}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex items-center gap-4 px-4">
                    <div className="h-px flex-1 bg-slate-100" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Study Units</span>
                    <div className="h-px flex-1 bg-slate-100" />
                  </div>

                  {module.units?.map((unit, idx) => (
                    <div key={unit.id} className={`border-2 transition-all rounded-[2.5rem] overflow-hidden ${expandedUnitId === unit.id ? 'border-indigo-100 bg-indigo-50/10' : 'border-slate-50 bg-slate-50/30'}`}>
                      <div className="group flex items-center gap-4 p-6">
                        <button 
                          onClick={() => {
                            const newUnits = (module.units || []).map((u, i) => 
                              i === idx ? { ...u, completed: !u.completed } : u
                            );
                            onUpdate({ units: newUnits });
                          }}
                          className={`w-10 h-10 rounded-2xl border-2 flex items-center justify-center transition-all shrink-0 shadow-sm ${
                            unit.completed 
                              ? 'bg-emerald-500 border-emerald-500 text-white shadow-emerald-100' 
                              : 'border-slate-200 hover:border-indigo-400 bg-white hover:bg-indigo-50'
                          }`}
                          title={unit.completed ? "Mark as incomplete" : "Mark as complete"}
                        >
                          {unit.completed ? <CheckCircle2 size={20} strokeWidth={2.5} /> : <Square size={20} className="text-slate-300" />}
                        </button>
                        
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                          <div className="md:col-span-2">
                            <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-1 block">Unit #</label>
                            <input 
                              className="w-full bg-white border border-slate-200 rounded-xl text-sm py-2.5 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-bold text-slate-700" 
                              value={unit.unitNumber} 
                              onChange={(e) => {
                                const newUnits = [...(module.units || [])];
                                newUnits[idx].unitNumber = e.target.value;
                                onUpdate({ units: newUnits });
                              }}
                              placeholder="e.g. 1"
                            />
                          </div>
                          <div className="md:col-span-6">
                            <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-1 block">Unit Name</label>
                            <input 
                              className="w-full bg-white border border-slate-200 rounded-xl text-sm py-2.5 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-medium text-slate-600" 
                              value={unit.name} 
                              onChange={(e) => {
                                const newUnits = [...(module.units || [])];
                                newUnits[idx].name = e.target.value;
                                onUpdate({ units: newUnits });
                              }}
                              placeholder="e.g. Introduction to Thermodynamics"
                            />
                          </div>
                          <div className="md:col-span-4 flex items-center gap-2 pt-5">
                            <button 
                              onClick={() => {
                                const newId = expandedUnitId === unit.id ? null : unit.id;
                                setExpandedUnitId(newId);
                                setSelectedUnitId(newId);
                                setIsEditingNotes(false);
                              }}
                              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-[10px] font-bold transition-all ${
                                expandedUnitId === unit.id 
                                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100'
                              }`}
                            >
                              <FileText size={14} />
                              {expandedUnitId === unit.id ? 'Close Notes' : 'Study Notes'}
                            </button>
                            <button 
                              onClick={() => {
                                setSelectedUnitId(unit.id);
                                setActiveTab('resources');
                              }}
                              className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-[10px] font-bold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100 transition-all"
                            >
                              <Paperclip size={14} />
                              Resources
                            </button>
                          </div>
                        </div>

                        <button 
                          onClick={() => {
                            onConfirm(
                              "Delete Unit",
                              `Are you sure you want to delete Unit ${unit.unitNumber || idx + 1}? All unit-specific notes and resources will be lost.`,
                              () => {
                                const newUnits = (module.units || []).filter((_, i) => i !== idx);
                                onUpdate({ units: newUnits });
                                if (selectedUnitId === unit.id) setSelectedUnitId(null);
                                if (expandedUnitId === unit.id) setExpandedUnitId(null);
                              }
                            );
                          }}
                          className="p-3 text-slate-300 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100 shrink-0"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <AnimatePresence>
                        {expandedUnitId === unit.id && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-8 pt-0">
                              <div className="h-px bg-indigo-100 mb-8" />
                              <NotesEditor 
                                notes={unit.notes} 
                                learningOutcomes={unit.learningOutcomes}
                                onUpdate={(updates) => {
                                  const newUnits = (module.units || []).map(u => 
                                    u.id === unit.id ? { ...u, ...updates } : u
                                  );
                                  onUpdate({ units: newUnits });
                                }}
                                isEditing={isEditingNotes}
                                setIsEditing={setIsEditingNotes}
                                editedNotes={editedNotes}
                                setEditedNotes={setEditedNotes}
                                isGenerating={isGeneratingNotes}
                                generateAutoNotes={generateAutoNotes}
                                refineNotes={refineNotes}
                                isUploading={isUploading}
                                handleFileUpload={handleFileUpload}
                                moduleTitle={module.title}
                                unitContext={`for Unit ${unit.unitNumber}: ${unit.name}`}
                                error={error}
                                setError={setError}
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}

                  {(!module.units || module.units.length === 0) && (
                    <div className="text-center py-20 bg-slate-50/50 rounded-[2rem] border border-dashed border-slate-200">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300 shadow-sm">
                        <List size={32} />
                      </div>
                      <p className="text-sm text-slate-400 font-medium">No units added yet.</p>
                      <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-bold">Click "Add New Unit" to get started</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'grades' && (
            <motion.div 
              key="grades"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h5 className="font-bold text-slate-800 flex items-center gap-2 text-xl">
                      <Award size={24} className="text-indigo-600" />
                      Grade Weighting & Calculations
                    </h5>
                    <p className="text-xs text-slate-400 mt-1">Configure how your final module mark is calculated</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest block">Year Mark Weight (%)</label>
                    <input 
                      type="number" 
                      className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl text-sm py-3 px-4 focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-transparent transition-all font-bold text-slate-700" 
                      value={module.yearMarkWeight || ''} 
                      onChange={(e) => onUpdate({ yearMarkWeight: parseInt(e.target.value) || 0 })}
                      placeholder="e.g. 40"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest block">Exam Weight (%)</label>
                    <input 
                      type="number" 
                      className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl text-sm py-3 px-4 focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-transparent transition-all font-bold text-slate-700" 
                      value={module.examWeight || ''} 
                      onChange={(e) => onUpdate({ examWeight: parseInt(e.target.value) || 0 })}
                      placeholder="e.g. 60"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest block">Exam/Portfolio Mark (%)</label>
                    <input 
                      type="number" 
                      className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl text-sm py-3 px-4 focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-transparent transition-all font-bold text-emerald-600" 
                      value={module.examMark || ''} 
                      onChange={(e) => onUpdate({ examMark: parseInt(e.target.value) || 0 })}
                      placeholder="e.g. 75"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest block">Pass Mark (%)</label>
                    <input 
                      type="number" 
                      className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl text-sm py-3 px-4 focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-transparent transition-all font-bold text-slate-700" 
                      value={module.passMark ?? profile?.defaultPassMark ?? 50} 
                      onChange={(e) => onUpdate({ passMark: parseInt(e.target.value) || 50 })}
                      placeholder="e.g. 50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-indigo-50/50 p-8 rounded-[2rem] border border-indigo-100 flex flex-col justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase text-indigo-400 tracking-widest mb-2">Calculated Year Mark</p>
                      <p className="text-3xl font-bold text-indigo-600">
                        {(() => {
                          const assessments = module.assessments || [];
                          const totalWeight = assessments.reduce((acc: number, a: any) => acc + (a.weight || 0), 0);
                          if (totalWeight === 0) return '0%';
                          const yearMark = assessments.reduce((acc: number, a: any) => acc + ((a.markReceived || 0) * (a.weight || 0)), 0) / totalWeight;
                          return `${yearMark.toFixed(1)}%`;
                        })()}
                      </p>
                    </div>
                    <div className="mt-6 flex items-center gap-3 text-indigo-400">
                      <BookOpen size={20} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Based on {module.assessments?.length || 0} tasks</span>
                    </div>
                  </div>
                  
                  <div className="bg-amber-50/50 p-8 rounded-[2rem] border border-amber-100 flex flex-col justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase text-amber-500 tracking-widest mb-2">Required in Exam to Pass</p>
                      <p className="text-3xl font-bold text-amber-600">
                        {(() => {
                          const assessments = module.assessments || [];
                          const totalWeight = assessments.reduce((acc: number, a: any) => acc + (a.weight || 0), 0);
                          const yearMark = totalWeight === 0 ? 0 : assessments.reduce((acc: number, a: any) => acc + ((a.markReceived || 0) * (a.weight || 0)), 0) / totalWeight;
                          
                          const yWeight = module.yearMarkWeight || 0;
                          const eWeight = module.examWeight || 0;
                          const pMark = module.passMark ?? profile?.defaultPassMark ?? 50;
                          
                          const currentContribution = (yearMark * yWeight / 100);
                          const needed = pMark - currentContribution;
                          
                          if (needed <= 0) return 'Passed!';
                          if (eWeight === 0) return 'N/A';
                          
                          const requiredExam = (needed / eWeight) * 100;
                          return requiredExam > 100 ? 'Impossible' : `${requiredExam.toFixed(1)}%`;
                        })()}
                      </p>
                    </div>
                    <div className="mt-6 flex items-center gap-3 text-amber-500">
                      <AlertCircle size={20} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Target: {module.passMark ?? profile?.defaultPassMark ?? 50}%</span>
                    </div>
                  </div>

                  <div className="bg-indigo-600 p-8 rounded-[2rem] shadow-xl shadow-indigo-100 flex flex-col justify-between text-white">
                    <div>
                      <p className="text-[10px] font-bold uppercase text-indigo-200 tracking-widest mb-2">Final Module Mark</p>
                      <p className="text-3xl font-bold">
                        {(() => {
                          const assessments = module.assessments || [];
                          const totalWeight = assessments.reduce((acc: number, a: any) => acc + (a.weight || 0), 0);
                          const yearMark = totalWeight === 0 ? 0 : assessments.reduce((acc: number, a: any) => acc + ((a.markReceived || 0) * (a.weight || 0)), 0) / totalWeight;
                          
                          const yWeight = module.yearMarkWeight || 0;
                          const eWeight = module.examWeight || 0;
                          const eMark = module.examMark || 0;
                          
                          const finalMark = (yearMark * yWeight / 100) + (eMark * eWeight / 100);
                          return `${finalMark.toFixed(1)}%`;
                        })()}
                      </p>
                    </div>
                    <div className="mt-6 flex items-center gap-3 text-indigo-200">
                      <Award size={20} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Overall Performance</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}


          {activeTab === 'summary' && (
            <motion.div 
              key="summary"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h5 className="font-bold text-slate-800 flex items-center gap-2">
                  <Brain size={18} className="text-indigo-600" />
                  {selectedUnit ? `Unit ${selectedUnit.unitNumber} Summary` : 'AI Summary'}
                </h5>
                <div className="flex gap-4 items-center">
                  {currentSummary && (
                    <>
                      <SpeechButton text={currentSummary} />
                      <CopyButton text={currentSummary} />
                      <button 
                        onClick={() => handleUpdate({ summary: deleteField() })}
                        className="text-xs font-bold text-slate-400 hover:text-red-500"
                      >
                        Clear
                      </button>
                    </>
                  )}
                </div>
              </div>
              
              <div className="p-8">
                {currentLearningOutcomes && currentLearningOutcomes.length > 0 && (
                  <div className="mb-8 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <div className="flex items-center gap-2 mb-4">
                      <Target size={16} className="text-slate-400" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Core Learning Outcomes</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {currentLearningOutcomes.map((lo, i) => (
                        <span key={i} className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-600 shadow-sm">
                          {lo}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {isSummarizing ? (
                  <div className="flex flex-col items-center justify-center py-20 space-y-4">
                    <RotateCcw className="animate-spin text-indigo-400" size={32} />
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">AI is summarizing {selectedUnit ? `Unit ${selectedUnit.unitNumber}` : 'your notes'}...</p>
                  </div>
                ) : currentSummary ? (
                  <div className="prose prose-sm max-w-none">
                    <Markdown>{currentSummary}</Markdown>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                      <FileText size={32} />
                    </div>
                    <p className="text-sm text-slate-400 font-medium mb-6">No summary generated yet for {selectedUnit ? `Unit ${selectedUnit.unitNumber}` : 'this module'}.</p>
                    <button 
                      onClick={() => generateSummary({ text: currentNotes || '' })}
                      disabled={isSummarizing || !currentNotes}
                      className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center gap-2 mx-auto"
                    >
                      {isSummarizing ? <RotateCcw className="animate-spin" size={18} /> : <Sparkles size={18} />}
                      Generate Summary
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'resources' && (
            <motion.div 
              key="resources"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h5 className="font-bold text-slate-800 flex items-center gap-2">
                      <Paperclip size={18} className="text-indigo-600" />
                      {selectedUnit ? `Unit ${selectedUnit.unitNumber} Resources` : 'Module Resources'}
                    </h5>
                    <p className="text-xs text-slate-400 mt-1">Manage links, files, and snippets for your studies</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-bold hover:bg-indigo-100 cursor-pointer transition-all">
                      {isUploadingResource ? <RotateCcw className="animate-spin" size={14} /> : <Upload size={14} />}
                      {isUploadingResource ? 'Uploading...' : 'Upload File'}
                      <input type="file" className="hidden" onChange={handleResourceUpload} disabled={isUploadingResource} />
                    </label>
                    <button 
                      onClick={() => setIsAddingResource(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 shadow-sm transition-all"
                    >
                      <Plus size={14} />
                      Add Link/Text
                    </button>
                  </div>
                </div>

                {isAddingResource && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mb-8 p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Resource Name</label>
                        <input 
                          type="text" 
                          value={newResource.name}
                          onChange={(e) => setNewResource({...newResource, name: e.target.value})}
                          placeholder="e.g., Lecture Slides, Key Formulas"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Resource Type</label>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => setNewResource({...newResource, type: 'link'})}
                            className={`flex-1 py-3 rounded-xl text-xs font-bold border transition-all ${newResource.type === 'link' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                          >
                            Link / URL
                          </button>
                          <button 
                            onClick={() => setNewResource({...newResource, type: 'text'})}
                            className={`flex-1 py-3 rounded-xl text-xs font-bold border transition-all ${newResource.type === 'text' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                          >
                            Text Snippet
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {newResource.type === 'link' ? 'URL' : 'Content'}
                      </label>
                      <textarea 
                        value={newResource.content}
                        onChange={(e) => setNewResource({...newResource, content: e.target.value})}
                        placeholder={newResource.type === 'link' ? 'https://example.com/resource' : 'Paste your text here...'}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm min-h-[100px]"
                      />
                    </div>
                    <div className="flex justify-end gap-3 pt-2">
                      <button 
                        onClick={() => setIsAddingResource(false)}
                        className="px-6 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-700"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={addLinkResource}
                        className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all"
                      >
                        Save Resource
                      </button>
                    </div>
                  </motion.div>
                )}

                {!currentResources || currentResources.length === 0 ? (
                  <div className="text-center py-16 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300 shadow-sm">
                      <Paperclip size={32} />
                    </div>
                    <p className="text-sm text-slate-400 font-medium">No resources added yet.</p>
                    <p className="text-[10px] text-slate-400 mt-1">Upload files, add links, or save snippets to keep them organized.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentResources.map((resource) => (
                      <div 
                        key={resource.id}
                        className="group p-5 bg-white border border-slate-100 rounded-3xl hover:border-indigo-200 hover:shadow-md transition-all relative"
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                            resource.type === 'link' ? 'bg-blue-50 text-blue-600' : 
                            resource.type === 'file' ? 'bg-emerald-50 text-emerald-600' : 
                            'bg-amber-50 text-amber-600'
                          }`}>
                            {resource.type === 'link' ? <LinkIcon size={20} /> : 
                             resource.type === 'file' ? <FileText size={20} /> : 
                             <TypeIcon size={20} />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h6 className="font-bold text-slate-800 truncate pr-8">{resource.name}</h6>
                            <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                              {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)} • {new Date(resource.timestamp).toLocaleDateString()}
                            </p>
                            <div className="mt-3 flex items-center gap-2">
                              {resource.type === 'link' ? (
                                <div className="flex items-center gap-3">
                                  <a 
                                    href={resource.content.startsWith('http') ? resource.content : `https://${resource.content}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-[10px] font-bold text-indigo-600 hover:underline flex items-center gap-1"
                                  >
                                    Open Link <ExternalLink size={10} />
                                  </a>
                                  <button 
                                    onClick={() => setSharingResource(resource)}
                                    className="text-[10px] font-bold text-slate-400 hover:text-indigo-600 flex items-center gap-1 transition-colors"
                                  >
                                    <Share2 size={10} /> Share
                                  </button>
                                </div>
                              ) : (
                                <div className="flex items-center gap-3">
                                  <button 
                                    onClick={() => onConfirm(resource.name, resource.content, () => {})}
                                    className="text-[10px] font-bold text-indigo-600 hover:underline"
                                  >
                                    View Content
                                  </button>
                                  <button 
                                    onClick={() => setSharingResource(resource)}
                                    className="text-[10px] font-bold text-slate-400 hover:text-indigo-600 flex items-center gap-1 transition-colors"
                                  >
                                    <Share2 size={10} /> Share
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <button 
                          onClick={() => deleteResource(resource.id)}
                          className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'flashcards' && (
            <motion.div 
              key="flashcards"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
                <div className="flex items-center justify-between mb-6">
                  <h5 className="font-bold text-slate-800 flex items-center gap-2">
                    <Layers size={18} className="text-indigo-600" />
                    {selectedUnit ? `Unit ${selectedUnit.unitNumber} Flashcards` : 'Flashcard Generator'}
                  </h5>
                  <div className="flex items-center gap-4">
                    {currentFlashcards?.length ? (
                      <>
                        <CopyButton 
                          text={currentFlashcards.map(f => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n')} 
                          className="!bg-slate-50 border-none"
                        />
                        <button 
                          onClick={() => handleUpdate({ flashcards: [] })}
                          className="text-xs font-bold text-slate-400 hover:text-red-500"
                        >
                          Clear All
                        </button>
                      </>
                    ) : null}
                  </div>
                </div>
                <UniversalInput 
                  onProcess={generateFlashcards} 
                  isProcessing={isGeneratingFlashcards} 
                  placeholder={selectedUnit ? `Generate cards for Unit ${selectedUnit.unitNumber}?` : "Generate cards from specific topics? Paste text or upload files..."}
                  buttonLabel={isGeneratingFlashcards ? "Generating Cards..." : "Generate Flashcards"}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {isGeneratingFlashcards ? (
                  <div className="col-span-full flex flex-col items-center justify-center py-20 space-y-4">
                    <RotateCcw className="animate-spin text-indigo-400" size={32} />
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Generating flashcards...</p>
                  </div>
                ) : currentFlashcards?.length ? (
                  currentFlashcards.map((card, idx) => (
                    <FlashcardItem 
                      key={card.id} 
                      card={card} 
                      index={idx} 
                      onUpdate={(updates) => {
                        const newCards = (currentFlashcards || []).map((c, i) => 
                          i === idx ? { ...c, ...updates } : c
                        );
                        handleUpdate({ flashcards: newCards });
                      }}
                      onDelete={() => {
                        const newCards = (currentFlashcards || []).filter((_, i) => i !== idx);
                        handleUpdate({ flashcards: newCards });
                      }}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-slate-100 border-dashed">
                    <p className="text-slate-400 italic">No flashcards generated yet. Use the input above to start.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'quiz' && (
            <motion.div key="quiz" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <ModuleQuiz module={module} onUpdate={handleUpdate} onUpdateStats={onUpdateStats} selectedUnitId={selectedUnitId} />
            </motion.div>
          )}

          {activeTab === 'exams' && (
            <motion.div key="exams" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <ModulePracticeExam module={module} onUpdate={handleUpdate} selectedUnitId={selectedUnitId} />
            </motion.div>
          )}

          {activeTab === 'chat' && (
            <motion.div key="chat" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <ModuleChatbot profile={profile} schedule={schedule} module={module} onUpdate={onUpdate} onConfirm={onConfirm} />
            </motion.div>
          )}

          {activeTab === 'aiAssistant' && (
            <motion.div key="aiAssistant" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <AIStudyAssistant profile={profile} module={module} onUpdate={onUpdate} onConfirm={onConfirm} />
            </motion.div>
          )}

          {activeTab === 'pronunciation' && (
            <motion.div key="pronunciation" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <PronunciationCoach module={module} onUpdate={onUpdate} />
            </motion.div>
          )}

          {activeTab === 'voice' && (
            <motion.div key="voice" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <ModuleVoiceTutor 
                profile={profile} 
                module={module} 
                onUpdate={onUpdate} 
                communities={communities} 
                handleShareToCommunity={handleShareToCommunity} 
                sharingResource={sharingResource} 
                setSharingResource={setSharingResource} 
              />
            </motion.div>
          )}

          {activeTab === 'homework' && (
            <motion.div key="homework" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <HomeworkSolverView profile={profile} module={module} onUpdate={onUpdate} />
            </motion.div>
          )}


          {activeTab === 'mindmap' && (
            <motion.div key="mindmap" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <MindMapCreatorView profile={profile} module={module} onUpdate={onUpdate} />
            </motion.div>
          )}

          {activeTab === 'generalChat' && (
            <motion.div key="generalChat" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <AIChatView profile={profile} modules={modules} schedule={schedule} module={module} />
            </motion.div>
          )}
          {activeTab === 'translator' && (
            <motion.div 
              key="translator"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <TranslatorView module={module} />
            </motion.div>
          )}
          {activeTab === 'video' && (
            <motion.div 
              key="video"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <VideoGeneratorView module={module} onUpdate={onUpdate} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ModulePracticeExam({ module, onUpdate, selectedUnitId }: { module: Module, onUpdate: (updates: Partial<Module>) => void, selectedUnitId?: string | null }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [exam, setExam] = useState<PracticeExam | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const selectedUnit = module.units?.find(u => u.id === selectedUnitId);
  const currentExams = selectedUnit ? selectedUnit.practiceExams : module.practiceExams;

  const generateExam = async (data: { text: string; image?: string; excelData?: any[] }) => {
    setIsGenerating(true);
    setError(null);
    try {
      if (!data.text && !data.image && (!data.excelData || data.excelData.length === 0)) {
        throw new Error("Please provide some content (text, image, or file) to generate an exam from.");
      }

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      let contextText = data.text;
      if (data.excelData) {
        contextText += `\n\nData from Excel: ${JSON.stringify(data.excelData)}`;
      }

      const unitContext = selectedUnit ? `specifically for Unit ${selectedUnit.unitNumber}: "${selectedUnit.name}"` : '';
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate a comprehensive practice exam for the module "${module.title}" ${unitContext}. 
        Include 10 multiple choice questions covering various topics from the provided content.
        Each question should have 4 options and one correct answer.
        Include a detailed, educational explanation for the correct answer.
        Also, identify 2-4 "keyConcepts" (short phrases or terms) that appear in the explanation which are central to understanding the answer.
        Return the result as a JSON object with "title" and "questions" (array of objects with "question", "options", "correctAnswer", "explanation", "keyConcepts").
        
        Content:
        ${contextText}
        ${module.notes ? `Module Notes Context: ${module.notes.substring(0, 5000)}` : ''}`,
        config: { responseMimeType: "application/json" }
      });

      if (!response.text) {
        throw new Error("AI returned an empty exam. Please try again with more content.");
      }

      const dataResponse = JSON.parse(response.text);
      if (!dataResponse.questions || !Array.isArray(dataResponse.questions) || dataResponse.questions.length === 0) {
        throw new Error("AI failed to generate valid questions. Please try again.");
      }

      const newExam: PracticeExam = {
        id: Math.random().toString(36).substr(2, 9),
        title: dataResponse.title || (selectedUnit ? `Unit ${selectedUnit.unitNumber} Practice Exam` : `${module.title} Practice Exam`),
        questions: dataResponse.questions.map((q: any) => ({ ...q, id: Math.random().toString(36).substr(2, 9) })),
        timeLimit: 15
      };
      setExam(newExam);
      setCurrentQuestionIdx(0);
      setAnswers({});
      setIsSubmitted(false);
      setTimeLeft(newExam.timeLimit * 60);
    } catch (error: any) {
      console.error('Error generating exam:', error);
      setError(error.message || 'An unexpected error occurred while generating your practice exam. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (exam && timeLeft > 0 && !isSubmitted) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && exam && !isSubmitted) {
      handleSubmit();
    }
  }, [exam, timeLeft, isSubmitted]);

  const handleSubmit = () => {
    setIsSubmitted(true);
    let correctCount = 0;
    exam?.questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) correctCount++;
    });
    const score = Math.round((correctCount / (exam?.questions.length || 1)) * 100);
    
    const updatedExams = [...(currentExams || []), { ...exam!, lastScore: score, completedAt: new Date() }];
    onUpdate({ practiceExams: updatedExams });
  };

  if (!exam) {
    return (
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-10">
        <div className="text-center mb-8">
          <Award size={48} className="mx-auto text-indigo-200 mb-4" />
          <h5 className="text-xl font-bold text-slate-800 mb-2">
            {selectedUnit ? `Unit ${selectedUnit.unitNumber} Practice Exam` : 'Practice Exams'}
          </h5>
          <p className="text-slate-500 max-w-md mx-auto">
            {selectedUnit 
              ? `Take a timed, comprehensive exam for Unit ${selectedUnit.unitNumber} to simulate real test conditions.`
              : 'Take a timed, comprehensive exam to simulate real test conditions and master the material.'}
          </p>
        </div>

        {error && (
          <div className="mb-6">
            <AIErrorMessage 
              message={error} 
              onRetry={() => {
                const context = selectedUnit ? (selectedUnit.notes || selectedUnit.summary || '') : (module.notes || '');
                if (context) generateExam({ text: context });
              }} 
            />
          </div>
        )}

        {currentExams && currentExams.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {currentExams.map((ex) => (
              <button
                key={ex.id}
                onClick={() => {
                  setExam(ex);
                  setCurrentQuestionIdx(0);
                  setAnswers({});
                  setIsSubmitted(false);
                  setTimeLeft((ex.timeLimit || 15) * 60);
                }}
                className="p-6 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all text-left group"
              >
                <div className="flex items-center justify-between mb-2">
                  <h6 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{ex.title}</h6>
                  {ex.lastScore !== undefined && (
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${ex.lastScore >= 50 ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                      {ex.lastScore}%
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400">{ex.questions.length} Questions • {ex.timeLimit} Minutes</p>
              </button>
            ))}
          </div>
        )}
        
        <UniversalInput 
          onProcess={generateExam} 
          isProcessing={isGenerating} 
          placeholder={selectedUnit ? `What should the Unit ${selectedUnit.unitNumber} exam focus on?` : "What topics should the exam focus on? Paste text or upload files..."}
          buttonLabel={isGenerating ? "Preparing Exam..." : "Start Practice Exam"}
        />
      </div>
    );
  }

  const currentQuestion = exam.questions[currentQuestionIdx];

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
            <Award size={20} />
          </div>
          <div>
            <h5 className="font-bold text-slate-800">{exam.title}</h5>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Question {currentQuestionIdx + 1} of {exam.questions.length}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-slate-600 font-mono text-sm bg-white px-3 py-1.5 rounded-lg border border-slate-200">
            <Clock size={14} />
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
          {!isSubmitted && (
            <button 
              onClick={handleSubmit}
              className="bg-emerald-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-700 transition-all"
            >
              Submit Exam
            </button>
          )}
        </div>
      </div>

      <div className="p-8">
        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award size={40} className="text-indigo-600" />
            </div>
            <h6 className="text-2xl font-bold text-slate-800 mb-2">Exam Complete!</h6>
            <p className="text-slate-500 mb-8">You scored {Math.round((exam.questions.filter(q => answers[q.id] === q.correctAnswer).length / exam.questions.length) * 100)}%</p>
            
            <div className="max-w-2xl mx-auto space-y-4 text-left mb-8">
              {exam.questions.map((q, i) => (
                <div key={q.id} className={`p-4 rounded-2xl border relative group ${answers[q.id] === q.correctAnswer ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <p className="font-bold text-sm flex-1">{i + 1}. {q.question}</p>
                    <SpeechButton text={q.question} className="!bg-transparent !p-0 !shadow-none !border-none !text-slate-300 hover:!text-indigo-600" />
                  </div>
                  <p className="text-xs mb-1">
                    <span className="font-bold">Your Answer:</span> {q.options[answers[q.id]] || 'None'}
                  </p>
                  <p className="text-xs mb-2">
                    <span className="font-bold">Correct Answer:</span> {q.options[q.correctAnswer]}
                  </p>
                  {q.explanation && (
                    <div className="relative group/exp">
                      <div className="p-2 bg-white/50 rounded-lg pr-8">
                        <InteractiveExplanation 
                          explanation={q.explanation} 
                          keyConcepts={q.keyConcepts}
                          moduleId={module.id}
                          moduleTitle={module.title}
                        />
                      </div>
                      <div className="absolute right-2 top-2">
                        <SpeechButton text={q.explanation} className="!bg-transparent !p-0 !shadow-none !border-none !text-slate-300 hover:!text-indigo-400" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button 
              onClick={() => setExam(null)}
              className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all"
            >
              Back to Exams
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <h6 className="text-lg font-bold text-slate-800">{currentQuestion.question}</h6>
            <div className="grid grid-cols-1 gap-3">
              {currentQuestion.options.map((opt, idx) => (
                <button 
                  key={idx}
                  onClick={() => setAnswers(prev => ({ ...prev, [currentQuestion.id]: idx }))}
                  className={`w-full p-4 rounded-2xl text-left text-sm font-medium transition-all border ${
                    answers[currentQuestion.id] === idx 
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-700 ring-1 ring-indigo-200' 
                      : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50 hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      answers[currentQuestion.id] === idx ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    {opt}
                  </div>
                </button>
              ))}
            </div>
            <div className="flex justify-between pt-6 border-t border-slate-100">
              <button 
                onClick={() => setCurrentQuestionIdx(prev => Math.max(0, prev - 1))}
                disabled={currentQuestionIdx === 0}
                className="text-slate-400 hover:text-slate-600 disabled:opacity-30"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={() => setCurrentQuestionIdx(prev => Math.min(exam.questions.length - 1, prev + 1))}
                disabled={currentQuestionIdx === exam.questions.length - 1}
                className="text-slate-400 hover:text-slate-600 disabled:opacity-30"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ModuleVoiceTutor({ profile, module, onUpdate, communities, handleShareToCommunity, sharingResource, setSharingResource }: { 
  profile: UserProfile | null, 
  module: Module, 
  onUpdate: (updates: Partial<Module>) => void,
  communities: Community[],
  handleShareToCommunity: (communityId: string) => void,
  sharingResource: UnitResource | null,
  setSharingResource: (resource: UnitResource | null) => void
}) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [progress, setProgress] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [localVolume, setLocalVolume] = useState(profile?.voiceTutorSettings?.volume ?? 0.8);
  const [localVoiceName, setLocalVoiceName] = useState(profile?.voiceTutorSettings?.voiceName ?? 'Zephyr');
  const [localSpeakingRate, setLocalSpeakingRate] = useState(profile?.voiceTutorSettings?.speakingRate ?? 1.0);
  const [localPitch, setLocalPitch] = useState(profile?.voiceTutorSettings?.pitch ?? 0);
  const [showSettings, setShowSettings] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConversationMode, setIsConversationMode] = useState(false);
  const [conversation, setConversation] = useState<{ role: 'user' | 'tutor', text: string, audioUrl?: string }[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [conversation]);

  const startConversation = () => {
    setIsConversationMode(true);
    if (conversation.length === 0) {
      const initialMessage = `Hello ${profile?.firstName || 'Student'}! I'm your ${selectedLanguage} voice tutor for ${module.title}. What would you like to discuss or learn about today?`;
      handleTutorResponse(initialMessage);
    }
  };

  const handleTutorResponse = async (text: string) => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const ttsResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `TTS: ${text}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { 
              prebuiltVoiceConfig: { 
                voiceName: localVoiceName as any
              } 
            }
          }
        }
      });

      const base64Audio = ttsResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      const audioUrl = base64Audio ? addWavHeader(base64Audio) : undefined;
      
      setConversation(prev => [...prev, { role: 'tutor', text, audioUrl }]);
      
      if (audioUrl) {
        setCurrentAudioUrl(audioUrl);
        setCurrentTranscript(text);
        setIsPlaying(true);
      }
    } catch (err) {
      console.error("Tutor response error:", err);
      setConversation(prev => [...prev, { role: 'tutor', text }]);
    } finally {
      setIsGenerating(false);
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    
    const userMsg = text.trim();
    setConversation(prev => [...prev, { role: 'user', text: userMsg }]);
    setUserInput('');
    setIsGenerating(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const chatResponse = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          { role: 'user', parts: [{ text: `You are a friendly AI voice tutor for the module "${module.title}". Respond to the student's message in ${selectedLanguage}. Keep it conversational and educational. 
          
          Context:
          ${module.notes ? `Module Notes: ${module.notes.substring(0, 2000)}` : ''}
          
          Conversation History:
          ${conversation.map(c => `${c.role}: ${c.text}`).join('\n')}
          
          Student: ${userMsg}` }] }
        ],
      });

      const responseText = chatResponse.text || "I'm sorry, I couldn't process that. Could you try again?";
      await handleTutorResponse(responseText);
    } catch (err: any) {
      console.error("Send message error:", err);
      setError("Failed to get a response from the tutor.");
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError("Speech recognition is not supported in this browser.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = selectedLanguage === 'English' ? 'en-US' : 'en-ZA'; // Defaulting to English variants for now
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      sendMessage(transcript);
    };

    recognition.start();
  };

  const voiceSettings = profile?.voiceTutorSettings || {
    voiceName: 'Zephyr',
    speakingRate: 1.0,
    pitch: 0,
    volume: 0.8
  };

  const LANGUAGES = [
    'English', 'Afrikaans', 'isiZulu', 'isiXhosa', 'Sepedi', 
    'Setswana', 'Sesotho', 'Xitsonga', 'siSwati', 'Tshivenda', 'isiNdebele'
  ];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = localVolume;
      audioRef.current.playbackRate = localSpeakingRate;
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.error("Audio play error:", err);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentAudioUrl, localVolume, localSpeakingRate]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  const startLesson = async (data: { text: string; image?: string; excelData?: any[] }) => {
    setIsGenerating(true);
    setProgress(0);
    setError(null);
    try {
      if (!data.text && !data.image && (!data.excelData || data.excelData.length === 0)) {
        throw new Error("Please provide some content (text, image, or file) for the tutor to explain.");
      }

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      let contextText = data.text;
      if (data.excelData) {
        contextText += `\n\nData from Excel: ${JSON.stringify(data.excelData)}`;
      }

      const scriptResponse = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `You are a friendly AI voice tutor. Create a short, conversational explanation (about 200 words) of the following content for the module "${module.title}". 
        
        CRITICAL: You MUST generate the explanation in the following language: ${selectedLanguage}.
        
        Make it sound like a real teacher talking to a student. Focus on explaining the core concepts clearly.
        
        Content:
        ${contextText}
        ${module.notes ? `Module Notes Context: ${module.notes.substring(0, 2000)}` : ''}`,
      });
      
      const script = scriptResponse.text || '';
      if (!script) {
        throw new Error("AI failed to generate a lesson script. Please try again.");
      }
      setCurrentTranscript(script);

      const ttsResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `TTS: ${script}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { 
              prebuiltVoiceConfig: { 
                voiceName: localVoiceName as any
              } 
            }
          }
        }
      });

      const base64Audio = ttsResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        const url = addWavHeader(base64Audio);
        setCurrentAudioUrl(url);
        setIsPlaying(true);

        const newHistoryItem = {
          id: Math.random().toString(36).substr(2, 9),
          text: script,
          audioUrl: url,
          language: selectedLanguage,
          timestamp: new Date()
        };

        const updatedHistory = [newHistoryItem, ...(module.voiceTutorHistory || [])];
        onUpdate({ voiceTutorHistory: updatedHistory });
      } else {
        throw new Error("Failed to synthesize audio for the lesson. Please try again.");
      }
    } catch (error: any) {
      console.error('Voice tutor error:', error);
      setError(error.message || 'Failed to generate voice lesson. Please check your connection and try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDelete = (id: string) => {
    const updatedHistory = (module.voiceTutorHistory || []).filter(h => h.id !== id);
    onUpdate({ voiceTutorHistory: updatedHistory });
  };

  return (
    <div className="space-y-8">
      {/* Share Resource Modal */}
      <AnimatePresence>
        {sharingResource && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[32px] shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-slate-900">Share Resource</h3>
                  <button onClick={() => setSharingResource(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <X size={20} className="text-slate-400" />
                  </button>
                </div>

                <div className="mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      {sharingResource.type === 'link' ? <LinkIcon size={20} /> : <FileText size={20} />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{sharingResource.name}</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">{sharingResource.type}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select Community</p>
                  <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                    {profile && communities.filter(c => c.members.includes(profile.uid)).map(community => (
                      <button
                        key={community.id}
                        onClick={() => handleShareToCommunity(community.id)}
                        className="w-full p-4 flex items-center justify-between bg-white border border-slate-100 rounded-2xl hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs ${community.avatarColor || 'bg-indigo-500'}`}>
                            {community.name[0]}
                          </div>
                          <span className="text-sm font-bold text-slate-700">{community.name}</span>
                        </div>
                        <ChevronRight size={16} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                      </button>
                    ))}
                    {profile && communities.filter(c => c.members.includes(profile.uid)).length === 0 && (
                      <p className="text-center py-8 text-sm text-slate-400">You haven't joined any communities yet.</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-100">
              <Mic size={24} />
            </div>
            <div>
              <h5 className="font-bold text-slate-800 text-lg">AI Voice Tutor</h5>
              <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Auditory Learning Support</p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={() => isConversationMode ? setIsConversationMode(false) : startConversation()}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-bold transition-all shadow-lg ${isConversationMode ? 'bg-emerald-600 text-white shadow-emerald-100' : 'bg-indigo-600 text-white shadow-indigo-100 hover:bg-indigo-700'}`}
            >
              {isConversationMode ? <X size={16} /> : <MessageSquare size={16} />}
              {isConversationMode ? 'End Conversation' : 'Start Interactive Session'}
            </button>
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${showSettings ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
            >
              <Settings size={14} className={showSettings ? 'animate-spin-slow' : ''} />
              Voice Settings
            </button>
            <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-xl text-indigo-600 text-xs font-bold">
              <Sparkles size={14} />
              AI Powered
            </div>
            <div className="relative">
              <select 
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="appearance-none bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 pr-10 text-xs font-bold text-slate-600 shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all cursor-pointer"
              >
                <optgroup label="South African Languages">
                  {LANGUAGES.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </optgroup>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-8">
            <AIErrorMessage message={error} onRetry={() => isConversationMode ? startConversation() : startLesson({ text: module.notes || '' })} />
          </div>
        )}

        {isConversationMode ? (
          <div className="space-y-6">
            <div 
              ref={scrollRef}
              className="h-[400px] overflow-y-auto p-6 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-4 custom-scrollbar"
            >
              {conversation.map((msg, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-4 rounded-3xl text-sm font-medium shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none' 
                      : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
                  }`}>
                    <p>{msg.text}</p>
                    {msg.audioUrl && (
                      <button 
                        onClick={() => {
                          setCurrentAudioUrl(msg.audioUrl!);
                          setCurrentTranscript(msg.text);
                          setIsPlaying(true);
                        }}
                        className={`mt-2 p-2 rounded-full flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all ${
                          msg.role === 'user' ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                        }`}
                      >
                        <Volume2 size={12} />
                        Replay Voice
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
              {isGenerating && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-3xl rounded-tl-none border border-slate-100 shadow-sm">
                    <div className="flex gap-1">
                      <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                      <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                      <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <input 
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage(userInput)}
                  placeholder={`Talk to your ${selectedLanguage} tutor...`}
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all pr-12"
                />
                <button 
                  onClick={toggleListening}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all ${isListening ? 'bg-red-500 text-white animate-pulse' : 'text-slate-400 hover:text-indigo-600'}`}
                >
                  <Mic size={20} />
                </button>
              </div>
              <button 
                onClick={() => sendMessage(userInput)}
                disabled={!userInput.trim() || isGenerating}
                className="p-4 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all disabled:opacity-50"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        ) : (
          <>
            <AnimatePresence>
              {showSettings && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden mb-8"
                >
                  <div className="p-6 bg-slate-50 rounded-3xl grid grid-cols-1 md:grid-cols-3 gap-6 border border-slate-100">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Voice Model</label>
                      <div className="grid grid-cols-2 gap-2">
                        {['Zephyr', 'Kore', 'Puck', 'Charon', 'Fenrir'].map((voice) => (
                          <button
                            key={voice}
                            onClick={() => setLocalVoiceName(voice as any)}
                            className={`px-3 py-2 rounded-xl text-[10px] font-bold transition-all border ${
                              localVoiceName === voice 
                                ? 'bg-indigo-600 text-white border-indigo-600' 
                                : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'
                            }`}
                          >
                            {voice}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Speaking Rate</label>
                        <span className="text-[10px] font-bold text-indigo-600">{localSpeakingRate}x</span>
                      </div>
                      <input 
                        type="range" min="0.5" max="2.0" step="0.1"
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        value={localSpeakingRate}
                        onChange={(e) => setLocalSpeakingRate(parseFloat(e.target.value))}
                      />
                      <div className="flex justify-between text-[8px] text-slate-400 font-bold uppercase">
                        <span>Slower</span>
                        <span>Faster</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pitch</label>
                        <span className="text-[10px] font-bold text-indigo-600">{localPitch > 0 ? '+' : ''}{localPitch}</span>
                      </div>
                      <input 
                        type="range" min="-10" max="10" step="1"
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        value={localPitch}
                        onChange={(e) => setLocalPitch(parseInt(e.target.value))}
                      />
                      <div className="flex justify-between text-[8px] text-slate-400 font-bold uppercase">
                        <span>Lower</span>
                        <span>Higher</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="text-slate-500 text-sm mb-8 leading-relaxed">
              Upload your study materials or paste a complex concept below. Your AI Voice Tutor will synthesize a personalized audio lesson in <b>{selectedLanguage}</b> to help you understand better through listening.
            </p>

            <UniversalInput 
              onProcess={startLesson} 
              isProcessing={isGenerating} 
              placeholder={`What would you like the tutor to explain in ${selectedLanguage}? Paste text or upload files...`}
              buttonLabel={isGenerating ? "Synthesizing Lesson..." : `Generate ${selectedLanguage} Lesson`}
            />
          </>
        )}
      </div>

      {currentAudioUrl && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-indigo-600 p-10 rounded-[2.5rem] text-white shadow-xl shadow-indigo-100"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Volume2 size={20} />
              </div>
              <div>
                <span className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest block">Now Playing ({selectedLanguage})</span>
                <span className="font-bold">Personalized Audio Lesson</span>
              </div>
            </div>
            <button 
              onClick={() => setIsPlaying(!isPlaying)} 
              className="w-14 h-14 bg-white rounded-full text-indigo-600 flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
            </button>
          </div>

          <div className="flex items-center gap-4 mb-6 bg-white/10 p-4 rounded-2xl">
            <Volume1 size={16} className="text-indigo-200" />
            <input 
              type="range" min="0" max="1" step="0.01"
              className="flex-1 h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
              value={localVolume}
              onChange={(e) => setLocalVolume(parseFloat(e.target.value))}
            />
            <Volume2 size={16} className="text-indigo-200" />
            <span className="text-[10px] font-bold text-indigo-200 w-8">{Math.round(localVolume * 100)}%</span>
          </div>

          <audio 
            ref={audioRef} 
            src={currentAudioUrl} 
            onEnded={() => {
              setIsPlaying(false);
              setProgress(100);
            }}
            onTimeUpdate={handleTimeUpdate}
            className="hidden"
          />

          <div className="space-y-3">
            <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
              <motion.div 
                animate={{ width: `${progress}%` }}
                transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
                className="h-full bg-white"
              />
            </div>
            <div className="flex justify-between text-[10px] font-bold text-indigo-200 uppercase tracking-widest">
              <span>{audioRef.current ? Math.floor(audioRef.current.currentTime / 60) + ":" + Math.floor(audioRef.current.currentTime % 60).toString().padStart(2, '0') : "0:00"}</span>
              <span>{audioRef.current && !isNaN(audioRef.current.duration) ? Math.floor(audioRef.current.duration / 60) + ":" + Math.floor(audioRef.current.duration % 60).toString().padStart(2, '0') : "0:00"}</span>
            </div>
          </div>

          <div className="mt-10 p-8 bg-white/10 rounded-3xl backdrop-blur-sm border border-white/10">
            <div className="flex items-center gap-2 mb-4">
              <FileText size={14} className="text-indigo-200" />
              <h6 className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest">Lesson Transcript ({selectedLanguage})</h6>
            </div>
            <p className="text-sm text-white leading-relaxed italic opacity-90">"{currentTranscript}"</p>
          </div>
        </motion.div>
      )}

      {module.voiceTutorHistory && module.voiceTutorHistory.length > 0 && (
        <div className="space-y-6">
          <h5 className="text-sm font-bold text-slate-400 uppercase tracking-widest px-4">Previous Lessons</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {module.voiceTutorHistory.map((item) => (
              <motion.div 
                key={item.id} 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm relative group hover:border-indigo-200 transition-all"
              >
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 size={16} />
                </button>
                <div className="flex items-center gap-4 mb-4">
                  <button 
                    onClick={() => {
                      setCurrentAudioUrl(item.audioUrl || null);
                      setCurrentTranscript(item.text);
                      setIsPlaying(true);
                      setProgress(0);
                      if (item.language) setSelectedLanguage(item.language);
                    }}
                    className="w-10 h-10 bg-slate-50 rounded-full text-indigo-600 flex items-center justify-center hover:bg-indigo-50 transition-colors"
                  >
                    <Play size={18} className="ml-0.5" />
                  </button>
                  <div>
                    <p className="text-xs font-bold text-slate-700">Lesson in {item.language || 'English'}</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">{new Date(item.timestamp).toLocaleDateString()} at {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2 italic leading-relaxed">"{item.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function VideoExplanationGenerator({ module }: { module: Module }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoData, setVideoData] = useState<{ slides: { text: string, narration: string }[], audioUrl: string | null } | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const generateVideo = async (data: { text: string; image?: string; excelData?: any[] }) => {
    setIsGenerating(true);
    setError(null);
    try {
      if (!data.text && !data.image && (!data.excelData || data.excelData.length === 0)) {
        throw new Error("Please provide some content (text, image, or file) to generate a video explanation from.");
      }

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      let contextText = data.text;
      if (data.excelData) {
        contextText += `\n\nData from Excel: ${JSON.stringify(data.excelData)}`;
      }

      // 1. AI summarizes topic and generates slide text + narration
      const prompt = `Create a mini lesson video script for the module "${module.title}". 
      Use the following content as context:
      ${contextText}
      ${module.notes ? `Module Notes Context: ${module.notes.substring(0, 5000)}` : ''}
      
      Generate a JSON array of 5 slides. Each slide should have:
      - "text": Brief bullet points for the slide.
      - "narration": A 10-15 second narration script for this slide.
      Return ONLY the JSON array.`;

      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });

      if (!result.text) {
        throw new Error("AI failed to generate video slides. Please try again.");
      }

      const slides = JSON.parse(result.text);
      if (!Array.isArray(slides) || slides.length === 0) {
        throw new Error("AI failed to generate valid slides. Please try again.");
      }

      // 2. Convert narration to speech
      const fullNarration = slides.map((s: any) => s.narration).join(' ... ');
      
      const ttsResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: fullNarration }] }],
        config: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } }
          }
        }
      });

      const base64Audio = ttsResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        const audioUrl = addWavHeader(base64Audio);
        setVideoData({ slides, audioUrl });
        setCurrentSlide(0);
        setIsPlaying(false);
      } else {
        throw new Error("Failed to synthesize audio for the video. Please try again.");
      }

    } catch (error: any) {
      console.error("Video generation failed:", error);
      setError(error.message || 'Failed to generate video explanation. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Simple sync: divide total duration by number of slides
  const handleTimeUpdate = () => {
    if (audioRef.current && videoData) {
      const progress = audioRef.current.currentTime / audioRef.current.duration;
      const slideIndex = Math.min(
        Math.floor(progress * videoData.slides.length),
        videoData.slides.length - 1
      );
      setCurrentSlide(slideIndex);
    }
  };

  return (
    <div className="mt-8 p-8 bg-indigo-50/50 rounded-[2.5rem] border border-indigo-100">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h4 className="text-lg font-bold text-indigo-900 flex items-center gap-2">
            <Video size={20} />
            Video Explanation Generator
          </h4>
          <p className="text-sm text-indigo-600/70">Creates a mini lesson video from your notes or uploaded material.</p>
        </div>
        {videoData && (
          <button 
            onClick={() => setVideoData(null)}
            className="text-xs font-bold text-slate-400 hover:text-red-500"
          >
            Reset
          </button>
        )}
      </div>

      {error && <AIErrorMessage message={error} onRetry={() => setVideoData(null)} />}

      {!videoData && !isGenerating && (
        <div className="bg-white p-8 rounded-3xl border border-indigo-100 shadow-sm">
          <UniversalInput 
            onProcess={generateVideo} 
            isProcessing={isGenerating} 
            placeholder="What should the video explain? Paste text or upload files..."
            buttonLabel={isGenerating ? "Generating Video..." : "Generate Video"}
          />
        </div>
      )}

      {isGenerating && (
        <div className="py-12 text-center space-y-4">
          <div className="flex justify-center gap-2">
            {[0, 1, 2].map(i => (
              <motion.div 
                key={i}
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }}
                className="w-2 h-2 bg-indigo-400 rounded-full"
              />
            ))}
          </div>
          <div className="space-y-1">
            <p className="text-sm font-bold text-indigo-900">AI is crafting your lesson...</p>
            <p className="text-xs text-indigo-400">Summarizing topics, generating slides, and synthesizing narration.</p>
          </div>
        </div>
      )}

      {videoData && (
        <div className="space-y-6">
          <div className="aspect-video bg-slate-900 rounded-2xl overflow-hidden relative flex items-center justify-center p-12 text-center">
            <div className="absolute top-6 right-6 z-10">
              <CopyButton 
                text={videoData.slides[currentSlide].text}
                className="!bg-white/10 hover:!bg-white/20 !border-white/20 !text-white backdrop-blur-sm"
              />
            </div>
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentSlide}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="text-white space-y-4"
              >
                <h5 className="text-indigo-400 text-xs font-bold uppercase tracking-widest">Slide {currentSlide + 1} of {videoData.slides.length}</h5>
                <div className="text-2xl font-bold leading-tight whitespace-pre-wrap">
                  {videoData.slides[currentSlide].text}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-6 left-6 right-6 flex items-center gap-4">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-sm transition-all"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-indigo-500"
                  animate={{ width: audioRef.current ? `${(audioRef.current.currentTime / audioRef.current.duration) * 100}%` : '0%' }}
                />
              </div>
              <Volume2 size={16} className="text-white/40" />
            </div>
          </div>

          <audio 
            ref={audioRef} 
            src={videoData.audioUrl || undefined} 
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
          />

          <div className="flex gap-2">
            <button 
              onClick={() => { setVideoData(null); setIsPlaying(false); }}
              className="text-xs font-bold text-slate-400 hover:text-red-600 transition-all"
            >
              Reset Generator
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
function ModuleCard({ module, profile, modules, communities, schedule, onUpdate, onRemove, onConfirm, onViewDetails, onLogStudy, isDetailed }: any) {
  const [isEditing, setIsEditing] = useState(false);
  const [localModule, setLocalModule] = useState(module);
  const [isUnitsOpen, setIsUnitsOpen] = useState(false);
  const [isGeneratingOverview, setIsGeneratingOverview] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ytUrl, setYtUrl] = useState('');
  const [isProcessingYt, setIsProcessingYt] = useState(false);
  const [activeYtVideo, setActiveYtVideo] = useState<YoutubeVideo | null>(null);

  useEffect(() => {
    setLocalModule(module);
  }, [module]);

  const stats = useMemo(() => {
    const assessmentsWithMarks = module.assessments?.filter((a: any) => a.markReceived !== undefined) || [];
    const totalWeight = assessmentsWithMarks.reduce((acc: number, a: any) => acc + (a.weight || 0), 0);
    const weightedSum = assessmentsWithMarks.reduce((acc: number, a: any) => acc + (a.markReceived! * (a.weight || 0)), 0);
    const average = totalWeight > 0 ? Math.round(weightedSum / totalWeight) : null;

    const totalUnits = module.units?.length || 0;
    const completedUnits = module.units?.filter((u: any) => u.completed).length || 0;
    const unitProgress = totalUnits > 0 ? Math.round((completedUnits / totalUnits) * 100) : 0;

    // Mastery Score: Average of unit progress and quiz score (if available)
    const quizScore = module.quiz?.lastScore || 0;
    const masteryScore = module.quiz ? Math.round((unitProgress + quizScore) / 2) : unitProgress;

    return { average, unitProgress, totalUnits, completedUnits, masteryScore };
  }, [module]);

  const handleSave = () => {
    onUpdate(localModule);
    setIsEditing(false);
  };

  const updateLocal = (updates: any) => {
    setLocalModule({ ...localModule, ...updates });
  };

  const generateAIOverview = async () => {
    setIsGeneratingOverview(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `Generate a concise AI overview for the module "${module.title}".
      Units: ${module.units?.map((u: any) => u.name).join(', ') || 'None'}
      Assessments: ${module.assessments?.map((a: any) => a.title).join(', ') || 'None'}
      
      The overview should highlight key learning objectives and provide a high-level summary. 
      Keep it professional, encouraging, and under 100 words. Use markdown for formatting.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      if (!response.text) {
        throw new Error("AI returned an empty overview. Please try again.");
      }

      onUpdate({ aiOverview: response.text });
    } catch (error: any) {
      console.error('Error generating AI overview:', error);
      setError(error.message || 'Failed to generate AI overview. Please try again.');
    } finally {
      setIsGeneratingOverview(false);
    }
  };

  const handleAddYtVideo = async () => {
    const videoId = getYoutubeId(ytUrl);
    if (!videoId) {
      setError("Invalid YouTube URL. Please provide a valid YouTube link.");
      return;
    }

    setIsProcessingYt(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analyze this YouTube video: ${ytUrl}. 
        Provide a title and a brief summary of what this video covers in the context of the module "${module.title}".
        Return the result as JSON with "title" and "summary" fields.`,
        config: { 
          tools: [{ urlContext: {} }],
          responseMimeType: "application/json" 
        }
      });

      if (!response.text) {
        throw new Error("AI could not analyze the video. Please try again.");
      }

      const data = JSON.parse(response.text);
      const newVideo: YoutubeVideo = {
        id: Math.random().toString(36).substr(2, 9),
        url: ytUrl,
        title: data.title || "YouTube Video",
        summary: data.summary || "No summary available.",
        timestamp: new Date()
      };

      onUpdate({ youtubeVideos: [...(module.youtubeVideos || []), newVideo] });
      setYtUrl('');
    } catch (error: any) {
      console.error("Error processing YouTube video:", error);
      // Fallback: add video without AI summary if AI fails, but show a warning
      const newVideo: YoutubeVideo = {
        id: Math.random().toString(36).substr(2, 9),
        url: ytUrl,
        title: "YouTube Video",
        summary: "Could not auto-generate summary due to an error.",
        timestamp: new Date()
      };
      onUpdate({ youtubeVideos: [...(module.youtubeVideos || []), newVideo] });
      setYtUrl('');
      setError(error.message || 'Video added, but AI analysis failed. You can still watch the video.');
    } finally {
      setIsProcessingYt(false);
    }
  };

  return (
    <motion.div 
      whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden group/module"
    >
      <div className="p-8 border-b border-slate-100">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              {isEditing ? (
                <input 
                  className="flex-1 text-2xl font-bold bg-slate-50 border-none rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-200"
                  value={localModule.title}
                  onChange={(e) => updateLocal({ title: e.target.value })}
                  placeholder="Module Title"
                />
              ) : (
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-1">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                      module.moduleType === 'Exam' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                      module.moduleType === 'Portfolio' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                      'bg-indigo-50 text-indigo-600 border border-indigo-100'
                    }`}>
                      {module.moduleType === 'Exam' && <GraduationCap size={24} />}
                      {module.moduleType === 'Portfolio' && <Briefcase size={24} />}
                      {module.moduleType === 'Assessment Only' && <ClipboardCheck size={24} />}
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-2xl font-bold text-slate-800">{module.title}</h3>
                        {stats.average !== null && (
                          <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                            <Award size={10} />
                            Avg: {stats.average}%
                          </div>
                        )}
                      </div>
                      {module.units && module.units.length > 0 && (
                        <div className="mt-2 w-48">
                          <div className="flex items-center justify-between text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                            <span>Progress</span>
                            <span className="text-indigo-600">{stats.unitProgress}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${stats.unitProgress}%` }}
                              className="h-full bg-indigo-500"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3">
                {!isDetailed && (
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={onLogStudy}
                      className="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-6 py-3 rounded-2xl text-sm font-bold hover:bg-indigo-100 transition-all group/log"
                    >
                      <Clock size={18} className="group-hover/log:scale-110 transition-transform" />
                      Log Study
                    </button>
                    <button 
                      onClick={onViewDetails}
                      className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 group/btn"
                    >
                      View Details
                      <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                )}
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={handleSave}
                      className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-emerald-700 transition-all"
                    >
                      <Save size={14} /> Save
                    </button>
                    <button 
                      onClick={onRemove}
                      className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-100 transition-all"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="p-2 text-slate-400 hover:text-indigo-600 transition-colors opacity-0 group-hover/module:opacity-100"
                      title="Module Settings"
                    >
                      <Settings size={20} />
                    </button>
                    <button 
                      onClick={onRemove}
                      className="p-2 text-slate-300 hover:text-red-600 transition-colors opacity-0 group-hover/module:opacity-100"
                      title="Delete Module"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4 mt-2">
              {isEditing ? (
                <>
                  <select 
                    className="bg-slate-50 border-none rounded-xl text-xs font-bold py-2 px-4 focus:ring-0 text-slate-500 uppercase tracking-wider"
                    value={localModule.moduleType}
                    onChange={(e) => updateLocal({ moduleType: e.target.value })}
                  >
                    <option value="Exam">Exam</option>
                    <option value="Portfolio">Portfolio</option>
                    <option value="Assessment Only">Assessment Only</option>
                  </select>
                  <button
                    onClick={() => updateLocal({ isLanguage: !localModule.isLanguage })}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      localModule.isLanguage 
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    <Languages size={14} />
                    {localModule.isLanguage ? 'Language Module' : 'Not a Language'}
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                    module.moduleType === 'Exam' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                    module.moduleType === 'Portfolio' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                    'bg-slate-50 text-slate-600 border border-slate-100'
                  }`}>
                    {module.moduleType === 'Exam' && <GraduationCap size={12} />}
                    {module.moduleType === 'Portfolio' && <Briefcase size={12} />}
                    {module.moduleType === 'Assessment Only' && <ClipboardCheck size={12} />}
                    {module.moduleType}
                  </span>
                  {isLanguageModule(module) && (
                    <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                      <Languages size={10} />
                      Language
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-4">
            {localModule.moduleType === 'Exam' && (
              <div className="space-y-1 relative group/exam">
                <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Exam Date</label>
                <div className="flex items-center gap-2">
                  {isEditing ? (
                    <input 
                      type="date" 
                      className="bg-slate-50 border-none rounded-xl text-xs py-2 px-3 focus:ring-1 focus:ring-indigo-500" 
                      value={localModule.examDate || ''} 
                      onChange={(e) => updateLocal({ examDate: e.target.value })} 
                    />
                  ) : (
                    <span className="text-xs font-medium text-slate-600">{module.examDate || 'Not set'}</span>
                  )}
                  {isEditing && localModule.examDate && (
                    <button 
                      onClick={() => updateLocal({ examDate: null })}
                      className="text-red-400 hover:text-red-600"
                      title="Remove Exam"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>
            )}
            {localModule.moduleType === 'Portfolio' && (
              <div className="space-y-1 relative group/portfolio">
                <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Portfolio Date</label>
                <div className="flex items-center gap-2">
                  {isEditing ? (
                    <input 
                      type="date" 
                      className="bg-slate-50 border-none rounded-xl text-xs py-2 px-3 focus:ring-1 focus:ring-indigo-500" 
                      value={localModule.portfolioDate || ''} 
                      onChange={(e) => updateLocal({ portfolioDate: e.target.value })} 
                    />
                  ) : (
                    <span className="text-xs font-medium text-slate-600">{module.portfolioDate || 'Not set'}</span>
                  )}
                  {isEditing && localModule.portfolioDate && (
                    <button 
                      onClick={() => updateLocal({ portfolioDate: null })}
                      className="text-red-400 hover:text-red-600"
                      title="Remove Portfolio"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>
            )}
            {isEditing && (
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Pass Mark (%)</label>
                <input 
                  type="number" 
                  className="bg-slate-50 border-none rounded-xl text-xs py-2 px-3 focus:ring-1 focus:ring-indigo-500 w-20" 
                  value={localModule.passMark ?? profile?.defaultPassMark ?? 50} 
                  onChange={(e) => updateLocal({ passMark: parseInt(e.target.value) })} 
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mini Dashboard */}
      <div className="px-8 py-4 bg-slate-50/50 border-b border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Award size={20} />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-end mb-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Current Average</span>
              <span className="text-sm font-bold text-emerald-600">{stats.average !== null ? `${stats.average}%` : 'N/A'}</span>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${stats.average || 0}%` }}
                className="h-full bg-emerald-500"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <BookOpen size={20} />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-end mb-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Unit Progress</span>
              <span className="text-sm font-bold text-indigo-600">{stats.unitProgress}%</span>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${stats.unitProgress}%` }}
                className="h-full bg-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
            <Target size={20} />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-end mb-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Mastery Score</span>
              <span className="text-sm font-bold text-amber-600">{stats.masteryScore}%</span>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${stats.masteryScore}%` }}
                className="h-full bg-amber-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* AI Overview Section - Hide in detailed view as it's redundant with Summary tab */}
      {!isDetailed && (
        <div className="px-8 py-6 bg-indigo-50/30 border-b border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Sparkles size={12} className="text-indigo-500" />
              AI Module Overview
            </h4>
            <button 
              onClick={generateAIOverview}
              disabled={isGeneratingOverview}
              className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700 disabled:opacity-50 flex items-center gap-1 transition-colors"
            >
              {isGeneratingOverview ? <RotateCcw size={10} className="animate-spin" /> : <Sparkles size={10} />}
              {module.aiOverview ? 'Regenerate' : 'Generate Overview'}
            </button>
          </div>
          
          {error && (
            <div className="mb-4">
              <AIErrorMessage message={error} onRetry={generateAIOverview} />
            </div>
          )}

          {isGeneratingOverview ? (
            <div className="flex items-center gap-3 py-2">
              <div className="flex gap-1">
                {[0, 1, 2].map(i => (
                  <motion.div 
                    key={i}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                    className="w-1.5 h-1.5 bg-indigo-400 rounded-full"
                  />
                ))}
              </div>
              <span className="text-xs text-slate-400 italic">AI is analyzing your module...</span>
            </div>
          ) : module.aiOverview ? (
            <div className="prose prose-sm max-w-none text-slate-600 leading-relaxed">
              <Markdown>{module.aiOverview}</Markdown>
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic">No overview generated yet. Click "Generate Overview" to get AI insights.</p>
          )}
        </div>
      )}

      <div className="p-8 bg-slate-50/30">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Assignments & Tasks</h4>
          {isEditing && (
            <button onClick={() => {
              const newAss = {
                id: crypto.randomUUID(),
                title: 'New Assignment',
                dueDate: new Date().toISOString().split('T')[0],
                dueTime: '23:59',
                weight: 10,
                status: 'Incomplete',
                studyUnits: []
              };
              updateLocal({ assessments: [...(localModule.assessments || []), newAss] });
            }} className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1">
              <Plus size={14} /> Add Task
            </button>
          )}
        </div>

        <div className="space-y-4">
          {(isEditing ? localModule.assessments : module.assessments)?.map((a: any, idx: number) => (
            <div key={a.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4 group/assessment">
              <div className="flex justify-between items-start">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end flex-1">
                  <div className="md:col-span-3">
                    <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-1 block">Title</label>
                    {isEditing ? (
                      <input className="w-full bg-slate-50 border-none rounded-xl text-sm py-2.5 px-4 focus:ring-1 focus:ring-indigo-500" value={a.title} onChange={(e) => {
                        const newAss = localModule.assessments.map((ass: any, i: number) => 
                          i === idx ? { ...ass, title: e.target.value } : ass
                        );
                        updateLocal({ assessments: newAss });
                      }} />
                    ) : (
                      <p className="text-sm font-medium text-slate-700">{a.title}</p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-1 block">Due Date</label>
                    {isEditing ? (
                      <div className="flex flex-col gap-2">
                        <input type="date" className="w-full bg-slate-50 border-none rounded-xl text-sm py-2.5 px-4 focus:ring-1 focus:ring-indigo-500" value={a.dueDate} onChange={(e) => {
                          const newAss = localModule.assessments.map((ass: any, i: number) => 
                            i === idx ? { ...ass, dueDate: e.target.value } : ass
                          );
                          updateLocal({ assessments: newAss });
                        }} />
                        <input type="time" className="w-full bg-slate-50 border-none rounded-xl text-sm py-2.5 px-4 focus:ring-1 focus:ring-indigo-500" value={a.dueTime || ''} onChange={(e) => {
                          const newAss = localModule.assessments.map((ass: any, i: number) => 
                            i === idx ? { ...ass, dueTime: e.target.value } : ass
                          );
                          updateLocal({ assessments: newAss });
                        }} />
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm text-slate-500">{a.dueDate || 'No date'}</p>
                        {a.dueTime && <p className="text-[10px] font-bold text-indigo-400">{a.dueTime}</p>}
                      </div>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-1 block">Weight (%)</label>
                    {isEditing ? (
                      <input type="number" className="w-full bg-slate-50 border-none rounded-xl text-sm py-2.5 px-4 focus:ring-1 focus:ring-indigo-500" value={a.weight} onChange={(e) => {
                        const newAss = localModule.assessments.map((ass: any, i: number) => 
                          i === idx ? { ...ass, weight: parseInt(e.target.value) } : ass
                        );
                        updateLocal({ assessments: newAss });
                      }} />
                    ) : (
                      <p className="text-sm font-bold text-indigo-600">{a.weight}%</p>
                    )}
                  </div>
                  <div className="md:col-span-3">
                    <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-1 block">Status</label>
                    {isEditing ? (
                      <select 
                        className="w-full bg-slate-50 border-none rounded-xl text-sm py-2.5 px-4 focus:ring-1 focus:ring-indigo-500"
                        value={a.status || 'Incomplete'}
                        onChange={(e) => {
                          const newAss = localModule.assessments.map((ass: any, i: number) => 
                            i === idx ? { ...ass, status: e.target.value as any } : ass
                          );
                          updateLocal({ assessments: newAss });
                        }}
                      >
                        <option value="Incomplete">Incomplete</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                        <option value="Missed">Missed</option>
                      </select>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          a.status === 'Done' ? 'bg-emerald-500' :
                          a.status === 'In Progress' ? 'bg-indigo-500' :
                          a.status === 'Missed' ? 'bg-red-500' :
                          'bg-slate-300'
                        }`} />
                        <p className="text-sm font-bold text-slate-600">{a.status || 'Incomplete'}</p>
                      </div>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-1 block">Mark (%)</label>
                    {isEditing ? (
                      <input type="number" className="w-full bg-slate-50 border-none rounded-xl text-sm py-2.5 px-4 focus:ring-1 focus:ring-indigo-500" value={a.markReceived || ''} onChange={(e) => {
                        const newAss = localModule.assessments.map((ass: any, i: number) => 
                          i === idx ? { ...ass, markReceived: parseInt(e.target.value) } : ass
                        );
                        updateLocal({ assessments: newAss });
                      }} placeholder="e.g. 85" />
                    ) : (
                      <p className={`text-sm font-bold ${a.markReceived !== undefined ? 'text-emerald-600' : 'text-slate-300'}`}>
                        {a.markReceived !== undefined ? `${a.markReceived}%` : 'N/A'}
                      </p>
                    )}
                  </div>
                </div>
                {isEditing && (
                  <button 
                    onClick={() => {
                      onConfirm(
                        "Delete Task",
                        `Are you sure you want to delete "${a.title}"?`,
                        () => {
                          const newAss = localModule.assessments.filter((_: any, i: number) => i !== idx);
                          updateLocal({ assessments: newAss });
                        }
                      );
                    }}
                    className="p-2 text-slate-300 hover:text-red-600 transition-colors opacity-0 group-hover/assessment:opacity-100 ml-2"
                    title="Delete Task"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
              
              <div className="pt-2">
                <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-2 block">Study Units / Topics</label>
                <div className="flex flex-wrap gap-2">
                  {a.studyUnits?.map((unit: string, uIdx: number) => (
                    <span key={uIdx} className="bg-indigo-50 text-indigo-600 text-[10px] font-bold px-3 py-1 rounded-full border border-indigo-100 flex items-center gap-2">
                      <span 
                        className={isEditing ? "cursor-pointer hover:text-indigo-800" : ""}
                        onClick={() => {
                          if (!isEditing) return;
                          const val = prompt("Edit topic:", unit);
                          if (val !== null && val.trim() !== "") {
                            const newAss = localModule.assessments.map((ass: any, i: number) => {
                              if (i === idx) {
                                const newStudyUnits = (ass.studyUnits || []).map((u: string, j: number) => 
                                  j === uIdx ? val.trim() : u
                                );
                                return { ...ass, studyUnits: newStudyUnits };
                              }
                              return ass;
                            });
                            updateLocal({ assessments: newAss });
                          }
                        }}
                      >
                        {unit}
                      </span>
                      {isEditing && (
                        <button 
                          onClick={() => {
                            const newAss = localModule.assessments.map((ass: any, i: number) => {
                              if (i === idx) {
                                return {
                                  ...ass,
                                  studyUnits: (ass.studyUnits || []).filter((_: any, j: number) => j !== uIdx)
                                };
                              }
                              return ass;
                            });
                            updateLocal({ assessments: newAss });
                          }}
                          className="hover:text-red-500"
                        >
                          <X size={10} />
                        </button>
                      )}
                    </span>
                  ))}
                  {isEditing && (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          const unit = prompt("Enter study unit / topic name:");
                          if (unit && unit.trim()) {
                            const newAss = localModule.assessments.map((ass: any, i: number) => {
                              if (i === idx) {
                                return {
                                  ...ass,
                                  studyUnits: [...(ass.studyUnits || []), unit.trim()]
                                };
                              }
                              return ass;
                            });
                            updateLocal({ assessments: newAss });
                          }
                        }}
                        className="text-[10px] font-bold text-slate-400 hover:text-indigo-600 px-3 py-1 rounded-full border border-dashed border-slate-200"
                      >
                        + Add Custom
                      </button>
                      {localModule.units && localModule.units.length > 0 && (
                        <div className="relative group/picker">
                          <button 
                            className="text-[10px] font-bold text-slate-400 hover:text-emerald-600 px-3 py-1 rounded-full border border-dashed border-slate-200"
                          >
                            + From Module Units
                          </button>
                          <div className="absolute bottom-full left-0 mb-2 w-48 bg-white border border-slate-100 shadow-xl rounded-xl p-2 hidden group-hover/picker:block z-50">
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest p-2 border-b border-slate-50 mb-1">Select Unit</p>
                            <div className="max-h-40 overflow-y-auto">
                              {localModule.units.map((u: any) => (
                                <button
                                  key={u.id}
                                  onClick={() => {
                                    const unitName = u.name || `Unit ${u.unitNumber}`;
                                    if (!a.studyUnits?.includes(unitName)) {
                                      const newAss = localModule.assessments.map((ass: any, i: number) => {
                                        if (i === idx) {
                                          return {
                                            ...ass,
                                            studyUnits: [...(ass.studyUnits || []), unitName]
                                          };
                                        }
                                        return ass;
                                      });
                                      updateLocal({ assessments: newAss });
                                    }
                                  }}
                                  className="w-full text-left px-3 py-2 text-[10px] font-medium text-slate-600 hover:bg-slate-50 rounded-lg truncate"
                                >
                                  {u.unitNumber ? `${u.unitNumber}: ` : ''}{u.name}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* YouTube Resources Section - Hide in detailed view as it's redundant with YouTube tab */}
      {!isDetailed && (
        <div className="px-8 py-6 bg-red-50/20 border-b border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Youtube size={12} className="text-red-500" />
              YouTube Study Resources
            </h4>
          </div>

          <div className="flex gap-2 mb-4">
            <input 
              className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs focus:ring-1 focus:ring-indigo-500 transition-all"
              placeholder="Paste YouTube URL..."
              value={ytUrl}
              onChange={(e) => setYtUrl(e.target.value)}
            />
            <button 
              onClick={handleAddYtVideo}
              disabled={isProcessingYt || !ytUrl.trim()}
              className="bg-red-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-700 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {isProcessingYt ? <RotateCcw className="animate-spin" size={12} /> : <Plus size={12} />}
              {isProcessingYt ? 'Processing...' : 'Add'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {module.youtubeVideos?.map((video) => (
              <button 
                key={video.id}
                onClick={() => setActiveYtVideo(video)}
                className="flex items-start gap-3 p-3 bg-white border border-slate-100 rounded-xl hover:border-red-200 hover:bg-red-50/30 transition-all text-left group/yt"
              >
                <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-red-500 shrink-0 group-hover/yt:bg-red-500 group-hover/yt:text-white transition-colors">
                  <Youtube size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-700 truncate">{video.title}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{video.summary}</p>
                </div>
              </button>
            ))}
            {!module.youtubeVideos?.length && (
              <div className="col-span-full py-4 text-center">
                <p className="text-[10px] text-slate-400 italic">No YouTube resources added yet.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Grade Weighting Section - Hide in detailed view as it will be moved to a tab */}
      {!isDetailed && (
        <div className="p-8 border-t border-slate-100 bg-indigo-50/20">
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Grade Weighting & Calculations</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Year Mark Weight (%)</label>
              {isEditing ? (
                <input 
                  type="number" 
                  className="w-full bg-white border border-slate-200 rounded-xl text-sm py-2 px-3 focus:ring-1 focus:ring-indigo-500" 
                  value={localModule.yearMarkWeight || ''} 
                  onChange={(e) => updateLocal({ yearMarkWeight: parseInt(e.target.value) })}
                  placeholder="e.g. 40"
                />
              ) : (
                <p className="text-sm font-bold text-slate-700">{module.yearMarkWeight || 0}%</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Exam Weight (%)</label>
              {isEditing ? (
                <input 
                  type="number" 
                  className="w-full bg-white border border-slate-200 rounded-xl text-sm py-2 px-3 focus:ring-1 focus:ring-indigo-500" 
                  value={localModule.examWeight || ''} 
                  onChange={(e) => updateLocal({ examWeight: parseInt(e.target.value) })}
                  placeholder="e.g. 60"
                />
              ) : (
                <p className="text-sm font-bold text-slate-700">{module.examWeight || 0}%</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Exam/Portfolio Mark (%)</label>
              {isEditing ? (
                <input 
                  type="number" 
                  className="w-full bg-white border border-slate-200 rounded-xl text-sm py-2 px-3 focus:ring-1 focus:ring-indigo-500" 
                  value={localModule.examMark || ''} 
                  onChange={(e) => updateLocal({ examMark: parseInt(e.target.value) })}
                  placeholder="e.g. 75"
                />
              ) : (
                <p className="text-sm font-bold text-emerald-600">{module.examMark || 0}%</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Pass Mark (%)</label>
              {isEditing ? (
                <input 
                  type="number" 
                  className="w-full bg-white border border-slate-200 rounded-xl text-sm py-2 px-3 focus:ring-1 focus:ring-indigo-500" 
                  value={localModule.passMark ?? profile?.defaultPassMark ?? 50} 
                  onChange={(e) => updateLocal({ passMark: parseInt(e.target.value) })}
                  placeholder="e.g. 50"
                />
              ) : (
                <p className="text-sm font-bold text-slate-700">{module.passMark ?? profile?.defaultPassMark ?? 50}%</p>
              )}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-indigo-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Calculated Year Mark</p>
                <p className="text-xl font-bold text-indigo-600">
                  {(() => {
                    const assessments = isEditing ? localModule.assessments : module.assessments;
                    const totalWeight = assessments.reduce((acc: number, a: any) => acc + (a.weight || 0), 0);
                    if (totalWeight === 0) return '0%';
                    const yearMark = assessments.reduce((acc: number, a: any) => acc + ((a.markReceived || 0) * (a.weight || 0)), 0) / totalWeight;
                    return `${yearMark.toFixed(1)}%`;
                  })()}
                </p>
              </div>
              <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center">
                <BookOpen size={20} className="text-indigo-600" />
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-2xl border border-amber-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Required in Exam to Pass</p>
                <p className="text-xl font-bold text-amber-600">
                  {(() => {
                    const assessments = isEditing ? localModule.assessments : module.assessments;
                    const totalWeight = assessments.reduce((acc: number, a: any) => acc + (a.weight || 0), 0);
                    const yearMark = totalWeight === 0 ? 0 : assessments.reduce((acc: number, a: any) => acc + ((a.markReceived || 0) * (a.weight || 0)), 0) / totalWeight;
                    
                    const yWeight = (isEditing ? localModule.yearMarkWeight : module.yearMarkWeight) || 0;
                    const eWeight = (isEditing ? localModule.examWeight : module.examWeight) || 0;
                    const pMark = (isEditing ? localModule.passMark : module.passMark) ?? profile?.defaultPassMark ?? 50;
                    
                    const currentContribution = (yearMark * yWeight / 100);
                    const needed = pMark - currentContribution;
                    
                    if (needed <= 0) return 'Passed!';
                    if (eWeight === 0) return 'N/A';
                    
                    const requiredExam = (needed / eWeight) * 100;
                    return requiredExam > 100 ? 'Impossible' : `${requiredExam.toFixed(1)}%`;
                  })()}
                </p>
              </div>
              <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center">
                <AlertCircle size={20} className="text-amber-600" />
              </div>
            </div>

            <div className="bg-indigo-600 p-4 rounded-2xl shadow-lg shadow-indigo-100 flex items-center justify-between text-white">
              <div>
                <p className="text-[10px] font-bold uppercase text-indigo-200 tracking-widest">Final Module Mark</p>
                <p className="text-xl font-bold">
                  {(() => {
                    const assessments = isEditing ? localModule.assessments : module.assessments;
                    const totalWeight = assessments.reduce((acc: number, a: any) => acc + (a.weight || 0), 0);
                    const yearMark = totalWeight === 0 ? 0 : assessments.reduce((acc: number, a: any) => acc + ((a.markReceived || 0) * (a.weight || 0)), 0) / totalWeight;
                    
                    const yWeight = (isEditing ? localModule.yearMarkWeight : module.yearMarkWeight) || 0;
                    const eWeight = (isEditing ? localModule.examWeight : module.examWeight) || 0;
                    const eMark = (isEditing ? localModule.examMark : module.examMark) || 0;
                    
                    const finalMark = (yearMark * yWeight / 100) + (eMark * eWeight / 100);
                    return `${finalMark.toFixed(1)}%`;
                  })()}
                </p>
              </div>
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Award size={20} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Module Units Section - Hide in detailed view as it's redundant with Units & Notes tab */}
      {!isDetailed && (
        <div className="p-8 border-t border-slate-100 bg-white">
          <div 
            onClick={() => setIsUnitsOpen(!isUnitsOpen)}
            className="w-full flex items-center justify-between mb-2 group/header cursor-pointer"
          >
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 group-hover/header:text-indigo-600 transition-colors">Module Units</h4>
            <div className="flex items-center gap-4">
              {isEditing && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    const newUnit = { id: Math.random().toString(36).substr(2, 9), unitNumber: '', name: '', completed: false };
                    updateLocal({ units: [...(localModule.units || []), newUnit] });
                    setIsUnitsOpen(true);
                  }} 
                  className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
                >
                  <Plus size={14} /> Add Unit
                </button>
              )}
              <ChevronDown size={16} className={`text-slate-400 transition-transform ${isUnitsOpen ? 'rotate-180' : ''}`} />
            </div>
          </div>

          <AnimatePresence>
            {isUnitsOpen && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="space-y-3 pt-4">
                  {(isEditing ? localModule.units : module.units)?.map((unit: any, idx: number) => (
                    <div key={unit.id} className="flex items-center gap-4 bg-slate-50/50 p-4 rounded-2xl border border-slate-100 group/unit">
                      <button 
                        onClick={() => {
                          const currentUnits = isEditing ? localModule.units : module.units;
                          const newUnits = (currentUnits || []).map((u: any, i: number) => 
                            i === idx ? { ...u, completed: !u.completed } : u
                          );
                          if (isEditing) {
                            updateLocal({ units: newUnits });
                          } else {
                            onUpdate({ units: newUnits });
                          }
                        }}
                        className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all shrink-0 shadow-sm ${
                          unit.completed 
                            ? 'bg-emerald-500 border-emerald-500 text-white shadow-emerald-100' 
                            : 'border-slate-200 hover:border-indigo-400 bg-white hover:bg-indigo-50'
                        }`}
                        title={unit.completed ? "Mark as incomplete" : "Mark as complete"}
                      >
                        {unit.completed ? <CheckCircle2 size={16} strokeWidth={2.5} /> : <Square size={16} className="text-slate-300" />}
                      </button>
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        <div className="md:col-span-2">
                          <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-1 block">Unit #</label>
                          {isEditing ? (
                            <input 
                              className="w-full bg-white border border-slate-200 rounded-xl text-sm py-2 px-3 focus:ring-1 focus:ring-indigo-500" 
                              value={unit.unitNumber} 
                              onChange={(e) => {
                                const newUnits = [...(localModule.units || [])];
                                newUnits[idx].unitNumber = e.target.value;
                                updateLocal({ units: newUnits });
                              }}
                              placeholder="e.g. 1"
                            />
                          ) : (
                            <p className={`text-sm font-bold ${unit.completed ? 'text-emerald-600' : 'text-slate-700'}`}>
                              {unit.unitNumber ? `Unit ${unit.unitNumber}` : '-'}
                            </p>
                          )}
                        </div>
                        <div className="md:col-span-10">
                          <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-1 block">Unit Name</label>
                          {isEditing ? (
                            <input 
                              className="w-full bg-white border border-slate-200 rounded-xl text-sm py-2 px-3 focus:ring-1 focus:ring-indigo-500" 
                              value={unit.name} 
                              onChange={(e) => {
                                const newUnits = [...(localModule.units || [])];
                                newUnits[idx].name = e.target.value;
                                updateLocal({ units: newUnits });
                              }}
                              placeholder="Unit Name"
                            />
                          ) : (
                            <div className="flex items-center justify-between">
                              <p className={`text-sm font-medium ${unit.completed ? 'text-slate-400 line-through' : 'text-slate-600'}`}>
                                {unit.name || 'Unnamed Unit'}
                              </p>
                              <div className="flex items-center gap-2">
                                {unit.notes && <div title="Has Notes"><FileText size={12} className="text-indigo-400" /></div>}
                                {unit.resources?.length > 0 && <div title={`${unit.resources.length} Resources`}><Paperclip size={12} className="text-emerald-400" /></div>}
                                {unit.flashcards?.length > 0 && <div title={`${unit.flashcards.length} Flashcards`}><Layers size={12} className="text-amber-400" /></div>}
                                {unit.quiz && <div title="Has Quiz"><HelpCircle size={12} className="text-pink-400" /></div>}
                                {unit.practiceExams?.length > 0 && <div title={`${unit.practiceExams.length} Practice Exams`}><Award size={12} className="text-indigo-400" /></div>}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      {isEditing && (
                        <button 
                          onClick={() => {
                            onConfirm(
                              "Delete Unit",
                              `Are you sure you want to delete Unit ${unit.unitNumber || idx + 1}?`,
                              () => {
                                const newUnits = localModule.units.filter((_: any, i: number) => i !== idx);
                                updateLocal({ units: newUnits });
                              }
                            );
                          }}
                          className="p-2 text-slate-300 hover:text-red-600 transition-colors opacity-0 group-hover/unit:opacity-100"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  {(!module.units || module.units.length === 0) && !isEditing && (
                    <p className="text-center py-4 text-slate-400 text-sm italic">No units added yet.</p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* YouTube Video Player Modal */}
      <AnimatePresence>
        {activeYtVideo && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveYtVideo(null)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="aspect-video bg-black">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src={`https://www.youtube.com/embed/${getYoutubeId(activeYtVideo.url)}?autoplay=1`}
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h5 className="text-xl font-bold text-slate-800">{activeYtVideo.title}</h5>
                    <p className="text-xs text-slate-400 mt-1">Added to {module.title}</p>
                  </div>
                  <button 
                    onClick={() => setActiveYtVideo(null)}
                    className="p-2 bg-slate-100 text-slate-500 rounded-full hover:bg-slate-200 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <h6 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-2">
                    <Brain size={14} className="text-indigo-600" />
                    AI Insights
                  </h6>
                  <div className="prose prose-sm max-w-none text-slate-600">
                    <Markdown>{activeYtVideo.summary}</Markdown>
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <button 
                    onClick={() => {
                      const newVideos = module.youtubeVideos?.filter(v => v.id !== activeYtVideo.id);
                      onUpdate({ youtubeVideos: newVideos });
                      setActiveYtVideo(null);
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-all"
                  >
                    <Trash2 size={14} /> Remove Video
                  </button>
                  <button 
                    onClick={() => setActiveYtVideo(null)}
                    className="px-8 py-3 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                  >
                    Close Player
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ExportMenu({ onExport }: any) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button 
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
      >
        <Download size={18} />
        Export
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50">
          <ExportItem icon={<FileText size={16} />} label="PDF Document" onClick={() => { onExport('pdf'); setOpen(false); }} />
          <ExportItem icon={<ImageIcon size={16} />} label="PNG Image" onClick={() => { onExport('png'); setOpen(false); }} />
          <ExportItem icon={<FileSpreadsheet size={16} />} label="Excel Sheet" onClick={() => { onExport('excel'); setOpen(false); }} />
          <ExportItem icon={<FileWord size={16} />} label="Word Document" onClick={() => { onExport('word'); setOpen(false); }} />
        </div>
      )}
    </div>
  );
}

function ExportItem({ icon, label, onClick }: any) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-all">
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );
}

function ProgressItem({ label, value, color }: any) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
        <span className="text-slate-400">{label}</span>
        <span className="text-slate-600">{value}%</span>
      </div>
      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} className={`h-full ${color}`} />
      </div>
    </div>
  );
}

function InputGroup({ label, value, onChange, type = 'text', placeholder, required }: any) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-bold uppercase tracking-widest text-slate-400">{label}</label>
      <input 
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
      />
    </div>
  );
}

function SelectGroup({ label, value, options, onChange }: any) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-bold uppercase tracking-widest text-slate-400">{label}</label>
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
      >
        {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
}

function QuoteCard() {
  const quote = useMemo(() => QUOTES[Math.floor(Math.random() * QUOTES.length)], []);
  return (
    <div className="mt-8 p-6 bg-white rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden">
      <Quote size={24} className="text-indigo-100 absolute -top-1 -left-1" />
      <p className="text-sm italic text-slate-600 leading-relaxed mb-3 relative z-10">"{quote.t}"</p>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">— {quote.r}</p>
    </div>
  );
}

function StatCard({ label, value, icon }: any) {
  return (
    <motion.div 
      whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-2.5 bg-slate-50 rounded-xl text-slate-600">
          {icon}
        </div>
      </div>
      <p className="text-2xl font-bold tracking-tight">{value}</p>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{label}</p>
    </motion.div>
  );
}

// --- Placeholder Views ---

function ScheduleModal({ item, modules, onClose, onSave }: any) {
  const [form, setForm] = useState({
    title: item?.title || '',
    type: item?.type || 'study_session',
    start: item ? format(item.start, "yyyy-MM-dd'T'HH:mm") : format(new Date(), "yyyy-MM-dd'T'HH:mm"),
    end: item ? format(item.end, "yyyy-MM-dd'T'HH:mm") : format(addMinutes(new Date(), 60), "yyyy-MM-dd'T'HH:mm"),
    moduleId: item?.moduleId || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...form,
      start: new Date(form.start),
      end: new Date(form.end)
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">{item?.id ? 'Edit Session' : 'Add New Session'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputGroup label="Session Title" value={form.title} onChange={(v) => setForm({...form, title: v})} required />
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Session Type</label>
            <select 
              className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
              value={form.type}
              onChange={(e) => setForm({...form, type: e.target.value as any})}
            >
              <option value="study_session">General Study Session</option>
              <option value="exam_prep">Exam Preparation</option>
              <option value="assignment">Assignment Work</option>
              <option value="portfolio_prep">Portfolio Preparation</option>
              <option value="exam">Exam</option>
              <option value="assessment_due">Assessment Due</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Start Time</label>
              <input 
                type="datetime-local" 
                className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
                value={form.start}
                onChange={(e) => setForm({...form, start: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">End Time</label>
              <input 
                type="datetime-local" 
                className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
                value={form.end}
                onChange={(e) => setForm({...form, end: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Related Module (Optional)</label>
            <select 
              className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
              value={form.moduleId}
              onChange={(e) => setForm({...form, moduleId: e.target.value})}
            >
              <option value="">None</option>
              {modules.map((m: any) => (
                <option key={m.id} value={m.id}>{m.title}</option>
              ))}
            </select>
          </div>

          <div className="pt-4 flex gap-3">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
            >
              {item?.id ? 'Save Changes' : 'Add Session'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

function CalendarView({ schedule, modules, onEdit }: any) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  
  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const getDayEvents = (day: Date) => {
    return schedule.filter((item: any) => isSameDay(item.start, day));
  };

  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-8 border-b border-slate-100 flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-800">
          {format(currentDate, 'MMMM yyyy')}
        </h3>
        <div className="flex gap-2">
          <button 
            onClick={prevMonth}
            className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-indigo-600 transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={() => setCurrentDate(new Date())}
            className="px-4 py-2 text-xs font-bold text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
          >
            Today
          </button>
          <button 
            onClick={nextMonth}
            className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-indigo-600 transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 border-b border-slate-100">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="py-4 text-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {calendarDays.map((day, idx) => {
          const events = getDayEvents(day);
          const isCurrentMonth = isSameDay(startOfMonth(day), monthStart);
          const isToday = isSameDay(day, new Date());
          
          return (
            <div 
              key={idx} 
              className={`min-h-[120px] p-2 border-r border-b border-slate-50 transition-all hover:bg-slate-50/50 ${
                !isCurrentMonth ? 'bg-slate-50/30 opacity-40' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className={`text-xs font-bold w-7 h-7 flex items-center justify-center rounded-full ${
                  isToday ? 'bg-indigo-600 text-white' : 'text-slate-400'
                }`}>
                  {format(day, 'd')}
                </span>
              </div>
              <div className="space-y-1">
                {events.slice(0, 3).map((event: any) => (
                  <button
                    key={event.id}
                    onClick={() => onEdit(event)}
                    className={`w-full text-left px-2 py-1 rounded-lg text-[9px] font-bold truncate transition-all hover:brightness-95 ${
                      event.type === 'exam' || event.type === 'exam_prep' ? 'bg-red-50 text-red-600' : 
                      event.type === 'assessment_due' || event.type === 'assignment' ? 'bg-amber-50 text-amber-600' : 
                      event.type === 'portfolio' || event.type === 'portfolio_prep' ? 'bg-emerald-50 text-emerald-600' :
                      'bg-indigo-50 text-indigo-600'
                    }`}
                  >
                    {format(event.start, 'HH:mm')} {event.title}
                  </button>
                ))}
                {events.length > 3 && (
                  <p className="text-[9px] font-bold text-slate-400 px-2">
                    + {events.length - 3} more
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TimetableView({ schedule, modules, onExport, onGenerate, isGenerating, error, onAdd, onEdit, onDelete, onUpdate }: any) {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const today = startOfDay(now);
  const filteredSchedule = schedule
    .filter((item: any) => isAfter(item.start, now) || isSameDay(item.start, today))
    .sort((a: any, b: any) => a.start.getTime() - b.start.getTime());

  const completedCount = filteredSchedule.filter((s: any) => s.completed).length;
  const totalCount = filteredSchedule.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">Study Planner</h2>
          {totalCount > 0 && (
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm">
              <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  className="h-full bg-emerald-500"
                />
              </div>
              <span className="text-xs font-bold text-emerald-600">{progressPercent}% Done</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-white p-1 rounded-xl border border-slate-100 flex shadow-sm">
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <List size={18} />
            </button>
            <button 
              onClick={() => setViewMode('calendar')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'calendar' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <Calendar size={18} />
            </button>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={onAdd}
              className="flex items-center gap-2 bg-white text-indigo-600 border border-indigo-100 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-50 transition-all"
            >
              <Plus size={18} />
              Add Session
            </button>
            <button 
              onClick={onGenerate}
              disabled={isGenerating}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Sparkles size={18} />
              )}
              {isGenerating ? 'Planning...' : 'AI Smart Plan'}
            </button>
            <ExportMenu onExport={onExport} />
          </div>
        </div>
      </div>

      {error && (
        <AIErrorMessage message={error} onRetry={onGenerate} />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          {viewMode === 'calendar' ? (
            <CalendarView schedule={schedule} modules={modules} onEdit={onEdit} />
          ) : (
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
              <div className="divide-y divide-slate-100">
                {filteredSchedule.length === 0 ? (
                  <div className="px-8 py-12 text-center">
                    <Calendar className="mx-auto text-slate-200 mb-4" size={48} />
                    <p className="text-slate-400 font-medium">No upcoming sessions. Use AI Smart Plan to generate a personalized study schedule!</p>
                  </div>
                ) : (
                  filteredSchedule.map((item: any, idx: number) => {
                    const prevItem = filteredSchedule[idx - 1];
                    const showDateHeader = !prevItem || !isSameDay(item.start, prevItem.start);
                    return (
                      <React.Fragment key={item.id}>
                        {showDateHeader && (
                          <div className="bg-slate-50 px-8 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            {isToday(item.start) ? 'Today' : isTomorrow(item.start) ? 'Tomorrow' : format(item.start, 'EEEE, MMMM do')}
                          </div>
                        )}
                        <div className={`px-8 py-5 flex items-center gap-6 hover:bg-slate-50 transition-all group ${item.completed ? 'opacity-50' : ''}`}>
                          <div className="w-16 text-xs font-bold text-slate-400 font-mono">
                            {format(item.start, 'HH:mm')}
                          </div>
                          <button 
                            onClick={() => onUpdate(item.id, { completed: !item.completed })}
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                              item.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-200 hover:border-indigo-500'
                            }`}
                          >
                            {item.completed && <Check size={14} />}
                          </button>
                          <div className={`w-2.5 h-2.5 rounded-full ${
                            item.type === 'exam' || item.type === 'exam_prep' ? 'bg-red-500' : 
                            item.type === 'assessment_due' || item.type === 'assignment' ? 'bg-amber-500' : 
                            item.type === 'portfolio' || item.type === 'portfolio_prep' ? 'bg-emerald-500' :
                            'bg-indigo-500'
                          }`} />
                          <div className="flex-1">
                            <p className={`text-sm font-bold text-slate-800 ${item.completed ? 'line-through' : ''}`}>{item.title}</p>
                            <div className="flex items-center gap-2">
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{item.type.replace('_', ' ')}</p>
                              {item.moduleId && (
                                <span className="text-[10px] text-indigo-600 font-bold">
                                  • {modules.find((m: any) => m.id === item.moduleId)?.title}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                            <button 
                              onClick={() => onEdit(item)}
                              className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                            >
                              <Edit3 size={16} />
                            </button>
                            <button 
                              onClick={() => onDelete(item.id)}
                              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <h3 className="font-bold text-sm uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
              <AlertCircle size={16} className="text-amber-500" />
              Upcoming Deadlines
            </h3>
            <div className="space-y-3">
              {modules.flatMap(m => 
                (m.assessments || []).map(a => ({ ...a, moduleTitle: m.title, moduleId: m.id }))
              )
              .filter(a => isAfter(new Date(a.dueDate), now))
              .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
              .slice(0, 5)
              .map(a => (
                <div key={a.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <p className="text-xs font-bold text-slate-800 line-clamp-1">{a.title}</p>
                  <p className="text-[10px] text-slate-400 font-medium mb-2">{a.moduleTitle}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                      Due {format(new Date(a.dueDate), 'MMM d')}
                    </span>
                    <button 
                      onClick={() => onAdd({
                        title: `Work on ${a.title}`,
                        type: 'assignment',
                        moduleId: a.moduleId,
                        start: new Date(),
                        end: addMinutes(new Date(), 60)
                      })}
                      className="text-[10px] font-bold text-indigo-600 hover:underline"
                    >
                      Schedule
                    </button>
                  </div>
                </div>
              ))}
              {modules.length === 0 && <p className="text-xs text-slate-400 italic text-center py-4">No modules added yet.</p>}
            </div>
          </div>

          <div className="bg-indigo-50 p-6 rounded-[2rem] border border-indigo-100">
            <h3 className="font-bold text-sm text-indigo-900 mb-2 flex items-center gap-2">
              <Sparkles size={16} className="text-indigo-600" />
              Smart Planning
            </h3>
            <p className="text-xs text-indigo-700/70 leading-relaxed mb-4">
              Our AI considers your preferred study hours, availability, and assessment weights to create the perfect balance.
            </p>
            <button 
              onClick={onGenerate}
              disabled={isGenerating}
              className="w-full bg-white text-indigo-600 py-3 rounded-xl font-bold text-xs shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
            >
              {isGenerating ? "Planning..." : "Update Smart Plan"}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MarksView({ modules, onUpdate }: any) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h2 className="text-2xl font-bold">Marks Calculator</h2>
      <div className="grid grid-cols-1 gap-6">
        {modules.map((m: any) => (
          <div key={m.id} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold mb-6">{m.title}</h3>
            <div className="space-y-4">
              {m.assessments?.map((a: any, idx: number) => (
                <div key={a.id} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex-1">
                    <p className="text-sm font-bold">{a.title}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Weight: {a.weight}%</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      className="w-20 bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-center font-bold focus:ring-1 focus:ring-indigo-500"
                      value={a.markReceived || ''}
                      onChange={(e) => {
                        const newAss = m.assessments.map((ass: any, i: number) => 
                          i === idx ? { ...ass, markReceived: parseInt(e.target.value) } : ass
                        );
                        onUpdate(m.id, { assessments: newAss });
                      }}
                      placeholder="0"
                    />
                    <span className="text-sm font-bold text-slate-400">%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function SettingsView({ profile, onUpdate }: any) {
  const [localProfile, setLocalProfile] = useState(profile);
  const [isSaving, setIsSaving] = useState(false);
  const [isTestingVoice, setIsTestingVoice] = useState(false);
  const [testAudioUrl, setTestAudioUrl] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const testAudioRef = useRef<HTMLAudioElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'study' | 'academic' | 'tutor' | 'advanced'>('profile');

  const TABS = [
    { id: 'profile', label: 'Profile', icon: <User size={18} /> },
    { id: 'study', label: 'Study', icon: <BookOpen size={18} /> },
    { id: 'academic', label: 'Academic', icon: <GraduationCap size={18} /> },
    { id: 'tutor', label: 'AI Tutor', icon: <Mic size={18} /> },
    { id: 'advanced', label: 'Advanced', icon: <Shield size={18} /> },
  ];

  const THEME_COLORS = [
    { name: 'Indigo', value: '#4f46e5', class: 'bg-indigo-600' },
    { name: 'Emerald', value: '#10b981', class: 'bg-emerald-500' },
    { name: 'Rose', value: '#f43f5e', class: 'bg-rose-500' },
    { name: 'Amber', value: '#f59e0b', class: 'bg-amber-500' },
    { name: 'Sky', value: '#0ea5e9', class: 'bg-sky-500' },
    { name: 'Violet', value: '#8b5cf6', class: 'bg-violet-500' },
    { name: 'Slate', value: '#475569', class: 'bg-slate-600' },
  ];

  const INSTITUTIONS = [
    "Rhodes University",
    "North-West University (NWU)",
    "University of Cape Town (UCT)",
    "University of Fort Hare (UFH)",
    "University of the Free State (UFS)",
    "University of KwaZulu-Natal (UKZN)",
    "University of Limpopo (UL)",
    "University of Pretoria (UP)",
    "University of the Western Cape (UWC)",
    "University of the Witwatersrand (Wits)",
    "University of Johannesburg (UJ)",
    "Nelson Mandela University (NMU)",
    "University of South Africa (UNISA)",
    "University of Venda (Univen)",
    "University of Zululand (UniZulu)",
    "Walter Sisulu University (WSU)",
    "Cape Peninsula University of Technology (CPUT)",
    "Central University of Technology (CUT)",
    "Durban University of Technology (DUT)",
    "Mangosuthu University of Technology (MUT)",
    "Tshwane University of Technology (TUT)",
    "Vaal University of Technology (VUT)",
    "Sefako Makgatho Health Sciences University (SMU)",
    "Sol Plaatje University (SPU)",
    "University of Mpumalanga (UMP)",
    "Central Johannesburg TVET College",
    "Coastal TVET College",
    "College of Cape Town",
    "Eastcape Midlands TVET College",
    "Ekurhuleni East TVET College",
    "Ekurhuleni West TVET College",
    "False Bay TVET College",
    "Mthashana TVET College",
    "Nkangala TVET College",
    "Northlink TVET College",
    "Orbit TVET College",
    "Port Elizabeth TVET College",
    "Sedibeng TVET College",
    "South Cape TVET College",
    "South West Gauteng TVET College",
    "Tshwane North TVET College",
    "Tshwane South TVET College",
    "West Coast TVET College",
    "Varsity College",
    "Rosebank College",
    "Boston City Campus",
    "Richfield Graduate Institute",
    "CTU Training Solutions",
    "IIE Vega School",
    "IIE MSA (Monash South Africa)",
    "IMM Graduate School",
    "Milpark Education",
    "Eduvos",
    "Pearson Institute",
    "AFDA (Film School)",
    "Mancosa",
    "Regent Business School",
    "ICESA Education",
    "other"
  ];

  const [isOtherInstitution, setIsOtherInstitution] = useState(!INSTITUTIONS.includes(profile.institution) && profile.institution !== '');

  useEffect(() => {
    setLocalProfile(profile);
    setIsOtherInstitution(!INSTITUTIONS.includes(profile.institution) && profile.institution !== '');
  }, [profile]);

  const handleInstitutionChange = (val: string) => {
    if (val === 'other') {
      setIsOtherInstitution(true);
      setLocalProfile({ ...localProfile, institution: '' });
    } else {
      setIsOtherInstitution(false);
      setLocalProfile({ ...localProfile, institution: val });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'photo' | 'banner' = 'photo') => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 800 * 1024) { // Increased limit slightly for banner
        setError("Image size should be less than 800KB");
        setTimeout(() => setError(null), 3000);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'photo') {
          setLocalProfile({ ...localProfile, photoURL: reader.result as string });
        } else {
          setLocalProfile({ ...localProfile, bannerURL: reader.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const prefs = localProfile.studyPreferences || {
    preferredStartTime: '09:00',
    preferredEndTime: '21:00',
    sessionDuration: 60,
    breakDuration: 15
  };

  const updatePrefs = (newPrefs: any) => {
    setLocalProfile({
      ...localProfile,
      studyPreferences: { ...prefs, ...newPrefs }
    });
  };

  const voiceSettings = localProfile.voiceTutorSettings || {
    voiceName: 'Zephyr',
    speakingRate: 1.0,
    pitch: 0,
    volume: 0.8
  };

  const handleTestVoice = async () => {
    setIsTestingVoice(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const sampleText = `Hello! I am your AI Voice Tutor. I am testing the ${voiceSettings.voiceName} voice.`;
      
      const ttsResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `TTS: ${sampleText}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { 
              prebuiltVoiceConfig: { 
                voiceName: voiceSettings.voiceName 
              } 
            }
          }
        }
      });

      const base64Audio = ttsResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        const url = addWavHeader(base64Audio);
        setTestAudioUrl(url);
        
        // Small delay to ensure audio element is ready
        setTimeout(() => {
          if (testAudioRef.current) {
            testAudioRef.current.volume = voiceSettings.volume;
            testAudioRef.current.playbackRate = voiceSettings.speakingRate;
            testAudioRef.current.play().catch(e => {
              console.error("Audio playback error:", e);
              setError("Failed to play voice sample. Please check your browser settings.");
            });
          }
        }, 100);
      } else {
        throw new Error("AI failed to generate audio data.");
      }
    } catch (error: any) {
      console.error("Error testing voice:", error);
      setError(`Failed to generate voice sample: ${error.message || 'Unknown error'}. Please try again.`);
    } finally {
      setIsTestingVoice(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onUpdate(localProfile);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving settings:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(localProfile, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "pfunzo_profile.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleDeleteAccount = async () => {
    if (!auth.currentUser) return;
    
    const confirmed = window.confirm(
      "CRITICAL ACTION: Are you absolutely sure you want to delete your account? " +
      "This will permanently erase your profile, modules, schedule, and all study data. " +
      "This action CANNOT be undone."
    );
    
    if (!confirmed) return;
    
    const doubleConfirmed = window.confirm(
      "FINAL WARNING: Please confirm one last time. All your progress will be lost forever."
    );
    
    if (!doubleConfirmed) return;

    setIsSaving(true);
    try {
      const uid = auth.currentUser.uid;
      
      // 1. Delete subcollections (modules, schedule, studyLogs)
      const subcollections = ['modules', 'schedule', 'studyLogs'];
      for (const sub of subcollections) {
        const q = query(collection(db, `users/${uid}/${sub}`));
        const snapshot = await getDocs(q);
        const batch = writeBatch(db);
        snapshot.docs.forEach((doc) => batch.delete(doc.ref));
        await batch.commit();
      }
      
      // 2. Delete user document
      await deleteDoc(doc(db, 'users', uid));
      
      // 3. Delete auth account
      await deleteUser(auth.currentUser);
      
      // The app will automatically redirect to auth screen due to onAuthStateChanged
    } catch (err: any) {
      console.error("Error deleting account:", err);
      if (err.code === 'auth/requires-recent-login') {
        setError("For security reasons, you must have logged in recently to delete your account. Please log out and log back in, then try again.");
      } else {
        setError("Failed to delete account: " + err.message);
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Account Settings</h2>
          <p className="text-slate-400 text-sm">Manage your profile, study habits, and AI tutor preferences.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all disabled:opacity-50"
          >
            <Save size={20} />
            {isSaving ? 'Saving...' : 'Save All Changes'}
          </button>
          <button 
            onClick={() => signOut(auth)}
            className="p-3.5 text-rose-600 hover:bg-rose-50 rounded-2xl transition-all border border-transparent hover:border-rose-100"
            title="Sign Out"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>

      <div className="flex overflow-x-auto no-scrollbar gap-2 p-1 bg-slate-100 rounded-2xl w-fit">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === tab.id 
                ? 'bg-white text-indigo-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {showSuccess && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="bg-emerald-50 text-emerald-600 px-6 py-4 rounded-2xl font-bold flex items-center gap-2 border border-emerald-100"
        >
          <CheckCircle2 size={20} />
          Settings saved successfully!
        </motion.div>
      )}

      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="bg-rose-50 text-rose-600 px-6 py-4 rounded-2xl font-bold flex items-center gap-2 border border-rose-100"
        >
          <AlertCircle size={20} />
          {error}
        </motion.div>
      )}

      <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm min-h-[500px]">
        <AnimatePresence mode="wait">
          {activeTab === 'profile' && (
            <motion.div 
              key="profile"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-10"
            >
              <section>
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Profile Customization</h3>
                
                {/* Banner Section */}
                <div className="relative mb-12">
                  <div className="w-full h-48 rounded-[2.5rem] bg-slate-100 overflow-hidden border border-slate-200 shadow-inner group relative">
                    {localProfile.bannerURL ? (
                      <img src={localProfile.bannerURL} alt="Banner" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <ImageIcon size={48} />
                      </div>
                    )}
                    <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <div className="flex flex-col items-center gap-1">
                        <Upload size={24} />
                        <span className="text-xs font-bold uppercase">Change Banner</span>
                      </div>
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'banner')} />
                    </label>
                  </div>

                  {/* Profile Photo Overlay */}
                  <div className="absolute -bottom-10 left-10">
                    <div className="relative group">
                      <div className="w-32 h-32 rounded-[2rem] bg-white p-1 shadow-2xl">
                        <div className="w-full h-full rounded-[1.8rem] bg-slate-100 overflow-hidden flex items-center justify-center">
                          {localProfile.photoURL ? (
                            <img src={localProfile.photoURL} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          ) : (
                            <User size={48} className="text-slate-300" />
                          )}
                        </div>
                      </div>
                      <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-[2rem]">
                        <div className="flex flex-col items-center gap-1">
                          <Upload size={20} />
                          <span className="text-[10px] font-bold uppercase">Change</span>
                        </div>
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'photo')} />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
                  <div className="lg:col-span-2 space-y-8">
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-slate-700">Bio</h4>
                      <textarea 
                        className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all min-h-[120px] resize-none"
                        placeholder="Tell us about yourself, your study goals, or your favorite subjects..."
                        value={localProfile.bio || ''}
                        onChange={(e) => setLocalProfile({ ...localProfile, bio: e.target.value })}
                      />
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-slate-700">Interests & Subjects</h4>
                      <div className="flex flex-wrap gap-2">
                        {(localProfile.interests || []).map((interest, idx) => (
                          <span key={idx} className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 group">
                            {interest}
                            <button 
                              onClick={() => {
                                const newInterests = (localProfile.interests || []).filter((_, i) => i !== idx);
                                setLocalProfile({ ...localProfile, interests: newInterests });
                              }}
                              className="hover:text-rose-500 transition-colors"
                            >
                              <X size={14} />
                            </button>
                          </span>
                        ))}
                        <div className="relative">
                          <input 
                            type="text"
                            placeholder="Add interest..."
                            className="bg-slate-50 border-none rounded-xl px-4 py-2 text-xs focus:ring-2 focus:ring-indigo-500 transition-all w-32"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                const val = e.currentTarget.value.trim();
                                if (val && !(localProfile.interests || []).includes(val)) {
                                  setLocalProfile({ 
                                    ...localProfile, 
                                    interests: [...(localProfile.interests || []), val] 
                                  });
                                  e.currentTarget.value = '';
                                }
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-slate-700">Theme Color</h4>
                      <div className="flex flex-wrap gap-3">
                        {THEME_COLORS.map((color) => (
                          <button
                            key={color.value}
                            onClick={() => setLocalProfile({ ...localProfile, themeColor: color.value })}
                            className={`w-10 h-10 rounded-xl transition-all flex items-center justify-center ${color.class} ${localProfile.themeColor === color.value ? 'ring-4 ring-slate-200 scale-110 shadow-lg' : 'hover:scale-105'}`}
                            title={color.name}
                          >
                            {localProfile.themeColor === color.value && <CheckCircle2 size={18} className="text-white" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-slate-700">Social Links</h4>
                      <div className="space-y-3">
                        {['LinkedIn', 'GitHub', 'Twitter'].map((platform) => {
                          const link = (localProfile.socialLinks || []).find(l => l.platform === platform);
                          return (
                            <div key={platform} className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                                {platform === 'LinkedIn' && <Linkedin size={18} />}
                                {platform === 'GitHub' && <Github size={18} />}
                                {platform === 'Twitter' && <Twitter size={18} />}
                              </div>
                              <input 
                                type="text"
                                placeholder={`${platform} URL`}
                                className="flex-1 bg-slate-50 border-none rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-indigo-500 transition-all"
                                value={link?.url || ''}
                                onChange={(e) => {
                                  let newLinks;
                                  const existingIdx = (localProfile.socialLinks || []).findIndex(l => l.platform === platform);
                                  if (existingIdx > -1) {
                                    newLinks = localProfile.socialLinks.map((l, i) => 
                                      i === existingIdx ? { ...l, url: e.target.value } : l
                                    );
                                  } else {
                                    newLinks = [...(localProfile.socialLinks || []), { platform, url: e.target.value }];
                                  }
                                  setLocalProfile({ ...localProfile, socialLinks: newLinks });
                                }}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputGroup label="First Name" value={localProfile.firstName} onChange={(v: string) => setLocalProfile({...localProfile, firstName: v})} />
                  <InputGroup label="Last Name" value={localProfile.lastName} onChange={(v: string) => setLocalProfile({...localProfile, lastName: v})} />
                  <InputGroup label="Username" value={localProfile.username} onChange={(v: string) => setLocalProfile({...localProfile, username: v})} />
                  <InputGroup label="Cell Phone" value={localProfile.cellPhone || ''} onChange={(v: string) => setLocalProfile({...localProfile, cellPhone: v})} placeholder="+1 (555) 000-0000" />
                  <InputGroup label="Date of Birth" type="date" value={localProfile.dateOfBirth || ''} onChange={(v: string) => setLocalProfile({...localProfile, dateOfBirth: v})} />
                  <SelectGroup label="I am a..." value={localProfile.studentLevel} options={['Foundation Phase', 'Intermediate Phase', 'Senior Phase', 'FET Phase', 'University']} onChange={(v: string) => setLocalProfile({...localProfile, studentLevel: v as StudyType, yearGrade: getGradeOptions(v as StudyType)[0]})} />
                  <SelectGroup label={localProfile.studentLevel === 'University' ? 'Year of Study' : 'Grade'} value={localProfile.yearGrade} options={getGradeOptions(localProfile.studentLevel)} onChange={(v: string) => setLocalProfile({...localProfile, yearGrade: v})} />
                  <div className="md:col-span-2">
                    <InputGroup label="Address" value={localProfile.address || ''} onChange={(v: string) => setLocalProfile({...localProfile, address: v})} placeholder="123 Study Lane, Knowledge City" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Institution</label>
                    <select 
                      className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer"
                      value={isOtherInstitution ? 'other' : localProfile.institution}
                      onChange={(e) => handleInstitutionChange(e.target.value)}
                    >
                      <option value="">Select Institution</option>
                      {INSTITUTIONS.filter(i => i !== 'other').map(inst => (
                        <option key={inst} value={inst}>{inst}</option>
                      ))}
                      <option value="other">Other (Manual Entry)</option>
                    </select>
                    {isOtherInstitution && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-2">
                        <input 
                          type="text"
                          placeholder="Enter institution name"
                          className="w-full bg-slate-50 border border-indigo-100 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
                          value={localProfile.institution}
                          onChange={(e) => setLocalProfile({ ...localProfile, institution: e.target.value })}
                        />
                      </motion.div>
                    )}
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === 'study' && (
            <motion.div 
              key="study"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-10"
            >
              <section>
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Study Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Preferred Start Time</label>
                    <input 
                      type="time" 
                      className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
                      value={prefs.preferredStartTime}
                      onChange={(e) => updatePrefs({ preferredStartTime: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Preferred End Time</label>
                    <input 
                      type="time" 
                      className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
                      value={prefs.preferredEndTime}
                      onChange={(e) => updatePrefs({ preferredEndTime: e.target.value })}
                    />
                  </div>
                  <InputGroup 
                    label="Session Duration (mins)" 
                    type="number"
                    value={prefs.sessionDuration} 
                    onChange={(v: any) => updatePrefs({ sessionDuration: parseInt(v) })} 
                  />
                  <InputGroup 
                    label="Break Duration (mins)" 
                    type="number"
                    value={prefs.breakDuration} 
                    onChange={(v: any) => updatePrefs({ breakDuration: parseInt(v) })} 
                  />
                </div>
              </section>

              <section>
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Weekly Availability</h3>
                <p className="text-xs text-slate-400 mb-6">Set your available study hours for each day of the week. The smart timetable will use these slots to plan your sessions.</p>
                <div className="grid grid-cols-1 gap-3">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day: any) => {
                    const slot = (localProfile.availability || []).find((s: any) => s.day === day) || {
                      day,
                      startTime: '09:00',
                      endTime: '17:00',
                      enabled: false
                    };
                    
                    const updateSlot = (updates: any) => {
                      const currentAvail = localProfile.availability || [];
                      const exists = currentAvail.some((s: any) => s.day === day);
                      let newAvail;
                      if (exists) {
                        newAvail = currentAvail.map((s: any) => s.day === day ? { ...s, ...updates } : s);
                      } else {
                        newAvail = [...currentAvail, { ...slot, ...updates }];
                      }
                      setLocalProfile({ ...localProfile, availability: newAvail });
                    };

                    return (
                      <div key={day} className={`flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-2xl border transition-all ${slot.enabled ? 'bg-white border-indigo-100 shadow-sm' : 'bg-slate-50 border-slate-100 opacity-60'}`}>
                        <div className="flex items-center gap-3 min-w-[140px]">
                          <button 
                            onClick={() => updateSlot({ enabled: !slot.enabled })}
                            className={`w-12 h-6 rounded-full transition-all relative ${slot.enabled ? 'bg-indigo-600' : 'bg-slate-300'}`}
                          >
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${slot.enabled ? 'left-7' : 'left-1'}`} />
                          </button>
                          <span className={`text-sm font-bold ${slot.enabled ? 'text-slate-800' : 'text-slate-400'}`}>{day}</span>
                        </div>
                        
                        {slot.enabled && (
                          <div className="flex-1 flex items-center gap-4">
                            <div className="flex-1 flex items-center gap-2">
                              <span className="text-[10px] font-bold uppercase text-slate-400">From</span>
                              <input 
                                type="time" 
                                className="flex-1 bg-slate-50 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
                                value={slot.startTime}
                                onChange={(e) => updateSlot({ startTime: e.target.value })}
                              />
                            </div>
                            <div className="flex-1 flex items-center gap-2">
                              <span className="text-[10px] font-bold uppercase text-slate-400">To</span>
                              <input 
                                type="time" 
                                className="flex-1 bg-slate-50 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
                                value={slot.endTime}
                                onChange={(e) => updateSlot({ endTime: e.target.value })}
                              />
                            </div>
                          </div>
                        )}
                        {!slot.enabled && (
                          <span className="text-xs text-slate-400 italic">Not available</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === 'academic' && (
            <motion.div 
              key="academic"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-10"
            >
              <section>
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Academic Defaults</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputGroup 
                    label="Default Pass Mark (%)" 
                    type="number"
                    value={localProfile.defaultPassMark || 50} 
                    onChange={(v: any) => setLocalProfile({...localProfile, defaultPassMark: parseInt(v)})} 
                    placeholder="e.g. 50"
                  />
                  {isSchoolLevel(localProfile.studentLevel) && (
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-300">Curriculum</label>
                      <select
                        value={localProfile.curriculum || ''}
                        onChange={(e) => setLocalProfile({...localProfile, curriculum: e.target.value})}
                        className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                      >
                        <option value="">Select Curriculum</option>
                        <option value="CAPS">CAPS</option>
                        <option value="IEB">IEB (Independent Examinations Board)</option>
                        <option value="Cambridge">Cambridge (International)</option>
                        <option value="British">British (Pearson Edexcel)</option>
                        <option value="American">American</option>
                        <option value="Waldorf">Waldorf / Steiner Education</option>
                        <option value="Montessori">Montessori Education</option>
                        <option value="TVET">Technical & Vocational (TVET pathway in schools)</option>
                      </select>
                    </div>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-4">This value will be used as the default target for new modules you create.</p>
              </section>
            </motion.div>
          )}

          {activeTab === 'tutor' && (
            <motion.div 
              key="tutor"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-10"
            >
              <section>
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">AI Voice Tutor Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                      <Mic size={16} className="text-indigo-600" />
                      Preferred Voice
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {['Zephyr', 'Kore', 'Puck', 'Charon', 'Fenrir'].map((voice) => (
                        <button
                          key={voice}
                          onClick={() => setLocalProfile({
                            ...localProfile,
                            voiceTutorSettings: { ...voiceSettings, voiceName: voice as any }
                          })}
                          className={`px-4 py-3 rounded-xl text-xs font-bold transition-all border ${
                            voiceSettings.voiceName === voice 
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-100' 
                              : 'bg-white text-slate-600 border-slate-100 hover:bg-slate-50'
                          }`}
                        >
                          {voice}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={handleTestVoice}
                        disabled={isTestingVoice}
                        className="flex items-center gap-2 px-6 py-3 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-bold hover:bg-indigo-100 transition-all disabled:opacity-50"
                      >
                        {isTestingVoice ? (
                          <RotateCcw size={14} className="animate-spin" />
                        ) : (
                          <Play size={14} />
                        )}
                        {isTestingVoice ? 'Generating Sample...' : `Test ${voiceSettings.voiceName} Voice`}
                      </button>
                      {testAudioUrl && (
                        <audio 
                          ref={testAudioRef} 
                          src={testAudioUrl} 
                          onEnded={() => setTestAudioUrl(null)}
                          className="hidden"
                        />
                      )}
                    </div>
                    <p className="text-xs text-slate-400">Choose the AI voice that best suits your learning style. Click the test button to hear a sample.</p>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-bold text-slate-700">Speaking Rate</label>
                        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">{voiceSettings.speakingRate}x</span>
                      </div>
                      <input 
                        type="range" min="0.5" max="2.0" step="0.1"
                        className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        value={voiceSettings.speakingRate}
                        onChange={(e) => setLocalProfile({
                          ...localProfile,
                          voiceTutorSettings: { ...voiceSettings, speakingRate: parseFloat(e.target.value) }
                        })}
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-bold text-slate-700">Pitch</label>
                        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">{voiceSettings.pitch > 0 ? '+' : ''}{voiceSettings.pitch}</span>
                      </div>
                      <input 
                        type="range" min="-20" max="20" step="1"
                        className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        value={voiceSettings.pitch}
                        onChange={(e) => setLocalProfile({
                          ...localProfile,
                          voiceTutorSettings: { ...voiceSettings, pitch: parseInt(e.target.value) }
                        })}
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-bold text-slate-700">Volume</label>
                        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">{Math.round(voiceSettings.volume * 100)}%</span>
                      </div>
                      <input 
                        type="range" min="0" max="1" step="0.1"
                        className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        value={voiceSettings.volume}
                        onChange={(e) => setLocalProfile({
                          ...localProfile,
                          voiceTutorSettings: { ...voiceSettings, volume: parseFloat(e.target.value) }
                        })}
                      />
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === 'advanced' && (
            <motion.div 
              key="advanced"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-10"
            >
              <section>
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Data Management</h3>
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-700">Export Your Data</h4>
                      <p className="text-xs text-slate-400">Download a copy of your profile and settings in JSON format.</p>
                    </div>
                    <button 
                      onClick={handleExportData}
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all"
                    >
                      <DownloadIcon size={14} />
                      Export JSON
                    </button>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-sm font-bold uppercase tracking-widest text-rose-400 mb-6">Danger Zone</h3>
                <div className="p-6 rounded-2xl bg-rose-50 border border-rose-100 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-rose-700">Reset Study Progress</h4>
                      <p className="text-xs text-rose-400">This will clear your study streaks and statistics. This action is irreversible.</p>
                    </div>
                    <button 
                      onClick={() => {
                        if (confirm("Are you sure you want to reset your study progress? This cannot be undone.")) {
                          setLocalProfile({
                            ...localProfile,
                            studyStats: {
                              currentStreak: 0,
                              longestStreak: 0,
                              totalStudyHours: 0,
                              quizzesCompleted: 0,
                              perfectScores: 0,
                              modulesCompleted: 0,
                              lastStudyDate: null
                            }
                          });
                          setError("Study progress reset. Save changes to finalize.");
                          setTimeout(() => setError(null), 5000);
                        }
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-rose-200 text-rose-600 rounded-xl text-xs font-bold hover:bg-rose-100 transition-all"
                    >
                      <RotateCcw size={14} />
                      Reset Progress
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-rose-100">
                    <div>
                      <h4 className="text-sm font-bold text-rose-700">Delete Account</h4>
                      <p className="text-xs text-rose-400">Permanently delete your account and all associated data. This action is irreversible.</p>
                    </div>
                    <button 
                      onClick={handleDeleteAccount}
                      className="flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700 transition-all shadow-sm"
                    >
                      <Trash2 size={14} />
                      Delete Permanently
                    </button>
                  </div>
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
