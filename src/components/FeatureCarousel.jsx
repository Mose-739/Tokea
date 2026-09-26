import { useEffect, useState } from "react";

export default function FeatureCarousel({ items }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [items.length]);

  return (
    <div className="feature-carousel">
      <div className="feature-carousel-viewport">
        <div
          className="feature-carousel-track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {items.map((b) => (
            <article className="feature-slide hmb" key={b.title}>
              <i className={b.icon} />
              <div>
                <strong>{b.title}</strong>
                <small>{b.sub}</small>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="feature-dots" role="tablist" aria-label="Features">
        {items.map((b, i) => (
          <button
            key={b.title}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={b.title}
            className={`feature-dot ${i === index ? "feature-dot-active" : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
