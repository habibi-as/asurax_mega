import NeonButton from './NeonButton.jsx'

export default function ContactBanner({ title = 'Work With Asurax', buttons = [] }) {
  return (
    <div className="rounded-xl p-8 text-center relative overflow-hidden"
         style={{ background: 'linear-gradient(180deg, rgba(10,8,20,0.8), rgba(5,3,12,0.9))', border: '1px solid rgba(255,255,255,0.12)' }}>
      <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(0deg, #0A0814 0px, #0A0814 2px, #06040E 2px, #06040E 36px)', opacity: 0.6 }} />
      <div className="relative">
        <div className="text-[clamp(1.2rem,3vw,1.8rem)] text-slate-200">{title}</div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          {buttons.map((b) => (
            <NeonButton key={b.label} href={b.href} variant={b.color === '#A24CFF' ? 'purple' : b.color === '#C4A46A' ? 'gold' : 'cyan'}>{b.label}</NeonButton>
          ))}
        </div>
      </div>
    </div>
  )
}