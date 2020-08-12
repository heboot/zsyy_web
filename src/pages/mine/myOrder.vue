<template>
    <div class="content">
        <div class="rightContent">
            <div class="learningBox rightBox">
                <div class="tabCar flex">
                    <div :class="{tabActive:learningCur==index}" @click="choseLearningTab(index)"
                        v-for="(item,index) in learningList" :key="index">{{item.name}}</div>
                </div>
                <div class="orderList">
                    <div class="itemBox" v-for="{item,i} in 5" :key="i">
                        <div class="title">
                            <span>下单时间：</span>
                            <span>2020.05.22 13:22:38</span>
                            <span class="marginLeft">订单号：</span>
                            <span>202000200102010293822</span>
                        </div>
                        <div class="conBox">
                            <div class="leftBox">
                                <img src="../../assets/imgs/1.png" alt="">
                                <div class="infoBox">
                                    <p>第二届药健康科普中国行药师科普宣讲赋能</p>
                                    <p class="price">价格：¥9.9/课</p>
                                </div>
                            </div>
                            <div class="middleBox">
                                需付：¥428.00
                            </div>
                            <div class="lastBox">
                                <p>已关闭</p>
                                <p>删除订单</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            learningList: [
                { name: "全部订单", id: 1 },
                { name: "待付款", id: 2 },
                { name: "已付款", id: 3 }
            ],
            learningCur: 0
        }
    },
    methods:{
        choseLearningTab(i) {
            this.learningCur = i;
        },
    }
};
</script>

<style scoped lang="less">
.content {
    .rightContent {
        width: 960px;
        background: #fff;
        border-radius: 2px;
        min-height: 600px;
        .rightBox {
            .tabCar {
                width: 100%;
                height: 68px;
                border-bottom: 1px solid #f0f2f5;
                padding: 0 30px;
                box-sizing: border-box;
                div {
                    width: 110px;
                    height: 100%;
                    background: #fff;
                    font-size: 14px;
                    color: #313436;
                    text-align: center;
                    line-height: 68px;
                    cursor: default;
                }
                div.tabActive {
                    color: #29b28b;
                    font-size: 18px;
                    border-bottom: 1px solid #29b28b;
                }
            }
        }
        .learningBox {
            .orderList {
                width: 100%;
                background: #fff;
                padding:20px;
                .itemBox:first-child{
                    margin-top:0;
                }
                .itemBox{
                    border:1px solid #EBEEF2;
                    height:210px;
                    margin:20px 0;
                    .title{
                        height:70px;
                        line-height:70px;
                        background:rgba(244,246,246,1);
                        border-radius:2px 2px 0px 0px;
                        font-size:14px;
                        font-family:PingFangSC-Regular,PingFang SC;
                        font-weight:400;
                        color:rgba(51,51,51,1);
                        padding:0 20px;
                        .marginLeft{
                            margin-left:40px;
                        }
                    }
                    .conBox{
                        display:flex;
                        align-items: center;
                        height:140px;
                        .leftBox{
                            width:60%;
                            display:flex;
                            padding:20px;
                            border-right:1px solid #EBEEF2;
                            img{
                                height:99px;
                                vertical-align:middle;
                                margin-right:20px;
                            }
                            .infoBox{
                                display:flex;
                                flex-direction:column;
                                justify-content:space-between;
                                font-size:16px;
                                font-family:PingFangSC-Regular,PingFang SC;
                                font-weight:400;
                                color:rgba(7,17,27,1);
                                .price{
                                    font-size:12px;
                                    font-family:PingFangSC-Regular,PingFang SC;
                                    font-weight:400;
                                    color:rgba(7,17,27,1);
                                }
                            }
                        }
                        .middleBox{
                            line-height:140px;
                            width:20%;
                            text-align:center;
                            border-right:1px solid #EBEEF2;
                            font-size:16px;
                            font-family:PingFang-SC-Heavy,PingFang-SC;
                            font-weight:800;
                            color:rgba(248,50,82,1);
                        }
                        .lastBox{
                            width:20%;
                            text-align:center;
                            cursor: default;
                            p{
                                margin:15px 0;
                            }
                            p:first-child{
                                font-size:16px;
                                font-family:PingFangSC-Regular,PingFang SC;
                                font-weight:400;
                                color:rgba(153,153,153,1);
                            }
                            p:last-child{
                                font-size:18px;
                                font-family:PingFangSC-Regular,PingFang SC;
                                font-weight:400;
                                color:rgba(51,51,51,1);
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>