import React from 'react';
import { Accordion, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { executeOrder } from '../../../../store/actions/admin/orders';

export default function OrderItem({ order }) {
  console.log(order);
  return (
    <Accordion className="songs_accordion songs_accordion-item" defaultActiveKey="0">
      <Accordion.Item className="songs_accordion" eventKey="0">
        <Accordion.Header className="songs_accordion songs_accordion-item_header">
          Номер заказа: {order.id}
        </Accordion.Header>
        <Accordion.Body className="songs_accordion songs_accordion-item_body">
          <div className="songs_accordion-item_body_author">
            Дата: {new Date(order.date).toLocaleString()}
          </div>
          <div className="songs_accordion-item_body_author">Сумма: {order.sum} сом</div>
          <h2 className="order_item_subtitle">Телефоны</h2>
          {order.phones.map((d, index) => (
            <div key={d.id}>
              {index + 1}
              {d.name} - {d.price} сом - {d.order_phone.amount} шт.
            </div>
          ))}
          {order.user && (
            <>
              <h2 className="order_item_subtitle">Пользователь</h2>
              <div> {order.user.email}</div>
            </>
          )}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
