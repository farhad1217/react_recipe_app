import { useState, useEffect } from "react";
import RecipeCard from "../recipe_card";

export default function Search() {
  const [search, setSerach] = useState("");
  const [data, setData] = useState([]);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [click, setClick] = useState(false)
  const [buttonClick, setButtonClick] = useState(false)
  const [appON, seAppON] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);
  useEffect(() => {
    async function fetchData() {
      if (!debouncedSearch.trim()) {
        setData([]);
        return;
      }
      const res = await fetch(
        `https://dummyjson.com/recipes/search?q=${encodeURIComponent(debouncedSearch)}`,
      );
      const dataa = await res.json();
      const onlyName = (dataa.recipes || []).map((item) => item.name);
      setData(onlyName);
    }
    fetchData();
  }, [debouncedSearch]);

  let display = [];
  function handleClick(text){
    setClick(true)
    setSerach(text)
  }
  function handleChange(event){
    setSerach(event.target.value)
    setClick(false)
    setButtonClick(false)
  }
  data.forEach((text, i) => {
    const s = debouncedSearch.trim();
    if (!s) return;
    let first = "";
    let searched = "";
    let last = "";
    if (s && text.toLowerCase().includes(s.toLowerCase())) {
      let index = text.toLowerCase().indexOf(s.toLowerCase());
      let len = s.length;
      first = text.slice(0, index);
      searched = text.slice(index, index + len);
      last = text.slice(index + len, text.length);
      display.push(
        <p onClick={()=>handleClick(first + searched + last)} key={`${text}-${i}`}>
          {first}
          <strong>{searched}</strong>
          {last}
        </p>,
      );
    }
  });
  function handleButtonClick(){
    setButtonClick(true)
    setClick(true)
    seAppON(true)
  }
  return (
   <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
  {/* Search Header */}
  <div className="px-4 pt-10 pb-6">
    <div className="mx-auto max-w-2xl">
      <h1
        className="text-3xl md:text-4xl text-center mb-6 text-gray-900"
        style={{ fontFamily: "Playfair Display, serif" }}
      >
        🍳 Recipe Finder
      </h1>

      <div className="relative">
        {/* Input + Button */}
        <div className="flex items-center gap-3 rounded-3xl bg-white/80 backdrop-blur-lg border border-white/60 shadow-xl px-4 py-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-orange-100 text-orange-700">
            🔎
          </span>

          <input
            type="text"
            value={search}
            onChange={handleChange}
            placeholder="Search recipes (e.g., pasta, chicken...)"
            className="w-full bg-transparent outline-none text-base md:text-lg text-gray-800 placeholder:text-gray-400"
          />

          <button
            onClick={handleButtonClick}
            className="shrink-0 rounded-2xl px-5 py-2.5 font-semibold text-white
                       bg-gradient-to-r from-orange-500 to-amber-500
                       hover:from-orange-600 hover:to-amber-600
                       active:scale-[0.98] transition shadow-lg"
          >
            Search
          </button>
        </div>

        {/* Suggestions Dropdown (only when typing + have matches) */}
        {!click && debouncedSearch.trim() && display.length > 0 && (
          <div className="absolute left-0 right-0 mt-3 z-50">
            <div className="rounded-3xl bg-white/90 backdrop-blur-xl border border-white/70 shadow-2xl overflow-hidden">
              <div className="max-h-72 overflow-auto">
                {display.map((item, idx) => (
                  <div
                    key={idx}
                    className="px-5 py-3 text-gray-800 hover:bg-orange-50 transition"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent" />
              <p className="px-5 py-3 text-xs text-gray-500">
                Click a suggestion to autofill.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>

  {/* Recipe Cards */}
  <RecipeCard
    serchedData={debouncedSearch}
    buttonClick={buttonClick}
    setButtonClick={setButtonClick}
    appON={appON}
  />
</div>
  );
}
