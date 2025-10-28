import { Menu } from "lucide-react";

const Header = ({ onLogout, onToggleMenu, isSidebarOpen }) => {
  return (
    <header className="poppins text-white flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-500 shadow-md px-4 md:px-8 py-3 h-14 md:h-16">
      <div className="flex items-center gap-3 md:gap-5">
        {/* Menu button is ALWAYS visible */}
        <button
          onClick={onToggleMenu}
          aria-label="Toggle menu"
          aria-controls="admin-sidebar"
          aria-expanded={isSidebarOpen}
          className="p-1 border rounded-lg text-white 
                     hover:bg-white/20 hover:border-transparent active:bg-white/30
                     transition-all duration-300 ease-in-out cursor-pointer"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Logo + Title */}
        <div className="flex items-center gap-2">
          <h3 className="text-xl md:text-2xl font-bold tracking-wide">
            CampusBallot
          </h3>
        </div>
      </div>

      <button
        onClick={onLogout}
        className="hidden sm:inline-block text-white border border-white font-semibold px-4 py-2 rounded-xl shadow  cursor-pointer"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
