import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HeadHandHeartSection = () => {
  const [activeOrb, setActiveOrb] = useState<string | null>(null);

  const orbs = [
    {
      id: "head",
      icon: "🌐",
      title: "HEAD",
      subtitle: "Understanding AI",
      description: "AI is everywhere in your daily life",
      bgColor: "bg-backwater-blue/10",
      textColor: "text-backwater-blue",
      items: ["📱 Smart notifications", "📰 News recommendations", "💡 Electricity bills"],
    },
    {
      id: "hand",
      icon: "🤲",
      title: "HAND",
      subtitle: "Building with AI",
      description: "Create, experiment, and innovate",
      bgColor: "bg-kerala-green/10",
      textColor: "text-kerala-green",
      items: ["🧱 Drag blocks to build", "🔧 Practical projects", "💻 Real-world apps"],
    },
    {
      id: "heart",
      icon: "❤️",
      title: "HEART",
      subtitle: "AI for Good",
      description: "Technology with humanity",
      bgColor: "bg-sunrise-orange/10",
      textColor: "text-sunrise-orange",
      items: ["🤝 Community support", "🌱 Ethical AI", "💫 Inclusive design"],
    },
  ];

  return (
    <section className="relative py-24 bg-coconut-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full">
          <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="2" fill="currentColor" />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="section-container relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-ink-black mb-4">
            The Three Pillars
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Head to understand, Hands to build, Heart to connect
          </p>
        </motion.div>

        {/* Three orbs */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {orbs.map((orb, index) => (
            <motion.div
              key={orb.id}
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <div
                className={`
                  relative group cursor-pointer
                  rounded-3xl p-8 transition-all duration-500
                  ${activeOrb === orb.id 
                    ? `${orb.bgColor} shadow-lg scale-105` 
                    : "bg-card hover:bg-card/80 shadow-soft hover:shadow-card"
                  }
                `}
                onClick={() => setActiveOrb(activeOrb === orb.id ? null : orb.id)}
                onMouseEnter={() => setActiveOrb(orb.id)}
                onMouseLeave={() => setActiveOrb(null)}
              >
                {/* Orb container */}
                <div className="relative w-32 h-32 mx-auto mb-6">
                  {/* Glow ring */}
                  <motion.div
                    className={`absolute inset-0 rounded-full ${orb.bgColor}`}
                    animate={activeOrb === orb.id ? {
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5],
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  />

                  {/* Main orb */}
                  <div className={`
                    relative w-full h-full rounded-full 
                    ${orb.bgColor}
                    flex items-center justify-center
                    shadow-lg border border-border/20
                  `}>
                    {/* Icon or mini-world */}
                    <div className="text-5xl">
                      {orb.id === "head" ? (
                        <motion.div
                          animate={{ rotateY: 360 }}
                          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        >
                          {orb.icon}
                        </motion.div>
                      ) : orb.id === "hand" ? (
                        <div className="relative">
                          {orb.icon}
                          {/* Falling blocks animation */}
                          <AnimatePresence>
                            {activeOrb === "hand" && (
                              <>
                                {[...Array(3)].map((_, i) => (
                                  <motion.div
                                    key={i}
                                    className="absolute w-3 h-3 bg-kerala-green rounded-sm"
                                    initial={{ y: -30, x: -10 + i * 10, opacity: 0 }}
                                    animate={{ 
                                      y: [0, 20], 
                                      opacity: [1, 0],
                                    }}
                                    exit={{ opacity: 0 }}
                                    transition={{ 
                                      duration: 1.5, 
                                      repeat: Infinity,
                                      delay: i * 0.4,
                                    }}
                                  />
                                ))}
                              </>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <motion.div
                          animate={activeOrb === "heart" ? {
                            scale: [1, 1.1, 1],
                          } : {}}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          {orb.icon}
                        </motion.div>
                      )}
                    </div>

                    {/* Orbiting elements for HEAD */}
                    {orb.id === "head" && activeOrb === "head" && (
                      <>
                        {["💡", "📱", "📰"].map((emoji, i) => (
                          <motion.div
                            key={i}
                            className="absolute text-xl"
                            animate={{
                              rotate: 360,
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: "linear",
                              delay: i * (4/3),
                            }}
                            style={{
                              transformOrigin: "50px 50px",
                            }}
                          >
                            <span style={{ display: 'inline-block', transform: 'translateX(-50px)' }}>
                              {emoji}
                            </span>
                          </motion.div>
                        ))}
                      </>
                    )}

                    {/* Connected characters for HEART */}
                    {orb.id === "heart" && (
                      <div className="absolute inset-0">
                        {["👦", "👧", "👨", "👩", "🧓"].map((char, i) => {
                          const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
                          const radius = 55;
                          return (
                            <motion.div
                              key={i}
                              className="absolute text-lg"
                              style={{
                                left: `calc(50% + ${Math.cos(angle) * radius}px - 10px)`,
                                top: `calc(50% + ${Math.sin(angle) * radius}px - 10px)`,
                              }}
                              animate={activeOrb === "heart" ? {
                                scale: [1, 1.1, 1],
                              } : {}}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.2,
                              }}
                            >
                              {char}
                            </motion.div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-display font-bold text-ink-black mb-2 text-center">
                  {orb.title}
                </h3>
                <p className={`${orb.textColor} font-medium text-center mb-4`}>
                  {orb.subtitle}
                </p>
                <p className="text-muted-foreground text-center mb-6">
                  {orb.description}
                </p>

                {/* Items list */}
                <AnimatePresence>
                  {activeOrb === orb.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2 overflow-hidden"
                    >
                      {orb.items.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          {item}
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeadHandHeartSection;
