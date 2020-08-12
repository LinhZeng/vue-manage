export const setTitle = function(title) {
  title = title ? title : '起飞后台';
  window.document.title = '起飞后台-' + title;
}