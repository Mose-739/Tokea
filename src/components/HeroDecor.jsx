/** Yellow hero shapes — clean SVG (no PNG seam lines) */
export function HeroCurveDesktop() {
  return (
    <svg
      className="hero-curve-svg"
      viewBox="0 0 320 320"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fill="#F5B800"
        d="M0 0h320v320H0V96C0 28 28 0 96 0H0z"
      />
    </svg>
  );
}

export function HeroBlobMobile() {
  return (
    <svg
      className="hero-blob-svg"
      viewBox="0 0 420 340"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fill="#F5B800"
        d="M420 0H140c-72 0-140 58-140 130v210h420V0z"
      />
    </svg>
  );
}
