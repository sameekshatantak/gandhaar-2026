import { useEffect, useRef } from "react";

export default function Navbar() {
  const bodyContainerRef = useRef(null);
  const bodyMainRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const ax = -((window.innerWidth / 2 - e.pageX) / 120);

      if (bodyContainerRef.current) {
        bodyContainerRef.current.style.transform = `rotateY(${ax}deg)`;
      }

      if (bodyMainRef.current) {
        bodyMainRef.current.style.transform = `rotate3D(0,1,0,${ax}deg)`;
        bodyMainRef.current.style.marginLeft = `${ax / 5}px`;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* ✅ STYLES LIVE HERE */}
      <style>{`
        * {
          box-sizing: border-box;
        }

        main {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: radial-gradient(100% 100% at 49.97% 0%, #7d8ba1 0%, #627591 100%);
        }

        .body-container {
          width: 226px;
          height: 852px;
          perspective: 1000px;
        }

        .body-main-border {
          padding: 1px;
          border-radius: 42px;
          background: linear-gradient(180deg, #d6d7d9, #ffffff, #818183);
          filter: drop-shadow(0px 140px 150px rgba(21, 31, 47, 0.55));
        }

        .body-main {
          height: 100%;
          border-radius: 41px;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: linear-gradient(180deg, #e9eaec, #959699);
        }

        .container-btns-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: 25px;
        }

        .btn-power {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #000000ff;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .invis {
          opacity: 0;
        }

        .mic-outer {
          flex: 1;
          height: 8px;
          margin: 0 20px;
          padding: 2px;
          border-radius: 20px;
          background: linear-gradient(180deg, #6d6f72, #fefeff);
        }

        .mic-inner {
          width: 100%;
          height: 100%;
          border-radius: 20px;
          background: #383838;
        }

        .container-btns-main {
          width: 100%;
          height: 194px;
          padding: 13px;
        }

        .btn-main-outer {
          width: 100%;
          height: 100%;
          border-radius: 1000px;
          background: #202020;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          padding: 42px;
        }

        .btn-main-inner {
          width: 100%;
          height: 100%;
          border-radius: 1000px;
          background: linear-gradient(180deg, #191919, #3e3e3e);
        }

        .dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #dfdfdf;
          position: absolute;
        }

        .dot-top { top: 9px; }
        .dot-right { right: 9px; }
        .dot-bottom { bottom: 9px; }
        .dot-left { left: 9px; }

        .container-btns-bottom {
          display: flex;
          justify-content: space-between;
          width: 100%;
          padding: 24px;
        }

        .btns-col-left,
        .btns-col-right {
          width: 78px;
          display: flex;
          flex-direction: column;
        }

        .btn-basic,
        .btn-volume {
          background: #202020;
          border-radius: 1000px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 14px;
        }

        .btn-basic {
          height: 78px;
        }

        .btn-volume {
          flex: 1;
          padding: 24px 0;
          flex-direction: column;
          justify-content: space-between;
        }

        .btn-side {
          width: 4px;
          height: 93px;
          background: #d9dadc;
          position: relative;
          left: -1px;
          margin-top: 133px;
        }

        .btn-basic {
  color: #dfdfdf;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
}

.btn-main-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
}

      `}</style>

      {/* ✅ JSX */}
      <main>
        <div className="body-container" ref={bodyContainerRef}>
          <div className="body-main-border">
            <div className="body-main" ref={bodyMainRef}>
              <div className="container-btns-top">
                <div className="btn-power invis"></div>
                <div className="mic-outer"><div className="mic-inner" /></div>
                <button className="btn-power">⏻</button>
              </div>

              <div className="container-btns-main">
  <div className="btn-main-outer">
    <div className="dot dot-top" />
    <div className="dot dot-right" />
    <div className="dot dot-bottom" />
    <div className="dot dot-left" />

    <div className="btn-main-inner">
      Home
    </div>
  </div>
</div>


              <div className="container-btns-bottom">
                <div className="btns-col-left">
                  <div className="btn-basic">Events</div>
                  <div className="btn-basic">Schedule</div>
                  <div className="btn-basic">About Us</div>
                </div>

                <div className="btns-col-right">
                  <div className="btn-basic">Star Lineup</div>
                  <div className="btn-volume">
                    <div>＋</div>
                    <div>－</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="btn-side"></div>
        </div>
      </main>
    </>
  );
}
