import React from "react"
import { Accordion, Button } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { executeOrder } from "../../../../store/actions/admin/orders"

export default function OrderItem({ order }) {
  const dispatch = useDispatch()
  const executeOrderBtn = status => {
    dispatch(executeOrder({ orderId: order.id, drinks: order.phones, status }))
  }
  const makeStatusString = status => {
    let statusStr
    switch (status) {
      case 0:
        statusStr = "Отказано"
        break
      case 1:
        statusStr = "В ожидании"
        break
      case 2:
        statusStr = "Выполнено"
        break
      default:
        statusStr = "В ожидании"
    }
    return statusStr
  }
  console.log(order)
  return (
    <Accordion
      className="songs_accordion songs_accordion-item"
      defaultActiveKey="0"
    >
      <Accordion.Item className="songs_accordion" eventKey="0">
        <Accordion.Header className="songs_accordion songs_accordion-item_header">
          OrderId: {order.id}
        </Accordion.Header>
        <Accordion.Body className="songs_accordion songs_accordion-item_body">
          <div className="songs_accordion-item_body_author">
            Дата заказа: {new Date(order.date).toLocaleString()}
          </div>
          <div className="songs_accordion-item_body_author">
            Сумма: {order.sum} сом
          </div>
          <div className="songs_accordion-item_body_author">
            Выполнено: {makeStatusString(order.status)}
          </div>
          <h2 className="order_item_subtitle">Товары</h2>
          {order.phones.map((d, index) => (
            <div key={d.id}>
              {index + 1}){d.name} - {d.price} сом - {d.order_phone.amount}{" "}
              шт.
            </div>
          ))}
          {order.user && (
            <>
              <h2 className="order_item_subtitle">Юзер</h2>
              <div> {order.user.email}</div>
            </>
          )}
          {order.status == 2 && (
            <Button variant="secondary" disabled>
              Выполнено
            </Button>
          )}
          {order.status == 1 && (
            <Button onClick={() => executeOrderBtn(2)}>Выполнить</Button>
          )}
          {order.status == 1 && (
            <Button variant="danger" onClick={() => executeOrderBtn(0)}>
              Отказать
            </Button>
          )}
          {order.status == 0 && (
            <Button variant="secondary" disabled>
              Отказано
            </Button>
          )}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}
