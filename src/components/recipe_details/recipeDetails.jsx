import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageNotFound from "../page_not_foud/404";

export default function RecipeDetails() {
  const [data, setData] = useState({});
  const [found, setFound] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const param = useParams();
  const [favourite, setFavourite] = useState(() => {
    const saved = localStorage.getItem("favouriteItem");
    return saved ? JSON.parse(saved) : {};
  });
  function handleFavourite(id) {
    setFavourite((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      localStorage.setItem("favouriteItem", JSON.stringify(updated));
      return updated;
    });
  }
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`https://dummyjson.com/recipes/${param.id}`);
        if (!res.ok) setFound(false);
        const data = await res.json();
        setData(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [param.id]);
  if (!found) return <PageNotFound />;
  return (
    <>
      {error ? (
        <p
          className="text-xl mb-10 text-center pt-32"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Some Error Occured. Please Try again
        </p>
      ) : loading ? (
        <p
          className="text-xl mb-10 text-center pt-32"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Loading Data Please Wait...
        </p>
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 p-6">
          <div className="max-w-5xl mx-auto">
            {/* Header Card */}

            <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl border border-white/40 overflow-hidden">
              {/* Image */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <img
                  src={data?.image}
                  alt={data?.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleFavourite(param.id);
                  }}
                  className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/80 backdrop-blur flex items-center justify-center shadow-md hover:scale-110 transition"
                >
                  {favourite[param.id] ? "❤️" : "🤍"}
                </button>
                {/* gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                {/* Title */}
                <div className="absolute bottom-5 left-5 right-5">
                  <h2
                    className="text-3xl md:text-4xl text-white drop-shadow"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    {data?.name}
                  </h2>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {/* Cuisine */}
                    {data?.cuisine && (
                      <span className="px-3 py-1 rounded-full bg-white/85 text-gray-800 text-sm font-semibold">
                        🌍 {data.cuisine}
                      </span>
                    )}

                    {/* Difficulty */}
                    {data?.difficulty && (
                      <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold">
                        ⚡ {data.difficulty}
                      </span>
                    )}

                    {/* Meal Types (array chips) */}
                    {(data?.mealType || []).map((m, i) => (
                      <span
                        key={`${m}-${i}`}
                        className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-semibold"
                      >
                        🍽️ {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="p-6 md:p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="rounded-2xl bg-white/60 border border-white/50 p-4">
                    <p className="text-xs text-gray-500">Prep</p>
                    <p className="text-lg font-semibold text-gray-800">
                      ⏱️ {data?.prepTimeMinutes}m
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/60 border border-white/50 p-4">
                    <p className="text-xs text-gray-500">Cook</p>
                    <p className="text-lg font-semibold text-gray-800">
                      🔥 {data?.cookTimeMinutes}m
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/60 border border-white/50 p-4">
                    <p className="text-xs text-gray-500">Servings</p>
                    <p className="text-lg font-semibold text-gray-800">
                      👥 {data?.servings}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/60 border border-white/50 p-4">
                    <p className="text-xs text-gray-500">Calories</p>
                    <p className="text-lg font-semibold text-gray-800">
                      🍯 {data?.caloriesPerServing}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="mt-6 flex items-center justify-between rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white px-5 py-4 shadow-lg">
                  <p className="font-semibold">
                    ⭐ {data?.rating} <span className="opacity-90">/ 5</span>
                  </p>
                  <p className="text-sm opacity-90">
                    {data?.reviewCount} reviews
                  </p>
                </div>

                {/* Tags (array chips) */}
                {(data?.tags || []).length > 0 && (
                  <div className="mt-7">
                    <h3
                      className="text-xl mb-3 text-gray-900"
                      style={{ fontFamily: "Playfair Display, serif" }}
                    >
                      🏷️ Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {data.tags.map((tag, i) => (
                        <span
                          key={`${tag}-${i}`}
                          className="px-3 py-1 rounded-full bg-white border border-orange-100 text-orange-700 text-sm font-semibold hover:bg-orange-50 transition"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Two column section */}
                <div className="mt-8 grid md:grid-cols-2 gap-6">
                  {/* Ingredients */}
                  <div className="rounded-3xl bg-white/70 border border-white/50 shadow p-6">
                    <h3
                      className="text-xl mb-4 text-gray-900"
                      style={{ fontFamily: "Playfair Display, serif" }}
                    >
                      🧾 Ingredients
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      {(data?.ingredients || []).map((ing, i) => (
                        <li key={`${ing}-${i}`} className="flex gap-2">
                          <span className="mt-1 text-orange-500">•</span>
                          <span>{ing}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Instructions */}
                  <div className="rounded-3xl bg-white/70 border border-white/50 shadow p-6">
                    <h3
                      className="text-xl mb-4 text-gray-900"
                      style={{ fontFamily: "Playfair Display, serif" }}
                    >
                      👨‍🍳 Instructions
                    </h3>
                    <ol className="space-y-3 text-gray-700 list-decimal list-inside">
                      {(data?.instructions || []).map((step, i) => (
                        <li key={`${step}-${i}`} className="leading-relaxed">
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
