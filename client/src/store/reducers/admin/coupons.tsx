import constants from '../../constants';
type Tget = {
  success: boolean;
  loading: boolean;
  failed: boolean;
  message?: string;
  coupons?: Iaction | [];
};
type Tdelete = {
  success: boolean;
  loading: boolean;
  failed: boolean;
  message?: string;
};
type Tedit = {
  success: boolean;
  loading: boolean;
  failed: boolean;
  message?: string;
};
interface Istate {
  get: Tget;
  delete: Tdelete;
  add: Tedit;
}
interface Iaction {
  payload: object;
  type?: string;
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
  delete: {
    success: false,
    loading: false,
    failed: false,
    message: '',
  },
};
const reducer = (state = initialState, action: Iaction) => {
  switch (action.type) {
    case constants.GET_ALL_COUPONS_FAILED:
      return {
        ...state,
        get: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload,
        },
      };
    case constants.GET_ALL_COUPONS_LOADING:
      return {
        ...state,
        get: {
          success: false,
          loading: true,
          failed: false,
          message: 'Загрузка...',
        },
      };
    case constants.GET_ALL_COUPONS_SUCCESS:
      return {
        ...state,
        get: {
          success: true,
          loading: false,
          failed: false,
          coupons: action.payload,
        },
      };
    case constants.ADD_COUPON_FAILED:
      return {
        ...state,
        add: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload,
        },
      };
    case constants.ADD_COUPON_LOADING:
      return {
        ...state,
        add: {
          success: false,
          loading: true,
          failed: false,
          message: 'Загрузка...',
        },
      };
    case constants.ADD_COUPON_SUCCESS:
      return {
        ...state,
        add: {
          success: true,
          loading: false,
          failed: false,
          message: '',
        },
      };

    case constants.DELETE_COUPON_FAILED:
      return {
        ...state,
        delete: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload,
        },
      };
    case constants.DELETE_COUPON_LOADING:
      return {
        ...state,
        delete: {
          success: false,
          loading: true,
          failed: false,
          message: 'Загрузка...',
        },
      };
    case constants.DELETE_COUPON_SUCCESS:
      return {
        ...state,
        delete: {
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
