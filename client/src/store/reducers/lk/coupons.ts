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
  coupons?: Iaction | [];
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
    coupons: [],
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
    case constants.GET_MY_COUPONS_FAILED:
      return {
        ...state,
        get: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload,
        },
      };
    case constants.GET_MY_COUPONS_LOADING:
      return {
        ...state,
        get: {
          success: false,
          loading: true,
          failed: false,
          message: 'Загрузка...',
        },
      };
    case constants.GET_MY_COUPONS_SUCCESS:
      return {
        ...state,
        get: {
          success: true,
          loading: false,
          failed: false,
          coupons: action.payload,
        },
      };
    case constants.ADD_COUPON_TO_ME_FAILED:
      return {
        ...state,
        add: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload,
        },
      };
    case constants.ADD_COUPON_TO_ME_LOADING:
      return {
        ...state,
        add: {
          success: false,
          loading: true,
          failed: false,
          message: 'Загрузка...',
        },
      };
    case constants.ADD_COUPON_TO_ME_SUCCESS:
      return {
        ...state,
        add: {
          success: true,
          loading: false,
          failed: false,
          message: '',
        },
      };
    default:
      return state;
  }
};

export default reducer;
