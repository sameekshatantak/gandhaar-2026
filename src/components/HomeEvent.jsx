import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; // Added for reliable routing
import '../style/HomeEvent.css';

const HomeEvent = () => {
    const navigate = useNavigate();
    const canvasRef = useRef(null);
    const wrapperRef = useRef(null);
    const gateRef = useRef(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [doodles, setDoodles] = useState([]);

    const startAnimation = useCallback(() => {
        setIsTransitioning(false);
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        canvas.width = wrapperRef.current.offsetWidth;
        canvas.height = wrapperRef.current.offsetHeight;

        class StickPerson {
            constructor(startX) {
                this.x = startX;
                this.y = (canvas.height * 0.45) + (Math.random() * 100 - 50);
                this.baseSpeed = 4 + Math.random() * 5;
                this.speed = this.baseSpeed;
                this.color = ["#FF007F", "#00F3FF", "#39FF14"][Math.floor(Math.random() * 3)];
                this.done = false;
                this.targetX = canvas.width * 0.72;

                const phrases = ["Let's go!", "Wait!", "Me first!", "Oof!!", "Gandhaarr", "Move!", "Registration live!", "So hyped!"];
                this.speech = Math.random() > 0.4 ? phrases[Math.floor(Math.random() * phrases.length)] : null;
            }

            draw(ctx) {
                if (this.done) return;

                let walk = Math.sin(Date.now() * 0.02 + this.x) * 8;
                ctx.lineWidth = 3;

                // Head
                ctx.strokeStyle = "brown"; ctx.fillStyle = "#222";
                ctx.beginPath(); ctx.arc(this.x, this.y, 7, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

                // Body (Neon Glow)
                ctx.strokeStyle = this.color;
                ctx.shadowBlur = 10; ctx.shadowColor = this.color;
                ctx.beginPath(); ctx.moveTo(this.x, this.y + 7); ctx.lineTo(this.x, this.y + 25); ctx.stroke();
                ctx.shadowBlur = 0;

                // Legs
                ctx.strokeStyle = "black";
                ctx.beginPath(); ctx.moveTo(this.x, this.y + 25); ctx.lineTo(this.x - 7 + walk, this.y + 45); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(this.x, this.y + 25); ctx.lineTo(this.x + 7 - walk, this.y + 45); ctx.stroke();

                // Speech Box
                if (this.speech) {
                    ctx.font = "13px Arial";
                    const txtWidth = ctx.measureText(this.speech).width;
                    ctx.fillStyle = "white";
                    ctx.beginPath();
                    if (ctx.roundRect) {
                        ctx.roundRect(this.x - (txtWidth / 2 + 5), this.y - 35, txtWidth + 10, 18, 5);
                    } else {
                        ctx.rect(this.x - (txtWidth / 2 + 5), this.y - 35, txtWidth + 10, 18);
                    }
                    ctx.fill();
                    ctx.fillStyle = "black";
                    ctx.fillText(this.speech, this.x - (txtWidth / 2), this.y - 22);
                }
            }

            update() {
                if (this.done) return;
                const distanceToGate = this.targetX - this.x;
                if (distanceToGate < 200) {
                    this.speed += 0.5;
                }
                this.x += this.speed;

                if (this.x >= this.targetX) {
                    this.done = true;
                    gateRef.current?.classList.add('glitch-active');
                    setTimeout(() => gateRef.current?.classList.remove('glitch-active'), 50);
                }
            }
        }

        const crowd = [];
        const numHerds = 8;
        const peoplePerHerd = 15;
        for (let i = 0; i < numHerds; i++) {
            const herdBaseX = -100 - (i * 300);
            for (let j = 0; j < peoplePerHerd; j++) {
                const offsetX = Math.random() * 200;
                crowd.push(new StickPerson(herdBaseX - offsetX));
            }
        }

        let animationFrame;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let activePeople = false;

            crowd.forEach(p => {
                p.update();
                p.draw(ctx);
                if (!p.done) activePeople = true;
            });

            if (!activePeople) {
                setIsTransitioning(true);
                wrapperRef.current.classList.add('final-shake');

                setTimeout(() => {
                    wrapperRef.current?.classList.remove('final-shake');
                    startAnimation();
                }, 5000);
            } else {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animate();
        return () => cancelAnimationFrame(animationFrame);
    }, []);

    useEffect(() => {
        const icons = ['⚡', '✨', '🔥', '👑'];
        setDoodles(Array.from({ length: 8 }, (_, i) => ({
            id: i,
            icon: icons[Math.floor(Math.random() * icons.length)],
            left: `${Math.random() * 90}%`,
            top: `${Math.random() * 90}%`,
            delay: `${Math.random() * 0.5}s`,
            duration: `${2 + Math.random() * 2}s`
        })));

        const cleanup = startAnimation();
        const handleResize = () => { startAnimation(); };
        window.addEventListener('resize', handleResize);

        return () => {
            if (cleanup) cleanup();
            window.removeEventListener('resize', handleResize);
        };
    }, [startAnimation]);

    return (
        <div className={`fest-wrapper ${isTransitioning ? 'bg-revealed' : ''}`} ref={wrapperRef}>
            <div className="bg-image-layer"></div>
            <div className="tv-overlay"></div>

            <div className={`gate-container ${isTransitioning ? 'gate-fade' : ''}`} ref={gateRef}>
                <svg viewBox="0 0 200 240">
                    <defs>
                        <linearGradient id="gateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: 'var(--neon-pink)' }} />
                            <stop offset="100%" style={{ stopColor: 'var(--neon-blue)' }} />
                        </linearGradient>
                    </defs>
                    <rect x="15" y="30" width="30" height="210" rx="4" fill="#111" stroke="url(#gateGrad)" strokeWidth="3" />
                    <rect x="155" y="30" width="30" height="210" rx="4" fill="#111" stroke="url(#gateGrad)" strokeWidth="3" />
                    <rect x="10" y="30" width="180" height="80" rx="8" fill="#111" />
                    <text x="100" y="65" textAnchor="middle" fontSize="16" fontWeight="bold" fill="var(--neon-green)">GANDHAAR</text>
                    <text x="100" y="95" textAnchor="middle" fontSize="26" fontWeight="bold" fill="white">2026</text>
                </svg>
            </div>

            <canvas ref={canvasRef} className={isTransitioning ? 'canvas-hide' : ''}></canvas>

            {doodles.map((d) => (
                <div key={d.id} className="auto-doodle" style={{ left: d.left, top: d.top, transitionDelay: d.delay, animationDuration: d.duration }}>
                    {d.icon}
                </div>
            ))}

            <div className={`cta-container ${isTransitioning ? 'at-center' : ''}`}>
                {/* onPointerDown is used for mobile reliability. 
                    navigate() is used to prevent full page reloads.
                */}
                <button
                    className="reg-btn"
                    onPointerDown={(e) => {
                        e.preventDefault();
                        navigate('/events');
                    }}
                    style={{ touchAction: 'manipulation' }}
                >
                    REGISTER NOW!
                </button>
            </div>
        </div>
    );
};

export default HomeEvent;