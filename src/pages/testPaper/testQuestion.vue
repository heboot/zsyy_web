<template>
    <div class="exercise">
        <div class="exerciseBox">
            <div class="exerciseTitle">
                <div class="title flex-btween">
                    <div class="leftTitle">
                        {{bank.testTitle}}
                       <br/>
                        <span class="num">{{questionCur+1}}</span><span></span>/{{questionList.length}}</span> <span v-if="bank.testTime==null">(请在{{countDownStr}}内完成答题，超时后自动提交试卷)</span></div>
                    <div class="rightTime">{{timeStr}}</div>
                </div>
                <div class="content flex-btween">
                    <div class="leftQuestion">
                        <div v-for="(item,index) in questionList" :key="index">
                            <div class="questionList" v-if="questionCur==index">
                                <div class="questionTitle">
                                    <span>{{index+1}}</span>.（{{item.questionType==0?'单选题':'多选题'}}）{{item.questionTitle}}<span>
                                        {{item.questionValue}}分</span></div>
                                <div class="optionsList">
                                    <div class="optionsItem flex"
                                        @click="choseAnswer(index,answerIndex,item.questionType)"
                                        v-for="(answerItem,answerIndex) in item.questionOptionList" :key="answerIndex">
                                        <div>
                                            <Icon type="ios-checkmark-circle" v-if="answerItem.isChecked"
                                                class="btns checked" />
                                            <Icon type="ios-checkmark-circle-outline" v-if="!answerItem.isChecked"
                                                class="btns" />
                                        </div>
                                        <div>{{answerItem.optionContent}}</div>
                                    </div>
                                </div>
                                <div class="btnBox flex-center">
                                    <div :class="{noPre:questionCur==0}" @click="previous(index)">上一题</div>
                                    <div v-if="questionCur+1!=questionList.length" @click="next(index)">下一题</div>
                                    <div @click="submit" v-if="questionCur+1==questionList.length">提交</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="rightAnswer">
                        <div class="answerTitle">答题卡</div>
                        <div class="answerList">
                            <div class="answerItem">
                                <div class="listTitle">单选题</div>
                                <div class="listBox flex">
                                    <div v-for="(item,index) in questionList" :key="index">
                                        <div @click="choiceQuestion(index)" class="item" v-if="item.questionType==0" :class="{acive:item.isDone,active:questionCur==index}">
                                            {{index+1}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="answerItem">
                                <div class="listTitle">多选题</div>
                                <div class="listBox flex">
                                    <div v-for="(item,index) in questionList" :key="index">
                                        <div @click="choiceQuestion(index)" class="item" :class="{acive:item.isDone,active:questionCur==index}" v-if="item.questionType==1">
                                            {{index+1}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="typeBox flex">
                            <div class="type flex">
                                <span>已做</span>
                                <div></div>
                            </div>
                            <div class="type unfinished flex">
                                <span>未做</span>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import storage from "../../config/storage";
import {getSeconds} from "../../util/timeUitl";
export default {
    data() {
        return {
            questionCur: 0,
            questionList: [],
            bank: "",
            timeStr:"",
            h: 0, //定义时，分，秒，毫秒并初始化为0；
            m: 0,
            ms: 0,
            s: 0,
            time: 0,
            score:0,
            countDown:-1,
            countDownStr:""
        };
    },
    mounted(){
        this.findQuestion();
        this.start();
        this.s =Number(storage.get("currentS") == null?0:storage.get("currentS"));
        if(storage.get("countDown") != null){
            this.countDown = Number(storage.get("countDown"))
        }
    },
    created() {
        
    },
    destroyed(){
        clearInterval(this.time);
        storage.remove("currentS")
        storage.remove("countDown")
    },
    methods: {
        // 选择对于题目
        choiceQuestion(index){
            this.questionCur=index
        },
        //开始
        start() {
            this.time = setInterval(this.timer, 1000);
        },
        // 计时器
        timer() {
            
            this.s = Number(this.s + 1); //秒
            storage.set("currentS",this.s)
            this.timeStr = getSeconds(this.s);
            if(this.countDown!= null && this.countDown > 0){
                this.countDown = this.countDown-1;
                this.countDownStr =  getSeconds(this.countDown);
            }else if(this.countDown != null && this.countDown ==0){
                clearInterval(this.time);
                this.$Message.info("答卷时间超时，自动交卷");
                this.submitAnswer();
            }
             storage.set("countDown",this.countDown)
        },
        //补0操作
        toDub(n) {
            if (n < 10) {
                return "0" + n;
            } else {
                return "" + n;
            }
        },
        // 获取题库
        findQuestion() {
            this.bank = JSON.parse(localStorage.getItem("testQuestList"));
            this.countDown = 1 * 15;
            let questionList = JSON.parse(localStorage.getItem("testQuestList")).questionSubjects
            console.log(JSON.parse(localStorage.getItem("testQuestList")).id);
            questionList.forEach(item => {
                item.isDone = false;
                item.isRight = 0;
                item.questionOptionList.forEach((i,l) => { 
                    i.isChecked = false;
                    i.option=String.fromCharCode(64 + parseInt(l+1));
                });
            });
            this.questionList = questionList;
        },
        // 提交答案
        submit() {
            let list=this.questionList;
            let doneList=[];
            list.forEach(item=>{
                if(item.isDone){
                    doneList.push(item)
                }
            })
            if(doneList.length==list.length){
                this.$Modal.confirm({
                    title: "提示",
                    content: "确认提交答案吗",
                    onOk: () => {
                        this.submitAnswer();
                    },
                    onCancel: () => {
                        this.$Message.info("取消提交");
                    }
                });
            }else{
                this.$Modal.confirm({
                    title: "提示",
                    content: "答题未做完，是否继续提交",
                    onOk: () => {
                        this.submitAnswer();
                    },
                    onCancel: () => {
                        this.$Message.info("取消提交");
                    }
                });
            }
            
        },
        // 提交答案
        submitAnswer(){
            let answerList=[];
            let list=this.questionList;
            list.forEach(item=>{
                let answerObj={
                    userId:JSON.parse(localStorage.getItem("userInfo")).id,
                    bankId:JSON.parse(localStorage.getItem("testQuestList")).id,
                    subjectId:item.id,
                    answer:'',
                    caseResult:item.isRight,
                    collectStatus:0
                };
                let checkedList=[];
                item.questionOptionList.forEach(i=>{
                    if(i.isChecked){
                        checkedList.push(i.option)
                    }
                    answerObj.answer=checkedList.join(',');
                })
                answerList.push(answerObj)
            });
            let answer={
                testId:JSON.parse(localStorage.getItem("testQuestList")).id,
                score:this.score,
                testRecordList:answerList
            }
            console.log(answer);
            this.saveAnswer(answer)
        },
        // 提交答案
        saveAnswer(answer){
            this.$http.post('test/question/saveTestRecord',answer).then(res=>{
                if(res.code==0){
                    this.$Message.info("提交成功");
                    localStorage.setItem('answerInfo',JSON.stringify(this.questionList));
                    localStorage.setItem("yourAnswer",JSON.stringify(answer))
                    this.$router.push({ path: "/answer", query: { type: 1 } });
                }
            })
        },
        // 选择答案
        choseAnswer(index, answerIndex, type) {
            let list = this.questionList[index].questionOptionList;
            if (type == 0) {
                //单选
                list.map((item, i) => {
                    if (i == answerIndex) {
                        item.isChecked = true;
                        this.questionList[index].isDone = true;
                        if (item.isTrue == 1) {
                            this.questionList[index].isRight = 1;
                            this.score+=this.questionList[index].questionValue;
                        } else {
                            this.questionList[index].isRight = 0;
                        }
                    } else {
                        item.isChecked = false;
                    }
                });
            } else if (type == 1) {
                list[answerIndex].isChecked = !list[answerIndex].isChecked;
                let checkedList=[];
                let trueList=[];
                list.forEach(item => {
                    if(item.isChecked){
                        checkedList.push(item)
                    }
                    if(item.isTrue==1){
                        trueList.push(item)
                    }
                });
                if(checkedList.length>0){
                    this.questionList[index].isDone = true;
                }else{
                    this.questionList[index].isDone = false;
                }
                if(checkedList.length==trueList.length){
                    let checkedTrueList=[]
                    checkedList.forEach(checkedItem=>{
                        trueList.forEach(trueItem=>{
                            if(checkedItem.id==trueItem.id){
                                checkedTrueList.push(checkedItem);
                            }
                        })
                    })
                    if(checkedTrueList.length==trueList.length){
                        this.questionList[index].isRight=1;
                        this.score+=this.questionList[index].questionValue;
                    }
                    
                }else{
                    this.questionList[index].isRight=0;
                }
            }
            this.questionList[index].questionOptionList = list;
        },
        previous(index) {
            this.questionCur != 0
                ? (this.questionCur = index - 1)
                : this.questionCur;
        },
        next(index) {
            this.questionCur + 1 < this.questionList.length
                ? (this.questionCur = index + 1)
                : this.questionCur;
        }
    }
};
</script>

<style lang="less">
body {
    background: #f5f6f6;
}
.exercise {
    width: 100%;
    .exerciseBox {
        .exerciseTitle {
            width: 100%;
            height: 100px;
            background: rgba(255, 255, 255, 1);
            .title {
                width: 1200px;
                height: 100%;
                margin: 0 auto;
                font-size: 22px;
                font-weight: 600;
                .leftTitle {
                    .num {
                        color: #29b28b;
                    }
                }
                .rightTime {
                }
            }
        }
        .content {
            width: 1200px;
            margin: 0 auto;
            align-items: flex-start;
            margin-top: 20px;
            .leftQuestion {
                width: 850px;
                padding: 30px;
                box-sizing: border-box;
                background: #fff;
                padding: 30px;
                box-sizing: border-box;
                .questionList {
                    .questionTitle {
                        font-size: 16px;
                        color: #1c1f21;
                        span {
                            color: #29b28b;
                            margin-left: 4px;
                        }
                    }
                    .optionsItem {
                        width: 100%;
                        height: 60px;
                        cursor: default;
                        .btns {
                            font-size: 20px;
                            margin-right: 20px;
                        }
                        .checked {
                            color: #29b28b;
                        }
                        color: #969696;
                        font-size: 14px;
                    }
                }
                .btnBox {
                    width: 100%;
                    div {
                        width: 240px;
                        height: 50px;
                        background: #29b28b;
                        border-radius: 4px;
                        text-align: center;
                        line-height: 50px;
                        font-size: 15px;
                        color: #fff;
                        margin: 0 44px;
                        margin-top: 60px;
                        cursor: pointer;
                    }
                    .noPre {
                        background: rgba(220, 220, 220, 1);
                    }
                }
            }
            .rightAnswer {
                width: 330px;
                // height:316px;
                background: rgba(255, 255, 255, 1);
                padding: 30px;
                box-sizing: border-box;
                .answerTitle {
                    width: 100%;
                    text-align: center;
                    font-size: 18px;
                    font-weight: 600;
                }
                .answerList {
                    border-bottom: 1px solid #f0f2f5;
                    padding-bottom: 30px;
                    .answerItem {
                        width: 100%;
                        margin-top: 20px;
                        .listTitle {
                            font-size: 14px;
                        }
                        .listBox {
                            flex-wrap: wrap;
                            .item {
                                cursor: pointer;
                                width: 24px;
                                height: 24px;
                                border-radius: 2px;
                                border: 1px solid rgba(220, 224, 228, 1);
                                text-align: center;
                                line-height: 24px;
                                font-size: 14px;
                                margin-top: 10px;
                                margin-right: 8px;
                            }
                            .item.active{
                                border:1px solid #29b28b;
                            }
                            .item.acive {
                                background: #29b28b;
                                color: #fff;
                            }
                        }
                    }
                }
                .typeBox {
                    width: 100%;
                    .type {
                        margin-right: 20px;
                        margin-top: 20px;
                        div {
                            width: 17px;
                            height: 17px;
                            background: rgba(41, 178, 139, 1);
                            border-radius: 2px;
                            margin-left: 6px;
                        }
                    }
                    .unfinished {
                        div {
                            background: #c8cdd0;
                        }
                    }
                }
            }
        }
    }
}
</style>
