import NeonButton from './NeonButton.jsx'

export default function PrimaryButton({ children, onClick, className = '' }) {
  return <NeonButton onClick={onClick} className={className} variant="purple">{children}</NeonButton>
}