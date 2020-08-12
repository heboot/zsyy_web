<template>
	<div class="exercise">
		<div class="exerciseBox">
			<div class="exerciseTitle">
				<div class="title flex-btween">
					<div class="leftTitle">答案结果</div>
					<div class="rightTime" v-if="type==1">总分：{{score}}分</div>
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
								<div class="answer">
                                <div class='flex Atitle'>
                                    <p>正确答案：<b v-for="(optionsItems,optionIndex) in item.questionOptionList" :key="optionIndex"><b v-if="optionsItems.isTrue">{{optionsItems.option}}</b></b></p>
                                    <p>你的答案：<b>{{myAnswer[index].answer}}</b></p>
                                </div>
                                <div class="flex analysis">
                                    <p>答案解析：</p>
                                    <div>{{item.answerExplain}}</div>
                                </div>
                                <div class="flex typeBox">
                                    <div @click="collect(item)">
                                        <Icon v-if="!isCollect" type="md-heart-outline" />
										<Icon v-if="isCollect" type="md-heart" />
                                        <span>收藏</span>
                                    </div>
                                    <div @click="feedback(item)">
                                        <Icon type="ios-create-outline" />
                                        <span>反馈</span>
                                    </div>
                                </div>
                                <div class="line"></div>
                                <div class="correlation flex">
                                    <p>相关课程：</p>
                                    <div>
                                        暂无课程
                                    </div>
                                </div>
                            </div>
                                <div class="btnBox flex-center">
                                    <div :class="{noPre:questionCur==0}" @click="previous(item,index)">上一题</div>
                                    <div :class="{noPre:questionCur+1==questionList.length}" @click="next(item,index)">下一题</div>
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
                                        <div @click="choiceQuestion(index)" class="item" v-if="item.questionType==0" :class="{none:!item.isDone,error:item.isRight==0,acive:item.isRight==1}">
                                            {{index+1}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="answerItem">
                                <div class="listTitle">多选题</div>
                                <div class="listBox flex">
                                    <div v-for="(item,index) in questionList" :key="index">
                                        <div @click="choiceQuestion(index)" class="item" :class="{none:!item.isDone,error:item.isRight==0,acive:item.isRight==1}" v-if="item.questionType==1">
                                            {{index+1}}</div>
                                    </div>
                                </div>
                            </div>
						</div>
						<div class="typeBox flex">
							<div class="type mistake flex">
								<span>正确</span>
								<div></div>
							</div>
							<div class="type correct flex">
								<span>错误</span>
								<div></div>
							</div>
                            <div class="type unfinished flex">
								<span>未答</span>
								<div></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="model" v-show="alert">
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
	</div>
</template>

<script>
	export default{
		data(){
			return {
				questionCur:0,
				questionList:[],
				myAnswer:[],
				isCollect:false,
				value:'',
				feedContent:'',
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
				alert: false,
				score:0,
				type:0
			}
		},
		mounted(){
			this.questionList=JSON.parse(localStorage.getItem('answerInfo'));
			this.type=this.$route.query.type
			if(this.type==1){
				this.myAnswer=JSON.parse(localStorage.getItem("yourAnswer")).testRecordList;
				this.score=JSON.parse(localStorage.getItem("yourAnswer")).score
				this.findTestCollect();
			}else{
				this.myAnswer=JSON.parse(localStorage.getItem("yourAnswer"));
				this.findSubjectIsCollect();
			}
			
			
		},
		created(){
			
		},
		methods:{
			close(){
				this.alert=false
				this.feedContent=""
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
						subjectId:this.questionList[this.questionCur].id
					}).then(res=>{
						if(res.code==0){
							this.feedContent="";
							this.alert=false;
							this.$Message.success("添加成功！");
						}
					})
				}else{
					this.$Message.error("请填写反馈内容！");
				}
			},
			// 修改收藏
			collect(item){
				let url=this.type==1?'test/question/collect':'test/collect'
				console.log(item);
				let data={
					subjectId:item.id,
					status:!this.isCollect
				}
				this.$http.form(url,data).then(res=>{
					if(res.code==0){
						this.isCollect?this.$Message.success("取消收藏"):this.$Message.success("收藏成功")
						this.type==1?this.findTestCollect():this.findSubjectIsCollect();
					}
				})
			},
			// 添加反馈
			addFeedback(){},
			// 反馈
			feedback(item){
				this.alert=true;
			},
			// 查询题目是否收藏
			findSubjectIsCollect(){
				let id=this.questionList[this.questionCur].id;
				this.$http.get('test/collect/'+id).then(res=>{
					if(res.code==0){
						this.isCollect=res.data
					}
				})
			},
			// 查询试卷题目是否收藏
			findTestCollect(){
				let id=this.questionList[this.questionCur].id;
				this.$http.get('test/question/collect/'+id).then(res=>{
					if(res.code==0){
						this.isCollect=res.data
					}
				})
			},
			choseAnswer(index,answerIndex,type){
				let list=this.questionList[index].list
				if(type==1){//单选
					list.map((item,i)=>{
						if(i==answerIndex){
							item.isChecked=true;
						}else{
							item.isChecked=false;
						}
					})
				}else if(type==2){
					list[answerIndex].isChecked=!list[answerIndex].isChecked
				}
				this.questionList[index].list=list;
			},
			previous(item,index){
				this.questionCur!=0?this.questionCur=index-1:this.questionCur
				this.value=""
				this.type==1?this.findTestCollect():this.findSubjectIsCollect();
			},
			next(item,index){
				this.questionCur+1<this.questionList.length?this.questionCur=index+1:this.questionCur
				this.value=""
				this.type==1?this.findTestCollect():this.findSubjectIsCollect();
				
			},
		}
	}
</script>

<style lang="less">
	body{
		background:#F5F6F6;
	}
	.exercise{
		width:100%;
		.exerciseBox{
			.exerciseTitle{
				width:100%;
				height:100px;
				background:rgba(255,255,255,1);
				.title{
					width:1200px;
					height:100%;
					margin:0 auto;
					font-size:22px;
					font-weight:600;
					.leftTitle{
						.num{
							color:#29B28B;
						}
					}
					.rightTime{
						
					}
				}
			}
			.content{
				width:1200px;
				margin:0 auto;
				align-items: flex-start;
				margin-top:20px;
				.leftQuestion{
					width:850px;
					padding:30px;
					box-sizing: border-box;
					background:#fff;
					padding:30px;
					box-sizing: border-box;
					.questionList{
						.questionTitle{
							font-size:16px;
							color:#1C1F21;
							span{
								color:#29B28B;
								margin-left:4px;
							}
						}
						.optionsItem{
							width:100%;
							height:60px;
							cursor: default;
							.btns{
								font-size:20px;
								margin-right:20px;
							}
							.checked{
								color:#29B28B;
							}
							color:#969696;
							font-size: 14px;
						}
                    }
                    .answer{
                        width:100%;
                        padding:15px;
                        box-sizing: border-box;
                        background:#F6F8FA;
                        .Atitle{
                            p{
                                margin-right:15px;
                                b{
                                    color:#1CBBFF;
                                }
                            }
                            p:last-child{
                                b{
                                    color:#FF2486;
                                }
                            }
                        }
                        .analysis{
                            align-items: flex-start;
                            margin-top:10px;
                            p{
                                width:100px;
                            }
                        }
                        .typeBox{
                            justify-content: flex-end;
                            margin-top:30px;
                            font-size:12px;
                            div{
                                margin-left:10px;
                                cursor: pointer;
                            }
                        }
                        .line{
                            width:100%;
                            height:1px;
                            background:#EBEEF2;
                            margin-top:10px;
                        }
                        .correlation{
                            margin-right:10px;
                            margin-top:10px;
                        }
                    }
					.btnBox{
						width:100%;
						div{
							width:240px;
							height:50px;
							background:#29b28b;
							border-radius:4px;
							text-align: center;
							line-height: 50px;
							font-size: 15px;
							color:#fff;
							margin:0 44px;
							margin-top:60px;
							cursor: default;
						}
						.noPre {
                     	   background: rgba(220, 220, 220, 1);
                   		}
					}
				}
				.rightAnswer{
					width:330px;
					// height:316px;
					background:rgba(255,255,255,1);
					padding:30px;
					box-sizing: border-box;
					.answerTitle{
						width:100%;
						text-align: center;
						font-size: 18px;
						font-weight: 600;
					}
					.answerList{
						border-bottom:1px solid #F0F2F5;
						padding-bottom:30px;
						.answerItem{
							width:100%;
							margin-top:20px;
							.listTitle{
								font-size: 14px;
							}
							.listBox{
								flex-wrap: wrap;
								.item{
									width:24px;
									height:24px;
									border-radius:2px;
									// border:1px solid rgba(220,224,228,1);
									text-align: center;
									line-height: 24px;
									font-size:14px;
									margin-top:10px;
                                    margin-right:8px;
                                    
                                    color:#fff;
								}
								.item.error{
									background:#FF2486;
								}
								.item.acive{
									background:#1CBBFF;
									color:#fff;
                                }
                                .item.none{
                                    background:#EEEEF2;
									color:#000;
                                }
                                .item.Awaiting{
                                    background:#29B28B;
									color:#fff;
                                }
							}
						}
                    }
                    
					.typeBox{
						width:100%;
						.type{
							margin-right:20px;
							margin-top:20px;
							div{
								width:17px;
								height:17px;
								background:rgba(41,178,139,1);
								border-radius:2px;
								margin-left:6px;
							}
						}
						.unfinished{
							div{
								background:#C8CDD0;
							}
                        }
                        .correct{
                            div{
								background:#FF2486;
							}
                            
                        }

                        .mistake{
                            div{
								background:#1CBBFF;
							}
                            
                        }
					}
				}
			}
		}
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
</style>
