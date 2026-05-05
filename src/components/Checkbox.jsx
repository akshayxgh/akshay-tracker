export default function Checkbox({ checked, color, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        width: 20, height: 20, borderRadius: 5, flexShrink: 0, cursor: 'pointer',
        background: checked ? color : 'transparent',
        border: checked ? `2px solid ${color}` : '1.5px solid rgba(255,255,255,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxSizing: 'border-box',
      }}
    >
      {checked === true && (
        <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
          <path d="M1.5 4.5L4 7L9.5 1.5" stroke="white" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  )
}