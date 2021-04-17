<template>
  <div>
    <div class="card mb-3">
      <div class="d-flex card-header align-items-center">
        规格项：
        <el-input
          size="mini"
          style="width: 200px"
          class="mr-3"
          :value="item.name"
          @input="VModel('name', index, $event)"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="chooseSkus(item)"
          ></el-button>
        </el-input>
        <el-radio-group
          :value="item.type"
          @input="VModel('type', index, $event)"
          size="mini"
          class="ml-2"
        >
          <el-radio :label="0">无</el-radio>
          <el-radio :label="1">颜色</el-radio>
          <el-radio :label="2">图片</el-radio>
        </el-radio-group>

        <el-button
          icon="el-icon-top"
          size="mini"
          class="ml-auto"
          @click="move({ action: 'moveUp', index })"
          :disabled="index === 0"
        ></el-button>
        <el-button
          icon="el-icon-bottom"
          size="mini"
          @click="move({ action: 'moveDown', index })"
          :disabled="index + 1 === total"
        ></el-button>
        <el-button type="text" @click="delSkuCard(index)">删除</el-button>
      </div>
      <div class="card-body">
        <!-- 规格属性列表 -->

        <div class="d-flex align-items-center mb-3 flex-wrap round flex-row">
          <sku-card-children
            :type="item.type"
            :item="listItem"
            :cardIndex="index"
            :listIndex="listIndex"
            v-for="(listItem, listIndex) in list"
            :key="listIndex"
            v-dragging="{
              item: listItem,
              list: list,
              group: `skuItem${index}`,
            }"
          ></sku-card-children>
        </div>
        <!-- 增加规格属性 -->
        <el-button
          icon="el-icon-plus"
          type="text"
          @click.stop.native="addSkuValue(index)"
          >增加规格值</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import skuCardChildren from "../sku/sku_card_children";
export default {
  name: "",
  inject: ["app"],
  props: {
    item: Object,
    index: Number,
  },
  data() {
    return {
      list: this.item.list,
    };
  },

  components: {
    skuCardChildren,
  },

  computed: {
    ...mapState({
      form: (state) => state.goodsCreate.form,
    }),

    total() {
      return this.form.sku_card.length;
    },
  },

  beforeMount() {},

  mounted() {
    this.$watch("item.list", (newVal) => {
      this.list = newVal;
    });

    this.$dragging.$on("dragend", (e) => {
      this.sortSkuValue({
        index: this.index,
        value: this.list,
      });
      console.log(e);
    });
  },

  created() {},
  methods: {
    ...mapMutations([
      "delSkuCard",
      "VModelSkuCard",
      "addSkuValue",
      "sortSkuValue",
    ]),
    ...mapActions(["move"]),
    VModel(key, index, value) {
      this.VModelSkuCard({ key, index, value });
    },
    chooseSkus() {
      this.app.choosesku((res) => {
        console.log(res);
        this.VModel("name", this.index, res.name);
        this.VModel("type", this.index, res.type);
        this.VModel("list", this.index, res.list);
        this.list = res.list;
      });
    },
  },

  watch: {},
};
</script>
<style lang='' scoped>
</style>