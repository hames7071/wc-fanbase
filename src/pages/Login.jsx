import React, { useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [submissionId, setSubmissionId] = useState('')
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()

  async function handle(e){
    e.preventDefault();
    setLoading(true)
    const { data, error } = await supabase.from('profiles').select('*').eq('submission_id', submissionId).single()
    setLoading(false)
    if(error){ alert('Not found') ; return }
    localStorage.setItem('submission_id', submissionId)
    nav('/dashboard')
  }

  return (
    <form onSubmit={handle} className="card space-y-3">
      <h2 className="text-lg font-bold text-gold">Login</h2>
      <input required value={submissionId} onChange={e=>setSubmissionId(e.target.value)} placeholder="Submission ID (eg WC-123456)" className="w-full p-2 rounded bg-deepblue/60" />
      <div className="flex justify-between">
        <button type="submit" disabled={loading} className="px-4 py-2 bg-pitch rounded">{loading? 'Checking...': 'Open Profile'}</button>
      </div>
    </form>
  )
}
