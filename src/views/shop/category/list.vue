<template>
  <div
    class="bg-white px-3"
    style="
      margin: -20px;
      margin-top: -1rem;
      margin-bottom: 0 !important;
      overflow: hidden;
    "
  >
    <div class="border-top border-bottom mt-3 py-2">
      <el-button
        type="success"
        size="mini"
        class="py-2 mx-2"
        @click="create_category"
        >创建顶级分类</el-button
      >
    </div>

    <div class="mt-4">
      <el-tree
        :data="data"
        :props="defaultProps"
        @node-click="handleNodeClick"
        default-expand-all
        auto-expand-parent
        :expand-on-click-node="false"
        draggable
        @node-drop="dragEvent"
        @node-drag-end="nodeDragEnd"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <div>
            <el-input
              v-model="data.name"
              size="mini"
              v-if="data.edit"
            ></el-input>
            <span class="mx-2" v-else>{{ node.label }}</span>
          </div>

          <span>
            <el-button
              type="success"
              plain
              size="mini"
              @click="showOrHide(data)"
            >
              {{ data.status === 1 ? "显示" : "隐藏" }}
            </el-button>
            <el-button type="success" size="mini" @click="add(data)">
              增加
            </el-button>

            <el-button type="warning" size="mini" @click="editStatus(data)">
              {{ data.edit ? "完成" : "修改" }}
            </el-button>
            <el-button type="danger" size="mini" @click="remove(node, data)">
              删除
            </el-button>
          </span>
        </span>
      </el-tree>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  inject: ["layout"],
  props: [""],
  data() {
    return {
      data: [
        // {
        //   id: 9,
        //   label: "一级 3",
        //   status: 1,
        //   children: []
        // },
      ],
      defaultProps: {
        children: "child",
        label: "name",
      },
    };
  },

  components: {},

  created() {
    //初始化
    this.__init();
  },

  computed: {
    sortData() {
      let data = [];
      let sort = function sort(arr) {
        arr.forEach((item) => {
          data.push(item);
          if (item.child.length) {
            sort(item.child);
          }
        });
      };
      sort(this.data);
      data.map((item, index) => {
        return {
          id: item.id,
          order: index,
          category_id: item.category_id,
        };
      });
      return data;
    },
  },

  beforeMount() {},

  mounted() {},

  methods: {
    __init() {
      this.layout.showLoading();
      this.axios
        .get("/admin/category", {
          token: true,
        })
        .then((res) => {
          let dataAll = res.data.data;
          const receiveData = (arr) => {
            arr.forEach((item) => {
              item.edit = false;
              if (item.child.length > 0) {
                receiveData(item.child);
              }
            });
            return arr;
          };
          this.data = receiveData(dataAll);
          console.log(data);
          this.layout.hideLoading();
        })
        .catch((err) => {
          this.layout.hideLoading();
        });
    },

    handleNodeClick(data) {
      // console.log(data);
    },
    //显示和隐藏
    showOrHide(data) {
      data.status = data.status === 1 ? 0 : 1;
      let msg = data.status === 1 ? "显示" : "隐藏";
      this.axios
        .post(
          "/admin/category/" + data.id + "/update_status",
          {
            status: data.status,
          },
          { token: true }
        )
        .then((res) => {
          this.$message({
            message: msg + "成功",
            type: "success",
          });
          console.log(res);
        });
    },
    //编辑
    editStatus(data) {
      if (!data.edit) {
        return (data.edit = true);
      }
      if (data.name === "") {
        return this.$message({
          message: "内容不能为空!",
          type: "error",
        });
      }
      this.layout.showLoading();
      this.axios
        .post(
          "/admin/category/" + data.id,
          {
            status: data.status,
            name: data.name,
            category_id: data.category_id,
          },
          {
            token: true,
          }
        )
        .then((res) => {
          data.edit = false;
          this.$message({
            message: "修改完成",
            type: "success",
          });
          this.layout.hideLoading();
        })
        .catch(() => {
          this.layout.hideLoading();
        });
    },
    //删除
    remove(node, data) {
      console.log(node);
      this.$confirm("您是否要删除该层级?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.layout.showLoading();
        this.axios
          .delete("/admin/category/" + data.id, {
            token: true,
          })
          .then((res) => {
            this.__init();
            this.layout.hideLoading();
          })
          .catch((err) => {
            this.layout.hideLoading();
          });
        // let parent = node.parent;
        // let dataArr = parent.data.children || parent.data;
        // let index = dataArr.findIndex((v) => v.id === data.id);
        // dataArr.splice(index, 1);
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      });
    },
    //增加
    add(data) {
      this.axios
        .post(
          "/admin/category",
          {
            status: 0,
            category_id: data.id,
            name: "新分类",
          },
          { token: true }
        )
        .then((res) => {
          let addData = res.data.data;
          addData.edit = true;
          addData.child = [];
          data.child.push(addData);
        })
        .catch(() => {});
    },
    //创建顶级分类
    create_category() {
      this.$prompt("创建顶级分类", "提示", {
        confirmButtonText: "创建",
        cancelButtonText: "取消",
        inputValidator: function (val) {
          if (val === "" || val === null) {
            return "内容不能为空!";
          }
          return true;
        },
      }).then(({ value }) => {
        this.axios
          .post(
            "/admin/category",
            {
              status: 0,
              category_id: 0,
              name: value,
            },
            { token: true }
          )
          .then((res) => {
            this.__init();
            this.$message({
              type: "success",
              message: "创建成功!",
            });
          });
      });
    },
    //拖拽结束
    nodeDragEnd(...options) {
      //被拖拽节点对应的数据
      let item = options[0].data;

      //结束拖拽时最后进入的节点数据
      let obj = options[1].data;
      if (obj) {
        if (options[2] === "before" || options[2] === "after") {
          item.category_id = obj.category_id;
        } else {
          item.category_id = obj.id;
        }
      }
    },

    //拖拽
    dragEvent(...options) {
      // console.log(options);
      // console.log(this.sortData);
      this.layout.showLoading();
      this.axios
        .post(
          "/admin/category/sort",
          { sortdata: JSON.stringify(this.sortData) },
          { token: true }
        )
        .then(() => {
          this.__init();
          this.layout.hideLoading();
        })
        .catch(() => {
          this.layout.hideLoading();
        });
    },
  },

  watch: {},
};
</script>
<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.el-tree-node__content {
  padding: 20px 0;
}
</style>