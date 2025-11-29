import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type AudienceType = "kutty" | "young" | "friends";

const AudienceSection = () => {
  const [activeAudience, setActiveAudience] = useState<AudienceType>("kutty");

  const audiences = {
    kutty: {
      title: "KuttyMakers",
      subtitle: "Ages 8-14",
      description: "Young dreamers discovering the magic of AI through play and wonder",
      bgClass: "bg-sunrise-gold",
      bgGradient: "linear-gradient(180deg, hsl(40 90% 95%) 0%, hsl(40 80% 85%) 100%)",
      badgeBg: "bg-sunrise-gold/20",
      badgeText: "text-sunrise-gold",
      dotColor: "bg-sunrise-gold",
      time: "Morning",
      features: ["Interactive games", "Creative challenges", "Safe exploration", "Fun workshops"],
    },
    young: {
      title: "Young Makers",
      subtitle: "Ages 15-25",
      description: "Students and young professionals building the future with AI",
      bgClass: "bg-backwater-blue",
      bgGradient: "linear-gradient(180deg, hsl(204 60% 92%) 0%, hsl(204 50% 82%) 100%)",
      badgeBg: "bg-backwater-blue/20",
      badgeText: "text-backwater-blue-deep",
      dotColor: "bg-backwater-blue",
      time: "Midday",
      features: ["Project-based learning", "Career guidance", "Hackathons", "Mentorship"],
    },
    friends: {
      title: "Friends of Movement",
      subtitle: "All ages welcome",
      description: "Teachers, parents, and community members nurturing the next generation",
      bgClass: "bg-kerala-green",
      bgGradient: "linear-gradient(180deg, hsl(35 60% 85%) 0%, hsl(25 50% 70%) 100%)",
      badgeBg: "bg-kerala-green/20",
      badgeText: "text-kerala-green",
      dotColor: "bg-kerala-green",
      time: "Evening",
      features: ["Community circles", "Volunteer programs", "Resource sharing", "Local events"],
    },
  };

  const current = audiences[activeAudience];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Dynamic background based on time of day */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeAudience}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
          style={{ background: current.bgGradient }}
        />
      </AnimatePresence>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <AnimatePresence mode="wait">
          {activeAudience === "kutty" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Stars and patterns for kids */}
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-2xl"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ 
                    rotate: { duration: 10, repeat: Infinity },
                    scale: { duration: 2, repeat: Infinity, delay: i * 0.2 },
                  }}
                >
                  {["⭐", "✨", "🌟", "💫"][i % 4]}
                </motion.div>
              ))}
              {/* Floating robot */}
              <motion.div
                className="absolute right-20 top-32 text-6xl"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🤖
              </motion.div>
            </motion.div>
          )}

          {activeAudience === "young" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Drone flying */}
              <motion.div
                className="absolute text-4xl"
                animate={{
                  x: ["-100%", "200%"],
                  y: [100, 50, 100],
                }}
                transition={{ duration: 8, repeat: Infinity }}
              >
                🚁
              </motion.div>
              {/* Banyan tree silhouette */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-9xl opacity-10">
                🌳
              </div>
            </motion.div>
          )}

          {activeAudience === "friends" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Lanterns / fireflies */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-firefly rounded-full"
                  style={{
                    left: `${10 + (i % 6) * 15}%`,
                    top: `${20 + Math.floor(i / 6) * 40}%`,
                  }}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="section-container relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-ink-black mb-4">
            A Kerala Village
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            One community, three generations, infinite possibilities
          </p>
        </motion.div>

        {/* Audience selector tabs */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {(Object.keys(audiences) as AudienceType[]).map((key) => (
            <motion.button
              key={key}
              onClick={() => setActiveAudience(key)}
              className={`
                px-6 py-3 rounded-full font-medium transition-all
                ${activeAudience === key
                  ? `${audiences[key].bgClass} text-coconut-white shadow-lg`
                  : "bg-card text-muted-foreground hover:bg-card/80"
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {audiences[key].title}
            </motion.button>
          ))}
        </div>

        {/* Main content card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeAudience}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="kerala-card max-w-4xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Illustration side */}
              <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-card to-muted">
                {/* Village illustration */}
                <div className="absolute inset-0 flex items-end justify-center">
                  {/* Ground */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-kerala-green/30 rounded-t-[100%]" />
                  
                  {/* Characters */}
                  <div className="relative z-10 flex items-end justify-center gap-4 pb-8">
                    {activeAudience === "kutty" && (
                      <>
                        <motion.span 
                          className="text-5xl" 
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                        >
                          👧
                        </motion.span>
                        <motion.span 
                          className="text-5xl"
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1, delay: 0.2 }}
                        >
                          👦
                        </motion.span>
                        <motion.span 
                          className="text-5xl"
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1, delay: 0.4 }}
                        >
                          🧒
                        </motion.span>
                      </>
                    )}
                    {activeAudience === "young" && (
                      <>
                        <span className="text-5xl">👨‍🎓</span>
                        <span className="text-5xl">👩‍💻</span>
                        <span className="text-5xl">🧑‍🔬</span>
                      </>
                    )}
                    {activeAudience === "friends" && (
                      <>
                        <span className="text-5xl">👨‍🏫</span>
                        <span className="text-5xl">👩‍👧</span>
                        <span className="text-5xl">🧓</span>
                      </>
                    )}
                  </div>

                  {/* Palm trees */}
                  <div className="absolute left-4 bottom-4 text-4xl">🌴</div>
                  <div className="absolute right-4 bottom-4 text-4xl">🌴</div>
                </div>

                {/* Time indicator */}
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${current.badgeBg} ${current.badgeText}`}>
                  {current.time}
                </div>
              </div>

              {/* Content side */}
              <div>
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${current.badgeBg} ${current.badgeText}`}>
                  {current.subtitle}
                </div>
                <h3 className="text-3xl font-display font-bold text-ink-black mb-4">
                  {current.title}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {current.description}
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {current.features.map((feature, i) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-2 text-sm"
                    >
                      <span className={`w-2 h-2 rounded-full ${current.dotColor}`} />
                      <span className="text-muted-foreground">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default AudienceSection;
