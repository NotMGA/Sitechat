import { useState, useEffect } from "react";
import BtnSupp from "./BtnSupp";

interface ChatProps {
  id: number;
  nom: string;
  image: string;
  age: number;
  sexe: string;
  description: string;
  photos: string[];
  type_habitat: string;
  qualities: string[];
  prix_adoption: number;
  veto: string;
}

export default function CardChat({
  id,
  nom,
  image,
  age,
  sexe,
  description,
  veto,
  photos,
  type_habitat,
  qualities,
  prix_adoption,
}: ChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const isAdmin = localStorage.getItem("adminToken") !== null;

  // Désactive le scroll quand la modal est ouverte
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => setIsAnimating(true), 10); // Lance l'animation après ouverture
    } else {
      setIsAnimating(false);
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
  const handleDelete = async () => {
    if (!window.confirm(`Voulez-vous vraiment supprimer ${nom} ?`)) return;

    try {
      const res = await fetch(`http://localhost:5000/api/chats/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Erreur lors de la suppression");

      alert("Chat supprimé !");
      window.location.reload(); // 🔄 Rafraîchir la page après suppression
    } catch (err) {
      console.error("Erreur :", err);
      alert("Impossible de supprimer ce chat");
    }
  };

  return (
    <>
      {/* 📌 Carte normale */}
      <div
        className="p-6 rounded-lg  shadow-xl shadow-black/50 
                  before:absolute before:inset-0 before:rounded-lg 
                  before:shadow-inner before:shadow-black/20 
                  after:absolute after:inset-0 after:rounded-lg after:pointer-events-none before:pointer-events-none
                  after:shadow-[5px_5px_15px_rgba(255,255,255,0.2)] font-nunito bg-customGreen relative "
      >
        <img
          src={image}
          alt={nom}
          className="w-40 h-60 object-cover rounded-lg "
        />
        <div>
          <h2 className="text-xl font-bold mt-2 text-white font-baloo">
            {nom}
          </h2>
          <p className="text-white">Âge : {age} ans</p>
          <p className="text-white">Sexe : {sexe} </p>

          <button
            onClick={() => setIsOpen(true)}
            className="block bg-blue-500 text-white text-center mt-2 p-2 rounded-md w-full hover:bg-blue-700 scale-105 transition-all duration-300"
          >
            Voir plus
          </button>
          {isAdmin && (
            <BtnSupp
              chatId={id}
              chatName={nom}
              onDeleteSuccess={() => window.location.reload()}
            />
          )}
        </div>
      </div>

      {/* 📌 Modale avec animation */}
      {isOpen && (
        <div
          className={`fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md z-50 transition-opacity duration-300 ${
            isAnimating ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        >
          <div
            className={`bg-customGreen  border border-gray-300/50 p-6 rounded-xl w-[90%] lg:w-[50%] lg:h-[80vh] shadow-lg flex flex-col lg:flex-row transition-transform duration-300 ${
              isAnimating ? "scale-100" : "scale-95"
            }`}
            onClick={(e) => e.stopPropagation()} // Empêche la fermeture si on clique sur la modale
          >
            {/* 🔻 Image à gauche */}
            <div className="relative w-full lg:w-[45%] h-[50vh] lg:h-full flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={photos[currentPhoto]}
                alt={`${name} - ${currentPhoto + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Flèches de navigation affichées SEULEMENT si plusieurs images */}
              {photos.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentPhoto((prev) =>
                        prev === 0 ? photos.length - 1 : prev - 1
                      );
                    }}
                    className="absolute left-2 bg-black/50 text-white p-2 rounded-full"
                  >
                    ◀
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentPhoto((prev) =>
                        prev === photos.length - 1 ? 0 : prev + 1
                      );
                    }}
                    className="absolute right-2 bg-black/50 text-white p-2 rounded-full"
                  >
                    ▶
                  </button>
                </>
              )}
            </div>

            {/* 🔻 Infos à droite */}
            <div className="flex flex-col p-4 w-full lg:w-[55%] font-nunito text-lg leading-relaxed ">
              <div>
                <h2 className="text-2xl font-baloo font-bold">{nom}</h2>
                <p className="mt-2">{description}</p>
                <p>{veto}</p>
                {/* 🔻 Détails supplémentaires */}
                <div className="mt-4 space-y-3">
                  <p>
                    <strong>💰 Sexe :</strong> {sexe}
                  </p>
                  <p>
                    <strong>🏡 Habitat :</strong> {type_habitat}
                  </p>
                  <p>
                    {qualities.map((q) => (
                      <span
                        key={q}
                        className="bg-customOrange px-2 py-1 shadow-md rounded-full mx-1 text-white"
                      >
                        {q}
                      </span>
                    ))}
                  </p>

                  <p>
                    <strong>💰 Frais d'adoption :</strong> {prix_adoption}€
                  </p>
                </div>
              </div>

              {/* 🔻 Bouton d'adoption centré et plus petit */}
              <div className="flex justify-center mt-4">
                <button className="bg-customRose px-8 py-4 text-white hover:bg-customOrange transition-all duration-300 scale-105 rounded-lg font-bold">
                  Adopter {nom} ❤️
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
