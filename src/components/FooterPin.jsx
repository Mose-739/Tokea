export default function FooterPin({ className = "" }) {
  return (
    <svg
      className={className}
      width="56"
      height="64"
      viewBox="0 0 56 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M28 2C18.06 2 10 10.06 10 20c0 10.2 16.4 38.2 17.6 40.1.7 1 1.7 1 2.4 0C31.2 58.2 48 30.2 48 20 48 10.06 39.94 2 28 2z"
        fill="#111111"
      />
      <rect x="18" y="12" width="20" height="12" rx="2.5" fill="#ffffff" />
      <rect x="20" y="8" width="16" height="6" rx="1.5" fill="#ffffff" />
      <rect x="22" y="14" width="4.5" height="3.5" rx="0.8" fill="#111111" />
      <rect x="29.5" y="14" width="4.5" height="3.5" rx="0.8" fill="#111111" />
      <circle cx="22" cy="27" r="2.5" fill="#ffffff" />
      <circle cx="34" cy="27" r="2.5" fill="#ffffff" />
    </svg>
  );
}
