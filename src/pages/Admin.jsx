import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

export default function Admin(){
  const [secret, setSecret] = useState('')
  const [authed, setAuthed] = useState(false)
  const [list, setList] = useState([])
  const [q, setQ] = useState('')

  useEffect(()=>{
    if(authed) fetchAll()
  },[authed])

  async function fetchAll(){
    const { data } = await supabase.from('profiles').select('*').order('created_at', { ascending: false })
    setList(data || [])
  }

  function tryAuth(e){
    e.preventDefault();
    if(secret === import.meta.env.VITE_ADMIN_PASS) setAuthed(true)
    else alert('Invalid admin pass')
  }

  async function delta(id, change){
    const user = list.find(x=>x.id===id)
    const newScore = (user.daily_score||0) + change
    await supabase.from('profiles').update({ daily_score: newScore }).eq('id', id)
    setList(l => l.map(x=> x.id===id ? { ...x, daily_score: newScore } : x))
  }

  const filtered = list.filter(u => !q || u.submission_id?.includes(q))

  if(!authed) return (
    <form onSubmit={tryAuth} className="card">
      <h2 className="text-lg font-bold text-gold">Admin Panel</h2>
      <input value={secret} onChange={e=>setSecret(e.target.value)} placeholder="Admin pass" className="w-full p-2 rounded bg-deepblue/60" />
      <div className="mt-2"><button className="px-4 py-2 bg-pitch rounded">Enter</button></div>
    </form>
  )

  return (
    <div className="card">
      <h2 className="text-lg font-bold text-gold">Admin Panel</h2>
      <div className="mt-2">
        <input placeholder="Search Submission ID" value={q} onChange={e=>setQ(e.target.value)} className="w-full p-2 rounded bg-deepblue/60" />
      </div>
      <div className="mt-3 space-y-2">
        {filtered.map(u=> (
          <div key={u.id} className="flex items-center justify-between bg-deepblue/40 p-2 rounded">
            <div>
              <div className="font-mono">{u.submission_id}</div>
              <div className="text-sm text-gray-300">{u.email} • {u.whatsapp_no}</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-lg font-bold text-gold">{u.daily_score||0}</div>
              <button onClick={()=>delta(u.id,1)} className="px-2 py-1 bg-green-600 rounded">+1</button>
              <button onClick={()=>delta(u.id,-1)} className="px-2 py-1 bg-red-600 rounded">-1</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
