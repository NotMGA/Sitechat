import { useState, useEffect } from "react";
import BtnSupp from "./BtnSupp";

interface ChatProps {
  _id: string;
  nom: string;
  age: number;
  sexe: string;
  description: string;
  images: string[];
  typeHome: string;
  qualites: string[];
  prixAdoption: number;
  veto: string;
}

export default function CardChat({
  _id,
  nom,
  age,
  sexe,
  description,
  veto,
  images,
  typeHome,
  qualites,
  prixAdoption,
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
  /**const handleDelete = async () => {
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
  };*/

  return (
    <>
      {/* 📌 Carte normale */}
      <div className="relative">
        {isAdmin && (
          <BtnSupp
            chatId={_id}
            chatName={nom}
            onDeleteSuccess={() => window.location.reload()}
          />
        )}
        <div className="cursor-pointer" onClick={() => setIsOpen(true)}>
          <img
            src={images[0]}
            alt={nom}
            className=" w-full aspect-square object-cover rounded-lg "
          />

          <h2 className="text-2xl text-center font-bold mt-3 text-[#4B2E2E]">
            {nom}
          </h2>
          <div className="flex justify-center gap-4 text-[#9a704c] text-lg mt-1 font-medium ">
            <p className="text-[#9a704c] "> {age} ans</p>
            {sexe === "Mâle" ? "♂" : "♀"}
            <p className="text-[#9a704c]"> </p>
            {typeHome === "Maison" ? "🏠" : "🏢"}
            <p></p>
          </div>
        </div>
      </div>

      {/* 📌 Modale avec animation */}
      {isOpen && (
        <div
          className={`fixed inset-0 flex items-center  justify-center bg-black/30 backdrop-blur-md z-50 transition-opacity duration-300 ${
            isAnimating ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        >
          <div
            className={`bg-[#FCFAF7]  border border-gray-300/50 p-6 rounded-xl w-[90%] lg:w-[50%]  shadow-lg flex flex-col lg:flex-row transition-transform duration-300 ${
              isAnimating ? "scale-100" : "scale-95"
            }`}
            onClick={(e) => e.stopPropagation()} // Empêche la fermeture si on clique sur la modale
          >
            {/* 🔻 Image à gauche */}
            <div className="relative w-full lg:w-[45%] h-[50vh] self-center lg:h-full flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden font-PlusJakartaSans">
              <img
                src={images[currentPhoto]}
                alt={`${nom} - ${currentPhoto + 1}`}
                className="w-full h-full object-contain"
              />

              {/* Flèches de navigation affichées SEULEMENT si plusieurs images */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentPhoto((prev) =>
                        prev === 0 ? images.length - 1 : prev - 1
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
                        prev === images.length - 1 ? 0 : prev + 1
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
                <h2 className="text-3xl  font-bold text-center ">{nom}</h2>
                <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border-[#ccb9a7] border-1 rounded-lg p-2 mt-2">
                    <h2 className="font-bold">Qualités</h2>
                    <p>
                      {qualites.map((q) => (
                        <span
                          key={q}
                          className="bg-[#F2EDE8] px-2 py-1 shadow-md rounded-full mx-1 text-[#9a704c] "
                        >
                          {q}
                        </span>
                      ))}
                    </p>
                  </div>
                  <div className="border-[#ccb9a7] border-1 rounded-lg p-2 mt-2">
                    <h2 className="font-bold">Sexe</h2>
                    <p className="text-[#9a704c]">{sexe}</p>
                  </div>
                  <div className="border-[#ccb9a7] border-1 rounded-lg p-2 mt-2">
                    <h2 className="font-bold">Veterinaire</h2>
                    <p className="text-[#9a704c]">{veto}</p>
                  </div>
                  <div className="border-[#ccb9a7] border-1 rounded-lg p-2 mt-2">
                    <h2 className="font-bold">Habitat</h2>
                    <p className="text-[#9a704c]">{typeHome}</p>
                  </div>
                  <div className="border-[#ccb9a7] border-1 rounded-lg p-2 mt-2">
                    <h2 className="font-bold">Prix adoption</h2>
                    <p className="text-[#9a704c]">{prixAdoption}€</p>
                  </div>
                </div>
                <h2 className="font-bold mt-5"> Description</h2>
                <p className="mt-2 text-[#9a704c]">{description}</p>
                {/* 🔻 Détails supplémentaires */}
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
