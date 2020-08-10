import {request} from '../request';

export default {
  getList(params) {
    return request('post', '/console/pdPackage/list', params);
  }
}