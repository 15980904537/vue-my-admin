<template>
  <div>
    <div class="d-flex align-items-center">
      <slot name="left"></slot>

      <slot name="right" v-if="showRight">
        <el-input
          v-model="form.keyword"
          :placeholder="placeholder"
          style="width: 200px"
          class="mr-3"
          size="medium"
        ></el-input>
        <el-button
          size="medium"
          type="info"
          @click.stop.native="$emit('search', form.keyword)"
          >搜索</el-button
        >
        <el-button size="medium" @click.stop.native="advancedSearch = true"
          >高级搜索</el-button
        >
      </slot>
    </div>

    <div v-if="advancedSearch">
      <el-card class="box-card mt-2 bg-light">
        <div slot="header" class="clearfix">
          <span style="text-align: left">高级搜索</span>
          <el-button
            style="float: right; padding: 3px 0"
            type="text"
            @click.stop.native="advancedSearch = false"
            >收起</el-button
          >
        </div>
        <slot name="advance-search"> </slot>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    form: Object,
    placeholder: {
      type: String,
      default: "要搜索的商品名称",
    },
    showRight: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      advancedSearch: false,
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {},

  watch: {},
};
</script>
<style lang='' scoped>
</style>