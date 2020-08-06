// 插件
import moment from 'moment'; // 时间格式化插件

const plugins = function(Vue) {
  Vue.filter('dateformat', function(dataStr, pattern='YYYY-MM-DD HH:mm:ss') {
    return moment(dataStr).format(pattern);
  })
}
export default plugins;