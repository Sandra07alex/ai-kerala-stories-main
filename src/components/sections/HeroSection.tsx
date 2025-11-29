/**
 * HeroKerala - "The Dawn of AI in Kerala"
 * 
 * A cinematic, Kerala-inspired hero section featuring:
 * - Layered SVG silhouettes (coconut trees, backwaters, boat)
 * - Subtle cursor ripple effects
 * - Soft ambient glow following cursor
 * - Parallax movement on layers
 * - Cinematic reveal animation sequence
 * 
 * Integration:
 * ```tsx
 * <HeroSection />
 * ```
 * 
 * Accessibility:
 * - Respects prefers-reduced-motion
 * - Motion toggle with localStorage persistence
 * - Keyboard accessible controls
 * - ARIA labels throughout
 */

import { useEffect, useRef, useState, useCallback } from "react";

// Configuration
interface HeroConfig {
  rippleMaxRadius: number;
  rippleOpacity: number;
  rippleLife: number;
  maxRipples: number;
  minCursorSpeed: number;
  glowBaseSize: number;
  glowSmoothing: number;
  parallaxStrength: {
    fg: number;
    mid: number;
    bg: number;
  };
}

const CONFIG: HeroConfig = {
  rippleMaxRadius: 120,
  rippleOpacity: 0.4,
  rippleLife: 550,
  maxRipples: 8,
  minCursorSpeed: 2, // Lower threshold for more ripples
  glowBaseSize: 100,
  glowSmoothing: 0.12,
  parallaxStrength: {
    fg: 0.025,
    mid: 0.015,
    bg: 0.008,
  },
};

interface Ripple {
  x: number;
  y: number;
  startTime: number;
  amplitude: number;
  life: number;
}

// Cubic ease-out: fast start, slow finish
const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

// Linear interpolation
const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<SVGSVGElement>(null);
  const midRef = useRef<SVGSVGElement>(null);
  const bgRef = useRef<SVGSVGElement>(null);
  const neuralRef = useRef<SVGSVGElement>(null);

  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const ripplesRef = useRef<Ripple[]>([]);
  const cursorRef = useRef({ x: 0, y: 0 });
  const prevCursorRef = useRef({ x: 0, y: 0 });
  const glowPosRef = useRef({ x: 0, y: 0 });
  const isInsideRef = useRef(false);
  const lastRippleTimeRef = useRef(0);

  const [motionEnabled, setMotionEnabled] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile and motion preferences
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stored = localStorage.getItem("kerala-hero-motion");
    
    if (stored !== null) {
      setMotionEnabled(stored === "true");
    } else {
      setMotionEnabled(!mediaQuery.matches);
    }

    const handler = (e: MediaQueryListEvent) => {
      if (localStorage.getItem("kerala-hero-motion") === null) {
        setMotionEnabled(!e.matches);
      }
    };
    mediaQuery.addEventListener("change", handler);

    return () => {
      window.removeEventListener("resize", checkMobile);
      mediaQuery.removeEventListener("change", handler);
    };
  }, []);

  // Cinematic reveal sequence
  useEffect(() => {
    // Start reveal at 2 seconds
    const timer = setTimeout(() => {
      setRevealed(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const toggleMotion = useCallback(() => {
    setMotionEnabled((prev) => {
      const next = !prev;
      localStorage.setItem("kerala-hero-motion", String(next));
      return next;
    });
  }, []);

  // Canvas setup with DPI scaling
  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = heroRef.current;
    if (!canvas || !hero) return;

    const resize = () => {
      const rect = hero.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Main animation loop
  useEffect(() => {
    if (!motionEnabled) {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      if (glowRef.current) {
        glowRef.current.classList.remove("visible");
      }
      // Reset parallax
      [fgRef, midRef, bgRef, neuralRef].forEach((ref) => {
        if (ref.current) ref.current.style.transform = "";
      });
      return;
    }

    const canvas = canvasRef.current;
    const glow = glowRef.current;
    const hero = heroRef.current;
    if (!canvas || !hero) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = (timestamp: number) => {
      const deltaTime = lastTimeRef.current ? timestamp - lastTimeRef.current : 16.67;
      lastTimeRef.current = timestamp;

      const rect = hero.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Clear canvas
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Update and render ripples
      const now = timestamp;
      ripplesRef.current = ripplesRef.current.filter((ripple) => {
        const elapsed = now - ripple.startTime;
        const progress = elapsed / ripple.life;
        if (progress >= 1) return false;

        const easedProgress = easeOutCubic(progress);
        const radius = easedProgress * CONFIG.rippleMaxRadius;
        let opacity = (1 - easedProgress) * CONFIG.rippleOpacity * ripple.amplitude;

        // Extra fade when pointer leaves
        if (!isInsideRef.current) {
          opacity *= Math.max(0, 1 - progress * 2);
        }

        // Draw ripple with enhanced golden gradient
        ctx.save();
        ctx.globalCompositeOperation = "lighter";

        // Main ripple glow
        const gradient = ctx.createRadialGradient(
          ripple.x, ripple.y, 0,
          ripple.x, ripple.y, radius
        );
        gradient.addColorStop(0, `rgba(255, 220, 140, ${opacity * 1.2})`);
        gradient.addColorStop(0.3, `rgba(255, 210, 127, ${opacity})`);
        gradient.addColorStop(0.6, `rgba(242, 190, 100, ${opacity * 0.6})`);
        gradient.addColorStop(1, "rgba(255, 200, 100, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, radius, 0, Math.PI * 2);
        ctx.fill();

        // Inner bright ring for extra visibility
        if (opacity > 0.1) {
          ctx.strokeStyle = `rgba(255, 230, 160, ${opacity * 0.8})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, radius * 0.4, 0, Math.PI * 2);
          ctx.stroke();
          
          // Outer soft ring
          ctx.strokeStyle = `rgba(255, 215, 130, ${opacity * 0.4})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, radius * 0.7, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.restore();

        return true;
      });

      // Update glow with smooth lerp and dynamic size
      if (glow && !isMobile) {
        const targetX = cursorRef.current.x;
        const targetY = cursorRef.current.y;

        glowPosRef.current.x = lerp(glowPosRef.current.x, targetX, CONFIG.glowSmoothing);
        glowPosRef.current.y = lerp(glowPosRef.current.y, targetY, CONFIG.glowSmoothing);

        // Dynamic glow size based on cursor speed
        const dx = targetX - glowPosRef.current.x;
        const dy = targetY - glowPosRef.current.y;
        const speed = Math.sqrt(dx * dx + dy * dy);
        const size = Math.min(160, Math.max(CONFIG.glowBaseSize, CONFIG.glowBaseSize + speed * 3));
        
        glow.style.width = `${size}px`;
        glow.style.height = `${size}px`;
        glow.style.transform = `translate(${glowPosRef.current.x - size / 2}px, ${glowPosRef.current.y - size / 2}px)`;
        
        if (isInsideRef.current) {
          glow.classList.add("visible");
        } else {
          glow.classList.remove("visible");
        }
      }

      // Update parallax on layers
      const offsetX = cursorRef.current.x - centerX;
      const offsetY = cursorRef.current.y - centerY;

      if (fgRef.current) {
        const x = Math.max(-16, Math.min(16, offsetX * CONFIG.parallaxStrength.fg));
        const y = Math.max(-16, Math.min(16, offsetY * CONFIG.parallaxStrength.fg));
        fgRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
      if (midRef.current) {
        const x = Math.max(-12, Math.min(12, offsetX * CONFIG.parallaxStrength.mid));
        const y = Math.max(-12, Math.min(12, offsetY * CONFIG.parallaxStrength.mid));
        midRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
      if (bgRef.current) {
        const x = Math.max(-8, Math.min(8, offsetX * CONFIG.parallaxStrength.bg));
        const y = Math.max(-8, Math.min(8, offsetY * CONFIG.parallaxStrength.bg));
        bgRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
      if (neuralRef.current) {
        const x = Math.max(-6, Math.min(6, offsetX * 0.005));
        const y = Math.max(-6, Math.min(6, offsetY * 0.005));
        neuralRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [motionEnabled, isMobile]);

  // Pointer handlers
  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!motionEnabled || isMobile) return;

      const hero = heroRef.current;
      if (!hero) return;

      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate cursor speed
      const dx = x - prevCursorRef.current.x;
      const dy = y - prevCursorRef.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      prevCursorRef.current = { x, y };
      cursorRef.current = { x, y };

      // Only create ripple if cursor is moving fast enough
      const now = performance.now();
      if (speed < CONFIG.minCursorSpeed) return;
      if (now - lastRippleTimeRef.current < 50) return; // Throttle
      lastRippleTimeRef.current = now;

      const ripples = ripplesRef.current;
      if (ripples.length >= CONFIG.maxRipples) {
        ripples.shift();
      }

      ripples.push({
        x,
        y,
        startTime: now,
        amplitude: Math.min(1, speed / 20),
        life: CONFIG.rippleLife,
      });
    },
    [motionEnabled, isMobile]
  );

  const handlePointerEnter = useCallback(() => {
    isInsideRef.current = true;
  }, []);

  const handlePointerLeave = useCallback(() => {
    isInsideRef.current = false;
  }, []);

  // Touch: single soft ripple on tap
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!motionEnabled) return;

      const hero = heroRef.current;
      if (!hero || e.touches.length !== 1) return;

      const rect = hero.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      const ripples = ripplesRef.current;
      if (ripples.length >= CONFIG.maxRipples) {
        ripples.shift();
      }

      ripples.push({
        x,
        y,
        startTime: performance.now(),
        amplitude: 0.6,
        life: CONFIG.rippleLife * 0.8,
      });

      cursorRef.current = { x, y };
    },
    [motionEnabled]
  );

  return (
    <section
      ref={heroRef}
      className="hero-kerala"
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onTouchStart={handleTouchStart}
      aria-label="The Dawn of AI in Kerala - Interactive hero section"
    >
      {/* Sky gradient */}
      <div className={`kerala-sky ${revealed ? "revealed" : ""}`} />

      {/* Sunrise ambient glow */}
      <div className={`sunrise-glow ${revealed ? "revealed" : ""}`} />

      {/* Sunrise line */}
      <div className={`sunrise-line ${revealed ? "revealed" : ""}`} />

      {/* Neural lines - extremely subtle */}
      <svg
        ref={neuralRef}
        className={`neural-layer ${revealed ? "revealed" : ""} ${motionEnabled ? "animate-neural-breathe" : ""}`}
        viewBox="0 0 1000 800"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="neural-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(230, 35%, 25%)" stopOpacity="0.4" />
            <stop offset="50%" stopColor="hsl(42, 70%, 55%)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="hsl(230, 35%, 25%)" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <g stroke="url(#neural-grad)" fill="none" strokeWidth="0.8">
          <path d="M0,300 Q200,250 400,300 T800,280 T1000,320" />
          <path d="M0,400 Q250,350 500,400 T1000,380" />
          <path d="M100,350 Q200,300 350,330" />
          <path d="M600,380 Q750,320 900,360" />
          <circle cx="400" cy="300" r="2" fill="hsl(42, 70%, 55%)" opacity="0.3" />
          <circle cx="700" cy="350" r="2" fill="hsl(42, 70%, 55%)" opacity="0.25" />
        </g>
      </svg>

      {/* Background layer - distant hills/horizon */}
      <svg
        ref={bgRef}
        className={`kerala-layer kerala-bg-layer ${revealed ? "revealed" : ""}`}
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="bg-hill-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(230, 30%, 15%)" />
            <stop offset="100%" stopColor="hsl(230, 30%, 10%)" />
          </linearGradient>
        </defs>
        {/* Distant hills silhouette */}
        <path
          d="M0,750 Q200,680 400,720 Q600,650 800,700 Q1000,640 1200,690 Q1400,650 1600,680 Q1800,640 1920,700 L1920,1080 L0,1080 Z"
          fill="url(#bg-hill-grad)"
        />
      </svg>

      {/* Midground layer - backwaters + boat */}
      <svg
        ref={midRef}
        className={`kerala-layer kerala-mid-layer ${revealed ? "revealed" : ""}`}
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="water-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(210, 40%, 18%)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="hsl(210, 35%, 12%)" />
          </linearGradient>
          <linearGradient id="boat-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(230, 25%, 14%)" />
            <stop offset="100%" stopColor="hsl(230, 30%, 8%)" />
          </linearGradient>
        </defs>
        
        {/* Backwater curves */}
        <path
          d="M0,820 Q300,800 600,830 Q900,800 1200,820 Q1500,790 1920,810 L1920,1080 L0,1080 Z"
          fill="url(#water-grad)"
          className={motionEnabled ? "animate-water-shimmer" : ""}
        />
        
        {/* Water reflection lines */}
        <path
          d="M200,860 Q400,855 600,862"
          stroke="hsl(42, 90%, 70%)"
          strokeWidth="1"
          fill="none"
          opacity="0.15"
        />
        <path
          d="M800,850 Q1000,845 1200,855"
          stroke="hsl(42, 90%, 70%)"
          strokeWidth="0.8"
          fill="none"
          opacity="0.12"
        />
        
        {/* Traditional Kerala boat (Kettuvallam) */}
        <g transform="translate(1200, 790)">
          {/* Boat hull */}
          <path
            d="M0,50 Q50,65 120,50 Q140,48 150,55 Q155,60 140,65 Q70,75 0,65 Q-10,60 0,50 Z"
            fill="url(#boat-grad)"
          />
          {/* Boat roof structure */}
          <path
            d="M30,50 L30,25 Q75,10 120,25 L120,50"
            fill="hsl(230, 28%, 12%)"
          />
          {/* Roof thatch texture */}
          <path
            d="M35,45 L35,28 Q75,15 115,28 L115,45"
            fill="hsl(230, 25%, 16%)"
          />
          {/* Small pole */}
          <rect x="70" y="5" width="2" height="20" fill="hsl(230, 20%, 20%)" />
        </g>
      </svg>

      {/* Foreground layer - coconut trees + riverbank */}
      <svg
        ref={fgRef}
        className={`kerala-layer kerala-fg-layer ${revealed ? "revealed" : ""}`}
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="tree-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(230, 30%, 10%)" />
            <stop offset="100%" stopColor="hsl(230, 35%, 6%)" />
          </linearGradient>
          <linearGradient id="bank-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(230, 30%, 8%)" />
            <stop offset="100%" stopColor="hsl(230, 35%, 5%)" />
          </linearGradient>
        </defs>
        
        {/* Riverbank */}
        <path
          d="M0,900 Q100,880 200,895 Q400,870 600,890 L600,1080 L0,1080 Z"
          fill="url(#bank-grad)"
        />
        <path
          d="M1400,880 Q1600,860 1800,875 Q1900,865 1920,870 L1920,1080 L1400,1080 Z"
          fill="url(#bank-grad)"
        />
        
        {/* Left coconut tree cluster */}
        <g transform="translate(80, 0)">
          {/* Tree 1 - main tall tree */}
          <path
            d="M50,900 Q55,750 60,600 Q62,550 58,500"
            stroke="url(#tree-grad)"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
          />
          {/* Fronds */}
          <g transform="translate(58, 500)">
            <path d="M0,0 Q-60,-20 -100,30" stroke="hsl(230, 30%, 10%)" strokeWidth="3" fill="none" />
            <path d="M0,0 Q-70,10 -90,60" stroke="hsl(230, 30%, 10%)" strokeWidth="3" fill="none" />
            <path d="M0,0 Q-40,-40 -60,-20" stroke="hsl(230, 30%, 10%)" strokeWidth="3" fill="none" />
            <path d="M0,0 Q60,-30 100,20" stroke="hsl(230, 30%, 10%)" strokeWidth="3" fill="none" />
            <path d="M0,0 Q70,0 95,50" stroke="hsl(230, 30%, 10%)" strokeWidth="3" fill="none" />
            <path d="M0,0 Q30,-50 50,-35" stroke="hsl(230, 30%, 10%)" strokeWidth="3" fill="none" />
            <path d="M0,0 Q0,-60 -10,-40" stroke="hsl(230, 30%, 10%)" strokeWidth="3" fill="none" />
          </g>
          
          {/* Tree 2 - shorter, slightly bent */}
          <path
            d="M-20,900 Q-10,800 0,700 Q10,650 5,620"
            stroke="url(#tree-grad)"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
          />
          <g transform="translate(5, 620)">
            <path d="M0,0 Q-50,-15 -80,25" stroke="hsl(230, 30%, 10%)" strokeWidth="2.5" fill="none" />
            <path d="M0,0 Q-55,10 -70,45" stroke="hsl(230, 30%, 10%)" strokeWidth="2.5" fill="none" />
            <path d="M0,0 Q50,-25 80,15" stroke="hsl(230, 30%, 10%)" strokeWidth="2.5" fill="none" />
            <path d="M0,0 Q55,5 75,40" stroke="hsl(230, 30%, 10%)" strokeWidth="2.5" fill="none" />
            <path d="M0,0 Q0,-45 -5,-30" stroke="hsl(230, 30%, 10%)" strokeWidth="2.5" fill="none" />
          </g>
        </g>
        
        {/* Right coconut tree */}
        <g transform="translate(1750, 0)">
          <path
            d="M0,900 Q-5,780 0,660 Q5,600 -5,550"
            stroke="url(#tree-grad)"
            strokeWidth="11"
            fill="none"
            strokeLinecap="round"
          />
          <g transform="translate(-5, 550)">
            <path d="M0,0 Q-55,-20 -90,25" stroke="hsl(230, 30%, 10%)" strokeWidth="2.8" fill="none" />
            <path d="M0,0 Q-60,8 -85,50" stroke="hsl(230, 30%, 10%)" strokeWidth="2.8" fill="none" />
            <path d="M0,0 Q55,-25 90,20" stroke="hsl(230, 30%, 10%)" strokeWidth="2.8" fill="none" />
            <path d="M0,0 Q60,5 85,45" stroke="hsl(230, 30%, 10%)" strokeWidth="2.8" fill="none" />
            <path d="M0,0 Q-20,-50 -30,-35" stroke="hsl(230, 30%, 10%)" strokeWidth="2.8" fill="none" />
            <path d="M0,0 Q15,-55 25,-38" stroke="hsl(230, 30%, 10%)" strokeWidth="2.8" fill="none" />
          </g>
        </g>
        
        {/* Small plant silhouettes on bank */}
        <g opacity="0.8">
          <path d="M150,895 Q155,875 160,895" stroke="hsl(230, 30%, 8%)" strokeWidth="2" fill="none" />
          <path d="M145,895 Q140,880 145,895" stroke="hsl(230, 30%, 8%)" strokeWidth="2" fill="none" />
          <path d="M1500,875 Q1505,855 1510,875" stroke="hsl(230, 30%, 8%)" strokeWidth="2" fill="none" />
          <path d="M1520,875 Q1525,860 1530,875" stroke="hsl(230, 30%, 8%)" strokeWidth="2" fill="none" />
        </g>
        </svg>

      {/* Ripple canvas */}
      <canvas ref={canvasRef} className="ripple-canvas" aria-hidden="true" />

      {/* Cursor glow */}
      <div ref={glowRef} className="cursor-glow" aria-hidden="true" />

      {/* Motion toggle */}
      <button
        className="motion-toggle"
        onClick={toggleMotion}
        data-active={motionEnabled}
        aria-label={`Motion effects ${motionEnabled ? "enabled" : "disabled"}`}
        aria-pressed={motionEnabled}
      >
        Motion: {motionEnabled ? "On" : "Off"}
      </button>

      {/* Hero content */}
      <div className="hero-content">
        <span className={`hero-eyebrow ${revealed ? "revealed" : ""}`}>
          Embracing Tomorrow
        </span>
        <h1 className={`hero-title ${revealed ? "revealed" : ""}`}>
          The Dawn of AI<br />in Kerala
        </h1>
        <p className={`hero-subtitle ${revealed ? "revealed" : ""}`}>
          Where ancient wisdom meets infinite possibility.<br />
          A new chapter awakens on the shores of God's Own Country.
        </p>
        <button className={`hero-cta ${revealed ? "revealed" : ""}`}>
          Begin the Journey
        </button>
      </div>
    </section>
  );
}
