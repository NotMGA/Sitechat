import { useState, useEffect } from "react";
import "../index.css";
import API_BASE_URL from "../config/apiConfig";

type Chat = {
  id: number;
  nom: string;
  age: number;
  sexe: string;
  photos: string[];
};

export default function FeatureCard() {
  const [chats, setChats] = useState<Chat[]>([]); // ✅ Spécifie le type de `chats`
  const [currentIndex, setCurrentIndex] = useState(0); // 🔄 Chat affiché

  // 🔹 Récupérer les chats depuis l'API
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/chats`) // 🔥 Mets l'URL correcte
      .then((response) => response.json())
      .then((data) => setChats(data))
      .catch((error) =>
        console.error("Erreur lors du chargement des chats :", error)
      );
  }, []);

  // 🔄 Changer le chat affiché toutes les 30 secondes
  useEffect(() => {
    if (chats.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % chats.length);
    }, 30000);

    return () => clearInterval(interval);
  }, [chats]);

  if (chats.length === 0) {
    return <div className="text-white">Chargement des chats...</div>; // ⏳ En attente des données
  }

  const currentCat = chats[currentIndex];
  return (
    <div
      className="flex flex-col lg:flex-row w-full h-auto max-w-full justify-center items-stretch bg-customGreen p-3 rounded-3xl relative shadow-xl shadow-black/50 
                  before:absolute before:inset-0 before:rounded-3xl before:pointer-events-none 
                  before:shadow-inner before:shadow-black/50 
                  after:absolute after:inset-0 after:rounded-3xl 
                  after:shadow-[5px_5px_15px_rgba(255,255,255,0.2)]
                  after:pointer-events-none"
    >
      <div className="bg-customGreen flex transform flex-col items-center w-full lg:w-[26%] rounded-tl-3xl p-6">
        {/* Image du chat */}
        <div className="w-[30vw] h-[30vw] lg:w-[18vw] lg:h-[18vw] rounded-full overflow-hidden mb-4 relative p-[4px]">
          {/* Contour en dégradé (bien foncé en haut, plus clair en bas) */}
          <div
            className="absolute inset-0 rounded-full p-[4px]"
            style={{
              background: "linear-gradient(135deg, #366a68 20%, #6fbcb8 80%)",
            }}
          ></div>

          {/* Image avec ombre intérieure en haut à gauche */}
          <div
            className="w-full h-full rounded-full bg-cover bg-center relative"
            style={{
              backgroundImage: `url(${currentCat.photos[0]})`, // 🔄 Change l’image
              boxShadow: "inset 10px 10px 20px rgba(0,0,0,0.8)", // Ombre en haut à gauche
            }}
          ></div>
        </div>

        {/* Nom du chat */}
        <h2 className="text-white text-3xl font-bold  mb-4 font-baloo">
          {currentCat.nom}
        </h2>

        {/* Informations du chat (Âge, Sexe, Taille) */}
        <div className="flex w-full justify-between space-x-6 font-nunito">
          <div className="bg-customRose p-2 rounded-lg shadow-md text-center flex-1">
            <span className="text-[#060a5d] font-semibold">
              {currentCat.age} mois
            </span>
          </div>
          <div className="bg-customRose p-2 rounded-lg shadow-md text-center flex-1">
            <span className="text-[#060a5d] font-semibold">
              {currentCat.sexe}
            </span>
          </div>
        </div>
        <div className="mt-5 ">
          <button
            className={`bg-customOrange hover:bg-customOrangehover text-white font-nunito font-bold py-2 px-4 rounded-full hover:scale-105 hover:shadow-lg transition-all duration-300 `}
          >
            Adopter
          </button>
        </div>
      </div>

      <div className="flex flex-col w-full">
        <div className="bg-customGreen w-full p-6 rounded-r-3xl h-[50%] shadow-none">
          <h1 className="text-2xl lg:text-3xl font-bold text-white font-baloo">
            Adoptez un ami pour la vie !
          </h1>
          <span className="text-sm lg:text-base font-nunito leading-relaxed">
            Nous aidons les chats abandonnés à trouver une famille aimante.
            Découvrez nos petits protégés et donnez-leur une nouvelle maison
            !fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            Nous aidons les chats abandonnés à trouver une famille aimante.
            Découvrez nos petits protégés et donnez-leur une nouvelle maison
            !fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            Nous aidons les chats abandonnés à trouver une famille aimante.
            Découvrez nos petits protégés et donnez-leur une nouvelle maison
            !fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            Nous aidons les chats abandonnés à trouver une famille aimante.
            Découvrez nos petits protégés et donnez-leur une nouvelle maison
            !fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ❤️
          </span>
        </div>
        <div className="flex flex-col lg:flex-row w-full h-[50%]">
          <div
            className="bg-customRose pb-6 px-6 w-full lg:w-[25%] flex flex-col items-center rounded-l-3xl justify-center space-y-2 relative
          border-t-[2px] border-b-[2px] border-l-[2px] border-[#b96e6c] 
          before:absolute before:top-0 before:right-0 before:w-[100%] before:h-[100%] before:rounded-l-3xl 
          before:shadow-[inset_8px_8px_15px_rgba(0,0,0,0.5),inset_-2px_-2px_10px_rgba(255,255,255,0.3)]"
          ></div>
          <div
            className="bg-customOrange p-6 w-full lg:w-[75%] flex items-center rounded-3xl lg:-ml-5  flex-row relative
            border-t-[2px] border-b-[2px] border-r-[2px] border-l-[2px] border-[#d6782a]
          shadow-[8px_8px_15px_rgba(0,0,0,0.4), -2px_-2px_10px_rgba(255,255,255,0.2)]
          before:absolute before:top-0 before:right-0 before:w-[100%] before:h-[100%] before:rounded-3xl 
          before:shadow-[inset_-8px_8px_15px_rgba(0,0,0,0.5),inset_-2px_-2px_10px_rgba(255,255,255,0.3)]
          after:pointer-events-none
          before:pointer-events-none
          "
          >
            {/* Ombre personnalisée sauf à gauche */}
            <div className="  bg-customGreen rounded-2xl overflow-hidden shadow-lg">
              <img
                src="../../ressource/chaticon.png"
                className=" w-60 bg-center bg-cover relative"
              />
            </div>

            <div className="flex flex-col pl-5">
              <h1 className="text-2xl lg:text-3xl font-bold text-white font-baloo">
                Liste de tout nos petits pensionnaires à poils
              </h1>

              <span className="text-sm lg:text-base font-nunito">
                Nous avons de nombreux chats qui pourraient vous apporter du
                bonheur.
                fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
              </span>
              <div className="flex items-center h-full w-full justify-center  pt-10">
                <button
                  className={`bg-customGreen hover:bg-customGreenhover text-white font-nunito font-bold py-2 px-4 rounded-full hover:scale-105 hover:shadow-lg transition-all duration-300 `}
                >
                  Venez les voir
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
