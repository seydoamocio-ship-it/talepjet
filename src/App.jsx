import { supabase } from "./supabase"
import { useEffect } from "react"
useEffect(() => {
  getData()
}, [])

const getData = async () => {
  const { data } = await supabase
    .from('demands')
    .select('*')

  setListe(data || [])
}useEffect(() => {
  getData()
}, [])

const getData = async () => {
  const { data } = await supabase
    .from('demands')
    .select('*')

  setListe(data || [])
}const ekle = async () => {
  if (!form.ad || !form.telefon || !form.talep) return

  await supabase.from('demands').insert([
    {
      title: form.talep,
      description: form.talep,
      city: "İstanbul",
      username: form.ad,
      phone: form.telefon
    }
  ])

  getData()

  setForm({ ad: "", telefon: "", talep: "" })
}