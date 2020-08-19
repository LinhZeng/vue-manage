export const setTitle = function(title) {
  title = title ? title : 'Pineapple后台';
  window.document.title = 'Pineapple后台-' + title;
}