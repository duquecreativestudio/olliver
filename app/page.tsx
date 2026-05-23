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
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-8 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_40%)]" />

      <div className="relative z-10 w-full max-w-5xl">
        <div className="border border-white/10 rounded-[40px] p-10 bg-white/[0.03] backdrop-blur-3xl">
          <div className="mb-10">
            <p className="uppercase tracking-[0.3em] text-xs text-white/40 mb-4">
              Creative Intelligence System
            </p>

            <h1 className="text-7xl md:text-8xl font-black tracking-[0.25em] leading-none mb-6">
              OLLIVER
            </h1>

            <p className="text-white/50 text-xl leading-relaxed max-w-2xl">
              Plataforma cinematográfica de inteligência criativa para direção visual,
              branding, storytelling e sistemas premium de IA.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Digite um comando criativo..."
              className="flex-1 bg-black border border-white/10 rounded-2xl px-6 py-5 outline-none text-white placeholder:text-white/30"
            />

            <button
              onClick={sendMessage}
              className="px-8 py-5 rounded-2xl bg-white text-black font-semibold uppercase tracking-[0.15em] hover:scale-105 transition-transform"
            >
              {loading ? '...' : 'Enviar'}
            </button>
          </div>

          <div className="border border-white/10 rounded-[28px] p-8 min-h-[260px] bg-black/40">
            <p className="uppercase tracking-[0.2em] text-xs text-white/40 mb-4">
              Resposta do OLLIVER
            </p>

            <p className="text-white/90 text-lg leading-relaxed whitespace-pre-wrap">
              {response || 'O sistema de inteligência criativa está aguardando comandos.'}
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}