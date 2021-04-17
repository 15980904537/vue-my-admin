<template>
  <div>
    <!-- <el-row style="line-height: 0">
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
                @click="addRule(false)"
                >添加规格</el-button
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
            label="规格名称"
            width="120"
            prop="name"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="default" label="规格值" width="350">
          </el-table-column>
          <el-table-column
            prop="order"
            label="商品排序"
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
                @click.stop.native="changeStatus(scope.row)"
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
                  @click="addRule(scope.$index)"
                  >修改</el-button
                >
                <el-button
                  type="danger"
                  size="mini"
                  plain
                  @click.stop.native="deleteList(scope.row)"
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
            :current-page="page.currentPage"
            :page-sizes="page.sizes"
            :page-size="page.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total"
          >
          </el-pagination>
        </el-footer>
      </el-col>
    </el-row> -->

    <!-- 添加商品规格 -->
    <!-- <el-dialog title="添加商品规格" :visible.sync="add" width="70%">
      <el-form ref="ruleForm" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="规格名称" prop="name">
          <el-input
            v-model="form.name"
            placeholder="规格名称"
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-input-number
            v-model="form.order"
            size="mini"
            :min="1"
            :max="10"
            label="描述文字"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio :label="0" border size="mini">启动</el-radio>
            <el-radio :label="1" border size="mini">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="颜色">
          <el-radio-group v-model="form.type">
            <el-radio :label="0" border size="mini">文字</el-radio>
            <el-radio :label="1" border size="mini">颜色</el-radio>
            <el-radio :label="2" border size="mini">图片</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="规格值" prop="default">
          <el-input
            type="textarea"
            v-model="form.default"
            size="mini"
            rows="4"
            placeholder="一行一个规格值,多个规则项用换行来输入"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="add = false">取 消</el-button>
        <el-button type="primary" @click="submit('ruleForm')">确 定</el-button>
      </span>
    </el-dialog> -->

    <my-input v-model="m"></my-input>
    <div class="mt-4">{{ m }}</div>
  </div>
</template>

<script>
import advanceSearch from "@/components/common/advance-search";
import common from "@/common/mixins/common";
import myInput from "./input";
export default {
  components: {
    advanceSearch,
    myInput,
  },
  inject: ["layout"],
  mixins: [common],
  data() {
    return {
      m: 0,
      preUrl: "skus",
      activeIndex: -1,
      add: false,

      tableData: [],

      form: {
        type: 1,
        name: "",
        num: 3,
        status: 1,
        default: "",
      },
      rules: {
        name: [
          { required: true, message: "规格名称不能为空", trigger: "blur" },
        ],
        default: [
          { required: true, message: "规格值不能为空", trigger: "blur" },
        ],
      },
    };
  },

  created() {
    // this.getList();
  },
  methods: {
    //mixins
    getListResult(e) {
      this.tableData = e.list;
    },
    //mixins
    getListUrl() {
      return `/admin/${this.preUrl}/${this.page.currentPage}?limit=${this.page.size}`;
    },
    //添加商品规格
    addRule(e) {
      console.log(e);
      if (e === false) {
        //添加规格
        // 初始化表单
        this.form = {
          name: "",
          order: 1,
          status: 0,
          default: "",
          type: 1,
        };

        this.activeIndex = -1;
      } else {
        //修改规格
        this.form.default = this.tableData[e].default.replace(",", "\n");
        this.form = this.tableData[e];
        this.activeIndex = e;
      }

      this.add = true;
    },

    //提交表单
    submit(formName) {
      //表单验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.form.default = this.form.default.replace(/\n/g, ",");
          let id = 0;
          if (this.activeIndex !== -1) {
            id = this.tableData[this.activeIndex].id;
          }
          this.addOrEdit(this.form, id);
          this.$message({
            message: this.activeIndex === -1 ? "添加成功" : "修改成功",
            type: "success",
          });
          this.add = false;
        }
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
  },
};
</script>

<style>
</style>