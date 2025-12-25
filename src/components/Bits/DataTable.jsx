import NeonLink from './NeonLink.jsx'

export default function DataTable({ columns = [], rows = [] }) {
  return (
    <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(10,8,20,0.6)' }}>
      <table className="min-w-full text-left text-sm">
        <thead className="text-slate-300">
          <tr>
            {columns.map((c) => (
              <th key={c.key} className="px-4 py-3 border-b border-white/10">{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody className="text-slate-200">
          {rows.map((r, idx) => (
            <tr key={idx} className="hover:bg-white/5">
              {columns.map((c) => (
                <td key={c.key} className="px-4 py-3 border-b border-white/5">
                  {c.render ? c.render(r[c.key], r) : r[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}