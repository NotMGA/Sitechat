import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-2 left-1/2 transform -translate-x-1/2 bg-[#F3DFBD] text-gray-900 max-w-3xl rounded-full shadow-md z-50   flex items-center w-auto">
      {/* Titre avec fond bleu collé aux liens */}
      <h1 className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm flex items-center">
        🐱 Arche de Néo
      </h1>

      {/* Liens de navigation directement à côté du titre */}
      <div className="flex space-x-4 text-sm ml-4 px-5">
        <Link to="/" className="hover:text-blue-600 transition">
          Accueil
        </Link>
        <Link to="/chats" className="hover:text-blue-600 transition">
          Chats à adopter
        </Link>
        <Link to="/contact" className="hover:text-blue-600 transition">
          Contact
        </Link>
        <Link to="/admin" className="hover:text-blue-600 transition">
          Admin
        </Link>
      </div>
    </nav>
  );
}
