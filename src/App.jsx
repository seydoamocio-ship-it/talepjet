<!DOCTYPE html>
<html>
<head>
  <title>İlan Sitesi</title>
</head>
<body>

  <h1>İlanlar</h1>

  <div id="auth">
    <input id="email" placeholder="email">
    <input id="password" type="password" placeholder="password">
    <button onclick="signUp()">Kayıt Ol</button>
    <button onclick="signIn()">Giriş Yap</button>
  </div>

  <hr>

  <h2>Yeni İlan</h2>
  <input id="title" placeholder="Başlık">
  <input id="desc" placeholder="Açıklama">
  <button onclick="addListing()">Ekle</button>

  <hr>

  <h2>İlan Listesi</h2>
  <ul id="list"></ul>

  <script type="module">
    import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

    const supabase = createClient("SUPABASE_URL", "ANON_KEY")

    async function signUp() {
      const email = document.getElementById("email").value
      const password = document.getElementById("password").value

      const { error } = await supabase.auth.signUp({ email, password })
      alert(error ? error.message : "Kayıt başarılı")
    }

    async function signIn() {
      const email = document.getElementById("email").value
      const password = document.getElementById("password").value

      const { error } = await supabase.auth.signInWithPassword({ email, password })
      alert(error ? error.message : "Giriş başarılı")
    }

    async function addListing() {
      const title = document.getElementById("title").value
      const description = document.getElementById("desc").value

      const { data: { user } } = await supabase.auth.getUser()

      const { error } = await supabase.from("listings").insert([
        { title, description, user_id: user.id }
      ])

      if (!error) loadListings()
      else alert(error.message)
    }

    async function loadListings() {
      const { data } = await supabase.from("listings").select("*")

      const list = document.getElementById("list")
      list.innerHTML = ""

      data.forEach(item => {
        const li = document.createElement("li")
        li.innerText = item.title + " - " + item.description
        list.appendChild(li)
      })
    }

    loadListings()

    window.signUp = signUp
    window.signIn = signIn
    window.addListing = addListing
  </script>

</body>
</html>