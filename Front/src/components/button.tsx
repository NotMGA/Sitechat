import React from "react";

interface ButtonProps {
  color: string;
  colorhover: string;
  onClick: () => void;
  children: React.ReactNode;
}

const RoundedButton: React.FC<ButtonProps> = ({
  color,
  colorhover,
  onClick,
  children,
}) => {
  return (
    <button
      className={`bg-${color} hover:bg-${colorhover} text-white font-nunito font-bold py-2 px-4 rounded-full `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default RoundedButton;
