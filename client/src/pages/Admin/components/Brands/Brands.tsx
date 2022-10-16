import React from 'react';
import './Brands.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBrands, addBrand } from '../../../../store/actions/admin/brands';
import { FormControl, InputGroup } from 'react-bootstrap';
import BrandItem from './BrandItem';
import { useAppDispatch, useAppSelector } from '../../../../store/hook';
const Types: React.FC = () => {
  const dispatch = useAppDispatch();
  const brands = useAppSelector((state) => state.brands.get);
  const [typeName, setTypeName] = React.useState('');
  type Itype = {
    name: string;
    type: string;
    id: number;
  };
  React.useEffect(() => {
    dispatch(getAllBrands());
  }, []);
  const addTypeBtn = async () => {
    if (typeName) {
      dispatch(addBrand(typeName));
    }
  };
  return (
    <div className="types">
      <h1 className="admin-pages_title">Производители</h1>
      <InputGroup>
        <FormControl
          placeholder="Введите название производителя"
          className="auth_input"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTypeName(e.target.value)}
          value={typeName}
        />
        <InputGroup.Text onClick={addTypeBtn} className="types-input_after types-input_after-send">
          +
        </InputGroup.Text>
      </InputGroup>
      {brands.success &&
        brands.brands instanceof Array &&
        brands.brands.map((type: Itype) => {
          return <BrandItem key={type.id} type={type} />;
        })}
    </div>
  );
};
export default Types;
