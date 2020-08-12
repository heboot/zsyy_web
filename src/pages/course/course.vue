<template>
  <div class="content">
    <div class="typeBox">
      <div class="typeLine">
        <p class="typeTitle">分类：</p>
        <ul>
          <li @click="choseTab(1,0)" :class="{active:classCur==0}">全部</li>
          <li
            @click="choseTab(1,index+1)"
            :class="{active:classCur==index+1}"
            v-for="(item,index) in classList"
            :key="index"
          >{{item.categoryName}}</li>
        </ul>
      </div>
      <div class="typeLine">
        <p class="typeTitle">授课内容：</p>
        <ul>
          <li @click="choseTab(2,0)" :class="{active:contentCur==0}">全部</li>
          <li
            @click="choseTab(2,index+1)"
            :class="{active:contentCur==index+1}"
            v-for="(item,index) in conList"
            :key="index"
          >{{item.contentName}}</li>
        </ul>
      </div>
    </div>
    <div class="courseBox">
      <div class="flexBox">
        <div class="line">
          <ul class="type">
            <li
              @click="choseTab(3,index)"
              :class="{active:typeCur==index}"
              v-for="(item,index) in typeList"
              :key="index"
            >{{item.name}}</li>
          </ul>
          <div class="radioBox">
            <div
              class="radioItem"
              v-for="(item,index) in moneyTypeList"
              :key="index"
              @click="choseTab(4,index)"
            >
              <img
                src="../../assets/imgs/radioed.png"
                alt
                class="radioImg"
                v-if="moneyTypeCur==index"
              />
              <img src="../../assets/imgs/radio.png" alt class="radioImg" v-else />
              <span>{{item.name}}</span>
            </div>
          </div>
        </div>
        <div class="listBox">
          <div class="courseList">
            <div class="courseItem" v-for="(item,index) in list" :key="index" @click="choice(item)">
              <img :src="item.imgUrl" alt class="top" />
              <div class="bottom">
                <div class="subTitle">{{item.courseTitle}}</div>
                <div class="price">
                  <div class="leftPrice">
                    <span class="free" v-if="item.whetherPay==0">免费</span>
                    <span class="money" v-if="item.whetherPay==1">¥{{item.coursePrice}}</span>
                  </div>
                  <div class="rightClass">{{item.classNum}}课时</div>
                </div>
              </div>
            </div>
          </div>
          <div class="pageBox" v-if="total>0">
            <div class="page">
              <p @click="changePage(1)">首页</p>
              <Page
                @on-change="changePage"
                :current="page"
                :page-size="limit"
                :total="total"
                prev-text="上一页"
                next-text="下一页"
              />
              <p @click="changePage(totalPages)">尾页</p>
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
      classCur: 0,
      contentCur: 0,
      typeCur: 0,
      moneyTypeCur: 0,
      vipType: 1,
      list: [],
      classList: [],
      conList: [],
      typeList: [
        { id: 1, name: "全部" },
        { id: 2, name: "最新" },
        { id: 3, name: "最热" }
      ],
      moneyTypeList: [
        { id: 1, name: "免费" },
        { id: 2, name: "付费" },
        { id: 3, name: "VIP" }
      ],
      page: 1,
      totalPages: 0,
      total: 0,
      limit: 10,
      title: ""
    };
  },
  created() {
    this.title = this.$route.query.title;
    this.typeCur = this.$route.query.type || 0;
    this.moneyTypeCur = this.$route.query.isPay;
    this.findClass(this.$route.query.title);
  },
  methods: {
    // 查询课程分类
    findClass(title) {
      this.$http.get("course/getCourseCategory").then(res => {
        this.classList = res.data;
        let list = res.data;
        let courList = [];
        list.forEach((item, index) => {
          item.courseContentList.forEach((i, v) => {
            courList.push(i);
          });
        });
        this.conList = courList;
        this.findListByClass(title);
      });
    },
    // 更改页码
    changePage(e) {
      this.page = e;
      this.findListByClass(this.title);
    },
    // 选择tab
    choseTab(i, index) {
      if (i == 1) {
        //
        this.classCur = index;
        if ((i = 0)) {
          let courList = [];
          list.forEach((item, index) => {
            item.courseContentList.forEach((i, v) => {
              courList.push(i);
            });
          });
          this.conList = courList;
        } else {
          this.conList = this.classList[index - 1].courseContentList;
        }
      }
      if (i == 2) {
        this.contentCur = index;
      }
      if (i == 3) {
        this.typeCur = index;
      }
      if (i == 4) {
        this.moneyTypeCur = index;
      }
      this.findListByClass(this.title);
    },
    // 分类查询
    findListByClass(key) {
      let data = {
        charge: this.moneyTypeCur,
        courseCategoryId:
          this.classCur == 0 ? "" : this.classList[this.classCur - 1].id,
        courseContentId:
          this.contentCur == 0 ? "" : this.conList[this.contentCur - 1].id,
        sortType: this.typeCur == 0 ? "" : this.typeCur - 1,
        pageSize: 10,
        pageNum: this.page,
        title: key
      };
      this.$http.post("course/pageQuery", data).then(res => {
        if (res.code == 0) {
          this.list = res.data.content;
          this.total = res.data.totalElements;
          this.totalPages = res.data.totalPages;
        }
      });
    },
    // 跳转详情
    choice(item) {
      localStorage.setItem("videoDetail", JSON.stringify(item));
      this.$router.push("/detail");
    },
    choiceType(i) {
      this.vipType = i;
    }
  }
};
</script>

<style scoped lang="less">
.content {
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
  /deep/ .ivu-page-next,
  .ivu-page-prev {
    background: rgba(0, 0, 0, 0);
  }
  margin-bottom: 80px;
  .typeBox {
    margin-bottom: 40px;
    .active {
      background: rgba(41, 178, 139, 0.2);
      border-radius: 4px;
      color: #29b28b;
      font-weight: 800;
    }
    font-family: PingFang-SC-Heavy, PingFang-SC;
    width: 1200px;
    margin: auto;
    cursor: pointer;
    .typeLine {
      display: flex;
      line-height: 34px;
      margin: 10px 0;
      height: auto;
    }
    .typeLine:first-child {
      padding-bottom: 18px;
      border-bottom: 1px solid #ebeef2;
    }
    ul {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      height: auto;
      li {
        margin: 0 20px;
        text-align: center;
        height: 34px;
        padding: 0 12px;
        line-height: 34px;
        font-size: 14px;
        font-family: PingFang-SC-Regular, PingFang-SC;
        font-weight: 400;
        color: rgba(28, 31, 33, 1);
      }
    }
    .typeTitle {
      width: 100%;
      display: inline-block;
      font-size: 14px;
      font-family: PingFang-SC-Heavy, PingFang-SC;
      font-weight: 800;
      color: rgba(7, 17, 27, 1);
      width: 76px;
      text-align: justify;
    }
  }
  .courseBox {
    width: 100%;
    border-top: 1px solid #ebeef2;
    cursor: pointer;
    .flexBox {
      width: 1200px;
      margin: 20px auto;
      .line {
        display: flex;
        align-items: center;
        ul {
          display: flex;
          font-size: 14px;
          font-family: PingFang-SC-Regular, PingFang-SC;
          font-weight: 400;
          color: rgba(28, 31, 33, 1);
          line-height: 20px;
        }
        .type {
          .active {
            background: rgba(41, 178, 139, 1);
            border-radius: 17px;
            color: #fff;
          }
          li {
            text-align: center;
            width: 76px;
            height: 34px;
            line-height: 34px;
          }
        }
        .radioBox {
          display: flex;
          font-size: 14px;
          font-family: PingFang-SC-Regular, PingFang-SC;
          font-weight: 400;
          color: rgba(28, 31, 33, 1);
          line-height: 20px;
          margin-left: 70px;
          .radioItem {
            margin: 0 20px;
          }
          .radioImg {
            vertical-align: middle;
            width: 15px;
            height: 15px;
            margin: 0 10px;
          }
        }
      }
      .courseList {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        // justify-content: space-between;
        .courseItem {
          width: 270px;
          height: 230px;
          margin-top: 40px;
          margin-right: 20px;
          img {
            display: block;
            width: 270px;
            height: 150px;
            background: #ddd;
          }
          .bottom {
            width: 100%;
            height: 60px;
            padding: 0 20px 0 8px;
            box-sizing: border-box;
            .subTitle {
              margin-top: 10px;
              font-size: 16px;
              font-family: PingFang-SC-Heavy, PingFang-SC;
              font-weight: 800;
              color: rgba(7, 17, 27, 1);
              line-height: 22px;
              width: 100%;
              height: 44px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2; /* 设置行数 */
              -webkit-box-orient: vertical;
            }
            .price {
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-top: 10px;
              .leftPrice {
                font-size: 16px;
                .free {
                  color: #3176ff;
                }
                .money {
                  color: #f83252;
                }
              }
              .rigthClass {
                color: #9199a1;
                font-size: 14px;
              }
            }
          }
        }
      }
      .pageBox {
        text-align: center;
        .page {
          cursor: pointer;
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
  }
}
</style>
