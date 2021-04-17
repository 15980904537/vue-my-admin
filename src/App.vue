<template>
  <div id="app">
    <router-view></router-view>
    <image-dialog ref="imageDialog"></image-dialog>
    <skus-dialog ref="skusDialog"></skus-dialog>
  </div>
</template>

<script>
import imageDialog from "./components/common/image_dialog";
import skusDialog from "./components/skus/skus_dialog";
export default {
  provide() {
    return {
      app: this,
    };
  },
  name: "app",
  data() {
    return {};
  },
  created() {
    //初始化用户信息
    this.$store.commit("initState");
    this.$store.commit("initRule");
  },
  components: { imageDialog, skusDialog },
  methods: {
    //选择图片
    chooseImage(callback, max) {
      this.$refs.imageDialog.show(callback, max);
    },
    //选择规格
    choosesku(callback) {
      this.$refs.skusDialog.show(callback);
    },
  },
  computed: {},
};
</script>

<style>
</style>
