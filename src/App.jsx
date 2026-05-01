import { useState, useEffect } from "react";
import { supabase } from "./supabase";

export default function App() {
  const [demands, setDemands] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState("home");
  const [selected, setSelected] = useState(null);

  const [form, setForm] = useState({
    main_category: "",
    title: "",
    description: "",
    city: "",
    price: "",
    username: "",
    phone: ""
  });

  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);

  // FETCH
  const getData = async () => {
    let q = supabase
      .from("demands")
      .select("*")
      .order("created_at", { ascending: false });

    if (filter !== "all") q = q.eq("main_category", filter);
    if (search) q = q.ilike("title", `%${search}%`);

    const { data } = await q;
    setDemands(data || []);
  };

  useEffect(() => {
    getData();
  }, [filter, search]);

  // ADD
  const addDemand = async () => {
    const { error } = await supabase.from("demands").insert([form]);
    if (error) return alert(error.message);

    setPage("home");
    setForm({
      main_category: "",
      title: "",
      description: "",
      city: "",
      price: "",
      username: "",
      phone: ""
    });
    getData();
  };

  // MESSAGE
  const getMessages = async (id) => {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("demand_id", id)
      .order("created_at");

    setMessages(data || []);
  };

  const sendMessage = async () => {
    if (!selected) return;
    await supabase.from("messages").insert([
      { demand_id: selected.id, sender_name: "Ziyaretçi", message: msg }
    ]);
    setMsg("");
    getMessages(selected.id);
  };

  // ---------------- ADD PAGE ----------------
  if (page === "add") {
    return (
      <div className="max-w-xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Talep Oluştur</h2>

        <div className="space-y-3">
          <select
            className="w-full p-3 border rounded-lg"
            value={form.main_category}
            onChange={(e) =>
              setForm({ ...form, main_category: e.target.value })
            }
          >
            <option value="">Kategori</option>
            <option value="emlak">Emlak</option>
            <option value="arac">Taşıt</option>
          </select>

          <input
            placeholder="Başlık"
            className="w-full p-3 border rounded-lg"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            placeholder="Açıklama"
            className="w-full p-3 border rounded-lg"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <input
            placeholder="Şehir"
            className="w-full p-3 border rounded-lg"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />
          <input
            placeholder="Bütçe"
            className="w-full p-3 border rounded-lg"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          <input
            placeholder="Ad"
            className="w-full p-3 border rounded-lg"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <input
            placeholder="Telefon"
            className="w-full p-3 border rounded-lg"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <button
            onClick={addDemand}
            className="w-full bg-black text-white p-3 rounded-lg"
          >
            Kaydet
          </button>
          <button
            onClick={() => setPage("home")}
            className="w-full border p-3 rounded-lg"
          >
            Geri
          </button>
        </div>
      </div>
    );
  }

  // ---------------- HOME ----------------
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">TalepJet</h1>
        <button
          onClick={() => setPage("add")}
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          + Talep
        </button>
      </div>

      {/* FILTER */}
      <div className="flex gap-3 mb-5">
        {["all", "emlak", "arac"].map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-4 py-2 rounded-full border ${
              filter === c ? "bg-black text-white" : "bg-white"
            }`}
          >
            {c === "all" ? "Tümü" : c}
          </button>
        ))}

        <input
          placeholder="Ara..."
          className="ml-auto border p-2 rounded-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {demands.map((d) => (
          <div
            className="bg-white p-4 rounded-xl shadow cursor-pointer"
            key={d.id}
            onClick={() => {
              setSelected(d);
              getMessages(d.id);
            }}
          >
            <div className="font-bold mb-2">{d.title}</div>

            <div className="text-sm text-gray-500 mb-2">
              📍 {d.city}
            </div>

            <div className="mb-2">{d.description}</div>

            <div className="text-blue-600 font-bold">
              📞 {d.phone}
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-xl w-96">
            <div className="flex justify-between mb-3">
              <h3 className="font-bold">{selected.title}</h3>
              <button onClick={() => setSelected(null)}>X</button>
            </div>

            <div className="h-40 overflow-auto text-sm mb-2">
              {messages.map((m) => (
                <div key={m.id}>
                  <b>{m.sender_name}:</b> {m.message}
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                className="flex-1 border p-2 rounded"
              />
              <button
                onClick={sendMessage}
                className="bg-black text-white px-3 rounded"
              >
                Gönder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}