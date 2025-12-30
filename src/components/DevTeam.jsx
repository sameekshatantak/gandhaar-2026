import '../style/DevTeam.css';

const DevTeam = () => {
    const teamMembers = [
        { name: "YOUR NAME HERE", img: "https://picsum.photos/id/1011/150/150" },
        { name: "Member Name 1", img: "https://picsum.photos/id/1012/150/150" },
        { name: "Member Name 2", img: "https://picsum.photos/id/1027/150/150" },
        { name: "Member Name 3", img: "https://picsum.photos/id/1005/150/150" },
        { name: "Member Name 4", img: "https://picsum.photos/id/1062/150/150" },
        { name: "Member Name 5", img: "https://picsum.photos/id/1074/150/150" },
        { name: "Member Name 6", img: "https://picsum.photos/id/64/150/150" },
        { name: "Member Name 7", img: "https://picsum.photos/id/91/150/150" },
        { name: "Member Name 8", img: "https://picsum.photos/id/342/150/150" },
        { name: "Member Name 9", img: "https://picsum.photos/id/342/150/150" }
    ];

    return (
        <div className="dev-viewport">
            <div className="fixed-header-curtain">
                <h1 className="dev-title">MEET THE DEV CREW</h1>
            </div>

            <div className="credits-track">
                <div className="credits-content">
                    <div className="team-credits-grid">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="dev-member">
                                <img src={member.img} alt={member.name} />
                                <span className="dev-name">{member.name}</span>
                            </div>
                        ))}
                    </div>
                    <div className="dev-footer-text">Built with Passion for Gandhaar 2026</div>
                </div>
            </div>
        </div>
    );
};

export default DevTeam;