import { useState, useEffect } from "react";
import { supabase } from "./supabase";

function App() {
  const [page, setPage] = useState("home");
  const [demands, setDemands] = useState([]);

  const [form, setForm] = useState({
    main_category: "",
    title: "",
    description: "",
    city: "",
    price: "",
    username: "",
    phone: ""
  });

  const [filter, setFilter] = useState("all");

  // VERİ ÇEK
  const getData = async () => {
    let query = supabase.from("demands").select("*").order("created_at", { ascending: false });

    if (filter !== "all") {
      query = query.eq("main_category", filter);
    }

    const { data } = await query;
    setDemands(data || []);
  };

  useEffect(() => {
    getData();
  }, [filter]);

  // INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // EKLE
  const addDemand = async () => {
    if (!form.main_category || !form.title) {
      alert("Eksik alan");
      return;
    }

    const { error } = await supabase.from("demands").insert([form]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("KAYDEDİLDİ");

    setForm({
      main_category: "",
      title: "",
      description: "",
      city: "",
      price: "",
      username: "",
      phone: ""
    });
      setPage("home");   // ⭐ BURASI ÖNEMLİ
      getData();         // ⭐ BURASI DA
};
    setPage("home");
    getData();
  };

  // -------- UI --------

  if (page === "add") {
    return (
      <div style={{ padding: 20 }}>
        <h2>Talep Oluştur</h2>

        <select name="main_category" value={form.main_category} onChange={handleChange}>
          <option value="">Kategori seç</option>
          <option value="emlak">Emlak</option>
          <option value="arac">Taşıt</option>
        </select>
        <br /><br />

        <input name="title" placeholder="Başlık" value={form.title} onChange={handleChange} />
        <br /><br />

        <input name="description" placeholder="Açıklama" value={form.description} onChange={handleChange} />
        <br /><br />

        <input name="city" placeholder="Şehir" value={form.city} onChange={handleChange} />
        <br /><br />

        <input name="price" placeholder="Bütçe" value={form.price} onChange={handleChange} />
        <br /><br />

        <input name="username" placeholder="Ad" value={form.username} onChange={handleChange} />
        <br /><br />

        <input name="phone" placeholder="Telefon" value={form.phone} onChange={handleChange} />
        <br /><br />

        <button onClick={addDemand}>Kaydet</button>
        <button onClick={() => setPage("home")}>Geri</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "auto" }}>
      <h1>TalepJet</h1>

      {/* KATEGORİ */}
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setFilter("all")}>Tümü</button>
        <button onClick={() => setFilter("emlak")}>Emlak</button>
        <button onClick={() => setFilter("arac")}>Taşıt</button>
        <button onClick={() => setPage("add")}>+ Talep</button>
      </div>

      {/* LİSTE */}
      {demands.map((d) => (
        <div key={d.id} style={{
          border: "1px solid #ddd",
          padding: 15,
          marginBottom: 10,
          borderRadius: 8
        }}>
          <b>{d.title}</b> ({d.main_category})
          <div>{d.description}</div>
          <div>📍 {d.city}</div>
          <div>💰 {d.price}</div>
          <div>👤 {d.username}</div>
          <div>📞 {d.phone}</div>
        </div>
      ))}
    </div>
  );
}

export default App;