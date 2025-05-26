import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom"; // N'oublie pas d'importer Link

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="w-full border-b border-[#E5E8EB] bg-[#FCFAF7] text-[#1b140d] ">
      <div className=" mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold">L'Arche de Néo</div>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-6 font-medium">
          <li className="hover:text-[#9a704c] cursor-pointer">
            <Link to="/">Accueil</Link>
          </li>
          <li className="hover:text-[#9a704c] cursor-pointer">
            <Link to="/chats">Adoption</Link> {}
          </li>
          <li className="hover:text-[#9a704c] cursor-pointer">Actualités</li>
          <li className="hover:text-[#9a704c] cursor-pointer">Contact</li>
        </ul>

        {/* Mobile burger icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col text-xl gap-4 px-6 pb-4 font-medium bg-[#f3ede7]">
          <li className="hover:text-[#9a704c] cursor-pointer">Accueil</li>
          <li className="hover:text-[#9a704c] cursor-pointer">Adoption</li>
          <li className="hover:text-[#9a704c] cursor-pointer">Actualités</li>
          <li className="hover:text-[#9a704c] cursor-pointer">Contact</li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
