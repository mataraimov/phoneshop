import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  getMyDrinks,
  addDrinkToMe,
  deleteDrinkFromBasket,
} from '../../../../store/actions/lk/basket';
import { useAppDispatch, useAppSelector } from '../../../../store/hook';
import { addOrder } from '../../../../store/actions/lk/orders';
import './Basket.css';
import BasketItem from './BasketItem';
import { object } from 'yup/lib/locale';

const Basket: React.FC = () => {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(getMyDrinks());
  }, []);
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const sendOrderBtn = () => {
    dispatch(
      addOrder({
        drinks: checkedItems,
        date: new Date(),
        sum: total,
      }),
    );
    setShow(false);
  };

  const allItems = useAppSelector((state) => state.basket.get);
  const [checkedItems, setCheckedItems] = React.useState<Tdata[]>([]);
  const handleChange = (data: Tdata) => {
    const candidateChecked = checkedItems;
    const findIdx = candidateChecked.findIndex((obj) => obj.drinkId === data.drinkId);
    if (findIdx > -1) {
      candidateChecked.splice(findIdx, 1);
    } else {
      candidateChecked.push(data);
    }
    setCheckedItems(candidateChecked);
  };
  const makeOrderBtn = () => {
    if (checkedItems.length < 1) {
    } else {
      handleShow();
    }
  };
  let total = 0;
  type Tdata = {
    drinkId: number;
    name: string;
    amount: number;
    sum: number;
    id?: number;
    price?: number;
    basket_phone?: {
      amount: number;
      id: number;
    };
  };
  type Tdrink = {
    id: number;
    drink: Tdata;
  };

  return (
    <div className="basket">
      <h1 className="admin-pages_title">Корзина</h1>
      {allItems.loading && <div>Загрузка...</div>}
      {allItems.success &&
        allItems.drinks instanceof Array &&
        allItems.drinks.map((drink: Tdata) => (
          <BasketItem handleChange={handleChange} key={drink.id} drink={drink} />
        ))}
      {allItems.success && allItems.drinks instanceof Array && allItems.drinks.length <= 0 && (
        <>
          <div>Корзина пуста</div>
        </>
      )}
      {allItems.success && allItems.drinks instanceof Array && allItems.drinks.length > 0 && (
        <>
          <Button onClick={makeOrderBtn} className="basket_btn">
            Заказать
          </Button>
        </>
      )}

      <Modal className="basket_modal" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Заказ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="basket_modal_body">
            <div>Название - Кол-во - Цена - Сумма</div> <br />
            {checkedItems.map((d) => (
              <div key={d.drinkId} className="basket_modal_body_items">
                {d.name} - {d.amount}шт - {d.sum} сом = {d.sum * d.amount} сом
                <span style={{ display: 'none' }}>{(total += d.sum * d.amount)}</span>
              </div>
            ))}
            <div className="modal_sum">
              Сумма:
              {total}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div>*Ваш заказ может быть отказан если товар выкупят быстрее вас</div>
          <Button variant="primary" onClick={sendOrderBtn}>
            Заказать
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default Basket;
