<template>
    <div class="content">
        <div class="rightContent">
            <!-- 学习记录 -->
            <div class="learningBox rightBox" v-if="leftCur==0">
                <div class="tabCar flex">
                    <div :class="{tabActive:learningCur==index}" @click="choseLearningTab(index)"
                        v-for="(item,index) in learningList" :key="index">{{item.name}}</div>
                </div>
                <div class="classList" v-if="learningCur==0">
                    <div class="classItem flex" v-for="(item,index) in list" :key="index">
                        <img class="leftImg" :src="item.courseImg" alt="">
                        <div class="rightClassTitle">
                            <div class="studyBtn" @click="goStuty(item)">继续学习</div>
                            <div class="topTitle">{{item.courseTitle}}</div>
                            <div class="validityTime flex">
                                <div class="validityTimeBox">
                                    <p>学习有效期（倒计时）</p>
                                    <p>有效期至：{{item.courseTime}}</p>
                                </div>
                                <div class="collectBox" :class="{active:item.collectStatus==1}" @click="collect(item.id,item.collectStatus)">
                                    <Icon type="md-heart" />
                                    <span>收藏</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="errorsList" v-if="learningCur==1">
                    <div class="errorsItem flex-btween" v-for="(item,index) in list" :key="index">
                        <div class="errorsTitleBox flex">
                            <span v-if="item.questionSubject && item.questionSubject.questionType==0">（单选题）</span>
                            <span v-if="item.questionSubject && item.questionSubject.questionType==1">（多选题）</span>
                            <p>{{item.questionSubject && item.questionSubject.questionTitle}} </p>
                        </div>
                        <div class="errorsBtn" @click="showDetail(index,item)">查看</div>
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
            </div>
        </div>
        <!-- 反馈弹框 -->
        <div class="model" v-show="alert1">
			<div class="alert">
                <div class="alertTitle">
                    <p>添加反馈</p>
                    <Icon type="md-close" @click="close()" />
                </div>
                <div class="alertCon">
					<Select v-model="model1" style="width:400px;margin-bottom:10px;">
						<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
                    <Input v-model="feedContent" type="textarea" :rows="8" placeholder="输入反馈内容" />
                </div>
                <div class="butBox">
                    <div class="button sure" @click="addCallInfo">确定</div>
                    <div class="button cancel" @click="close()">取消</div>
                </div>
            </div>
		</div>
        <!-- 错题详情弹框 -->
        <div class="alertMask" v-if="alert">
            <div class="alert">
                <div class="alertTitle">
                    <p>错题详情</p>
                    <Icon type="md-close" @click="closeAlert" />
                </div>
                <div class="alertCon">
                    <div>
                        <p class="title">
                            <span v-if="detail&& detail.questionSubject.questionType==0">（单选题）</span>
                            <span v-else>（双选题）</span>
                            <span>{{detail.questionSubject.questionTitle}}</span>
                        </p>
                        <div class="optionBox">
                            <div class="optionItem" v-for="(item,i) in detail.questionSubject.questionOptionList" :key="i">
                                <span class="option" v-if="item.isTrue==0"></span>
                                <img src="../../assets/imgs/clicked.png" alt="" class="clicked" v-else>
                                <span>{{item.optionContent}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="answerBox">
                        <div class="line">
                            <p class="marginRight">
                                <span class="answerTit">正确答案：</span>
                                <span class="correct">{{detail.answer}}</span>
                            </p>
                            <p>
                                <span>您的答案：</span>
                                <span class="error" v-for="(item,i) in rightOption" :key="i">{{item}}</span>
                            </p>
                        </div>
                        <div class="borderBottom">
                            <div class="line middle">
                                <p>
                                    <span class="answerTit">答案解析：</span>
                                    <p>{{detail.questionSubject.answerExplain}}</p>
                                </p>
                            </div>
                            <div class="collectionBox">
                                <div @click="collectSub()">
                                    <img src="../../assets/imgs/collection.png" alt="" v-if="!isCollect">
                                    <Icon type="md-heart"  v-if="isCollect" class="hearted"/>
                                    <span>收藏</span>
                                </div>
                                <div @click="feedback">
                                    <img src="../../assets/imgs/feedback.png" alt="">
                                    <span>反馈</span>
                                </div>
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
            leftCur: 0,
            vertical: "",
            learningList: [
                { name: "在学课程", id: 1 },
                { name: "错题本", id: 2 }
            ],
            learningCur: 0, //0-在学课程 1-错题本
            alert: false,
            list: [],
            total: 0,
            pageNum: 1,
            limit: 10,
            detail: {},
            rightOption:[],     //用户选项
            totalPages:0,
            isCollect:false,
            id:'',
            cityList: [
                    {
                        value: '0',
                        label: '错别字'
                    },
                    {
                        value: '1',
                        label: '答案错误'
                    },
                    {
                        value: '2',
                        label: '题目不完整2'
                    },
                    {
                        value: '3',
                        label: '图片不存在'
                    },
                    {
                        value: '4',
                        label: '解析错误'
                    },
                    {
                        value: '5',
                        label: '其他'
                    }
                ],
				model1: '',
                alert1: false,
                feedContent:'',
        };
    },
    created() {
        this.getList(0);
    },
    methods: {
        // 继续学习
        goStuty(item){
            this.$http.get('course/findCourse/'+item.courseId).then(res=>{
                // JSON.stringify
                localStorage.setItem('videoDetail',JSON.stringify(res.data))
                this.$router.push('/detail')
            })
        },
        study(item){
            console.log(item);
        },
        close(){
            this.alert1=false;
            this.feedContent="";
        },
        // 反馈
		feedback(item){
			this.alert1=true;
		},
        // 添加反馈
			addCallInfo(){
				let list=this.cityList;
				let cause=0;
				list.forEach(item=>{
					if(item.label==this.model1){
						cause=item.value
					}
				})
				if(this.feedContent){
					this.$http.post("feedback/add",{
						feedbackContent:this.feedContent,
						feedbackType:1,      //0-用户 1-题目
						feedbackCause:cause,
						subjectId:this.id
					}).then(res=>{
						if(res.code==0){
							this.feedContent="";
							this.alert1=false;
							this.$Message.success("添加成功！");
						}
					})
				}else{
					this.$Message.error("请填写反馈内容！");
				}
			},
        // 修改收藏
			collectSub(){
				let data={
					subjectId:this.id,
					status:!this.isCollect
				}
				this.$http.form("test/collect",data).then(res=>{
					if(res.code==0){
                        if(this.isCollect){
                            this.$Message.success("取消收藏");
                        }else{
                            this.$Message.success("收藏成功");
                        }
						this.findSubjectIsCollect(this.id);
					}
				})
			},
        // 查询题目是否收藏
			findSubjectIsCollect(id){
                this.id=id
				// let id=this.questionList[this.questionCur].id;
				this.$http.get('test/collect/'+id).then(res=>{
					if(res.code==0){
						this.isCollect=res.data
					}
				})
			},
        // 查询学习记录
        getList(type) {
            this.$http
                .post("/user/findStudyRecordIn", {
                    pageNum: this.pageNum,
                    pageSize: this.limit,
                    type: type
                }).then(res => {
                    if (res.code == 0) {
                        this.list = res.data.content;
                        this.total = res.data.totalElements;
                        this.totalPages=res.data.totalPages;
                    }
                });
        },
        // 收藏
        collect(id,status){
            // 0未收藏；1已收藏
            let type=status==0?true:false;
            this.$http.form("/user/updateCollect/class",{
                recordId:id,
                status:type
            }).then(res=>{
                console.log("收藏",res);
                if(type){
                    this.$Message.success("收藏成功");
                }else{
                    this.$Message.success("取消收藏");
                }
                this.getList(this.learningCur);
            })
        },
        onPageChange(page) {
            this.pageNum = page;
            this.getList(this.learningCur);
        },
        // 查看错题详情
        showDetail(index,item) {
            this.alert = true;
            this.detail=this.list[index];
            // 判断是否是正确答案
            for(let i=0;i<this.detail.questionSubject.questionOptionList.length;i++){
                if(this.detail.questionSubject.questionOptionList[i].isTrue==1){
                    this.rightOption.push(Number(i+1));
                }
            }
            // 下标转为选项
            this.rightOption=this.rightOption.map(ele=>{
                return String.fromCharCode(64 + parseInt(ele));
            });
            this.findSubjectIsCollect(item.subjectId)
        },
        // 学习记录选项卡
        choseLearningTab(i) {
            this.learningCur = i;
            this.list.length=0;
            this.total=0;
            this.getList(i);
        },
        // 显示弹框
        showAlert() {
            this.alert = true;
        },
        // 关闭弹框
        closeAlert() {
            this.alert = false;
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
        min-height: 600px;
        padding-bottom:20px;
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
            .classList {
                width: 100%;
                background: #fff;
                .classItem {
                    width: 100%;
                    height: 210px;
                    background: #fff;
                    padding: 0 30px;
                    box-sizing: border-box;
                    .leftImg {
                        width: 270px;
                        height: 150px;
                    }
                    .rightClassTitle {
                        padding-left: 30px;
                        box-sizing: border-box;
                        width: 630px;
                        height: 150px;
                        border-bottom: 1px solid #f0f2f5;
                        position: relative;
                        .studyBtn {
                            width: 98px;
                            height: 34px;
                            background: rgba(41, 178, 139, 1);
                            border-radius: 2px;
                            font-size: 15px;
                            color: #fff;
                            text-align: center;
                            line-height: 34px;
                            position: absolute;
                            right: 0;
                            bottom: 20px;
                            cursor: default;
                        }
                        .topTitle {
                            width: 100%;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            font-size: 16px;
                            font-weight: 600;
                        }
                        .validityTime {
                            margin-top: 55px;
                            .validityTimeBox {
                                color: #b4b6bc;
                            }
                            p {
                                margin: 10px 0;
                            }
                            .collectBox {
                                margin-top: 20px;
                                margin-left: 30px;
                                font-size: 14px;
                                color: #07111b;
                                cursor:pointer;
                                span {
                                    margin-left: 10px;
                                }
                            }
                            .collectBox.active {
                                color: #ff077a;
                            }
                        }
                    }
                }
            }
            .errorsList {
                width: 100%;
                background: #fff;
                .errorsItem {
                    width: 100%;
                    padding: 0 30px;
                    box-sizing: border-box;
                    height: 70px;
                    .errorsTitleBox {
                        font-size: 16px;
                        span {
                            color: #29b28b;
                        }
                        p {
                            color: #1c1f21;
                            font-weight: 600;
                        }
                    }
                    .errorsBtn {
                        width: 140px;
                        height: 40px;
                        border-radius: 2px;
                        border: 1px solid rgba(41, 178, 139, 1);
                        text-align: center;
                        color: rgba(41, 178, 139, 1);
                        line-height: 40px;
                        cursor: default;
                    }
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
                    cursor: pointer;
                }
                p {
                    margin: 0 20px;
                }
                margin: 50px auto;
            }
        }
    }
    .alertMask {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
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
            min-height: 400px;
            margin-top: -200px;
            margin-left: -385px;
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
                // 单选框样式
                /deep/ .ivu-radio-inner {
                    width: 20px;
                    height: 20px;
                }
                /deep/ .ivu-radio-inner:after {
                    content: "";
                    background: url("../../assets/imgs/clicked.png");
                    background-size: 100%;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    top: 0;
                    left: 0;
                    position: relative;
                }
                /deep/ .ivu-radio-group-vertical .ivu-radio-wrapper {
                    height: 45px;
                }
                padding: 10px 20px 40px;
                .title {
                    height: 26px;
                    font-size: 16px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: rgba(28, 31, 33, 1);
                    line-height: 22px;
                }
                .optionBox {
                    padding: 10px;
                    font-size: 14px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: rgba(150, 150, 150, 1);
                    .optionItem {
                        display: flex;
                        align-items: center;
                        font-size: 14px;
                        margin:10px 0;
                        .option {
                            display: block;
                            width: 20px;
                            height: 20px;
                            border-radius: 50%;
                            border: 1px solid #ddd;
                            margin-right: 4px;
                        }
                        .clicked {
                            width: 20px;
                            height: 20px;
                            margin-right: 4px;
                        }
                    }
                }
                .answerBox {
                    background: rgba(246, 248, 250, 1);
                    border-radius: 2px;
                    padding: 10px;
                    .middle {
                        border: 0 !important;
                    }
                    .borderBottom {
                        border-bottom: 1px solid #ebeef2;
                    }
                    .line {
                        display: flex;
                        padding: 8px 0;
                        border-bottom: 1px solid #ebeef2;
                        font-size: 16px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: rgba(28, 31, 33, 1);
                        line-height: 22px;
                        .title {
                            width: 30%;
                        }
                        .marginRight {
                            margin-right: 30px;
                        }
                        p {
                            display: flex;
                        }
                        .correct {
                            height: 20px;
                            font-size: 14px;
                            font-family: PingFang-SC-Heavy, PingFang-SC;
                            font-weight: 800;
                            color: rgba(28, 187, 255, 1);
                            line-height: 20px;
                        }
                        .error {
                            height: 20px;
                            font-size: 14px;
                            font-family: PingFang-SC-Heavy, PingFang-SC;
                            font-weight: 800;
                            color: rgba(255, 36, 134, 1);
                            line-height: 20px;
                        }
                        .answerTit {
                            display: block;
                            width: 80px;
                            height: 20px;
                            font-size: 14px;
                            font-family: PingFang-SC-Heavy, PingFang-SC;
                            font-weight: 800;
                            color: rgba(7, 17, 27, 1);
                            line-height: 20px;
                        }
                    }
                    .collectionBox {
                        display: flex;
                        align-items: center;
                        justify-content: flex-end;
                        font-size: 14px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: rgba(28, 31, 33, 1);
                        margin: 20px;
                        cursor:pointer;
                        .hearted{
                            color:#ff077a;
                        }
                        img {
                            width: 15px;
                            height: 15px;
                            vertical-align: middle;
                            margin: 0 10px;
                        }
                    }
                }
            }
        }
    }
    .model{
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
				display: flex;
				flex-direction: column;
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