import { useState } from "react";
import API_BASE_URL from "../config/apiConfig";
interface AddFormProps {
  onClose: () => void; // pour fermer la modale après ajout
}

export default function AddForm({ onClose }: AddFormProps) {
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [sexe, setSexe] = useState("M");
  const [typeHome, setTypeHabitat] = useState("Appartement");
  const [qualites, setQualites] = useState<string[]>([]);
  const [prixAdoption, setPrixAdoption] = useState<number | "">("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [currentQualite, setCurrentQualite] = useState("");
  const [currentPhoto, setCurrentPhoto] = useState("");

  const handleAddQualite = () => {
    if (currentQualite.trim()) {
      setQualites([...qualites, currentQualite]);
      setCurrentQualite("");
    }
  };

  const handleAddPhoto = () => {
    if (currentPhoto.trim()) {
      setPhotos([...photos, currentPhoto]);
      setCurrentPhoto("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newChat = {
      nom,
      description,
      qualites, // tableau
      age,
      image: photos[0] || "", // première photo comme image principale
      sexe,
      typeHome,
      prixAdoption,
      photos, // tableau
    };

    try {
      const token = localStorage.getItem("adminToken"); // ou là où tu stockes le token
      if (!token) {
        alert("Vous devez être connecté en tant qu'admin");
        return;
      }

      const res = await fetch(`${API_BASE_URL}/api/chats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 🔐 Token obligatoire pour passer le `verifyAdminToken`
        },
        body: JSON.stringify(newChat),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Erreur lors de l'ajout du chat");
      }

      alert("Chat ajouté avec succès !");
      onClose(); // Ferme la modale
      window.location.reload();
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        alert("Erreur : " + err.message);
      } else {
        alert("Erreur inconnue");
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-xl shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2"
        >
          ❌
        </button>
        <h2 className="text-2xl font-bold mb-4">Ajouter un chat</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">Nom :</label>
            <input
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="w-full border p-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Description :</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border p-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Âge :</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full border p-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Sexe :</label>
            <select
              value={sexe}
              onChange={(e) => setSexe(e.target.value)}
              className="w-full border p-2"
            >
              <option value={"M"}>Mâle</option>
              <option value={"F"}>Femelle</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold">Habitat :</label>
            <select
              value={typeHome}
              onChange={(e) => setTypeHabitat(e.target.value)}
              className="w-full border p-2"
            >
              <option>Appartement</option>
              <option>Maison</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold">Qualités :</label>
            <div className="flex gap-2">
              <input
                value={currentQualite}
                onChange={(e) => setCurrentQualite(e.target.value)}
                className="flex-1 border p-2"
              />
              <button
                type="button"
                onClick={handleAddQualite}
                className="bg-green-600 text-white px-4 py-2"
              >
                +
              </button>
            </div>
            <div className="mt-2 flex gap-2 flex-wrap">
              {qualites.map((q, i) => (
                <span key={i} className="bg-blue-200 px-3 py-1 rounded-full">
                  {q}
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-semibold">Photos (URL) :</label>
            <div className="flex gap-2">
              <input
                value={currentPhoto}
                onChange={(e) => setCurrentPhoto(e.target.value)}
                className="flex-1 border p-2"
              />
              <button
                type="button"
                onClick={handleAddPhoto}
                className="bg-blue-600 text-white px-4 py-2"
              >
                +
              </button>
            </div>
            <div className="mt-2">
              {photos.map((url, i) => (
                <p key={i} className="text-sm">
                  {url}
                </p>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-semibold">Prix adoption (€) :</label>
            <input
              type="number"
              value={prixAdoption}
              onChange={(e) => setPrixAdoption(Number(e.target.value))}
              className="w-full border p-2"
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded"
            >
              Valider
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
