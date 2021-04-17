<template>
  <div>
    <!-- 主布局 -->
    <el-container
      style="
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        overflow: hidden;
      "
    >
      <el-header
        class="d-flex align-items-center"
        style="width: 100%; background-color: #545c64"
      >
        <h5 class="mb-0 text-white" style="margin-right: auto">
          {{ $conf.logo }}
        </h5>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item
            :index="index | numtoString"
            v-for="(item, index) in navBar"
            :key="index"
            >{{ item.name }}</el-menu-item
          >
          <el-submenu index="6">
            <template slot="title">
              <el-avatar
                size="small"
                :src="
                  info.avatar
                    ? 'http://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/public/5e39862c67d41.jpg'
                    : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
                "
              ></el-avatar>
            </template>
            <el-menu-item index="6-1">修改</el-menu-item>
            <el-menu-item index="6-2">退出</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>
      <el-container style="height: 100%">
        <el-aside width="200px" style="height: 100%" class="border-right">
          <el-menu
            :default-active="slideIndex"
            text-color="#000"
            @select="slideSelect"
            active-text-color="#ffd04b"
          >
            <el-menu-item
              :index="index | numtoString"
              v-for="(item, index) in slideMenu"
              :key="index"
            >
              <i :class="item.icon"></i>
              <span slot="title">{{ item.name }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main
          style="padding-bottom: 60px; text-align: left; line-height: 0"
          class="position-relative"
          v-loading="loading"
        >
          <div
            class="border-bottom bg-white mb-3"
            style="padding: 20px; margin: -20px"
            v-if="bread.length > 0"
          >
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item
                v-for="(item, index) in bread"
                :key="index"
                :to="item.path"
                >{{ item.title }}</el-breadcrumb-item
              >
            </el-breadcrumb>
          </div>

          <!-- 主内容 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import numtoString from "@/common/mixins/numtoString.js";
import { mapState } from "vuex";
export default {
  mixins: [numtoString],
  provide() {
    return {
      layout: this,
    };
  },
  data() {
    return {
      activeIndex: "0",
      // navBar: [],
      bread: [],
      loading: false,
    };
  },
  created() {
    this.activeIndex = this.$conf.activeIndex;
    // this.navBar = this.$conf.navBar;
    console.log(this.navBar);
    //初始化路由
    this.getRouterBread();

    //初始化选中菜单
    this.__init();
  },

  methods: {
    //显示loading
    showLoading() {
      this.loading = true;
    },
    hideLoading() {
      this.loading = false;
    },
    __init() {
      let r = localStorage.getItem("navActive");
      if (r) {
        r = JSON.parse(r);
        // console.log(r);
        this.activeIndex = r.top;
        this.slideIndex = r.left;
      }
    },
    //获取面包屑导航
    getRouterBread() {
      let b = this.$route.matched.filter((v) => v.name);
      let arr = [];
      console.log(this.$route);
      b.forEach((v, k) => {
        if (v.name === "layout" || v.name === "index") return;
        arr.push({
          name: v.name,
          path: v.path,
          title: v.meta.title,
        });
      });
      if (arr.length > 0) {
        arr.unshift({
          name: "index",
          path: "/index",
          title: "后台首页",
        });
      }
      this.bread = arr;
      // console.log(this.$route.matched)
    },

    //点击header
    handleSelect(key, keyPath) {
      if (key === "6-2") {
        this.logout();
        return;
      }
      this.activeIndex = key;
      //默认跳转到当前激活的哪一个
      this.slideIndex = "0";
      if (this.slideMenu) {
        let name = this.slideMenu[this.slideIndex].pathname;
        this.$router.push({
          name: name,
        });
      }
    },
    //点击侧边
    slideSelect(key, keyPath) {
      this.slideIndex = key;
      //跳转到主页面
      let name = this.slideMenu[key].pathname;
      this.$router.push({
        name: name,
      });
    },

    //退出登录
    logout() {
      this.axios
        .post(
          "/admin/logout",
          {},
          {
            token: true,
          }
        )
        .then((res) => {
          this.$message("退出成功!");
          //清除用户信息

          this.$store.commit("logout");
          //跳转到登录页
          this.$router.push("/login");
        })
        .catch((err) => {
          this.$store.commit("logout");
          //跳转到登录页
          this.$router.push("/login");
        });
    },
  },
  watch: {
    $route(to, from) {
      localStorage.setItem(
        "navActive",
        JSON.stringify({
          top: this.activeIndex,
          left: this.slideIndex,
        })
      );
      this.getRouterBread();
    },
  },
  computed: {
    ...mapState({
      info: (state) => state.info.info,
      token: (state) => state.info.token,
      navBar: (state) => state.rule.navBar,
    }),
    slideMenu() {
      let item = this.navBar[this.activeIndex];
      return item ? item.subMenu : [];
    },
    slideIndex: {
      get() {
        let item = this.navBar[this.activeIndex];
        return item ? item.subActive : "0";
      },
      set(val) {
        let item = this.navBar[this.activeIndex];
        if (item) {
          item.subActive = val;
        }
      },
      // return this.navBar[this.activeIndex].subActive || '0'
    },
  },
  // filters:{
  // 	numtoString(val){
  // 		return val.toString()
  // 	}
  // }
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: 12px;
}

/* 滚动槽 */
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.5);
}

::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(255, 0, 0, 0.4);
}
</style>
