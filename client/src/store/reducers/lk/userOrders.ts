import constants from '../../constants';
interface Iaction {
  payload: object;
  type: string;
}
type Tget = {
  success: boolean;
  loading: boolean;
  failed: boolean;
  message?: string | object;
  orders?: Iaction | [];
};
type Tadd = {
  success: boolean;
  loading: boolean;
  failed: boolean;
  message?: string | object;
};
interface Istate {
  get: Tget;
  add: Tadd;
}
const initialState: Istate = {
  get: {
    success: false,
    loading: false,
    failed: false,
    message: '',
    orders: [],
  },
  add: {
    success: false,
    loading: false,
    failed: false,
    message: '',
  },
};
const reducer = (state = initialState, action: Iaction) => {
  switch (action.type) {
    case constants.ADD_ORDER_FAILED:
      return {
        ...state,
        add: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload,
        },
      };
    case constants.ADD_ORDER_LOADING:
      return {
        ...state,
        add: {
          success: false,
          loading: true,
          failed: false,
          message: 'Загрузка...',
        },
      };
    case constants.ADD_ORDER_SUCCESS:
      return {
        ...state,
        add: {
          success: true,
          loading: false,
          failed: false,
          coupons: action.payload,
        },
      };

    case constants.GET_USER_ORDERS_FAILED:
      return {
        ...state,
        get: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload,
        },
      };
    case constants.GET_USER_ORDERS_LOADING:
      return {
        ...state,
        get: {
          success: false,
          loading: true,
          failed: false,
          message: 'Загрузка...',
        },
      };
    case constants.GET_USER_ORDERS_SUCCESS:
      return {
        ...state,
        get: {
          success: true,
          loading: false,
          failed: false,
          orders: action.payload,
        },
      };
    default:
      return state;
  }
};

export default reducer;
