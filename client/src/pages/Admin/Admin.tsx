import React from "react"
import Navbar from "../../components/Navbar/Navbar"
import { NavLink, Outlet } from "react-router-dom"
import "./Admin.css"
type NavBarLinks={
  path:string;
  text:string
}
const Admin:React.FC =()=>{
  const navbarLinks:NavBarLinks[] = [
    { path: "", text: "Бренды" },
    { path: "projections", text: "Телефоны" },
    { path: "orders", text: "Заказы" },
    { path: "reports", text: "Итог" },
  ]
  return (
    <div className='admin container'>
      <Navbar data={navbarLinks} />
      <div className='admin_divider'>
        <Outlet />
      </div>
    </div>
  )
}
export default Admin