"use client";

import { useEffect, useState } from "react";

export default function MobileImageCycle({ images }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length === 0) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <div className="mobile-cycle-wrp">
      {images.map((src, i) => (
        <img key={src} src={src} alt="" className={`mobile-cycle-img${i === index ? " active" : ""}`} />
      ))}
    </div>
  );
}
