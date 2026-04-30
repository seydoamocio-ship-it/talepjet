import { useState, useEffect } from "react";
import { supabase } from "./supabase";

function App() {
  const [form, setForm] = useState({
    ad: "",
    telefon: "",
    talep: ""
  });

  const [liste, setListe] = useState([]);

  // input değişimi
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // VERİ ÇEK
  const getData = async () => {
    const { data, error } = await supabase
      .from("demands")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log("HATA:", error);
    } else {
      setListe(data);
    }
  };

  // SAYFA AÇILINCA ÇEK
  useEffect(() => {
    getData();
  }, []);

  // EKLE
const ekle = async () => {
  if (!form.ad || !form.telefon || !form.talep) return;

  const { data, error } = await supabase.from("demands").insert([
    {
      title: form.talep,
      description: form.talep,
      city: "İstanbul",
      username: form.ad,
      phone: form.telefon
    }
  ]);

  console.log("INSERT SONUÇ:", data, error);

  getData();

  setForm({ ad: "", telefon: "", talep: "" });
};

  return (
    <div style={{ padding: 20 }}>
      <h1>Talep Platformu</h1>

      <input
        name="ad"
        placeholder="Ad Soyad"
        value={form.ad}
        onChange={handleChange}
      />
      <br /><br />

      <input
        name="telefon"
        placeholder="Telefon"
        value={form.telefon}
        onChange={handleChange}
      />
      <br /><br />

      <input
        name="talep"
        placeholder="Ne arıyorsun?"
        value={form.talep}
        onChange={handleChange}
      />
      <br /><br />

      <button onClick={ekle}>Talep Ekle</button>

      <hr />

      <h2>Talepler</h2>

      {liste.map((item, i) => (
        <div key={i} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <b>{item.username}</b><br />
          {item.phone}<br />
          {item.title}
        </div>
      ))}
    </div>
  );
}

export default App;