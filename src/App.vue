<template>
    <div id="app">
        <!-- 头部 -->
        <header>
            <div class="header">
                <div>
                    <router-link to="/">
                        <img src="./assets/imgs/index/logo.png" mode="widthFix" alt class="logo" />
                    </router-link>
                    <nav>
                        <router-link to="/" :class="routeName=='index'?'active':''">首页</router-link>
                        <router-link to="/course" :class="routeName=='course'?'active':''">课程</router-link>
                        <router-link to="/question" :class="routeName=='question'?'active':''">题库</router-link>
                        <router-link to="/testPaper" :class="routeName=='testPaper'?'active':''">试卷</router-link>
                    </nav>
                </div>
                <div>
                    <div class="searchBox">
                        <div class="search">
                            <div class="left">
                                <div class="select" @click="showSelect">
                                    <span>{{selectItem}}</span>
                                    <img src="./assets/imgs/index/down.png" alt />
                                </div>
                                <input type="text" placeholder="请输入要查找的内容" v-model="searchKey"/>
                                <img src="./assets/imgs/index/clear.png" alt class="clear" v-show="searchKey"
                                    @click="searchKey=''" />
                            </div>
                            <div class="searchImg" @click="searchList">
                                <img src="./assets/imgs/index/search.png" alt />
                            </div>
                        </div>
                        <!-- 下拉内容 -->
                        <div class="selectContent" v-show="selectShow">
                            <ul>
                                <li :class="{active:itemType==0}" @click="clickType(0)">课程</li>
                                <li :class="{active:itemType==1}" @click="clickType(1)">题库</li>
                            </ul>
                        </div>
                        <!-- 历史搜索内容 -->
                        <div class="historyContent" v-show="historyShow">
                            <div class="content">
                                <span>历史搜索</span>
                                <ul>
                                    <li>中药</li>
                                    <li>河豚健康科普三堂课</li>
                                    <li>中药</li>
                                    <li>河豚健康科普三堂课</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- 未登录 -->
                    <div class="login" v-if="!isLogin">
                        <span @click='showLoginModel(0)'>登录</span>
                        <span @click='showLoginModel(1)'>注册</span>
                    </div>
                    <!-- 已登录 -->
                    <div class="logined" v-else>
                        <div class="msgBox">
                            <router-link to="/notice">
                                <img src="./assets/imgs/index/msg.png" alt />
                            </router-link>
                        </div>
                        <div class="userBox">
                            <Dropdown>
                                <a href="javascript:void(0)" style="color:#000">
                                    <div @click="showLogin">
                                        <img :src="userInfo.headUrl==null?'./assets/imgs/index/userImg.png':userInfo.headUrl" alt class="userImg" />
                                        <span>{{userInfo.userName==null?useInfo.mobilePhone:userInfo.userName}}</span>
                                    </div>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem  @click.native="goOther(item)" v-for="(item,index) in mainList" :key="index">{{item.name}}</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            <!-- <div @click="showLogin">
                                <img :src="userInfo.headUrl==null?'./assets/imgs/index/userImg.png':userInfo.headUrl" alt class="userImg" />
                                <span>{{userInfo.userName==null?useInfo.mobilePhone:userInfo.userName}}</span>
                            </div> -->
                            <!-- <div class="loginList" v-show="showLoginList">
                                <ul>
                                    <li :class="{active:routeName=='learningRecords'}" @click="closeLoginList">
                                        <router-link to="/learningRecords">学习记录</router-link>
                                    </li>
                                    <li :class="{active:routeName=='myCollection'}" @click="closeLoginList">
                                        <router-link to="/myCollection">我的收藏</router-link>
                                    </li>
                                    <li class="line" :class="{active:routeName=='tasks'}" @click="closeLoginList">
                                        <router-link to="/tasks">学习任务</router-link>
                                    </li>
                                    <li :class="{active:routeName=='myOrder'}" @click="closeLoginList">
                                        <router-link to="/myOrder">我的订单</router-link>
                                    </li>
                                    <li :class="{active:routeName=='memberMgt'}" @click="closeLoginList">
                                        <router-link to="/memberMgt">会员管理</router-link>
                                    </li>
                                    <li class="line" :class="{active:routeName=='certification'}"
                                        @click="closeLoginList">
                                        <router-link to="/certification">职业认证</router-link>
                                    </li>
                                    <li :class="{active:routeName=='setting'}" @click="closeLoginList">
                                        <router-link to="/setting">个人设置</router-link>
                                    </li>
                                    <li class="line" :class="{active:routeName=='feedback'}" @click="closeLoginList">
                                        <router-link to="/feedback">我的反馈</router-link>
                                    </li>
                                    <li @click="loginOut">
                                        <router-link to="/">退出登录</router-link>
                                    </li>
                                </ul>
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <!--内容-->
        <section>
            <router-view v-if="isRouterAlive"></router-view>
        </section>
        <!-- 底部 -->
        <footer>
            <div class="footer">
                <p>友情链接</p>
                <div class="footContents">
                    <ul>
                        <li>
                            <router-link to="/">中国健康促进基金会</router-link>
                        </li>
                        <li>
                            <router-link to="/">国家卫生健康委员会</router-link>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <router-link to="/">MKM医药知识管理专项基金</router-link>
                        </li>
                        <li>
                            <router-link to="/">美国卫生系统药师协会</router-link>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <router-link to="/">马博士健康在线</router-link>
                        </li>
                        <li>
                            <router-link to="/">日本病院药剂师会</router-link>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <router-link to="/">国家食品药品监督管理总局</router-link>
                        </li>
                    </ul>
                </div>
                <div class="bottom">
                    <span>Copyright © 2019 Careal. All Rights Reserved.</span>
                    <ul class="bottomMsg">
                        <li>
                            <router-link to="/">关于我们</router-link>
                        </li>
                        <li>
                            <router-link to="/">常见问题</router-link>
                        </li>
                        <li>
                            <router-link to="/">联系我们</router-link>
                        </li>
                        <li>
                            <router-link to="/">浏览器下载</router-link>
                        </li>
                        <li>
                            <router-link to="/">京ICP备09093936号-2</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
        <loginModel :loginInfo="type" @isLogin="isLoginUser" @showLogin="showLogins"></loginModel>

    </div>
</template>

<script>
import loginModel from '@/components/loginModel.vue'
export default {
    provide(){
        return{
            reload:this.reload
        }
    },
    name: "App",
    components:{
        loginModel
    },
    data() {
        return {
            selectItem:"课程",
            itemType:0,
            isRouterAlive: true,
            showLoginList: false, //显示用户列表
            selectShow: false, //头部下拉框内容
            historyShow: false, //历史搜索内容
            nologin: false, //登录状态
            routeName: "/", //当前路由
            searchKey: "", //搜索关键字
            showModel: false,
            loginCur: 0,
            checked: true,
            checkUrl: require("./assets/imgs/index/loginCheck.png"),
            checkAUrl: require("./assets/imgs/index/loginCheckA.png"),
            login: true,
            wait_timer:false,
            verContent:'',
            type:{},
            isLogin:false,
            userInfo:'',
            mainList:[
                {value:0,url:'/learningRecords',name:'学习记录'},
                {value:1,url:'/myCollection',name:'我的收藏'},
                // {value:2,url:'/tasks',name:'学习任务'},
                // {value:3,url:'/myOrder',name:'我的订单'},
                // {value:4,url:'/memberMgt',name:'会员管理'},
                // {value:5,url:'/certification',name:'职业认证'},
                {value:6,url:'/setting',name:'个人设置'},
                {value:7,url:'/feedback',name:'我的反馈'},
                {value:8,url:'/',name:'退出登录'},
            ],
        };
    },
    created() {
        if(localStorage.getItem("isLogin")){
            
            this.isLogin=localStorage.getItem("isLogin");
            this.userInfo=JSON.parse(localStorage.getItem("userInfo"))
            console.log(this.userInfo);
        }
    },
    methods: {
        goOther(item){
            if(item.name=="退出登录"){
                this.loginOut();
            }else{
                this.$router.push(item.url)
            }
            
        },
        mouseLeave(){
            this.showLoginList=false

        },
        mouseOver(){
            this.showLoginList=true
        },
        loginOut(){
            localStorage.clear();
            location.reload();
            this.$router.push("/");
        },
        // 搜索
        searchList(){
            this.reload();
            // 搜课程
            if(this.itemType==0){
                this.$router.push({name:"course",query:{title:this.searchKey}})
            }else{
                this.$router.push({name:"question",query:{title:this.searchKey}})
            }
        },
        // 选择搜索类型
        clickType(type){
            this.itemType=type;
            this.selectShow=false;
            this.selectItem=type==0?"课程":"题库";
        },
        isLoginUser(data){
            this.isLogin=data.isLogin;
            this.userInfo=data.userInfo
        },
        showLoginModel(i){
            this.showLogins(i)
        },
        showLogins(data){
            this.type={
                loginCur:data,
                showModel:true
            }
        },
        closeLoginList() {
            this.showLoginList = false;
        },
        // 找回密码
        backPassword() {
            this.login = false;
        },
        // 关闭弹出层
        close() {
            this.showModel = false;
        },
        // 返回上层
        back() {
            this.login = true;
        },
        // 刷新渲染数据
        reload() {
            this.isRouterAlive = false;
            this.$nextTick(function() {
                this.isRouterAlive = true;
            });
        },
        // 点击打开选择框
        showSelect() {
            this.selectShow = !this.selectShow;
        },
        clickInput() {
            this.historyShow = true;
        },
        hideHistory() {
            this.historyShow = false;
        },
        showLogin() {
            this.showLoginList = !this.showLoginList;
        }
    },
    // 监听当前路由
    watch: {
        $route(to, from) {
            if(this.$route.name=="course"){
                this.itemType=0;
                this.selectItem="课程";
            }
            if(this.$route.name=="question"){
                this.itemType=1;
                this.selectItem="题库";
            }
            if(this.$route.name=="index"){
                this.itemType=0;
                this.selectItem="课程";
            }
            // this.searchKey="";
            this.routeName = this.$route.name;
        }
    }
};
</script>

<style lang="less">
// 公共样式
html,
body {
    height: 100%;
    margin: 0;
    padding: 0;
    font-size: 15px;
    font-family: "PingFang-SC-Medium,PingFang-SC;";
}
a {
    text-decoration: none;
    color: #333333;
}
ul > li {
    list-style: none;
}
ul {
    margin: 0;
    padding: 0;
}
input {
    border: 0;
}
::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
}
.flex-btween {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.flex {
    display: flex;
    align-items: center;
}
.flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
}
.flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
}
.flex-end {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
// 弹框
.model {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9;
}
#app {
    width: 100%;
    // 头部
    header {
        box-shadow: 0px 6px 12px 0px rgba(24, 31, 29, 0.08);
        background: rgba(255, 255, 255, 1);
        height: 78px;
        line-height: 78px;
        // padding: 0 15%;
        .header {
            width: 1200px;
            margin: auto;
            display: flex;
            justify-content: space-between;
        }
        div,
        nav {
            display: inline-block;
        }
        .logo {
            // width:92px;
            height: 64px;
            border-radius: 50%;
            margin-right: 94px;
            vertical-align: middle;
        }
        nav {
            a {
                display: inline-block;
                width: 94px;
                height: 78px;
                text-align: center;
                color: #333;
            }
            a.active {
                background: #29b28b;
                color: #ffffff;
            }
        }
        .searchBox {
            border: 1px solid #29b28b;
            width: 350px;
            height: 50px;
            line-height: 50px;
            vertical-align: middle;
            box-shadow: 0px 6px 12px 0px rgba(24, 31, 29, 0.08);
            border-radius: 4px;
            position: relative;
            .search {
                display: flex;
                .left {
                    width: 300px;
                    display: flex;
                    align-items: center;
                    position: relative;
                    .clear {
                        position: absolute;
                        right: 0;
                        top: 10px;
                    }
                    .select {
                        cursor: pointer;
                        width: 64px;
                        text-align: center;
                        border-right: 1px solid rgba(230, 235, 240, 1);
                        img {
                            width: 18px;
                            height: 18px;
                            display: inline-block;
                            vertical-align: middle;
                        }
                    }
                    input {
                        height: 46px;
                        padding: 0 0 0 10px;
                        border: 0;
                        outline: none;
                        caret-color: #29b28b;
                        font-size: 14px;
                        ::placeholder {
                            color: rgba(180, 180, 180, 1);
                            line-height: 20px;
                            text-shadow: 0px 6px 12px rgba(24, 31, 29, 0.08);
                        }
                    }
                }
                .searchImg {
                    cursor: pointer;
                    border-radius: 0 4px 4px 0;
                    text-align: center;
                    width: 50px;
                    height: 50px;
                    background: rgba(41, 178, 139, 1);
                    box-shadow: 0px 6px 12px 0px rgba(24, 31, 29, 0.08);
                    border-radius: 0px 4px 4px 0px;
                    img {
                        vertical-align: middle;
                    }
                }
            }
            .selectContent {
                z-index: 999;
                position: absolute;
                top: 55px;
                cursor: pointer;
                ul {
                    height:100px;
                    li {
                        margin: 5px 0;
                        height: 40px;
                        line-height: 40px;
                    }
                    .active {
                        color: #29b28b;
                    }
                }
                width: 64px;
                height:100px;
                text-align: center;
                background: rgba(255, 255, 255, 1);
                box-shadow: 0px 4px 8px 8px rgba(24, 31, 29, 0.08);
                border-radius: 2px;
            }
            .historyContent {
                z-index: 999;
                position: absolute;
                top: 55px;
                width: 350px;
                height: 230px;
                background: rgba(255, 255, 255, 1);
                box-shadow: 0px 4px 8px 8px rgba(24, 31, 29, 0.08);
                border-radius: 2px;
                .content {
                    span {
                        margin: 20px;
                        width: 48px;
                        height: 17px;
                        font-size: 12px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: rgba(162, 162, 162, 1);
                        line-height: 17px;
                    }
                    ul {
                        margin: 0 20px;
                        li {
                            height: 40px;
                        }
                    }
                }
            }
        }
        .login {
            margin-left: 57px;
            width: 117px;
            height: 20px;
            font-size: 14px;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            line-height: 20px;
            cursor: pointer;
            :first-child::after {
                content: "|";
                padding: 20px;
            }
        }
        .logined {
            margin-left: 24px;
            .msgBox {
                img {
                    width: 20px;
                    vertical-align: middle;
                }
            }
            .userImg {
                width: 42px;
                height: 42px;
                border-radius: 50%;
                margin: 0 12px 0 28px;
                vertical-align: middle;
            }
            .userBox {
                position: relative;
                cursor: pointer;
            }
            .loginList {
                z-index: 999;
                position: absolute;
                top: 70px;
                left: 10px;
                width: 138px;
                // height: 412px;
                height:250px;
                background: rgba(255, 255, 255, 1);
                box-shadow: 0px 4px 8px 8px rgba(24, 31, 29, 0.08);
                border-radius: 2px;
                ul {
                    padding: 20px 16px;
                }
                li {
                    height: 40px;
                    line-height: 40px;
                    font-size: 14px;
                    font-weight: 400;
                    color: rgba(51, 51, 51, 1);
                    a {
                        color: #333;
                    }
                }
                li.active a {
                    color: #29b28b;
                }
                .line {
                    border-bottom: 1px solid #ebeef2;
                    margin: 4px 0;
                }
            }
        }
    }
    // 内容
    section {
        min-height: 800px;
    }
    // 底部
    footer {
        background: #020713;
        height: 400px;
        color: #fff;
        padding: 0 360px;
        padding: 0 10%;
        .footer {
            width: 1200px;
            margin: 0 auto;
        }
        p {
            padding: 49px 0;
            font-size: 22px;
            margin: 0;
        }
        .footContents {
            border-bottom: 1px solid #fff;
            margin-bottom: 47px;
            ul {
                display: inline-block;
                margin: 0 110px 41px 0;
            }
            li {
                font-size: 14px;
                height: 42px;
                line-height: 42px;
            }
            a {
                color: #fff;
            }
        }
        .bottom {
            text-align: center;
            .bottomMsg {
                margin-top: 20px;
                a {
                    color: #fff;
                }
                li {
                    display: inline-block;
                }
                li::after {
                    content: "|";
                    padding: 0 20px;
                }
                li:last-child::after {
                    content: "";
                }
            }
        }
    }
}
</style>
