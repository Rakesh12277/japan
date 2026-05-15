import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Lenis from 'lenis';

// ─── Custom Cursor ────────────────────────────────────────────────────────────
function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`;
        ringRef.current.style.top = `${ring.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const onEnter = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest('a, button, .info-box, .bento-card, .photo-cluster')) {
        setHovering(true);
      }
    };
    const onLeave = () => setHovering(false);

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className={`cursor-ring ${hovering ? 'hovering' : ''}`} />
    </>
  );
}

// ─── Globe Icon ───────────────────────────────────────────────────────────────
function GlobeIcon({ size = 18, color = '#FAFAFA' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" stroke={color} strokeWidth="1.2">
      <circle cx="9" cy="9" r="7.5" />
      <ellipse cx="9" cy="9" rx="3.5" ry="7.5" />
      <line x1="1.5" y1="9" x2="16.5" y2="9" />
      <line x1="2.5" y1="5.5" x2="15.5" y2="5.5" />
      <line x1="2.5" y1="12.5" x2="15.5" y2="12.5" />
    </svg>
  );
}

// ─── Social Icons ─────────────────────────────────────────────────────────────
function InstagramIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function TelegramIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M21.5 2.5L2 10l7.5 2.5M21.5 2.5L14 22l-4.5-9.5M21.5 2.5L9.5 12.5" />
    </svg>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '22px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, transparent 100%)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <GlobeIcon size={18} color="#FAFAFA" />
        <span className="font-nav" style={{ color: '#FAFAFA', letterSpacing: '0.22em' }}>
          Japan Tours
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
        {['About', 'Included', 'Contacts'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="nav-link font-nav"
            style={{ color: '#FAFAFA', textDecoration: 'none' }}
          >
            {item}
          </a>
        ))}
        <a
          href="#contacts"
          className="book-btn font-nav"
          style={{
            color: '#F5E8D3',
            textDecoration: 'none',
            padding: '8px 22px',
            borderRadius: '50px',
            display: 'inline-block',
            letterSpacing: '0.18em',
          }}
        >
          <span>Book</span>
        </a>
      </div>
    </nav>
  );
}

// ─── Social Icons Vertical ──────────────────────────────────────────────────
function SocialIconsVertical() {
  return (
    <div
      style={{
        position: 'absolute',
        right: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        zIndex: 20,
      }}
    >
      {[<InstagramIcon key="ig" />, <FacebookIcon key="fb" />, <TelegramIcon key="tg" />].map((icon, i) => (
        <a key={i} href="#" style={{ color: 'rgba(250,250,250,0.5)', display: 'block' }}>
          {icon}
        </a>
      ))}
    </div>
  );
}

// ─── Info Box ─────────────────────────────────────────────────────────────────
const infoBoxes = [
  { label: '3 cities in Japan' },
  { label: '10 days' },
  { label: 'ancient temples' },
  { label: 'eat ramen' },
  { label: 'enjoy the vibe' },
];

function InfoBox({ label }: { label: string }) {
  return (
    <div
      className="info-box"
      style={{
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: '8px',
        padding: '14px 18px',
        minWidth: '110px',
        textAlign: 'center',
        cursor: 'none',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '11px',
        letterSpacing: '0.1em',
        color: 'rgba(250,250,250,0.75)',
        textTransform: 'lowercase',
        fontWeight: 300,
      }}>
        {label}
      </p>
    </div>
  );
}

// ─── Polaroid Card with City Images ───────────────────────────────────────────
const polaroidData = [
  { caption: '3 cities in Japan', img: '/images/osaka-castle.jpg' },
  { caption: '10 days', img: '/images/kyoto-pagoda.jpg' },
  { caption: 'gigabytes of photos', img: '/images/red-shrine.jpg' },
  { caption: 'eat ramen', img: '/images/tokyo-street.jpg' },
  { caption: 'enjoy the vibe', img: '/images/tokyo-shibuya.jpg' },
];

function PolaroidCard({ caption, img }: { caption: string; img: string }) {
  return (
    <div
      className="polaroid-card"
      style={{
        width: '155px',
        height: '195px',
        borderRadius: '3px',
        overflow: 'hidden',
        position: 'relative',
        flexShrink: 0,
        cursor: 'none',
      }}
    >
      <div style={{ width: '100%', height: '155px', overflow: 'hidden' }}>
        <img
          src={img}
          alt={caption}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </div>
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 10px',
        background: 'rgba(10,10,10,0.96)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        <p style={{
          color: '#888888',
          fontSize: '10px',
          letterSpacing: '0.06em',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 300,
        }}>
          {caption}
        </p>
      </div>
    </div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Mountain parallax
  const mountainY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  
  // JAPAN text parallax
  const japanY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  
  // Polaroid strip parallax drift
  const stripX = useTransform(scrollYProgress, [0, 1], ['0px', '-180px']);

  return (
    <section
      ref={containerRef}
      id="home"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '800px',
        overflow: 'hidden',
        background: '#050505',
      }}
    >
      {/* ── Background Mountains ── */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          y: mountainY,
          willChange: 'transform',
        }}
      >
        <img
          src="/images/hero-mountains.jpg"
          alt="Misty Japanese mountains at dawn"
          style={{
            width: '100%',
            height: '115%',
            objectFit: 'cover',
            objectPosition: 'center 35%',
            display: 'block',
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(10,10,10,0.08) 0%, rgba(10,10,10,0.0) 30%, rgba(10,10,10,0.55) 80%, rgba(10,10,10,1) 100%)',
        }} />
      </motion.div>

      {/* ── JAPAN Typography (MODERN OUTLINED) ── */}
      <motion.div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: '8%',
          zIndex: 2,
          y: japanY,
          willChange: 'transform',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <h1
          style={{
            fontFamily: 'Bebas Neue, Arial Narrow, sans-serif',
            fontSize: 'clamp(140px, 24vw, 380px)',
            lineHeight: 0.85,
            letterSpacing: '0.02em',
            color: 'transparent',
            WebkitTextStroke: '2px rgba(250,250,250,0.85)',
            width: '100%',
            textAlign: 'center',
            textShadow: '0 0 60px rgba(250,250,250,0.1)',
          }}
        >
          JAPAN
        </h1>
      </motion.div>

      {/* ── Mountain Mask Layer ── */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          y: mountainY,
          willChange: 'transform',
          pointerEvents: 'none',
        }}
      >
        <img
          src="/images/hero-mountains.jpg"
          alt=""
          aria-hidden="true"
          style={{
            width: '100%',
            height: '115%',
            objectFit: 'cover',
            objectPosition: 'center 35%',
            display: 'block',
            maskImage: 'linear-gradient(to bottom, transparent 0%, transparent 42%, rgba(0,0,0,0.5) 52%, rgba(0,0,0,1) 62%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, transparent 42%, rgba(0,0,0,0.5) 52%, rgba(0,0,0,1) 62%)',
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(10,10,10,0.0) 0%, rgba(10,10,10,0.0) 30%, rgba(10,10,10,0.55) 80%, rgba(10,10,10,1) 100%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, transparent 42%, rgba(0,0,0,0.5) 52%, rgba(0,0,0,1) 62%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, transparent 42%, rgba(0,0,0,0.5) 52%, rgba(0,0,0,1) 62%)',
        }} />
      </motion.div>

      {/* ── Kimono Girl (FIXED - No Parallax) ── */}
      <div
        style={{
          position: 'absolute',
          right: '2%',
          bottom: '-20px',
          zIndex: 6,
          height: '95vh',
          width: '38vw',
          maxWidth: '520px',
        }}
      >
        <img
          src="/images/kimono-girl.png"
          alt="Woman in traditional furisode kimono"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'bottom right',
            display: 'block',
            filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.5))',
          }}
        />
        {/* Gradient fade at bottom */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '12%',
          background: 'linear-gradient(to top, rgba(10,10,10,0.9), transparent)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* ── Social Icons ── */}
      <SocialIconsVertical />

      {/* ── 5 Info Boxes ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          bottom: '300px',
          left: '40px',
          zIndex: 9,
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          maxWidth: '700px',
        }}
      >
        {infoBoxes.map((box, i) => (
          <InfoBox key={i} label={box.label} />
        ))}
      </motion.div>

      {/* ── Tagline ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          bottom: '260px',
          left: '40px',
          zIndex: 9,
        }}
      >
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '10px',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'rgba(250,250,250,0.45)',
        }}>
          Premium 10-Day Journey · Osaka · Kyoto · Tokyo
        </p>
      </motion.div>

      {/* ── Book Button ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          right: '7%',
          bottom: '240px',
          zIndex: 10,
        }}
      >
        <a
          href="#contacts"
          className="book-btn"
          style={{
            display: 'inline-block',
            padding: '15px 44px',
            borderRadius: '50px',
            color: '#F5E8D3',
            textDecoration: 'none',
            fontFamily: 'Inter, sans-serif',
            fontSize: '12px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          <span>Book Now</span>
        </a>
      </motion.div>

      {/* ── Polaroid Strip with City Images ── */}
      <div
        style={{
          position: 'absolute',
          bottom: '0',
          left: 0,
          right: 0,
          zIndex: 8,
          overflow: 'hidden',
          paddingBottom: '0',
        }}
      >
        <motion.div
          style={{
            display: 'flex',
            gap: '14px',
            paddingLeft: '40px',
            x: stripX,
            width: 'max-content',
            alignItems: 'flex-end',
          }}
        >
          {polaroidData.map((card, i) => (
            <PolaroidCard key={i} caption={card.caption} img={card.img} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Animated Paragraph ───────────────────────────────────────────────────────
function AnimatedParagraph({
  text,
  accent,
}: {
  text: string;
  accent: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const parts = text.split(accent);

  return (
    <p
      ref={ref}
      style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '15px',
        lineHeight: 1.8,
        color: 'rgba(250,250,250,0.68)',
        fontWeight: 300,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.9s ease, transform 0.9s ease',
      }}
    >
      {parts[0]}
      <span style={{ color: '#D4F87A', fontWeight: 400 }}>{accent}</span>
      {parts[1]}
    </p>
  );
}

// ─── Photo Cluster ────────────────────────────────────────────────────────────
interface PhotoClusterProps {
  img1: string;
  img2: string;
  alt1: string;
  alt2: string;
  rot1: number;
  rot2: number;
}

function PhotoCluster({ img1, img2, alt1, alt2, rot1, rot2 }: PhotoClusterProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ width: '230px', height: '185px', position: 'relative', flexShrink: 0 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={img1}
        alt={alt1}
        style={{
          position: 'absolute',
          width: '140px',
          height: '108px',
          objectFit: 'cover',
          border: '3px solid rgba(255,255,255,0.95)',
          boxShadow: '0 8px 28px rgba(0,0,0,0.55)',
          borderRadius: '2px',
          top: '0px',
          left: '0px',
          zIndex: 1,
          transform: hovered
            ? `rotate(${rot1 - 5}deg) translate(-10px, -4px)`
            : `rotate(${rot1}deg)`,
          transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />
      <img
        src={img2}
        alt={alt2}
        style={{
          position: 'absolute',
          width: '140px',
          height: '108px',
          objectFit: 'cover',
          border: '3px solid rgba(255,255,255,0.95)',
          boxShadow: '0 12px 32px rgba(0,0,0,0.6)',
          borderRadius: '2px',
          top: '52px',
          left: '68px',
          zIndex: 2,
          transform: hovered
            ? `rotate(${rot2 + 5}deg) translate(10px, 4px)`
            : `rotate(${rot2}deg)`,
          transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />
    </div>
  );
}

// ─── Timeline Node ────────────────────────────────────────────────────────────
interface TimelineNodeProps {
  city: string;
  days: string;
  img1: string;
  img2: string;
  alt1: string;
  alt2: string;
  rot1: number;
  rot2: number;
  delay: number;
  isLast?: boolean;
}

function TimelineNode({
  city,
  days,
  img1,
  img2,
  alt1,
  alt2,
  rot1,
  rot2,
  delay,
  isLast,
}: TimelineNodeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '22px',
        paddingBottom: isLast ? 0 : '72px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, paddingTop: '3px' }}>
        <div style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: '#D4F87A',
          boxShadow: '0 0 12px rgba(212,248,122,0.5)',
          flexShrink: 0,
        }} />
        {!isLast && (
          <div style={{
            width: '1px',
            flex: 1,
            minHeight: '90px',
            background: 'linear-gradient(to bottom, rgba(212,248,122,0.3), rgba(255,255,255,0.08))',
            marginTop: '8px',
          }} />
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '10px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(250,250,250,0.38)',
            marginBottom: '5px',
          }}>
            {days}
          </p>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '18px',
            fontWeight: 500,
            color: '#FAFAFA',
            letterSpacing: '0.02em',
          }}>
            {city}
          </p>
        </div>
        <PhotoCluster
          img1={img1}
          img2={img2}
          alt1={alt1}
          alt2={alt2}
          rot1={rot1}
          rot2={rot2}
        />
      </div>
    </motion.div>
  );
}

// ─── About Section ─────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section
      id="about"
      style={{
        background: '#0A0A0A',
        padding: '130px 40px 100px',
        position: 'relative',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '88px' }}>
        <div style={{ height: '1px', flex: 1, background: 'rgba(255,255,255,0.12)' }} />
        <h2
          className="font-bebas"
          style={{
            fontSize: 'clamp(44px, 6.5vw, 88px)',
            color: '#FAFAFA',
            letterSpacing: '0.06em',
            lineHeight: 1,
            whiteSpace: 'nowrap',
          }}
        >
          About the Tour
        </h2>
        <div style={{ height: '1px', flex: 1, background: 'rgba(255,255,255,0.12)' }} />
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '100px',
          maxWidth: '1200px',
          margin: '0 auto',
          alignItems: 'start',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '44px' }}>
          <AnimatedParagraph
            text="We've planned a simple and convenient 10-day itinerary for your trip to Japan. You'll visit three cities: Osaka, Kyoto, and Tokyo."
            accent="Osaka, Kyoto, and Tokyo"
          />
          <AnimatedParagraph
            text="No need to worry about routes, schedules, or finding places — everything is already organized. We'll show you where to go, what to see, and where to eat, so you can simply enjoy the journey."
            accent="enjoy the journey"
          />

          <div style={{ display: 'flex', gap: '48px', paddingTop: '8px' }}>
            {[
              { num: '10', label: 'Days' },
              { num: '3', label: 'Cities' },
              { num: '2', label: 'Guides' },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-bebas" style={{ fontSize: '56px', color: '#D4F87A', lineHeight: 1, letterSpacing: '0.02em' }}>
                  {s.num}
                </p>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '10px',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'rgba(250,250,250,0.38)',
                  marginTop: '4px',
                }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ paddingLeft: '8px' }}>
          <TimelineNode
            city="Osaka"
            days="Days 1–3"
            img1="/images/osaka-castle.jpg"
            img2="/images/osaka-skyline.jpg"
            alt1="Osaka Castle at golden hour"
            alt2="Osaka city skyline"
            rot1={-3}
            rot2={2.5}
            delay={0}
          />
          <TimelineNode
            city="Kyoto"
            days="Days 4–6"
            img1="/images/kyoto-pagoda.jpg"
            img2="/images/red-shrine.jpg"
            alt1="Kyoto pagoda in mist"
            alt2="Red torii shrine gates"
            rot1={2}
            rot2={-2.5}
            delay={0.2}
          />
          <TimelineNode
            city="Tokyo"
            days="Days 7–10"
            img1="/images/tokyo-shibuya.jpg"
            img2="/images/tokyo-street.jpg"
            alt1="Tokyo Shibuya neon crossing"
            alt2="Tokyo alley at night"
            rot1={-2}
            rot2={3}
            delay={0.4}
            isLast
          />
        </div>
      </div>
    </section>
  );
}

// ─── Included Section ─────────────────────────────────────────────────────────
const includedCards = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4F87A" strokeWidth="1.4">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Guides',
    description: '2 awesome guides who know everything about Japan — local experts, fluent speakers, true storytellers of the island nation.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4F87A" strokeWidth="1.4">
        <path d="M22 2L11 13" />
        <path d="M22 2 15 22 11 13 2 9l20-7z" />
      </svg>
    ),
    title: 'Flights',
    description: 'Routes: Moscow — Osaka, Tokyo — Moscow. Economy class included, seats reserved together as a group.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4F87A" strokeWidth="1.4">
        <rect x="1" y="3" width="15" height="13" rx="2" />
        <path d="M16 8h4l3 5v3h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    title: 'Transfers',
    description: 'From the airport to the hotels and between all three cities. Comfortable vehicles, zero stress logistics.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4F87A" strokeWidth="1.4">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: 'Hotels',
    description: 'Comfortable city-center accommodation, 2 people per room. Daily breakfasts included at each property.',
  },
];

function IncludedSection() {
  return (
    <section
      id="included"
      style={{
        background: '#0A0A0A',
        padding: '100px 40px 130px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '28px', marginBottom: '64px' }}>
        <h2
          className="font-bebas"
          style={{
            fontSize: 'clamp(48px, 9vw, 120px)',
            color: '#FAFAFA',
            letterSpacing: '0.03em',
            lineHeight: 0.9,
            flexShrink: 0,
          }}
        >
          What's Included
        </h2>
        <div style={{ height: '1px', flex: 1, background: 'rgba(255,255,255,0.12)', marginBottom: '12px' }} />
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '14px',
          maxWidth: '1200px',
        }}
      >
        {includedCards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="bento-card"
            style={{ display: 'flex', flexDirection: 'column', gap: '20px', minHeight: '200px' }}
          >
            <div className="bento-icon">{card.icon}</div>
            <div>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#FAFAFA',
                fontWeight: 500,
                marginBottom: '10px',
              }}>
                {card.title}
              </p>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                color: 'rgba(250,250,250,0.52)',
                lineHeight: 1.7,
                fontWeight: 300,
              }}>
                {card.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────
function ContactSection() {
  const [form, setForm] = useState({ name: '', phone: '', comment: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: '', phone: '', comment: '' });
  };

  return (
    <section
      id="contacts"
      style={{
        position: 'relative',
        minHeight: '92vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img
          src="/images/fuji-sakura.jpg"
          alt="Cherry blossoms and Mount Fuji"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 60%',
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(110deg, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.55) 45%, rgba(10,10,10,0.28) 100%)',
        }} />
      </div>

      <motion.div
        initial={{ opacity: 0, x: -48 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative',
          zIndex: 10,
          marginLeft: 'clamp(24px, 8%, 120px)',
          maxWidth: '440px',
          width: '100%',
          padding: 'clamp(36px, 5vw, 60px) clamp(28px, 4vw, 52px)',
          borderRadius: '18px',
          background: 'rgba(14, 14, 14, 0.62)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <h3
          className="font-cormorant"
          style={{
            fontSize: 'clamp(26px, 3.5vw, 36px)',
            fontWeight: 300,
            color: '#FAFAFA',
            lineHeight: 1.25,
            marginBottom: '6px',
            fontStyle: 'italic',
          }}
        >
          Want to join us,<br />but still have questions?
        </h3>
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '10px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(250,250,250,0.38)',
            marginBottom: '40px',
            marginTop: '10px',
          }}
        >
          Leave a request
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <input
            type="text"
            placeholder="Your name"
            className="form-field"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            onFocus={(e) => (e.target.style.borderBottomColor = '#D4F87A')}
            onBlur={(e) => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.22)')}
          />
          <input
            type="tel"
            placeholder="Phone number"
            className="form-field"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            onFocus={(e) => (e.target.style.borderBottomColor = '#D4F87A')}
            onBlur={(e) => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.22)')}
          />
          <textarea
            placeholder="Comment"
            className="form-field"
            rows={3}
            value={form.comment}
            onChange={(e) => setForm({ ...form, comment: e.target.value })}
            style={{
              background: 'transparent',
              border: 'none',
              borderBottom: '1px solid rgba(255,255,255,0.22)',
              color: '#FAFAFA',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              padding: '10px 0',
              width: '100%',
              outline: 'none',
              resize: 'none',
              transition: 'border-color 0.3s ease',
            }}
            onFocus={(e) => (e.target.style.borderBottomColor = '#D4F87A')}
            onBlur={(e) => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.22)')}
          />
          <button type="submit" className="send-btn" style={{ marginTop: '8px' }}>
            {sent ? '✓ Request Sent!' : 'Send'}
          </button>
        </form>
      </motion.div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: '#0A0A0A', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '28px 40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <GlobeIcon size={15} color="#555" />
          <span style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '10px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#555',
          }}>
            Japan Tours
          </span>
        </div>

        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          {[
            { label: 'Home', href: '#home' },
            { label: 'About', href: '#about' },
            { label: 'Included', href: '#included' },
            { label: 'Contacts', href: '#contacts' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="nav-link"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '10px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#555',
                textDecoration: 'none',
              }}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          {[<InstagramIcon key="ig" />, <FacebookIcon key="fb" />, <TelegramIcon key="tg" />].map((icon, i) => (
            <a key={i} href="#" style={{ color: 'rgba(250,250,250,0.35)', display: 'flex', alignItems: 'center' }}>
              {icon}
            </a>
          ))}
        </div>
      </div>

      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '10px',
        color: 'rgba(255,255,255,0.18)',
        textAlign: 'center',
        marginTop: '20px',
        letterSpacing: '0.08em',
      }}>
        © 2024 Japan Tours. All rights reserved. A love letter to Japan.
      </p>
    </footer>
  );
}

// ─── Grain Overlay ────────────────────────────────────────────────────────────
function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        opacity: 0.028,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '128px 128px',
        mixBlendMode: 'overlay',
      }}
    />
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }}>
      <GrainOverlay />
      <CustomCursor />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <IncludedSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
