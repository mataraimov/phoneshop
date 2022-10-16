import React from "react"
import { Accordion } from "react-bootstrap"

export default function MyOrderItem({ order }) {
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
  return (
    <Accordion
      className="songs_accordion songs_accordion-item"
      defaultActiveKey="0"
    >
      <Accordion.Item className="songs_accordion" eventKey="0">
        <Accordion.Header className="songs_accordion songs_accordion-item_header">
          Номер заказа: {order.id}
        </Accordion.Header>
        <Accordion.Body className="songs_accordion songs_accordion-item_body">
          <div className="songs_accordion-item_body_author">
            Дата: {new Date(order.date).toLocaleString()}
          </div>
          <div className="songs_accordion-item_body_author">
            Сумма: {order.sum} сом
          </div>
          <div className="songs_accordion-item_body_author">
            Выполнено: {makeStatusString(order.status)}
          </div>
          <h2 className="order_item_subtitle">Телефоны</h2>
          {order.phones.length &&
            order.phones.map((d, index) => (
              <div key={d.id}>
                {index + 1}){d.name} - {d.price} сом - {d.order_phone.amount}{" "}
                шт.
              </div>
            ))}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}
