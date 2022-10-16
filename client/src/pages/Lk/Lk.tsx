import React from "react"
import { Outlet } from "react-router"
import Navbar from "../../components/Navbar/Navbar"
import "./Lk.css"
type NavBarLinks={
  path:string;
  text:string
}
const Lk: React.FC =()=> {
  const navbarLinks:NavBarLinks[] = [
    { path: "", text: "Корзина" },
    { path: "orders", text: "Мои заказы" },
  ]
  return (
    <div className='lk container'>
      <Navbar data={navbarLinks} />
      <div className='admin_divider'>
        <Outlet /> 
      </div>
    </div>
  )
}
export default Lk