import constants from '../../constants';
type Tget = {
  success: boolean;
  loading: boolean;
  failed: boolean;
  message?: string;
  drinks?: Iaction | [];
};
type TgetById = {
  success: boolean;
  loading: boolean;
  failed: boolean;
  message?: string;
  phone?: Iaction | {};
};
type Treceipt = {
  success: boolean;
  loading: boolean;
  failed: boolean;
  message?: string;
};
type Tadd = {
  success: boolean;
  loading: boolean;
  failed: boolean;
  message?: string;
};
interface Istate {
  get: Tget;
  getById: TgetById;
  add: Tadd;
  receipt: Treceipt;
  total: number;
}
interface Iaction {
  payload: Tpayload;
  type?: string;
}
type Tpayload = {
  total: number;
  phones: object[];
};
const initialState: Istate = {
  get: {
    success: false,
    loading: false,
    failed: false,
    message: '',
    drinks: [],
  },
  getById: {
    success: false,
    loading: false,
    failed: false,
    message: '',
    phone: {},
  },
  add: {
    success: false,
    loading: false,
    failed: false,
    message: '',
  },
  receipt: {
    success: false,
    loading: false,
    failed: false,
    message: '',
  },
  total: 0,
};
const reducer = (state = initialState, action: Iaction) => {
  switch (action.type) {
    case constants.GET_DRINKS_FAILED:
      return {
        ...state,
        get: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload,
        },
      };
    case constants.GET_DRINKS_LOADING:
      return {
        ...state,
        get: {
          success: false,
          loading: true,
          failed: false,
          message: 'Загрузка...',
        },
      };
    case constants.GET_DRINKS_SUCCESS:
      return {
        ...state,
        get: {
          success: true,
          loading: false,
          failed: false,
          drinks: action.payload,
        },
      };
    case constants.GET_DRINK_FAILED:
      return {
        ...state,
        getById: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload,
        },
      };
    case constants.GET_DRINK_LOADING:
      return {
        ...state,
        getById: {
          success: false,
          loading: true,
          failed: false,
          message: 'Загрузка...',
        },
      };
    case constants.GET_DRINK_SUCCESS:
      return {
        ...state,
        getById: {
          success: true,
          loading: false,
          failed: false,
          phone: action.payload,
        },
      };
    case constants.GET_DRINKS_PAGINATED_FAILED:
      return {
        ...state,
        get: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload,
          drinks: [],
        },
      };
    case constants.GET_DRINKS_PAGINATED_LOADING:
      return {
        ...state,
        get: {
          success: false,
          loading: true,
          failed: false,
          message: 'Загрузка...',
          drinks: [],
        },
      };
    case constants.GET_DRINKS_PAGINATED_SUCCESS:
      return {
        ...state,
        get: {
          success: true,
          loading: false,
          failed: false,
          drinks: action.payload.phones,
        },
        total: action.payload.total,
      };

    case constants.ADD_DRINK_FAILED:
      return {
        ...state,
        add: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload,
        },
      };
    case constants.ADD_DRINK_LOADING:
      return {
        ...state,
        add: {
          success: false,
          loading: true,
          failed: false,
          message: 'Загрузка...',
        },
      };
    case constants.ADD_DRINK_SUCCESS:
      return {
        ...state,
        add: {
          success: true,
          loading: false,
          failed: false,
          message: action.payload,
        },
      };

    case constants.RECEIPT_DRINK_FAILED:
      return {
        ...state,
        receipt: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload,
        },
      };
    case constants.RECEIPT_DRINK_LOADING:
      return {
        ...state,
        receipt: {
          success: false,
          loading: true,
          failed: false,
          message: 'Загрузка...',
        },
      };
    case constants.RECEIPT_DRINK_SUCCESS:
      return {
        ...state,
        receipt: {
          success: true,
          loading: false,
          failed: false,
          message: action.payload,
        },
      };

    default:
      return state;
  }
};

export default reducer;
