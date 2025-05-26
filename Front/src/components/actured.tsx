import React from "react";

interface ActualiteCardProps {
  date: string;
  title: string;
  description: string;
  image: string;
  onReadMore?: () => void; // pour le futur modal
}

const ActualiteCard: React.FC<ActualiteCardProps> = ({
  date,
  title,
  description,
  image,
  onReadMore,
}) => {
  return (
    <div className="flex w-full mt-6 flex-col md:flex-row  p-4 rounded-xl pb-0   ">
      {/* Texte à gauche */}
      <div className="flex flex-col justify-between flex-1 gap-2">
        <div>
          <p className="text-lg text-[#9a704c]">{date}</p>
          <h3 className="text-xl font-bold text-[#1b140d]">{title}</h3>
          <p className="text-lg text-[#9a704c]">{description}</p>
        </div>
        <button
          onClick={onReadMore}
          className="mt-2 w-fit px-4 h-8 bg-[#F2EDE8] text-[#1b140d] text-lg font-medium rounded-full hover:bg-[#e4dbd3] transition"
        >
          Lire l'article
        </button>
      </div>

      {/* Image à droite */}
      <div
        className="w-full md:w-60 aspect-video bg-cover bg-center rounded-xl"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
    </div>
  );
};

export default ActualiteCard;
