import React from 'react';
import { Accordion, Button, Form, FormControl, InputGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deleteDrinkFromBasket } from '../../../../store/actions/lk/basket';
import { useAppDispatch } from '../../../../store/hook';
// type Tdrink = {
//   drinkId: number;
//   name: string;
//   amount: number;
//   sum: number;
// };
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
interface Ibasket {
  handleChange: (data: Tdata) => void;
  drink: Tdata;
}
const BasketItem = (props: Ibasket) => {
  const dispatch = useAppDispatch();
  const { drink } = props;
  const { handleChange } = props;
  const [amount, setAmount] = React.useState(drink.basket_phone?.amount);
  const deleteItemBtn = () => {
    dispatch(deleteDrinkFromBasket(drink.basket_phone?.id));
  };

  return (
    <Accordion className="songs_accordion songs_accordion-item basket_item" defaultActiveKey="1">
      <Accordion.Item className="songs_accordion" eventKey="0">
        <Accordion.Header className="songs_accordion songs_accordion-item_header">
          <Form.Check
            onChange={() =>
              handleChange({
                amount: amount!,
                drinkId: drink.id!,
                sum: drink.price!,
                name: drink.name,
              })
            }
            disabled={drink.amount <= 0}
            label={drink.name}
            type="checkbox"
          />
        </Accordion.Header>
        <Accordion.Body className="songs_accordion songs_accordion-item_body">
          <div className="songs_accordion-item_body_author">Цена: {drink.price} сом</div>
          <div className="songs_accordion-item_body_author">
            {drink.amount <= 0 ? (
              <span className="input_error">Количества недостаточно для заказа</span>
            ) : (
              `Общее количество: ${drink.amount}`
            )}
          </div>
          <InputGroup className="drinkPage_info_counter">
            <InputGroup.Text
              onClick={() => {
                if (amount! <= 1) {
                  return;
                }
                setAmount(amount! - 1);
              }}
            >
              -
            </InputGroup.Text>
            <FormControl
              value={amount}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(+e.target.value)}
              max={drink.amount}
              min={1}
              type="number"
            />
            <InputGroup.Text
              onClick={() => {
                if (amount! >= drink.amount) {
                  return;
                }
                setAmount(amount! + 1);
              }}
            >
              +
            </InputGroup.Text>
          </InputGroup>
          <Button onClick={deleteItemBtn} size="sm" variant="danger">
            Удалить
          </Button>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
export default BasketItem;
