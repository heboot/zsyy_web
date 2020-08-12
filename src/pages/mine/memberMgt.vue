<template>
    <div class="content">
        <div class="rightContent">
            <div class="userInfo">
                <img src="../../assets/imgs/index/userImg.png" alt="">
                <span>小酒窝</span>
                <img src="../../assets/imgs/index/vip1.png" alt="" class="vip">
                <img src="../../assets/imgs/index/vip2.png" alt="" class="vip">
            </div>
            <div class="memberBox">
                <div class="line">
                    <p class="title">开通账号</p>
                    <span>小酒窝</span>
                </div>
                <div class="line">
                    <p class="title">开通方式</p>
                    <div>
                        <RadioGroup v-model="type">
                            <Radio label="线上开通"></Radio>
                            <Radio label="卡号开通"></Radio>
                        </RadioGroup>
                    </div>
                </div>
                <div class="line">
                    <p class="title">会员等级</p>
                    <div>
                        <RadioGroup v-model="vip">
                            <Radio label="VIP"></Radio>
                        </RadioGroup>
                    </div>
                </div>
                <div class="payLong">
                    <div class="line">
                        <p class="title">开通方式</p>
                        <div>
                            <RadioGroup v-model="type">
                                <Radio label="按月(￥50/月)"></Radio>
                                <Radio label="按年(￥365/年)"></Radio>
                            </RadioGroup>
                        </div>
                    </div>
                    <div class="msgBox">
                        <input type="text" name="11" id="">
                        <span>有效期至 2020.06.22</span>
                    </div>
                </div>
                <div class="line border-bottom">
                    <p class="title">支付方式</p>
                    <div class="choiceBox">
                        <RadioGroup v-model="payType">
                            <Radio label="apple" class="payType">
                                <img src="../../assets/imgs/alipay.png" alt class="typeImg" />
                                <span>支付宝支付</span>
                            </Radio>
                            <Radio label="android" class="payType">
                                <img src="../../assets/imgs/wx.png" alt class="typeImg" />
                                <span>微信支付</span>
                            </Radio>
                        </RadioGroup>
                    </div>
                </div>
                <div class="rightBox">
                    <div class="top">
                        <div class="line">
                            <span>订单金额：</span>
                            <span>￥199.00</span>
                        </div>
                        <div class="line">
                            <span>应付金额：</span>
                            <span class="price">￥199.00</span>
                        </div>
                    </div>
                    <div class="pay">立即支付</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            type: "",
            vip: "",
            payType: ""
        };
    }
};
</script>

<style scoped lang="less">
.content {
    .rightContent {
        width: 960px;
        background: #fff;
        border-radius: 2px;
        min-height: 900px;
        padding: 20px;
        .userInfo {
            width: 900px;
            height: 110px;
            display: flex;
            align-items: center;
            background: rgba(246, 248, 250, 1);
            border-radius: 2px;
            padding: 20px;
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            img:first-child {
                width: 70px;
                height: 70px;
                border-radius: 50%;
                margin-right: 10px;
            }
            .vip {
                width: 18px;
                height: 18px;
                margin-left: 10px;
            }
        }
        .memberBox {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            .line {
                display: flex;
                line-height: 67px;
                .title {
                    width: 10%;
                }
                // 单选框样式
                /deep/ .ivu-radio-inner {
                    width: 20px;
                    height: 20px;
                    background: #eaf0ee;
                    border: 0;
                }
                /deep/ .ivu-radio-inner:after {
                    content:"";
                    width: 20px;
                    height: 20px;
                    background:url("../../assets/imgs/clicked1.png");
                    border-radius: 50%;
                    background-size: 100%;
                    top: 0;
                    left: 0;
                    position: relative;
                }
                /deep/ .ivu-radio-wrapper {
                    margin-right: 30px;
                    font-size: 14px;
                }
            }
            .msgBox {
                padding-left: 10%;
                input {
                    width: 110px;
                    height: 42px;
                    border-radius: 2px;
                    border: 2px solid rgba(238, 238, 238, 1);
                    margin-right: 10px;
                }
            }
            .payLong {
                margin-bottom: 22px;
            }
            .payBox {
                text-align: center;
                margin-top: 20px;
                width: 360px;
                height: 118px;
                background: rgba(41, 178, 139, 0.1);
                border: 2px solid rgba(41, 178, 139, 1);
            }
            .border-bottom {
                border-bottom: 1px solid #eaf0ee;
                padding-bottom: 30px;
            }
            .choiceBox {
                display: flex;
                width: 100%;
                .payType {
                    text-align: center;
                    width: 360px;
                    line-height: 118px;
                    height: 118px;
                    border: 2px solid rgba(234, 240, 238, 1);
                    .typeImg {
                        width: 32px;
                        height: 32px;
                        margin: 0 15px;
                        vertical-align: middle;
                    }
                }
            }
            .rightBox {
                float: right;
                span:first-child {
                    margin-right:100px;
                }
                .price {
                    font-size: 18px;
                    font-family: PingFang-SC-Heavy, PingFang-SC;
                    font-weight: 800;
                    color: rgba(248, 50, 82, 1);
                }
                .pay {
                    margin:20px;
                    text-align: center;
                    line-height: 50px;
                    font-size: 15px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 1);
                    width: 230px;
                    height: 50px;
                    background: rgba(41, 178, 139, 1);
                    border-radius: 4px;
                }
            }
        }
    }
}
</style>