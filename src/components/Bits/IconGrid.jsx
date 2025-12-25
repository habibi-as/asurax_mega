export default function IconGrid({ items = [] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
      {items.map((it) => (
        <a
          key={it.label}
          href={it.href || '#'}
          className="group rounded-xl p-4 text-center"
          style={{ background: 'rgba(10,8,20,0.6)', border: `1px solid ${it.color}55` }}
        >
          <div className="mx-auto w-9 h-9 rounded-full mb-2 grid place-items-center"
               style={{ background: `${it.color}22`, boxShadow: `0 0 24px ${it.color}44`, border: `1px solid ${it.color}66` }}>
            {it.icon}
          </div>
          <div className="text-slate-200 text-sm md:text-base group-hover:text-white transition-colors" style={{ textShadow: `0 0 8px ${it.color}44` }}>{it.label}</div>
        </a>
      ))}
    </div>
  )
}