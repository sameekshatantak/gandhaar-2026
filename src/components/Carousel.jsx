import { useEffect, useRef, useState } from "react";
import "../style/Carousel.css";

/* Load all local images */
function importAll(r) {
  return r.keys().map(r);
}

const ALL_IMAGES = Object.values(
  import.meta.glob("../assets/images/image_gallery/*.{png,jpg,jpeg,svg}", {
    eager: true,
    import: "default"
  })
);

const VISIBLE = 11;
const CHANGE_TIME = 2500;

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function Carousel() {
  const itemsRef = useRef([]);
  const imagePool = useRef(shuffle(ALL_IMAGES));
  const usedImages = useRef([]);
  const [isMobileView, setIsMobileView] = useState(false);

  /* Initial images */
  useEffect(() => {
    for (let i = 0; i < VISIBLE; i++) {
      const img = imagePool.current.shift();
      usedImages.current.push(img);

      itemsRef.current[i].style.setProperty(
        "--_image-url",
        `url(${img})`
      );
    }
  }, []);

  /* Random image replacement (no rotation interruption) */
  useEffect(() => {
    const interval = setInterval(() => {
      if (imagePool.current.length === 0) {
        imagePool.current = shuffle(usedImages.current);
        usedImages.current = [];
      }

      const newImg = imagePool.current.shift();
      usedImages.current.push(newImg);

      const index = Math.floor(Math.random() * VISIBLE);
      itemsRef.current[index].style.setProperty(
        "--_image-url",
        `url(${newImg})`
      );
    }, CHANGE_TIME);

    return () => clearInterval(interval);
  }, []);

  return (
    
    <div className={`carousel-page ${isMobileView ? "mobile" : "web"}`}>
   
      {/* VIEW SWITCH BUTTON */}
      <div className="top-view-switch">
        
        <button onClick={() => setIsMobileView(!isMobileView)}>
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
            {[...Array(VISIBLE)].map((_, i) => (
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

            <li className="carousel-ground"></li>
          </ul>
        </div>

      </div>
    </div>
  );
}


