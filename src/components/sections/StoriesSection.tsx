import { useState } from "react";
import { motion } from "framer-motion";

interface Story {
  id: string;
  name: string;
  emoji: string;
  title: string;
  frames: string[];
  bgColor: string;
  borderColor: string;
  badgeBg: string;
}

const StoriesSection = () => {
  const [activeStory, setActiveStory] = useState<string | null>(null);

  const stories: Story[] = [
    {
      id: "rahul",
      name: "Rahul",
      emoji: "🚆",
      title: "The Seat Hacker",
      frames: [
        "Standing in crowded train, exhausted after work...",
        "\"Hey AI, when's the next station with empty seats?\"",
        "Now sitting by the window, watching Kerala pass by 🌅",
      ],
      bgColor: "bg-backwater-blue/20",
      borderColor: "border-backwater-blue",
      badgeBg: "bg-backwater-blue",
    },
    {
      id: "sandra",
      name: "Sandra",
      emoji: "🌞",
      title: "The Sunlight Predictor",
      frames: [
        "Squinting at harsh afternoon sun while reading...",
        "\"What angle will the sun be at 5pm?\"",
        "Perfect reading spot found, golden hour glow ✨",
      ],
      bgColor: "bg-sunrise-gold/20",
      borderColor: "border-sunrise-gold",
      badgeBg: "bg-sunrise-gold",
    },
    {
      id: "akshay",
      name: "Akshay",
      emoji: "🍳",
      title: "The Budget Cook",
      frames: [
        "₹60 in pocket, hungry stomach...",
        "\"What can I make with eggs, rice, and onion?\"",
        "Proud chef with delicious egg fried rice! 😋",
      ],
      bgColor: "bg-kerala-green/20",
      borderColor: "border-kerala-green",
      badgeBg: "bg-kerala-green",
    },
    {
      id: "meera",
      name: "Meera",
      emoji: "📝",
      title: "The Homework Helper",
      frames: [
        "Stuck on math problem at midnight...",
        "\"Explain this step by step, like I'm 10\"",
        "Finally understanding, ready for tomorrow! 💡",
      ],
      bgColor: "bg-sunset-purple/20",
      borderColor: "border-sunset-purple",
      badgeBg: "bg-sunset-purple",
    },
  ];

  return (
    <section className="relative py-24 bg-coconut-white overflow-hidden watercolor-bg">
      {/* Malayalam decorative text */}
      <div className="malayalam-shadow right-0 top-1/4 rotate-[15deg]">
        കഥകൾ
      </div>

      <div className="section-container relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-ink-black mb-4">
            Daily Life AI Stories
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real moments where AI made a difference in Kerala lives
          </p>
        </motion.div>

        {/* Story cards grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`
                relative group cursor-pointer
                bg-card rounded-2xl overflow-hidden
                border-2 border-dashed border-muted
                transition-all duration-300
                hover:shadow-card
              `}
              onClick={() => setActiveStory(activeStory === story.id ? null : story.id)}
            >
              {/* Watercolor background effect */}
              <div
                className={`absolute inset-0 opacity-20 ${story.bgColor}`}
              />

              <div className="relative p-6">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${story.bgColor} text-3xl`}>
                    {story.emoji}
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-ink-black">
                      {story.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {story.name}'s story
                    </p>
                  </div>
                </div>

                {/* Comic frames */}
                <div className="space-y-3">
                  {story.frames.map((frame, frameIndex) => (
                    <motion.div
                      key={frameIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: frameIndex * 0.1 }}
                      className={`
                        relative p-4 rounded-xl
                        ${frameIndex === 1 
                          ? `${story.bgColor} border-l-4 ${story.borderColor}` 
                          : "bg-muted/50"
                        }
                      `}
                    >
                      {/* Frame number */}
                      <span className={`
                        absolute -left-2 -top-2 w-6 h-6 rounded-full 
                        ${story.badgeBg} text-coconut-white text-xs
                        flex items-center justify-center font-bold
                      `}>
                        {frameIndex + 1}
                      </span>

                      <p className={`
                        text-sm leading-relaxed
                        ${frameIndex === 1 ? "font-medium text-ink-black italic" : "text-muted-foreground"}
                      `}>
                        {frame}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Sketchy edges decoration */}
                <svg className="absolute bottom-2 right-2 w-16 h-16 opacity-10">
                  <path
                    d="M5,5 Q15,0 25,5 T45,5 M5,15 Q20,10 35,15 T55,15"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    className="text-ink-black"
                  />
                </svg>
              </div>

              {/* Tape decoration */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-soft-sand/80 rotate-[-2deg] rounded-sm" />
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground mb-4">
            Have your own AI story? We'd love to hear it!
          </p>
          <button className="px-6 py-3 bg-kerala-green text-coconut-white rounded-full font-medium hover:bg-kerala-green-dark transition-colors">
            Share Your Story
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default StoriesSection;
