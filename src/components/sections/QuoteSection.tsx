import { motion } from "framer-motion";

const QuoteSection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Gradient background - horizon effect */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, 
            hsl(var(--coconut-white)) 0%, 
            hsl(var(--backwater-blue) / 0.3) 40%,
            hsl(var(--sunrise-gold) / 0.4) 70%,
            hsl(var(--sunrise-orange) / 0.5) 100%)`,
        }}
      />

      {/* Horizon line with AI circuits */}
      <div className="absolute bottom-1/3 left-0 right-0">
        <svg className="w-full h-32" viewBox="0 0 1440 128" preserveAspectRatio="none">
          {/* Glowing horizon line */}
          <motion.line
            x1="0"
            y1="64"
            x2="1440"
            y2="64"
            stroke="hsl(var(--sunrise-gold))"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
          />
          
          {/* AI circuit patterns along horizon */}
          {[...Array(12)].map((_, i) => (
            <motion.g key={i}>
              <motion.circle
                cx={60 + i * 120}
                cy={64}
                r="4"
                fill="hsl(var(--kerala-green))"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1 + i * 0.1 }}
              />
              <motion.line
                x1={60 + i * 120}
                y1={64}
                x2={60 + i * 120 + 60}
                y2={40 + (i % 2) * 48}
                stroke="hsl(var(--kerala-green) / 0.5)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.5 + i * 0.1, duration: 0.5 }}
              />
            </motion.g>
          ))}
        </svg>
      </div>

      {/* Silhouettes walking toward horizon */}
      <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 flex items-end gap-4 opacity-80">
        {[
          { emoji: "👧", size: "text-3xl", delay: 0.2 },
          { emoji: "👦", size: "text-4xl", delay: 0.4 },
          { emoji: "👨‍🏫", size: "text-5xl", delay: 0.6 },
          { emoji: "👩‍💼", size: "text-4xl", delay: 0.8 },
          { emoji: "🧓", size: "text-3xl", delay: 1 },
        ].map((person, i) => (
          <motion.span
            key={i}
            className={`${person.size} filter drop-shadow-lg`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: person.delay }}
            style={{ filter: "brightness(0.3)" }}
          >
            {person.emoji}
          </motion.span>
        ))}
      </div>

      {/* Quote content */}
      <div className="section-container relative z-10">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          {/* Quote marks */}
          <span className="text-8xl text-kerala-green/20 font-serif leading-none">"</span>
          
          <blockquote className="text-2xl md:text-4xl font-display font-light text-ink-black leading-relaxed -mt-12 mb-8">
            If we want machines to think, we need to teach them to{" "}
            <span className="text-kerala-green font-medium">see</span>.
          </blockquote>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-lg text-muted-foreground mb-1">
              — Dr. Fei-Fei Li
            </p>
            <p className="text-sm text-muted-foreground/70">
              Computer Scientist & AI Pioneer
            </p>
          </motion.div>

          {/* Separator */}
          <motion.div
            className="mt-12 flex items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            <div className="w-16 h-px bg-kerala-green/30" />
            <span className="text-kerala-green text-2xl">✦</span>
            <div className="w-16 h-px bg-kerala-green/30" />
          </motion.div>

          {/* Subtext */}
          <motion.p
            className="mt-8 text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
          >
            And in Kerala, we're teaching everyone to see the future—
            together, one learning circle at a time.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default QuoteSection;
