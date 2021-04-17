const routes = [{
    path: '/',
    name: 'layout',
    redirect: { name: 'index' },
    component: 'layout/index',
    children: [
        {
            // path:'/index',
            // name:'index',
            meta: { title: '后台首页' },
            component: 'index/index'
        }, {
            // path:'/shop/goods/list',
            // name:'shop_goods_list',
            meta: { title: '相册管理' },
            component: 'image/index'
        },
        {
            // path:'/shop/goods/list',
            // name:'shop_goods_list',
            meta: { title: '商品列表' },
            component: 'shop/goods/list'
        },{
            // path:'/shop/goods/list',
            // name:'shop_goods_list',
            meta: { title: '发布商品' },
            component: 'shop/goods/create'
        }, {
            // path:'/shop/goods/list',
            // name:'shop_goods_list',
            meta: { title: '分类列表' },
            component: 'shop/category/list'
        }, {
            // path:'/shop/goods/list',
            // name:'shop_goods_list',
            meta: { title: '商品规格' },
            component: 'shop/sku/list'
        },
        {
            // path:'/shop/goods/list',
            // name:'shop_goods_list',
            meta: { title: '商品类型' },
            component: 'shop/type/list'
        },
        {
            meta: { title: '404' },
            component: '404/index'
    }]
}, {
    // path:'/login',
    // name:'login',
    // components:()=>import(/* webpackChunkName: "login" */ '../../views/login/index.vue')
    meta: { title: '登录页' },
    component: 'login/index'
},
{
    path: '*',
    redirect: { name: 'index' }
}
]

function getRoutes() {
    handleRoutes(routes)
    return routes
}

function handleRoutes(routes) {
    routes.forEach((item) => {
        let com = item.component
        if (!com) return
        let val = getStr(com);

        //处理path
        item.path = item.path || `/${val}`;
        //处理name
        item.name = item.name || val.replace(/\//g, '_')
        //处理components
        item.component = () => {
            return import(`../../views/${com}.vue`)
        }
        if (item.children) {
            handleRoutes(item.children)
        }
    })
}
function getStr(str) {
    let index = str.lastIndexOf('/');

    let val = str.substring(index + 1, str.length);
    if (val === 'index') {
        return str.substring(index, -1)
    }
    return str
}

export default getRoutes()