<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item, index) in cardList" :key="index">
        <el-card class="box-card" shadow="hover">
          <div class="d-flex align-items-center" style="line-height: 0">
            <i
              class="bg-primary text-center text-white mb-0 h4"
              :class="[item.icon, item.color]"
              style="width: 60px; height: 60px; line-height: 60px"
            ></i>
            <div class="pl-3">
              <h4 class="mb-3">{{ item.count }}</h4>
              <small class="text-muted">{{ item.notice }}</small>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="mt-3" style="line-height: 1">
      <el-col :span="12" style="height: 420px" class="d-flex flex-column">
        <el-card class="box-card mb-auto">
          <div slot="header" class="clearfix">
            <span>店铺及商品提示</span>
            <el-button
              style="float: right; padding: 3px 0"
              class="text-secondary"
              type="text"
              >您需要关注的店铺信息以及待处理事项</el-button
            >
          </div>
          <div class="row mb-4">
            <div class="col-3" v-for="(item, index) in goodsList" :key="index">
              <button class="btn btn-light w-100 p-3">
                <h5>{{ item.count }}</h5>
                <small class="text-muted">{{ item.des }}</small>
              </button>
            </div>
          </div>
        </el-card>

        <el-card class="box-card mt-3">
          <div slot="header" class="clearfix">
            <span>交易提示</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              class="text-secondary"
              >您需要立刻处理的交易订单</el-button
            >
          </div>
          <div class="row mb-4">
            <div class="col-2" v-for="(item, index) in actions" :key="index">
              <button
                class="btn btn-light p-3"
                style="width: 80px; height: 80px"
              >
                <h5>{{ item.count }}</h5>
                <small class="text-muted">{{ item.des }}</small>
              </button>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card" style="height: 420px">
          <div slot="header" class="clearfix">
            <span>订单总数统计</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              class="text-secondary"
              >订单数量</el-button
            >
          </div>
          <div id="myChart" style="width: 600px; height: 400px"></div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="my-3" style="line-height: 1">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>销售情况统计</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              class="text-secondary"
              >按周期统计商家店铺的订单量和订单详情</el-button
            >
          </div>

          <div class="d-flex align-items-center border">
            <span class="py-5 px-3 bg-light border-right">昨日销量</span>
            <div style="flex: 1">
              <div class="border-bottom pb-3"><span>订单量(件)</span>12</div>
              <div class="pt-3"><span>订单金额(元)</span>12</div>
            </div>
          </div>

          <div class="d-flex align-items-center border mt-3">
            <span class="py-5 px-3 bg-light border-right">昨日销量</span>
            <div style="flex: 1">
              <div class="border-bottom pb-3"><span>订单量(件)</span>12</div>
              <div class="pt-3"><span>订单金额(元)</span>12</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>单品销量排名</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              class="text-secondary"
              >按周期统计商家店铺的订单量和订单详情</el-button
            >
          </div>
          <el-table
            ref="singleTable"
            :data="tableData"
            border
            highlight-current-row
            style="width: 100%"
          >
            <el-table-column type="index" width="50" label="#">
            </el-table-column>
            <el-table-column prop="goodsInfo" label="商品信息">
            </el-table-column>
            <el-table-column prop="saleCount" label="销量" width="100">
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import echarts from "echarts";
export default {
  data() {
    return {
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      cardList: [
        {
          icon: "el-icon-user-solid",
          count: 50,
          notice: "关注人数(个)",
          color: "bg-primary",
        },
        {
          icon: "el-icon-s-finance",
          count: 120,
          notice: "订单总数(笔)",
          color: "bg-success",
        },
        {
          icon: "el-icon-s-order",
          count: 4183.8,
          notice: "今日订单总金额",
          color: "bg-danger",
        },
        {
          icon: "el-icon-s-data",
          count: 100,
          notice: "本月销量",
          color: "bg-warning",
        },
      ],
      goodsList: [
        {
          count: 64,
          des: "出售中",
        },
        {
          count: 10,
          des: "待回复",
        },
        {
          count: 0,
          des: "库存预警",
        },
        {
          count: 3,
          des: "仓库中",
        },
      ],
      actions: [
        {
          count: 0,
          des: "待付款",
        },
        {
          count: 10,
          des: "待发货",
        },
        {
          count: 0,
          des: "已发送",
        },
        {
          count: 3,
          des: "已收货",
        },
        {
          count: 0,
          des: "退款中",
        },
        {
          count: 3,
          des: "待售后",
        },
      ],
      tableData: [
        {
          goodsInfo: "小天鹅",
          saleCount: 9,
        },
        {
          goodsInfo: "小天鹅",
          saleCount: 9,
        },
        {
          goodsInfo: "小天鹅",
          saleCount: 9,
        },
        {
          goodsInfo: "小天鹅",
          saleCount: 9,
        },
      ],
    };
  },
  mounted() {
    this.drawList();
  },
  methods: {
    drawList() {
      // let myChart = this.$echarts.init(document.getElementById("myChart"));
      // let option = {
      //   tooltip: {
      //     trigger: "axis",
      //     axisPointer: {
      //       type: "cross",
      //       label: {
      //         backgroundColor: "#6a7985",
      //       },
      //     },
      //   },
      //   legend: {
      //     data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"],
      //   },
      //   toolbox: {
      //     feature: {
      //       saveAsImage: {},
      //     },
      //   },
      //   grid: {
      //     left: "3%",
      //     right: "4%",
      //     bottom: "3%",
      //     containLabel: true,
      //   },
      //   xAxis: [
      //     {
      //       type: "category",
      //       boundaryGap: false,
      //       data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      //     },
      //   ],
      //   yAxis: [
      //     {
      //       type: "value",
      //     },
      //   ],
      //   series: [
      //     {
      //       name: "邮件营销",
      //       type: "line",
      //       stack: "总量",
      //       areaStyle: {},
      //       emphasis: {
      //         focus: "series",
      //       },
      //       data: [120, 132, 101, 134, 90, 230, 210],
      //     },
      //     {
      //       name: "联盟广告",
      //       type: "line",
      //       stack: "总量",
      //       areaStyle: {},
      //       emphasis: {
      //         focus: "series",
      //       },
      //       data: [220, 182, 191, 234, 290, 330, 310],
      //     },
      //     {
      //       name: "视频广告",
      //       type: "line",
      //       stack: "总量",
      //       areaStyle: {},
      //       emphasis: {
      //         focus: "series",
      //       },
      //       data: [150, 232, 201, 154, 190, 330, 410],
      //     },
      //     {
      //       name: "直接访问",
      //       type: "line",
      //       stack: "总量",
      //       areaStyle: {},
      //       emphasis: {
      //         focus: "series",
      //       },
      //       data: [320, 332, 301, 334, 390, 330, 320],
      //     },
      //     {
      //       name: "搜索引擎",
      //       type: "line",
      //       stack: "总量",
      //       label: {
      //         show: true,
      //         position: "top",
      //       },
      //       areaStyle: {},
      //       emphasis: {
      //         focus: "series",
      //       },
      //       data: [820, 932, 901, 934, 1290, 1330, 1320],
      //     },
      //   ],
      // };
      // 使用刚指定的配置项和数据显示图表。
      // myChart.setOption(option);
    },
  },
};
</script>

<style></style>
