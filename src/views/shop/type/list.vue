<template>
  <div>
    <el-row style="line-height: 0">
      <el-col :span="24">
        <advance-search
          :form="form"
          placeholder="要搜索的商品名称"
          ref="buttonSearch"
          :showRight="false"
        >
          <template #left>
            <div class="d-flex align-items-center mr-auto">
              <el-button
                type="success"
                size="medium"
                class="mr-3"
                @click="addType(false)"
                >添加类型</el-button
              >

              <el-button
                type="danger"
                size="medium"
                @click.stop.native="deleteAll"
                >批量删除</el-button
              >
            </div>
          </template>
        </advance-search>
        <el-table
          border
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%; margin-bottom: 100px"
          @selection-change="handleSelectionChange"
          class="mt-2 bg-light"
        >
          <el-table-column type="selection" width="55" align="center">
          </el-table-column>
          <el-table-column
            label="类型名称"
            width="120"
            prop="name"
            align="center"
          >
          </el-table-column>
          <el-table-column label="属性标签" width="350">
            <template slot-scope="scope">
              {{ scope.row.value_list | formatValue }}
            </template>
          </el-table-column>
          <el-table-column
            prop="order"
            label="属性排序"
            show-overflow-tooltip
            align="center"
          >
          </el-table-column>

          <el-table-column label="状态" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button
                type="success"
                size="mini"
                plain
                @click.stop.native="changeStatus(scope.$index)"
                >{{ scope.row.status === 1 ? "启动" : "禁用" }}</el-button
              >
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="135"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-button-group>
                <el-button
                  type="success"
                  size="mini"
                  plain
                  @click="addType(scope)"
                  >修改</el-button
                >
                <el-button
                  type="danger"
                  size="mini"
                  plain
                  @click.stop.native="deleteList(scope.$index)"
                  >删除</el-button
                >
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>

        <el-footer
          class="border-top d-flex align-items-center px-0 py-4 position-fixed bg-white"
          style="line-light: 0; bottom: 0; left: 200px; right: 0; z-index: 999"
        >
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
        </el-footer>
      </el-col>
    </el-row>

    <!-- 添加商品规格 -->
    <el-dialog title="添加商品类型" :visible.sync="add" width="90%" top="5vh">
      <el-form ref="ruleForm" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="规格名称" prop="name">
          <el-input
            v-model="form.name"
            placeholder="类型名称"
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item label="属性排序">
          <el-input-number
            v-model="form.order"
            @change="handleChange"
            size="mini"
            :min="1"
            :max="10"
            label="描述文字"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="是否开启">
          <el-radio-group v-model="form.status">
            <el-radio :label="1" border size="mini">启动</el-radio>
            <el-radio :label="2" border size="mini">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="关联规格">
          <div class="d-flex align-items-center" style="display: block-inline">
            <div
              class="py-1 px-3 d-flex align-items-center border mr-2 active justify-content-center"
              style="width: 100px; height: 40px"
            >
              <span class="mr-2">颜色</span>
              <i class="el-icon-delete"></i>
            </div>
            <div
              class="py-1 px-3 d-flex align-items-center border mr-2 justify-content-center"
              style="width: 50px; height: 40px"
            >
              <i class="el-icon-plus"></i>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="属性列表" prop="value">
          <el-table :data="value_list" style="width: 100%">
            <el-table-column label="排序" width="100">
              <template slot-scope="scope">
                <el-input
                  type="number"
                  v-model="scope.row.order"
                  size="mini"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column label="属性名称" width="200">
              <template slot-scope="scope">
                <el-input v-model="scope.row.name" size="mini"></el-input>
              </template>
            </el-table-column>

            <el-table-column label="所属类型">
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row.type"
                  placeholder="请选择"
                  size="mini"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="是否显示" width="100">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.isCheck"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                >
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column label="属性值" width="350">
              <template slot-scope="scope">
                <div v-if="!scope.row.edit">
                  {{ scope.row.value }}
                </div>
                <el-input
                  type="textarea"
                  v-model="scope.row.value"
                  rows="3"
                  placeholder="一行一个规格值,多个规则项用换行来输入"
                  v-else
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="mini"
                  @click.stop.native="scope.row.edit = true"
                  v-if="!scope.row.edit"
                  >编辑属性值</el-button
                >
                <el-button
                  type="text"
                  size="mini"
                  @click.stop.native="scope.row.edit = false"
                  v-else
                  >完成</el-button
                >
                <el-button type="text" size="mini">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button
            type="text"
            icon="el-icon-plus"
            size="mini"
            @click="addAttr"
            >添加一个属性</el-button
          >
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="add = false">取 消</el-button>
        <el-button type="primary" @click="submit('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import advanceSearch from "@/components/common/advance-search";
export default {
  components: {
    advanceSearch,
  },
  data() {
    return {
      activeIndex: -1,
      add: false,
      pageSizes: [10, 100, 200],
      pageSize: 10,
      total: 400,
      currentPage: 1,
      tableData: [],
      multipleSelection: [],
      options: [
        {
          value: "input",
          label: "输入框",
        },
        {
          value: "radio",
          label: "单选框",
        },
        {
          value: "checkbox",
          label: "多选框",
        },
      ],
      form: {
        name: "",
        order: 3,
        status: 1,
        sku_list: [],
      },
      value_list: [
        {
          order: 50,
          name: "特性",
          type: "input",
          value: "黄色",
          isCheck: false,
          edit: true,
        },
        {
          order: 40,
          name: "电池",
          type: "radio",
          value: "红色",
          isCheck: false,
          edit: true,
        },
      ],
      rules: {
        name: [
          { required: true, message: "类型名称不能为空", trigger: "blur" },
        ],
      },
    };
  },
  computed: {},
  created() {
    this.__getData();
  },
  methods: {
    //生成数据
    __getData() {
      for (let i = 0; i < 2; i++) {
        this.tableData.push({
          id: i,
          name: "鞋子",
          order: 12,
          status: 1,
          sku_list: [
            {
              id: 1,
              name: "颜色",
            },
            {
              id: 2,
              name: "尺寸",
            },
          ],
          value_list: [
            {
              order: 50,
              name: "特性",
              type: "input",
              value: "",
            },
            {
              order: 50,
              name: "电池",
              type: "input",
              value: "",
            },
          ],
        });
      }
    },
    //添加商品类型
    addType(e) {
      if (!e) {
        //添加规格
        // 初始化表单
        this.form = {
          name: "",
          order: 3,
          status: 1,
          sku_list: [],
        };
        this.value_list = [];
        this.activeIndex = -1;
      } else {
        //修改规格
        this.form = { ...e.row };
        this.value_list = e.row.value_list;
        this.activeIndex = e.$index;
      }

      this.add = true;
    },
    //更新状态
    changeStatus(index) {
      this.tableData[index].status = this.tableData[index].status === 0 ? 1 : 0;
    },

    //计数
    handleChange(value) {},
    //删除一条数据
    deleteList(val) {
      this.$confirm("你确定要删除这条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.tableData.splice(val, 1);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    //提交表单
    submit(formName) {
      //验证属性列表
      let result = true;
      let msg = [];
      this.value_list.forEach((item, index) => {
        let no = index + 1;
        if (item.order === "") {
          result = result && false;
          msg.push(`第${no}行:排序不能为空`);
        }
        if (item.name === "") {
          result = result && false;
          msg.push(`第${no}行:属性名称不能为空`);
        }
        if (item.type !== "input" && item.value === "") {
          result = result && false;
          msg.push(`第${no}行:属性值不能为空`);
        }
      });
      if (!result) {
        return this.$notify.info({
          title: "提示",
          message: msg.join(","),
          type: "warning",
        });
      }

      //表单验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.form["value_list"] = this.value_list;
          if (this.activeIndex == -1) {
            this.tableData.unshift(this.form);
          } else {
            this.tableData[this.activeIndex] = this.form;
          }
          this.$message({
            message: this.activeIndex === -1 ? "添加成功" : "修改成功",
            type: "success",
          });
          this.add = false;
        }
      });
    },

    //批量删除
    deleteAll() {
      this.$confirm("你确定要删除这些数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.multipleSelection.forEach((v) => {
            console.log(v);
            let index = this.tableData.findIndex((item) => item.id === v.id);
            console.log(index);
            if (index !== -1) {
              this.tableData.splice(index, 1);
            }
            // this.tableData.filter((item) => {
            //   return item.id !== v.id;
            // });
          });

          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },

    //控制多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //添加新属性
    addAttr() {
      this.value_list.unshift({
        order: 0,
        name: "",
        type: "input",
        value: "",
        isCheck: true,
        edit: true,
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(val);
      this.currentPage = val;
    },
  },
  filters: {
    formatValue(val) {
      console.log(val);
      let str = val.map((item) => {
        return item.name;
      });
      return str.join(",");
    },
  },
};
</script>

<style>
.active:hover {
  background: #f4f4f4;
}
.active > i {
  display: none;
}
.active:hover > span {
  display: none;
}
.active:hover > i {
  display: inline-block;
}
</style>