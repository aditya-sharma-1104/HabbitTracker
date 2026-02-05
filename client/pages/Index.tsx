import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHabits } from '../hooks/useHabits';
import { CATEGORY_INFO, HabitCategory } from '../types/habit';
import { ConfettiEffect, LevelUpEffect } from '../components/ConfettiEffect';
import { Plus, Zap, Trophy, Target, Star, Flame, Sparkles } from 'lucide-react';

export default function Index() {
  const { habits, progress, addHabit, completeHabit, deleteHabit } = useHabits();
  const [showAddForm, setShowAddForm] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [previousLevel, setPreviousLevel] = useState(progress.level);

  const progressPercentage = ((progress.totalPoints % 100) / 100) * 100;

  // Detect level up
  useEffect(() => {
    if (progress.level > previousLevel) {
      setShowLevelUp(true);
      setShowConfetti(true);
      setPreviousLevel(progress.level);
    }
  }, [progress.level, previousLevel]);

  const handleCompleteHabit = (habitId: string) => {
    completeHabit(habitId);
    // Small celebration for habit completion
    setShowConfetti(true);
  };

  return (
    <div className="min-h-screen bg-gaming-dark text-foreground relative overflow-x-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gaming-purple/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-16 w-40 h-40 bg-gaming-cyan/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-1/3 w-36 h-36 bg-gaming-blue/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.h1 
            className="text-6xl font-bold gradient-text mb-4"
            animate={{ 
              textShadow: [
                "0 0 20px rgba(0, 255, 255, 0.5)",
                "0 0 40px rgba(138, 43, 226, 0.5)",
                "0 0 20px rgba(0, 255, 255, 0.5)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            HABIT LEVELING
          </motion.h1>
          <p className="text-gaming-silver text-xl">
            Forge your character through daily quests
          </p>
        </motion.div>

        {/* Player Stats */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-2xl p-8 mb-8 neon-border border-gaming-cyan relative overflow-hidden"
        >
          {/* Animated background */}
          <div className="absolute inset-0 opacity-20">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-gaming-purple/20 via-gaming-cyan/20 to-gaming-blue/20"
              animate={{ x: [-100, 100, -100] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <motion.div 
                  className="w-16 h-16 bg-gradient-to-br from-gaming-purple to-gaming-cyan rounded-full flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Trophy className="w-8 h-8 text-white" />
                </motion.div>
                <div>
                  <motion.h2 
                    className="text-3xl font-bold text-gaming-cyan"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Level {progress.level}
                  </motion.h2>
                  <p className="text-gaming-silver">Legendary Habit Slayer</p>
                </div>
              </div>
              <div className="text-right">
                <motion.div 
                  className="text-2xl font-bold text-gaming-gold"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {progress.totalPoints}
                </motion.div>
                <p className="text-gaming-silver text-sm">Total XP</p>
              </div>
            </div>

            {/* Level Progress Bar */}
            <div className="relative">
              <div className="w-full h-4 bg-gaming-darker rounded-full overflow-hidden border border-gaming-dark">
                <motion.div 
                  className="h-full bg-gradient-to-r from-gaming-cyan to-gaming-purple relative"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  style={{
                    boxShadow: "0 0 20px rgba(0, 255, 255, 0.5)",
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    animate={{ x: [-100, 200] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>
              </div>
              <div className="flex justify-between mt-2 text-sm text-gaming-silver">
                <span>{progress.totalPoints % 100} XP</span>
                <span>{progress.pointsToNextLevel} XP to next level</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Add Habit Button */}
        <motion.button
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0 0 30px rgba(0, 255, 255, 0.5)",
            borderColor: "rgba(0, 255, 255, 0.8)"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddForm(true)}
          className="w-full glass rounded-xl p-6 mb-8 neon-border border-gaming-purple hover:border-gaming-cyan transition-all duration-300 group relative overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-gaming-purple/10 to-gaming-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity"
            animate={{ x: [-100, 100] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <div className="relative z-10 flex items-center justify-center gap-3">
            <motion.div
              animate={{ rotate: [0, 90, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Plus className="w-6 h-6 text-gaming-purple group-hover:text-gaming-cyan transition-colors" />
            </motion.div>
            <span className="text-xl font-semibold text-gaming-purple group-hover:text-gaming-cyan transition-colors">
              Add New Quest
            </span>
            <Sparkles className="w-5 h-5 text-gaming-gold opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </motion.button>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {(Object.keys(CATEGORY_INFO) as HabitCategory[]).map((category) => {
            const categoryHabits = habits.filter(h => h.category === category);
            const categoryInfo = CATEGORY_INFO[category];
            const categoryPoints = progress.categoryPoints[category];

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * Object.keys(CATEGORY_INFO).indexOf(category) }}
                className={`glass rounded-xl p-6 neon-border ${categoryInfo.borderColor} relative overflow-hidden`}
                whileHover={{ y: -5 }}
              >
                {/* Category glow effect */}
                <motion.div
                  className={`absolute inset-0 ${categoryInfo.bgColor} opacity-0`}
                  whileHover={{ opacity: 0.1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Category Header */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <motion.span 
                        className="text-3xl"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        {categoryInfo.emoji}
                      </motion.span>
                      <div>
                        <h3 className={`text-xl font-bold ${categoryInfo.color}`}>
                          {categoryInfo.name}
                        </h3>
                        <motion.p 
                          className="text-sm text-gaming-silver"
                          animate={{ opacity: [0.7, 1, 0.7] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {categoryPoints} XP
                        </motion.p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full ${categoryInfo.bgColor} ${categoryInfo.color} text-sm font-semibold`}>
                      {categoryHabits.length} quests
                    </div>
                  </div>

                  {/* Category Habits */}
                  <div className="space-y-3">
                    {categoryHabits.map((habit) => (
                      <motion.div
                        key={habit.id}
                        layout
                        className={`p-4 rounded-lg bg-gaming-darker/50 border ${
                          habit.completedToday ? 'border-gaming-green/50 bg-gaming-green/10' : 'border-gaming-dark'
                        } group cursor-pointer relative overflow-hidden`}
                        whileHover={{ 
                          scale: 1.02,
                          boxShadow: habit.completedToday ? "0 0 20px rgba(0, 255, 0, 0.3)" : "0 0 15px rgba(0, 255, 255, 0.2)"
                        }}
                        onClick={() => !habit.completedToday && handleCompleteHabit(habit.id)}
                        animate={{
                          boxShadow: habit.completedToday ? 
                            ["0 0 10px rgba(0, 255, 0, 0.3)", "0 0 20px rgba(0, 255, 0, 0.5)", "0 0 10px rgba(0, 255, 0, 0.3)"] :
                            []
                        }}
                        transition={{ duration: 2, repeat: habit.completedToday ? Infinity : 0 }}
                      >
                        {habit.completedToday && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-gaming-green/20 to-transparent"
                            initial={{ x: -100 }}
                            animate={{ x: 100 }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                        
                        <div className="relative z-10 flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-white mb-1">{habit.title}</h4>
                            <p className="text-gaming-silver text-sm">{habit.description}</p>
                            <div className="flex items-center gap-3 mt-2">
                              <motion.span 
                                className="flex items-center gap-1 text-gaming-gold text-sm"
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              >
                                <Zap className="w-4 h-4" />
                                {habit.points} XP
                              </motion.span>
                              {habit.streak > 0 && (
                                <motion.span 
                                  animate={{ 
                                    scale: habit.streak > 5 ? [1, 1.1, 1] : 1,
                                    textShadow: habit.streak > 10 ? [
                                      "0 0 5px rgba(255, 215, 0, 0.5)",
                                      "0 0 15px rgba(255, 215, 0, 0.8)",
                                      "0 0 5px rgba(255, 215, 0, 0.5)"
                                    ] : []
                                  }}
                                  transition={{ duration: 2, repeat: habit.streak > 5 ? Infinity : 0 }}
                                  className={`flex items-center gap-1 text-sm ${
                                    habit.streak > 10 ? 'text-gaming-gold' :
                                    habit.streak > 5 ? 'text-gaming-purple' : 'text-gaming-cyan'
                                  }`}
                                >
                                  {habit.streak > 10 ? <Star className="w-4 h-4" /> :
                                   habit.streak > 5 ? <Flame className="w-4 h-4" /> :
                                   <Target className="w-4 h-4" />}
                                  {habit.streak} streak
                                  {habit.streak > 5 && (
                                    <motion.span
                                      animate={{ 
                                        opacity: [1, 0.5, 1],
                                        scale: [1, 1.2, 1]
                                      }}
                                      transition={{ duration: 1, repeat: Infinity }}
                                      className="text-xs"
                                    >
                                      🔥
                                    </motion.span>
                                  )}
                                </motion.span>
                              )}
                            </div>
                          </div>
                          <div className="ml-4">
                            {habit.completedToday ? (
                              <motion.div 
                                initial={{ scale: 0, rotate: 0 }}
                                animate={{ 
                                  scale: 1, 
                                  rotate: 360,
                                  boxShadow: [
                                    "0 0 10px rgba(0, 255, 0, 0.5)",
                                    "0 0 20px rgba(0, 255, 0, 0.8)",
                                    "0 0 10px rgba(0, 255, 0, 0.5)"
                                  ]
                                }}
                                transition={{ 
                                  scale: { duration: 0.5 },
                                  rotate: { duration: 0.8 },
                                  boxShadow: { duration: 2, repeat: Infinity }
                                }}
                                className="w-8 h-8 rounded-full bg-gradient-to-r from-gaming-green to-gaming-cyan flex items-center justify-center"
                              >
                                <motion.div 
                                  className="w-4 h-4 rounded-full bg-white"
                                  animate={{ scale: [1, 0.8, 1] }}
                                  transition={{ duration: 1, repeat: Infinity }}
                                />
                              </motion.div>
                            ) : (
                              <motion.div 
                                className="w-8 h-8 rounded-full border-2 border-gaming-silver/30 hover:border-gaming-cyan transition-colors"
                                whileHover={{ 
                                  scale: 1.1,
                                  borderColor: "rgba(0, 255, 255, 0.8)",
                                  boxShadow: "0 0 10px rgba(0, 255, 255, 0.5)"
                                }}
                              />
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Effects */}
      <ConfettiEffect 
        trigger={showConfetti} 
        onComplete={() => setShowConfetti(false)} 
      />
      <LevelUpEffect 
        show={showLevelUp} 
        level={progress.level}
        onComplete={() => setShowLevelUp(false)}
      />

      {/* Add Habit Modal */}
      <AnimatePresence>
        {showAddForm && (
          <AddHabitModal 
            onClose={() => setShowAddForm(false)} 
            onAdd={addHabit}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Add Habit Modal Component
function AddHabitModal({ onClose, onAdd }: { 
  onClose: () => void; 
  onAdd: (habit: { title: string; description: string; category: HabitCategory; points: number }) => void;
}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'strength' as HabitCategory,
    points: 10
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onAdd(formData);
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        className="glass rounded-2xl p-8 w-full max-w-md neon-border border-gaming-purple relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-gaming-purple/10 via-gaming-cyan/10 to-gaming-blue/10"
          animate={{ x: [-100, 100, -100] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />

        <div className="relative z-10">
          <motion.h2 
            className="text-3xl font-bold text-gaming-cyan mb-6 text-center"
            animate={{ 
              textShadow: [
                "0 0 10px rgba(0, 255, 255, 0.5)",
                "0 0 20px rgba(0, 255, 255, 0.8)",
                "0 0 10px rgba(0, 255, 255, 0.5)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Create New Quest
          </motion.h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <label className="block text-gaming-silver text-sm font-semibold mb-2">Quest Name</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full bg-gaming-darker border border-gaming-dark rounded-lg px-4 py-3 text-white focus:border-gaming-cyan focus:ring-1 focus:ring-gaming-cyan transition-all focus:shadow-neon"
                placeholder="Enter quest name..."
                required
              />
            </motion.div>

            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-gaming-silver text-sm font-semibold mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full bg-gaming-darker border border-gaming-dark rounded-lg px-4 py-3 text-white focus:border-gaming-cyan focus:ring-1 focus:ring-gaming-cyan transition-all h-24 resize-none focus:shadow-neon"
                placeholder="Describe your quest..."
              />
            </motion.div>

            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-gaming-silver text-sm font-semibold mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as HabitCategory }))}
                className="w-full bg-gaming-darker border border-gaming-dark rounded-lg px-4 py-3 text-white focus:border-gaming-cyan focus:ring-1 focus:ring-gaming-cyan transition-all focus:shadow-neon"
              >
                {(Object.keys(CATEGORY_INFO) as HabitCategory[]).map((category) => (
                  <option key={category} value={category}>
                    {CATEGORY_INFO[category].emoji} {CATEGORY_INFO[category].name}
                  </option>
                ))}
              </select>
            </motion.div>

            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-gaming-silver text-sm font-semibold mb-2">XP Reward</label>
              <input
                type="number"
                min="1"
                max="100"
                value={formData.points}
                onChange={(e) => setFormData(prev => ({ ...prev, points: parseInt(e.target.value) || 10 }))}
                className="w-full bg-gaming-darker border border-gaming-dark rounded-lg px-4 py-3 text-white focus:border-gaming-cyan focus:ring-1 focus:ring-gaming-cyan transition-all focus:shadow-neon"
              />
            </motion.div>

            <motion.div 
              className="flex gap-4 pt-4"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                type="button"
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 py-3 px-6 rounded-lg border border-gaming-silver/30 text-gaming-silver hover:border-gaming-silver transition-all hover:shadow-md"
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 25px rgba(138, 43, 226, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 py-3 px-6 rounded-lg bg-gradient-to-r from-gaming-purple to-gaming-cyan text-white font-semibold shadow-neon-purple transition-all relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: -100 }}
                  whileHover={{ x: 100 }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10">Create Quest</span>
              </motion.button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}
