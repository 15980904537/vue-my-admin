<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="市场价格" size="mini">
        <el-input v-model="form.oprice" style="width: 200px">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="销售价格" size="mini">
        <el-input v-model="form.pprice" style="width: 200px">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="成本价格" size="mini">
        <el-input v-model="form.cprice" style="width: 200px">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="商品重量" size="mini">
        <el-input v-model="form.weight" style="width: 200px">
          <template slot="append">公斤</template>
        </el-input>
      </el-form-item>
      <el-form-item label="商品体积" size="mini">
        <el-input v-model="form.volumn" style="width: 200px">
          <template slot="append">立方体</template>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "",
  props: [""],
  data() {
    return {};
  },

  components: {},

  computed: {
    ...mapState({
      form: (state) => state.goodsCreate.form,
    }),
  },

  beforeMount() {},

  mounted() {},

  methods: {},

  watch: {},
};
</script>
<style lang='' scoped>
</style>