import { useState } from "react";
import { motion } from "framer-motion";

interface Photo {
  id: string;
  src: string;
  caption: string;
  date: string;
  rotation: number;
}

const GallerySection = () => {
  const [hoveredPhoto, setHoveredPhoto] = useState<string | null>(null);

  // Placeholder photos with emoji representations
  const photos: Photo[] = [
    { id: "1", src: "🎓", caption: "First workshop in Kochi", date: "Jan 2024", rotation: -3 },
    { id: "2", src: "👨‍👩‍👧‍👦", caption: "Community circle, Alappuzha", date: "Feb 2024", rotation: 2 },
    { id: "3", src: "🤖", caption: "KuttyMakers day!", date: "Mar 2024", rotation: -2 },
    { id: "4", src: "📚", caption: "Teacher training", date: "Mar 2024", rotation: 4 },
    { id: "5", src: "🎉", caption: "100 learners milestone", date: "Apr 2024", rotation: -1 },
    { id: "6", src: "🌴", caption: "Outdoor session, Kozhikode", date: "May 2024", rotation: 3 },
    { id: "7", src: "👩‍💻", caption: "Women in AI workshop", date: "Jun 2024", rotation: -4 },
    { id: "8", src: "🎨", caption: "AI Art exhibition", date: "Jul 2024", rotation: 1 },
  ];

  return (
    <section className="relative py-24 cork-board overflow-hidden">
      {/* Paper texture overlay */}
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,...')] pointer-events-none" />

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-4xl rotate-12 opacity-30">📌</div>
      <div className="absolute bottom-20 right-20 text-4xl -rotate-6 opacity-30">📌</div>

      <div className="section-container relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-ink-black mb-4">
            Memories
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Moments that made our journey special
          </p>
        </motion.div>

        {/* Cork board with photos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="relative"
              style={{ transform: `rotate(${photo.rotation}deg)` }}
              onMouseEnter={() => setHoveredPhoto(photo.id)}
              onMouseLeave={() => setHoveredPhoto(null)}
            >
              {/* Polaroid frame */}
              <motion.div
                className="bg-coconut-white p-3 pb-12 rounded shadow-card cursor-pointer relative"
                whileHover={{ 
                  scale: 1.05, 
                  rotate: 0,
                  zIndex: 10,
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Pin */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-kerala-green shadow-sm" />

                {/* Photo area */}
                <div className={`
                  aspect-square rounded overflow-hidden
                  flex items-center justify-center text-6xl
                  transition-all duration-300
                  ${hoveredPhoto === photo.id ? "bg-kerala-green/10" : "bg-muted grayscale"}
                `}>
                  {photo.src}
                </div>

                {/* Caption area */}
                <div className="absolute bottom-2 left-0 right-0 text-center">
                  <p className="text-xs font-medium text-ink-black">{photo.caption}</p>
                  <p className="text-xs text-muted-foreground">{photo.date}</p>
                </div>

                {/* Washi tape decoration */}
                <div 
                  className="absolute -top-1 left-1/4 w-12 h-3 bg-backwater-blue/50 rotate-[-5deg]"
                  style={{ clipPath: "polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)" }}
                />
              </motion.div>

              {/* Handwritten note (shown on hover) */}
              {hoveredPhoto === photo.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-8 left-0 right-0 text-center"
                >
                  <span className="text-xs italic text-muted-foreground bg-sunrise-gold/20 px-2 py-1 rounded">
                    ❤️ {photo.date}
                  </span>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Doodles around edges */}
        <div className="absolute bottom-10 left-1/4 opacity-20">
          <svg width="100" height="50" viewBox="0 0 100 50">
            <path
              d="M10,25 Q30,5 50,25 T90,25"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-kerala-green"
            />
          </svg>
        </div>

        {/* Add more photos CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <button className="px-6 py-3 bg-kerala-green/10 text-kerala-green border-2 border-dashed border-kerala-green rounded-lg font-medium hover:bg-kerala-green hover:text-coconut-white transition-colors">
            + Share Your Memories
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default GallerySection;
