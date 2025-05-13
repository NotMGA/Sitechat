import React, { ReactNode } from "react";
import "../index.css";

interface CardHomeProps {
  color: string;
  titre: string;
  children: ReactNode;
}

export default function CardHome({ color, titre, children }: CardHomeProps) {
  return (
    <div
      className={`p-6 rounded-3xl relative shadow-xl shadow-black/50 
                  before:absolute before:inset-0 before:rounded-3xl 
                  before:shadow-inner before:shadow-black/20 
                  after:absolute after:inset-0 after:rounded-3xl 
                  after:shadow-[5px_5px_15px_rgba(255,255,255,0.2)] opacity-90 bg-${color}  `}
    >
      <h1 className=" text-[#040847] font-baloo text-lg font-bold">{titre}</h1>
      <div className="text-[#040847] font-nunito mt-2">{children}</div>
    </div>
  );
}
