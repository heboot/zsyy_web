<template>
  <div class="content">
    <div class="orderBox">
      <p class="title">确认订单信息</p>
      <div class="courseInfo">
        <p class="msg">课程信息</p>
        <div class="info">
          <div class="left">
            <img src="../../assets/imgs/index/loginPic.png" alt />
            <div class="text">
              <p>第二届药健康科普中国行药师科普宣讲赋能</p>
              <p>3课时</p>
            </div>
          </div>
          <div class="right">￥432</div>
        </div>
      </div>
      <div class="payBox">
        <p class="msg">支付方式</p>
        <div class="choiceBox">
          <RadioGroup v-model="payType">
            <div class="payType">
              <Radio label="apple">
                <img src="../../assets/imgs/alipay.png" alt class="typeImg" />
                <span>支付宝支付</span>
              </Radio>
            </div>
            <div class="payType">
              <Radio label="android">
                <img src="../../assets/imgs/wx.png" alt class="typeImg" />
                <span>微信支付</span>
              </Radio>
            </div>
          </RadioGroup>
        </div>
        <div class="moneyBox">
          <div class="line">
            <span>订单金额：</span>
            <span>￥199.00</span>
          </div>
          <div class="line">
            <span>应付金额：</span>
            <span class="money">￥199.00</span>
          </div>
        </div>
        <div class="pay">立即支付</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      payType: ""
    };
  }
};
</script>

<style scoped lang="less">
.content {
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
    background-size:100%;
    border-radius: 50%;
    top: 0;
    left: 0;
    position: relative;
  }
  width: 100%;
  background: #f5f6f6;
  padding: 1% 15%;
  height: 100vh;
  .orderBox {
    width: 1200px;
    margin: auto;
    .title {
      height: 40px;
      font-size: 28px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(28, 31, 33, 1);
      line-height: 40px;
    }
    .msg {
      height: 28px;
      font-size: 20px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(28, 31, 33, 1);
      line-height: 28px;
    }
    .courseInfo {
      margin: 25px auto;
      background: #fff;
      padding: 10px 20px;
      .info {
        margin: 25px auto 10px;
        height: 140px;
        background: rgba(249, 250, 250, 1);
        padding: 20px;
        display: flex;
        justify-content: space-between;
        .left {
          display: flex;
          img {
            height: 99px;
            vertical-align: middle;
            margin-right: 15px;
          }
          .text {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            p:first-child {
              height: 22px;
              font-size: 16px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(7, 17, 27, 1);
              line-height: 22px;
            }
            p:last-child {
              height: 17px;
              font-size: 12px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(145, 153, 161, 1);
              line-height: 17px;
            }
          }
        }
      }
    }
    .payBox {
      background: #fff;
      padding: 10px 20px;
      height:508px;
      .choiceBox {
        border-bottom: 1px solid #ebeef2;
      }
      .payType {
        text-align: center;
        margin: 30px 40px 20px 0;
        display: inline-block;
        line-height: 118px;
        width: 360px;
        height: 118px;
        border: 2px solid rgba(234, 240, 238, 1);
        .typeImg {
          width: 32px;
          height: 32px;
          margin: 0 15px;
          vertical-align: middle;
        }
      }
      .moneyBox {
        margin-left: 950px;
        width: 200px;
        margin-top:30px;
        .line {
          display: flex;
          justify-content: space-between;
          height: 73px;
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 73px;
        }
        .money {
          font-size: 18px;
          font-family: PingFang-SC-Heavy, PingFang-SC;
          font-weight: 800;
          color: rgba(248, 50, 82, 1);
        }
      }
      .pay {
        float:right;
        margin-top: 30px;
        width: 230px;
        height: 50px;
        background: rgba(41, 178, 139, 1);
        border-radius: 4px;
        line-height: 50px;
        text-align: center;
        color: #fff;
        font-size: 15px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
}
</style>