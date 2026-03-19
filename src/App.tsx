import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Layout, 
  BookOpen, 
  Calendar, 
  Calendar as CalendarIcon, 
  MessageSquare, 
  Users, 
  Settings, 
  LogOut, 
  Plus, 
  Search, 
  Bell, 
  User, 
  ChevronRight, 
  Clock, 
  CheckCircle2, 
  Target, 
  Trophy, 
  Sparkles, 
  FileText, 
  ClipboardList,
  GraduationCap, 
  Menu, 
  X, 
  Trash2, 
  Edit2, 
  ArrowLeft, 
  ExternalLink, 
  Download, 
  Upload, 
  MoreVertical, 
  Share2, 
  Shield, 
  Zap, 
  Brain, 
  Lightbulb, 
  Flame, 
  BarChart3, 
  PieChart, 
  Activity, 
  ListTodo, 
  BookMarked, 
  FileQuestion, 
  Video, 
  Mic, 
  MapPin, 
  Globe, 
  Mail, 
  Phone, 
  Map, 
  Info, 
  AlertCircle, 
  HelpCircle, 
  Settings2, 
  Palette, 
  Moon, 
  Sun, 
  Monitor, 
  Lock, 
  Eye, 
  EyeOff, 
  Save, 
  RefreshCw, 
  Camera,
  Filter, 
  SortAsc, 
  SortDesc, 
  LayoutGrid, 
  LayoutList, 
  Maximize2, 
  Minimize2, 
  Copy, 
  Check, 
  Link as LinkIcon, 
  Play, 
  Pause, 
  Square, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Image as ImageIcon, 
  FileCode, 
  FileJson, 
  FileSpreadsheet, 
  FileImage, 
  FileVideo, 
  FileAudio, 
  FileArchive, 
  File as FileIcon, 
  Folder, 
  FolderPlus, 
  FolderOpen, 
  SearchCode, 
  Terminal, 
  Cpu, 
  Database, 
  Cloud, 
  Wifi, 
  WifiOff, 
  Smartphone, 
  Tablet, 
  Laptop, 
  Tv, 
  Watch, 
  Headphones, 
  Bluetooth, 
  Battery, 
  BatteryCharging, 
  ZapOff, 
  Wind, 
  Droplets, 
  Thermometer, 
  SunMedium, 
  CloudSun, 
  CloudRain, 
  CloudLightning, 
  CloudSnow, 
  CloudFog, 
  MoonStar, 
  Stars, 
  Compass, 
  Navigation, 
  Flag, 
  Pin, 
  Anchor, 
  Rocket, 
  Plane, 
  Train, 
  Bus, 
  Bike, 
  Car, 
  Truck, 
  Ship, 
  Heart, 
  Stethoscope, 
  Dna, 
  Microscope, 
  FlaskConical, 
  Atom, 
  Binary, 
  Calculator, 
  Hash, 
  Percent, 
  DollarSign, 
  Euro, 
  PoundSterling, 
  JapaneseYen, 
  Bitcoin, 
  Coins, 
  CreditCard, 
  Wallet, 
  Briefcase, 
  Building, 
  Building2, 
  Home, 
  Warehouse, 
  Store, 
  ShoppingBag, 
  ShoppingCart, 
  Gift, 
  Ticket, 
  Music, 
  Mic2, 
  Radio, 
  Cast, 
  Airplay, 
  MonitorPlay, 
  Clapperboard, 
  Film, 
  Gamepad2, 
  Joystick, 
  Dices, 
  Puzzle, 
  Medal, 
  Award, 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  Smile, 
  Frown, 
  Meh, 
  Laugh, 
  Angry, 
  Annoyed, 
  Ghost, 
  Skull, 
  Coffee, 
  Pizza, 
  Utensils, 
  Wine, 
  Beer, 
  GlassWater, 
  Leaf, 
  Flower, 
  TreeDeciduous, 
  Mountain, 
  Waves, 
  Sunrise, 
  Sunset, 
  Tag,
  Timer, 
  History, 
  Hourglass, 
  AlarmClock, 
  CalendarDays, 
  CalendarRange, 
  CalendarCheck, 
  CalendarX, 
  CalendarClock, 
  StickyNote, 
  Notebook, 
  PenTool, 
  Brush, 
  Eraser, 
  Scissors, 
  Paperclip, 
  Trash, 
  Archive, 
  Inbox, 
  Send, 
  Reply, 
  Forward, 
  MailOpen, 
  Mails, 
  UserPlus, 
  UserPlus as UserPlusIcon, 
  UserMinus, 
  UserCheck, 
  UserX, 
  UserCog, 
  Users2, 
  Contact, 
  IdCard, 
  Fingerprint, 
  Key, 
  ShieldCheck, 
  ShieldAlert, 
  ShieldX, 
  ShieldOff, 
  LockKeyhole, 
  UnlockKeyhole, 
  Sliders, 
  ToggleLeft, 
  ToggleRight, 
  Power, 
  HeartPulse, 
  Syringe, 
  Pill, 
  Loader2, 
  ChevronLeft, 
  ChevronDown, 
  ChevronUp, 
  MoreHorizontal, 
  FileUp, 
  FileDown, 
  FileSearch, 
  FileWarning, 
  FileCheck, 
  FilePlus, 
  FileMinus, 
  FileEdit,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  orderBy, 
  limit, 
  serverTimestamp, 
  getDoc, 
  getDocs, 
  writeBatch, 
  setDoc,
  getDocFromServer
} from 'firebase/firestore';
import { 
  getAuth, 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  User as FirebaseUser 
} from 'firebase/auth';
import { db, auth } from './firebase';
import { 
  UserProfile, 
  Module, 
  ScheduleItem, 
  StudyLog, 
  Community, 
  ChatMessage, 
  Badge, 
  StudyStats, 
  PastPaper, 
  University,
  ModuleType,
  AssessmentStatus,
  StudyUnit,
  ModuleChatMessage
} from './types';
import { GoogleGenAI, Type } from "@google/genai";
import Markdown from 'react-markdown';
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, parseISO, startOfDay, endOfDay, addMinutes, subDays } from 'date-fns';

import PastPapersView from './components/PastPapersView';
import UniversityPortal from './components/UniversityPortal';
import StudyHabitsDashboard from './components/StudyHabitsDashboard';
import { LiveTutorView, VisualsView, ResearchView } from './components/AIFeatures';
import { TutorSidebar } from './components/TutorSidebar';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  Cell,
  PieChart as RePieChart,
  Pie
} from 'recharts';

// --- Components ---

const SA_LANGUAGES = [
  "Afrikaans",
  "English",
  "isiNdebele",
  "isiXhosa",
  "isiZulu",
  "Sepedi",
  "Sesotho",
  "Setswana",
  "siSwati",
  "Tshivenda",
  "Xitsonga"
];

const INT_LANGUAGES = [
  "French",
  "Spanish",
  "German",
  "Portuguese",
  "Mandarin Chinese",
  "Japanese",
  "Korean",
  "Arabic",
  "Hindi"
];

const LoadingScreen = () => (
  <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      className="mb-8"
    >
      <div className="w-24 h-24 bg-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-indigo-200">
        <GraduationCap size={48} className="text-white" />
      </div>
    </motion.div>
    <h2 className="text-2xl font-bold text-slate-900 mb-2">Pfunzo AI</h2>
    <p className="text-slate-500 font-medium animate-pulse">Preparing your study space...</p>
  </div>
);

const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      setHasError(true);
      setError(event.error);
    };
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-[2rem] p-8 shadow-xl border border-red-100">
          <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6">
            <AlertCircle size={32} className="text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Something went wrong</h2>
          <p className="text-slate-600 mb-6">The application encountered an unexpected error. Don't worry, your data is safe.</p>
          <div className="bg-slate-50 p-4 rounded-xl mb-6 overflow-auto max-h-40">
            <code className="text-xs text-red-500">{error?.message || String(error)}</code>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw size={20} />
            Reload Application
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

const safeDate = (date: any) => {
  if (!date) return new Date();
  // Handle Firestore Timestamp
  if (typeof date === 'object' && 'seconds' in date) {
    return new Date(date.seconds * 1000 + (date.nanoseconds || 0) / 1000000);
  }
  // Handle case where .toDate() exists (Firestore SDK objects)
  if (date && typeof date.toDate === 'function') {
    return date.toDate();
  }
  const d = new Date(date);
  return isNaN(d.getTime()) ? new Date() : d;
};

export default function App() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [modules, setModules] = useState<Module[]>([]);
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [studyLogs, setStudyLogs] = useState<StudyLog[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [scheduleError, setScheduleError] = useState<string | null>(null);
  const [isAiTutorOpen, setIsAiTutorOpen] = useState(true);
  const [isSmartPlanning, setIsSmartPlanning] = useState(false);
  const [smartPlan, setSmartPlan] = useState<any>(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isLogStudyModalOpen, setIsLogStudyModalOpen] = useState(false);
  const [selectedLogModuleId, setSelectedLogModuleId] = useState<string | null>(null);
  const [editingScheduleItem, setEditingScheduleItem] = useState<ScheduleItem | null>(null);
  const [isQuotaExceeded, setIsQuotaExceeded] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);
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

  const handleFirestoreError = (error: any, operation: string, path: string) => {
    const errorMessage = error.message || String(error);
    const isQuotaError = errorMessage.includes('resource-exhausted') || errorMessage.includes('Quota limit exceeded');
    
    const errInfo = {
      error: errorMessage,
      operation,
      path,
      authInfo: {
        userId: user?.uid,
        email: user?.email,
        emailVerified: user?.emailVerified,
      }
    };
    console.error('Firestore Error:', JSON.stringify(errInfo));

    if (isQuotaError) {
      setIsQuotaExceeded(true);
      // Load from localStorage as fallback
      const cachedModules = localStorage.getItem(`modules_${user?.uid}`);
      const cachedSchedule = localStorage.getItem(`schedule_${user?.uid}`);
      const cachedLogs = localStorage.getItem(`studyLogs_${user?.uid}`);
      
      if (cachedModules && modules.length === 0) setModules(JSON.parse(cachedModules));
      if (cachedSchedule && schedule.length === 0) setSchedule(JSON.parse(cachedSchedule));
      if (cachedLogs && studyLogs.length === 0) setStudyLogs(JSON.parse(cachedLogs));
      
      return; // Don't throw for quota errors, just degrade gracefully
    }

    throw new Error(JSON.stringify(errInfo));
  };

  const handleUpdateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return;
    try {
      setProfile(prev => prev ? { ...prev, ...updates } : null);
      const docRef = doc(db, 'users', user.uid);
      await setDoc(docRef, updates, { merge: true });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      handleFirestoreError(error, 'update', `users/${user.uid}`);
    }
  };

  const handleSignUp = async (data: Partial<UserProfile>) => {
    if (!user) return;
    try {
      const docRef = doc(db, 'users', user.uid);
      const now = serverTimestamp();
      const newProfile: UserProfile = {
        ...data,
        uid: user.uid,
        email: user.email || '',
        username: data.username || user.email?.split('@')[0] || `user_${user.uid.slice(0, 5)}`,
        firstName: data.firstName || user.displayName?.split(' ')[0] || '',
        lastName: data.lastName || user.displayName?.split(' ').slice(1).join(' ') || '',
        institution: data.institution || '',
        studentLevel: data.studentLevel || 'University',
        yearGrade: data.yearGrade || '',
        studyStats: data.studyStats || {
          totalStudyHours: 0,
          quizzesCompleted: 0,
          perfectScores: 0,
          currentStreak: 0,
          longestStreak: 0,
          modulesCompleted: 0,
          lastStudyDate: null
        },
        createdAt: data.createdAt || now,
        lastLogin: data.lastLogin || now,
      };
      await setDoc(docRef, newProfile);
      setProfile(newProfile);
    } catch (error) {
      handleFirestoreError(error, 'create', `users/${user.uid}`);
    }
  };

  const handleAddModule = async (moduleData: Partial<Module>) => {
    if (!user) return;
    try {
      const tempId = Math.random().toString(36).substr(2, 9);
      const newModule = { id: tempId, ...moduleData, masteryScore: 0, assessments: moduleData.assessments || [] } as Module;
      setModules(prev => [...prev, newModule]);
      
      const colRef = collection(db, 'users', user.uid, 'modules');
      await addDoc(colRef, {
        ...moduleData,
        masteryScore: 0,
        assessments: moduleData.assessments || [],
        createdAt: serverTimestamp()
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      handleFirestoreError(error, 'create', `users/${user.uid}/modules`);
    }
  };

  const handleLogStudy = async (logData: Partial<StudyLog>) => {
    if (!user) return;
    try {
      const tempId = Math.random().toString(36).substr(2, 9);
      const newLog = { id: tempId, ...logData, timestamp: new Date() } as StudyLog;
      setStudyLogs(prev => [newLog, ...prev]);
      
      const colRef = collection(db, 'users', user.uid, 'studyLogs');
      await addDoc(colRef, {
        ...logData,
        timestamp: serverTimestamp()
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      handleFirestoreError(error, 'create', `users/${user.uid}/studyLogs`);
    }
  };

  const handleUpdateModule = async (id: string, updates: Partial<Module>) => {
    if (!user) return;
    try {
      setModules(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
      const docRef = doc(db, 'users', user.uid, 'modules', id);
      await updateDoc(docRef, updates);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      handleFirestoreError(error, 'update', `users/${user.uid}/modules/${id}`);
    }
  };

  const handleRemoveModule = async (id: string) => {
    if (!user) return;
    confirmAction(
      "Remove Module",
      "Are you sure you want to remove this module? All associated data will be lost.",
      async () => {
        try {
          setModules(prev => prev.filter(m => m.id !== id));
          const docRef = doc(db, 'users', user.uid, 'modules', id);
          await deleteDoc(docRef);
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 3000);
        } catch (error) {
          handleFirestoreError(error, 'delete', `users/${user.uid}/modules/${id}`);
        }
      },
      "Remove",
      true
    );
  };

  const handleEditSchedule = async (id: string, updates: Partial<ScheduleItem>) => {
    if (!user) return;
    try {
      setSchedule(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
      const docRef = doc(db, 'users', user.uid, 'schedule', id);
      await updateDoc(docRef, updates);
    } catch (error) {
      handleFirestoreError(error, 'update', `users/${user.uid}/schedule/${id}`);
    }
  };

  const handleAddSchedule = async (item: Partial<ScheduleItem>) => {
    if (!user) return;
    try {
      const tempId = Math.random().toString(36).substr(2, 9);
      const newItem = { id: tempId, ...item } as ScheduleItem;
      setSchedule(prev => [...prev, newItem]);
      
      const colRef = collection(db, 'users', user.uid, 'schedule');
      await addDoc(colRef, {
        ...item,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, 'create', `users/${user.uid}/schedule`);
    }
  };

  const handleDeleteSchedule = async (id: string) => {
    if (!user) return;
    confirmAction(
      "Delete Event",
      "Are you sure you want to delete this event from your timetable?",
      async () => {
        try {
          setSchedule(prev => prev.filter(item => item.id !== id));
          const docRef = doc(db, 'users', user.uid, 'schedule', id);
          await deleteDoc(docRef);
        } catch (error) {
          handleFirestoreError(error, 'delete', `users/${user.uid}/schedule/${id}`);
        }
      },
      "Delete",
      true
    );
  };

  const handleDeleteLog = async (id: string) => {
    if (!user) return;
    try {
      setStudyLogs(prev => prev.filter(log => log.id !== id));
      const docRef = doc(db, 'users', user.uid, 'studyLogs', id);
      await deleteDoc(docRef);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      handleFirestoreError(error, 'delete', `users/${user.uid}/studyLogs/${id}`);
    }
  };

  const handleUpdateUnit = async (moduleId: string, unitId: string, completed: boolean) => {
    if (!user) return;
    try {
      const module = modules.find(m => m.id === moduleId);
      if (!module || !module.units) return;
      const updatedUnits = module.units.map(u => u.id === unitId ? { ...u, completed } : u);
      
      setModules(prev => prev.map(m => m.id === moduleId ? { ...m, units: updatedUnits } : m));
      
      const docRef = doc(db, 'users', user.uid, 'modules', moduleId);
      await updateDoc(docRef, { units: updatedUnits });
    } catch (error) {
      handleFirestoreError(error, 'update', `users/${user.uid}/modules/${moduleId}`);
    }
  };

  // Auth & Data Fetching
  useEffect(() => {
    let unsubscribeProfile: (() => void) | undefined;
    let unsubscribeSchedule: (() => void) | undefined;
    let unsubscribeStudyLogs: (() => void) | undefined;
    let unsubscribeModules: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
        unsubscribeProfile = fetchProfile(u.uid);
        unsubscribeModules = fetchModules(u.uid);
        unsubscribeSchedule = fetchSchedule(u.uid);
        unsubscribeStudyLogs = fetchStudyLogs(u.uid);
      } else {
        setUser(null);
        setProfile(null);
        setModules([]);
        setSchedule([]);
        setStudyLogs([]);
        if (unsubscribeProfile) unsubscribeProfile();
        if (unsubscribeSchedule) unsubscribeSchedule();
        if (unsubscribeStudyLogs) unsubscribeStudyLogs();
        if (unsubscribeModules) unsubscribeModules();
      }
      setLoading(false);
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeProfile) unsubscribeProfile();
      if (unsubscribeSchedule) unsubscribeSchedule();
      if (unsubscribeStudyLogs) unsubscribeStudyLogs();
      if (unsubscribeModules) unsubscribeModules();
    };
  }, []);

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
      if (uid) localStorage.setItem(`schedule_${uid}`, JSON.stringify(items));
    }, (error) => handleFirestoreError(error, 'list', `users/${uid}/schedule`));
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
      if (uid) localStorage.setItem(`studyLogs_${uid}`, JSON.stringify(logs));
    }, (error) => handleFirestoreError(error, 'list', `users/${uid}/studyLogs`));
  };

  const fetchProfile = (uid: string) => {
    const docRef = doc(db, 'users', uid);
    return onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as UserProfile;
        setProfile(data);
        
        // Track login if enabled
        if (data.trackLogin && (!data.lastLogin?.toDate || (data.lastLogin?.toDate && new Date().getTime() - data.lastLogin.toDate().getTime() > 3600000))) {
          updateDoc(docRef, {
            lastLogin: serverTimestamp()
          }).catch(console.error);
        }
      } else {
        setProfile(null);
      }
    }, (error) => handleFirestoreError(error, 'get', `users/${uid}`));
  };

  const fetchModules = (uid: string) => {
    const q = collection(db, 'users', uid, 'modules');
    return onSnapshot(q, (snapshot) => {
      const mods: Module[] = [];
      snapshot.forEach((doc) => {
        mods.push({ id: doc.id, ...doc.data() } as Module);
      });
      setModules(mods);
      if (uid) localStorage.setItem(`modules_${uid}`, JSON.stringify(mods));
    }, (error) => handleFirestoreError(error, 'list', `users/${uid}/modules`));
  };

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  if (loading) return <LoadingScreen />;

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-indigo-100">
            <GraduationCap size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Pfunzo AI</h1>
          <p className="text-slate-500 mb-12 text-lg">Your intelligent study companion for academic excellence.</p>
          
          <button
            onClick={handleLogin}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-slate-200"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>
          
          <p className="mt-8 text-xs text-slate-400">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </motion.div>
      </div>
    );
  }

  if (user && !profile && !loading) {
    return (
      <SignUpView user={user} onSignUp={handleSignUp} />
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-50 flex">
        {/* Sidebar */}
        <aside className="w-20 lg:w-72 bg-white border-r border-slate-100 flex flex-col sticky top-0 h-screen z-40">
          <div className="p-6 flex items-center gap-4">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shrink-0">
              <GraduationCap size={24} className="text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 hidden lg:block">Pfunzo AI</span>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {[
              { id: 'dashboard', icon: Layout, label: 'Dashboard' },
              { id: 'modules', icon: BookOpen, label: 'My Modules' },
              { id: 'tasks', icon: ClipboardList, label: 'Task Viewer' },
              { id: 'translator', icon: Globe, label: 'Translator' },
              { id: 'timetable', icon: Calendar, label: 'Timetable' },
              { id: 'communities', icon: Users, label: 'Communities' },
              { id: 'past-papers', icon: FileText, label: 'Past Papers' },
              { id: 'university', icon: GraduationCap, label: 'University Portal' },
              { id: 'habits', icon: Activity, label: 'Study Habits' },
              { id: 'settings', icon: Settings, label: 'Settings' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all group ${
                  activeTab === item.id 
                    ? 'bg-indigo-50 text-indigo-600' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <item.icon size={24} className={activeTab === item.id ? 'text-indigo-600' : 'group-hover:scale-110 transition-transform'} />
                <span className="font-bold hidden lg:block">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-100">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 p-4 rounded-2xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all group"
            >
              <LogOut size={24} className="group-hover:translate-x-1 transition-transform" />
              <span className="font-bold hidden lg:block">Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {isQuotaExceeded && (
            <div className="bg-amber-50 border-b border-amber-100 px-8 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3 text-amber-700">
                <AlertCircle size={18} />
                <p className="text-sm font-medium">
                  Firestore daily quota exceeded. Using local storage for this session. Changes will sync to the cloud tomorrow.
                </p>
              </div>
              <button 
                onClick={() => setIsQuotaExceeded(false)}
                className="text-amber-500 hover:text-amber-700 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          )}
          {/* Header */}
          <header className="bg-white/80 backdrop-blur-md border-bottom border-slate-100 sticky top-0 z-30 px-8 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 capitalize">{activeTab.replace('-', ' ')}</h2>
              <p className="text-sm text-slate-500 font-medium">Welcome back, {profile?.firstName || user.displayName?.split(' ')[0] || 'Student'}</p>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsAiTutorOpen(!isAiTutorOpen)}
                className={`p-3 rounded-xl transition-all relative ${isAiTutorOpen ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                title="AI Study Tutor"
              >
                <Sparkles size={20} />
              </button>
              <button className="p-3 bg-slate-50 text-slate-500 rounded-xl hover:bg-slate-100 transition-all relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <div className="h-10 w-[1px] bg-slate-100 mx-2"></div>
              <div className="flex items-center gap-3 pl-2">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-slate-900">{profile?.firstName} {profile?.lastName}</p>
                  <p className="text-xs text-slate-500">{profile?.yearGrade} Student</p>
                </div>
                <div className="w-12 h-12 bg-indigo-100 rounded-2xl border-2 border-white shadow-sm overflow-hidden">
                  {profile?.photoURL ? (
                    <img src={profile.photoURL} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-indigo-600 font-bold text-xl">
                      {profile?.firstName?.[0] || user.displayName?.[0]}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          <div className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'dashboard' && <DashboardView profile={profile} modules={modules} schedule={schedule} onUpdate={handleEditSchedule} onTabChange={setActiveTab} />}
                {activeTab === 'modules' && <ModulesView modules={modules} profile={profile} onAdd={() => setIsModuleModalOpen(true)} onUpdate={handleUpdateModule} onDelete={handleRemoveModule} onUpdateUnit={handleUpdateUnit} />}
                {activeTab === 'tasks' && <TaskView modules={modules} onUpdate={handleUpdateModule} onTabChange={setActiveTab} />}
                {activeTab === 'translator' && <TranslatorView />}
                {activeTab === 'timetable' && (
                  <TimetableView 
                    schedule={schedule} 
                    modules={modules}
                    onAdd={() => setIsScheduleModalOpen(true)} 
                    onEdit={handleEditSchedule} 
                    onDelete={handleDeleteSchedule}
                    onSmartPlan={() => setIsSmartPlanning(true)}
                  />
                )}
                {activeTab === 'communities' && <CommunitiesView />}
                {activeTab === 'past-papers' && <PastPapersView profile={profile!} />}
                {activeTab === 'university' && (
                  <UniversityPortal 
                    profile={profile} 
                    modules={modules} 
                    onUpdateProfile={handleUpdateProfile} 
                  />
                )}
                {activeTab === 'habits' && (
                  <StudyHabitsDashboard 
                    studyLogs={studyLogs} 
                    modules={modules} 
                    schedule={schedule}
                    onLogStudy={handleLogStudy}
                    onDeleteLog={handleDeleteLog}
                    onUpdateUnit={handleUpdateUnit}
                  />
                )}
                {activeTab === 'settings' && (
                  <SettingsView 
                    profile={profile} 
                    onUpdate={handleUpdateProfile} 
                    logs={studyLogs} 
                    modules={modules} 
                    onAddLog={() => setIsLogStudyModalOpen(true)} 
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        {/* AI Tutor Sidebar */}
        <TutorSidebar 
          isOpen={isAiTutorOpen} 
          onClose={() => setIsAiTutorOpen(false)} 
          profile={profile} 
        />

        {/* Modals & Dialogs */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] bg-emerald-600 text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3"
            >
              <CheckCircle2 size={20} />
              <span className="font-bold">Action completed successfully!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {isModuleModalOpen && (
          <AddModuleModal 
            onClose={() => setIsModuleModalOpen(false)} 
            onAdd={handleAddModule} 
          />
        )}

        {isScheduleModalOpen && (
          <AddScheduleModal 
            onClose={() => setIsScheduleModalOpen(false)} 
            onAdd={handleAddSchedule}
            modules={modules}
          />
        )}

        {isLogStudyModalOpen && (
          <LogStudyModal 
            onClose={() => setIsLogStudyModalOpen(false)} 
            onAdd={handleLogStudy}
            modules={modules}
          />
        )}

        {isSmartPlanning && (
          <SmartStudyPlanModal 
            modules={modules}
            profile={profile}
            onClose={() => setIsSmartPlanning(false)}
            onUpdateSchedule={(newEvents: any) => {
              setSchedule([...schedule, ...newEvents]);
              setIsSmartPlanning(false);
            }}
          />
        )}

        {confirmDialog.isOpen && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-[100] p-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{confirmDialog.title}</h3>
              <p className="text-slate-600 mb-8 leading-relaxed">{confirmDialog.message}</p>
              <div className="flex gap-4">
                <button 
                  onClick={() => setConfirmDialog(prev => ({ ...prev, isOpen: false }))}
                  className="flex-1 py-4 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    confirmDialog.onConfirm();
                    setConfirmDialog(prev => ({ ...prev, isOpen: false }));
                  }}
                  className={`flex-1 py-4 text-white rounded-xl font-bold transition-all ${confirmDialog.isDanger ? 'bg-red-500 hover:bg-red-600' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                >
                  {confirmDialog.confirmText}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}

// --- Sub-Views ---

function TranslatorView() {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('English');
  const [targetLang, setTargetLang] = useState('isiZulu');
  const [isTranslating, setIsTranslating] = useState(false);

  const handleTranslate = async () => {
    if (!text.trim()) return;
    setIsTranslating(true);
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      const placeholders = ["MY_GEMINI_API_KEY", "YOUR_API_KEY", "YOUR_GEMINI_API_KEY", "ENTER_YOUR_KEY_HERE", "GEMINI_API_KEY"];
      if (!apiKey || placeholders.includes(apiKey)) {
        throw new Error("API Key is missing or invalid. Please ensure GEMINI_API_KEY is set in the Secrets panel (⚙️ gear icon -> Secrets).");
      }
      
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Translate the following text from ${sourceLang} to ${targetLang}. 
        Provide only the translated text, no explanations or additional context.
        Ensure the translation is 100% accurate and culturally appropriate.
        
        Text: ${text}`,
        config: {
          systemInstruction: "You are a professional translator specializing in South African official languages and major international languages. You provide accurate, natural-sounding translations.",
          temperature: 0.1,
        },
      });
      
      if (response && response.text) {
        setTranslatedText(response.text);
      } else {
        throw new Error("Empty response from translation service.");
      }
    } catch (error: any) {
      console.error("Translation Error:", error);
      let userMessage = "Translation failed. Please try again later.";
      if (error.message && (error.message.includes("API key not valid") || error.message.includes("INVALID_ARGUMENT"))) {
        userMessage = "API Key is invalid. Please ensure GEMINI_API_KEY is set correctly in the Secrets panel (⚙️ gear icon -> Secrets).";
      } else if (error.message) {
        userMessage = error.message;
      }
      setTranslatedText(`Error: ${userMessage}`);
    } finally {
      setIsTranslating(false);
    }
  };

  const swapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setText(translatedText);
    setTranslatedText(text);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 bg-indigo-600 text-white">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <Globe size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Language Translator</h3>
              <p className="text-indigo-100 text-sm">Translate between South African and International languages</p>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] items-center gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">From</label>
              <select 
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none cursor-pointer"
              >
                <optgroup label="South African Languages">
                  {SA_LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                </optgroup>
                <optgroup label="International Languages">
                  {INT_LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                </optgroup>
              </select>
            </div>

            <button 
              onClick={swapLanguages}
              className="mt-6 p-4 bg-slate-100 text-slate-500 rounded-2xl hover:bg-indigo-50 hover:text-indigo-600 transition-all"
            >
              <RefreshCw size={20} />
            </button>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">To</label>
              <select 
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none cursor-pointer"
              >
                <optgroup label="South African Languages">
                  {SA_LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                </optgroup>
                <optgroup label="International Languages">
                  {INT_LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                </optgroup>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Source Text</label>
                <span className="text-[10px] text-slate-400 font-bold">{text.length} characters</span>
              </div>
              <textarea 
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type something to translate..."
                className="w-full h-64 bg-slate-50 border border-slate-200 rounded-3xl p-6 text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none leading-relaxed"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Translation</label>
                {translatedText && (
                  <button 
                    onClick={() => navigator.clipboard.writeText(translatedText)}
                    className="text-[10px] text-indigo-600 font-bold hover:underline"
                  >
                    Copy Translation
                  </button>
                )}
              </div>
              <div className="w-full h-64 bg-indigo-50/30 border border-indigo-100 rounded-3xl p-6 text-slate-700 overflow-y-auto leading-relaxed relative">
                {isTranslating ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-white/50 backdrop-blur-[2px]">
                    <Loader2 size={32} className="animate-spin text-indigo-600" />
                    <p className="text-xs font-bold text-indigo-600 animate-pulse">Translating...</p>
                  </div>
                ) : translatedText ? (
                  <p>{translatedText}</p>
                ) : (
                  <p className="text-slate-400 italic">Translation will appear here...</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <button 
              onClick={handleTranslate}
              disabled={!text.trim() || isTranslating}
              className="px-12 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 disabled:opacity-50 flex items-center gap-3"
            >
              {isTranslating ? <Loader2 size={20} className="animate-spin" /> : <Sparkles size={20} />}
              Translate Now
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <h4 className="font-bold text-slate-900">High Accuracy</h4>
            <p className="text-xs text-slate-500">AI-powered precision</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
            <Zap size={24} />
          </div>
          <div>
            <h4 className="font-bold text-slate-900">Instant Results</h4>
            <p className="text-xs text-slate-500">Real-time translations</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
            <Globe size={24} />
          </div>
          <div>
            <h4 className="font-bold text-slate-900">20+ Languages</h4>
            <p className="text-xs text-slate-500">Local & International</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardView({ profile, modules, schedule, onUpdate, onTabChange }: any) {
  const today = new Date();
  const todaysSchedule = schedule.filter((item: any) => isSameDay(safeDate(item.start), today));
  const upcomingAssessments = modules.flatMap((m: any) => {
    const deadlines = [...(m.assessments || [])];
    if (m.examDate) {
      deadlines.push({
        id: `exam-${m.id}`,
        title: `${m.title} Final Exam`,
        dueDate: m.examDate,
        weight: 50,
        status: 'Scheduled'
      });
    }
    if (m.portfolioDate) {
      deadlines.push({
        id: `portfolio-${m.id}`,
        title: `${m.title} Final Portfolio`,
        dueDate: m.portfolioDate,
        weight: 50,
        status: 'In Progress'
      });
    }
    return deadlines;
  }).sort((a: any, b: any) => safeDate(a.dueDate).getTime() - safeDate(b.dueDate).getTime()).slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-indigo-600 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-xl shadow-indigo-100">
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4">Ready to study, {profile?.firstName}?</h2>
            <p className="text-indigo-100 text-lg mb-8 max-w-md">You have {todaysSchedule.length} sessions scheduled for today. Let's make them count!</p>
            <button className="px-8 py-4 bg-white text-indigo-600 rounded-2xl font-bold hover:bg-indigo-50 transition-all flex items-center gap-2 shadow-lg">
              <Play size={20} />
              Start Focus Session
            </button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
          <Sparkles className="absolute top-12 right-12 text-indigo-300/40" size={120} />
        </div>

        <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Study Streak</h3>
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <Flame size={24} className="text-orange-500" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-6xl font-black text-slate-900">{profile?.studyStats?.currentStreak || 0}</span>
              <span className="text-slate-500 font-bold">Days</span>
            </div>
            <p className="text-sm text-slate-500">Keep it up! You're in the top 5% of students this week.</p>
          </div>
          <div className="mt-8 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-orange-500 w-[70%] rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Hours', value: profile?.studyStats?.totalStudyHours || 0, icon: Clock, color: 'bg-blue-50 text-blue-600' },
          { label: 'Quizzes Done', value: profile?.studyStats?.quizzesCompleted || 0, icon: FileQuestion, color: 'bg-purple-50 text-purple-600' },
          { label: 'Perfect Scores', value: profile?.studyStats?.perfectScores || 0, icon: Trophy, color: 'bg-amber-50 text-amber-600' },
          { label: 'Average Mark', value: `${Math.round(modules.reduce((acc: any, m: any) => {
            const assessments = m.assessments || [];
            const totalWeight = assessments.reduce((sum: number, a: any) => sum + (a.weight || 0), 0);
            const yearMark = assessments.length > 0 
              ? (assessments.reduce((sum: number, a: any) => sum + ((a.markReceived || 0) * (a.weight || 0)), 0) / (totalWeight || 1))
              : 0;
            const finalMark = (yearMark * (m.yearMarkWeight || 50) / 100) + ((m.examMark || 0) * (m.examWeight || 50) / 100);
            return acc + finalMark;
          }, 0) / (modules.length || 1))}%`, icon: Target, color: 'bg-emerald-50 text-emerald-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Today's Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-slate-900">Today's Schedule</h3>
            <button className="text-indigo-600 font-bold text-sm hover:underline">View Full Calendar</button>
          </div>
          <div className="space-y-4">
            {todaysSchedule.length > 0 ? (
              todaysSchedule.map((item: any) => (
                <div key={item.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-indigo-200 transition-all">
                  <div className="flex items-center gap-6">
                    <div className="text-center min-w-[60px]">
                      <p className="text-sm font-bold text-slate-900">{format(safeDate(item.start), 'HH:mm')}</p>
                      <p className="text-xs text-slate-400 font-medium">{format(safeDate(item.end), 'HH:mm')}</p>
                    </div>
                    <div className="w-[2px] h-10 bg-slate-100"></div>
                    <div>
                      <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{item.title}</h4>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{item.type.replace('_', ' ')}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => onUpdate(item.id, { completed: !item.completed })}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${item.completed ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-50 text-slate-300 hover:bg-slate-100 hover:text-slate-400'}`}
                  >
                    <CheckCircle2 size={24} />
                  </button>
                </div>
              ))
            ) : (
              <div className="bg-white p-12 rounded-[2.5rem] border border-dashed border-slate-200 text-center">
                <CalendarIcon size={48} className="mx-auto text-slate-200 mb-4" />
                <p className="text-slate-500 font-medium">Nothing scheduled for today. Time to relax or plan ahead!</p>
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-slate-900">Deadlines</h3>
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            {upcomingAssessments.length > 0 ? (
              upcomingAssessments.map((assessment: any, i: number) => (
                <div key={assessment.id} className={`p-6 ${i !== upcomingAssessments.length - 1 ? 'border-b border-slate-50' : ''}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-3 py-1 bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-widest rounded-full">
                      {Math.ceil((safeDate(assessment.dueDate).getTime() - today.getTime()) / (1000 * 60 * 60 * 24))} Days Left
                    </span>
                    <span className="text-xs font-bold text-slate-400">{assessment.weight}% Weight</span>
                  </div>
                  <h4 className="font-bold text-slate-900 mb-1">{assessment.title}</h4>
                  <p className="text-xs text-slate-500 font-medium">{format(safeDate(assessment.dueDate), 'PPP')}</p>
                </div>
              ))
            ) : (
              <div className="p-10 text-center">
                <p className="text-sm text-slate-400">No upcoming deadlines. Great job staying on top of things!</p>
              </div>
            )}
            <button 
              onClick={() => onTabChange('tasks')}
              className="w-full py-4 bg-slate-50 text-slate-600 text-sm font-bold hover:bg-slate-100 transition-all border-t border-slate-50"
            >
              View All Tasks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModuleTasksTab({ module, onUpdate }: { module: any; onUpdate: (updates: any) => void }) {
  const [editingAssessment, setEditingAssessment] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newWeight, setNewWeight] = useState(0);
  const [newType, setNewType] = useState('Assignment');
  const [examMark, setExamMark] = useState(module.examMark || 0);

  const assessments = module.assessments || [];

  const handleAdd = () => {
    if (!newTitle || !newDate) return;
    const newAssessment = {
      id: `as-${Date.now()}`,
      title: newTitle,
      dueDate: newDate,
      weight: newWeight,
      type: newType,
      status: 'Pending',
      markReceived: 0
    };
    onUpdate({ assessments: [...assessments, newAssessment] });
    setIsAdding(false);
    setNewTitle('');
    setNewDate('');
    setNewWeight(0);
  };

  const handleDelete = (id: string) => {
    onUpdate({ assessments: assessments.filter((a: any) => a.id !== id) });
  };

  const handleUpdateAssessment = (id: string, updates: any) => {
    onUpdate({
      assessments: assessments.map((a: any) => a.id === id ? { ...a, ...updates } : a)
    });
    setEditingAssessment(null);
  };

  const handleUpdateExamMark = (val: number) => {
    setExamMark(val);
    onUpdate({ examMark: val });
  };

  // Calculations
  const totalWeight = assessments.reduce((sum: number, a: any) => sum + (a.weight || 0), 0);
  const yearMark = assessments.length > 0 
    ? (assessments.reduce((sum: number, a: any) => sum + ((a.markReceived || 0) * (a.weight || 0)), 0) / (totalWeight || 1))
    : 0;
  
  const finalMark = (yearMark * (module.yearMarkWeight || 50) / 100) + 
                    ((module.examMark || 0) * (module.examWeight || 50) / 100);

  const isPassing = finalMark >= (module.passMark || 50);
  const weightsSumTo100 = (module.yearMarkWeight || 50) + (module.examWeight || 50) === 100;

  return (
    <div className="space-y-6">
      {!weightsSumTo100 && (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-center gap-3 text-amber-700 text-sm">
          <AlertCircle size={20} />
          <p><strong>Weighting Warning:</strong> Your Year Mark and {module.moduleType} weights do not sum to 100% (currently { (module.yearMarkWeight || 50) + (module.examWeight || 50) }%). Final mark calculation may be inaccurate.</p>
        </div>
      )}
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Year Mark</p>
          <p className="text-2xl font-black text-slate-900">{yearMark.toFixed(1)}%</p>
          <p className="text-[10px] text-slate-400">Weighted average of tasks</p>
        </div>
        <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
          <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Final Mark</p>
          <p className={`text-2xl font-black ${isPassing ? 'text-emerald-600' : 'text-rose-600'}`}>
            {finalMark.toFixed(1)}%
          </p>
          <p className="text-[10px] text-indigo-400">Year Mark ({module.yearMarkWeight}%) + {module.moduleType} ({module.examWeight}%)</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
          <div className="flex items-center gap-2">
            {isPassing ? (
              <CheckCircle2 className="text-emerald-500" size={20} />
            ) : (
              <AlertCircle className="text-rose-500" size={20} />
            )}
            <span className={`font-bold ${isPassing ? 'text-emerald-600' : 'text-rose-600'}`}>
              {isPassing ? 'Passing' : 'Below Pass Mark'}
            </span>
          </div>
          <p className="text-[10px] text-slate-400">Target: {module.passMark}%</p>
        </div>
      </div>

      {/* Exam/Portfolio Mark */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
              <Trophy size={20} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900">{module.moduleType} Mark</h4>
              <p className="text-xs text-slate-500">Enter your received mark for the final {module.moduleType.toLowerCase()}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input 
              type="number" 
              value={examMark}
              onChange={(e) => handleUpdateExamMark(Number(e.target.value))}
              className="w-24 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-center font-bold text-indigo-600 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <span className="font-bold text-slate-400">%</span>
          </div>
        </div>
      </div>

      {/* Assessments List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-slate-900">Tasks & Assessments</h4>
          <button 
            onClick={() => setIsAdding(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all flex items-center gap-2"
          >
            <Plus size={14} />
            Add Assessment
          </button>
        </div>

        {isAdding && (
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Title</label>
                <input 
                  type="text" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Task name"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Type</label>
                <select 
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Assignment">Assignment</option>
                  <option value="Assessment">Assessment</option>
                  <option value="Project">Project</option>
                  <option value="Portfolio">Portfolio</option>
                  <option value="Exam">Exam</option>
                  <option value="Quiz">Quiz</option>
                  <option value="Test">Test</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Due Date</label>
                <input 
                  type="date" 
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Weight (%)</label>
                <input 
                  type="number" 
                  value={newWeight}
                  onChange={(e) => setNewWeight(Number(e.target.value))}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsAdding(false)} className="px-4 py-2 text-slate-500 font-bold text-xs">Cancel</button>
              <button onClick={handleAdd} className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold text-xs">Save Assessment</button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {assessments.map((assessment: any) => (
            <div key={assessment.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-xl ${
                    assessment.status === 'Done' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'
                  }`}>
                    <ClipboardList size={20} />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900">{assessment.title}</h5>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{assessment.type}</span>
                      <span className="text-[10px] text-slate-300">•</span>
                      <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Weight: {assessment.weight}%</span>
                      <span className="text-[10px] text-slate-300">•</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Due: {format(new Date(assessment.dueDate), 'MMM d, yyyy')}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2">
                      <input 
                        type="number" 
                        value={assessment.markReceived || 0}
                        onChange={(e) => handleUpdateAssessment(assessment.id, { markReceived: Number(e.target.value) })}
                        className="w-16 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-center font-bold text-indigo-600 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                      <span className="text-sm font-bold text-slate-400">%</span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Mark Received</p>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => setEditingAssessment(assessment)}
                      className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(assessment.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {assessments.length === 0 && !isAdding && (
            <div className="text-center py-12 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
              <ClipboardList className="mx-auto text-slate-300 mb-4" size={48} />
              <p className="text-slate-400 font-medium">No assessments added yet</p>
              <button 
                onClick={() => setIsAdding(true)}
                className="mt-4 text-indigo-600 font-bold text-sm hover:underline"
              >
                Add your first assessment
              </button>
            </div>
          )}
        </div>
      </div>

      {editingAssessment && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-[110] p-6">
          <div className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Edit Assessment</h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Title</label>
                <input 
                  type="text" 
                  value={editingAssessment.title}
                  onChange={(e) => setEditingAssessment({...editingAssessment, title: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Weight (%)</label>
                  <input 
                    type="number" 
                    value={editingAssessment.weight}
                    onChange={(e) => setEditingAssessment({...editingAssessment, weight: Number(e.target.value)})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Type</label>
                  <select 
                    value={editingAssessment.type}
                    onChange={(e) => setEditingAssessment({...editingAssessment, type: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Assignment">Assignment</option>
                    <option value="Assessment">Assessment</option>
                    <option value="Project">Project</option>
                    <option value="Portfolio">Portfolio</option>
                    <option value="Exam">Exam</option>
                    <option value="Quiz">Quiz</option>
                    <option value="Test">Test</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Mark (%)</label>
                  <input 
                    type="number" 
                    value={editingAssessment.markReceived}
                    onChange={(e) => setEditingAssessment({...editingAssessment, markReceived: Number(e.target.value)})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Due Date</label>
                  <input 
                    type="date" 
                    value={editingAssessment.dueDate}
                    onChange={(e) => setEditingAssessment({...editingAssessment, dueDate: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button onClick={() => setEditingAssessment(null)} className="px-4 py-2 text-slate-500 font-bold text-xs">Cancel</button>
                <button 
                  onClick={() => handleUpdateAssessment(editingAssessment.id, editingAssessment)} 
                  className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold text-xs"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ModuleUnitsTab({ module, onUpdateUnit }: { module: any, onUpdateUnit: any }) {
  const units = module.units || [];
  const completedCount = units.filter((u: any) => u.completed).length;
  const progress = units.length > 0 ? Math.round((completedCount / units.length) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Progress Header */}
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="text-2xl font-black text-slate-900">Module Progress</h4>
            <p className="text-slate-500 text-sm">Track your journey through this module</p>
          </div>
          <div className="text-right">
            <span className="text-4xl font-black text-indigo-600">{progress}%</span>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{completedCount} of {units.length} Units Done</p>
          </div>
        </div>
        <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-indigo-600 rounded-full shadow-lg shadow-indigo-100"
          />
        </div>
      </div>

      {/* Units List */}
      <div className="space-y-4">
        <h5 className="text-lg font-bold text-slate-800 flex items-center gap-2 px-2">
          <BookOpen size={20} className="text-indigo-600" />
          Study Units
        </h5>
        <div className="grid gap-4">
          {units.map((unit: any, index: number) => (
            <motion.div 
              key={unit.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`group bg-white rounded-2xl p-5 border transition-all hover:shadow-md flex items-center justify-between ${
                unit.completed ? 'border-emerald-100 bg-emerald-50/30' : 'border-slate-100'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg transition-colors ${
                  unit.completed ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600'
                }`}>
                  {unit.completed ? <CheckCircle2 size={24} /> : index + 1}
                </div>
                <div>
                  <h6 className={`font-bold transition-colors ${unit.completed ? 'text-emerald-900' : 'text-slate-800'}`}>
                    {unit.title}
                  </h6>
                  <p className="text-xs text-slate-500 line-clamp-1">{unit.description || 'No description available'}</p>
                </div>
              </div>
              <button 
                onClick={() => onUpdateUnit(module.id, unit.id, !unit.completed)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  unit.completed 
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                    : 'bg-slate-100 text-slate-600 hover:bg-indigo-600 hover:text-white'
                }`}
              >
                {unit.completed ? 'Completed' : 'Mark Done'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Resources Section */}
      {module.resources && module.resources.length > 0 && (
        <div className="space-y-4">
          <h5 className="text-lg font-bold text-slate-800 flex items-center gap-2 px-2">
            <LinkIcon size={20} className="text-indigo-600" />
            Learning Resources
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {module.resources.map((resource: any, index: number) => (
              <motion.a
                key={resource.id || index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 hover:border-indigo-200 hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  {resource.type === 'video' ? <Video size={20} /> : resource.type === 'link' ? <Globe size={20} /> : <FileText size={20} />}
                </div>
                <div className="flex-1 min-w-0">
                  <h6 className="font-bold text-slate-800 text-sm truncate group-hover:text-indigo-600 transition-colors">
                    {resource.title}
                  </h6>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{resource.type}</p>
                </div>
                <ExternalLink size={16} className="text-slate-300 group-hover:text-indigo-600" />
              </motion.a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ModuleChatModal({ module, onClose, onUpdate, onUpdateUnit, onStudyFlashcards, profile }: any) {
  const [activeTab, setActiveTab] = useState<'chat' | 'flashcards' | 'summary' | 'outcomes' | 'assessments' | 'units'>('chat');
  const [messages, setMessages] = useState<ModuleChatMessage[]>(module.chatHistory || []);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingFlashcards, setIsGeneratingFlashcards] = useState(false);
  const [isGeneratingOutcomes, setIsGeneratingOutcomes] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editInput, setEditInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleClearChat = () => {
    if (window.confirm("Are you sure you want to clear this chat history?")) {
      setMessages([]);
      onUpdate({ chatHistory: [] });
    }
  };

  const handleSaveChat = () => {
    const chatText = messages.map(m => `[${m.role === 'user' ? 'Student' : 'AI Tutor'} - ${format(safeDate(m.timestamp), 'yyyy-MM-dd HH:mm')}]:\n${m.text}\n`).join('\n---\n\n');
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${module.title}_Study_Chat_${format(new Date(), 'yyyyMMdd_HHmm')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleEditMessage = (id: string, currentText: string) => {
    setEditingMessageId(id);
    setEditInput(currentText);
  };

  const submitEdit = async (id: string) => {
    if (!editInput.trim()) return;
    
    const messageIndex = messages.findIndex(m => m.id === id);
    if (messageIndex === -1) return;

    const updatedMessages = [...messages];
    updatedMessages[messageIndex] = {
      ...updatedMessages[messageIndex],
      text: editInput.trim(),
      timestamp: new Date()
    };

    // If it's a user message, we might want to regenerate the AI response that followed it
    // For simplicity, we'll just update the message and history for now.
    setMessages(updatedMessages);
    onUpdate({ chatHistory: updatedMessages });
    setEditingMessageId(null);
  };

  const generateLearningOutcomes = async () => {
    setIsGeneratingOutcomes(true);
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      const placeholders = ["MY_GEMINI_API_KEY", "YOUR_API_KEY", "YOUR_GEMINI_API_KEY", "ENTER_YOUR_KEY_HERE", "GEMINI_API_KEY"];
      if (!apiKey || placeholders.includes(apiKey)) {
        throw new Error("API Key is missing or invalid. Please ensure GEMINI_API_KEY is set in the Secrets panel (⚙️ gear icon -> Secrets).");
      }
      const ai = new GoogleGenAI({ apiKey });
      const content = `
        Title: ${module.title}
        Transcription: ${module.videoTranscription || 'N/A'}
        Notes: ${module.notes || 'N/A'}
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Based on the following study module content, identify 5-8 clear, measurable learning outcomes. 
        What should a student be able to do or understand after completing this module?
        Return the result as a JSON array of strings.
        
        ${content}`,
        config: {
          systemInstruction: "You are an expert curriculum designer. Your goal is to identify clear, actionable learning outcomes for educational modules.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
      });

      const text = response.text || "[]";
      const generated = JSON.parse(text);
      onUpdate({ learningOutcomes: generated });
    } catch (error) {
      console.error("Learning Outcomes Generation Error:", error);
    } finally {
      setIsGeneratingOutcomes(false);
    }
  };

  const generateFlashcards = async () => {
    setIsGeneratingFlashcards(true);
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      const placeholders = ["MY_GEMINI_API_KEY", "YOUR_API_KEY", "YOUR_GEMINI_API_KEY", "ENTER_YOUR_KEY_HERE", "GEMINI_API_KEY"];
      if (!apiKey || placeholders.includes(apiKey)) {
        throw new Error("API Key is missing or invalid. Please ensure GEMINI_API_KEY is set in the Secrets panel (⚙️ gear icon -> Secrets).");
      }
      const ai = new GoogleGenAI({ apiKey });
      const content = `
        Title: ${module.title}
        Transcription: ${module.videoTranscription || 'N/A'}
        Notes: ${module.notes || 'N/A'}
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Please generate a set of 5-10 high-quality flashcards based on the following study module content. 
        Each flashcard must have a clear "question" and a concise "answer".
        Return the result as a JSON array of objects with "question" and "answer" properties.
        
        ${content}`,
        config: {
          systemInstruction: "You are an expert educational content creator. Your goal is to create effective active-recall flashcards for students.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                answer: { type: Type.STRING }
              },
              required: ["question", "answer"]
            }
          }
        },
      });

      const text = response.text || "[]";
      const generated = JSON.parse(text).map((f: any, i: number) => ({
        id: `fc-${Date.now()}-${i}`,
        ...f,
        timestamp: new Date()
      }));
      
      onUpdate({ flashcards: generated });
    } catch (error) {
      console.error("Flashcard Generation Error:", error);
    } finally {
      setIsGeneratingFlashcards(false);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ModuleChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input.trim(),
      timestamp: new Date()
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      const placeholders = ["MY_GEMINI_API_KEY", "YOUR_API_KEY", "YOUR_GEMINI_API_KEY", "ENTER_YOUR_KEY_HERE", "GEMINI_API_KEY"];
      if (!apiKey || placeholders.includes(apiKey)) {
        throw new Error("API Key is missing or invalid. Please ensure GEMINI_API_KEY is set in the Secrets panel (⚙️ gear icon -> Secrets).");
      }
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...messages.map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }]
          })),
          { role: 'user', parts: [{ text: input.trim() }] }
        ],
        config: {
          systemInstruction: `You are an AI Study Tutor for the module: ${module.title}. 
          Your student is at the ${profile?.studentLevel || 'University'} level${profile?.educationPhase ? ` (${profile.educationPhase})` : ''}${profile?.yearGrade ? `, specifically in ${profile.yearGrade}` : ''}.
          
          CRITICAL ADAPTATION RULES:
          1. Adapt your teaching style, complexity of explanations, and vocabulary to match this educational level.
          2. For Primary School (Foundation/Intermediate Phases): Use very simple language, short sentences, and fun, relatable examples. Focus on basic concepts.
          3. For High School (Senior/FET Phases): Use clear language but introduce subject-specific terminology. Use real-world applications.
          4. For University/College: Use academic terminology, provide deep insights, reference theoretical frameworks, and encourage critical thinking.
          5. For Training/Skills Programs: Focus on practical application, industry standards, and hands-on techniques.
          
          Context about this module: ${module.videoTranscription || 'No additional context provided.'}
          Help the student understand the concepts, answer questions, and provide study tips.
          Keep your responses concise and helpful. Use Markdown for formatting.`,
        },
      });

      const text = response.text || "I'm sorry, I couldn't process that request.";

      const aiMessage: ModuleChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: text,
        timestamp: new Date()
      };

      const finalMessages = [...newMessages, aiMessage];
      setMessages(finalMessages);
      onUpdate({ chatHistory: finalMessages });
    } catch (error) {
      console.error("Chat Error:", error);
      const errorMessage: ModuleChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date()
      };
      setMessages([...newMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4 md:p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-[2.5rem] w-full max-w-2xl h-[85vh] flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-indigo-600 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              {activeTab === 'chat' ? <MessageSquare size={20} /> : activeTab === 'flashcards' ? <Brain size={20} /> : <Sparkles size={20} />}
            </div>
            <div>
              <h3 className="font-bold">{module.title} {activeTab === 'chat' ? 'Tutor' : activeTab === 'flashcards' ? 'Flashcards' : 'Summary'}</h3>
              <p className="text-xs text-indigo-100">AI Study Assistant</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {activeTab === 'chat' && messages.length > 0 && (
              <div className="flex items-center gap-1 mr-2">
                <button 
                  onClick={handleSaveChat}
                  title="Save Chat Transcript"
                  className="p-2 hover:bg-white/10 rounded-lg transition-all text-white/80 hover:text-white"
                >
                  <Download size={18} />
                </button>
                <button 
                  onClick={handleClearChat}
                  title="Clear Chat History"
                  className="p-2 hover:bg-white/10 rounded-lg transition-all text-white/80 hover:text-white"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            )}
            <div className="flex bg-white/10 p-1 rounded-xl mr-4">
              <button 
                onClick={() => setActiveTab('chat')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'chat' ? 'bg-white text-indigo-600 shadow-sm' : 'text-white hover:bg-white/10'}`}
              >
                Chat
              </button>
              <button 
                onClick={() => setActiveTab('flashcards')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'flashcards' ? 'bg-white text-indigo-600 shadow-sm' : 'text-white hover:bg-white/10'}`}
              >
                Flashcards
              </button>
              <button 
                onClick={() => setActiveTab('summary')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'summary' ? 'bg-white text-indigo-600 shadow-sm' : 'text-white hover:bg-white/10'}`}
              >
                Summary
              </button>
              <button 
                onClick={() => setActiveTab('outcomes')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'outcomes' ? 'bg-white text-indigo-600 shadow-sm' : 'text-white hover:bg-white/10'}`}
              >
                Outcomes
              </button>
              <button 
                onClick={() => setActiveTab('assessments')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'assessments' ? 'bg-white text-indigo-600 shadow-sm' : 'text-white hover:bg-white/10'}`}
              >
                Assessments
              </button>
              <button 
                onClick={() => setActiveTab('units')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'units' ? 'bg-white text-indigo-600 shadow-sm' : 'text-white hover:bg-white/10'}`}
              >
                Units
              </button>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-all">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col bg-slate-50">
          {activeTab === 'chat' && (
            <>
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Sparkles size={32} />
                    </div>
                    <p className="text-slate-500 font-medium">Start a conversation with your AI tutor for {module.title}!</p>
                    <p className="text-xs text-slate-400 mt-2">Ask about concepts, formulas, or study tips.</p>
                  </div>
                )}
                {messages.map((m) => (
                  <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} group`}>
                    <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm relative ${
                      m.role === 'user' 
                        ? 'bg-indigo-600 text-white rounded-tr-none' 
                        : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'
                    }`}>
                      {editingMessageId === m.id ? (
                        <div className="space-y-2">
                          <textarea
                            value={editInput}
                            onChange={(e) => setEditInput(e.target.value)}
                            className="w-full bg-white/10 border border-white/20 rounded-lg p-2 text-sm text-white focus:ring-1 focus:ring-white outline-none min-h-[80px]"
                            autoFocus
                          />
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => setEditingMessageId(null)}
                              className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider hover:bg-white/10 rounded"
                            >
                              Cancel
                            </button>
                            <button 
                              onClick={() => submitEdit(m.id)}
                              className="px-3 py-1 bg-white text-indigo-600 text-[10px] font-bold uppercase tracking-wider rounded"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="prose prose-sm max-w-none prose-indigo">
                            <Markdown>{m.text}</Markdown>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <p className={`text-[10px] opacity-50`}>
                              {format(safeDate(m.timestamp), 'HH:mm')}
                            </p>
                            {m.role === 'user' && (
                              <button 
                                onClick={() => handleEditMessage(m.id, m.text)}
                                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded transition-all"
                              >
                                <Edit2 size={10} />
                              </button>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-slate-100 rounded-2xl p-4 rounded-tl-none shadow-sm flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin text-indigo-600" />
                      <span className="text-sm text-slate-400">Tutor is thinking...</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-slate-100 bg-white">
                <div className="flex gap-3">
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask your tutor anything..."
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                  <button 
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="p-4 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 disabled:opacity-50"
                  >
                    <Send size={24} />
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === 'assessments' && (
            <div className="flex-1 overflow-y-auto p-8">
              <ModuleTasksTab module={module} onUpdate={onUpdate} />
            </div>
          )}

          {activeTab === 'units' && (
            <div className="flex-1 overflow-y-auto p-8">
              <ModuleUnitsTab module={module} onUpdateUnit={onUpdateUnit} />
            </div>
          )}

          {activeTab === 'flashcards' && (
            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-xl mx-auto h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-bold text-slate-800 flex items-center gap-2">
                    <Brain size={18} className="text-emerald-500" />
                    Study Flashcards
                  </h4>
                  <button 
                    onClick={generateFlashcards}
                    disabled={isGeneratingFlashcards}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-700 disabled:opacity-50"
                  >
                    {isGeneratingFlashcards ? 'Generating...' : 'Regenerate'}
                  </button>
                </div>
                
                {module.flashcards?.length > 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center gap-8">
                    {/* Simplified Flashcard View for the Tab */}
                    <div className="w-full aspect-[4/3] bg-white rounded-3xl shadow-xl border border-slate-100 p-8 flex flex-col items-center justify-center text-center relative cursor-pointer group hover:shadow-2xl transition-all">
                      <div className="absolute top-4 right-4 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                        Preview
                      </div>
                      <p className="text-lg font-bold text-slate-800 leading-relaxed">
                        {module.flashcards[0].question}
                      </p>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                      <p className="text-xs text-slate-400 text-center">
                        {module.flashcards.length} flashcards generated.
                      </p>
                      <button 
                        onClick={() => {
                          onClose();
                          onStudyFlashcards(module);
                        }}
                        className="px-8 py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100 flex items-center gap-2"
                      >
                        <Brain size={18} />
                        Start Full Study Session
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center py-20">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-4">
                      {isGeneratingFlashcards ? <Loader2 size={32} className="animate-spin" /> : <Brain size={32} />}
                    </div>
                    <h5 className="font-bold text-slate-800 mb-2">
                      {isGeneratingFlashcards ? 'Generating Flashcards...' : 'No Flashcards Yet'}
                    </h5>
                    <p className="text-sm text-slate-500 max-w-xs mx-auto mb-6">
                      {isGeneratingFlashcards 
                        ? 'Our AI is analyzing your module content to create the best study materials.' 
                        : 'Generate AI-powered flashcards to help you master this module\'s content.'}
                    </p>
                    {!isGeneratingFlashcards && (
                      <button 
                        onClick={generateFlashcards}
                        className="px-6 py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100"
                      >
                        Generate Flashcards
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'summary' && (
            <div className="flex-1 overflow-y-auto p-8">
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                  <h4 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                    <Sparkles size={24} className="text-amber-500" />
                    Module Summary
                  </h4>
                </div>
                {module.summary ? (
                  <div className="prose prose-slate max-w-none bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <Markdown>{module.summary}</Markdown>
                  </div>
                ) : (
                  <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                    <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Sparkles size={32} />
                    </div>
                    <h5 className="font-bold text-slate-800 mb-2">No Summary Available</h5>
                    <p className="text-sm text-slate-500 max-w-xs mx-auto">
                      Generate a summary from the module card to see it here.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'outcomes' && (
            <div className="flex-1 overflow-y-auto p-8 bg-white">
              <div className="max-w-xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-2xl font-bold text-slate-900">Learning Outcomes</h4>
                    <p className="text-sm text-slate-500">What you'll achieve by the end of this module</p>
                  </div>
                  <button 
                    onClick={generateLearningOutcomes}
                    disabled={isGeneratingOutcomes}
                    className="px-6 py-3 bg-indigo-50 text-indigo-600 rounded-2xl text-sm font-bold hover:bg-indigo-100 transition-all flex items-center gap-2 disabled:opacity-50 shadow-sm"
                  >
                    {isGeneratingOutcomes ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
                    {module.learningOutcomes?.length > 0 ? 'Regenerate' : 'Generate Outcomes'}
                  </button>
                </div>

                <div className="space-y-4">
                  {isGeneratingOutcomes ? (
                    <div className="py-20 flex flex-col items-center justify-center space-y-6">
                      <div className="relative">
                        <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                        <Target className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-600" size={20} />
                      </div>
                      <div className="text-center">
                        <p className="text-slate-900 font-bold">Identifying Key Outcomes</p>
                        <p className="text-xs text-slate-500 animate-pulse">Analyzing module content and curriculum standards...</p>
                      </div>
                    </div>
                  ) : module.learningOutcomes?.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                      {module.learningOutcomes.map((outcome: string, idx: number) => (
                        <motion.div 
                          key={idx}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: idx * 0.1 }}
                          className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 flex items-start gap-5 group hover:border-indigo-200 transition-all"
                        >
                          <div className="w-10 h-10 bg-white text-indigo-600 rounded-xl flex items-center justify-center shrink-0 font-black text-sm shadow-sm border border-slate-100 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                            {idx + 1}
                          </div>
                          <p className="text-slate-700 leading-relaxed pt-1.5 font-medium">{outcome}</p>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-20 flex flex-col items-center justify-center text-center space-y-6">
                      <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
                        <Target size={48} />
                      </div>
                      <div className="max-w-xs">
                        <h5 className="font-bold text-slate-900 mb-2">No Outcomes Yet</h5>
                        <p className="text-sm text-slate-500">Let AI identify the core learning objectives based on your module content.</p>
                      </div>
                      <button 
                        onClick={generateLearningOutcomes}
                        className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center gap-3"
                      >
                        <Sparkles size={20} />
                        Generate Outcomes
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function ModuleSummaryModal({ module, onClose, onUpdate }: any) {
  const [summary, setSummary] = useState<string>(module.summary || '');
  const [isLoading, setIsLoading] = useState(false);

  const generateSummary = async () => {
    setIsLoading(true);
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      const placeholders = ["MY_GEMINI_API_KEY", "YOUR_API_KEY", "YOUR_GEMINI_API_KEY", "ENTER_YOUR_KEY_HERE", "GEMINI_API_KEY"];
      if (!apiKey || placeholders.includes(apiKey)) {
        throw new Error("API Key is missing or invalid. Please ensure GEMINI_API_KEY is set in the Secrets panel (⚙️ gear icon -> Secrets).");
      }
      const ai = new GoogleGenAI({ apiKey });
      const content = `
        Title: ${module.title}
        Transcription: ${module.videoTranscription || 'N/A'}
        Notes: ${module.notes || 'N/A'}
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Please provide a concise and well-structured summary of the following study module content. Use bullet points for key takeaways and keep it academic yet accessible.
        
        ${content}`,
        config: {
          systemInstruction: "You are an expert academic summarizer. Your goal is to help students quickly grasp the core concepts of their study modules.",
        },
      });

      const text = response.text || "Could not generate summary.";
      setSummary(text);
      onUpdate({ summary: text });
    } catch (error) {
      console.error("Summary Generation Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!module.summary && (module.videoTranscription || module.notes)) {
      generateSummary();
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-[110] p-4 md:p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-[2.5rem] w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
      >
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-amber-500 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="font-bold">{module.title} Summary</h3>
              <p className="text-xs text-amber-100">AI-Powered Overview</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-all">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 bg-slate-50">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 size={48} className="animate-spin text-amber-500" />
              <p className="text-slate-500 font-medium animate-pulse">Synthesizing your module content...</p>
            </div>
          ) : summary ? (
            <div className="prose prose-sm max-w-none prose-amber bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <Markdown>{summary}</Markdown>
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-slate-100 text-slate-300 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <FileText size={40} />
              </div>
              <p className="text-slate-500 font-medium">No content available to summarize.</p>
              <p className="text-sm text-slate-400 mt-2">Add notes or a video transcription to generate a summary.</p>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-slate-100 bg-white flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-3 text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition-all"
          >
            Close
          </button>
          {(module.videoTranscription || module.notes) && (
            <button 
              onClick={generateSummary}
              disabled={isLoading}
              className="px-6 py-3 bg-amber-500 text-white rounded-xl font-bold hover:bg-amber-600 transition-all shadow-lg shadow-amber-100 flex items-center gap-2"
            >
              <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
              Regenerate
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function ModuleFlashcardsModal({ module, onClose, onUpdate }: any) {
  const [flashcards, setFlashcards] = useState<any[]>(module.flashcards || []);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const generateFlashcards = async () => {
    setIsLoading(true);
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      const placeholders = ["MY_GEMINI_API_KEY", "YOUR_API_KEY", "YOUR_GEMINI_API_KEY", "ENTER_YOUR_KEY_HERE", "GEMINI_API_KEY"];
      if (!apiKey || placeholders.includes(apiKey)) {
        throw new Error("API Key is missing or invalid. Please ensure GEMINI_API_KEY is set in the Secrets panel (⚙️ gear icon -> Secrets).");
      }
      const ai = new GoogleGenAI({ apiKey });
      const content = `
        Title: ${module.title}
        Transcription: ${module.videoTranscription || 'N/A'}
        Notes: ${module.notes || 'N/A'}
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Please generate a set of 5-10 high-quality flashcards based on the following study module content. 
        Each flashcard must have a clear "question" and a concise "answer".
        Return the result as a JSON array of objects with "question" and "answer" properties.
        
        ${content}`,
        config: {
          systemInstruction: "You are an expert educational content creator. Your goal is to create effective active-recall flashcards for students.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                answer: { type: Type.STRING }
              },
              required: ["question", "answer"]
            }
          }
        },
      });

      const text = response.text || "[]";
      const generated = JSON.parse(text).map((f: any, i: number) => ({
        id: `fc-${Date.now()}-${i}`,
        ...f,
        timestamp: new Date()
      }));
      
      setFlashcards(generated);
      onUpdate({ flashcards: generated });
      setCurrentIndex(0);
      setIsFlipped(false);
    } catch (error) {
      console.error("Flashcard Generation Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (flashcards.length === 0 && (module.videoTranscription || module.notes)) {
      generateFlashcards();
    }
  }, []);

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % flashcards.length);
    }, 150);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    }, 150);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-[110] p-4 md:p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-[2.5rem] w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
      >
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-emerald-500 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Brain size={20} />
            </div>
            <div>
              <h3 className="font-bold">{module.title} Flashcards</h3>
              <p className="text-xs text-emerald-100">Active Recall Study</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-all">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 bg-slate-50 flex flex-col items-center justify-center">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 size={48} className="animate-spin text-emerald-500" />
              <p className="text-slate-500 font-medium animate-pulse">Generating your study deck...</p>
            </div>
          ) : flashcards.length > 0 ? (
            <div className="w-full max-w-md space-y-8">
              <div className="flex justify-between items-center px-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Card {currentIndex + 1} of {flashcards.length}
                </span>
                <div className="flex gap-1">
                  {flashcards.map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-1 rounded-full transition-all ${i === currentIndex ? 'w-4 bg-emerald-500' : 'w-1 bg-slate-200'}`}
                    />
                  ))}
                </div>
              </div>

              <div 
                className="perspective-1000 h-64 w-full cursor-pointer"
                onClick={() => setIsFlipped(!isFlipped)}
              >
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                  className="relative w-full h-full preserve-3d"
                >
                  {/* Front */}
                  <div className="absolute inset-0 backface-hidden bg-white rounded-3xl border-2 border-slate-100 shadow-xl p-8 flex flex-col items-center justify-center text-center">
                    <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-4">Question</p>
                    <h4 className="text-xl font-bold text-slate-800 leading-tight">
                      {flashcards[currentIndex].question}
                    </h4>
                    <p className="mt-auto text-xs text-slate-400 font-medium">Click to reveal answer</p>
                  </div>

                  {/* Back */}
                  <div 
                    className="absolute inset-0 backface-hidden bg-emerald-50 rounded-3xl border-2 border-emerald-100 shadow-xl p-8 flex flex-col items-center justify-center text-center"
                    style={{ transform: 'rotateY(180deg)' }}
                  >
                    <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-4">Answer</p>
                    <p className="text-lg font-medium text-slate-700 leading-relaxed">
                      {flashcards[currentIndex].answer}
                    </p>
                    <p className="mt-auto text-xs text-emerald-600/50 font-medium">Click to see question</p>
                  </div>
                </motion.div>
              </div>

              <div className="flex items-center justify-center gap-4">
                <button 
                  onClick={(e) => { e.stopPropagation(); prevCard(); }}
                  className="p-4 bg-white border border-slate-100 text-slate-400 rounded-2xl hover:text-emerald-500 hover:border-emerald-100 transition-all shadow-sm"
                >
                  <SkipBack size={24} />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); nextCard(); }}
                  className="p-4 bg-white border border-slate-100 text-slate-400 rounded-2xl hover:text-emerald-500 hover:border-emerald-100 transition-all shadow-sm"
                >
                  <SkipForward size={24} />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-slate-100 text-slate-300 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Brain size={40} />
              </div>
              <p className="text-slate-500 font-medium">No content available for flashcards.</p>
              <p className="text-sm text-slate-400 mt-2">Add notes or a video transcription to generate a study deck.</p>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-slate-100 bg-white flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-3 text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition-all"
          >
            Close
          </button>
          {(module.videoTranscription || module.notes) && (
            <button 
              onClick={generateFlashcards}
              disabled={isLoading}
              className="px-6 py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100 flex items-center gap-2"
            >
              <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
              Regenerate Deck
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function ModuleQuizModal({ module, onClose, onUpdate }: any) {
  const [quiz, setQuiz] = useState<any>(module.quiz || null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const generateQuiz = async () => {
    setIsLoading(true);
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      const placeholders = ["MY_GEMINI_API_KEY", "YOUR_API_KEY", "YOUR_GEMINI_API_KEY", "ENTER_YOUR_KEY_HERE", "GEMINI_API_KEY"];
      if (!apiKey || placeholders.includes(apiKey)) {
        throw new Error("API Key is missing or invalid. Please ensure GEMINI_API_KEY is set in the Secrets panel (⚙️ gear icon -> Secrets).");
      }
      const ai = new GoogleGenAI({ apiKey });
      const content = `
        Title: ${module.title}
        Transcription: ${module.videoTranscription || 'N/A'}
        Notes: ${module.notes || 'N/A'}
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Please generate a high-quality quiz with 5 multiple-choice questions based on the following study module content. 
        Each question must have 4 options and one correct answer (index 0-3).
        Return the result as a JSON object with a "questions" array. Each question object should have "question", "options" (array of 4 strings), "correctAnswer" (number), and "explanation" (string).
        
        ${content}`,
        config: {
          systemInstruction: "You are an expert educational assessment creator. Your goal is to create challenging yet fair multiple-choice questions that test deep understanding.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              questions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    question: { type: Type.STRING },
                    options: { type: Type.ARRAY, items: { type: Type.STRING } },
                    correctAnswer: { type: Type.NUMBER },
                    explanation: { type: Type.STRING }
                  },
                  required: ["question", "options", "correctAnswer", "explanation"]
                }
              }
            },
            required: ["questions"]
          }
        },
      });

      const text = response.text || "{\"questions\": []}";
      const generated = JSON.parse(text);
      
      setQuiz(generated);
      onUpdate({ quiz: generated });
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setScore(0);
      setIsFinished(false);
    } catch (error) {
      console.error("Quiz Generation Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!quiz && (module.videoTranscription || module.notes)) {
      generateQuiz();
    }
  }, []);

  const handleAnswerSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
    setShowFeedback(true);
    if (index === quiz.questions[currentQuestionIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setIsFinished(true);
      onUpdate({ lastQuizScore: Math.round((score / quiz.questions.length) * 100) });
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-[110] p-4 md:p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-[2.5rem] w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
      >
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-violet-500 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <FileQuestion size={20} />
            </div>
            <div>
              <h3 className="font-bold">{module.title} Quiz</h3>
              <p className="text-xs text-violet-100">Test Your Knowledge</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-all">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 bg-slate-50">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 size={48} className="animate-spin text-violet-500" />
              <p className="text-slate-500 font-medium animate-pulse">Crafting your assessment...</p>
            </div>
          ) : isFinished ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Trophy size={48} />
              </div>
              <h4 className="text-3xl font-black text-slate-900 mb-2">Quiz Complete!</h4>
              <p className="text-slate-500 font-medium mb-8">You scored {score} out of {quiz.questions.length}</p>
              <div className="text-6xl font-black text-violet-600 mb-12">
                {Math.round((score / quiz.questions.length) * 100)}%
              </div>
              <button 
                onClick={generateQuiz}
                className="px-8 py-4 bg-violet-600 text-white rounded-2xl font-bold hover:bg-violet-700 transition-all shadow-lg shadow-violet-100"
              >
                Try Again with New Questions
              </button>
            </div>
          ) : quiz && quiz.questions.length > 0 ? (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Question {currentQuestionIndex + 1} of {quiz.questions.length}
                </span>
                <div className="flex gap-1">
                  {quiz.questions.map((_: any, i: number) => (
                    <div 
                      key={i} 
                      className={`h-1 rounded-full transition-all ${i === currentQuestionIndex ? 'w-4 bg-violet-500' : i < currentQuestionIndex ? 'w-2 bg-violet-200' : 'w-1 bg-slate-200'}`}
                    />
                  ))}
                </div>
              </div>

              <h4 className="text-xl font-bold text-slate-800 leading-tight">
                {quiz.questions[currentQuestionIndex].question}
              </h4>

              <div className="space-y-3">
                {quiz.questions[currentQuestionIndex].options.map((option: string, index: number) => {
                  const isCorrect = index === quiz.questions[currentQuestionIndex].correctAnswer;
                  const isSelected = index === selectedAnswer;
                  
                  let buttonClass = "w-full p-6 rounded-2xl border-2 text-left transition-all font-medium flex items-center justify-between ";
                  if (showFeedback) {
                    if (isCorrect) buttonClass += "border-emerald-500 bg-emerald-50 text-emerald-700";
                    else if (isSelected) buttonClass += "border-red-500 bg-red-50 text-red-700";
                    else buttonClass += "border-slate-100 bg-white opacity-50";
                  } else {
                    buttonClass += "border-slate-100 bg-white hover:border-violet-200 hover:bg-violet-50/30 text-slate-700";
                  }

                  return (
                    <button 
                      key={index}
                      disabled={showFeedback}
                      onClick={() => handleAnswerSelect(index)}
                      className={buttonClass}
                    >
                      <span>{option}</span>
                      {showFeedback && isCorrect && <CheckCircle2 size={20} className="text-emerald-500" />}
                      {showFeedback && isSelected && !isCorrect && <AlertCircle size={20} className="text-red-500" />}
                    </button>
                  );
                })}
              </div>

              {showFeedback && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm"
                >
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Explanation</p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {quiz.questions[currentQuestionIndex].explanation}
                  </p>
                  <button 
                    onClick={nextQuestion}
                    className="mt-6 w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all"
                  >
                    {currentQuestionIndex === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                  </button>
                </motion.div>
              )}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-slate-100 text-slate-300 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <FileQuestion size={40} />
              </div>
              <p className="text-slate-500 font-medium">No content available for quiz.</p>
              <p className="text-sm text-slate-400 mt-2">Add notes or a video transcription to generate a quiz.</p>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-slate-100 bg-white flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-3 text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition-all"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function ModuleVisualsModal({ module, onClose, onUpdate }: any) {
  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-[110] p-4 md:p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
      >
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-indigo-600 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <ImageIcon size={20} />
            </div>
            <div>
              <h3 className="font-bold">{module.title} Visuals Studio</h3>
              <p className="text-xs text-indigo-100">AI Image & Video Generation</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-all">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 bg-slate-50">
          <VisualsView module={module} onUpdate={onUpdate} />
        </div>

        <div className="p-6 border-t border-slate-100 bg-white flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-3 bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 rounded-xl transition-all"
          >
            Close Studio
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function ModuleLiveTutorModal({ module, onClose, profile }: any) {
  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-[110] p-4 md:p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
      >
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-indigo-600 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Mic size={20} />
            </div>
            <div>
              <h3 className="font-bold">{module.title} Live Tutor</h3>
              <p className="text-xs text-indigo-100">Real-time Voice Conversation</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-all">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 bg-slate-50">
          <LiveTutorView module={module} profile={profile} />
        </div>

        <div className="p-6 border-t border-slate-100 bg-white flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-3 bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 rounded-xl transition-all"
          >
            Close Session
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function ModuleStudyPlanModal({ module, profile, onClose, onUpdate }: any) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [plan, setPlan] = useState<any>(module.studyPlan || null);

  const generatePlan = async () => {
    setIsGenerating(true);
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      const placeholders = ["MY_GEMINI_API_KEY", "YOUR_API_KEY", "YOUR_GEMINI_API_KEY", "ENTER_YOUR_KEY_HERE", "GEMINI_API_KEY"];
      if (!apiKey || placeholders.includes(apiKey)) {
        throw new Error("API Key is missing or invalid. Please ensure GEMINI_API_KEY is set in the Secrets panel (⚙️ gear icon -> Secrets).");
      }
      const ai = new GoogleGenAI({ apiKey });
      
      const context = {
        title: module.title,
        type: module.moduleType,
        content: module.videoTranscription || module.notes || "No content provided",
        quizResults: module.assessments || [],
        flashcardCount: module.flashcards?.length || 0,
        preferences: profile?.studyPreferences || "Standard study approach",
        examDate: module.examDate,
        portfolioDate: module.portfolioDate
      };

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate a highly personalized 7-day study plan for the module "${context.title}".
        
        CRITICAL INPUTS TO CONSIDER:
        1. Module Type: ${context.type} (Adjust tasks for Exam vs Portfolio vs Practical)
        2. Content Context: ${context.content.substring(0, 1000)}
        3. Current Mastery & Assessment Data: ${JSON.stringify(context.quizResults)} (Prioritize weak areas where marks are low)
        4. User Study Preferences: ${context.preferences}
        5. Deadlines: Exam on ${context.examDate || 'Not set'}, Portfolio due on ${context.portfolioDate || 'Not set'} (Increase intensity as dates approach)
        
        The plan should be structured as a JSON array of objects, each representing a day:
        [
          {
            "day": 1,
            "focus": "Topic name",
            "tasks": ["Task 1", "Task 2"],
            "duration": "60 mins",
            "aiRecommendation": "Why this is recommended based on your specific progress and preferences"
          }
        ]
        
        Return ONLY the JSON.`,
        config: {
          responseMimeType: "application/json",
        }
      });

      const generatedPlan = JSON.parse(response.text || '[]');
      setPlan(generatedPlan);
      onUpdate({ studyPlan: generatedPlan });
    } catch (error) {
      console.error("Error generating study plan:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-[100] p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
      >
        <div className="p-8 border-b border-slate-100 bg-indigo-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <CalendarIcon size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Personalized Study Plan</h3>
              <p className="text-indigo-100 text-sm">{module.title}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-all">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          {!plan && !isGenerating ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
              <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
                <Target size={48} />
              </div>
              <div className="max-w-md">
                <h4 className="text-xl font-bold text-slate-900 mb-2">No Study Plan Yet</h4>
                <p className="text-slate-500">Let our AI analyze your progress and content to create a structured path to mastery.</p>
              </div>
              <button 
                onClick={generatePlan}
                className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center gap-3"
              >
                <Sparkles size={20} />
                Generate My Plan
              </button>
            </div>
          ) : isGenerating ? (
            <div className="h-full flex flex-col items-center justify-center space-y-6 py-12">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-600" size={24} />
              </div>
              <div className="text-center">
                <h4 className="text-xl font-bold text-slate-900 mb-2">Analyzing Progress...</h4>
                <p className="text-slate-500 animate-pulse">Crafting your personalized path to success</p>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">7-Day Mastery Plan</h4>
                    <p className="text-xs text-slate-500">Optimized for your learning style</p>
                  </div>
                </div>
                <button 
                  onClick={generatePlan}
                  className="text-sm font-bold text-indigo-600 hover:underline flex items-center gap-2"
                >
                  <RefreshCw size={14} />
                  Regenerate Plan
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {plan.map((day: any, idx: number) => (
                  <motion.div 
                    key={idx}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-slate-50 rounded-3xl p-6 border border-slate-100 hover:border-indigo-200 transition-all group"
                  >
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-white rounded-2xl flex flex-col items-center justify-center shadow-sm border border-slate-100 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Day</span>
                        <span className="text-2xl font-black">{day.day}</span>
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="flex items-center justify-between">
                          <h5 className="text-lg font-bold text-slate-900">{day.focus}</h5>
                          <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-lg text-[10px] font-bold uppercase tracking-widest">
                            {day.duration}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tasks</p>
                            <ul className="space-y-2">
                              {day.tasks.map((task: string, tIdx: number) => (
                                <li key={tIdx} className="flex items-center gap-2 text-sm text-slate-600">
                                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                                  {task}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="bg-white p-4 rounded-2xl border border-slate-100">
                            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                              <Sparkles size={12} />
                              AI Recommendation
                            </p>
                            <p className="text-xs text-slate-600 leading-relaxed italic">
                              "{day.aiRecommendation}"
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-8 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-8 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-100 transition-all"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function TaskModal({ task, modules, onClose, onSave }: any) {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    weight: task?.weight || 0,
    dueDate: task?.dueDate || new Date().toISOString().split('T')[0],
    dueTime: task?.dueTime || '23:59',
    status: task?.status || 'Pending',
    type: task?.type || 'Assignment',
    moduleId: task?.moduleId || (modules.length > 0 ? modules[0].id : '')
  });

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-[120] p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-[2.5rem] w-full max-w-lg p-8 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-slate-900">{task ? 'Edit Task' : 'Add New Task'}</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-xl transition-all">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Task Title</label>
            <input 
              type="text" 
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              placeholder="Enter task name..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Weight (%)</label>
              <input 
                type="number" 
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Task Type</label>
              <select 
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              >
                <option value="Assignment">Assignment</option>
                <option value="Assessment">Assessment</option>
                <option value="Project">Project</option>
                <option value="Portfolio">Portfolio</option>
                <option value="Exam">Exam</option>
                <option value="Quiz">Quiz</option>
                <option value="Test">Test</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Module</label>
              <select 
                value={formData.moduleId}
                onChange={(e) => setFormData({ ...formData, moduleId: e.target.value })}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              >
                {modules.map((m: any) => (
                  <option key={m.id} value={m.id}>{m.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Status</label>
              <select 
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Due Date</label>
              <input 
                type="date" 
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Due Time</label>
              <input 
                type="time" 
                value={formData.dueTime}
                onChange={(e) => setFormData({ ...formData, dueTime: e.target.value })}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
          </div>

          <button 
            onClick={() => onSave(formData)}
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
          >
            {task ? 'Save Changes' : 'Add Task'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function TaskView({ modules, onUpdate, onTabChange }: any) {
  const [viewMode, setViewMode] = useState<'tasks' | 'grades'>('tasks');
  const [selectedModuleId, setSelectedModuleId] = useState<string>('all');
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);

  const filteredModules = selectedModuleId === 'all' 
    ? modules 
    : modules.filter((m: any) => m.id === selectedModuleId);

  const allAssessments = filteredModules.flatMap((m: any) => 
    (m.assessments || []).map((a: any) => ({ ...a, moduleTitle: m.title, moduleId: m.id }))
  );

  const handleAddTask = (formData: any) => {
    const module = modules.find((m: any) => m.id === formData.moduleId);
    if (module) {
      const newTask = {
        id: Math.random().toString(36).substr(2, 9),
        title: formData.title,
        weight: formData.weight,
        dueDate: formData.dueDate,
        dueTime: formData.dueTime,
        status: formData.status,
        type: formData.type,
        markReceived: 0
      };
      onUpdate(module.id, { assessments: [...(module.assessments || []), newTask] });
    }
    setIsAddingTask(false);
  };

  const handleEditTask = (formData: any) => {
    const oldModule = modules.find((m: any) => m.id === editingTask.moduleId);
    const newModule = modules.find((m: any) => m.id === formData.moduleId);

    if (oldModule && newModule) {
      if (oldModule.id === newModule.id) {
        // Same module, just update
        const updatedAssessments = oldModule.assessments.map((a: any) => 
          a.id === editingTask.id ? { ...a, ...formData } : a
        );
        onUpdate(oldModule.id, { assessments: updatedAssessments });
      } else {
        // Moved to different module
        const filteredOld = oldModule.assessments.filter((a: any) => a.id !== editingTask.id);
        onUpdate(oldModule.id, { assessments: filteredOld });

        const newTask = { ...editingTask, ...formData };
        onUpdate(newModule.id, { assessments: [...(newModule.assessments || []), newTask] });
      }
    }
    setEditingTask(null);
  };

  const handleDeleteTask = (assessment: any) => {
    const module = modules.find((m: any) => m.id === assessment.moduleId);
    if (module) {
      const updatedAssessments = module.assessments.filter((a: any) => a.id !== assessment.id);
      onUpdate(module.id, { assessments: updatedAssessments });
    }
  };

  const safeDate = (date: any) => {
    try {
      return new Date(date);
    } catch (e) {
      return new Date();
    }
  };

  const statusColors: any = {
    'Pending': 'bg-amber-50 text-amber-600 border-amber-100',
    'In Progress': 'bg-blue-50 text-blue-600 border-blue-100',
    'Done': 'bg-emerald-50 text-emerald-600 border-emerald-100',
    'Missed': 'bg-rose-50 text-rose-600 border-rose-100'
  };

  return (
    <div className="space-y-8">
      {/* Controls Section */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex-1 md:flex-none min-w-[160px]">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">View Mode</label>
            <select 
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value as any)}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer"
            >
              <option value="tasks">Tasks</option>
              <option value="grades">Grade Tracker</option>
            </select>
          </div>
          <div className="flex-1 md:flex-none min-w-[200px]">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Filter by Module</label>
            <select 
              value={selectedModuleId}
              onChange={(e) => setSelectedModuleId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer"
            >
              <option value="all">All Modules</option>
              {modules.map((m: any) => (
                <option key={m.id} value={m.id}>{m.title}</option>
              ))}
            </select>
          </div>
        </div>
        
        {viewMode === 'grades' ? (
          <button 
            onClick={() => onTabChange('modules')}
            className="w-full md:w-auto px-6 py-2 bg-indigo-50 text-indigo-600 rounded-xl font-bold text-sm hover:bg-indigo-100 transition-all flex items-center justify-center gap-2"
          >
            Manage Modules
          </button>
        ) : (
          <button 
            onClick={() => setIsAddingTask(true)}
            className="w-full md:w-auto px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-100"
          >
            <Plus size={18} />
            Add Task
          </button>
        )}
      </div>

      {viewMode === 'grades' ? (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-black text-slate-900">Grade Tracker</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModules.length > 0 ? (
              filteredModules.map((m: any) => {
                const assessments = m.assessments || [];
                const totalWeight = assessments.reduce((sum: number, a: any) => sum + (a.weight || 0), 0);
                const yearMark = assessments.length > 0 
                  ? (assessments.reduce((sum: number, a: any) => sum + ((a.markReceived || 0) * (a.weight || 0)), 0) / (totalWeight || 1))
                  : 0;
                const finalMark = (yearMark * (m.yearMarkWeight || 50) / 100) + ((m.examMark || 0) * (m.examWeight || 50) / 100);
                const isPassing = finalMark >= (m.passMark || 50);
                
                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={m.id} 
                    className="p-6 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                          <BookOpen size={20} className="text-indigo-600" />
                        </div>
                        <h4 className="font-bold text-slate-900 truncate max-w-[150px]">{m.title}</h4>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${isPassing ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                        {isPassing ? 'Passing' : 'Below Pass'}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Final Mark</p>
                          <p className="text-3xl font-black text-slate-900">{Math.round(finalMark)}%</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Target</p>
                          <p className="text-lg font-bold text-slate-400">{m.passMark || 50}%</p>
                        </div>
                      </div>
                      
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(finalMark, 100)}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-full rounded-full ${isPassing ? 'bg-emerald-500' : 'bg-rose-500'}`}
                        ></motion.div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Year Mark</p>
                          <p className="text-sm font-bold text-slate-700">{Math.round(yearMark)}%</p>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Exam Mark</p>
                          <p className="text-sm font-bold text-slate-700">{m.examMark || 0}%</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-full bg-white p-12 rounded-[2.5rem] border border-dashed border-slate-200 text-center">
                <BookOpen size={48} className="mx-auto text-slate-200 mb-4" />
                <p className="text-slate-500 font-medium">No modules found. Add modules to track your grades!</p>
              </div>
            )}
          </div>
        </section>
      ) : (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-black text-slate-900">Task Viewer</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allAssessments.length > 0 ? (
              allAssessments.map((assessment: any) => (
                <motion.div
                  key={assessment.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <select 
                      value={assessment.status || 'Pending'}
                      onChange={(e) => {
                        const newStatus = e.target.value;
                        const module = modules.find((m: any) => m.id === assessment.moduleId);
                        const updatedAssessments = module.assessments.map((a: any) => 
                          a.id === assessment.id ? { ...a, status: newStatus } : a
                        );
                        onUpdate(assessment.moduleId, { assessments: updatedAssessments });
                      }}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest outline-none border transition-all cursor-pointer ${
                        statusColors[assessment.status || 'Pending']
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Done">Done</option>
                      <option value="Missed">Missed</option>
                    </select>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setEditingTask(assessment)}
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button 
                        onClick={() => handleDeleteTask(assessment)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  
                  <h4 className="text-xl font-bold text-slate-900 mb-1">{assessment.title}</h4>
                  <p className="text-sm text-indigo-600 font-medium mb-4">{assessment.moduleTitle}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Calendar size={16} />
                      <span className="text-sm">{format(safeDate(assessment.dueDate), 'PPP')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                      <Clock size={16} />
                      <span className="text-sm">Due: {assessment.dueTime || '23:59'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                      <Target size={16} />
                      <span className="text-sm">Weight: {assessment.weight}%</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Mark Received</p>
                      <div className="flex items-center gap-2">
                        <input 
                          type="number" 
                          value={assessment.markReceived || 0}
                          onChange={(e) => {
                            const module = modules.find((m: any) => m.id === assessment.moduleId);
                            const updatedAssessments = module.assessments.map((a: any) => 
                              a.id === assessment.id ? { ...a, markReceived: Number(e.target.value) } : a
                            );
                            onUpdate(assessment.moduleId, { assessments: updatedAssessments });
                          }}
                          className="w-full bg-transparent font-black text-indigo-600 outline-none"
                        />
                        <span className="text-xs font-bold text-slate-400">%</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => {
                        const module = modules.find((m: any) => m.id === assessment.moduleId);
                        const updatedAssessments = module.assessments.map((a: any) => 
                          a.id === assessment.id ? { ...a, status: a.status === 'Done' ? 'Pending' : 'Done' } : a
                        );
                        onUpdate(assessment.moduleId, { assessments: updatedAssessments });
                      }}
                      className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                        assessment.status === 'Done' 
                          ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' 
                          : 'bg-indigo-600 text-white hover:bg-indigo-700'
                      }`}
                    >
                      <CheckCircle2 size={18} />
                      {assessment.status === 'Done' ? 'Completed' : 'Mark as Done'}
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full bg-white p-12 rounded-[2.5rem] border border-dashed border-slate-200 text-center">
                <ClipboardList size={48} className="mx-auto text-slate-200 mb-4" />
                <p className="text-slate-500 font-medium">No tasks found for this selection.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {isAddingTask && (
        <TaskModal 
          modules={modules}
          onClose={() => setIsAddingTask(false)}
          onSave={handleAddTask}
        />
      )}

      {editingTask && (
        <TaskModal 
          task={editingTask}
          modules={modules}
          onClose={() => setEditingTask(null)}
          onSave={handleEditTask}
        />
      )}
    </div>
  );
}

function ModulesView({ modules, profile, onAdd, onUpdate, onDelete, onUpdateUnit }: any) {
  const [editingModule, setEditingModule] = useState<any>(null);
  const [selectedModuleForChat, setSelectedModuleForChat] = useState<any>(null);
  const [summarizingModule, setSummarizingModule] = useState<any>(null);
  const [studyingFlashcards, setStudyingFlashcards] = useState<any>(null);
  const [quizModule, setQuizModule] = useState<any>(null);
  const [visualizingModule, setVisualizingModule] = useState<any>(null);
  const [liveTutorModule, setLiveTutorModule] = useState<any>(null);
  const [planningModule, setPlanningModule] = useState<any>(null);
  const [activeToolMenu, setActiveToolMenu] = useState<string | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setActiveToolMenu(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-3xl font-black text-slate-900">My Modules</h3>
        <button onClick={onAdd} className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-100">
          <Plus size={20} />
          Add New Module
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {modules.map((module: any) => (
          <motion.div
            key={module.id}
            onClick={() => setSelectedModuleForChat(module)}
            whileHover={{ y: -5 }}
            className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden group cursor-pointer relative"
          >
            <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setLiveTutorModule(module);
                }}
                className="p-2 bg-white/20 backdrop-blur-md text-white rounded-lg hover:bg-indigo-400 transition-all"
                title="Live Tutor"
              >
                <Mic size={16} />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setVisualizingModule(module);
                }}
                className="p-2 bg-white/20 backdrop-blur-md text-white rounded-lg hover:bg-indigo-400 transition-all"
                title="Visuals Studio"
              >
                <ImageIcon size={16} />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setQuizModule(module);
                }}
                className="p-2 bg-white/20 backdrop-blur-md text-white rounded-lg hover:bg-violet-500 transition-all"
                title="Take Quiz"
              >
                <FileQuestion size={16} />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setStudyingFlashcards(module);
                }}
                className="p-2 bg-white/20 backdrop-blur-md text-white rounded-lg hover:bg-emerald-500 transition-all"
                title="Study Flashcards"
              >
                <Brain size={16} />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setSummarizingModule(module);
                }}
                className="p-2 bg-white/20 backdrop-blur-md text-white rounded-lg hover:bg-amber-500 transition-all"
                title="Summarize Module"
              >
                <Sparkles size={16} />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingModule(module);
                }}
                className="p-2 bg-white/20 backdrop-blur-md text-white rounded-lg hover:bg-indigo-500 transition-all"
              >
                <Edit2 size={16} />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(module.id);
                }}
                className="p-2 bg-white/20 backdrop-blur-md text-white rounded-lg hover:bg-red-500 transition-all"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div className="h-32 bg-indigo-600 p-8 relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="text-xl font-bold text-white mb-1">{module.title}</h4>
                <p className="text-indigo-100 text-xs font-medium uppercase tracking-widest">{module.moduleType}</p>
              </div>
              <BookOpen className="absolute -bottom-4 -right-4 text-white/10" size={120} />
            </div>
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Target size={18} className="text-slate-400" />
                  <span className="text-sm font-bold text-slate-600">Mastery</span>
                </div>
                <span className="text-lg font-black text-indigo-600">{module.masteryScore || 0}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-6">
                <div 
                  className="h-full bg-indigo-600 rounded-full transition-all duration-1000" 
                  style={{ width: `${module.masteryScore || 0}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <BookOpen size={16} className="text-slate-400" />
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Units</span>
                </div>
                <span className="text-xs font-black text-slate-700">
                  {module.units?.filter((u: any) => u.completed).length || 0} / {module.units?.length || 0}
                </span>
              </div>

                <div className="relative flex-1">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveToolMenu(activeToolMenu === module.id ? null : module.id);
                    }}
                    className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 group/btn"
                  >
                    <Sparkles size={18} className="group-hover/btn:animate-pulse" />
                    <span className="text-sm">AI Tools</span>
                    <ChevronDown size={16} className={`transition-transform duration-300 ${activeToolMenu === module.id ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {activeToolMenu === module.id && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className="absolute bottom-full left-0 right-0 mb-3 bg-white rounded-3xl border border-slate-100 shadow-2xl z-30 overflow-hidden min-w-[200px]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="p-3 space-y-1">
                        <button 
                          onClick={() => {
                            setSummarizingModule(module);
                            setActiveToolMenu(null);
                          }}
                          className="w-full flex items-center gap-3 p-3 hover:bg-amber-50 text-slate-700 hover:text-amber-600 rounded-2xl transition-all text-sm font-bold"
                        >
                          <div className="w-8 h-8 bg-amber-100 rounded-xl flex items-center justify-center">
                            <Sparkles size={16} className="text-amber-500" />
                          </div>
                          {module.summary ? 'View Summary' : 'AI Summary'}
                        </button>
                        <button 
                          onClick={() => {
                            setStudyingFlashcards(module);
                            setActiveToolMenu(null);
                          }}
                          className="w-full flex items-center gap-3 p-3 hover:bg-emerald-50 text-slate-700 hover:text-emerald-600 rounded-2xl transition-all text-sm font-bold"
                        >
                          <div className="w-8 h-8 bg-emerald-100 rounded-xl flex items-center justify-center">
                            <Brain size={16} className="text-emerald-500" />
                          </div>
                          {module.flashcards?.length > 0 ? 'Study Flashcards' : 'AI Flashcards'}
                        </button>
                        <div className="h-px bg-slate-100 my-2 mx-2"></div>
                        <button 
                          onClick={() => {
                            setQuizModule(module);
                            setActiveToolMenu(null);
                          }}
                          className="w-full flex items-center gap-3 p-3 hover:bg-violet-50 text-slate-700 hover:text-violet-600 rounded-2xl transition-all text-sm font-bold"
                        >
                          <div className="w-8 h-8 bg-violet-100 rounded-xl flex items-center justify-center">
                            <FileQuestion size={16} className="text-violet-500" />
                          </div>
                          Take Quiz
                        </button>
                        <button 
                          onClick={() => {
                            setVisualizingModule(module);
                            setActiveToolMenu(null);
                          }}
                          className="w-full flex items-center gap-3 p-3 hover:bg-blue-50 text-slate-700 hover:text-blue-600 rounded-2xl transition-all text-sm font-bold"
                        >
                          <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center">
                            <ImageIcon size={16} className="text-blue-500" />
                          </div>
                          Visuals Studio
                        </button>
                        <button 
                          onClick={() => {
                            setLiveTutorModule(module);
                            setActiveToolMenu(null);
                          }}
                          className="w-full flex items-center gap-3 p-3 hover:bg-rose-50 text-slate-700 hover:text-rose-600 rounded-2xl transition-all text-sm font-bold"
                        >
                          <div className="w-8 h-8 bg-rose-100 rounded-xl flex items-center justify-center">
                            <Mic size={16} className="text-rose-500" />
                          </div>
                          Live Tutor
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              {module.videoTranscription && (
                <div className="mb-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Video Transcript</p>
                  <p className="text-xs text-slate-600 line-clamp-2 italic">"{module.videoTranscription}"</p>
                </div>
              )}
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">
                      {i}
                    </div>
                  ))}
                </div>
                <button className="p-3 bg-slate-50 text-slate-400 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
        <button 
          onClick={onAdd}
          className="bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200 p-8 flex flex-col items-center justify-center gap-4 hover:bg-slate-100 hover:border-slate-300 transition-all group min-h-[300px]"
        >
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-300 group-hover:text-indigo-600 transition-colors shadow-sm">
            <Plus size={32} />
          </div>
          <p className="font-bold text-slate-400 group-hover:text-slate-600">Add Module</p>
        </button>
      </div>

      {editingModule && (
        <EditModuleModal 
          module={editingModule} 
          onClose={() => setEditingModule(null)} 
          onUpdate={(updates: any) => {
            onUpdate(editingModule.id, updates);
            setEditingModule(null);
          }} 
        />
      )}

      {selectedModuleForChat && (
        <ModuleChatModal 
          module={selectedModuleForChat}
          profile={profile}
          onClose={() => setSelectedModuleForChat(null)}
          onUpdate={(updates: any) => onUpdate(selectedModuleForChat.id, updates)}
          onUpdateUnit={onUpdateUnit}
          onStudyFlashcards={setStudyingFlashcards}
        />
      )}

      {summarizingModule && (
        <ModuleSummaryModal 
          module={summarizingModule}
          onClose={() => setSummarizingModule(null)}
          onUpdate={(updates: any) => onUpdate(summarizingModule.id, updates)}
        />
      )}

      {studyingFlashcards && (
        <ModuleFlashcardsModal 
          module={studyingFlashcards}
          onClose={() => setStudyingFlashcards(null)}
          onUpdate={(updates: any) => onUpdate(studyingFlashcards.id, updates)}
        />
      )}

      {quizModule && (
        <ModuleQuizModal 
          module={quizModule}
          onClose={() => setQuizModule(null)}
          onUpdate={(updates: any) => onUpdate(quizModule.id, updates)}
        />
      )}

      {visualizingModule && (
        <ModuleVisualsModal 
          module={visualizingModule}
          onClose={() => setVisualizingModule(null)}
          onUpdate={(updates: any) => onUpdate(visualizingModule.id, updates)}
        />
      )}

      {liveTutorModule && (
        <ModuleLiveTutorModal 
          module={liveTutorModule}
          profile={profile}
          onClose={() => setLiveTutorModule(null)}
        />
      )}

      {planningModule && (
        <ModuleStudyPlanModal 
          module={planningModule}
          profile={profile}
          onClose={() => setPlanningModule(null)}
          onUpdate={(updates: any) => onUpdate(planningModule.id, updates)}
        />
      )}
    </div>
  );
}

function SmartStudyPlanModal({ modules, profile, onClose, onUpdateSchedule }: any) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [plan, setPlan] = useState<any>(null);

  const generatePlan = async () => {
    setIsGenerating(true);
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      const placeholders = ["MY_GEMINI_API_KEY", "YOUR_API_KEY", "YOUR_GEMINI_API_KEY", "ENTER_YOUR_KEY_HERE", "GEMINI_API_KEY"];
      if (!apiKey || placeholders.includes(apiKey)) {
        throw new Error("API Key is missing or invalid. Please ensure GEMINI_API_KEY is set in the Secrets panel (⚙️ gear icon -> Secrets).");
      }
      const ai = new GoogleGenAI({ apiKey });
      
      const context = modules.map((m: any) => ({
        title: m.title,
        type: m.moduleType,
        examDate: m.examDate,
        portfolioDate: m.portfolioDate,
        assessments: m.assessments || [],
        content: (m.videoTranscription || m.notes || "").substring(0, 500)
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate a comprehensive AI Smart Study Plan across ALL modules for the next 7 days.
        
        Modules Data: ${JSON.stringify(context)}
        User Preferences: ${profile?.studyPreferences || "Standard study approach"}
        
        The plan should be a balanced schedule that prioritizes upcoming deadlines and weak areas.
        Structure as a JSON array of objects, each representing a day:
        [
          {
            "day": 1,
            "date": "YYYY-MM-DD",
            "sessions": [
              {
                "module": "Module Title",
                "focus": "Specific Topic",
                "tasks": ["Task 1", "Task 2"],
                "duration": "60 mins",
                "startTime": "HH:MM",
                "aiReasoning": "Why this session is scheduled now"
              }
            ]
          }
        ]
        
        Return ONLY the JSON.`,
        config: {
          responseMimeType: "application/json",
        }
      });

      const generatedPlan = JSON.parse(response.text || '[]');
      setPlan(generatedPlan);
    } catch (error) {
      console.error("Error generating smart plan:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const addToTimetable = () => {
    if (!plan) return;
    const newEvents = plan.flatMap((day: any) => 
      day.sessions.map((session: any) => ({
        id: `smart-${Date.now()}-${Math.random()}`,
        title: `${session.module}: ${session.focus}`,
        start: new Date(`${day.date}T${session.startTime}:00`),
        end: new Date(new Date(`${day.date}T${session.startTime}:00`).getTime() + 60 * 60 * 1000), // Default 1hr
        type: 'study',
        completed: false
      }))
    );
    onUpdateSchedule(newEvents);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-[110] p-4 md:p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-[2.5rem] w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
      >
        <div className="p-8 border-b border-slate-100 bg-indigo-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <Sparkles size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-bold">AI Smart Plan Generator</h3>
              <p className="text-indigo-100 text-sm">Holistic study schedule across all modules</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-all">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 bg-slate-50">
          {!plan && !isGenerating ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
              <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
                <CalendarIcon size={48} />
              </div>
              <div className="max-w-md">
                <h4 className="text-xl font-bold text-slate-900 mb-2">Ready to Optimize Your Week?</h4>
                <p className="text-slate-500 text-sm">Our AI will analyze all your modules, deadlines, and progress to create the perfect 7-day study schedule.</p>
              </div>
              <button 
                onClick={generatePlan}
                className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center gap-3"
              >
                <Sparkles size={20} />
                Generate Smart Schedule
              </button>
            </div>
          ) : isGenerating ? (
            <div className="h-full flex flex-col items-center justify-center space-y-6 py-12">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-600" size={24} />
              </div>
              <div className="text-center">
                <h4 className="text-xl font-bold text-slate-900 mb-2">Generating Smart Plan...</h4>
                <p className="text-slate-500 animate-pulse">Balancing your workload across all modules</p>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {plan.map((day: any, idx: number) => (
                  <div key={idx} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-4">
                      <h5 className="font-bold text-slate-900">{format(new Date(day.date), 'EEEE')}</h5>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{format(new Date(day.date), 'MMM d')}</span>
                    </div>
                    <div className="space-y-4">
                      {day.sessions.map((session: any, sIdx: number) => (
                        <div key={sIdx} className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-bold text-indigo-600 uppercase">{session.startTime}</span>
                            <span className="text-[10px] font-bold text-slate-400">{session.duration}</span>
                          </div>
                          <p className="text-xs font-bold text-slate-800 mb-1">{session.module}</p>
                          <p className="text-[10px] text-slate-500 line-clamp-1 italic">"{session.focus}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-slate-100 bg-white flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-3 text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition-all"
          >
            Cancel
          </button>
          {plan && (
            <button 
              onClick={addToTimetable}
              className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center gap-2"
            >
              <Plus size={18} />
              Add to Timetable
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function TimetableView({ schedule, modules, onAdd, onEdit, onDelete, onSmartPlan }: any) {
  const [view, setView] = useState<'calendar' | 'list'>('calendar');
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-3xl font-black text-slate-900">Study Timetable</h3>
        <div className="flex items-center gap-4">
          <button 
            onClick={onSmartPlan}
            className="px-6 py-3 bg-amber-500 text-white rounded-2xl font-bold hover:bg-amber-600 transition-all flex items-center gap-2 shadow-lg shadow-amber-100"
          >
            <Sparkles size={20} />
            AI Smart Plan
          </button>
          <div className="bg-white p-1 rounded-2xl border border-slate-100 flex shadow-sm">
            <button 
              onClick={() => setView('calendar')}
              className={`p-3 rounded-xl transition-all ${view === 'calendar' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <CalendarIcon size={20} />
            </button>
            <button 
              onClick={() => setView('list')}
              className={`p-3 rounded-xl transition-all ${view === 'list' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <ListTodo size={20} />
            </button>
          </div>
          <button onClick={() => onAdd({})} className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-100">
            <Plus size={20} />
            Add Event
          </button>
        </div>
      </div>

      {view === 'calendar' ? (
        <CalendarView schedule={schedule} onUpdate={onEdit} />
      ) : (
        <div className="space-y-6">
          {/* List View Implementation */}
          <p className="text-slate-500">List view coming soon...</p>
        </div>
      )}
    </div>
  );
}

function CalendarView({ schedule, onUpdate }: any) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const days = eachDayOfInterval({
    start: startOfWeek(currentMonth),
    end: endOfWeek(addDays(startOfWeek(currentMonth), 35))
  });

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-8 border-b border-slate-50 flex items-center justify-between">
        <h4 className="text-xl font-bold text-slate-900">{format(currentMonth, 'MMMM yyyy')}</h4>
        <div className="flex gap-2">
          <button onClick={() => setCurrentMonth(subDays(currentMonth, 30))} className="p-2 hover:bg-slate-50 rounded-lg text-slate-400"><ChevronLeft size={20} /></button>
          <button onClick={() => setCurrentMonth(addDays(currentMonth, 30))} className="p-2 hover:bg-slate-50 rounded-lg text-slate-400"><ChevronRight size={20} /></button>
        </div>
      </div>
      <div className="grid grid-cols-7 bg-slate-50/50">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-4 text-center text-[10px] font-black uppercase tracking-widest text-slate-400 border-r border-slate-100 last:border-0">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {days.map((day, i) => {
          const dayEvents = schedule.filter((e: any) => isSameDay(safeDate(e.start), day));
          return (
            <div key={i} className={`min-h-[140px] p-4 border-r border-b border-slate-100 last:border-r-0 ${!isSameDay(day, currentMonth) ? 'bg-slate-50/30' : ''}`}>
              <p className={`text-sm font-bold mb-2 ${isSameDay(day, new Date()) ? 'text-indigo-600' : 'text-slate-400'}`}>{format(day, 'd')}</p>
              <div className="space-y-1">
                {dayEvents.map((event: any) => {
                  const isExam = event.type === 'EXAM' || event.type === 'exam';
                  const isExamPrep = event.type === 'EXAM_PREP' || event.type === 'exam_prep';
                  const isTask = event.type === 'TASK' || event.type === 'assignment';
                  const isLecture = event.type === 'LECTURE';
                  
                  let bgColor = 'bg-indigo-50';
                  let textColor = 'text-indigo-600';
                  let hoverColor = 'hover:bg-indigo-100';

                  if (event.completed) {
                    bgColor = 'bg-emerald-50';
                    textColor = 'text-emerald-600 opacity-50';
                    hoverColor = 'hover:bg-emerald-100';
                  } else if (isExam) {
                    bgColor = 'bg-rose-50';
                    textColor = 'text-rose-600';
                    hoverColor = 'hover:bg-rose-100';
                  } else if (isExamPrep) {
                    bgColor = 'bg-amber-50';
                    textColor = 'text-amber-600';
                    hoverColor = 'hover:bg-amber-100';
                  } else if (isTask) {
                    bgColor = 'bg-violet-50';
                    textColor = 'text-violet-600';
                    hoverColor = 'hover:bg-violet-100';
                  } else if (isLecture) {
                    bgColor = 'bg-sky-50';
                    textColor = 'text-sky-600';
                    hoverColor = 'hover:bg-sky-100';
                  }

                  return (
                    <div 
                      key={event.id} 
                      onClick={() => onUpdate(event.id, { completed: !event.completed })}
                      className={`text-[10px] p-1.5 rounded-lg font-bold truncate cursor-pointer transition-all ${bgColor} ${textColor} ${hoverColor}`}
                    >
                      {event.title}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


function CommunitiesView() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-3xl font-black text-slate-900">Communities</h3>
        <button className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-100">
          <Plus size={20} />
          Join Community
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { name: 'Mathematics FET', members: 1240, category: 'Academic' },
          { name: 'Physical Sciences FET', members: 850, category: 'Academic' },
          { name: 'Coding Club', members: 420, category: 'Interest' },
        ].map((c, i) => (
          <div key={i} className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:border-indigo-200 transition-all cursor-pointer group">
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 font-bold text-2xl mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all">
              {c.name[0]}
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-2">{c.name}</h4>
            <div className="flex items-center gap-4 text-sm text-slate-500 font-medium">
              <span className="flex items-center gap-1"><Users size={16} /> {c.members}</span>
              <span className="flex items-center gap-1"><Tag size={16} /> {c.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsView({ profile, onUpdate, logs, modules, onAddLog }: any) {
  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'study-logs' | 'account' | 'education'>('profile');
  const [educationInput, setEducationInput] = useState('');
  const [detecting, setDetecting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: profile?.firstName || '',
    lastName: profile?.lastName || '',
    username: profile?.username || '',
    email: profile?.email || '',
    institution: profile?.institution || '',
    yearGrade: profile?.yearGrade || '',
    bio: profile?.bio || '',
    photoURL: profile?.photoURL || '',
    studyGoal: profile?.studyGoal || '',
    cellPhone: profile?.cellPhone || '',
    dateOfBirth: profile?.dateOfBirth || '',
    address: profile?.address || '',
    studentLevel: profile?.studentLevel || 'University',
    educationPhase: profile?.educationPhase || null,
    notificationPreferences: profile?.notificationPreferences || {
      email: true,
      push: true,
      studyReminders: true
    }
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onUpdate(formData);
    } finally {
      setSaving(false);
    }
  };

  const detectEducationLevel = async () => {
    if (!educationInput.trim()) return;
    setDetecting(true);
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      const placeholders = ["MY_GEMINI_API_KEY", "YOUR_API_KEY", "YOUR_GEMINI_API_KEY", "ENTER_YOUR_KEY_HERE", "GEMINI_API_KEY"];
      if (!apiKey || placeholders.includes(apiKey)) {
        throw new Error("API Key is missing or invalid. Please ensure GEMINI_API_KEY is set in the Secrets panel (⚙️ gear icon -> Secrets).");
      }
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Act as an education system AI. Analyze the following user input and categorize their education level.
        
        Input: "${educationInput}"
        
        Rules:
        - Divide users into: Primary School, High School, University, College, Training.
        - For Primary/High School, identify phase: Foundation Phase (Grade R-3), Intermediate Phase (Grade 4-6), Senior Phase (Grade 7-9), FET Phase (Grade 10-12).
        - For University, identify year: first year, second year, third year, fourth year, postgraduate.
        - For College, identify program/type (TVET, technical, etc.).
        - For Training, identify type (short course, learnership, apprenticeship, skills program).
        
        Return ONLY a JSON object with these fields:
        {
          "studentLevel": "Primary School" | "High School" | "University" | "College" | "Training",
          "educationPhase": "Foundation Phase" | "Intermediate Phase" | "Senior Phase" | "FET Phase" | null,
          "yearGrade": "string describing the specific grade or year or program"
        }`,
        config: {
          responseMimeType: "application/json"
        }
      });

      const result = JSON.parse(response.text);
      setFormData(prev => ({
        ...prev,
        studentLevel: result.studentLevel,
        educationPhase: result.educationPhase,
        yearGrade: result.yearGrade
      }));
      
      // Auto-save the detected level
      await onUpdate({
        studentLevel: result.studentLevel,
        educationPhase: result.educationPhase,
        yearGrade: result.yearGrade
      });

      setEducationInput('');
      alert(`AI Detected: ${result.studentLevel}${result.educationPhase ? ` - ${result.educationPhase}` : ''} (${result.yearGrade})`);
    } catch (error) {
      console.error("Error detecting education level:", error);
      alert("Failed to detect education level. Please try again or enter manually.");
    } finally {
      setDetecting(false);
    }
  };

  return (
    <div className="max-w-5xl space-y-8">
      <div className="flex items-center gap-4 p-1 bg-slate-100 rounded-2xl w-fit">
        {[
          { id: 'profile', label: 'Profile Settings', icon: User },
          { id: 'education', label: 'Education Level', icon: GraduationCap },
          { id: 'study-logs', label: 'Study Logs', icon: Clock },
          { id: 'account', label: 'Account & Security', icon: Shield },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
              activeSubTab === tab.id 
                ? 'bg-white text-indigo-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {activeSubTab === 'profile' && (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-10 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Personal Profile</h3>
              <p className="text-slate-500">Manage your public profile and personal information.</p>
            </div>
            <div className="w-24 h-24 bg-indigo-100 rounded-[2rem] border-4 border-white shadow-lg overflow-hidden relative group">
              {formData.photoURL ? (
                <img src={formData.photoURL} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-indigo-600 font-bold text-3xl">
                  {formData.firstName?.[0]}
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                <Camera size={24} className="text-white" />
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="p-10 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">First Name</label>
                <input 
                  type="text" 
                  value={formData.firstName} 
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Last Name</label>
                <input 
                  type="text" 
                  value={formData.lastName} 
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Username</label>
                <input 
                  type="text" 
                  value={formData.username} 
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Email Address</label>
                <input 
                  type="email" 
                  value={formData.email} 
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Institution</label>
                <input 
                  type="text" 
                  value={formData.institution} 
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Year/Grade</label>
                <input 
                  type="text" 
                  value={formData.yearGrade} 
                  onChange={(e) => setFormData({ ...formData, yearGrade: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Phone Number</label>
                <input 
                  type="tel" 
                  value={formData.cellPhone} 
                  onChange={(e) => setFormData({ ...formData, cellPhone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Date of Birth</label>
                <input 
                  type="date" 
                  value={formData.dateOfBirth} 
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Bio</label>
              <textarea 
                value={formData.bio} 
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Tell us about yourself..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none h-32 resize-none" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Study Goal</label>
              <input 
                type="text" 
                value={formData.studyGoal} 
                onChange={(e) => setFormData({ ...formData, studyGoal: e.target.value })}
                placeholder="e.g. Achieve 80% average in Mathematics"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
              />
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900">Notification Preferences</h4>
              <div className="space-y-3">
                {[
                  { id: 'email', label: 'Email Notifications', desc: 'Receive study reminders and updates via email.' },
                  { id: 'push', label: 'Push Notifications', desc: 'Get real-time alerts on your device.' },
                  { id: 'studyReminders', label: 'Study Reminders', desc: 'Automated reminders for your scheduled sessions.' },
                ].map((pref) => (
                  <label key={pref.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 cursor-pointer hover:bg-slate-100 transition-all">
                    <div>
                      <p className="text-sm font-bold text-slate-900">{pref.label}</p>
                      <p className="text-xs text-slate-500">{pref.desc}</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={(formData.notificationPreferences as any)[pref.id]}
                      onChange={(e) => setFormData({
                        ...formData,
                        notificationPreferences: {
                          ...formData.notificationPreferences,
                          [pref.id]: e.target.checked
                        }
                      })}
                      className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-slate-50 flex justify-end gap-4">
              <button 
                type="button"
                className="px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={saving}
                className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 disabled:opacity-50 shadow-lg shadow-indigo-100"
              >
                {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                {saving ? 'Saving Changes...' : 'Save Profile'}
              </button>
            </div>
          </form>
        </div>
      )}

      {activeSubTab === 'education' && (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-10 border-b border-slate-50 bg-slate-50/50">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Education System AI</h3>
            <p className="text-slate-500">Let our AI automatically categorize your education level and adapt your learning experience.</p>
          </div>
          
          <div className="p-10 space-y-8">
            <div className="bg-indigo-50 rounded-3xl p-8 border border-indigo-100">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-2xl shadow-sm text-indigo-600">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Current Status</h4>
                  <div className="flex flex-wrap gap-3">
                    <div className="px-4 py-2 bg-white rounded-xl border border-indigo-100 text-sm font-bold text-indigo-600">
                      {profile?.studentLevel || 'Not Set'}
                    </div>
                    {profile?.educationPhase && (
                      <div className="px-4 py-2 bg-white rounded-xl border border-indigo-100 text-sm font-bold text-indigo-600">
                        {profile.educationPhase}
                      </div>
                    )}
                    {profile?.yearGrade && (
                      <div className="px-4 py-2 bg-white rounded-xl border border-indigo-100 text-sm font-bold text-indigo-600">
                        {profile.yearGrade}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Describe your current education status</label>
              <textarea 
                value={educationInput}
                onChange={(e) => setEducationInput(e.target.value)}
                placeholder="e.g. I am in Grade 10, or I am a second year university student studying Computer Science, or I am doing a TVET college program in Engineering..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none h-32 resize-none" 
              />
              <p className="text-xs text-slate-400 italic">
                The AI will detect your level (Primary, High School, University, College, Training) and specific phase or year.
              </p>
            </div>

            <button 
              onClick={detectEducationLevel}
              disabled={detecting || !educationInput.trim()}
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {detecting ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Analyzing Level...
                </>
              ) : (
                <>
                  <GraduationCap size={20} />
                  Detect Level with AI
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {activeSubTab === 'study-logs' && (
        <div className="space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Study Logs</h3>
                <p className="text-slate-500">Review your past study sessions and track your consistency.</p>
              </div>
              <button onClick={onAddLog} className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-100">
                <Plus size={20} />
                Log Session
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Date</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Module</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Duration</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Notes</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400"></th>
                  </tr>
                </thead>
                <tbody>
                  {logs.length > 0 ? (
                    logs.map((log: any) => (
                      <tr key={log.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                        <td className="px-8 py-6 text-sm font-bold text-slate-900">{format(safeDate(log.startTime), 'PPP')}</td>
                        <td className="px-8 py-6">
                          <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-widest rounded-full">
                            {modules.find((m: any) => m.id === log.moduleId)?.title || 'Unknown'}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-sm font-medium text-slate-600">{log.duration} mins</td>
                        <td className="px-8 py-6 text-sm text-slate-500 max-w-xs truncate">{log.notes || '-'}</td>
                        <td className="px-8 py-6 text-right">
                          <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors"><MoreVertical size={18} /></button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-8 py-12 text-center text-slate-400 italic">No study logs found. Start a session to see it here!</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'account' && (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-10 space-y-10">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Account & Security</h3>
            <p className="text-slate-500">Manage your account security and privacy settings.</p>
          </div>
          
          <div className="space-y-6">
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-xl shadow-sm">
                  <Lock size={24} className="text-slate-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Password</p>
                  <p className="text-xs text-slate-500">Last changed 3 months ago</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all">Change Password</button>
            </div>

            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-xl shadow-sm">
                  <Shield size={24} className="text-slate-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Two-Factor Authentication</p>
                  <p className="text-xs text-slate-500">Add an extra layer of security to your account</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all">Enable 2FA</button>
            </div>

            <div className="pt-10 border-t border-slate-100">
              <h4 className="text-rose-600 font-bold mb-4">Danger Zone</h4>
              <div className="p-6 bg-rose-50 rounded-3xl border border-rose-100 flex items-center justify-between">
                <div>
                  <p className="font-bold text-rose-900">Delete Account</p>
                  <p className="text-xs text-rose-600">Permanently delete your account and all your data. This action cannot be undone.</p>
                </div>
                <button className="px-6 py-3 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 transition-all">Delete Account</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SignUpView({ user, onSignUp }: any) {
  const [formData, setFormData] = useState({
    firstName: user.displayName?.split(' ')[0] || '',
    lastName: user.displayName?.split(' ').slice(1).join(' ') || '',
    institution: '',
    yearGrade: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSignUp(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-[2.5rem] p-10 max-w-xl w-full shadow-xl border border-slate-100"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <UserPlusIcon size={32} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Complete Your Profile</h2>
          <p className="text-slate-500">Tell us a bit about yourself to get started with Pfunzo AI.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400">First Name</label>
              <input 
                required
                type="text" 
                value={formData.firstName} 
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Last Name</label>
              <input 
                required
                type="text" 
                value={formData.lastName} 
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Institution</label>
            <input 
              required
              type="text" 
              placeholder="e.g. University of Cape Town"
              value={formData.institution} 
              onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Year / Grade</label>
            <input 
              required
              type="text" 
              placeholder="e.g. Grade 12 or 2nd Year"
              value={formData.yearGrade} 
              onChange={(e) => setFormData({ ...formData, yearGrade: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={24} /> : <CheckCircle2 size={24} />}
            {loading ? 'Creating Profile...' : 'Complete Sign Up'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

function AddModuleModal({ onClose, onAdd }: any) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<ModuleType>(ModuleType.Exam);
  const [videoTranscription, setVideoTranscription] = useState('');
  const [examDate, setExamDate] = useState('');
  const [portfolioDate, setPortfolioDate] = useState('');
  const [yearMarkWeight, setYearMarkWeight] = useState(50);
  const [examWeight, setExamWeight] = useState(50);
  const [passMark, setPassMark] = useState(50);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ 
      title, 
      moduleType: type, 
      videoTranscription,
      examDate: examDate || undefined,
      portfolioDate: portfolioDate || undefined,
      yearMarkWeight,
      examWeight,
      passMark,
      assessments: []
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-[100] p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl overflow-y-auto max-h-[90vh]"
      >
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-slate-900">Add New Module</h3>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600"><X size={24} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Module Title</label>
            <input 
              required
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Advanced Mathematics"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Module Type</label>
            <select 
              value={type}
              onChange={(e) => setType(e.target.value as ModuleType)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              {Object.values(ModuleType).map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Year Mark Weight (%)</label>
              <input 
                type="number" 
                value={yearMarkWeight}
                onChange={(e) => setYearMarkWeight(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400">{type === ModuleType.Exam ? 'Exam' : 'Portfolio'} Weight (%)</label>
              <input 
                type="number" 
                value={examWeight}
                onChange={(e) => setExamWeight(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Pass Mark (%)</label>
            <input 
              type="number" 
              value={passMark}
              onChange={(e) => setPassMark(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            {type === ModuleType.Exam && (
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Exam Date</label>
                <input 
                  type="date" 
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
                />
              </div>
            )}
            {type === ModuleType.Portfolio && (
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Portfolio Due Date</label>
                <input 
                  type="date" 
                  value={portfolioDate}
                  onChange={(e) => setPortfolioDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Video Transcription (Optional)</label>
            <textarea 
              value={videoTranscription}
              onChange={(e) => setVideoTranscription(e.target.value)}
              placeholder="Paste the video transcript here..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none min-h-[100px]" 
            />
          </div>
          <button type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
            Create Module
          </button>
        </form>
      </motion.div>
    </div>
  );
}

function EditModuleModal({ module, onClose, onUpdate }: any) {
  const [title, setTitle] = useState(module.title || '');
  const [type, setType] = useState<ModuleType>(module.moduleType || ModuleType.Exam);
  const [videoTranscription, setVideoTranscription] = useState(module.videoTranscription || '');
  const [examDate, setExamDate] = useState(module.examDate || '');
  const [portfolioDate, setPortfolioDate] = useState(module.portfolioDate || '');
  const [yearMarkWeight, setYearMarkWeight] = useState(module.yearMarkWeight || 50);
  const [examWeight, setExamWeight] = useState(module.examWeight || 50);
  const [passMark, setPassMark] = useState(module.passMark || 50);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ 
      title, 
      moduleType: type, 
      videoTranscription,
      examDate: examDate || undefined,
      portfolioDate: portfolioDate || undefined,
      yearMarkWeight,
      examWeight,
      passMark
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-[100] p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-slate-900">Edit Module</h3>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600"><X size={24} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Module Title</label>
            <input 
              required
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Advanced Mathematics"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Module Type</label>
            <select 
              value={type}
              onChange={(e) => setType(e.target.value as ModuleType)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              {Object.values(ModuleType).map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Year Mark Weight (%)</label>
              <input 
                type="number" 
                value={yearMarkWeight}
                onChange={(e) => setYearMarkWeight(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400">{type === ModuleType.Exam ? 'Exam' : 'Portfolio'} Weight (%)</label>
              <input 
                type="number" 
                value={examWeight}
                onChange={(e) => setExamWeight(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Pass Mark (%)</label>
            <input 
              type="number" 
              value={passMark}
              onChange={(e) => setPassMark(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            {type === ModuleType.Exam && (
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Exam Date</label>
                <input 
                  type="date" 
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
                />
              </div>
            )}
            {type === ModuleType.Portfolio && (
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Portfolio Due Date</label>
                <input 
                  type="date" 
                  value={portfolioDate}
                  onChange={(e) => setPortfolioDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Video Transcription (Optional)</label>
            <textarea 
              value={videoTranscription}
              onChange={(e) => setVideoTranscription(e.target.value)}
              placeholder="Paste the video transcript here..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none min-h-[150px]" 
            />
          </div>
          <button type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
            Save Changes
          </button>
        </form>
      </motion.div>
    </div>
  );
}

function AddScheduleModal({ onClose, onAdd, modules }: any) {
  const [title, setTitle] = useState('');
  const [moduleId, setModuleId] = useState('');
  const [type, setType] = useState('STUDY_SESSION');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const start = parseISO(`${date}T${startTime}`);
    const end = parseISO(`${date}T${endTime}`);
    onAdd({ title, moduleId, type, start, end, completed: false });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-[100] p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl"
      >
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-slate-900">Schedule Event</h3>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600"><X size={24} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Event Title</label>
            <input 
              required
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Calculus Review"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Module (Optional)</label>
            <select 
              value={moduleId}
              onChange={(e) => setModuleId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="">No Module</option>
              {modules.map((m: any) => (
                <option key={m.id} value={m.id}>{m.title}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Date</label>
              <input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Type</label>
              <select 
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="STUDY_SESSION">Study Session</option>
                <option value="EXAM">Exam</option>
                <option value="EXAM_PREP">Exam Prep</option>
                <option value="TASK">Task</option>
                <option value="LECTURE">Lecture</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Start Time</label>
              <input 
                type="time" 
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400">End Time</label>
              <input 
                type="time" 
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
              />
            </div>
          </div>
          <button type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
            Add to Timetable
          </button>
        </form>
      </motion.div>
    </div>
  );
}

function LogStudyModal({ onClose, onAdd, modules }: any) {
  const [moduleId, setModuleId] = useState('');
  const [duration, setDuration] = useState(60);
  const [notes, setNotes] = useState('');
  const [startTime, setStartTime] = useState(format(new Date(), "yyyy-MM-dd'T'HH:mm"));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const start = new Date(startTime);
    const end = addMinutes(start, duration);
    onAdd({ moduleId, duration, notes, startTime: start, endTime: end });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-[100] p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl"
      >
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-slate-900">Log Study Session</h3>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600"><X size={24} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Module</label>
            <select 
              required
              value={moduleId}
              onChange={(e) => setModuleId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="">Select a Module</option>
              {modules.map((m: any) => (
                <option key={m.id} value={m.id}>{m.title}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Start Time</label>
            <input 
              required
              type="datetime-local" 
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Duration (minutes)</label>
            <input 
              required
              type="number" 
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Notes</label>
            <textarea 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What did you cover?"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none min-h-[100px]" 
            />
          </div>
          <button type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
            Save Log
          </button>
        </form>
      </motion.div>
    </div>
  );
}

// End of file
