import { useState, useEffect, useRef } from 'react'
import { PHASES, DAYS_DATA } from '../data'

export default function DonutChart({ completed }) {
  const animRef = useRef()
  const [prog, setP] = useState(0)
  const total = DAYS_DATA.length
  const totalDone = Object.keys(completed).filter((k) => completed[k] === true).length
  const target = total > 0 ? totalDone / total : 0

  useEffect(() => {
    let start = null
    cancelAnimationFrame(animRef.current)
    const anim = (ts) => {
      if (!start) start = ts
      const t = Math.min((ts - start) / 1000, 1)
      const ease = 1 - Math.pow(1 - t, 3)
      setP(ease * target)
      if (t < 1) animRef.current = requestAnimationFrame(anim)
      else setP(target)
    }
    animRef.current = requestAnimationFrame(anim)
    return () => cancelAnimationFrame(animRef.current)
  }, [totalDone])

  const cx = 90, cy = 90, r = 68, sw = 16, circ = 2 * Math.PI * r
  let offset = 0
  const segs = PHASES.map((p) => {
    const items = DAYS_DATA.filter((d) => d.phase === p.id)
    const done = items.filter((_, i) => {
      const gi = DAYS_DATA.findIndex((d) => d === items[i])
      return completed['d' + gi] === true
    }).length
    const share = items.length / total
    const bgDash = circ * share * 0.97
    const fDash = Math.min(circ * (done / total) * (target > 0 ? prog / target : 0), bgDash)
    const o = offset
    offset += circ * share
    return { color: p.color, bgDash, fDash, o }
  })

  return (
    <svg viewBox="0 0 180 180" width="180" height="180" style={{ display: 'block', margin: '0 auto' }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={sw + 2} />
      {segs.map((s, i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r={r} fill="none" stroke={s.color} strokeWidth={sw} strokeOpacity="0.12"
            strokeDasharray={`${s.bgDash} ${circ - s.bgDash}`} strokeDashoffset={-s.o}
            style={{ transform: 'rotate(-90deg)', transformOrigin: `${cx}px ${cy}px` }} />
          {s.fDash > 0.1 && (
            <circle cx={cx} cy={cy} r={r} fill="none" stroke={s.color} strokeWidth={sw} strokeLinecap="round"
              strokeDasharray={`${s.fDash} ${circ - s.fDash}`} strokeDashoffset={-s.o}
              style={{ transform: 'rotate(-90deg)', transformOrigin: `${cx}px ${cy}px`, filter: `drop-shadow(0 0 5px ${s.color}99)` }} />
          )}
        </g>
      ))}
      <text x={cx} y={cy - 10} textAnchor="middle" fill="#c5beff" fontSize="26" fontWeight="700" fontFamily="DM Sans,sans-serif">
        {Math.round(prog * 100)}%
      </text>
      <text x={cx} y={cy + 9} textAnchor="middle" fill="rgba(232,234,246,0.4)" fontSize="11" fontFamily="DM Sans,sans-serif">complete</text>
      <text x={cx} y={cy + 25} textAnchor="middle" fill="rgba(232,234,246,0.25)" fontSize="10" fontFamily="DM Sans,sans-serif">
        {totalDone}/{total} days
      </text>
    </svg>
  )
}