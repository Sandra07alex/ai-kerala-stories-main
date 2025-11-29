import { motion } from "framer-motion";
import { Users, Heart, Package, Lightbulb } from "lucide-react";

const ActionHubSection = () => {
  const actions = [
    {
      title: "Host a Learning Circle",
      description: "Open your space for community learning sessions",
      icon: Users,
      illustration: "🏠",
      bgColor: "bg-kerala-green/10",
      hoverBg: "hover:bg-kerala-green",
      iconColor: "text-kerala-green",
      borderColor: "border-kerala-green/40",
    },
    {
      title: "Mentor & Volunteer",
      description: "Guide learners on their AI journey",
      icon: Heart,
      illustration: "🌳",
      bgColor: "bg-backwater-blue/10",
      hoverBg: "hover:bg-backwater-blue",
      iconColor: "text-backwater-blue-deep",
      borderColor: "border-backwater-blue/40",
    },
    {
      title: "Sponsor Toolkits",
      description: "Fund learning materials for communities",
      icon: Package,
      illustration: "🎒",
      bgColor: "bg-sunrise-orange/10",
      hoverBg: "hover:bg-sunrise-orange",
      iconColor: "text-sunrise-orange",
      borderColor: "border-sunrise-orange/40",
    },
    {
      title: "Submit Challenges",
      description: "Share real problems AI can help solve",
      icon: Lightbulb,
      illustration: "💡",
      bgColor: "bg-sunset-purple/10",
      hoverBg: "hover:bg-sunset-purple",
      iconColor: "text-sunset-purple",
      borderColor: "border-sunset-purple/40",
    },
  ];

  return (
    <section id="action" className="relative py-24 bg-coconut-white overflow-hidden">
      {/* Decorative stamps */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full border-4 border-dashed border-kerala-green/20 rotate-12" />
      <div className="absolute bottom-20 right-10 w-16 h-16 rounded-full border-4 border-dashed border-sunrise-gold/20 -rotate-6" />

      <div className="section-container relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-ink-black mb-4">
            Take Action
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Postcards from Kerala — each action makes a difference
          </p>
        </motion.div>

        {/* Action postcards grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 30, rotate: index % 2 === 0 ? -2 : 2 }}
                whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -1 : 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ rotate: 0, scale: 1.02 }}
                className="postcard group"
              >
                {/* Postcard header with stamp area */}
                <div className={`relative h-40 ${action.bgColor} flex items-center justify-center overflow-hidden`}>
                  {/* Large illustration */}
                  <span className="text-7xl opacity-50 group-hover:opacity-70 transition-opacity">
                    {action.illustration}
                  </span>

                  {/* Stamp */}
                  <div className="absolute top-3 right-3">
                    <div className={`w-12 h-14 ${action.bgColor} rounded flex items-center justify-center border-2 border-dashed ${action.borderColor}`}>
                      <Icon className={`w-6 h-6 ${action.iconColor}`} />
                    </div>
                  </div>

                  {/* Postmark circle */}
                  <div className="absolute bottom-3 left-3 opacity-30">
                    <div className="w-16 h-16 rounded-full border-2 border-ink-black flex items-center justify-center">
                      <span className="text-xs font-bold text-ink-black">KERALA</span>
                    </div>
                  </div>
                </div>

                {/* Postcard content */}
                <div className="p-6 bg-coconut-white">
                  {/* Dotted line for address */}
                  <div className="border-b border-dashed border-muted mb-4" />
                  
                  <h3 className="text-xl font-display font-bold text-ink-black mb-2">
                    {action.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {action.description}
                  </p>

                  {/* Action button styled as postcard element */}
                  <button className={`
                    w-full py-3 rounded-lg font-medium transition-all
                    ${action.bgColor} ${action.iconColor}
                    ${action.hoverBg} hover:text-coconut-white
                    border ${action.borderColor}
                  `}>
                    Get Started →
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional quick actions */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="text-muted-foreground">Quick links:</span>
          {["Download Resources", "Join Discord", "Newsletter", "FAQ"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-kerala-green hover:text-kerala-green-dark underline underline-offset-4"
            >
              {link}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ActionHubSection;
