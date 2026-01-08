import '../style/DevTeam.css';

// 1. IMPORT ALL IMAGES INDIVIDUALLY
// This avoids "require" errors and pathing issues.
import Mem5 from '../assets/images/devcrew/Anushka Ahirrao.jpeg';
import Mem9 from '../assets/images/devcrew/Arya Hawaldar.png';
import Mem10 from '../assets/images/devcrew/Kajal Israni.jpeg';
import Mem3 from '../assets/images/devcrew/Kuhu Kelkar.jpeg';
import LeadImg from '../assets/images/devcrew/lead.png';
import Mem8 from '../assets/images/devcrew/Manaswi Pensalwar.png';
import Mem6 from '../assets/images/devcrew/Mrunmayi Jawalekar.png';
import Mem2 from '../assets/images/devcrew/Riya Morankar.png';
import Mem7 from '../assets/images/devcrew/Shikha Pawar.JPG'; // Note: uppercase extension
import Mem4 from '../assets/images/devcrew/Shruti Bhavsar.jpeg';
import Mem1 from '../assets/images/devcrew/Sneha Mukane.png';

const DevCrew = () => {
    // 2. MAP DATA TO THE IMPORTED VARIABLES
    const members = [
        { id: 1, name: "Sneha Mukane", img: Mem1 },
        { id: 5, name: "Anushka Ahirrao", img: Mem5 },
        { id: 2, name: "Riya Morankar", img: Mem2 },
        { id: 9, name: "Arya Hawaldar", img: Mem9 },
        { id: 4, name: "Shruti Bhavsar", img: Mem4 },
        { id: 10, name: "Kajal Israni", img: Mem10 },
        { id: 8, name: "Manaswi Pensalwar", img: Mem8 },
        { id: 6, name: "Mrunmayi Jawalekar", img: Mem6 },
        { id: 7, name: "Shikha Pawar", img: Mem7 },
        { id: 3, name: "Kuhu Kelkar", img: Mem3 },    
    ];

    return (
        <div className="tv-studio-body">
            <div className="tv-studio">
                <header className="header-area">
                    <h1>THE DEV CREW</h1>
                    <div className="on-air">● ON AIR</div>
                </header>

                <main className="container">
                    {/* LEAD SECTION */}
                    <section className="lead-section">
                        <p className="section-title">Lead Frontend Architect</p>
                        <div className="tv-screen lead">
                            <div className="screen-content">
                                <img src={LeadImg} alt="Lead Architect" />
                                <div className="info">
                                    <span className="name">Sameeksha Tantak</span>
                                </div>
                            </div>
                            <div className="scanlines"></div>
                        </div>
                    </section>

                    {/* GRID SECTION */}
                    <p className="section-title">Component Developers</p>
                    <div className="tv-grid">
                        {members.map((member) => (
                            <div key={member.id} className="tv-screen">
                                <div className="screen-content">
                                    <img
                                        src={member.img}
                                        alt={member.name}
                                        loading="lazy"
                                    />
                                    <span className="name">{member.name}</span>
                                </div>
                                <div className="scanlines"></div>
                            </div>
                        ))}
                    </div>

                    <footer className="footer-tag">
                        BUILT WITH ENTHUSIASM FOR GANDHAAR 2026
                    </footer>
                </main>
            </div>
        </div>
    );
};

export default DevCrew;