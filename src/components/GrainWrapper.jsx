import "../style/grain.css";

const GrainWrapper = ({ children, bgColor = "#b5422e" }) => {
  return (
    <section
      className="grain-wrapper"
      style={{ backgroundColor: bgColor }}
    >
      {/* noise layer */}
      <div className="grain-noise" />

      {/* content */}
      <div className="grain-inner">
        {children}
      </div>
    </section>
  );
};

export default GrainWrapper;
