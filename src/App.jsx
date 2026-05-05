import { useReducer } from 'react'
import { PHASES, DAYS_DATA } from './data'
import Checkbox from './components/Checkbox'
import Drawer from './components/Drawer'
import DonutChart from './components/DonutChart'
import LineChart from './components/LineChart'

const SKEY = 'akshay_tracker_v6'
function loadS() { try { const r = localStorage.getItem(SKEY); return r ? JSON.parse(r) : null } catch { return null } }
function saveS(s) { try { localStorage.setItem(SKEY, JSON.stringify(s)) } catch {} }


function exportDayData(dayKey, state) {
  const dayIndex = dayKey.replace("d", "")
  const dayData = {
    day: dayIndex,
    content: state.topicData[dayKey],
    completed: true,
    exportedAt: new Date().toISOString()
  }

  const blob = new Blob([JSON.stringify(dayData, null, 2)], {
    type: "application/json"
  })

  const a = document.createElement("a")
  a.href = URL.createObjectURL(blob)
  a.download = `day-${dayIndex}-data.json`
  a.click()
}


function initState() {
  const saved = loadS()
  if (saved && saved.version === 6) return saved
  const completed = {}, topicData = {}
  DAYS_DATA.forEach((_, i) => {
    completed['d' + i] = false
    topicData['d' + i] = { notes: '', links: [], files: [] }
  })
  return {
    version: 6, completed, topicData, logs: [], todayHours: '',
    goals: [
      { id: 1, text: 'Interview-ready for BI/Analytics roles', done: false, phase: 0 },
      { id: 2, text: 'Portfolio live on GitHub', done: false, phase: 1 },
      { id: 3, text: 'Full DE stack mastered', done: false, phase: 2 },
      { id: 4, text: 'Top 1% data professional in India', done: false, phase: 3 },
    ],
    activeTab: 'dashboard', expanded: null, newLink: {}, newLinkLabel: {},
  }
}

function reducer(s, a) {
  let n = s
  switch (a.type) {
    case "TOGGLE": {
      const isNowCompleted = !s.completed[a.k]

      const newState = {
        ...s,
        completed: { ...s.completed, [a.k]: isNowCompleted }
      }

      // 🚀 EXPORT when marking complete
      if (isNowCompleted) {
        setTimeout(() => exportDayData(a.k, newState), 100)
      }

      n = newState
      break
    }
    case 'EXP': n = { ...s, expanded: s.expanded === a.k ? null : a.k }; break
    case 'NOTES': n = { ...s, topicData: { ...s.topicData, [a.k]: { ...s.topicData[a.k], notes: a.val } } }; break
    case 'ADD_LINK': {
      const url = (s.newLink[a.k] || '').trim(), label = (s.newLinkLabel[a.k] || '').trim() || url
      if (!url) return s
      n = { ...s, topicData: { ...s.topicData, [a.k]: { ...s.topicData[a.k], links: [...(s.topicData[a.k]?.links || []), { url, label }] } }, newLink: { ...s.newLink, [a.k]: '' }, newLinkLabel: { ...s.newLinkLabel, [a.k]: '' } }
      break
    }
    case 'DEL_LINK': { const links = s.topicData[a.k].links.filter((_, j) => j !== a.j); n = { ...s, topicData: { ...s.topicData, [a.k]: { ...s.topicData[a.k], links } } }; break }
    case 'ADD_FILE': { const files = [...(s.topicData[a.k]?.files || []), { name: a.name, content: a.content, ftype: a.ftype }]; n = { ...s, topicData: { ...s.topicData, [a.k]: { ...s.topicData[a.k], files } } }; break }
    case 'DEL_FILE': { const files = s.topicData[a.k].files.filter((_, j) => j !== a.j); n = { ...s, topicData: { ...s.topicData, [a.k]: { ...s.topicData[a.k], files } } }; break }
    case 'SET_NL': n = { ...s, newLink: { ...s.newLink, [a.k]: a.val } }; break
    case 'SET_NLL': n = { ...s, newLinkLabel: { ...s.newLinkLabel, [a.k]: a.val } }; break
    case 'LOG': {
      if (!a.h || isNaN(a.h) || +a.h <= 0) return s
      const today = new Date().toISOString().slice(0, 10)
      const ex = s.logs.find((l) => l.date === today)
      const logs = ex ? s.logs.map((l) => l.date === today ? { ...l, hours: +(l.hours + +a.h).toFixed(1) } : l) : [...s.logs, { date: today, hours: +a.h }]
      n = { ...s, logs, todayHours: '' }
      break
    }
    case 'GOAL': n = { ...s, goals: s.goals.map((g) => g.id === a.id ? { ...g, done: !g.done } : g) }; break
    case 'TAB': n = { ...s, activeTab: a.t }; break
    case 'SET_H': n = { ...s, todayHours: a.val }; break
    default: return s
  }
  saveS(n); return n
}

const FF = 'DM Sans, sans-serif'
const glassCard = { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 16 }

export default function App() {
  const [state, dispatch] = useReducer(reducer, null, initState)
  const { completed, logs, goals, todayHours, activeTab, expanded } = state

  const total = DAYS_DATA.length
  const doneT = Object.keys(completed).filter((k) => completed[k] === true).length
  const totalH = +logs.reduce((s, l) => s + l.hours, 0).toFixed(1)
  const doneG = goals.filter((g) => g.done === true).length
  const today = new Date().toISOString().slice(0, 10)
  const todayLog = logs.find((l) => l.date === today)
  const overall = Math.round((doneT / total) * 100)

  const phases = PHASES.map((p) => {
    const items = DAYS_DATA.map((d, i) => ({ ...d, k: 'd' + i })).filter((d) => d.phase === p.id)
    const done = items.filter((d) => completed[d.k] === true).length
    return { ...p, done, tot: items.length, pct: items.length > 0 ? Math.round((done / items.length) * 100) : 0 }
  })

  const tabs = ['dashboard', 'days', 'goals', 'log']

  return (
    <div style={{ fontFamily: FF, background: 'linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)', minHeight: '100vh', color: '#e8eaf6' }}>
      {/* Header */}
      <div style={{ padding: '22px 20px 14px', background: 'linear-gradient(135deg,rgba(124,111,224,0.18),rgba(26,170,130,0.09))', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 2 }}>Akshay's data career tracker</div>
        <div style={{ fontSize: 12, color: 'rgba(232,234,246,0.45)', marginBottom: 10 }}>6-month roadmap · Power BI → Analytics → Engineering · {overall}% complete</div>
        <div style={{ height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${overall}%`, background: 'linear-gradient(90deg,#7c6fe0,#1aaa82)', borderRadius: 3, transition: 'width 0.5s' }} />
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 6, padding: '12px 20px', overflowX: 'auto' }}>
        {tabs.map((t) => (
          <button key={t} onClick={() => dispatch({ type: 'TAB', t })}
            style={{ padding: '7px 16px', borderRadius: 20, border: activeTab === t ? '1px solid rgba(124,111,224,0.6)' : '1px solid rgba(255,255,255,0.14)', background: activeTab === t ? 'rgba(124,111,224,0.25)' : 'transparent', color: activeTab === t ? '#c5beff' : 'rgba(232,234,246,0.55)', fontSize: 13, cursor: 'pointer', fontFamily: FF, textTransform: 'capitalize', whiteSpace: 'nowrap', fontWeight: activeTab === t ? 600 : 400 }}>
            {t}
          </button>
        ))}
      </div>

      <div style={{ padding: '12px 20px 28px' }}>

        {/* DASHBOARD */}
        {activeTab === 'dashboard' && <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(120px,1fr))', gap: 10, marginBottom: 16 }}>
            {[{ label: 'Days done', val: `${doneT}/${total}`, col: '#c5beff' }, { label: 'Total hours', val: `${totalH}h`, col: '#5ef0c8' }, { label: 'Goals hit', val: `${doneG}/4`, col: '#ffb347' }, { label: 'Today', val: todayLog ? `${todayLog.hours}h` : '—', col: '#ff79c6' }].map((c) => (
              <div key={c.label} style={{ ...glassCard, padding: '13px 14px' }}>
                <div style={{ fontSize: 11, color: 'rgba(232,234,246,0.45)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{c.label}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: c.col }}>{c.val}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 12, marginBottom: 14 }}>
            <div style={{ ...glassCard, padding: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(232,234,246,0.5)', marginBottom: 8 }}>Phase completion</div>
              <DonutChart completed={completed} />
              <div style={{ marginTop: 10 }}>
                {phases.map((p) => (
                  <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
                    <div style={{ width: 8, height: 8, borderRadius: 2, background: p.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 11, color: 'rgba(232,234,246,0.55)', flex: 1 }}>{p.label}</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: p.color }}>{p.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ ...glassCard, padding: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(232,234,246,0.5)', marginBottom: 10 }}>Progress bars</div>
              {phases.map((p) => (
                <div key={p.id} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 5 }}>
                    <span style={{ color: 'rgba(232,234,246,0.65)' }}>{p.label}</span>
                    <span style={{ color: p.color, fontWeight: 600 }}>{p.done}/{p.tot}</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${p.pct}%`, background: p.color, borderRadius: 3, transition: 'width 0.4s', opacity: 0.85 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ ...glassCard, padding: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(232,234,246,0.5)', marginBottom: 8 }}>Last 14 days — study hours</div>
            <LineChart logs={logs} />
          </div>
        </>}

        {/* DAYS */}
        {activeTab === 'days' && <>
          <p style={{ fontSize: 13, color: 'rgba(232,234,246,0.4)', margin: '0 0 14px' }}>Full 180-day plan. Tap a card to see tasks, add notes, links & files.</p>
          {PHASES.map((ph) => {
            const items = DAYS_DATA.map((d, i) => ({ ...d, k: 'd' + i })).filter((d) => d.phase === ph.id)
            const done = items.filter((d) => completed[d.k] === true).length
            return (
              <div key={ph.id} style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 20, background: ph.light, color: ph.color, border: `1px solid ${ph.border}` }}>{ph.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(232,234,246,0.8)' }}>{ph.title}</span>
                  <span style={{ fontSize: 12, color: 'rgba(232,234,246,0.35)', marginLeft: 'auto' }}>{done}/{items.length}</span>
                </div>
                {items.map((d) => {
                  const isDone = completed[d.k] === true
                  const isOpen = expanded === d.k
                  const td = state.topicData[d.k] || { notes: '', links: [], files: [] }
                  const hasData = !!(td.notes || td.links.length || td.files.length)
                  return (
                    <div key={d.k} style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, marginBottom: 8, overflow: 'hidden', background: 'rgba(255,255,255,0.04)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', cursor: 'pointer' }} onClick={() => dispatch({ type: 'EXP', k: d.k })}>
                        <div style={{ width: 40, height: 40, borderRadius: 10, background: ph.light, border: `1px solid ${ph.color}40`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <span style={{ fontSize: 9, color: ph.color, fontWeight: 700, lineHeight: 1 }}>DAY</span>
                          <span style={{ fontSize: typeof d.day === 'string' && d.day.length <= 2 ? 14 : 10, color: ph.color, fontWeight: 700, lineHeight: 1.3 }}>{d.day}</span>
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 13, fontWeight: isDone ? 400 : 600, color: isDone ? 'rgba(232,234,246,0.3)' : 'rgba(232,234,246,0.88)', textDecoration: isDone ? 'line-through' : 'none', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.name}</div>
                          <div style={{ fontSize: 11, color: 'rgba(232,234,246,0.35)', marginTop: 2 }}>{d.tasks.length} tasks · {d.resources.length} resources</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                          {hasData && <div style={{ width: 7, height: 7, borderRadius: '50%', background: ph.color }} />}
                          <div onClick={(e) => { e.stopPropagation(); dispatch({ type: 'TOGGLE', k: d.k }) }}>
                            <Checkbox checked={isDone} color={ph.color} onClick={() => {}} />
                          </div>
                          <span style={{ color: 'rgba(232,234,246,0.3)', fontSize: 11 }}>{isOpen ? '▲' : '▼'}</span>
                        </div>
                      </div>
                      {isOpen && <>
                        <div style={{ padding: '0 14px 12px', background: 'rgba(0,0,0,0.15)' }}>
                          <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(232,234,246,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8, paddingTop: 4 }}>Tasks</div>
                          {d.tasks.map((t, j) => (
                            <div key={j} style={{ display: 'flex', gap: 8, marginBottom: 6, alignItems: 'flex-start' }}>
                              <div style={{ width: 5, height: 5, borderRadius: '50%', background: ph.color, marginTop: 6, flexShrink: 0 }} />
                              <span style={{ fontSize: 13, color: t.startsWith('🏁') ? '#5ef0c8' : 'rgba(232,234,246,0.75)', lineHeight: 1.5, fontWeight: t.startsWith('🏁') ? 600 : 400 }}>{t}</span>
                            </div>
                          ))}
                          <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(232,234,246,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '12px 0 8px' }}>Resources</div>
                          {d.resources.map((r, j) => (
                            <div key={j} style={{ display: 'flex', gap: 8, marginBottom: 4, alignItems: 'center' }}>
                              <div style={{ width: 5, height: 5, borderRadius: 1, background: 'rgba(232,234,246,0.3)', flexShrink: 0 }} />
                              <span style={{ fontSize: 12, color: 'rgba(232,234,246,0.55)' }}>{r}</span>
                            </div>
                          ))}
                        </div>
                        <Drawer k={d.k} state={state} dispatch={dispatch} />
                      </>}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </>}

        {/* GOALS */}
        {activeTab === 'goals' && <>
          <p style={{ fontSize: 13, color: 'rgba(232,234,246,0.4)', margin: '0 0 14px' }}>Phase milestones from your roadmap.</p>
          {goals.map((g) => {
            const ph = PHASES[g.phase]
            return (
              <div key={g.id} onClick={() => dispatch({ type: 'GOAL', id: g.id })}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 16px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, marginBottom: 10, cursor: 'pointer', background: 'rgba(255,255,255,0.04)' }}>
                <Checkbox checked={g.done === true} color={ph.color} onClick={() => {}} />
                <div>
                  <div style={{ fontSize: 11, color: ph.color, fontWeight: 600, marginBottom: 3 }}>{ph.label} · {ph.title}</div>
                  <div style={{ fontSize: 14, color: g.done ? 'rgba(232,234,246,0.3)' : 'rgba(232,234,246,0.85)', textDecoration: g.done ? 'line-through' : 'none' }}>{g.text}</div>
                </div>
              </div>
            )
          })}
        </>}

        {/* LOG */}
        {activeTab === 'log' && <>
          <div style={{ ...glassCard, padding: 16, marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(232,234,246,0.5)', marginBottom: 10 }}>Log today's hours</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <input type="number" min="0.5" max="12" step="0.5" value={todayHours} placeholder="e.g. 2.5"
                onChange={(e) => dispatch({ type: 'SET_H', val: e.target.value })}
                style={{ padding: '8px 12px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.07)', color: '#e8eaf6', fontSize: 13, flex: 1, fontFamily: FF, outline: 'none' }} />
              <button onClick={() => dispatch({ type: 'LOG', h: todayHours })}
                style={{ padding: '8px 18px', borderRadius: 10, border: '1px solid rgba(124,111,224,0.5)', background: 'rgba(124,111,224,0.2)', color: '#c5beff', fontSize: 13, cursor: 'pointer', fontFamily: FF, fontWeight: 600 }}>Add</button>
            </div>
            {todayLog && <div style={{ fontSize: 12, color: 'rgba(232,234,246,0.4)', marginTop: 8 }}>Today so far: {todayLog.hours}h</div>}
          </div>
          <div style={{ ...glassCard, padding: 14, marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(232,234,246,0.5)', marginBottom: 8 }}>Last 14 days</div>
            <LineChart logs={logs} />
          </div>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(232,234,246,0.5)', marginBottom: 8 }}>Full history</div>
          {logs.length === 0 && <div style={{ fontSize: 13, color: 'rgba(232,234,246,0.35)' }}>No hours logged yet. Start today!</div>}
          {[...logs].reverse().map((l) => (
            <div key={l.date} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)', marginBottom: 6, background: 'rgba(255,255,255,0.03)' }}>
              <span style={{ fontSize: 13, color: 'rgba(232,234,246,0.65)' }}>{new Date(l.date + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#5ef0c8' }}>{l.hours}h</span>
            </div>
          ))}
        </>}

      </div>
    </div>
  )
}