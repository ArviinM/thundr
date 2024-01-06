import api from '..';
import {FILTERS} from '../constants';

const FilterConfig = {
  getFilters: payload =>
    api.get(`${FILTERS.GET_AND_UPDATE_FILTER}?sub=${payload.sub}`, payload),
  updateFilters: payload => api.post(FILTERS.GET_AND_UPDATE_FILTER, payload),
};

export default FilterConfig;
