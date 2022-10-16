import constants from '../../constants';
type Tget = {
  success: boolean;
  loading: boolean;
  failed: boolean;
  message?: string | object;
  brands?: Iaction | [] | {};
};
type Tdelete = {
  success: boolean;
  loading: boolean;
  failed: boolean;
  message?: string | object;
};
type Tedit = {
  success: boolean;
  loading: boolean;
  failed: boolean;
  message?: string | object;
};
interface Istate {
  get: Tget;
  delete: Tdelete;
  edit: Tedit;
}
interface Iaction {
  payload: object;
  type?: string;
}
interface GET_BRANDS_FAILED {
  type: 'GET_BRANDS_FAILED';
  payload: string;
}
interface GET_BRANDS_LOADING {
  type: 'GET_BRANDS_LOADING';
  payload: string;
}
interface GET_BRANDS_SUCCESS {
  type: 'GET_BRANDS_SUCCESS';
  payload: string;
}
interface DELETE_BRAND_FAILED {
  type: 'DELETE_BRAND_FAILED';
  payload: string;
}
interface DELETE_BRAND_LOADING {
  type: 'DELETE_BRAND_LOADING';
  payload: string;
}
interface DELETE_BRAND_SUCCESS {
  type: 'DELETE_BRAND_SUCCESS';
  payload: string;
}
interface EDIT_BRAND_LOADING {
  type: 'EDIT_BRAND_LOADING';
  payload: string;
}
interface EDIT_BRAND_FAILED {
  type: 'EDIT_BRAND_FAILED';
  payload: string;
}
interface EDIT_BRAND_SUCCESS {
  type: 'EDIT_BRAND_SUCCESS';
  payload: string;
}
type Actions =
  | GET_BRANDS_FAILED
  | GET_BRANDS_LOADING
  | GET_BRANDS_SUCCESS
  | DELETE_BRAND_FAILED
  | DELETE_BRAND_LOADING
  | DELETE_BRAND_SUCCESS
  | EDIT_BRAND_LOADING
  | EDIT_BRAND_FAILED
  | EDIT_BRAND_SUCCESS;

const initialState: Istate = {
  get: {
    success: false,
    loading: false,
    failed: false,
    message: '',
    brands: [],
  },
  delete: {
    success: false,
    loading: false,
    failed: false,
    message: '',
  },
  edit: {
    success: false,
    loading: false,
    failed: false,
    message: '',
  },
};

const reducer = (state: Istate = initialState, action: Actions): Istate => {
  switch (action.type) {
    case constants.GET_BRANDS_FAILED:
      return {
        ...state,
        get: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload,
        },
      };
    case constants.GET_BRANDS_LOADING:
      return {
        ...state,
        get: {
          success: false,
          loading: true,
          failed: false,
          message: 'Загрузка...',
        },
      };
    case constants.GET_BRANDS_SUCCESS:
      return {
        ...state,
        get: {
          success: true,
          loading: false,
          failed: false,
          brands: action.payload,
        },
      };
    case constants.DELETE_BRAND_FAILED:
      return {
        ...state,
        delete: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload,
        },
      };
    case constants.DELETE_BRAND_LOADING:
      return {
        ...state,
        delete: {
          success: false,
          loading: true,
          failed: false,
          message: 'Загрузка...',
        },
      };
    case constants.DELETE_BRAND_SUCCESS:
      return {
        ...state,
        delete: {
          success: true,
          loading: false,
          failed: false,
          message: '',
        },
      };

    case constants.EDIT_BRAND_FAILED:
      return {
        ...state,
        edit: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload,
        },
      };
    case constants.EDIT_BRAND_LOADING:
      return {
        ...state,
        edit: {
          success: false,
          loading: true,
          failed: false,
          message: 'Загрузка...',
        },
      };
    case constants.EDIT_BRAND_SUCCESS:
      return {
        ...state,
        edit: {
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
