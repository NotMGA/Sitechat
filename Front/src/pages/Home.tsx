import "../index.css";
import ImageBox from "../components/boximg";
import ActualiteCard from "../components/actured";
import ActionsBox from "../components/actionsbox";

export default function Home() {
  return (
    <div className="flex p-50 font-PlusJakartaSans flex-col items-center  min-h-screen bg-[#FCFAF7] text-gray-800 px-[15%]  pt-0">
      {/* Bannière */}
      <ImageBox
        title="Savons enssemble les chats abandonnés"
        buttonLabel="Faire un don"
        onClick={() => alert("Merci pour votre soutien !")}
        image="https://www.assuropoil.fr/wp-content/uploads/2023/07/avoir-un-chat-sante.jpg"
      ></ImageBox>
      {/* Section Infos */}
      <div className="flex flex-between  flex-col mt-10 w-full">
        <h2 className="text font-bold text-3xl">Dernieres actualités</h2>
        <ActualiteCard
          date="23 mars 2023"
          title="Adoption de chatons à l'Arche de Néo"
          description="Vous cherchez un compagnon pour la vie ? Venez adopter un de nos chatons !"
          image="https://cdn.usegalileo.ai/replicate/9f0b67ba-7fa4-4b9d-821f-a8f736c0251e.png"
        />
        <ActualiteCard
          date="23 mars 2023"
          title="Adoption de chatons à l'Arche de Néo"
          description="Vous cherchez un compagnon pour la vie ? Venez adopter un de nos chatons !"
          image="https://cdn.usegalileo.ai/replicate/9f0b67ba-7fa4-4b9d-821f-a8f736c0251e.png"
        />
      </div>
      <div>
        <h2 className="text font-bold text-3xl mt-10">Nos actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <ActionsBox
            image="https://cdn.usegalileo.ai/replicate/9f0b67ba-7fa4-4b9d-821f-a8f736c0251e.png"
            title="Adopter"
            description="Venez adopter un chaton ou un chat adulte"
          />
          <ActionsBox
            image="https://cdn.usegalileo.ai/replicate/9f0b67ba-7fa4-4b9d-821f-a8f736c0251e.png"
            title="Agir"
            description="Participtez a nos actions de terrain "
          />
          <ActionsBox
            image="https://cdn.usegalileo.ai/replicate/9f0b67ba-7fa4-4b9d-821f-a8f736c0251e.png"
            title="Sensibiliser "
            description="Organisez des journee de sensibilisation dans votre ville"
          />
          <ActionsBox
            image="https://cdn.usegalileo.ai/replicate/9f0b67ba-7fa4-4b9d-821f-a8f736c0251e.png"
            title="Soigner"
            description="Aidez-nous a soigner les chats maltraites ou abandonnes "
          />
        </div>
      </div>
    </div>
  );
}
