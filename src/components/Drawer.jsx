import { useRef } from 'react'

const inpStyle = {
  padding: '8px 12px', borderRadius: 10,
  border: '1px solid rgba(255,255,255,0.15)',
  background: 'rgba(255,255,255,0.07)', color: '#e8eaf6',
  fontSize: 13, fontFamily: 'DM Sans, sans-serif',
  outline: 'none', boxSizing: 'border-box',
}
const labelStyle = {
  fontSize: 10, fontWeight: 600, color: 'rgba(232,234,246,0.4)',
  textTransform: 'uppercase', letterSpacing: '0.08em',
  marginBottom: 7, display: 'block',
}

export default function Drawer({ k, state, dispatch }) {
  const td = state.topicData[k] || { notes: '', links: [], files: [] }
  const ref = useRef()

  const handleFile = (e) => {
    const f = e.target.files[0]
    if (!f) return
    const r = new FileReader()
    r.onload = (ev) =>
      dispatch({ type: 'ADD_FILE', k, name: f.name, content: ev.target.result, ftype: f.name.split('.').pop() })
    r.readAsText(f)
    e.target.value = ''
  }

  return (
    <div style={{ padding: '14px 16px 16px', background: 'rgba(0,0,0,0.25)', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
      {/* Notes */}
      <div style={{ marginBottom: 14 }}>
        <span style={labelStyle}>Notes</span>
        <textarea
          value={td.notes}
          onChange={(e) => dispatch({ type: 'NOTES', k, val: e.target.value })}
          placeholder="Write notes, key learnings, observations..."
          style={{ ...inpStyle, width: '100%', height: 80, resize: 'vertical', lineHeight: 1.5 }}
        />
      </div>

      {/* Links */}
      <div style={{ marginBottom: 14 }}>
        <span style={labelStyle}>Links</span>
        {td.links.map((l, j) => (
          <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
            <a href={l.url} target="_blank" rel="noreferrer"
              style={{ fontSize: 13, color: '#a08cff', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {l.label || l.url}
            </a>
            <button onClick={() => dispatch({ type: 'DEL_LINK', k, j })}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(232,234,246,0.4)', fontSize: 18, lineHeight: 1, padding: 0 }}>×</button>
          </div>
        ))}
        <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
          <input value={state.newLinkLabel[k] || ''} onChange={(e) => dispatch({ type: 'SET_NLL', k, val: e.target.value })}
            placeholder="Label" style={{ ...inpStyle, flex: '0 0 110px' }} />
          <input value={state.newLink[k] || ''} onChange={(e) => dispatch({ type: 'SET_NL', k, val: e.target.value })}
            placeholder="https://..." style={{ ...inpStyle, flex: 1 }}
            onKeyDown={(e) => e.key === 'Enter' && dispatch({ type: 'ADD_LINK', k })} />
          <button onClick={() => dispatch({ type: 'ADD_LINK', k })}
            style={{ ...inpStyle, padding: '8px 14px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.2)' }}>Add</button>
        </div>
      </div>

      {/* Files */}
      <div>
        <span style={labelStyle}>Files (.py, .sql, .ipynb ...)</span>
        {td.files.map((f, j) => (
          <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 10px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, marginBottom: 5 }}>
            <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 6px', borderRadius: 4, background: f.ftype === 'py' ? 'rgba(124,111,224,0.35)' : f.ftype === 'sql' ? 'rgba(26,170,130,0.35)' : 'rgba(255,255,255,0.1)', color: f.ftype === 'py' ? '#c5beff' : f.ftype === 'sql' ? '#5ef0c8' : '#ccc' }}>.{f.ftype}</span>
            <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'rgba(232,234,246,0.8)', fontSize: 13 }}>{f.name}</span>
            <button onClick={() => { const b = new Blob([f.content]); const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = f.name; a.click() }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(232,234,246,0.4)', fontSize: 13 }}>↓</button>
            <button onClick={() => dispatch({ type: 'DEL_FILE', k, j })}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(232,234,246,0.4)', fontSize: 18, lineHeight: 1, padding: 0 }}>×</button>
          </div>
        ))}
        <input ref={ref} type="file" accept=".py,.sql,.txt,.ipynb,.md,.csv,.json" style={{ display: 'none' }} onChange={handleFile} />
        <button onClick={() => ref.current.click()}
          style={{ padding: '7px 14px', borderRadius: 10, border: '1px dashed rgba(255,255,255,0.2)', background: 'transparent', color: 'rgba(232,234,246,0.4)', fontSize: 13, cursor: 'pointer', width: '100%', marginTop: 4, fontFamily: 'DM Sans, sans-serif' }}>
          + upload file
        </button>
      </div>
    </div>
  )
}