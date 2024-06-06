import React from "react";
import "./TabButton.css";

interface TabButtonProps {
  onSelect: () => void;
  onClick: () => void;
  active: boolean;
  children: React.ReactNode;
}

export default function TabButton({
  onSelect,
  onClick,
  active,
  children,
}: TabButtonProps) {
  return (
    <button
      className="tab-button"
      style={{ backgroundColor: active ? "#064aaf" : "#2b2929" }}
      onClick={() => {
        onClick();
        onSelect();
      }}
    >
      {children}
    </button>
  );
}
