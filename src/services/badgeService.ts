import { Badge, UserProfile, StudyStats } from '../types';

export const AVAILABLE_BADGES: Badge[] = [
  {
    id: 'module_master',
    title: 'Module Master',
    description: 'Complete all units in a single module.',
    icon: '🎓',
    category: 'completion'
  },
  {
    id: 'quiz_whiz',
    title: 'Quiz Whiz',
    description: 'Achieve a perfect 100% score on any quiz.',
    icon: '⚡',
    category: 'quiz'
  },
  {
    id: 'consistent_scholar',
    title: 'Consistent Scholar',
    description: 'Maintain a 3-day study streak.',
    icon: '📚',
    category: 'habit'
  },
  {
    id: 'streak_warrior',
    title: 'Streak Warrior',
    description: 'Maintain a 7-day study streak.',
    icon: '🔥',
    category: 'habit'
  },
  {
    id: 'early_bird',
    title: 'Early Bird',
    description: 'Complete a study session before 8:00 AM.',
    icon: '🌅',
    category: 'habit'
  },
  {
    id: 'night_owl',
    title: 'Night Owl',
    description: 'Complete a study session after 10:00 PM.',
    icon: '🦉',
    category: 'habit'
  },
  {
    id: 'social_learner',
    title: 'Social Learner',
    description: 'Join your first study community.',
    icon: '🤝',
    category: 'social'
  }
];

export const checkAndAwardBadges = (profile: UserProfile, stats: StudyStats): { newBadges: Badge[], updatedStats: StudyStats } => {
  const newBadges: Badge[] = [];
  const currentBadgeIds = new Set(profile.badges?.map(b => b.id) || []);

  // 1. Quiz Whiz
  if (stats.perfectScores > 0 && !currentBadgeIds.has('quiz_whiz')) {
    const badge = AVAILABLE_BADGES.find(b => b.id === 'quiz_whiz')!;
    newBadges.push({ ...badge, unlockedAt: new Date() });
  }

  // 2. Consistent Scholar (3 days)
  if (stats.currentStreak >= 3 && !currentBadgeIds.has('consistent_scholar')) {
    const badge = AVAILABLE_BADGES.find(b => b.id === 'consistent_scholar')!;
    newBadges.push({ ...badge, unlockedAt: new Date() });
  }

  // 3. Streak Warrior (7 days)
  if (stats.currentStreak >= 7 && !currentBadgeIds.has('streak_warrior')) {
    const badge = AVAILABLE_BADGES.find(b => b.id === 'streak_warrior')!;
    newBadges.push({ ...badge, unlockedAt: new Date() });
  }

  // 4. Module Master
  if (stats.modulesCompleted > 0 && !currentBadgeIds.has('module_master')) {
    const badge = AVAILABLE_BADGES.find(b => b.id === 'module_master')!;
    newBadges.push({ ...badge, unlockedAt: new Date() });
  }

  // 5. Early Bird / Night Owl
  const hour = new Date().getHours();
  if (hour < 8 && !currentBadgeIds.has('early_bird')) {
    const badge = AVAILABLE_BADGES.find(b => b.id === 'early_bird')!;
    newBadges.push({ ...badge, unlockedAt: new Date() });
  }
  if (hour >= 22 && !currentBadgeIds.has('night_owl')) {
    const badge = AVAILABLE_BADGES.find(b => b.id === 'night_owl')!;
    newBadges.push({ ...badge, unlockedAt: new Date() });
  }

  return { newBadges, updatedStats: stats };
};

export const updateStudyStreak = (stats: StudyStats | undefined): StudyStats => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  
  const initialStats: StudyStats = stats || {
    currentStreak: 0,
    longestStreak: 0,
    totalStudyHours: 0,
    quizzesCompleted: 0,
    perfectScores: 0,
    modulesCompleted: 0,
    lastStudyDate: null
  };

  if (!initialStats.lastStudyDate) {
    return {
      ...initialStats,
      currentStreak: 1,
      longestStreak: 1,
      lastStudyDate: now
    };
  }

  const lastDate = new Date(initialStats.lastStudyDate);
  const lastDay = new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate()).getTime();
  
  const diffDays = (today - lastDay) / (1000 * 60 * 60 * 24);

  if (diffDays === 0) {
    return initialStats; // Already studied today
  } else if (diffDays === 1) {
    const newStreak = initialStats.currentStreak + 1;
    return {
      ...initialStats,
      currentStreak: newStreak,
      longestStreak: Math.max(initialStats.longestStreak, newStreak),
      lastStudyDate: now
    };
  } else {
    return {
      ...initialStats,
      currentStreak: 1,
      lastStudyDate: now
    };
  }
};
