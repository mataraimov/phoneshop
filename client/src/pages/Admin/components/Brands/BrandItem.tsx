import React from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { number } from 'yup';
import { useAppDispatch } from '../../../../store/hook';
import { deleteBrand, editBrand, getAllBrands } from '../../../../store/actions/admin/brands';
interface Itype {
  type: {
    name: string;
    id: number;
  };
}
const TypeItem: React.FC<Itype> = (props) => {
  const { type } = props;
  const [choosenItemId, setChoosenItemId] = React.useState(0);
  const [typeName, setTypeName] = React.useState(type.name);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  console.log(navigate);

  const saveTypeBtn = (id: number) => {
    if (typeName) {
      setChoosenItemId(0);
      dispatch(editBrand({ id, name: typeName }));
    }
  };
  const deleteTypeBtn = (id: number) => {
    dispatch(deleteBrand(id));
  };
  return (
    <div className="typeItem">
      <InputGroup>
        <FormControl
          disabled={type.id !== choosenItemId}
          name="type"
          type="text"
          onChange={(e) => setTypeName(e.target.value)}
          value={typeName}
          className="auth_input"
        />
        {type.id !== choosenItemId && (
          <InputGroup.Text
            onClick={() => setChoosenItemId(type.id)}
            className="types-input_after types-input_after-edit"
          >
            Изменить
          </InputGroup.Text>
        )}

        {type.id === choosenItemId && (
          <InputGroup.Text
            onClick={() => saveTypeBtn(type.id)}
            className="types-input_after types-input_after-edit"
          >
            Сохранить
          </InputGroup.Text>
        )}

        <InputGroup.Text
          onClick={() => deleteTypeBtn(type.id)}
          className="types-input_after types-input_after-delete"
        >
          Удалить
        </InputGroup.Text>
      </InputGroup>
    </div>
  );
};
export default TypeItem;
