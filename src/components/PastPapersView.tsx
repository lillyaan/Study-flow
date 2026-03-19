import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  ExternalLink, 
  ChevronDown, 
  BookOpen,
  MapPin,
  Calendar,
  Building2,
  AlertCircle,
  GraduationCap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PastPaper, UserProfile } from '../types';
import { PAST_PAPERS, PROVINCES, BOARDS, SUBJECTS, GRADES } from '../data/pastPapers';

interface PastPapersViewProps {
  profile: UserProfile;
}

export default function PastPapersView({ profile }: PastPapersViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedBoard, setSelectedBoard] = useState<string>('all');
  const [selectedProvince, setSelectedProvince] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [selectedPaperNumber, setSelectedPaperNumber] = useState<string>('all');
  const [selectedGrade, setSelectedGrade] = useState<string>(() => {
    const userGrade = profile.yearGrade?.replace(/\D/g, ''); // Extract digits (e.g., "Grade 12" -> "12")
    return ['10', '11', '12'].includes(userGrade) ? userGrade : '12';
  });

  const years = useMemo(() => {
    const uniqueYears = Array.from(new Set(PAST_PAPERS.map(p => p.year)));
    return uniqueYears.sort((a, b) => b - a);
  }, []);

  const months = useMemo(() => {
    const uniqueMonths = Array.from(new Set(PAST_PAPERS.map(p => p.month)));
    return uniqueMonths.sort();
  }, []);

  const paperNumbers = useMemo(() => {
    const uniquePapers = Array.from(new Set(PAST_PAPERS.map(p => p.paperNumber)));
    return uniquePapers.sort((a, b) => a - b);
  }, []);

  const filteredPapers = useMemo(() => {
    return PAST_PAPERS.filter(paper => {
      const matchesSearch = paper.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           paper.board.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           (paper.province?.toLowerCase().includes(searchQuery.toLowerCase()) || false);
      
      const matchesSubject = selectedSubject === 'all' || paper.subject === selectedSubject;
      const matchesBoard = selectedBoard === 'all' || paper.board === selectedBoard;
      const matchesProvince = selectedProvince === 'all' || paper.province === selectedProvince;
      const matchesYear = selectedYear === 'all' || paper.year.toString() === selectedYear;
      const matchesGrade = selectedGrade === 'all' || paper.grade.toString() === selectedGrade;
      const matchesMonth = selectedMonth === 'all' || paper.month === selectedMonth;
      const matchesPaperNumber = selectedPaperNumber === 'all' || paper.paperNumber.toString() === selectedPaperNumber;

      return matchesSearch && matchesSubject && matchesBoard && matchesProvince && matchesYear && matchesGrade && matchesMonth && matchesPaperNumber;
    });
  }, [searchQuery, selectedSubject, selectedBoard, selectedProvince, selectedYear, selectedGrade, selectedMonth, selectedPaperNumber]);

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50" />
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
              <FileText size={24} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-800">Past Exam Papers</h2>
              <p className="text-slate-500">Access official Grade 12 (NSC) past papers from DBE, IEB, and SACAI.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <div className="relative lg:col-span-2">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text"
                placeholder="Search papers..."
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="relative">
              <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <select 
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 transition-all appearance-none cursor-pointer"
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
              >
                <option value="all">All Grades</option>
                {GRADES.map(g => <option key={g} value={g}>Grade {g}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
            </div>

            <div className="relative">
              <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <select 
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 transition-all appearance-none cursor-pointer"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option value="all">All Subjects</option>
                {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
            </div>

            <div className="relative">
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <select 
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 transition-all appearance-none cursor-pointer"
                value={selectedBoard}
                onChange={(e) => setSelectedBoard(e.target.value)}
              >
                <option value="all">All Boards</option>
                {BOARDS.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
            </div>

            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <select 
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 transition-all appearance-none cursor-pointer"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="all">All Years</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
            </div>

            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <select 
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 transition-all appearance-none cursor-pointer"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                <option value="all">All Months</option>
                {months.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
            </div>

            <div className="relative">
              <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <select 
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 transition-all appearance-none cursor-pointer"
                value={selectedPaperNumber}
                onChange={(e) => setSelectedPaperNumber(e.target.value)}
              >
                <option value="all">All Papers</option>
                {paperNumbers.map(n => <option key={n} value={n}>Paper {n}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
            </div>
          </div>

          {selectedBoard === 'DBE' && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative mt-4"
            >
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <select 
                className="w-full md:w-1/4 pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 transition-all appearance-none cursor-pointer"
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
              >
                <option value="all">All Provinces</option>
                {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              <ChevronDown className="absolute left-[calc(25%-2rem)] md:left-[calc(25%-2rem)] top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
            </motion.div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredPapers.map((paper) => (
            <motion.div
              key={paper.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-50/50 transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <FileText size={24} />
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-2 mb-1">
                    {paper.board === 'IEB' && (
                      <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-tighter border border-amber-200">Official IEB</span>
                    )}
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{paper.board}</span>
                  </div>
                  <span className="text-xs font-bold text-indigo-600">Grade {paper.grade} • {paper.year}</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-800 mb-2">{paper.subject}</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-slate-50 text-slate-500 px-3 py-1 rounded-lg text-[10px] font-bold uppercase">Paper {paper.paperNumber}</span>
                <span className="bg-slate-50 text-slate-500 px-3 py-1 rounded-lg text-[10px] font-bold uppercase">{paper.month}</span>
                {paper.province && (
                  <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg text-[10px] font-bold uppercase">{paper.province}</span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <a 
                  href={paper.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                >
                  <Download size={14} />
                  Question Paper
                </a>
                <a 
                  href={paper.memoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all"
                >
                  <ExternalLink size={14} />
                  Memorandum
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredPapers.length === 0 && (
          <div className="col-span-full bg-white rounded-[2rem] p-16 border-2 border-dashed border-slate-100 text-center">
            <AlertCircle size={48} className="mx-auto text-slate-200 mb-4" />
            <h3 className="text-lg font-bold text-slate-800 mb-2">No Papers Found</h3>
            <p className="text-slate-500">Try adjusting your filters or search query to find what you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
}
