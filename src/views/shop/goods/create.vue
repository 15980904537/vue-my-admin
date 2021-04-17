<template>
  <div>
    <router-link :to="{ name: 'shop_goods_list' }">
      <el-button
        icon="el-icon-arrow-left"
        size="mini"
        class="position-absolute"
        style="top: 14px; left: 170px"
        >回到商品列表</el-button
      >
    </router-link>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基础设置">
        <base-set></base-set>
      </el-tab-pane>

      <el-tab-pane label="商品规格">
        <el-form ref="form" label-width="80px">
          <el-form-item label="商品规格" size="mini">
            <el-radio-group
              :value="sku_type"
              @input="Model('sku_type', $event)"
            >
              <el-radio-button :label="0">统一规格</el-radio-button>
              <el-radio-button :label="1">多规格</el-radio-button>
            </el-radio-group>
          </el-form-item>

          <template v-if="sku_type === 0">
            <single-rule></single-rule>
          </template>
          <template v-else>
            <el-form ref="form" label-width="80px" v-model="form">
              <el-form-item label="添加规格" size="mini">
                <sku-card
                  v-for="(item, index) in form.sku_card"
                  :key="index"
                  :item="item"
                  :index="index"
                ></sku-card>
                <el-button type="success" class="mt-2" @click="addSkuCard"
                  >添加规格</el-button
                >
              </el-form-item>
            </el-form>

            <!-- <sku-card></sku-card> -->
            <el-form ref="form" label-width="80px">
              <el-form-item label="批量设置" size="mini">
                <template v-if="!updateAllStatus">
                  <el-button
                    type="text"
                    v-for="(itemUpdate, indexUpdate) in updateAll"
                    :key="indexUpdate"
                    @click="changeUpdate(itemUpdate)"
                    >{{ itemUpdate.name }}</el-button
                  >
                </template>

                <div class="d-flex" v-else>
                  <el-input
                    type="number"
                    v-model="updateValue"
                    :placeholder="placeholderValue"
                    style="width: 130px; margin-right: 10px"
                  ></el-input>
                  <el-button type="success" @click="bindUpdateAll"
                    >设置</el-button
                  >
                  <el-button type="text" @click="cancelUpdateAll"
                    >取消</el-button
                  >
                </div>
              </el-form-item>
              <el-form-item label="规格设置" size="mini">
                <sku-table ref="table"></sku-table>
              </el-form-item>
            </el-form>
          </template>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="商品属性">
        <el-form label-width="80px">
          <el-form-item label="商品类型">
            <el-select
              :value="goodsTypeId"
              placeholder="请选择商品类型"
              @change="Model('goods_type_id', $event)"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <el-card class="box-card">
          <div slot="header" class="clearfix bg-secondary">
            <span>商品类型</span>
          </div>
          <el-form ref="form" label-width="80px">
            <el-form-item label="输入框">
              <el-input
                :value="goodsAttr.value1"
                @input="VModel('value1', $event)"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
            <el-form-item label="单选框">
              <el-radio
                border
                v-model="goodsAttr.single"
                label="区域一"
              ></el-radio>
            </el-form-item>
            <el-form-item label="多选框">
              <el-checkbox
                v-model="goodsAttr.all"
                label="区域一"
                border
              ></el-checkbox>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="媒体设置">
        <el-form label-width="80px">
          <el-form-item label="商品大图">
            <div class="d-flex flex-wrap">
              <div
                class="d-flex border align-items-center justify-content-center mr-2 mb-2 position-relative"
                style="width: 150px; height: 150px"
                v-for="(itemChoose, indexChoose) in chooseList"
                :key="indexChoose"
              >
                <img
                  :src="itemChoose.url"
                  alt=""
                  v-if="itemChoose.url"
                  style="width: 100%; height: 100%"
                  @click="chooseImage(indexChoose)"
                />
                <i class="el-icon-plus" style="font-size: 30px" v-else></i>

                <i
                  class="el-icon-delete position-absolute p-1"
                  style="
                    width: 20px;
                    height: 25px;
                    top: 0;
                    right: 0;
                    background: rgba(0, 0, 0, 0.7);
                    color: #fff;
                    z-index: 999;
                  "
                  @click="deleteImage(indexChoose)"
                ></i>
              </div>

              <div
                class="d-flex border align-items-center justify-content-center"
                style="width: 150px; height: 150px"
                @click="chooseImage(-1)"
                v-if="chooseList.length < 9"
              >
                <i class="el-icon-plus" style="font-size: 30px"></i>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import baseSet from "@/components/shop/base_set";
import singleRule from "@/components/shop/single_rule";
import skuCard from "@/components/shop/sku/sku_card";
import skuTable from "@/components/shop/sku/sku_table";
export default {
  name: "",
  props: [""],
  inject: ["app"],
  data() {
    return {
      options: [
        {
          value: "选项1",
        },
        {
          value: "选项2",
        },
        {
          value: "选项3",
        },
        {
          value: "选项4",
        },
        {
          value: "选项5",
        },
      ],
      activeName: 0,
      updateAll: [
        {
          name: "销售价",
          key: "pprice",
        },
        {
          name: "市场价",
          key: "oprice",
        },
        {
          name: "成本价",
          key: "cprice",
        },
        {
          name: "库存",
          key: "stock",
        },
        {
          name: "体积",
          key: "volumn",
        },
        {
          name: "重量",
          key: "weight",
        },
      ],
      updateAllStatus: false,
      updateValue: "",
      placeholderValue: "",
    };
  },

  components: {
    baseSet,
    singleRule,
    skuCard,
    skuTable,
  },

  computed: {
    ...mapState({
      sku_type: (state) => state.goodsCreate.sku_type,
      form: (state) => state.goodsCreate.form,
      chooseList: (state) => state.goodsCreate.chooseList,
      goodsTypeId: (state) => state.goodsCreate.goods_type_id,
      goodsAttr: (state) => state.goodsCreate.goods_attr,
    }),
  },
  created() {},
  beforeMount() {},

  mounted() {
    console.log(this.goodsAttr);
  },

  methods: {
    ...mapMutations(["getGoodsStatus", "addSkuCard", "VModelGoodAttrs"]),
    Model(key, value) {
      this.getGoodsStatus({ key, value });
    },
    handleClick(tab, event) {
      this.activeName = tab.index;
    },

    //批量设置
    changeUpdate(item) {
      this.updateAllStatus = item.key;
      this.placeholderValue = item.name;
    },
    //取消批量设置
    cancelUpdateAll() {
      this.updateAllStatus = false;
      this.updateValue = "";
    },

    //批量设置绑定到表格中
    bindUpdateAll() {
      this.$refs["table"].list.forEach((item) => {
        item[this.updateAllStatus] = this.updateValue;
      });
      this.cancelUpdateAll();
    },

    //媒体设置：选择商品
    chooseImage(val) {
      let max = 9;
      let count = max - this.chooseList.length;
      this.app.chooseImage(
        (res) => {
          if (val === -1) {
            //增加图片
            this.Model("chooseList", [...res, ...this.chooseList]);
          } else {
            this.chooseList[val] = res[0];
            this.Model("chooseList", [...this.chooseList]);
          }
        },
        val === -1 ? count : 1
      );
    },
    //删除图片
    deleteImage(val) {
      this.chooseList.splice(val, 1);
      this.Model("chooseList", [...this.chooseList]);
    },

    VModel(key, value) {
      this.VModelGoodAttrs({ key, value });
    },
  },

  watch: {},
};
</script>
<style >
</style>