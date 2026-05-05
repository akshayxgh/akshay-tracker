import { useState, useEffect, useRef } from 'react'

export default function LineChart({ logs }) {
  const animRef = useRef()
  const [prog, setP] = useState(0)
  const totalH = logs.reduce((s, l) => s + l.hours, 0)

  const last14 = Array.from({ length: 14 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (13 - i))
    const ds = d.toISOString().slice(0, 10)
    return { label: d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }), h: logs.find((l) => l.date === ds)?.hours || 0 }
  })

  const maxH = Math.max(...last14.map((d) => d.h), 1)

  useEffect(() => {
    let start = null
    cancelAnimationFrame(animRef.current)
    const anim = (ts) => {
      if (!start) start = ts
      const t = Math.min((ts - start) / 1000, 1)
      setP(1 - Math.pow(1 - t, 3))
      if (t < 1) animRef.current = requestAnimationFrame(anim)
      else setP(1)
    }
    animRef.current = requestAnimationFrame(anim)
    return () => cancelAnimationFrame(animRef.current)
  }, [totalH])

  const W = 540, H = 100, pad = { l: 28, r: 12, t: 10, b: 26 }
  const iW = W - pad.l - pad.r, iH = H - pad.t - pad.b
  const allPts = last14.map((d, i) => ({ x: pad.l + i * (iW / (last14.length - 1)), y: pad.t + iH * (1 - d.h / maxH), h: d.h, label: d.label }))
  const cutIdx = Math.floor(prog * (last14.length - 1))
  const visPts = allPts.slice(0, cutIdx + 1)
  const pathD = visPts.length > 1 ? visPts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ') : ''
  const areaD = visPts.length > 1 ? `${pathD} L${visPts[visPts.length - 1].x},${H - pad.b} L${pad.l},${H - pad.b} Z` : ''

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="lg1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c6fe0" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#7c6fe0" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 1, 2].map((g) => (
        <line key={g} x1={pad.l} y1={pad.t + iH * g / 2} x2={W - pad.r} y2={pad.t + iH * g / 2}
          stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      ))}
      {last14.map((d, i) => i % 2 === 0 && (
        <text key={i} x={pad.l + i * (iW / (last14.length - 1))} y={H - pad.b + 11}
          textAnchor="middle" fill="rgba(232,234,246,0.28)" fontSize="8" fontFamily="DM Sans,sans-serif">
          {d.label}
        </text>
      ))}
      {areaD && <path d={areaD} fill="url(#lg1)" />}
      {pathD && <path d={pathD} fill="none" stroke="#7c6fe0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        style={{ filter: 'drop-shadow(0 0 4px #7c6fe088)' }} />}
      {visPts.map((p, i) => p.h > 0 && (
        <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="#7c6fe0" stroke="#1a1a2e" strokeWidth="1.5" />
      ))}
      <text x={pad.l - 4} y={pad.t + 4} textAnchor="end" fill="rgba(232,234,246,0.3)" fontSize="9" fontFamily="DM Sans,sans-serif">{maxH.toFixed(1)}</text>
      <text x={pad.l - 4} y={H - pad.b} textAnchor="end" fill="rgba(232,234,246,0.3)" fontSize="9" fontFamily="DM Sans,sans-serif">0</text>
    </svg>
  )
}