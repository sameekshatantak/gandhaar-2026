import { useEffect, useRef, useState } from "react";
import "../style/Carousel.css";


const ALL_IMAGES = Object.values(
  import.meta.glob(
    "../assets/images/image_gallery/*.{png,jpg,jpeg,svg}",
    {
      eager: true,
      query: "?url",
      import: "default",
    }
  )
);


const VISIBLE = 11;
const CHANGE_TIME = 5000;

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function Carousel() {
  const itemsRef = useRef([]);
  const imagePool = useRef(shuffle(ALL_IMAGES));
  const usedImages = useRef([]);
  const [isMobileView, setIsMobileView] = useState(false);

  /* ===== INITIAL IMAGES ===== */
  useEffect(() => {
    itemsRef.current.forEach((el, i) => {
      if (!el || !imagePool.current.length) return;

      const img = imagePool.current.shift();
      usedImages.current.push(img);

      el.style.setProperty("--_image-url", `url(${img})`);
    });
  }, []);

  /* ===== RANDOM IMAGE REPLACEMENT ===== */
  useEffect(() => {
    const interval = setInterval(() => {
      if (!itemsRef.current.length) return;

      if (imagePool.current.length === 0) {
        imagePool.current = shuffle(usedImages.current);
        usedImages.current = [];
      }

      const newImg = imagePool.current.shift();
      usedImages.current.push(newImg);

      const index = Math.floor(Math.random() * itemsRef.current.length);
      const el = itemsRef.current[index];

      if (el) {
        el.style.setProperty("--_image-url", `url(${newImg})`);
      }
    }, CHANGE_TIME);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`carousel-page ${isMobileView ? "mobile" : "web"}`}>
      
      {/* VIEW SWITCH */}
      <div className="top-view-switch">
        <button onClick={() => setIsMobileView(v => !v)}>
          Switch to {isMobileView ? "Website View" : "Mobile View"}
        </button>
      </div>

      <h1 className="carousel-title">IMAGE GALLERY</h1>

      <div className="carousel">
        <div className="carousel-rotation-direction">
          <ul
            className="carousel-item-wrapper"
            style={{ "--_num-elements": VISIBLE }}
          >
            {Array.from({ length: VISIBLE }).map((_, i) => (
              <li
                key={i}
                ref={el => (itemsRef.current[i] = el)}
                className="carousel-item"
                style={{ "--_index": i + 1 }}
              >
                <div className="film-holes">
                  <a href="#!" aria-label={`Image ${i + 1}`} />
                </div>
              </li>
            ))}

            <li className="carousel-ground" />
          </ul>
        </div>
      </div>
    </div>
  );
}
