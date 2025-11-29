import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const PartnerSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const partnerTypes = [
    {
      title: "Educational Partners",
      description: "Schools, colleges, and universities spreading AI literacy",
      icon: "🎓",
      bgColor: "bg-backwater-blue/10",
      hoverBorder: "hover:border-backwater-blue/30",
    },
    {
      title: "Corporate Sponsors",
      description: "Companies investing in Kerala's AI future",
      icon: "🏢",
      bgColor: "bg-kerala-green/10",
      hoverBorder: "hover:border-kerala-green/30",
    },
    {
      title: "Community Organizations",
      description: "Local groups hosting learning circles",
      icon: "🤝",
      bgColor: "bg-sunrise-gold/10",
      hoverBorder: "hover:border-sunrise-gold/30",
    },
    {
      title: "Government Bodies",
      description: "Policy makers supporting the movement",
      icon: "🏛️",
      bgColor: "bg-sunset-purple/10",
      hoverBorder: "hover:border-sunset-purple/30",
    },
  ];

  return (
    <section ref={containerRef} className="relative py-24 bg-gradient-sand overflow-hidden">
      {/* Path background */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <path
            d="M0,50% Q25%,40% 50%,50% T100%,50%"
            fill="none"
            stroke="hsl(var(--kerala-green))"
            strokeWidth="2"
            strokeDasharray="10,10"
          />
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
            Grow With Us
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Every partnership plants a seed. Watch our community blossom.
          </p>
        </motion.div>

        {/* Growing stones path */}
        <div className="relative max-w-4xl mx-auto mb-16">
          {/* Path line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-soft-sand-dark/30 -translate-y-1/2" />

          {/* Stones */}
          <div className="flex justify-between items-center relative">
            {[0, 1, 2, 3, 4].map((index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, type: "spring" }}
              >
                {/* Stone */}
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-soft-sand-dark/50 flex items-center justify-center relative">
                  {/* Growing plant */}
                  <motion.div
                    className="absolute -top-8 left-1/2 -translate-x-1/2 text-2xl"
                    style={{
                      opacity: useTransform(
                        scrollYProgress,
                        [index * 0.15, (index + 1) * 0.15 + 0.1],
                        [0, 1]
                      ),
                      scale: useTransform(
                        scrollYProgress,
                        [index * 0.15, (index + 1) * 0.15 + 0.1],
                        [0.5, 1]
                      ),
                    }}
                  >
                    {index === 0 && "🌱"}
                    {index === 1 && "🌿"}
                    {index === 2 && "🌸"}
                    {index === 3 && "🌺"}
                    {index === 4 && "🌳"}
                  </motion.div>
                  
                  <span className="text-lg text-muted-foreground font-medium">
                    {index + 1}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Labels */}
          <div className="flex justify-between mt-4 text-xs md:text-sm text-muted-foreground text-center">
            <span className="w-16">Connect</span>
            <span className="w-16">Plan</span>
            <span className="w-16">Launch</span>
            <span className="w-16">Grow</span>
            <span className="w-16">Flourish</span>
          </div>
        </div>

        {/* Partner type cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {partnerTypes.map((partner, index) => (
            <motion.div
              key={partner.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`
                kerala-card group cursor-pointer
                hover:shadow-lg transition-all duration-300
                border-2 border-transparent ${partner.hoverBorder}
              `}
            >
              {/* Petal decoration */}
              <div className={`absolute -top-3 -right-3 w-12 h-12 rounded-full ${partner.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className="text-4xl mb-4">{partner.icon}</div>
              <h3 className="text-lg font-display font-bold text-ink-black mb-2">
                {partner.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {partner.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <button className="px-8 py-4 bg-kerala-green text-coconut-white rounded-full font-medium hover:bg-kerala-green-dark transition-colors shadow-glow-green">
            Become a Partner
          </button>
          <p className="text-sm text-muted-foreground mt-4">
            Join 50+ organizations already supporting AI for Everyone
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnerSection;
