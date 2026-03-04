import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-orange-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link to={"/"}>
            <h1 className="text-2xl font-bold text-orange-600 tracking-wide"
                style={{ fontFamily: "Playfair Display, serif" }}>
            🍽️ Foodie
            </h1>
        </Link>
        {/* Links */}
        <div className="flex gap-6 text-gray-700 font-medium">
          <Link
            to="/"
            className="hover:text-orange-600 transition"
          >
            Home
          </Link>

          <Link
            to="/favourite"
            className="hover:text-orange-600 transition"
          >
            ❤️ Favourite
          </Link>

          <Link
            to="/all_recipes"
            className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow hover:scale-105 transition"
          >
            All Recipes
          </Link>
        </div>
      </div>
    </nav>
  );
}