import React from "react"
import { Button, Form, FormControl, InputGroup } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import MyNavbar from "../../components/Navbar/Navbar"
import { getDrinkById } from "../../store/actions/admin/drinks"
import { addDrinkToMe } from "../../store/actions/lk/basket"
import "./Drink.css"

export default function Drink() {
  const { id } = useParams()
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(getDrinkById(id))
  }, [])
  const navbarLinks = [{ path: "/lk", text: "Личный кабинет" }]
  const myDrink = useSelector(state => state.drinks.getById)
  const [amount, setAmount] = React.useState(1)
  const sendToBasketBtn = () => {
    if (amount >= 1 && amount <= myDrink.phone.amount) {
      dispatch(addDrinkToMe({ drinkId: id, amount }))
    }
    return
  }
  return (
    <div className="container drinkPage">
      <MyNavbar data={navbarLinks} />
      {myDrink.success && (
        <>
          <h1 className="drinkPage_title">Название: {myDrink.phone.name}</h1>
          <div className="drinkPage_row">
            <div className="drinkPage_image">
              <img src={myDrink.phone.logo} alt={myDrink.phone.name} />
            </div>
            <div className="drinkPage_info">
              <div className="drinkPage_info_price drinkPage_attr">
                Цена: {myDrink.phone.price} сом
              </div>
              <div className="drinkPage_info_brand drinkPage_attr">
                Бренд: {myDrink.phone.brand.name}
              </div>

              <div className="drinkPage_info_capacity drinkPage_attr">
                Количество: {myDrink.phone.amount} штук
              </div>
              <InputGroup className="drinkPage_info_counter">
                <InputGroup.Text
                  onClick={() => {
                    if (amount <= 1) {
                      return
                    }
                    setAmount(amount - 1)
                  }}
                >
                  -
                </InputGroup.Text>
                <FormControl
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  max={myDrink.phone.amount}
                  min={1}
                  type="number"
                />
                <InputGroup.Text
                  onClick={() => {
                    if (amount >= myDrink.phone.amount) {
                      return
                    }
                    setAmount(amount + 1)
                  }}
                >
                  +
                </InputGroup.Text>
              </InputGroup>
              <Button onClick={sendToBasketBtn}>В КОРЗИНУ</Button>
            </div>
          </div>
        </>
      )}
      {myDrink.loading && <div>Загрузка...</div>}
      {myDrink.failed && <div>Ошибка...</div>}
    </div>
  )
}
