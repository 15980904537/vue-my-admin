<template>
  <div>
    <div
      class="px-3 mr-3 py-1 position-relative d-flex align-items-center border flex-row"
    >
      <div class="mr-2" v-if="type !== 0">
        <!-- 图片 -->

        <span class="btn btn-light" v-if="type === 2" @click="chooseImage">
          <i class="el-icon-plus" v-if="!image"></i>
          <img
            :src="image"
            alt=""
            v-if="image"
            style="width: 40px; height: 40px; cursor: pointer"
          />
        </span>

        <!-- 颜色 -->
        <el-color-picker
          size="mini"
          class="mt-2"
          :value="item.color"
          @change="onColorChange"
          v-if="type === 1"
        ></el-color-picker>
      </div>
      <input
        :value="item.name"
        @change="inputChange"
        class="border-0"
        style="width: 100px"
      />
      <span
        class="el-icon-circle-close position-absolute"
        style="right: -5px; top: -5px"
        @click="delSkuValue(cardIndex, listIndex)"
      ></span>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "",
  inject: ["app"],
  props: {
    type: {
      type: Number,
    },
    item: Object,
    cardIndex: Number,
    listIndex: Number,
  },
  data() {
    return {
      image: false,
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},
  created() {},
  methods: {
    ...mapMutations(["delSkuValue", "updateSkuValue"]),
    inputChange(e) {
      this.update("name", e.target.value);
    },
    update(key, value) {
      this.updateSkuValue({
        cardIndex: this.cardIndex,
        valueIndex: this.listIndex,
        key: key,
        value: value,
      });
    },
    chooseImage() {
      this.app.chooseImage((res) => {
        this.image = res[0].url;
        this.update("image", this.image);
      });
    },
    onColorChange(e) {
      this.update("color", e);
      console.log(e);
    },
  },

  watch: {},
};
</script>
<style lang='' scoped>
</style>