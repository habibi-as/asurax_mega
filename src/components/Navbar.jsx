import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/gaming">Gaming</NavLink></li>
        <li><NavLink to="/video">Video</NavLink></li>
        <li><NavLink to="/sound">Sound</NavLink></li>
        <li><NavLink to="/photo">Photo</NavLink></li>
        <li><NavLink to="/docs">Docs</NavLink></li>
        <li><NavLink to="/website">Website</NavLink></li>
      </ul>
    </nav>
  )
}