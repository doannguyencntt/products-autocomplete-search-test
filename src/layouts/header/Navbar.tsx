import { MENU_ITEMS } from "@/shared/constants"
import { Link } from "react-router-dom"

export const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            {
              MENU_ITEMS.map(item => (
                <li key={item.label}><Link to={item.key}>{item.label}</Link></li>
              ))
            }
          </ul>
        </div>
        <span className=" text-xl">Logo</span>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {
            MENU_ITEMS.map(item => (
              <li key={item.label}><Link to={item.key}>{item.label}</Link></li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}