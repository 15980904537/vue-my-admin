<template>
  <div>
    <table class="table table-bordered table--small">
      <thead>
        <tr>
          <th
            scope="col"
            :rowspan="item.rowspan"
            class="text-center"
            :colspan="item.colspan"
            v-for="(item, index) in getths"
            :key="index"
            style="vertical-align: middle"
          >
            {{ item.name }}
          </th>
        </tr>
        <tr>
          <th
            scope="col"
            rowspan="1"
            colspan="1"
            class="text-center"
            v-for="(itemCard, indexCard) in skuLables"
            :key="indexCard"
          >
            {{ itemCard.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(itemData, indexData) in list" :key="indexData">
          <th
            scope="row"
            v-for="(sku, skuI) in itemData.skus"
            :key="skuI"
            width="100"
            class="text-center"
          >
            {{ sku.name }}
          </th>
          <td class="text-center" width="100">
            <span class="btn btn-light" @click="chooseImage(item)">
              <i class="el-icon-plus" v-if="!image"></i>
              <img
                :src="image"
                alt=""
                v-if="image"
                style="width: 40px; height: 40px; cursor: pointer"
              />
            </span>
          </td>
          <td class="text-center">
            <input
              type="number"
              v-model="itemData.pprice"
              class="form-control text-center"
            />
          </td>
          <td class="text-center">
            <input
              type="number"
              v-model="itemData.oprice"
              class="form-control text-center"
            />
          </td>
          <td class="text-center">
            <input
              type="number"
              v-model="itemData.cprice"
              class="form-control text-center"
            />
          </td>
          <td class="text-center">
            <input
              type="number"
              v-model="itemData.stock"
              class="form-control text-center"
            />
          </td>
          <td class="text-center">
            <input
              type="number"
              v-model="itemData.volume"
              class="form-control text-center"
            />
          </td>
          <td class="text-center">
            <input
              type="number"
              v-model="itemData.weight"
              class="form-control text-center"
            />
          </td>
          <td class="text-center">
            <input
              type="text"
              v-model="itemData.code"
              class="form-control text-center"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "",
  inject: ["app"],
  props: [""],
  data() {
    return {
      image: false,
      list: [],
    };
  },

  components: {},

  computed: {
    ...mapGetters(["getths", "tableData", "skuLables"]),
  },
  beforeMount() {},

  mounted() {
    this.list = this.tableData;
  },

  methods: {
    chooseImage(item) {
      this.app.chooseImage((res) => {
        this.image = res[0].url;
        item.image = this.image;
      });
    },
  },

  watch: {
    tableData(newVal) {
      this.list = newVal;
    },
  },
};
</script>
<style lang='' scoped>
</style>