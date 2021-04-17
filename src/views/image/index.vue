<template>
  <div>
    <el-container
      class="position-absolute"
      style="top: 60px; bottom: 0; left: 0; right: 0"
    >
      <el-header class="d-flex">
        <div class="d-flex align-items-center mr-auto">
          <el-select
            v-model="form.order"
            placeholder="请选择图片排序方式"
            style="width: 200px"
            class="mr-3"
          >
            <el-option label="升序" value="shengxu"> </el-option>
            <el-option label="降序" value="jiangxu"> </el-option>
          </el-select>

          <el-input
            v-model="form.keyword"
            placeholder="请输入图片名称"
            style="width: 200px"
            class="mr-3"
          ></el-input>

          <el-button
            type="success"
            style="width: 100px"
            @click.stop.native="search()"
            >搜索</el-button
          >
        </div>
        <div class="d-flex align-items-center">
          <el-button
            type="success"
            @click.stop.native="cancelAll()"
            v-show="chooseList.length > 0"
            >取消全选</el-button
          >
          <el-button
            type="success"
            @click.stop.native="delImage({ all: true })"
            v-show="chooseList.length > 0"
            >批量删除</el-button
          >
          <el-button type="success" @click.stop.native="showModel(false)"
            >创建相册</el-button
          >
          <el-button type="warning" @click.stop.native="uploadPic"
            >上传图片</el-button
          >
        </div>
      </el-header>
      <el-container>
        <el-aside
          width="220px"
          class="position-absolute bg-white border-right"
          style="top: 60px; bottom: 80px; left: 0; right: 0"
        >
          <ul
            class="list-group"
            style="line-height: 1"
            v-for="(item, index) in albumn"
            :key="index"
          >
            <albumn-item
              :item="item"
              :index="index"
              :albumnActive="albumnActive"
              @del="albumnDel"
              @change="albumnChange"
              @showModel="showModel"
            ></albumn-item>
          </ul>
        </el-aside>
        <el-main
          width="220px"
          class="position-absolute"
          style="top: 60px; bottom: 80px; left: 220px; right: 0"
        >
          <el-row :gutter="10" style="line-height: 0">
            <el-col
              :span="24"
              :xs="24"
              :sm="8"
              :md="6"
              :lg="4"
              v-for="(item, index) in imageList"
              :key="index"
            >
              <el-card
                :body-style="{ padding: '0px' }"
                class="mb-3 position-relative"
              >
                <div :class="item.isChecked ? 'border border-danger' : ''">
                  <span
                    class="badge badge-danger position-absolute"
                    style="right: 0; top: 0"
                    v-show="item.isChecked"
                    >{{ item.order }}</span
                  >
                  <img
                    :src="item.url"
                    class="image"
                    style="width: 100%; height: 130px"
                    @click.stop="chooseImage(item)"
                  />
                  <div
                    style="
                      background-color: rgba(0, 0, 0, 0.3);
                      padding: 14px;
                      margin-top: -30px;
                      position: absolute;
                      width: 100%;
                    "
                  >
                    <span class="text-white">{{ item.title }}</span>
                  </div>

                  <el-button-group class="py-2">
                    <el-button
                      icon="el-icon-view"
                      size="mini"
                      @click.stop.native="previewPic(index)"
                    ></el-button>
                    <el-button
                      icon="el-icon-edit"
                      size="mini"
                      @click.stop.native="editImage(item)"
                    ></el-button>
                    <el-button
                      icon="el-icon-delete"
                      size="mini"
                      @click.stop.native="delImage({ item })"
                    ></el-button>
                  </el-button-group>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
      <el-footer
        class="border-top d-flex align-items-center px-0 py-4"
        style="line-light: 0"
      >
        <div
          style="width: 220px; height: 100%; flex-shrink: 0"
          class="d-flex align-items-center justify-content-center"
        >
          <el-button-group>
            <el-button
              icon="el-icon-arrow-left"
              size="meduim"
              @click.stop.native="arriveAblumn1(albumnPage)"
              :disabled="albumnPage === 1"
              >上一页</el-button
            >
            <el-button
              size="meduim"
              @click.stop.native="arriveAblumn2(albumnPage)"
              :disabled="Math.ceil(totalCount / 8) === albumnPage"
              >下一页<i class="el-icon-arrow-right el-icon--right"></i
            ></el-button>
          </el-button-group>
        </div>
        <div style="flex: 1">
          <el-pagination
            style="line-height: 0; text-align: left"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </el-footer>
    </el-container>

    <el-dialog
      :title="modelIndex > -1 ? '修改相册' : '创建相册'"
      :visible.sync="editModel"
      width="30%"
      style="line-height: 0"
    >
      <el-form ref="form" :model="modelForm" label-width="80px">
        <el-form-item label="相册名称">
          <el-input
            v-model="modelForm.name"
            placeholder="请输入相册名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="数量">
          <el-input-number
            v-model="modelForm.order"
            :min="0"
            :max="10"
            label="描述文字"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editModel = false">取 消</el-button>
        <el-button type="primary" @click.stop.native="ablumnModel"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      title="上传图片"
      :visible.sync="upload"
      width="30%"
      style="line-height: 0"
      @close="__init()"
    >
      <el-upload
        class="upload-demo"
        drag
        action="/admin/image/upload"
        :headers="{ token: this.$store.state.info.token }"
        :data="{ image_class_id: getPicId }"
        name="img"
        :on-success="uploadSuccess"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </el-dialog>

    <el-dialog :visible.sync="previewModel" width="40vw" top="3vh">
      <div style="margin: -60px -20px -30px -20px">
        <img :src="previewImage" alt="" style="width: 100%" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import albumnItem from "@/components/image/albumn-item";
export default {
  components: {
    albumnItem,
  },
  name: "",
  inject: ["layout"],
  props: [""],
  data() {
    return {
      currentPage: 1,
      form: {
        order: [],
        keyword: "",
      },
      editModel: false,
      albumnActive: 0,
      albumn: [],
      modelForm: {
        name: "",
        order: 0,
      },
      modelIndex: -1,
      upload: false,
      imageList: [],
      chooseList: [],
      previewModel: false,
      previewImage: "",
      albumnPage: 1,
      pageSizes: [10, 100, 200],
      pageSize: 10,
      total: 400,
      totalCount: 0,
    };
  },
  created() {
    //初始化数据
    this.__init();
  },
  computed: {
    getPicId() {
      let item = this.albumn[this.albumnActive];
      debugger;
      console.log(item);
      if (item) {
        return item.id;
      }
    },

    getPicList() {
      return `/admin/imageclass/${this.getPicId}/image/${this.currentPage}?limit=${this.pageSize}&order=${this.form.order}&keyword=${this.form.keyword}`;
    },
  },

  beforeMount() {},

  mounted() {},

  methods: {
    //获取相册信息
    getPicInfo() {
      this.layout.showLoading();
      //右侧相册列表
      this.axios
        .get(this.getPicList, {
          token: true,
        })
        .then((res) => {
          let result = res.data.data;
          this.total = result.totalCount;
          this.imageList = result.list.map((item) => {
            return {
              id: item.id,
              url: item.url,
              title: item.title,
              isChecked: false,
              order: item.order,
            };
          });
          this.layout.hideLoading();
        })
        .catch((err) => {
          this.layout.hideLoading();
        });
    },
    __init() {
      //左侧相册列表
      this.layout.showLoading();
      this.axios
        .get("/admin/imageclass/" + this.albumnPage + "?limit=8", {
          token: true,
        })
        .then((res) => {
          console.log(res);
          this.albumn = res.data.data.list;
          this.totalCount = res.data.data.totalCount;
          this.getPicInfo();
        });
    },
    //切换相册
    albumnChange(index) {
      this.albumnActive = index;

      this.getPicInfo();
      this.layout.hideLoading();
    },
    //删除相册
    albumnDel(item, index) {
      this.$alert("您确认要删除", "", {
        confirmButtonText: "确定",
        callback: () => {
          this.layout.showLoading();
          this.axios
            .delete("/admin/imageclass/" + item.id, {
              token: true,
            })
            .then((res) => {
              this.__init();
              this.layout.hideLoading();
            })
            .catch((err) => {
              this.layout.hideLoading();
            });
        },
      });
    },
    //修改相册｜创建相册
    showModel(obj) {
      if (obj) {
        //修改
        let { item, index } = obj;

        this.modelForm.name = item.name;
        this.modelForm.order = item.images_count;
        //判断是修改相册还是创建相册
        this.modelIndex = index;
        return (this.editModel = true);
      }
      this.modelForm.name = "";
      this.modelForm.order = 0;
      this.modelIndex = -1;
      this.editModel = true;
    },
    //关闭模态框
    ablumnModel() {
      if (this.modelIndex > -1) {
        this.ablumnEdit();
        return (this.editModel = false);
      }
      if (this.modelForm.name === "" && this.modelForm.count === 0) {
        this.$message.error("内容不能为空哦!");
        return;
      }
      this.layout.showLoading();
      this.axios
        .post("/admin/imageclass", this.modelForm, { token: true })
        .then((res) => {
          let result = res.data.data;
          this.__init();
          this.layout.hideLoading();
        })
        .catch((err) => {
          this.layout.hideLoading();
        });

      this.editModel = false;
    },
    //修改相册
    ablumnEdit() {
      this.layout.showLoading();
      this.axios
        .post("/admin/imageclass/" + this.getPicId, this.modelForm, {
          token: true,
        })
        .then((res) => {
          //去刷新页面
          this.__init();

          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.layout.hideLoading();
        })
        .catch((err) => {
          this.layout.hideLoading();
        });
      // this.albumn[this.modelIndex].name = this.modelForm.name;
      // this.albumn[this.modelIndex].count = this.modelForm.count;
    },

    //上传图片
    uploadPic() {
      this.upload = true;
    },

    //预览图片
    previewPic(index) {
      this.previewImage = this.imageList[index].url;
      this.previewModel = true;
    },
    //编辑图片信息
    editImage(item) {
      this.$prompt("请输入新名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /\w+/,
        inputErrorMessage: "输入内容不能为空!",
      })
        .then(({ value }) => {
          this.layout.showLoading();
          this.axios
            .post("/admin/image/" + item.id, { name: value }, { token: true })
            .then((res) => {
              console.log(res);
              this.__init();
              this.$message({
                message: "修改成功！",
              });
              this.layout.hideLoading();
            })
            .catch((err) => {
              this.layout.hideLoading();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },

    //删除图片
    delImage(obj) {
      this.$confirm(
        obj.all ? "你确认要删除选中图片吗?" : "你确认要删除这张图片吗?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          if (obj.all) {
            //让选中图片清空
            // let list = this.imageList.filter((v) => {
            //   return !this.chooseList.some((item) => {
            //     return v.id === item.id;
            //   });
            // });
            // this.chooseList = [];
            // this.imageList = list;
            let ids = this.chooseList.map((item) => {
              return item.id;
            });
            this.layout.showLoading();
            this.axios
              .post(
                "/admin/image/delete_all",
                { ids: ids },
                {
                  token: true,
                }
              )
              .then((res) => {
                this.__init();
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.layout.hideLoading();
              })
              .catch((err) => {
                this.layout.hideLoading();
              });
          } else {
            this.layout.showLoading();
            this.axios
              .delete("/admin/image/" + obj.item.id, { token: true })
              .then((res) => {
                this.__init();
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.layout.hideLoading();
              })
              .catch((err) => {
                this.layout.hideLoading();
              });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    //选中图片
    chooseImage(item) {
      //创建一个数组存储选中
      if (!item.isChecked) {
        item.isChecked = true;
        this.chooseList.push({
          id: item.id,
          title: item.title,
          url: item.url,
        });

        item.order = this.chooseList.length;
        return;
      }

      //清除chooseList的数据
      let i = this.chooseList.findIndex((v) => v.id === item.id);

      if (i === -1) return;

      //如果未选中的图片在中间
      if (i !== this.chooseList.lenght) {
        for (let j = 0; j < this.imageList.length; j++) {
          if (this.imageList[j].order > i) {
            this.imageList[j].order--;
          }
        }
      }
      this.chooseList.splice(i, 1);

      item.isChecked = false;
    },

    //取消全选
    cancelAll() {
      //让选中图片清空
      this.chooseList.forEach((item) => {
        this.imageList.forEach((v) => {
          if (v.id === item.id) {
            v.isChecked = false;
          }
        });
      });
      this.chooseList = [];
      this.imageList = list;
    },

    handleSizeChange(val) {
      this.pageSize = val;
      this.getPicInfo();
    },
    handleCurrentChange(val) {
      console.log(val);
      this.currentPage = val;
      this.getPicInfo();
    },

    //左侧 上一页  下一页
    arriveAblumn1(val) {
      this.albumnPage--;
      this.__init();
    },
    arriveAblumn2(val) {
      this.albumnPage++;
      this.__init();
    },

    //上传图片成功
    uploadSuccess(response, file, fileList) {
      this.$message({
        message: "上传成功!",
        type: "success",
      });
    },

    //搜索
    search() {
      this.getPicInfo();
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