import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const WhyAISection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bookRotation = useTransform(scrollYProgress, [0.1, 0.4], [0, -15]);
  const pageOpacity = useTransform(scrollYProgress, [0.2, 0.4], [1, 0]);
  const digitalOpacity = useTransform(scrollYProgress, [0.35, 0.5], [0, 1]);
  const mapOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);
  const glowIntensity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

  return (
    <section
      id="why-ai"
      ref={containerRef}
      className="relative min-h-[200vh] bg-gradient-sand overflow-hidden"
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Malayalam shadow text */}
        <div className="malayalam-shadow -left-20 top-20 rotate-[-15deg]">
          സാക്ഷരത
        </div>

        <div className="section-container relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-ink-black mb-4">
              Why AI Literacy?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From Kerala's historic literacy mission to the AI revolution
            </p>
          </motion.div>

          {/* The transforming book */}
          <div className="relative w-full max-w-4xl mx-auto h-[60vh] perspective-1000">
            {/* Scene 1: Old Kerala Book */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              style={{ 
                opacity: pageOpacity,
                rotateY: bookRotation,
              }}
            >
              <div className="relative w-[400px] h-[500px] bg-soft-sand rounded-lg shadow-card border-4 border-soft-sand-dark transform-gpu">
                {/* Book spine */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-kerala-green-dark rounded-l-lg" />
                
                {/* Page content */}
                <div className="ml-12 p-8 h-full flex flex-col justify-center">
                  <div className="font-display text-2xl text-ink-black mb-6 border-b-2 border-kerala-green/30 pb-4">
                    Kerala's Legacy
                  </div>
                  
                  {/* Hand-drawn style notes */}
                  <div className="space-y-4 font-body text-muted-foreground">
                    <p className="flex items-center gap-3">
                      <span className="text-kerala-green text-2xl">✦</span>
                      <span className="italic">1991 — Literacy Mission</span>
                    </p>
                    <p className="flex items-center gap-3">
                      <span className="text-kerala-green text-2xl">✦</span>
                      <span className="italic">2002 — Akshaya Centres</span>
                    </p>
                    <p className="flex items-center gap-3">
                      <span className="text-kerala-green text-2xl">✦</span>
                      <span className="italic">2015 — Digital Kerala</span>
                    </p>
                    <p className="flex items-center gap-3">
                      <span className="text-sunrise-gold text-2xl">★</span>
                      <span className="font-semibold text-ink-black">2024 — AI for Everyone</span>
                    </p>
                  </div>

                  {/* Decorative scribbles */}
                  <svg className="absolute bottom-8 right-8 w-24 h-24 opacity-20">
                    <path
                      d="M10,50 Q30,10 50,50 T90,50"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      className="text-kerala-green"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Scene 2: Digital hologram transformation */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: digitalOpacity }}
            >
              <motion.div
                className="relative w-[400px] h-[500px] rounded-2xl overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, 
                    hsl(var(--backwater-blue) / 0.1) 0%,
                    hsl(var(--kerala-green) / 0.2) 100%)`,
                  boxShadow: `0 0 ${60}px hsl(var(--kerala-green) / 0.3)`,
                }}
              >
                {/* Holographic grid */}
                <div className="absolute inset-0 opacity-30">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-full h-px bg-kerala-green/50"
                      style={{ top: `${i * 5}%` }}
                    />
                  ))}
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={`v-${i}`}
                      className="absolute h-full w-px bg-kerala-green/50"
                      style={{ left: `${i * 5}%` }}
                    />
                  ))}
                </div>

                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col justify-center text-center">
                  <motion.div
                    className="text-6xl mb-6"
                    animate={{ rotateY: [0, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    🤖
                  </motion.div>
                  
                  <h3 className="text-3xl font-display font-bold text-kerala-green mb-4">
                    The Next Chapter
                  </h3>
                  
                  <p className="text-muted-foreground mb-6">
                    AI literacy isn't just about technology—
                    <br />
                    <span className="text-kerala-green font-semibold">
                      it's about empowerment.
                    </span>
                  </p>

                  <div className="flex justify-center gap-4">
                    {["Learn", "Build", "Share"].map((word, i) => (
                      <motion.span
                        key={word}
                        className="px-4 py-2 bg-kerala-green/20 rounded-full text-kerala-green text-sm font-medium"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.2 }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Floating particles */}
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-kerala-green/60 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [-10, 10, -10],
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>

            {/* Scene 3: Future Kerala Map */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: mapOpacity }}
            >
              <div className="relative">
                {/* Kerala outline with neural network */}
                <svg viewBox="0 0 200 400" className="w-64 h-auto">
                  {/* Simplified Kerala shape */}
                  <motion.path
                    d="M100,20 C120,40 140,80 145,120 C150,160 140,200 130,250 C120,300 100,340 80,370 C60,340 50,300 45,250 C40,200 50,160 55,120 C60,80 80,40 100,20"
                    fill="none"
                    stroke="hsl(var(--kerala-green))"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2 }}
                  />
                  
                  {/* Neural network inside */}
                  {[...Array(8)].map((_, i) => (
                    <motion.circle
                      key={i}
                      cx={70 + (i % 3) * 30}
                      cy={100 + Math.floor(i / 3) * 80}
                      r="6"
                      className="fill-backwater-blue"
                      initial={{ scale: 0 }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        scale: { duration: 2, repeat: Infinity, delay: i * 0.3 },
                      }}
                    />
                  ))}
                  
                  {/* Connecting lines */}
                  {[
                    [70, 100, 100, 100],
                    [100, 100, 130, 100],
                    [70, 180, 100, 180],
                    [100, 180, 130, 180],
                    [100, 100, 100, 180],
                    [70, 100, 100, 180],
                    [130, 100, 100, 180],
                  ].map(([x1, y1, x2, y2], i) => (
                    <motion.line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="hsl(var(--kerala-green) / 0.5)"
                      strokeWidth="1"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                    />
                  ))}
                </svg>

                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 text-4xl animate-float">🌴</div>
                <div className="absolute -bottom-4 -right-4 text-4xl animate-float-slow">🥥</div>
                
                {/* Malayalam text */}
                <p className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-kerala-green/40 font-light text-sm whitespace-nowrap">
                  കേരളം • Kerala • കേരളം
                </p>
              </div>
            </motion.div>
          </div>

          {/* Timeline dots */}
          <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4">
            {["Past", "Present", "Future"].map((label, i) => (
              <motion.div
                key={label}
                className="flex items-center gap-3"
                style={{
                  opacity: useTransform(
                    scrollYProgress,
                    [0.1 + i * 0.25, 0.2 + i * 0.25],
                    [0.3, 1]
                  ),
                }}
              >
                <div className="w-3 h-3 rounded-full bg-kerala-green" />
                <span className="text-sm text-muted-foreground">{label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyAISection;
