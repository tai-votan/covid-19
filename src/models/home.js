import { querySummary, queryCountry, queryWorld } from '@/services/home';

const UserModel = {
  namespace: 'home',
  state: {
    countries: [],
    currentDate: new Date(),
    country: [],
  },
  effects: {
    *fetchSummary(_, { call, put }) {
      const response = yield call(querySummary);

      const global =
        {
          ...response.Global,
          Country: 'Global',
        } || {};
      const countries = [global]
        .concat(response.Countries || [])
        .map((country) => ({ ...country, key: country.TotalConfirmed }));
      yield put({
        type: 'save',
        payload: {
          countries,
        },
      });
    },
    *fetchDetailsByCountry({ payload }, { call, put }) {
      const response = yield call(queryCountry, payload);

      const country = (response || []).map((item) => ({
        ...item,
        NewConfirmed: item.Confirmed,
        NewDeaths: item.Deaths,
        NewRecovered: item.Recovered,
        key: item.ID,
      }));

      yield put({
        type: 'save',
        payload: {
          country: country.reverse(),
        },
      });
    },
    *fetchDetailsByWorld(_, { call, put }) {
      const response = yield call(queryWorld);
      const country = (response || []).map((item) => ({
        ...item,
        key: item.NewConfirmed,
        Country: 'Global',
      }));

      yield put({
        type: 'save',
        payload: {
          country: country.reverse(),
        },
      });
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
export default UserModel;
