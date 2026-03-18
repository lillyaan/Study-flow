import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  Calculator, 
  FileText, 
  ExternalLink, 
  Search, 
  ChevronRight, 
  Info, 
  CheckCircle2, 
  AlertCircle,
  Plus,
  Trash2,
  TrendingUp,
  Globe,
  MapPin,
  BookOpen,
  RefreshCw
} from 'lucide-react';
import { University, APSSubject, UserProfile, Module } from '../types';
import { SAMPLE_UNIVERSITIES } from '../data/universities';

const APS_SCALE = [
  { range: [80, 100], points: 7 },
  { range: [70, 79], points: 6 },
  { range: [60, 69], points: 5 },
  { range: [50, 59], points: 4 },
  { range: [40, 49], points: 3 },
  { range: [30, 39], points: 2 },
  { range: [0, 29], points: 1 }
];

const getAPSPoints = (mark: number) => {
  const scale = APS_SCALE.find(s => mark >= s.range[0] && mark <= s.range[1]);
  return scale ? scale.points : 0;
};

const UniversityPortal: React.FC<{ profile?: UserProfile | null, modules?: Module[], onUpdateProfile?: (p: Partial<UserProfile>) => void }> = ({ profile, modules, onUpdateProfile }) => {
  const [activeTab, setActiveTab] = useState<'aps' | 'prospectus'>('aps');
  const [searchQuery, setSearchQuery] = useState('');
  
  // APS Calculator State
  const [subjects, setSubjects] = useState<APSSubject[]>(() => {
    if (profile?.apsSubjects && profile.apsSubjects.length > 0) {
      return profile.apsSubjects;
    }
    
    // If high school user and has modules, initialize from modules
    if (profile?.studentLevel === 'High School' && modules && modules.length > 0) {
      const initialSubjects: APSSubject[] = modules.map(m => ({
        name: m.title,
        mark: m.examMark || 0,
        grade11Mark: m.examMark || 0,
        grade12Mark: m.examMark || 0,
        isLanguage: m.isLanguage,
        isMaths: m.title.toLowerCase().includes('math'),
        isLO: m.title.toLowerCase().includes('life orientation')
      }));
      
      // Ensure we have at least 7 subjects
      while (initialSubjects.length < 7) {
        initialSubjects.push({ name: `Subject ${initialSubjects.length + 1}`, mark: 0, grade11Mark: 0, grade12Mark: 0 });
      }
      return initialSubjects;
    }

    return [
      { name: 'English Home Language', mark: 0, grade11Mark: 0, grade12Mark: 0, isLanguage: true },
      { name: 'First Additional Language', mark: 0, grade11Mark: 0, grade12Mark: 0, isLanguage: true },
      { name: 'Mathematics', mark: 0, grade11Mark: 0, grade12Mark: 0, isMaths: true },
      { name: 'Life Orientation', mark: 0, grade11Mark: 0, grade12Mark: 0, isLO: true },
      { name: 'Subject 5', mark: 0, grade11Mark: 0, grade12Mark: 0 },
      { name: 'Subject 6', mark: 0, grade11Mark: 0, grade12Mark: 0 },
      { name: 'Subject 7', mark: 0, grade11Mark: 0, grade12Mark: 0 },
    ];
  });

  const saveSubjects = (newSubjects: APSSubject[]) => {
    setSubjects(newSubjects);
    if (onUpdateProfile) {
      onUpdateProfile({ apsSubjects: newSubjects });
    }
  };

  const [showGrade12, setShowGrade12] = useState(() => {
    const hasGrade12Marks = profile?.apsSubjects?.some(s => s.grade12Mark && s.grade12Mark > 0);
    if (hasGrade12Marks) return true;
    if (profile?.yearGrade?.includes('11') || profile?.yearGrade?.includes('12')) return false;
    return true;
  });

  const apsGrade11 = useMemo(() => {
    return subjects.reduce((total, sub) => {
      if (sub.isLO) return total;
      return total + getAPSPoints(sub.grade11Mark || 0);
    }, 0);
  }, [subjects]);

  const apsGrade12 = useMemo(() => {
    return subjects.reduce((total, sub) => {
      if (sub.isLO) return total;
      return total + getAPSPoints(sub.grade12Mark || 0);
    }, 0);
  }, [subjects]);

  const uctScoreGrade11 = useMemo(() => {
    // UCT score is sum of percentages of top 6 subjects (excluding LO)
    const validSubjects = subjects.filter(s => !s.isLO).map(s => s.grade11Mark || 0);
    validSubjects.sort((a, b) => b - a);
    return validSubjects.slice(0, 6).reduce((total, mark) => total + mark, 0);
  }, [subjects]);

  const uctScoreGrade12 = useMemo(() => {
    const validSubjects = subjects.filter(s => !s.isLO).map(s => s.grade12Mark || 0);
    validSubjects.sort((a, b) => b - a);
    return validSubjects.slice(0, 6).reduce((total, mark) => total + mark, 0);
  }, [subjects]);

  const bestAPS = showGrade12 ? Math.max(apsGrade11, apsGrade12) : apsGrade11;
  const bestGrade = showGrade12 && apsGrade12 > apsGrade11 ? 'Grade 12' : 'Grade 11';
  const bestUCTScore = showGrade12 && apsGrade12 > apsGrade11 ? uctScoreGrade12 : uctScoreGrade11;

  const loPoints = useMemo(() => {
    const lo = subjects.find(s => s.isLO);
    if (!lo) return 0;
    return getAPSPoints(bestGrade === 'Grade 12' ? (lo.grade12Mark || 0) : (lo.grade11Mark || 0));
  }, [subjects, bestGrade]);

  const filteredUniversities = useMemo(() => {
    return SAMPLE_UNIVERSITIES.filter(u => 
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const qualifiedCourses = useMemo(() => {
    const courses: { uniName: string, course: string, minAps: number, scoringSystem: string }[] = [];
    SAMPLE_UNIVERSITIES.forEach(uni => {
      uni.apsRequirements?.forEach(req => {
        if (uni.scoringSystem === 'uct') {
          if (bestUCTScore >= req.minAps) {
            courses.push({ uniName: uni.name, course: req.course, minAps: req.minAps, scoringSystem: 'uct' });
          }
        } else {
          if (bestAPS >= req.minAps) {
            courses.push({ uniName: uni.name, course: req.course, minAps: req.minAps, scoringSystem: 'standard' });
          }
        }
      });
    });
    return courses.sort((a, b) => {
      if (a.scoringSystem === 'uct' && b.scoringSystem !== 'uct') return 1;
      if (a.scoringSystem !== 'uct' && b.scoringSystem === 'uct') return -1;
      return b.minAps - a.minAps;
    }).slice(0, 200);
  }, [bestAPS, bestUCTScore]);

  const handleMarkChange = (index: number, mark: number, type: 'mark' | 'grade11Mark' | 'grade12Mark' = 'mark') => {
    const newSubjects = [...subjects];
    const safeMark = isNaN(mark) ? 0 : Math.min(100, Math.max(0, mark));
    newSubjects[index][type] = safeMark;
    if (type === 'grade12Mark' || type === 'grade11Mark') {
      // Keep legacy mark in sync with best grade or just grade11 if grade12 not shown
      newSubjects[index].mark = type === 'grade12Mark' ? safeMark : (newSubjects[index].grade12Mark || safeMark);
    }
    saveSubjects(newSubjects);
  };

  const handleSubjectNameChange = (index: number, name: string) => {
    const newSubjects = [...subjects];
    newSubjects[index].name = name;
    saveSubjects(newSubjects);
  };

  const addSubject = () => {
    if (subjects.length < 10) {
      saveSubjects([...subjects, { name: `Subject ${subjects.length + 1}`, mark: 0, grade11Mark: 0, grade12Mark: 0 }]);
    }
  };

  const removeSubject = (index: number) => {
    const subject = subjects[index];
    if (!subject.isLanguage && !subject.isMaths && !subject.isLO) {
      const newSubjects = subjects.filter((_, i) => i !== index);
      saveSubjects(newSubjects);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-800">University Portal</h2>
          <p className="text-slate-500">Plan your academic future and track your university requirements.</p>
        </div>
        
        <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
          <button 
            onClick={() => setActiveTab('aps')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'aps' 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <Calculator size={18} />
            APS Calculator
          </button>
          <button 
            onClick={() => setActiveTab('prospectus')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'prospectus' 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <FileText size={18} />
            Prospectus
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'aps' ? (
          <motion.div 
            key="aps"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <Calculator className="text-indigo-600" />
                    Calculate Your APS
                  </h3>
                  <div className="flex items-center gap-2">
                    {profile?.studentLevel === 'High School' && modules && modules.length > 0 && (
                      <button 
                        onClick={() => {
                          const initialSubjects: APSSubject[] = modules.map(m => ({
                            name: m.title,
                            mark: m.examMark || 0,
                            grade11Mark: m.examMark || 0,
                            grade12Mark: m.examMark || 0,
                            isLanguage: m.isLanguage,
                            isMaths: m.title.toLowerCase().includes('math'),
                            isLO: m.title.toLowerCase().includes('life orientation')
                          }));
                          while (initialSubjects.length < 7) {
                            initialSubjects.push({ name: `Subject ${initialSubjects.length + 1}`, mark: 0, grade11Mark: 0, grade12Mark: 0 });
                          }
                          saveSubjects(initialSubjects);
                        }}
                        className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 transition-all text-sm font-bold flex items-center gap-2"
                        title="Sync from Subjects"
                      >
                        <RefreshCw size={16} />
                        Sync from Subjects
                      </button>
                    )}
                    <button 
                      onClick={() => setShowGrade12(!showGrade12)}
                      className={`px-4 py-2 rounded-xl transition-all text-sm font-bold flex items-center gap-2 ${showGrade12 ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                      title="Toggle Grade 12 Marks"
                    >
                      {showGrade12 ? 'Hide Grade 12' : 'Add Grade 12 Marks'}
                    </button>
                    <button 
                      onClick={addSubject}
                      className="p-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-all"
                      title="Add Subject"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {subjects.map((sub, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 group">
                      <div className="flex-1">
                        <input 
                          type="text" 
                          value={sub.name}
                          onChange={(e) => handleSubjectNameChange(idx, e.target.value)}
                          className="w-full bg-transparent border-none focus:ring-0 font-bold text-slate-700 p-0"
                          placeholder="Subject Name"
                          disabled={sub.isLanguage || sub.isMaths || sub.isLO}
                        />
                        <div className="flex gap-2 mt-1">
                          {sub.isLanguage && <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">Language</span>}
                          {sub.isMaths && <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Mathematics</span>}
                          {sub.isLO && <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Life Orientation</span>}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 sm:gap-4">
                        <div className="flex flex-col items-center">
                          <span className="text-[10px] font-bold text-slate-400 uppercase mb-1">Gr 11</span>
                          <div className="relative w-20">
                            <input 
                              type="number" 
                              value={sub.grade11Mark === undefined ? '' : sub.grade11Mark}
                              onChange={(e) => handleMarkChange(idx, e.target.value === '' ? 0 : parseInt(e.target.value), 'grade11Mark')}
                              className="w-full bg-white border-slate-200 rounded-xl px-2 py-2 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 text-center"
                              placeholder="%"
                            />
                          </div>
                        </div>
                        {showGrade12 && (
                          <div className="flex flex-col items-center">
                            <span className="text-[10px] font-bold text-slate-400 uppercase mb-1">Gr 12</span>
                            <div className="relative w-20">
                              <input 
                                type="number" 
                                value={sub.grade12Mark === undefined ? '' : sub.grade12Mark}
                                onChange={(e) => handleMarkChange(idx, e.target.value === '' ? 0 : parseInt(e.target.value), 'grade12Mark')}
                                className="w-full bg-white border-slate-200 rounded-xl px-2 py-2 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 text-center"
                                placeholder="%"
                              />
                            </div>
                          </div>
                        )}
                        
                        <div className="flex flex-col items-center">
                          <span className="text-[10px] font-bold text-slate-400 uppercase mb-1">APS</span>
                          <div className="w-12 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                            <span className="text-sm font-bold text-indigo-600">
                              {getAPSPoints(showGrade12 ? Math.max(sub.grade11Mark || 0, sub.grade12Mark || 0) : (sub.grade11Mark || 0))}
                            </span>
                          </div>
                        </div>

                        {!sub.isLanguage && !sub.isMaths && !sub.isLO && (
                          <button 
                            onClick={() => removeSubject(idx)}
                            className="p-2 text-slate-300 hover:text-red-500 transition-colors mt-4"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="space-y-2">
                    <h4 className="text-indigo-100 font-bold uppercase tracking-widest text-xs">Your Current Score</h4>
                    <div className="flex items-baseline gap-2">
                      <span className="text-6xl font-black">{bestAPS}</span>
                      <span className="text-xl font-bold text-indigo-200">APS Points</span>
                    </div>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-2xl font-bold text-indigo-100">{bestUCTScore}</span>
                      <span className="text-sm font-medium text-indigo-200">UCT Points</span>
                    </div>
                    <p className="text-indigo-100/80 text-sm mt-2">Based on {bestGrade} (Excluding LO: +{loPoints} Pts)</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
                    <div className="flex items-center gap-3 mb-4">
                      <TrendingUp size={20} />
                      <span className="font-bold">Targeting Universities?</span>
                    </div>
                    <p className="text-xs text-indigo-50 leading-relaxed mb-4">
                      Most top universities require an APS of 30+ for competitive degrees. Keep pushing!
                    </p>
                    <button 
                      onClick={() => setActiveTab('prospectus')}
                      className="w-full py-3 bg-white text-indigo-600 rounded-xl text-xs font-bold hover:bg-indigo-50 transition-all"
                    >
                      Check Requirements
                    </button>
                  </div>
                </div>
              </div>

              {bestAPS > 0 && (
                <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <CheckCircle2 className="text-emerald-500" />
                    Courses You Qualify For
                  </h3>
                  {qualifiedCourses.length > 0 ? (
                    <div className="space-y-4">
                      {qualifiedCourses.map((course, idx) => (
                        <div key={idx} className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <h4 className="font-bold text-slate-800">{course.course}</h4>
                            <p className="text-xs text-slate-500 mt-1">{course.uniName}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">
                              {course.scoringSystem === 'uct' ? `Min UCT Score: ${course.minAps}` : `Min APS: ${course.minAps}`}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-slate-500 text-sm">You don't meet the minimum APS for the sample courses yet. Keep working hard to improve your marks!</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <Info className="text-indigo-600" />
                  How APS Works
                </h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <p className="text-xs text-slate-600 leading-relaxed">
                      APS stands for <span className="font-bold text-slate-800">Admission Point Score</span>. It's used by South African universities to determine if you qualify for a specific degree.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Points Scale</p>
                    <div className="grid grid-cols-2 gap-2">
                      {APS_SCALE.map((s, i) => (
                        <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 text-[10px] font-bold">
                          <span className="text-slate-500">{s.range[0]}-{s.range[1]}%</span>
                          <span className="text-indigo-600">{s.points} Pts</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100">
                    <div className="flex items-center gap-2 mb-2 text-amber-700">
                      <AlertCircle size={16} />
                      <span className="text-xs font-bold uppercase tracking-widest">Note</span>
                    </div>
                    <p className="text-[10px] text-amber-600 leading-relaxed">
                      Most universities exclude Life Orientation from the total APS calculation. Some may count it as half points.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <GraduationCap className="text-indigo-600" />
                  Grade 10-12 Path
                </h3>
                <div className="space-y-4">
                  {[
                    { grade: 'Grade 10', task: 'Subject Selection', desc: 'Choose subjects that align with your career goals.' },
                    { grade: 'Grade 11', task: 'Early Application', desc: 'Universities often use Grade 11 marks for early offers.' },
                    { grade: 'Grade 12', task: 'Final Push', desc: 'Your final NSC results determine your final placement.' }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 font-bold text-xs">
                        {i + 1}
                      </div>
                      <div>
                        <h5 className="text-sm font-bold text-slate-800">{item.grade}: {item.task}</h5>
                        <p className="text-[10px] text-slate-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="prospectus"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Search universities or locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-4 py-4 text-sm font-bold focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-2xl text-xs font-bold">
                <Globe size={16} />
                {filteredUniversities.length} Institutions Found
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUniversities.map((uni) => (
                <motion.div 
                  key={uni.id}
                  layout
                  className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 transition-all group"
                >
                  <div className="p-8 space-y-6">
                    <div className="flex items-start justify-between">
                      <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 p-2 flex items-center justify-center">
                        <img src={uni.logoUrl} alt={uni.name} className="w-full h-full object-contain rounded-lg" />
                      </div>
                      <a 
                        href={uni.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                      >
                        <ExternalLink size={20} />
                      </a>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{uni.name}</h4>
                      <div className="flex items-center gap-1.5 text-slate-400 mt-1">
                        <MapPin size={14} />
                        <span className="text-xs font-medium">{uni.location}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                      {uni.description}
                    </p>

                    <div className="space-y-3">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Top Courses & Requirements</p>
                      <div className="space-y-2">
                        {uni.apsRequirements?.slice(0, 2).map((req, i) => (
                          <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                            <span className="text-[10px] font-bold text-slate-700">{req.course}</span>
                            <span className="text-[10px] font-bold text-indigo-600">
                              {uni.scoringSystem === 'uct' ? `UCT ${req.minAps}+` : `APS ${req.minAps}+`}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                      <a 
                        href={uni.prospectusUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-2xl text-xs font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                      >
                        <FileText size={16} />
                        Prospectus
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredUniversities.length === 0 && (
              <div className="text-center py-20 bg-white rounded-[2.5rem] border border-slate-100">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search size={40} className="text-slate-200" />
                </div>
                <h4 className="text-xl font-bold text-slate-800 mb-2">No Universities Found</h4>
                <p className="text-slate-400">Try adjusting your search query to find what you're looking for.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default UniversityPortal;
