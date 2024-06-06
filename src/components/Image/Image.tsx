import React from "react";
import "./Image.css";

interface LogoProps {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
}

export default function Logo({ src, alt, width, height }: LogoProps) {
  return (
    <div className="image">
      <img src={src} alt={alt} style={{ width, height }} />
    </div>
  );
}
