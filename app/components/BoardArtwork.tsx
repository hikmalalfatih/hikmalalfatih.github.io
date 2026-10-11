export default function BoardArtwork() {
  return (
    <svg
      className="board-artwork"
      viewBox="0 0 420 500"
      role="img"
      aria-label="Original illustration of a generic electronic logic board"
    >
      <defs>
        <linearGradient id="board" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#0A84FF" />
          <stop offset="1" stopColor="#5E5CE6" />
        </linearGradient>
        <radialGradient id="chip">
          <stop stopColor="#5ac8fa" stopOpacity=".36" />
          <stop offset="1" stopColor="#0A84FF" stopOpacity=".04" />
        </radialGradient>
      </defs>
      <rect x="45" y="54" width="330" height="390" rx="56" fill="#0c1421" stroke="#3b82f6" strokeOpacity=".28" />
      <path d="M210 118v52m0 160v52M112 250h58m160 0h-58M145 140l40 40m90 140 40 40m0-220-40 40m-90 140-40 40" fill="none" stroke="url(#board)" strokeWidth="5" strokeLinecap="round" />
      <path d="M210 90v28m0 264v28M80 250h32m196 0h32M114 116l31 24m160 220 31 24m0-268-31 24m-160 220-31 24" fill="none" stroke="#8bdcff" strokeOpacity=".6" strokeWidth="2" />
      <circle cx="210" cy="250" r="100" fill="url(#chip)" />
      <rect x="170" y="210" width="80" height="80" rx="15" fill="#101f36" stroke="#72c7ff" strokeOpacity=".8" />
      <rect x="184" y="224" width="52" height="52" rx="9" fill="#122b4a" stroke="#a5e3ff" strokeOpacity=".55" />
      <path d="M94 178h35m162 144h35M130 350v-31m160-138v-31" stroke="#5ac8fa" strokeWidth="4" strokeLinecap="round" />
      {[
        [100, 178],
        [326, 322],
        [130, 350],
        [290, 150],
        [210, 116],
        [112, 250],
        [308, 250],
        [210, 384],
      ].map(([cx, cy], index) => (
        <circle key={index} cx={cx} cy={cy} r="6" fill="#a5e3ff" />
      ))}
      <circle cx="210" cy="250" r="134" fill="none" stroke="#0A84FF" strokeOpacity=".16" />
      <circle cx="210" cy="250" r="150" fill="none" stroke="#5E5CE6" strokeOpacity=".12" />
    </svg>
  );
}
