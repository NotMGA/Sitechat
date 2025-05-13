import { useState, useEffect } from "react";
import CardChat from "../components/CardChat";
import AddForm from "../components/AddForm"; // Import du composant
import "../index.css";
import API_BASE_URL from "../config/apiConfig";

interface Chat {
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

export default function Chats() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false); // 👈 Pour ouvrir/fermer la modale d'ajout

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    setIsAdmin(!!token);
    fetchChats();
  }, []);

  const fetchChats = () => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/chats`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Problème lors de la récupération des chats");
        }
        return response.json();
      })
      .then((data) => {
        setChats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur de chargement :", err);
        setError("Impossible de charger les chats");
        setLoading(false);
      });
  };

  /**const handleDeleteChat = async (id: number) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce chat ?")) return;

    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`http://localhost:5000/api/chats/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Erreur lors de la suppression");

      setChats(chats.filter((chat) => chat.id !== id));
    } catch (err) {
      alert(err);
    }
  }; */

  if (loading) return <p className="text-center text-xl">Chargement...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="pt-10 flex flex-col items-center min-h-screen bg-gradient-to-b from-[#FFB085] to-[#FFD3B6] text-gray-800 p-[5%]">
      <h1 className="text-3xl font-bold text-center text-blue-600">
        Chats à adopter
      </h1>

      {isAdmin && (
        <button
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
          onClick={() => setShowAddForm(true)} // ✅ Ouvre la modale d'ajout
        >
          + Ajouter un chat
        </button>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mt-6">
        {chats.map((chat) => (
          <CardChat key={chat.id} {...chat} />
        ))}
      </div>

      {/* Modale AddForm */}
      {showAddForm && (
        <AddForm
          onClose={() => {
            setShowAddForm(false);
            fetchChats(); // 🔄 Recharge la liste après ajout
          }}
        />
      )}
    </div>
  );
}
