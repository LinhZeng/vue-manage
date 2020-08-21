import {request} from '../request';

export default {
  getList(params) {
    return request('post', '/work/list', params);
  },
  getAppList(params) {
    return request('post', '/console/app/list', params);
  },
  getChannelList(params) {
    return request('post', '/console/channel/list', params);
  },
  getTiePack(params) {
    return request('post', '/console/packageType/list', params);
  },
  save(params) {
    return request('post', '/console/pdPackage/save', params);
  }
}