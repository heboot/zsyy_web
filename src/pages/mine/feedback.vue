<template>
    <div class="content">
        <div class="rightContent">
            <div class="title">
                <p>我的反馈</p>
                <div class="add" @click="alert=true">添加反馈</div>
            </div>
            <ul class="list">
                <li class="listItem" v-for="(item,i) in list" :key="i">
                    <p class="listTit">反馈:{{item.feedbackContent}}</p>
                    <p>
                        <img src="../../assets/imgs/time.png" alt="" class="time">
                        <span class="date">{{item.createTime}}</span>
                    </p>
                    <div class="bg" v-if="item.feedbackAnswer">
                        <span class="answer">回答：{{item.feedbackAnswer}}</span>
                        <div>
                            <img src="../../assets/imgs/time.png" alt="" class="time">
                            <span class="date">{{item.answerTime}}</span>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="pageBox" v-if="total>0">
                <div class="page">
                    <p @click="onPageChange(1)">首页</p>
                    <Page :total="total" :current="pageNum" :page-size="limit" prev-text="上一页" next-text="下一页"
                        @on-change="onPageChange" />
                    <p @click="onPageChange(totalPages)">尾页</p>
                </div>
            </div>
        </div>
        <!-- 我的反馈 -->
        <div class="alertMask" v-show="alert">
            <div class="alert">
                <div class="alertTitle">
                    <p>添加反馈</p>
                    <Icon type="md-close" @click="alert=false" />
                </div>
                <div class="alertCon">
                    <Input v-model="feedContent" type="textarea" :rows="8" placeholder="输入反馈内容" />
                </div>
                <div class="butBox">
                    <div class="button sure" @click="addCallInfo">确定</div>
                    <div class="button cancel" @click="alert=false">取消</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            alert: false,
            feedContent: "",
            pageNum: 1,
            limit: 10,
            list: [],
            total: 0,
            totalPages:0
        };
    },
    created() {
        this.getList();
    },
    methods: {
        getList() {
            this.$http
                .post("/feedback/pageQuery", {
                    pageNum: this.pageNum,
                    pageSize: this.limit
                })
                .then(res => {
                    if (res.code == 0) {
                        this.list = res.data.content;
                        this.total = res.data.totalElements;
                        this.totalPages = res.data.totalPages;
                    }
                });
        },
        onPageChange(page) {
            this.pageNum = page;
            this.getList();
        },
        // 添加反馈
        addCallInfo(){
            if(this.feedContent){
                this.$http.post("feedback/add",{
                    feedbackContent:this.feedContent,
                    feedbackType:0      //0-用户 1-题目
                }).then(res=>{
                    if(res.code==0){
                        this.feedContent="";
                        this.alert=false;
                        this.$Message.success("添加成功！");
                        this.getList();
                    }
                })
            }else{
                this.$Message.error("请填写反馈内容！");
            }
        }
    }
};
</script>

<style scoped lang="less">
.content {
    .rightContent {
        width: 960px;
        background: #fff;
        border-radius: 2px;
        min-height: 548px;
        padding: 20px;
        .title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 22px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            border-bottom: 1px solid #ebeef2;
            padding-bottom: 20px;
            .add {
                width: 88px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                background: rgba(41, 178, 139, 1);
                border-radius: 4px;
                font-size: 15px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                cursor: default;
            }
        }
        .list {
            padding: 10px;
            .listItem {
                p {
                    margin: 10px 0;
                }
                border-bottom: 1px solid #ebeef2;
                padding-bottom: 30px;
                .listTit {
                    height: 22px;
                    font-size: 16px;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 500;
                    color: rgba(51, 51, 51, 1);
                    line-height: 22px;
                }
                .time {
                    width: 12px;
                    height: 12px;
                    vertical-align: middle;
                    margin-right: 10px;
                }
                .date {
                    font-size: 14px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: rgba(164, 166, 187, 1);
                }
                .bg {
                    width: 880px;
                    // height: 85px;
                    padding: 20px;
                    background: rgba(246, 248, 250, 1);
                    border-radius: 2px;
                    .answer {
                        font-size: 14px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: rgba(51, 51, 51, 1);
                    }
                }
            }
            .listItem:last-child {
                border: 0;
            }
        }
        // 分页样式
        /deep/ .ivu-page-item {
            border-radius: 50%;
            margin: 0 20px;
            border: 0;
            color: #4d555d;
            font-size: 14px;
            width: 35px;
            height: 35px;
            line-height: 35px;
        }
        /deep/ .ivu-page-item-active {
            background: rgba(77, 85, 93, 1);
            color: #fff;
        }
        /deep/ .ivu-page-item-active a,
        .ivu-page-item-active:hover a {
            color: #fff;
        }
        .pageBox {
            text-align: center;
            .page {
                display: inline-flex;
                height: 35px;
                line-height: 35px;
                color: #4d555d;
                font-size: 14px;
            }
            p {
                margin: 0 20px;
            }
            margin: 50px auto;
        }
    }
    .alertMask {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        .alert {
            width: 500px;
            padding: 20px;
            background: #fff;
            border-top: 3px solid #29b28b;
            position: absolute;
            left: 50%;
            top: 50%;
            min-height: 392px;
            margin-top: -181px;
            margin-left: -250px;
            .alertTitle {
                font-size: 16px;
                font-family: MicrosoftYaHei;
                color: rgba(0, 0, 0, 1);
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid #f5f5f5;
                padding-bottom: 10px;
            }
            .alertCon {
                margin: 20px 0;
            }
            .butBox {
                width: 80%;
                margin: 40px auto 0;
                display: flex;
                justify-content: space-around;
                cursor: default;
                .button {
                    width: 140px;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    font-size: 15px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    border-radius: 2px;
                }
                .sure {
                    background: rgba(41, 178, 139, 1);
                    color: #fff;
                }
                .cancel {
                    border: 1px solid rgba(41, 178, 139, 1);
                    color: #29b28b;
                }
            }
        }
    }
}
</style>    