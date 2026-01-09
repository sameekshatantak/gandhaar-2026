import { useCallback, useEffect, useRef, useState } from 'react';
import comingSoonImage from '../assets/images/coming-soon.png';
import "../style/StarReveal.css";

/* =======================
   Confetti Component
======================= */
const Confetti = () => {
  const colors = [
    'hsl(38, 90%, 50%)',
    'hsl(0, 80%, 60%)',
    'hsl(200, 80%, 60%)',
    'hsl(120, 60%, 50%)',
    'hsl(45, 85%, 55%)',
    'hsl(280, 70%, 60%)'
  ];

  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 2,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: 6 + Math.random() * 8,
    rotation: Math.random() * 360,
  }));

  return (
    <div className="confetti-container">
      {confettiPieces.map(piece => (
        <span
          key={piece.id}
          className="confetti"
          style={{
            left: `${piece.left}%`,
            width: `${piece.size}px`,
            height: `${piece.size * 1.5}px`,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            transform: `rotate(${piece.rotation}deg)`
          }}
        />
      ))}
    </div>
  );
};

/* =======================
   NoiseCanvas Component
======================= */
const NoiseCanvas = ({ opacity = 0.15, hidden }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef();

  const generateNoise = useCallback((w, h) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const imageData = ctx.createImageData(w, h);
    const data = imageData.data;
    const alpha = Math.floor(opacity * 255);

    for (let i = 0; i < data.length; i += 4) {
      const g = Math.random() * 255;
      data[i] = data[i + 1] = data[i + 2] = g;
      data[i + 3] = alpha;
    }

    ctx.putImageData(imageData, 0, 0);
  }, [opacity]);

  useEffect(() => {
    if (hidden) return;

    const canvas = canvasRef.current;
    const resize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };

    resize();

    const animate = () => {
      generateNoise(canvas.width, canvas.height);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [hidden, generateNoise]);

  if (hidden) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        mixBlendMode: 'overlay',
      }}
    />
  );
};

/* =======================
   ScratchScreen Component
======================= */
const ScratchScreen = ({ onReveal, hidden }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasTriggeredReveal, setHasTriggeredReveal] = useState(false);
  const [scratchPercentage, setScratchPercentage] = useState(0);

  useEffect(() => {
    if (hidden) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;

    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const g = 140 + Math.random() * 60;
        ctx.fillStyle = `rgb(${g},${g},${g})`;
        ctx.fillRect(x, y, 1, 1);
      }
    }

    ctx.globalCompositeOperation = 'destination-out';
  }, [hidden]);

  const calculateScratchPercentage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparent = 0;

    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) transparent++;
    }

    return (transparent / (canvas.width * canvas.height)) * 100;
  };

  const scratch = (x, y) => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();

    const percent = calculateScratchPercentage();
    setScratchPercentage(percent);

    if (percent > 30 && !hasTriggeredReveal) {
      setHasTriggeredReveal(true);
      onReveal();
    }
  };

  const getPos = e => {
    const r = canvasRef.current.getBoundingClientRect();
    const p = e.touches ? e.touches[0] : e;
    return { x: p.clientX - r.left, y: p.clientY - r.top };
  };

  if (hidden) {
    return <img src={comingSoonImage} className="scratch-image" alt="Coming Soon" />;
  }

  return (
    <div className="scratch-wrapper">
      <canvas
        ref={canvasRef}
        className="scratch-canvas"
        onMouseDown={() => setIsDrawing(true)}
        onMouseUp={() => setIsDrawing(false)}
        onMouseLeave={() => setIsDrawing(false)}
        onMouseMove={e => isDrawing && scratch(...Object.values(getPos(e)))}
        onTouchStart={() => setIsDrawing(true)}
        onTouchEnd={() => setIsDrawing(false)}
        onTouchMove={e => scratch(...Object.values(getPos(e)))}
      />

      {scratchPercentage < 3 && (
        <div className="scratch-hint">
          <div className="scratch-hint-box">✨ Scratch to reveal</div>
        </div>
      )}
    </div>
  );
};

/* =======================
   StarReveal Component
======================= */
const StarReveal = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleReveal = () => {
    if (!isRevealed) {
      setIsRevealed(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }
  };

  return (
    <div className="page-container">
      <div className="tv-container">
        <h1 className="gold-text">Star Night 1</h1>
        <h2 className="gold-subtitle">Something Iconic is loading...</h2>
        <h2 className="gold-subtitle">Can you guess what it is?</h2>
        <br></br>
        <br></br>

        <div className="tv-body">
          <div className="tv-ridge-1" />
          <div className="tv-ridge-2" />

          <div className="screen-bezel">
            <div className="screen">
              <div className="crt-curve" />
              <div className="scanlines" />

              <div className="noise-layer">
                <NoiseCanvas hidden={isRevealed} opacity={0.4} />
              </div>

              <div className="scratch-container">
                <ScratchScreen hidden={isRevealed} onReveal={handleReveal} />
              </div>

              {isRevealed && <div className="screen-glow" />}
            </div>
          </div>

          <div className="control-panel">
            <div className="tv-knob knob-1"><div className="knob-indicator" /></div>
            <div className="tv-knob knob-2"><div className="knob-indicator" /></div>
          </div>

          <div className="speaker-panel">
            <div className="speaker-grille" />
          </div>

          <div className="brand-label" />
        </div>

        <div className="tv-feet">
          <div className="tv-foot" />
          <div className="tv-foot" />
        </div>

        {showConfetti && <Confetti />}
      </div>
    </div>
  );
};

export default StarReveal;
