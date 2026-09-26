import tokeaIcon from "../assets/tokea-icon.png";

export default function BrandLogo({ className = "" }) {
  return (
    <span className={`brand-logo ${className}`}>
      <span className="brand-t">t</span>
      <img src={tokeaIcon} alt="" className="brand-o" aria-hidden="true" />
      <span className="brand-kea">kea</span>
    </span>
  );
}
