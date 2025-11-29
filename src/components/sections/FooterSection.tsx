import { motion } from "framer-motion";
import { Twitter, Instagram, Youtube, Linkedin, Mail } from "lucide-react";

const FooterSection = () => {
  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  const footerLinks = {
    "Get Involved": ["Host a Circle", "Volunteer", "Partner", "Sponsor"],
    "Resources": ["Toolkits", "Guides", "Research", "Blog"],
    "Community": ["Discord", "Events", "Stories", "Gallery"],
    "About": ["Mission", "Team", "Press", "Contact"],
  };

  return (
    <footer className="relative bg-gradient-night overflow-hidden">
      {/* Backwater scene */}
      <div className="absolute inset-0">
        {/* Water reflection */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-1/2"
          style={{
            background: "linear-gradient(180deg, transparent 0%, hsl(204 60% 15% / 0.5) 100%)",
          }}
        />

        {/* Moon */}
        <motion.div
          className="absolute top-20 right-1/4 w-16 h-16 rounded-full bg-coconut-white/90"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            boxShadow: "0 0 60px 20px hsl(var(--coconut-white) / 0.3)",
          }}
        />

        {/* Moon reflection in water */}
        <div className="absolute bottom-1/4 right-1/4 w-16 h-8 rounded-full bg-coconut-white/10 blur-sm" />

        {/* Fireflies / AI nodes */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60 + 10}%`,
              backgroundColor: i % 3 === 0 
                ? "hsl(var(--kerala-green))" 
                : "hsl(var(--firefly))",
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Palm tree silhouettes */}
        <div className="absolute bottom-0 left-10 text-7xl opacity-20 rotate-[-10deg]">🌴</div>
        <div className="absolute bottom-0 right-20 text-6xl opacity-15 rotate-[5deg]">🌴</div>
      </div>

      <div className="section-container relative z-10 py-16">
        {/* Main footer content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-display font-bold text-coconut-white mb-4">
              AI for <span className="text-kerala-green">Everyone</span>
            </h3>
            <p className="text-backwater-blue/70 mb-6 max-w-xs">
              A people's movement to bring AI literacy to every corner of Kerala.
            </p>
            
            {/* Social links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-coconut-white/10 flex items-center justify-center text-coconut-white/70 hover:bg-kerala-green hover:text-coconut-white transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-display font-semibold text-coconut-white mb-4">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-backwater-blue/60 hover:text-kerala-green transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Enabled by TinkerHub */}
        <div className="border-t border-coconut-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-backwater-blue/50 text-sm">Enabled by</span>
            <span className="text-coconut-white font-display font-semibold">
              TinkerHub
            </span>
          </div>

          <p className="text-backwater-blue/40 text-sm text-center md:text-right">
            © 2024 AI for Everyone. Made with ❤️ in Kerala.
          </p>
        </div>

        {/* Malayalam blessing */}
        <motion.p
          className="text-center mt-8 text-backwater-blue/30 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          എല്ലാവർക്കും നന്മ • Goodness to all
        </motion.p>
      </div>
    </footer>
  );
};

export default FooterSection;
