<template>
  <div>
    <el-row style="line-height: 0">
      <el-col :span="24">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane
            :label="item.name"
            v-for="(item, index) in nav"
            :key="index"
          >
            <advance-search
              :form="form"
              placeholder="要搜索的商品名称"
              @search="searchEvent"
              ref="buttonSearch"
            >
              <template #left>
                <div class="d-flex align-items-center mr-auto">
                  <router-link :to="{ name: 'shop_goods_create' }">
                    <el-button type="success" size="medium" class="mr-3"
                      >发布商品</el-button
                    >
                  </router-link>
                  <el-button type="danger" size="medium">批量删除</el-button>
                  <el-button size="medium">下架</el-button>
                  <el-button size="medium">上架</el-button>
                </div>
              </template>

              <template #advance-search>
                <el-form ref="form" :model="form" inline>
                  <el-form-item label="商品名称" class="mr-3" size="medium">
                    <el-input
                      v-model="form.name"
                      placeholder="要搜索的商品名称"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="商品编码" class="mr-3" size="medium">
                    <el-input
                      v-model="form.code"
                      placeholder="要搜索的商品编码"
                    ></el-input>
                  </el-form-item>

                  <el-form-item label="商品类型" class="mr-3" size="medium">
                    <el-select v-model="form.type" placeholder="请选择商品类型">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="商品分类" class="mr-3" size="medium">
                    <el-input
                      v-model="form.catagory"
                      placeholder="请选择商品分类"
                    ></el-input>
                  </el-form-item>

                  <div>
                    <el-button
                      size="medium"
                      type="info"
                      @click.stop.native="searchEvent"
                      >搜索</el-button
                    >
                    <el-button size="medium" @click.stop.native="clearCondition"
                      >清空筛选条件</el-button
                    >
                  </div>
                </el-form>
              </template>
            </advance-search>
            <el-table
              border
              ref="multipleTable"
              :data="tableData[index].list"
              tooltip-effect="dark"
              style="width: 100%; margin-bottom: 100px"
              @selection-change="handleSelectionChange"
              class="mt-2 bg-light"
            >
              <el-table-column type="selection" width="55" align="center">
              </el-table-column>
              <el-table-column label="商品信息" width="350">
                <template slot-scope="scope">
                  <div class="media" style="line-height: 0">
                    <img
                      :src="scope.row.cover"
                      class="mr-3"
                      style="width: 80px; height: 80px"
                    />
                    <div class="media-body">
                      <h6>{{ scope.row.title }}</h6>
                      <p class="pt-2">分类:{{ scope.row.category }}</p>
                      <p class="pt-2">时间:{{ scope.row.create_time }}</p>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="type"
                label="商品类型"
                width="120"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="sale_count"
                label="实际销量"
                show-overflow-tooltip
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="order"
                label="商品排序"
                align="center"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                label="商品状态"
                align="center"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <div class="d-flex flex-column">
                    <el-button
                      type="success"
                      size="mini"
                      plain
                      @click="scope.row.ischeck = 1"
                      >审核通过</el-button
                    >
                    <el-button
                      type="danger"
                      size="mini"
                      plain
                      @click="scope.row.ischeck = 2"
                      class="mt-2 mx-0"
                      >审核拒绝</el-button
                    >
                  </div>

                  <!-- <el-button
                    type="success"
                    size="mini"
                    plain
                    @click.stop.native="changeStatus(scope.$index)"
                    >{{ scope.row.status ? "上架" : "下架" }}</el-button
                  > -->
                </template>
              </el-table-column>
              <el-table-column
                prop="stock"
                label="总库存"
                align="center"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                label="价格(元)"
                align="center"
                show-overflow-tooltip
              >
                <template slot-scope="scope"
                  ><span class="text-danger">{{
                    scope.row.pprice
                  }}</span></template
                >
              </el-table-column>
              <el-table-column
                label="操作"
                align="center"
                width="135"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <el-button-group>
                    <el-button type="success" size="mini" plain>修改</el-button>
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
          </el-tab-pane>
        </el-tabs>
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
      pageSizes: [10, 100, 200],
      pageSize: 10,
      total: 400,
      currentPage: 1,
      tableData: [],
      multipleSelection: [],
      form: {
        keyword: "",
        catagory: "",
        type: "",
        code: "",
        name: "",
      },

      activeName: 0,
      nav: [
        { name: "审核中" },
        { name: "出售中" },
        { name: "已下架" },
        { name: "库存预警" },
        { name: "回收站" },
      ],
    };
  },
  computed: {
    getList() {
      return this.tableData[this.activeName].list;
    },
  },
  created() {
    this.__getData();
  },
  methods: {
    //生成数据
    __getData() {
      for (let i = 0; i < this.nav.length; i++) {
        this.tableData.push({
          currentPage: i,
          list: [],
        });
        for (let j = 0; j < 20; j++) {
          this.tableData[i].list.push({
            id: j,
            title: "荣耀V10全网通 标配版 4GB+64GB" + i + j,
            cover: "http://static.yoshop.xany6.com/2018071718294208f086786.jpg",
            create_time: "2019-07-17 18:34:14",
            category: "手机",
            type: "普通手机",
            sale_count: 20,
            order: 10,
            status: 1,
            stock: 200,
            pprice: 1000,
            ischeck: 1,
          });
        }
      }
    },

    //导航部分点击
    handleClick(tab) {
      console.log(tab.index);
      this.activeName = tab.index;
    },
    //清空条件
    clearCondition() {
      this.form = { keyword: "", catagory: "", type: "", code: "", name: "" };
      this.$refs.buttonSearch[this.activeName].advancedSearch = false;
    },
    //搜索 高级搜索简单搜索
    searchEvent(e) {
      if (typeof e === "string") {
        console.log("简单搜索");
        return;
      }
      console.log("高级搜索");
    },

    //更新状态
    changeStatus(val) {
      this.getList[val].status = this.getList[val].status === 0 ? 1 : 0;
    },

    //删除一条数据
    deleteList(val) {
      this.$confirm("你确定要删除这条信息吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.getList.splice(val, 1);
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(val);
      this.currentPage = val;
    },
  },
};
</script>

<style>
</style>