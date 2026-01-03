import "../style/Header.css";

export default function Header({ bgImage, height = "100vh" }) {
  return (
    <header
      className="header-image-only"
      style={{
        height,
        backgroundImage: `url(${bgImage})`,
      }}
    />
  );
}
