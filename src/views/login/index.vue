<template>
  <div>
    <div class="container" style="margin-top: 150px">
      <div class="row">
        <div class="col-lg-5 col-md-7 col-sm-9 m-auto col-12 pt-5">
          <div class="card text-black mt-5">
            <div class="card-header bg-white">
              <h5 class="text-center mb-0">{{ $conf.logo }}</h5>
            </div>
            <div class="card-body">
              <el-form ref="ruleForm" :model="form" :rules="rules">
                <el-form-item prop="username">
                  <el-input
                    v-model="form.username"
                    placeholder="请输入用户名"
                    size="medium"
                    class="w-100"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input
                    v-model="form.password"
                    placeholder="请输入密码"
                    size="medium"
                    class="w-100"
                  ></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button
                    class="w-100"
                    type="primary"
                    @click="submitForm('ruleForm')"
                    >立即登录</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      form: {
        password: "",
        username: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            pattern: /^\w{5}$/,
            message: "用户名错误",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern: /^\w{5}$/,
            message: "密码错误",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(["adminIndex"]),
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        // console.log(valid);
        if (valid) {
          //发送请求
          this.axios
            .post(
              "/admin/login",
              {
                username: this.form.username,
                password: this.form.password,
              },
              {
                load: true,
              }
            )
            .then((data) => {
              console.log(data);
              //存储到vuex中
              //存储权限校验规则
              if (data.data.data.role.rules && data.data.data.role) {
                window.sessionStorage.setItem(
                  "route",
                  JSON.stringify(data.data.data.role.rules)
                );
              }
              this.$store.commit("saveInfo", data.data.data);
              this.$store.commit("getMenu", data.data.data.tree);
              this.$message("登录成功!");
              this.$router.push(this.adminIndex);
              return data.data.data;
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style>
</style>
