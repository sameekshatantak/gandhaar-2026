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
            transform: `rotate(${piece.rotation}deg)`,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          }}
        />
      ))}
    </div>
  );
};

/* =======================
   NoiseCanvas Component
======================= */
const NoiseCanvas = ({ width, height, opacity = 0.15, className = '' }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef();

  const generateNoise = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;
    const opacityValue = Math.floor(opacity * 255);

    for (let i = 0; i < data.length; i += 4) {
      const gray = Math.floor(Math.random() * 255);
      data[i] = gray;
      data[i + 1] = gray;
      data[i + 2] = gray;
      data[i + 3] = opacityValue;
    }

    ctx.putImageData(imageData, 0, 0);
  }, [width, height, opacity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = width;
    canvas.height = height;

    const animate = () => {
      generateNoise();
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => animationRef.current && cancelAnimationFrame(animationRef.current);
  }, [width, height, generateNoise]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        pointerEvents: 'none',
        mixBlendMode: 'overlay',
        width: '100%',
        height: '100%',
      }}
    />
  );
};

/* =======================
   ScratchScreen Component
======================= */
const ScratchScreen = ({ width, height, onReveal }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasTriggeredReveal, setHasTriggeredReveal] = useState(false);
  const [scratchPercentage, setScratchPercentage] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const gray = Math.floor(Math.random() * 60) + 140;
        ctx.fillStyle = `rgb(${gray}, ${gray}, ${gray})`;
        ctx.fillRect(x, y, 1, 1);
      }
    }

    ctx.globalCompositeOperation = 'destination-out';
  }, [width, height]);

  const calculateScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return 0;
    const ctx = canvas.getContext('2d');
    if (!ctx) return 0;

    const imageData = ctx.getImageData(0, 0, width, height);
    let transparentPixels = 0;

    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) transparentPixels++;
    }

    return (transparentPixels / (width * height)) * 100;
  };

  const scratch = (x, y) => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();

    const percentage = calculateScratchPercentage();
    setScratchPercentage(percentage);

    if (percentage > 30 && !hasTriggeredReveal) {
      setHasTriggeredReveal(true);
      onReveal?.();
    }
  };

  const getPosition = e => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };

    if (e.touches) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMove = e => {
    if (!isDrawing) return;
    const { x, y } = getPosition(e);
    scratch(x, y);
  };

  return (
    <div className="scratch-wrapper" style={{ width, height }}>
      <img
        src={comingSoonImage}
        alt="Coming Soon"
        className="scratch-image"
        draggable={false}
      />
      <canvas
        ref={canvasRef}
        className="scratch-canvas"
        onMouseDown={() => setIsDrawing(true)}
        onMouseUp={() => setIsDrawing(false)}
        onMouseLeave={() => setIsDrawing(false)}
        onMouseMove={handleMove}
        onTouchStart={() => setIsDrawing(true)}
        onTouchEnd={() => setIsDrawing(false)}
        onTouchMove={handleMove}
      />
      {scratchPercentage < 5 && (
        <div className="scratch-hint">
          <div className="scratch-hint-box">✨ Scratch to reveal</div>
        </div>
      )}
    </div>
  );
};

/* =======================
   StarReveal (Merged)
======================= */
const StarReveal = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = () => {
    if (!isRevealed) {
      setIsRevealed(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }
  };

  return (
    <div className="tv-wrapper">
      <div className="antenna-left">
        <div className="antenna-left-rod" />
        <div className="antenna-left-ball" />
      </div>
      <div className="antenna-right">
        <div className="antenna-right-rod" />
        <div className="antenna-right-ball" />
      </div>

      <div className="tv-body">
        <div className="tv-ridge-1" />
        <div className="tv-ridge-2" />

        <div className="screen-bezel">
          <div className="screen">
            <div className="crt-curve" />
            <div className="scanlines" />
            <div className="noise-layer">
              <NoiseCanvas width={212} height={188} opacity={0.4} />
            </div>
            <div className="scratch-container">
              <ScratchScreen
                width={186}
                height={162}
                onReveal={handleReveal}
              />
            </div>
            {isRevealed && <div className="screen-glow" />}
          </div>
        </div>

        <div className="control-panel">
          <div className="tv-knob knob-1">
            <div className="knob-indicator" />
          </div>
          <div className="tv-knob knob-2">
            <div className="knob-indicator" />
          </div>
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
  );
};

export default StarReveal;
