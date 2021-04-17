export default {
    // let info=window.sessionStorage('info');
    // console.log();

    state: {
        info: {},
        token: false

    },
    getters: {},
    mutations: {
        //初始化用户信息
        initState(state) {
            let info = window.sessionStorage.getItem('info');
            if (info) {
                state.info = JSON.parse(info);
                state.token = state.info.token
            }
        },
        //保存用户信息
        saveInfo(state, info) {
            state.info = info
            state.token = info.token

            //存储本地
            window.sessionStorage.setItem('info', JSON.stringify(state.info))
            window.sessionStorage.setItem('token', state.token)
        },

        //退出登录
        logout(state) {
            state.info = {};
            state.token = false;
            window.sessionStorage.clear()
        }
    },
    actions: {}
} 