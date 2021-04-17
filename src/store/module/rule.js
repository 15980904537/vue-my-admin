export default {
    // let info=window.sessionStorage('info');
    // console.log();

    state: {
        navBar: []
    },
    getters: {
        adminIndex(state) {
            if (state.navBar.length === 0) {
                return '404'
            }
            if (state.navBar[0].subMenu[0]) {
                return state.navBar[0].subMenu[0].pathname
            }
           
        }
    },
    mutations: {
        //初始化菜单
        initRule(state) {
            let rule = window.sessionStorage.getItem('rule');
            if (rule) {
                state.navBar = JSON.parse(rule);
               
            }
        },
        //获取菜单权限

        getMenu(state,menu) {
            menu.forEach(item => {
                let list = [];
                item.child.forEach(item => {
                    list.push({
                        icon: item.icon,
                        name: item.name,
                        pathname:item.desc
                     })
                 })
                 state.navBar.push({
                     name: item.name,
                     subActive: '0',
                     subMenu:list
                   })
            })
            window.sessionStorage.setItem('rule',JSON.stringify(state.navBar))
        },
        //退出登录
        logout(state) { 
            state.navBar = [];
            window.sessionStorage.clear()
        }
    },
    actions: {}
} 