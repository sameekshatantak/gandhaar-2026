import { useEffect, useRef, useState } from 'react';
import '../style/StarLineUp.css';

const REVEAL_DATE_IST = "2026-01-25T00:45:00";

const questionPool = [
    { q: "Who is the 'King of Bollywood'?", options: ["Aamir Khan", "SRK", "Salman Khan", "Akshay"], correct: 1 },
    { q: "First Indian movie to win an Oscar?", options: ["Lagaan", "Mother India", "Slumdog", "Gandhi"], correct: 2 },
    { q: "Director of 'Baahubali'?", options: ["Karan Johar", "Rajamouli", "Bhansali", "Hirani"], correct: 1 },
    { q: "Amitabh Bachchan's debut film?", options: ["Zanjeer", "Sholay", "Saat Hindustani", "Deewar"], correct: 2 },
    { q: "Year of the first Indian Talkie?", options: ["1913", "1931", "1947", "1950"], correct: 1 },
    { q: "Which show's tagline is 'Ab Scene Paltega'?", options: ["Bigg Boss", "Khatron Ke Khiladi", "Roadies", "Splitsvilla"], correct: 0 },
    { q: "Who has hosted 'Kaun Banega Crorepati' for the most seasons?", options: ["Shah Rukh Khan", "Salman Khan", "Amitabh Bachchan", "Aamir Khan"], correct: 2 },
    { q: "In 'Shark Tank India', what does a 'Shark' offer in exchange for equity?", options: ["Advice", "Investment", "Employment", "A Trophy"], correct: 1 },

    // --- Cartoon & Disney ---
    { q: "What is the name of Mickey Mouse's pet dog?", options: ["Goofy", "Donald", "Pluto", "Max"], correct: 2 },
    { q: "In 'Chhota Bheem', what gives Bheem his super strength?", options: ["Spinach", "Laddoos", "Milk", "Samosas"], correct: 1 },
    { q: "Which cartoon character lives in a pineapple under the sea?", options: ["Patrick", "Squidward", "SpongeBob", "Sandy"], correct: 2 },
    { q: "What is the name of Mowgli's bear friend in 'The Jungle Book'?", options: ["Bagheera", "Sher Khan", "Baloo", "Akela"], correct: 2 },

    // --- Indian Serials & Sitcoms ---
    { q: "In 'Taarak Mehta Ka Ooltah Chashmah', what is Jethalal's shop name?", options: ["Gada Electronics", "Jetha Sweets", "Gokuldham Mart", "Babitaji Stores"], correct: 0 },
    { q: "Which sitcom features the characters Hansa, Praful, and Babuji?", options: ["Sarabhai vs Sarabhai", "Khichdi", "F.I.R", "Lapataganj"], correct: 1 },
    { q: "Who is the mother-in-law in the famous 'Kyunki Saas Bhi Kabhi Bahu Thi'?", options: ["Tulsi", "Savita", "Amba", "Payal"], correct: 2 },

    // --- National TV & Doordarshan ---
    { q: "Which epic was the first to be televised on Doordarshan in the 80s?", options: ["Mahabharat", "Ramayan", "Chanakya", "Vikram Aur Betaal"], correct: 1 },
    { q: "What was the name of India's first superhero show on Doordarshan?", options: ["Captain Vyom", "Shaktimaan", "Aryamaan", "Junior G"], correct: 1 },
    { q: "Which detective show on DD featured Rajit Kapur?", options: ["Byomkesh Bakshi", "Karamchand", "C.I.D", "Tehkikaat"], correct: 0 },
    { q: "In the show 'Malgudi Days', what is the name of the main boy?", options: ["Mani", "Swami", "Raju", "Siddhu"], correct: 1 },

    // --- General Entertainment ---
    { q: "Which channel is known for the show 'Crime Patrol'?", options: ["Sony TV", "Star Plus", "Colors", "Zee TV"], correct: 0 },
    { q: "What is the name of the 'MasterChef India' trophy shape?", options: ["A Knife", "A Chef's Hat", "An Apron", "A Plate"], correct: 1 },
    { q: "Which show features a common man asking 'Aapka Kya Hoga Janab-e-Aali'?", options: ["Office Office", "Bhabiji Ghar Par Hai", "Flop Show", "Dekh Bhai Dekh"], correct: 0 }
];

const StarLineUp = () => {
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [targetImage, setTargetImage] = useState('');
    const [isFinished, setIsFinished] = useState(false);

    // Create a reference to the top of the reveal section
    const revealSectionRef = useRef(null);

    useEffect(() => {
        const now = new Date();
        const target = new Date(REVEAL_DATE_IST);
        if (now >= target) {
            setTargetImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVp7SBi1bqOik8QH9ogzJ98LT1VWP6JZxSmw&s");
        } else {
            setTargetImage("https://media.gettyimages.com/id/1469393237/video/4k-glowing-yellow-neon-text-coming-soon.jpg?s=640x640&k=20&c=dzDQuuUIod8gcf-EXQzeEXaz0iHZA6hXLn39p6QdJeI=");
        }

        const shuffled = [...questionPool].sort(() => 0.5 - Math.random()).slice(0, 4);
        setSelectedQuestions(shuffled);
    }, []);

    const handleAnswer = (index) => {
        if (index === selectedQuestions[currentStep].correct) {
            const nextStep = currentStep + 1;
            setCurrentStep(nextStep);

            if (nextStep === 4) {
                setIsFinished(true);
                // Specifically scroll to the top of THIS component
                revealSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else {
            alert("Wrong! The curtains won't budge. Try again!");
        }
    };

    return (
        <div className="star-reveal-container" ref={revealSectionRef}>
            <section className="reveal-section">
                <h1 className="gold-subtitle">Star Night 2</h1>

                <div className="theatre-stage">
                    {currentStep === 4 && (
                        <img
                            src={targetImage}
                            alt="Revealed Content"
                            className="stage-img reveal-fade-in"
                        />
                    )}

                    <div
                        className="curtain-panel curtain-left"
                        style={{ transform: `translateX(-${currentStep * 25}%)` }}
                    ></div>
                    <div
                        className="curtain-panel curtain-right"
                        style={{ transform: `translateX(${currentStep * 25}%)` }}
                    ></div>
                </div>

                <div className="status-container">
                    {isFinished ? (
                        <h2 className="celebration-text">🎉 REVEALED! 🎉</h2>
                    ) : (
                        <p className="scroll-hint">Unlock the curtains by answering the quiz below ↓</p>
                    )}
                </div>
            </section>

            {!isFinished && selectedQuestions.length > 0 && (
                <section className="quiz-section">
                    <div className="quiz-card">
                        <div className="progress-bar">
                            {"●".repeat(currentStep)}{"○".repeat(4 - currentStep)}
                        </div>
                        <h2 className="question-text">{selectedQuestions[currentStep].q}</h2>
                        <div className="options-grid">
                            {selectedQuestions[currentStep].options.map((opt, i) => (
                                <button
                                    key={i}
                                    className="option-btn"
                                    onClick={() => handleAnswer(i)}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default StarLineUp;