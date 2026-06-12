import React, { useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

function generateSubmissionId(){
  return 'WC-' + Math.floor(Math.random()*900000 + 100000)
}

export default function Register(){
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [subId, setSubId] = useState(null)
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()

  async function handle(e){
    e.preventDefault();
    setLoading(true)
    const submission_id = generateSubmissionId()
    const password = Math.random().toString(36).slice(-8)
    const { data: authData, error: authErr } = await supabase.auth.signUp({ email, password })
    if(authErr){
      setLoading(false)
      alert(authErr.message)
      return
    }
    const id = authData.user.id
    const { error } = await supabase.from('profiles').insert([{ id, submission_id, email, whatsapp_no: whatsapp }])
    if(error){
      setLoading(false)
      alert(error.message)
      return
    }
    setSubId(submission_id)
    setLoading(false)
  }

  if(subId) return (
    <div className="card text-center">
      <h2 className="text-xl font-bold text-gold">Registered Successfully</h2>
      <p>Your Submission ID:</p>
      <div className="mt-2 text-2xl font-mono">{subId}</div>
      <div className="mt-4">
        <button onClick={() => { localStorage.setItem('submission_id', subId); nav('/dashboard') }} className="px-4 py-2 bg-pitch rounded">Go to Dashboard</button>
      </div>
    </div>
  )

  return (
    <form onSubmit={handle} className="card space-y-3">
      <h2 className="text-lg font-bold text-gold">Register</h2>
      <input required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 rounded bg-deepblue/60" />
      <input required value={whatsapp} onChange={e=>setWhatsapp(e.target.value)} placeholder="WhatsApp number" className="w-full p-2 rounded bg-deepblue/60" />
      <div className="flex justify-between">
        <button type="submit" disabled={loading} className="px-4 py-2 bg-pitch rounded">{loading? 'Registering...': 'Register'}</button>
      </div>
    </form>
  )
}
