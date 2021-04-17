<template>
  <div>
    <el-dialog
      title="商品规格"
      :visible.sync="dialogVisible"
      width="80%"
      height="80%"
    >
      <div>
        <el-container
          class="position-relative"
          style="height: 70vh; margin: -30px -20px"
        >
          <el-header
            class="d-flex position-absolute bg-white"
            style="top: 0; bottom: 0; left: 200px; right: 0"
          >
            <span
              class="ml-4 bg-success border-top border-bottom rounded"
              style="height: 40px; width: 80px; line-height: 40px"
              @click="cancelAll"
              >{{ isCheckAll ? "取消全选" : "全选" }}</span
            >
          </el-header>
          <el-container>
            <el-aside
              width="220px"
              class="bg-white"
              style="top: 0; bottom: 0; left: 0; right: 0"
            >
              <ul
                class="list-group"
                style="line-height: 1"
                v-for="(item, index) in sku_card"
                :key="index"
              >
                <li
                  class="list-group-item list-group-item-action"
                  style="line-height: 1; border: 0"
                  aria-current="true"
                  :class="
                    index === activeIndex
                      ? 'border border-success text-success'
                      : ''
                  "
                  @click="listIndex(index)"
                >
                  {{ item.name }}
                </li>
              </ul>
            </el-aside>
            <el-main width="220px" class="bg-white">
              <div
                class="d-flex align-items-center"
                style="line-height: 1; margin-top: 40px"
              >
                <span
                  class="ml-4 border px-4 py-2 rounded"
                  size="mini"
                  v-for="(item, index) in getSkuList"
                  :key="index"
                  :class="item.isCheck ? 'border-success' : ''"
                  @click="choose(item)"
                  style="cursor: pointer"
                  >{{ item.name }}</span
                >
              </div>
            </el-main>
          </el-container>
        </el-container>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click.stop.native="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "",
  props: {},
  data() {
    return {
      dialogVisible: false,
      editModel: false,
      activeIndex: 0,

      chooseList: [],
      callback: false,
    };
  },
  created() {
    console.log(this.sku_card);
  },
  computed: {
    ...mapState({
      sku_card: (state) => state.goodsCreate.form.sku_card,
    }),

    getSkuList() {
      return this.sku_card[this.activeIndex].list;
    },

    isCheckAll() {
      return this.getSkuList.every((v) => {
        return v.isCheck === true;
      });
    },
  },

  beforeMount() {},

  mounted() {},

  methods: {
    //选择index
    listIndex(val) {
      this.unchoose();
      this.activeIndex = val;
    },

    //选中index
    choose(item) {
      //创建一个数组存储选中
      if (!item.isCheck) {
        item.isCheck = true;
        this.chooseList.push({
          id: item.id,
          name: item.name,
          isCheck: true,
          color: "",
          image: "",
        });
        return;
      }
      //清除chooseList的数据
      let i = this.chooseList.findIndex((v) => v.id === item.id);
      if (i === -1) return;
      this.chooseList.splice(i, 1);
      item.isCheck = false;
    },

    //取消全选
    cancelAll() {
      if (this.chooseList.length > 0) {
        this.unchoose();
        return;
      }
      //全部选择
      this.getSkuList.forEach((v) => {
        v.isCheck = true;
        this.chooseList.push(v);
      });
    },

    unchoose() {
      //让选中清空
      this.chooseList.forEach((item) => {
        this.getSkuList.forEach((v) => {
          if (v.id === item.id) {
            v.isCheck = false;
          }
        });
      });
      this.chooseList = [];
    },
    show(callback) {
      this.unchoose();
      this.callback = callback;
      this.dialogVisible = true;
    },
    confirm() {
      if (typeof this.callback !== "function") return;
      let item = this.sku_card[this.activeIndex];
      console.log(item);
      this.callback({
        name: item.name,
        type: item.type,
        list: this.chooseList,
      });
      this.hide();
    },
    hide() {
      this.dialogVisible = false;
    },
  },

  watch: {},
};
</script>
<style scoped>
.el-header {
  background: #e9eef3;
}
</style>