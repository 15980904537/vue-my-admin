<template>
  <div>
    <li
      class="list-group-item list-group-item-action d-flex align-items-center"
      style="text-align: left"
      @click.stop="$emit('change', index)"
      :class="index === albumnActive ? 'active' : ''"
    >
      {{ item.name }}

      <span class="btn btn-light btn-sm ml-auto" v-if="!showOption">
        {{ item.images_count }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown class="ml-auto" v-if="showOption">
        <span class="btn btn-light btn-sm">
          {{ item.images_count
          }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            @click.stop.native="$emit('showModel', { item, index })"
            >修改</el-dropdown-item
          >
          <el-dropdown-item @click.stop.native="$emit('del', item, index)"
            >删除</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </li>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    albumnActive: Number,
    item: Object,
    index: Number,
    showOption: Boolean,
  },
  data() {
    return {};
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {},

  watch: {},
};
</script>
<style  scoped>
.active {
  color: #67c23a;
  background-color: #f0f9eb;
  border-color: #c2e7b0;
}
</style>