<template>
    <div class="index">
        <!-- 轮播图 -->
        <div class="bannerBox">
            <div class="userBox flex-center">
                <div class="userCenter flex-end">
                    <!-- 未登录状态显示 -->
                    <div class="userStateBox loginBox" v-if="!isLogin">
                        <div class="loginTitle">记录你的学习进度</div>
                        <img src="../../assets/imgs/index/loginPic.png" alt="">
                        <div class="loginBtn" @click="login">登录</div>
                    </div>
                    <!-- 已登录状态显示 -->
                    <div class="userStateBox userInfoBox" v-if="isLogin">
                        <div class="userTitle flex">
                            <img class="userImg" src="../../assets/imgs/index/userImg.png" alt="">
                            <div>{{userInfo.userName}}</div>
                            <!-- <img class="vipImg" src="../../assets/imgs/index/vip1.png" alt=""> -->
                        </div>
                        <div class="collectBox flex-btween">
                            <div @click="goMyCollect(0)">收藏课程<span>{{myCollectTotal}}</span></div>
                            <div @click="goMyCollect(1)">收藏题目<span>{{mySubjectTotal}}</span></div>
                        </div>
                        <!-- <div class="recommendBox">
							<div class="recommendTitle">特别推荐</div>
							<div class='recommendContent'>
								2019紫禁城国际药师论坛精彩回顾
							</div>
						</div> -->
                        <div class="classBtn" @click="goMine">学习记录</div>
                    </div>
                </div>
            </div>
            <Carousel autoplay class="banner">
                <Carousel-item v-for="(item,index) in bannerList" :key="index">
                    <div class="demo-carousel">
                        <img :src="item.imgUrl" alt="">
                    </div>
                </Carousel-item>
                <!-- <Carousel-item>
                    <div class="demo-carousel">
                        <img src="../../assets/imgs/index/banner2.png" alt="">
                    </div>
                </Carousel-item>
                <Carousel-item>
                    <div class="demo-carousel">
                        <img src="../../assets/imgs/index/banner3.png" alt="">
                    </div>
                </Carousel-item> -->
            </Carousel>
        </div>
        <!-- 最新课程 -->
        <div class="newCourse courseBox">
            <div class="flexBox">
                <div class="title flex-btween">
                    <div class="left">最新课程</div>
                    <div class="right">
                        <span @click="more(1,0)">查看更多</span>
                        <Icon type="ios-arrow-forward" />
                    </div>
                </div>
                <div class="courseList">
                    <div class="courseItem" v-for="(item,index) in list.latestCurriculum" :key="index"
                        @click="choice(item)">
                        <img :src="item.imgUrl" alt class="top" />
                        <div class="bottom">
                            <div class="subTitle">{{item.courseTitle}}</div>
                            <div class="price flex-btween">
                                <div class="leftPrice">
                                    <span class="free" v-if="item.whetherPay==0">免费</span>
                                    <span class="money" v-if="item.whetherPay==1">¥{{item.coursePrice}}</span>
                                </div>
                                <div class="rightClass">{{item.classNum}}课时</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 热门课程 -->
        <div class="hotCourse courseBox">
            <div class="flexBox">
                <div class="title flex-btween">
                    <div class="left">热门课程</div>
                    <div class="right">
                        <span @click="more(2,0)">查看更多</span>
                        <Icon type="ios-arrow-forward" />
                    </div>
                </div>
                <div class="courseList">
                    <div class="courseItem" v-for="(item,index) in list.hotCourses" :key="index" @click="choice(item)">
                        <img :src="item.imgUrl" alt class="top" />
                        <div class="bottom">
                            <div class="subTitle">{{item.courseTitle}}</div>
                            <div class="price flex-btween">
                                <div class="leftPrice">
                                    <span class="free" v-if="item.whetherPay==0">免费</span>
                                    <span class="money" v-if="item.whetherPay==1">¥{{item.coursePrice}}</span>
                                </div>
                                <div class="rightClass">{{item.classNum}}课时</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 免费课程 -->
        <div class="freeCourse courseBox">
            <div class="flexBox">
                <div class="title flex-btween">
                    <div class="left">免费课程</div>
                    <div class="right">
                        <span @click="more(0,0)">查看更多</span>
                        <Icon type="ios-arrow-forward" />
                    </div>
                </div>
                <div class="courseList">
                    <div class="courseItem" v-for="(item,index) in list.freeCourse" :key="index" @click="choice(item)">
                        <img :src="item.imgUrl" alt class="top" />
                        <div class="bottom">
                            <div class="subTitle">{{item.courseTitle }}</div>
                            <div class="price flex-btween">
                                <div class="leftPrice">
                                    <span class="free">免费</span>
                                </div>
                                <div class="rightClass">{{item.classNum}}课时</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <loginModel :loginInfo="type" @isLogin="isLoginUser" @showLogin="showLogins"></loginModel>
    </div>
</template>

<script>
import loginModel from "@/components/loginModel.vue";
export default {
    components: {
        loginModel
    },
    data() {
        return {
            value1: 0,
            showArrow: "never",
            speed: 5000,
            valueCal: 0,
            list: {}, //首页列表对象
            type: {},
            isLogin: false,
            mySubjectTotal:"",
            myCollectTotal:"",
            bannerList:[],
            userInfo:{}
        };
    },
    mounted() {
        this.isLogin = localStorage.getItem("isLogin");
        this.findList();
        this.findBanner();
        if(localStorage.getItem("isLogin")){
            this.myCollect();
            this.mySubject();
            this.userInfo=JSON.parse(localStorage.getItem("userInfo"))
        }
        
    },
    methods: {
        // 跳转我的收藏
        goMyCollect(index){
            this.$router.push({path:'/myCollection',query:{index:index}})
        },
        // 查询轮播图
        findBanner(){
            this.$http.get('banner/query').then(res=>{
                if(res.code==0){
                    this.bannerList=res.data
                }
            })
        },
        // 我收藏的课程总数
        myCollect() {
            this.$http
                .post("/user/findCollect", {
                    pageNum: 1,
                    pageSize: 10,
                    collectType:0
                })
                .then(res => {
                    if (res.code == 0) {
                        this.myCollectTotal = res.data.totalElements;
                    }
                });
        },
        // 我收藏的题库总数
        mySubject(){
            this.$http
                .post("/user/findCollect", {
                    pageNum: 1,
                    pageSize: 10,
                    collectType:1
                })
                .then(res => {
                    if (res.code == 0) {
                        this.mySubjectTotal = res.data.totalElements;
                    }
                });
        },
        more(type, isPay) {
            this.$router.push({
                path: "/course",
                query: { type: type, isPay: isPay }
            });
        },
        isLoginUser(data) {
            this.isLogin = data;
        },
        showLogins(data) {
            this.type = {
                loginCur: data,
                showModel: true
            };
        },
        // 查询首页列表
        findList() {
            this.$http.get("course/homePage").then(res => {
                if (res.code == 0) {
                    this.list = res.data;
                }
            });
        },
        // 跳转我的
        goMine() {
            this.$router.push("/learningRecords");
        },
        // 跳转详情
        choice(item) {
            localStorage.setItem("videoDetail", JSON.stringify(item));
            this.$router.push("/detail");
        },
        login() {
            this.showLogins(0);
        }
    }
};
</script>

<style scoped lang="less">
// iview轮播组件样式更改
/deep/ .ivu-carousel-arrow {
    display: none;
}
.index {
    .bannerBox {
        width: 100%;
        height: 500px;
        position: relative;
        .userBox {
            width: 100%;
            height: 100%;
            margin: 0 auto;
            position: absolute;
            z-index: 99;
            left: 0;
            top: 0;
            .userCenter {
                width: 1200px;
                height: 100%;
                .userStateBox {
                    width: 230px;
                    height: 270px;
                    background: rgba(255, 255, 255, 1);
                    border-radius: 2px;
                    margin: 0 45px;
                    padding: 20px;
                    box-sizing: border-box;
                }
                .loginBox {
                    .loginTitle {
                        text-align: center;
                    }
                    img {
                        width: 162px;
                        height: 116px;
                        display: block;
                        margin: 0 auto;
                        margin-top: 25px;
                    }
                    .loginBtn {
                        width: 100%;
                        height: 40px;
                        background: #29b28b;
                        text-align: center;
                        line-height: 40px;
                        color: #fff;
                        border-radius: 2px;
                        font-size: 15px;
                        cursor: default;
                        margin-top: 30px;
                    }
                }
                .userInfoBox {
                    .userTitle {
                        .userImg {
                            width: 42px;
                            height: 42px;
                            border-radius: 50%;
                        }
                        div {
                            max-width: 100px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            font-size: 14px;
                            margin-left: 10px;
                        }
                        .vipImg {
                            width: 18px;
                            height: 18px;
                            margin-left: 10px;
                        }
                    }
                    .collectBox {
                        width: 100%;
                        height: 48px;
                        border-bottom: 1px solid #ddd;
                        cursor: pointer;
                        // margin-top:10px;
                    }
                    .recommendBox {
                        margin-top: 15px;
                        .recommendTitle {
                            width: 56px;
                            height: 18px;
                            background: linear-gradient(
                                135deg,
                                rgba(255, 168, 143, 1) 0%,
                                rgba(251, 84, 106, 1) 100%
                            );
                            border-radius: 2px;
                            color: #fff;
                            text-align: center;
                            line-height: 18px;
                            font-size: 12px;
                        }
                        .recommendContent {
                            margin-top: 8px;
                            width: 100%;
                            height: 40px;
                            font-size: 14px;
                            font-family: PingFangSC-Regular, PingFang SC;
                            font-weight: 400;
                            color: rgba(102, 102, 102, 1);
                            line-height: 20px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 2; /* 设置行数 */
                            -webkit-box-orient: vertical;
                        }
                    }
                    .classBtn {
                        width: 100%;
                        height: 40px;
                        background: #29b28b;
                        border-radius: 2px;
                        font-size: 15px;
                        text-align: center;
                        line-height: 40px;
                        color: #fff;
                        margin-top: 20px;
                        cursor: default;
                        margin-top: 40px;
                    }
                }
            }
        }
        .banner {
            width: 100%;
            height: 100%;
            text-align: center;
            .demo-carousel {
                width: 100%;
                height: 500px;
            }
            .demo-carousel img {
                width: 100%;
                height: 100%;
            }
        }
    }
    .courseBox {
        width: 100%;
        // height: 660px;
        background: #fff;
        .flexBox {
            width: 1200px;
            height: 100%;
            padding: 40px 0;
            box-sizing: border-box;
            margin: 0 auto;
            .title {
                font-size: 24px;
                .right {
                    font-size: 14px;
                    color: #29b28b;
                    cursor: pointer;
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
                    // background:#ddd;
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
        }
    }
    .hotCourse {
        background: #eceff2;
    }
}
</style>