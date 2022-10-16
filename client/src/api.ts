const root: string = 'http://localhost:5050';
// type Tapi=Record<string,string>
// interface Iapi{
//   auth:{types:Tapi},
//   admin:Tapi
//   lk:Tapi
// }
const api = {
  auth: {
    login: `${root}/api/auth/login`,
    registration: `${root}/api/auth/reg`,
    getRole: `${root}/api/auth/getRole`,
  },
  admin: {
    types: {
      getAll: `${root}/api/type/getAll`,
      add: `${root}/api/type/add`,
      edit: `${root}/api/type/edit`,
      delete: `${root}/api/type/delete`,
    },
    brands: {
      getAll: `${root}/api/brand/getAll`,
      add: `${root}/api/brand/add`,
      edit: `${root}/api/brand/edit`,
      delete: `${root}/api/brand/delete`,
    },
    drinks: {
      getAll: `${root}/api/projection/getAll`,
      getPaginated: `${root}/api/projection/getByPagination?`,
      getFiltered: `${root}/api/projection/getByFilter?`,
      add: `${root}/api/projection/add`,
      receipt: `${root}/api/projection/receipt`,
      getById: `${root}/api/projection/getById`,
    },
    coupons: {
      getAll: `${root}/api/coupon/getAll`,
      add: `${root}/api/coupon/add`,
      delete: `${root}/api/coupon/delete`,
    },
    orders: {
      getAll: `${root}/api/orders/getAll`,
      execute: `${root}/api/orders/execute`,
    },
    reports: {
      getReportByDates: `${root}/api/reports/getReportByDates`,
    },
  },
  lk: {
    coupons: {
      addToMe: `${root}/api/coupon/setCouponToMe`,
      getMyCoupons: `${root}/api/coupon/getMyCoupons`,
    },
    basket: {
      getMyDrinks: `${root}/api/basket/getAll`,
      add: `${root}/api/basket/add`,
      delete: `${root}/api/basket/delete`,
    },
    order: {
      getAll: `${root}/api/userOrders/getAll`,
      add: `${root}/api/userOrders/add`,
    },
  },
};
export default api;
