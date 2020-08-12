const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routers,
  errorLogs: state => state.errorLog.logs,
  addRouters: state => state.permission.addRouters,
  isLock: state => state.user.isLock,
  lockPasswd: state => state.user.lockPasswd,
  browserHeaderTitle: state => state.user.browserHeaderTitle
}
export default getters
