import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

export default function Dashboard(){
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const sid = localStorage.getItem('submission_id')
    if(!sid) { setLoading(false); return }
    (async ()=>{
      const { data } = await supabase.from('profiles').select('*').eq('submission_id', sid).single()
      setProfile(data)
      setLoading(false)
    })()
  },[])

  async function uploadAvatar(files){
    if(!files?.length) return
    const file = files[0]
    const fileExt = file.name.split('.').pop()
    const filePath = `${profile.id}.${fileExt}`
    const { data, error } = await supabase.storage.from('avatars').upload(filePath, file, { upsert: true })
    if(error){ alert(error.message); return }
    const url = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/avatars/${data.path}`
    await supabase.from('profiles').update({ avatar_url: url }).eq('id', profile.id)
    setProfile(prev => ({ ...prev, avatar_url: url }))
  }

  if(loading) return <div className="card">Loading...</div>
  if(!profile) return <div className="card">No profile found. Please login or register.</div>

  return (
    <div className="card space-y-3">
      <div className="flex items-center gap-4">
        <img src={profile.avatar_url || 'https://via.placeholder.com/80'} alt="avatar" className="w-20 h-20 rounded-full object-cover border-2 border-gold" />
        <div>
          <div className="font-bold text-lg">{profile.email}</div>
          <div className="text-sm text-gray-300">{profile.whatsapp_no}</div>
          <div className="mt-1 text-sm">Submitted: <span className="font-mono">{profile.submission_id}</span></div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-300">Daily Fanbase Score</div>
          <div className="text-3xl font-bold text-gold">{profile.daily_score || 0}</div>
        </div>
        <div>
          <label className="cursor-pointer px-4 py-2 bg-pitch rounded">
            Upload Avatar
            <input type="file" accept="image/*" onChange={(e)=>uploadAvatar(e.target.files)} className="hidden" />
          </label>
        </div>
      </div>
    </div>
  )
}
