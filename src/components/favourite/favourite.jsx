import { useEffect, useState } from "react";

export default function Favourite() {
  const [favRecipes, setFavRecipes] = useState([]);
  const [error, setError] = useState(false);
  const [aginL, setAginL] = useState(true);
  const [loading, setLoading] = useState(false);
  const [favourite, setFavourite] = useState(() => {
    const saved = localStorage.getItem("favouriteItem");
    return saved ? JSON.parse(saved) : {};
  });
  useEffect(() => {
    async function fetchFavourite() {
      try {
        setLoading(true);
        const favIds = Object.entries(favourite)
          .filter(([, value]) => value)
          .map(([id]) => id);

        const responses = await Promise.all(
          favIds.map((id) =>
            fetch(`https://dummyjson.com/recipes/${id}`).then((res) =>
              res.json(),
            ),
          ),
        );
        setFavRecipes(responses);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
        setAginL(false)
      }
    }

    fetchFavourite();
  }, [favourite]);
  function handleFavourite(id) {
    setFavourite((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      localStorage.setItem("favouriteItem", JSON.stringify(updated));
      return updated;
    });
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1
          className="text-3xl md:text-4xl mb-8 text-center text-gray-900"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          ❤️ Your Favourite Recipes
        </h1>

        {error ? (
          <p
            className="text-xl mb-10 text-center"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Some Error Occured. Please Try again
          </p>
        ) : loading && aginL? (
          <p
            className="text-xl mb-10 text-center"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Loading Data Please Wait...
          </p>
        ) : favRecipes.length === 0 ? (
          <p
            className="text-lg text-center text-gray-600"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            No favourites yet. Tap ❤️ on any recipe to save it here.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favRecipes.map((item) => (
              <div
                key={item.id}
                className="group relative bg-white/70 backdrop-blur-lg rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/40"
              >
                <button
                  onClick={() => handleFavourite(item.id)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur flex items-center justify-center shadow-md hover:scale-110 transition"
                  aria-label="Toggle favourite"
                >
                  {favourite[item.id] ? "❤️" : "🤍"}
                </button>

                <div className="h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>

                <div className="p-5">
                  <h3
                    className="text-xl font-semibold text-gray-800 mb-3 line-clamp-1"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    {item.name}
                  </h3>

                  <div
                    className="grid grid-cols-2 gap-y-2 text-sm text-gray-600"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    <p>
                      <span className="font-medium">Prep:</span>{" "}
                      {item.prepTimeMinutes}m
                    </p>
                    <p>
                      <span className="font-medium">Cook:</span>{" "}
                      {item.cookTimeMinutes}m
                    </p>
                    <p>
                      <span className="font-medium">Calories:</span>{" "}
                      {item.caloriesPerServing}
                    </p>
                    <p>
                      <span className="font-medium">Servings:</span>{" "}
                      {item.servings}
                    </p>
                    <p>
                      <span className="font-medium">Cuisine:</span>{" "}
                      {item.cuisine}
                    </p>
                    <p>
                      <span className="font-medium">Level:</span>{" "}
                      <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 text-xs font-semibold">
                        {item.difficulty}
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t">
                    <span className="text-amber-500 font-semibold">
                      ⭐ {item.rating}
                    </span>
                    <span className="text-xs text-gray-500">
                      {item.reviewCount} reviews
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
