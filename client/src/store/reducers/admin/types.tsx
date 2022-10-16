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
  types?: Iaction | [] | {};
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
const initialState: Istate = {
  get: {
    success: false,
    loading: false,
    failed: false,
    message: '',
    types: [],
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
const reducer = (state: Istate = initialState, action: Iaction) => {
  switch (action.type) {
    case constants.GET_TYPES_FAILED:
      return {
        ...state,
        get: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload,
        },
      };
    case constants.GET_TYPES_LOADING:
      return {
        ...state,
        get: {
          success: false,
          loading: true,
          failed: false,
          message: 'Загрузка...',
        },
      };
    case constants.GET_TYPES_SUCCESS:
      return {
        ...state,
        get: {
          success: true,
          loading: false,
          failed: false,
          types: action.payload,
        },
      };
    case constants.DELETE_TYPE_FAILED:
      return {
        ...state,
        delete: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload,
        },
      };
    case constants.DELETE_TYPE_LOADING:
      return {
        ...state,
        delete: {
          success: false,
          loading: true,
          failed: false,
          message: 'Загрузка...',
        },
      };
    case constants.DELETE_TYPE_SUCCESS:
      return {
        ...state,
        delete: {
          success: true,
          loading: false,
          failed: false,
          message: '',
        },
      };

    case constants.EDIT_TYPE_FAILED:
      return {
        ...state,
        edit: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload,
        },
      };
    case constants.EDIT_TYPE_LOADING:
      return {
        ...state,
        edit: {
          success: false,
          loading: true,
          failed: false,
          message: 'Загрузка...',
        },
      };
    case constants.EDIT_TYPE_SUCCESS:
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
