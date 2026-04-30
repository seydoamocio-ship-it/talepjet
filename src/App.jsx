import { useState } from "react";

function App() {
  const [form, setForm] = useState({
    ad: "",
    telefon: "",
    talep: ""
  });

  const [liste, setListe] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const ekle = () => {
    if (!form.ad || !form.telefon || !form.talep) return;

    setListe([...liste, form]);
    setForm({ ad: "", telefon: "", talep: "" });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Talep Platformu</h1>

      <input name="ad" placeholder="Ad Soyad" value={form.ad} onChange={handleChange} />
      <br /><br />

      <input name="telefon" placeholder="Telefon" value={form.telefon} onChange={handleChange} />
      <br /><br />

      <input name="talep" placeholder="Ne arıyorsun?" value={form.talep} onChange={handleChange} />
      <br /><br />

      <button onClick={ekle}>Talep Ekle</button>

      <hr />

      <h2>Talepler</h2>

      {liste.map((item, i) => (
        <div key={i} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <b>{item.ad}</b><br />
          {item.telefon}<br />
          {item.talep}
        </div>
      ))}
    </div>
  );
}

export default App;