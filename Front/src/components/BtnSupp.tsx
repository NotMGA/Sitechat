import API_BASE_URL from "../config/apiConfig";
interface BtnSuppProps {
  chatId: number;
  chatName: string;
  onDeleteSuccess: () => void;
}

export default function BtnSupp({
  chatId,
  chatName,
  onDeleteSuccess,
}: BtnSuppProps) {
  const handleDelete = async () => {
    const confirm = window.confirm(
      `Voulez-vous vraiment supprimer ${chatName} ?`
    );
    if (!confirm) return;

    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        alert(
          "Vous devez être connecté en tant qu'admin pour supprimer ce chat."
        );
        return;
      }

      const res = await fetch(`${API_BASE_URL}/api/chats/${chatId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || "Erreur lors de la suppression");
      }

      alert(`${chatName} a bien été supprimé.`);
      onDeleteSuccess(); // Permet de rafraîchir la liste des chats côté parent
    } catch (err: any) {
      console.error("Erreur de suppression :", err);
      alert(err.message || "Impossible de supprimer ce chat");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full text-sm hover:bg-red-800 transition-all"
    >
      ❌
    </button>
  );
}
