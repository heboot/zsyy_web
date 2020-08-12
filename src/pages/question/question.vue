<template>
    <div class="content">
        <div class="typeBox">
            <div class="typeLine">
                <p class="typeTitle">题库状态：</p>
                <ul>
                    <li class="active">全部</li>
                </ul>
            </div>
            <div class="typeLine">
                <p class="typeTitle">更新时间：</p>
                <ul>
                    <li class="active">全部</li>
                    <li>2020</li>
                    <!-- <li>2019</li> -->
                </ul>
            </div>
        </div>
        <div class="listBox">
            <div class="list">
                <ul>
                    <li class="listItem" v-for="(item,i) in list" :key="i">
                        <div class="left">
                            <img :src="item.imgUrl" alt="">
                        </div>
                        <div class="right">
                            <div class="title">
                                <p>{{item.bankTitle}}</p>
                                <div class="time">
                                    <img src="../../assets/imgs/time.png" alt="">
                                    <span>{{item.createTime}}</span>
                                </div>
                            </div>
                            <div class="msgBox">
                                <div class="msgInfo">
                                    <div class="infoItem">
                                        <img src="../../assets/imgs/number.png" alt="">
                                        <span>题目数量&nbsp;{{item.subjectNum}}</span>
                                    </div>
                                    <div class="infoItem">
                                        <img src="../../assets/imgs/finshed.png" alt="">
                                        <span>已做数量&nbsp;{{item.countObj.haveNum}}</span>
                                    </div>
                                    <div class="infoItem">
                                        <img src="../../assets/imgs/nofinshed.png" alt="">
                                        <span>未做数量&nbsp;{{Number(item.subjectNum)-Number(item.countObj.haveNum)}}</span>
                                    </div>
                                </div>
                                <div class="button" @click="showAlert(item)">开始练习</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="pageBox" v-if="total>0">
            <div class="page">
                <p @click="onPageChange(1)">首页</p>
                <Page :total="total" :current="pageNum" :page-size="limit" prev-text="上一页" next-text="下一页"
                    @on-change="onPageChange" />
                <p @click="onPageChange(totalPages)">尾页</p>
            </div>
        </div>

        <!-- 弹框 -->
        <div class="alertMask" v-show="alert">
            <div class="alert">
                <div class="alertTitle">
                    <p>选择练习类型</p>
                    <Icon type="md-close" @click="closeAlert" />
                </div>
                <div class="alertCon">
                    <ul class="line">
                        <li class="typeTit">题目类型：</li>
                        <li class="active">选择题</li>
                    </ul>
                    <ul class="line">
                        <li class="typeTit">题目分类：</li>
                        <div class="typeBg">
                            <ul>
                                <li @click="choseClass(index,item.id)" :class="{active:item.checked}" v-for="(item,index) in classList" :key="index">{{item.categoryName}}</li>
                            </ul>
                        </div>
                    </ul>
                    <ul class="line">
                        <li class="typeTit">练习范围：</li>
                        <li :class="{active:scopeCur==0}" @click="choseScope(0)">全部({{questionCount.subjectNum}})</li>
                        <li :class="{active:scopeCur==1}" @click="choseScope(1)">已做({{questionCount.subjectHaveFinish}})</li>
                        <li :class="{active:scopeCur==2}" @click="choseScope(2)">未做({{questionCount.subjectNotDone}})</li>
                        <li :class="{active:scopeCur==3}" @click="choseScope(3)">错题({{questionCount.subjectError}})</li>
                    </ul>
                    <ul class="line">
                        <li class="typeTit">练习数量：</li>
                        <li v-for="(item,index) in countList" :key="index" @click="countCount=item" :class="{active:countCount==item}">{{item}}</li>
                    </ul>
                </div>
                <div class="begin" @click="goExercise">开始练习</div>
            </div>
        </div>
    </div>
</template>

<script>
import storage from "../../config/storage";
export default {
    inject: ["reload"],
    data() {
        return {
            alert: false,    //弹框
            total:0,
            limit:10,
            pageNum:1,
            year:"",
            list:[],
            totalPages:0,   //总页数
            classList:[],
            bank:'',
            questionCount:'',
            countList:[10,20,50],
            countCount:10,
            scopeCur:0,
            title:"",
            userQuestionBankList:[]
        };
    },
    created(){
        this.title=this.$route.query.title;
        this.getList(this.$route.query.title);
    },
    methods: {
        // 显示做题数量
        getNumber(){
            this.$http.get("/bank/queryByUser").then(res=>{
                if(res.code==0){
                    console.log(res);
                    // this.userQuestionBankList=res.data;
                    let list=this.list;
                    list.forEach(item=>{
                        res.data.forEach(i=>{
                            if(item.id==i.bankId){
                                item.countObj=i
                            }
                        })
                    })
                    console.log(list);
                    this.list=list
                    this.list.splice(0,0)
                }
            })
        },
        // 选择题库范围
        choseScope(index){
            this.scopeCur=index
        },
        // 选择选项卡
        choseClass(index,id){
            let checkedList=[];
            this.classList[index].checked=!this.classList[index].checked
            let classList=this.classList;
            classList.forEach(item=>{
                if(item.checked){
                    checkedList.push(item.id)
                }
            })
            this.findQuestionCount(checkedList)
        },
        // 根据题库条件返回对应数量和对应题目
        findQuestionCount(list){
            let data={
                categoryIds:list,
                bankId:this.bank.id
            }
            this.$http.post('test/getSubject',data).then(res=>{
                if(res.code==0){
                    this.questionCount=res.data
                }
            })
        },
        // 查询题库分类
        findQuestionBankClass(id){
            this.$http.get('test/getBankCondition/'+id).then(res=>{
                if(res.code==0){
                    let classList=res.data;
                    classList.forEach(item => {
                        item.checked=false
                    });
                    this.classList=classList
                    this.choseClass(0,classList[0].id)
                }
            })
        },
        // 跳转练习
        goExercise() {
            let count=this.countCount
            let subjectNum=this.questionCount.subjectNumList;//全部
            let subjectHaveFinish=this.questionCount.subjectHaveFinishList;//已做
            let subjectNotDone=this.questionCount.subjectNotDoneList;//未做
            let subjectError=this.questionCount.subjectErrorList;//错题
            let questList=[];
            if(this.scopeCur==0){//全部
                if(subjectNum.length!=0){
                    if(subjectNum.length>count){
                        questList=this.randomCount(subjectNum,count)
                    }else{
                        questList=subjectNum
                    }
                }else{
                    this.$Message.warning("暂无练习题，请选择其他题库")
                }
                
            }else if(this.scopeCur==1){//已做
                if(subjectHaveFinish.length!=0){
                    if(subjectHaveFinish.length>count){
                        questList=this.randomCount(subjectHaveFinish,count)
                  }
                }else{
                    this.$Message.warning("暂无练习题，请选择其他题库")
                }
            }else if(this.scopeCur==2){//未做
                if(subjectNotDone.length!=0){
                    if(subjectNotDone.length>count){
                        questList=this.randomCount(subjectNotDone,count)
                  }
                }else{
                    this.$Message.warning("暂无练习题，请选择其他题库")
                }
            }else if(this.scopeCur==3){//错题
                if(subjectError.length!=0){
                    if(subjectError.length>count){
                        questList=this.randomCount(subjectError,count)
                  }
                }else{
                    this.$Message.warning("暂无练习题，请选择其他题库")
                }
            }
            localStorage.setItem("questList",JSON.stringify(questList))
            localStorage.setItem("bank",JSON.stringify(this.bank))
            this.$router.push("/exercise");
        },
        // 获取随机数
        randomCount(list,count){
            let randomList=[];
            for(var k = 0; k<count;k++){
				var id = Math.floor(Math.random()*list.length);	 			
				if(randomList.indexOf(list[id]) === -1){
					randomList.push(list[id]);					
				}else{					
					k= k - 1;
					continue;
				}			  
            }
            return randomList
        },
        // 显示弹框
        showAlert(item) {
            if(localStorage.getItem('isLogin')){
                this.alert = true;
                this.bank=item;
                this.findQuestionBankClass(item.id)
            }else{
                this.$Message.warning("请先登录")
            }

        },
        // 关闭弹框
        closeAlert() {
            this.alert = false;
        },
        getList(key) {
            this.$http.post("/bank/pageQuery", {
                pageNum:this.pageNum,
                pageSize:this.limit,
                updateTime:this.year,
                title:key
            }).then(res=>{
                if(res.code==0){
                    this.list=res.data.content;
                    this.total = res.data.totalElements;
                    this.totalPages=res.data.totalPages;
                    if(storage.get("isLogin")){
                        this.getNumber();
                    }
                }
            })
        },
        onPageChange(page) {
            this.pageNum = page;
            this.getList(this.title);
        },
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
    /deep/ .ivu-page-next, .ivu-page-prev{
        background:rgba(0,0,0,0);
    }
    // 小图标大小
    /deep/ .ivu-icon {
        width: 12px;
        height: 12px;
    }
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
    .listBox {
        width: 100%;
        border-top: 1px solid #ebeef2;
        .list {
            width: 1200px;
            margin: auto;
            .listItem {
                margin: 30px 0;
                display: flex;
                padding: 15px;
                .left {
                    img {
                        width: 340px;
                        height: 200px;
                    }
                }
                .right {
                    width: 80%;
                    margin-left: 20px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    padding: 10px 0;
                    .title {
                        p {
                            height: 28px;
                            font-size: 20px;
                            font-family: PingFang-SC-Heavy, PingFang-SC;
                            font-weight: 800;
                            color: rgb(51, 52, 53);
                            line-height: 28px;
                        }
                        .time {
                            margin: 10px 0;
                            img {
                                width: 12px;
                                height: 12px;
                                margin-right: 5px;
                            }
                            span {
                                height: 20px;
                                font-size: 14px;
                                font-family: PingFangSC-Regular, PingFang SC;
                                font-weight: 400;
                                color: rgba(164, 166, 187, 1);
                                line-height: 20px;
                            }
                        }
                    }
                    .msgBox {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .msgInfo {
                            display: flex;
                            align-items: center;
                            .infoItem {
                                display: flex;
                                align-items: center;
                                margin-right: 35px;
                                img {
                                    width: 18px;
                                    height: 18px;
                                    vertical-align: middle;
                                    margin-right: 8px;
                                }
                                span {
                                    font-size: 14px;
                                    font-family: PingFangSC-Regular, PingFang SC;
                                    font-weight: 400;
                                    color: rgba(7, 17, 27, 1);
                                }
                            }
                        }
                        .button {
                            text-align: center;
                            width: 98px;
                            height: 34px;
                            line-height: 34px;
                            background: rgba(41, 178, 139, 1);
                            border-radius: 2px;
                            color: #fff;
                            font-size: 15px;
                            font-family: PingFangSC-Regular, PingFang SC;
                            font-weight: 400;
                            color: rgba(255, 255, 255, 1);
                            cursor: pointer;
                        }
                    }
                }
            }
            .listItem:hover {
                background: rgba(255, 255, 255, 1);
                box-shadow: 0px 0px 12px 0px rgba(15, 58, 46, 0.14);
                border: 1px solid rgba(41, 178, 139, 1);
            }
        }
    }
    .pageBox {
        text-align: center;
        .page {
            cursor:pointer;
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
    // 弹框, 弹框遮罩层
    .alertMask {
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        .alert {
            z-index: 999;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.05);
            border-radius: 5px;
            top: 50%;
            left: 50%;
            border-top: 3px solid #29b28b;
            position: absolute;
            width: 770px;
            margin-top: -200px;
            margin-left: -385px;
            .active {
                background: rgba(41, 178, 139, 0.2);
                border-radius: 4px;
                color: #29b28b;
                font-weight: 800;
            }
            .alertTitle {
                font-size: 16px;
                font-family: MicrosoftYaHei;
                color: rgba(0, 0, 0, 1);
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid #f5f5f5;
                padding: 15px;
            }
            .alertCon {
                padding: 0 20px;
                .line {
                    border-bottom: 1px solid #f5f5f5;
                    padding: 10px 0;
                    .typeBg {
                        width: 80%;
                        background: rgba(245, 248, 250, 1);
                        padding: 8px;
                        ul {
                            align-items: baseline;
                            li{
                                margin:10px;
                            }
                        }
                    }
                }
                ul {
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
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
                        cursor: pointer;
                    }
                    .typeTit {
                        height: 20px;
                        font-size: 14px;
                        font-family: PingFang-SC-Heavy, PingFang-SC;
                        font-weight: 800;
                        color: rgba(7, 17, 27, 1);
                        line-height: 20px;
                    }
                }
            }
            .begin {
                margin:30px auto;
                width: 200px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                background: rgba(41, 178, 139, 1);
                border-radius: 2px;
                color: #fff;
                font-size: 15px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                cursor: pointer;
            }
        }
    }
}
</style>