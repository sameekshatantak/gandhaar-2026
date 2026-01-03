import React from "react";
import "../style/Remote.css";

const Remote = () => {
    const buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <div className="remote-body">
            <div className="remote-sensor"></div>
            <div className="remote-power"></div>

            <div className="remote-grid">
                {buttons.map((num) => (
                    <button key={num} className="remote-num-btn">
                        {num}
                    </button>
                ))}
            </div>

            <div className="remote-rockers">
                <div className="rocker">
                    <span>+</span>
                    <p>CH</p>
                    <span>-</span>
                </div>
                <div className="rocker">
                    <span>+</span>
                    <p>VOL</p>
                    <span>-</span>
                </div>
            </div>

            <div className="remote-brand">RETRO-V</div>
        </div>
    );
};

export default Remote;