import { useEffect, useState } from 'react';
import gandhaarLogo from "../images/gandhaar-logo.png";
import '../style/AboutUs.css';

const AboutUs = () => {
    const [isLiked, setIsLiked] = useState(false);
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const videoUrl = "https://www.youtube.com/embed/fAucu6WXHI0";

    const shareFest = () => {
        const shareLink = "https://youtu.be/fAucu6WXHI0?si=zOiif4MgkgHAvdZn";
        navigator.clipboard.writeText(shareLink).then(() => {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        });
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") setIsVideoOpen(false);
        };

        if (isVideoOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isVideoOpen]);

    return (
        <div className="about-page-wrapper" id="about">
            {/* Custom Top-Down Notification */}
            {showToast && (
                <div className="custom-toast top-toast">
                    <span className="toast-icon">🔗</span>
                    Recap link copied to clipboard!
                </div>
            )}

            <section className="movie-detail-section">
                <div className="content-container">
                    <div className="text-wrapper">
                        <h2 className="about-us-title">About Us</h2>

                        <div className="meta-data">
                            <span>IMDb 9.9/10</span>
                            <span className="dot">•</span>
                            <span>2026</span>
                            <span className="dot">•</span>
                            <span>4 Days</span>
                            <span className="dot">•</span>
                            <span>Cultural • Creative • Emotional</span>
                        </div>

                        <div className="prime-action-bar">
                            <button className="play-btn" onClick={() => setIsVideoOpen(true)}>
                                <span className="play-icon">▶</span> Watch Recap
                            </button>

                            <button
                                className={`icon-btn circle-outline ${isLiked ? 'liked-glow' : ''}`}
                                onClick={() => setIsLiked(!isLiked)}
                            >
                                👍
                            </button>

                            <button className="icon-btn share-pill-outline" onClick={shareFest}>
                                🔗 Share
                            </button>
                        </div>

                        <p className="prime-description">
                            Gandhaar, the grand cultural fest of Cummins College of Engineering for Women, is more than just an event—it’s an emotion, a 4-day long celebration of talent, creativity, and unbridled enthusiasm. The fest boasts an array of captivating competitions like group singing, dance, masterchef cooking, painting, mehendi, doodling, departmental antakshari, treasure hunt, Cummins got talent, and many more. With vibrant intercollegiate contests like dance battles and street play performances, Gandhaar transforms the campus into a buzzing hub of artistic brilliance. Workshops offer students the chance to engage and boost their creativity. Adding to the excitement, Gandhaar’s star-studded nights feature mesmerizing live performances by renowned artists, an electrifying DJ night to dance your heart out, the most anticipated Faculty Dance Performance, and a Gandhaar dinner—a feast that brings everyone together to celebrate in style. The campus transforms into a vibrant haven during Gandhaar, with its lively atmosphere, colorful decorations, and buzzing energy.

                        </p>
                    </div>
                </div>

                <div className="backdrop-container">
                    <img src={gandhaarLogo} alt="Gandhaar Logo" className="side-fit-image" />
                </div>
            </section>

            {isVideoOpen && (
                <div className="modal" onClick={() => setIsVideoOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setIsVideoOpen(false)}>×</button>
                        <div className="video-container">
                            <iframe
                                src={`${videoUrl}?autoplay=1&rel=0`}
                                frameBorder="0"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                                title="Recap Video"
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AboutUs;