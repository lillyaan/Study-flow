import React, { useMemo, useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, AreaChart, Area 
} from 'recharts';
import { format, getHours, getDay, differenceInMinutes, startOfDay, endOfDay, subDays, isWithinInterval } from 'date-fns';
import { Module, ScheduleItem, StudyLog, StudyUnit } from '../types';
import { BarChart3, PieChart as PieChartIcon, Activity, Plus, Clock, BookOpen, CheckCircle2, TrendingUp, Calendar, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface StudyHabitsDashboardProps {
  modules: Module[];
  schedule: ScheduleItem[];
  studyLogs: StudyLog[];
  onLogStudy: (log: Omit<StudyLog, 'id' | 'timestamp'>) => Promise<void>;
  onDeleteLog: (id: string) => Promise<void>;
  onUpdateUnit: (moduleId: string, unitId: string, completed: boolean) => Promise<void>;
}

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4'];

const StudyHabitsDashboard: React.FC<StudyHabitsDashboardProps> = ({ modules, schedule, studyLogs, onLogStudy, onDeleteLog, onUpdateUnit }) => {
  const [isLogging, setIsLogging] = useState(false);
  const [showAllLogs, setShowAllLogs] = useState(false);
  const [logForm, setLogForm] = useState({
    moduleId: '',
    unitId: '',
    duration: 30,
    notes: ''
  });

  const { moduleData, hourlyData, dailyData, unitProgressData } = useMemo(() => {
    // Combine schedule (actual sessions) and studyLogs
    const allSessions = [
      ...schedule.filter(s => s.completed).map(s => ({
        moduleId: s.moduleId,
        duration: differenceInMinutes(new Date(s.end), new Date(s.start)),
        start: new Date(s.start)
      })),
      ...studyLogs.map(l => ({
        moduleId: l.moduleId,
        duration: l.duration,
        start: new Date(l.startTime)
      }))
    ];

    // 1. Distribution by Module
    const moduleDistribution: Record<string, number> = {};
    // 2. Distribution by Time of Day (Hourly)
    const hourlyDistribution: number[] = new Array(24).fill(0);
    // 3. Distribution by Day of Week
    const dailyDistribution: number[] = new Array(7).fill(0);

    allSessions.forEach(item => {
      if (item.duration <= 0) return;

      // Module
      if (item.moduleId) {
        const moduleName = modules.find(m => m.id === item.moduleId)?.title || 'Unknown';
        moduleDistribution[moduleName] = (moduleDistribution[moduleName] || 0) + item.duration;
      } else {
        moduleDistribution['General'] = (moduleDistribution['General'] || 0) + item.duration;
      }

      // Time of Day
      const startHour = getHours(item.start);
      hourlyDistribution[startHour] += item.duration;

      // Day of Week
      const dayOfWeek = getDay(item.start); // 0 = Sunday
      dailyDistribution[dayOfWeek] += item.duration;
    });

    const moduleData = Object.entries(moduleDistribution).map(([name, value]) => ({
      name,
      value: Math.round(value / 60 * 10) / 10 // Convert to hours
    })).sort((a, b) => b.value - a.value);

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const dailyData = days.map((day, index) => {
      const dayIndex = (index + 1) % 7; // Monday is 1, Sunday is 0
      const value = dailyDistribution[dayIndex];
      return {
        day,
        value: Math.round(value / 60 * 10) / 10
      };
    });

    const formatHour = (h: number) => {
      if (h === 0) return '12 AM';
      if (h === 12) return '12 PM';
      return h > 12 ? `${h - 12} PM` : `${h} AM`;
    };

    const hourlyData = hourlyDistribution.map((value, hour) => ({
      hour: formatHour(hour),
      value: Math.round(value / 60 * 10) / 10
    }));

    // Unit Progress
    const unitProgressData = modules.map(m => {
      const total = m.units?.length || 0;
      const completed = m.units?.filter(u => u.completed).length || 0;
      return {
        name: m.title,
        completed,
        total,
        percentage: total > 0 ? Math.round((completed / total) * 100) : 0
      };
    }).sort((a, b) => b.percentage - a.percentage);

    return { moduleData, hourlyData, dailyData, unitProgressData };
  }, [modules, schedule, studyLogs]);

  const handleLogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!logForm.moduleId) return;

    const endTime = new Date();
    const startTime = new Date(endTime.getTime() - logForm.duration * 60000);

    await onLogStudy({
      moduleId: logForm.moduleId,
      unitId: logForm.unitId || undefined,
      startTime,
      endTime,
      duration: logForm.duration,
      notes: logForm.notes
    });

    // If a unit was selected, mark it as completed
    if (logForm.moduleId && logForm.unitId) {
      await onUpdateUnit(logForm.moduleId, logForm.unitId, true);
    }

    setIsLogging(false);
    setLogForm({ moduleId: '', unitId: '', duration: 30, notes: '' });
  };

  const selectedModule = modules.find(m => m.id === logForm.moduleId);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-sm">
            <Activity size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">Study Habits & Analytics</h3>
            <p className="text-xs text-slate-400 font-medium">Track your progress and optimize your study flow</p>
          </div>
        </div>
        <button 
          onClick={() => setIsLogging(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 group"
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform" />
          Log Session
        </button>
      </div>

      <AnimatePresence>
        {isLogging && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white rounded-[2rem] p-8 border-2 border-indigo-100 shadow-xl shadow-indigo-50/50 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-bold text-slate-800 flex items-center gap-2">
                  <Clock size={20} className="text-indigo-600" />
                  Log Manual Study Session
                </h4>
                <button onClick={() => setIsLogging(false)} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400">
                  <Plus size={20} className="rotate-45" />
                </button>
              </div>
              <form onSubmit={handleLogSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Module</label>
                  <select 
                    required
                    value={logForm.moduleId}
                    onChange={(e) => setLogForm({ ...logForm, moduleId: e.target.value, unitId: '' })}
                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select Module</option>
                    {modules.map(m => (
                      <option key={m.id} value={m.id}>{m.title}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Unit (Optional)</label>
                  <select 
                    value={logForm.unitId}
                    onChange={(e) => setLogForm({ ...logForm, unitId: e.target.value })}
                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                    disabled={!logForm.moduleId}
                  >
                    <option value="">Select Unit</option>
                    {selectedModule?.units?.map(u => (
                      <option key={u.id} value={u.id}>{u.unitNumber}: {u.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Duration (Minutes)</label>
                  <input 
                    type="number"
                    required
                    min="1"
                    value={logForm.duration}
                    onChange={(e) => setLogForm({ ...logForm, duration: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex items-end">
                  <button 
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                  >
                    Save Session
                  </button>
                </div>
                <div className="md:col-span-2 lg:col-span-4 space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Notes</label>
                  <textarea 
                    value={logForm.notes}
                    onChange={(e) => setLogForm({ ...logForm, notes: e.target.value })}
                    placeholder="What did you focus on?"
                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-indigo-500 h-20 resize-none"
                  />
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Insights Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Clock size={16} />
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Study</p>
          </div>
          <p className="text-2xl font-bold text-slate-800">
            {Math.round(moduleData.reduce((acc, curr) => acc + curr.value, 0) * 10) / 10} <span className="text-sm font-medium text-slate-400">hrs</span>
          </p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <BookOpen size={16} />
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Top Module</p>
          </div>
          <p className="text-2xl font-bold text-slate-800 truncate">
            {moduleData.length > 0 ? moduleData[0].name : 'N/A'}
          </p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <TrendingUp size={16} />
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Peak Hour</p>
          </div>
          <p className="text-2xl font-bold text-slate-800">
            {hourlyData.length > 0 ? [...hourlyData].sort((a, b) => b.value - a.value)[0].hour : 'N/A'}
          </p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Calendar size={16} />
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Day</p>
          </div>
          <p className="text-2xl font-bold text-slate-800">
            {dailyData.length > 0 ? [...dailyData].sort((a, b) => b.value - a.value)[0].day : 'N/A'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Module Distribution */}
        <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <PieChartIcon size={20} className="text-indigo-600" />
              <h4 className="font-bold text-slate-800">Time by Module (Hours)</h4>
            </div>
            <TrendingUp size={18} className="text-slate-300" />
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={moduleData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {moduleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
                  formatter={(value: number) => [`${value} hrs`, 'Study Time']}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Unit Progress Tracking */}
        <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={20} className="text-emerald-500" />
              <h4 className="font-bold text-slate-800">Unit Completion Progress</h4>
            </div>
            <BookOpen size={18} className="text-slate-300" />
          </div>
          <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {unitProgressData.map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-700 truncate max-w-[200px]">{item.name}</span>
                  <span className="text-xs font-bold text-indigo-600">{item.completed}/{item.total} Units</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    className={`h-full ${item.percentage === 100 ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                  />
                </div>
              </div>
            ))}
            {unitProgressData.length === 0 && (
              <div className="text-center py-12 text-slate-400 italic">No modules found.</div>
            )}
          </div>
        </div>

        {/* Daily Distribution */}
        <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <BarChart3 size={20} className="text-indigo-600" />
              <h4 className="font-bold text-slate-800">Weekly Activity (Hours)</h4>
            </div>
            <Calendar size={18} className="text-slate-300" />
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyData}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
                    <stop offset="100%" stopColor="#818cf8" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
                  formatter={(value: number) => [`${value} hrs`, 'Study Time']}
                />
                <Bar dataKey="value" fill="url(#barGradient)" radius={[6, 6, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Hourly Distribution */}
        <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Activity size={20} className="text-indigo-600" />
              <h4 className="font-bold text-slate-800">Study Intensity by Hour</h4>
            </div>
            <TrendingUp size={18} className="text-slate-300" />
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="hour" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }}
                  interval={3}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
                  formatter={(value: number) => [`${value} hrs`, 'Study Intensity']}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#6366f1" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Study Sessions */}
      <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Clock size={20} className="text-indigo-600" />
            <h4 className="font-bold text-slate-800">Recent Study Sessions</h4>
          </div>
          <button 
            onClick={() => setShowAllLogs(!showAllLogs)}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            {showAllLogs ? 'Show Less' : 'View All History'}
            {showAllLogs ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
        <div className="space-y-4">
          {(showAllLogs ? studyLogs : studyLogs.slice(0, 5)).map((log) => (
            <div key={log.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 group transition-all hover:border-indigo-200">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-indigo-600 shadow-sm">
                  <BookOpen size={18} />
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm">
                    {modules.find(m => m.id === log.moduleId)?.title || 'General Study'}
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium">
                    {log.timestamp ? format(log.timestamp.toDate(), 'MMM d, yyyy • HH:mm') : 'Just now'} • {log.duration} mins
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {log.notes && (
                  <div className="hidden md:block max-w-[200px] truncate text-[10px] text-slate-500 italic">
                    "{log.notes}"
                  </div>
                )}
                <button 
                  onClick={() => onDeleteLog(log.id)}
                  className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          {studyLogs.length === 0 && (
            <div className="text-center py-12 text-slate-400 italic">No study sessions logged yet. Start by logging your first session!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyHabitsDashboard;
