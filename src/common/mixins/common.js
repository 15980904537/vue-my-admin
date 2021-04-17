export default {
    data() { 
        return {
            preUrl:'',
            page: {
                sizes: [10, 100, 200],
                size: 10,
                total: 0,
                currentPage: 1,
            },
            multipleSelection: [],
        }
    },
    created() {
        this.getList();

    },
    computed: {
        idsList() {
            return this.multipleSelection.map((item) => {
                return item.id;
            });
        },
    },
    methods: {
        //处理列表结果
        getListResult() {
           
        },
        getListUrl() {
            
        },
        getList() {
            if(this.preUrl==='')return 
            this.layout.showLoading();
            let url = this.getListUrl()
            this.axios
                .get(
                    url,
                    {
                        token: true,
                    }
                )
                .then((res) => {
                    let data = res.data.data;
                    
                    this.page.total = data.totalCount;
                    //处理列表结果
                    this.getListResult(data)
                    this.layout.hideLoading();
                })
                .catch(() => {
                    this.layout.hideLoading();
                });
        },

        addOrEdit(data,id=0) {
            this.layout.showLoading();
            let url = id > 0 ? "/admin/skus" +id: "/admin/skus"
            this.axios
                .post(url, data, {
                    token: true,
                })
                .then(() => {
                    this.getList();
                    this.layout.hideLoading();
                })
                .catch(() => {
                    this.layout.hideLoading();
                });
        },

        //更新状态
        changeStatus(val) {
           
            let status = val.status;
            this.layout.showLoading();
            this.axios
                .post(
                    "/admin/skus/" + val.id + "/update_status",
                    {
                        status: status,
                    },
                    {
                        token: true,
                    }
                )
                .then(() => {
                    this.layout.hideLoading();
                    val.status = val.status === 0 ? 1 : 0;
                })
                .catch(() => {
                    this.layout.hideLoading();
                });
        },
        //删除一条数据
        deleteList(val) {
            this.$confirm("你确定要删除这条数据吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    this.layout.showLoading();
                    this.axios
                        .post("/admin/skus/" + val.id + "/delete", {}, { token: true })
                        .then(() => {
                            this.layout.hideLoading();

                        })
                        .catch(() => {
                            this.layout.hideLoading();
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
        //批量删除
        deleteAll() {
            if (this.idsList.length <= 0) {
                return this.$message({
                    message: "请先选择要删除的数据!",
                    type: "warning",
                });
            }
            this.$confirm("你确定要删除这些数据吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    this.layout.showLoading();
                    this.axios
                        .post(
                            "/admin/skus/delete_all",
                            {
                                ids: this.idsList,
                            },
                            {
                                token: true,
                            }
                        )
                        .then(() => {
                            this.getList();
                            this.multipleSelection = [];
                            this.layout.hideLoading();
                        })
                        .catch(() => {
                            this.layout.hideLoading();
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
        //控制多选
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },

        handleSizeChange(val) {
            this.page.size = val;
            this.getList();
        },
        handleCurrentChange(val) {
            this.page.currentPage = val;
            this.getList();
        },
    }
}