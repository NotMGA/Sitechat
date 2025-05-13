import { Link } from "react-router-dom";
import FeatureCard from "../components/FeatureCard";
import CardHome from "../components/CardHome";
import "../index.css";

export default function Home() {
  return (
    <div className="flex flex-col items-center  min-h-screen bg-gradient-to-b from-[#FFB085] to-[#FFD3B6] text-gray-800 p p-[5%] pt-0">
      {/* Bannière */}
      <h1 className=" font-baloo text-5xl font-bold text-[#12074d] mt-15  bg-opacity-50  py-3 rounded-lg">
        Bienvenue à l'arche de neo 🐱
      </h1>
      <FeatureCard />
      {/* Section Infos */}
      <div className="container mx-auto mt-15 grid grid-cols-1 md:grid-cols-3 gap-12 px-6">
        <CardHome
          titre="🐾 100+ Adoptions"
          color="customGreen"
          children=" Nous avons trouvé des familles pour plus de 100 chats cette année."
        />
        <CardHome
          titre="🏡 Familles heureuses"
          color="customRose"
          children="Nos adoptants sont ravis de leur compagnon à quatre pattes."
        />
        <CardHome
          titre="❤️ Soutenez-nous"
          color="customGreen"
          children="Aidez-nous à sauver plus de chats en faisant un don ou en devenant
            bénévole."
        />
        <CardHome
          titre="🐾 Contactez-nous"
          color="customGreen"
          children=" Nous pouvons repondre a toutes vos questiions."
        />

        <CardHome
          titre="🏡 Histoire de l asso "
          color="customRose"
          children="Venez en apprendre plus sur l hisoitre de notre asso"
        />
        <CardHome
          titre="🐾 Dernier chat adopter "
          color="customGreen"
          children=" voila le dernier chat adopter  "
        />
      </div>
    </div>
  );
}
