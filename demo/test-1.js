const _import = out => { };

const globalRoutes = [
    { path: '/404', component: _import('common/404'), name: '404', meta: { title: '404未找到' } },
    { path: '/login', component: _import('common/login'), name: 'login', meta: { title: '登录' } }
];

// 主入口路由(需嵌套上左右整体布局)
const mainRoutes = {
    path: '/',
    component: _import('main'),
    name: 'main',
    redirect: { name: 'home' },
    meta: { title: '主入口整体布局' },
    children: [
        // 通过meta对象设置路由展示方式
        // 1. isTab: 是否通过tab展示内容, true: 是, false: 否
        // 2. iframeUrl: 是否通过iframe嵌套展示内容, '以http[s]://开头': 是, '': 否
        // 提示: 如需要通过iframe嵌套展示内容, 但不通过tab打开, 请自行创建组件使用iframe处理!
        {path: '/home', component: _import('common/home'), name: 'home', meta: {title: '首页'}},
        { path: '/theme', component: _import('common/theme'), name: 'theme', meta: { title: '主题' } },
        { path: '/demo-echarts', component: _import('demo/echarts'), name: 'demo-echarts', meta: { title: 'demo-echarts', isTab: true } },
        { path: '/demo-ueditor', component: _import('demo/ueditor'), name: 'demo-ueditor', meta: { title: 'demo-ueditor', isTab: true } },
        { path: '/demo-date-picker', component: _import('demo/date-picker'), name: 'demo-date-picker', meta: { title: 'demo-date-picker' } }

    ],
    beforeEnter (to, from, next) {
        let token = Vue.cookie.get('token');
        if (!token || !/\S/.test(token)) {
            next({ name: 'login' });
        }
        next();
    }
};
console.log(globalRoutes.concat(mainRoutes))
