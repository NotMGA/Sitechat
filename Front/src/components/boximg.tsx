import React from "react";

type ImageBoxProps = {
  image: string;
  title: string;
  buttonLabel?: string;
  onClick?: () => void;
};

export default function ImageBox({
  image,
  title,
  buttonLabel,
  onClick,
}: ImageBoxProps) {
  return (
    <div
      className="relative min-h-[70vh] w-full rounded-xl overflow-hidden bg-center bg-cover mt-4"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.4)), url(${image})`,
      }}
    >
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6">
        <h2 className="text-5xl font-black tracking-tight text-center max-w-[90%]">
          {title}
        </h2>
        {buttonLabel &&
          onClick && ( // Le bouton sera rendu seulement si buttonLabel ET onClick sont fournis
            <button
              onClick={onClick}
              className="mt-6 h-12 px-6 rounded-full bg-[#ec7813] text-white text-base font-bold tracking-wide hover:bg-orange-500 transition"
            >
              {buttonLabel}
            </button>
          )}
      </div>
    </div>
  );
}
