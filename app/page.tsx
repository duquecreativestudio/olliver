'use client'

import { useState } from 'react'

export default function Home() {
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  async function sendMessage() {
    if (!message) return

    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
        }),
      })

      const data = await res.json()

      setResponse(data.message)
    } catch (error) {
      setResponse('Erro ao conectar com OLLIVER.')
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      <div className="w-full max-w-4xl">
        <div className="border border-white/10 rounded-[32px] p-10 bg-white/[0.03] backdrop-blur-2xl">
          <h1 className="text-6xl font-black tracking-[0.3em] mb-6">
            OLLIVER
          </h1>

          <p className="text-white/50 text-lg mb-10">
            Sistema de Inteligência Criativa
          </p>

          <div className="flex gap-4 mb-6">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Digite um comando criativo..."
              className="flex-1 bg-black border border-white/10 rounded-2xl px-6 py-5 outline-none"
            />

            <button
              onClick={sendMessage}
              className="px-8 py-5 rounded-2xl bg-white text-black font-semibold"
            >
              {loading ? '...' : 'Enviar'}
            </button>
          </div>

          <div className="border border-white/10 rounded-2xl p-6 min-h-[220px] bg-black/40">
            <p className="text-white/90 leading-relaxed whitespace-pre-wrap">
              {response || 'A resposta do OLLIVER aparecerá aqui.'}
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}