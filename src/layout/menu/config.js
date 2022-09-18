export default {
  // 此配置，后续可以从后端读取、组装
  menus: [
    {
      key: 'home',
      title: '首页',
      icon: 'home-outlined'
    },
    {
      key: 'config',
      title: '配置管理',
      icon: 'setting-outlined',
      children: [
        {
          key: 'configSystem',
          title: '系统配置'
        }
      ]
    }
  ]
}