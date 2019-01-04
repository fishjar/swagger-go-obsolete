import {
  querySingle,
  removeSingle,
  addSingle,
  updateSingle,
  queryMultiple,
  removeMultiple,
  addMultiple,
  updateMultiple,
} from '@/services/foos';

export default {
  namespace: 'foos',

  state: {
    list: [],
    pagination: {},
  },

  effects: {
    *fetchMultiple({ payload = {}, callback }, { call, put }) {
      const { page_num = 1, page_size = 10 } = payload;
      const response = yield call(queryMultiple, payload);
      if (response) {
        const { count, rows } = response;
        yield put({
          type: 'save',
          payload: {
            list: rows,
            pagination: {
              total: count,
              pageSize: page_size,
              current: page_num,
            },
          },
        });
        if (callback) callback(response);
      }
    },
    *fetchSingle({ payload, callback }, { call, put }) {
      const response = yield call(querySingle, payload);
      if (callback) callback(response);
    },
    *createMultiple({ payload, callback }, { call, put }) {
      const response = yield call(addMultiple, payload);
      if (callback) callback();
    },
    *createSingle({ payload, callback }, { call, put }) {
      const response = yield call(addSingle, payload);
      if (callback) callback();
    },
    *deleteMultiple({ payload, callback }, { call, put }) {
      const response = yield call(removeMultiple, payload);
      if (callback) callback();
    },
    *deleteSingle({ payload, callback }, { call, put }) {
      const response = yield call(removeSingle, payload);
      if (callback) callback();
    },
    *editMultiple({ payload, callback }, { call, put }) {
      const response = yield call(updateMultiple, payload);
      const { ids, fields } = payload;
      yield put({
        type: 'update',
        payload: {
          ids,
          fields,
        },
      });
      if (callback) callback();
    },
    *editSingle({ payload, callback }, { call, put }) {
      const response = yield call(updateSingle, payload);
      const { id, ...fields } = payload;
      yield put({
        type: 'update',
        payload: {
          ids: [id],
          fields,
        },
      });
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    update(state, action) {
      return {
        ...state,
        list: state.list.map(item => {
          if (action.payload.ids.includes(item.id)) {
            return { ...item, ...action.payload.fields };
          }
          return item;
        }),
      };
    },
  },
};
