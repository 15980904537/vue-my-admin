<template>
  <div>
    <input type="text" v-model="value2" />
  </div>
</template>

<script>
export default {
  name: "",
  props: ["value"],
  data() {
    return {};
  },

  components: {},

  computed: {
    value2: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },

  beforeMount() {},

  mounted() {},

  methods: {
    // fn(ev) {
    //   console.log(ev.target.value);
    //   this.$emit("input", ev.target.value);
    // },
  },

  watch: {},
};
</script>
<style lang='' scoped>
</style>