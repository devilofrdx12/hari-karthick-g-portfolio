export default function Akira({ soundOn, toggleSound }) {
  return (
    <img
      src="/images/akira.gif"
      alt="akira"
      className="Akira-character"
      onClick={toggleSound}
      whileTap={{ scale: 0.9 }}
      draggable="false"
      style={{
        filter: soundOn
        ? "none"
        : "grayscale(1) brightness(0.6)"
      }}
    />
  );
}