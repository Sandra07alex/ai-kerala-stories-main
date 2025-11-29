import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Location {
  id: string;
  name: string;
  x: number;
  y: number;
  learners: number;
  workshops: number;
  highlight: string;
}

const ImpactMapSection = () => {
  const [activeLocation, setActiveLocation] = useState<string | null>(null);

  const locations: Location[] = [
    { id: "tvpm", name: "Thiruvananthapuram", x: 35, y: 85, learners: 450, workshops: 8, highlight: "Capital hub" },
    { id: "ekm", name: "Ernakulam", x: 55, y: 55, learners: 380, workshops: 6, highlight: "Tech corridor" },
    { id: "kzd", name: "Kozhikode", x: 40, y: 25, learners: 290, workshops: 5, highlight: "Education center" },
    { id: "alp", name: "Alappuzha", x: 40, y: 65, learners: 180, workshops: 4, highlight: "Women-led circles" },
    { id: "ktm", name: "Kottayam", x: 50, y: 60, learners: 220, workshops: 4, highlight: "Student hub" },
    { id: "tsr", name: "Thrissur", x: 48, y: 42, learners: 260, workshops: 5, highlight: "Cultural bridge" },
  ];

  const totalLearners = locations.reduce((sum, loc) => sum + loc.learners, 0);
  const totalWorkshops = locations.reduce((sum, loc) => sum + loc.workshops, 0);

  return (
    <section className="relative py-24 bg-gradient-night overflow-hidden">
      {/* Stars background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-coconut-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="section-container relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-coconut-white mb-4">
            Impact Across Kerala
          </h2>
          <p className="text-xl text-backwater-blue/80 max-w-2xl mx-auto">
            A growing neural network of learning communities
          </p>
        </motion.div>

        {/* Stats row */}
        <div className="flex justify-center gap-8 md:gap-16 mb-12">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-4xl md:text-5xl font-display font-bold text-kerala-green">
              {totalLearners.toLocaleString()}+
            </div>
            <div className="text-backwater-blue/60 text-sm">Learners</div>
          </motion.div>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-4xl md:text-5xl font-display font-bold text-sunrise-gold">
              {totalWorkshops}+
            </div>
            <div className="text-backwater-blue/60 text-sm">Workshops</div>
          </motion.div>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-4xl md:text-5xl font-display font-bold text-backwater-blue">
              14
            </div>
            <div className="text-backwater-blue/60 text-sm">Districts</div>
          </motion.div>
        </div>

        {/* Map container */}
        <div className="relative max-w-2xl mx-auto">
          {/* Kerala map SVG with neural network */}
          <svg viewBox="0 0 100 120" className="w-full h-auto">
            {/* Kerala outline - accurate shape with undulating western coastline */}
            {/* Path: narrow vertical strip, wider in middle, undulating western coast (right side), straighter eastern border (left side) */}
            {/* Western coast has detailed undulations with curves bulging outward and inward, eastern border is relatively straight */}
            <motion.path
              d="M 12,2 
                 C 14,2.5 16.8,4.5 19.2,7.5
                 C 21.6,10.5 21.8,14 21.7,18
                 C 21.6,22 21.4,26.5 21.9,31
                 C 22.4,35.5 22.3,40 22.7,44.5
                 C 23.1,49 23.2,53.5 23.3,58
                 C 23.4,62.5 23.5,67 23.9,71.5
                 C 24.3,76 24.1,80.5 24.5,85
                 C 24.9,89.5 24.8,94 25.1,98.5
                 C 25.4,103 25.3,107.5 25.5,111
                 C 25.5,114 25.2,116 24,117
                 C 22.8,118 20.5,118 18,117.5
                 C 15.5,117 13.5,115.5 12,113.5
                 C 10.5,111.5 9.5,109 9,106
                 C 8.5,103 8,99.5 7.5,96
                 C 7,92.5 6.5,89 6,85.5
                 C 5.5,82 5,78.5 4.5,75
                 C 4,71.5 3.5,68 3,64.5
                 C 2.5,61 2,57.5 1.5,54
                 C 1,50.5 0.5,47 0,43.5
                 C 0,40 0,36.5 0,33
                 C 0,29.5 0.5,26 1,22.5
                 C 1.5,19 2,15.5 2.5,12
                 C 3,8.5 4,5.5 5.5,3.5
                 C 7,1.5 9.5,1 11.5,1.5
                 C 11.75,1.75 12,1.75 12,2 Z"
              fill="none"
              stroke="hsl(var(--kerala-green))"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />

            {/* Inner glow fill */}
            <motion.path
              d="M 12,2 
                 C 14,2.5 16.8,4.5 19.2,7.5
                 C 21.6,10.5 21.8,14 21.7,18
                 C 21.6,22 21.4,26.5 21.9,31
                 C 22.4,35.5 22.3,40 22.7,44.5
                 C 23.1,49 23.2,53.5 23.3,58
                 C 23.4,62.5 23.5,67 23.9,71.5
                 C 24.3,76 24.1,80.5 24.5,85
                 C 24.9,89.5 24.8,94 25.1,98.5
                 C 25.4,103 25.3,107.5 25.5,111
                 C 25.5,114 25.2,116 24,117
                 C 22.8,118 20.5,118 18,117.5
                 C 15.5,117 13.5,115.5 12,113.5
                 C 10.5,111.5 9.5,109 9,106
                 C 8.5,103 8,99.5 7.5,96
                 C 7,92.5 6.5,89 6,85.5
                 C 5.5,82 5,78.5 4.5,75
                 C 4,71.5 3.5,68 3,64.5
                 C 2.5,61 2,57.5 1.5,54
                 C 1,50.5 0.5,47 0,43.5
                 C 0,40 0,36.5 0,33
                 C 0,29.5 0.5,26 1,22.5
                 C 1.5,19 2,15.5 2.5,12
                 C 3,8.5 4,5.5 5.5,3.5
                 C 7,1.5 9.5,1 11.5,1.5
                 C 11.75,1.75 12,1.75 12,2 Z"
              fill="url(#keralaGradient)"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.3 }}
              viewport={{ once: true }}
              transition={{ delay: 1 }}
            />

            {/* Neural network connections */}
            {locations.map((loc, i) =>
              locations.slice(i + 1).map((loc2, j) => {
                const distance = Math.sqrt(
                  Math.pow(loc.x - loc2.x, 2) + Math.pow(loc.y - loc2.y, 2)
                );
                if (distance < 35) {
                  return (
                    <motion.line
                      key={`${loc.id}-${loc2.id}`}
                      x1={loc.x}
                      y1={loc.y}
                      x2={loc2.x}
                      y2={loc2.y}
                      stroke="hsl(var(--kerala-green) / 0.4)"
                      strokeWidth="0.5"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.5 + (i + j) * 0.1, duration: 0.5 }}
                    />
                  );
                }
                return null;
              })
            )}

            {/* Location nodes */}
            {locations.map((loc, i) => (
              <motion.g
                key={loc.id}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 2 + i * 0.1, type: "spring" }}
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setActiveLocation(loc.id)}
                onMouseLeave={() => setActiveLocation(null)}
              >
                {/* Pulse ring */}
                <motion.circle
                  cx={loc.x}
                  cy={loc.y}
                  r="4"
                  fill="none"
                  stroke="hsl(var(--kerala-green))"
                  strokeWidth="0.5"
                  animate={{
                    r: [4, 8, 4],
                    opacity: [0.8, 0, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
                
                {/* Main node */}
                <circle
                  cx={loc.x}
                  cy={loc.y}
                  r="3"
                  fill="hsl(var(--kerala-green))"
                  className="transition-all duration-300"
                  style={{
                    filter: activeLocation === loc.id 
                      ? "drop-shadow(0 0 10px hsl(var(--kerala-green)))" 
                      : "none",
                  }}
                />

                {/* Inner glow */}
                <circle
                  cx={loc.x}
                  cy={loc.y}
                  r="1.5"
                  fill="hsl(var(--coconut-white))"
                />
              </motion.g>
            ))}

            {/* Gradient definition */}
            <defs>
              <radialGradient id="keralaGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="hsl(var(--kerala-green))" stopOpacity="0.4" />
                <stop offset="100%" stopColor="hsl(var(--kerala-green))" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>

          {/* Location info popup */}
          <AnimatePresence>
            {activeLocation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute glass-card bg-card/95 p-4 rounded-xl shadow-lg"
                style={{
                  left: `${locations.find(l => l.id === activeLocation)!.x}%`,
                  top: `${locations.find(l => l.id === activeLocation)!.y}%`,
                  transform: "translate(-50%, -120%)",
                }}
              >
                {(() => {
                  const loc = locations.find(l => l.id === activeLocation)!;
                  return (
                    <>
                      <h4 className="font-display font-bold text-ink-black mb-2">
                        {loc.name}
                      </h4>
                      <div className="space-y-1 text-sm">
                        <p className="text-muted-foreground">
                          <span className="text-kerala-green font-medium">{loc.learners}</span> learners
                        </p>
                        <p className="text-muted-foreground">
                          <span className="text-sunrise-gold font-medium">{loc.workshops}</span> workshops
                        </p>
                        <p className="text-xs text-backwater-blue italic mt-2">
                          {loc.highlight}
                        </p>
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-8 text-sm text-backwater-blue/60">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-kerala-green animate-pulse-soft" />
            <span>Learning Circle</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-px bg-kerala-green/50" />
            <span>Connected Communities</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactMapSection;
