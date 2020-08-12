<template>
    <div class="content">
        <div class="rightContent">
					<div class="stepBox flex" v-if="result==0">
						<div class="line line2"></div>
						<div class="line line1  steps"></div>
						<div class="stepItem step2">
							<div class="step">1</div>
							<span>填写资料</span>
						</div>
						<div class="stepItem stepItem2 step1">
							<div class="step">2</div>
							<span>提交认证</span>
						</div>
						<div class="stepItem stepItem3">
							<div class="step">3</div>
							<span>认证通过</span>
						</div>
					</div>
					<div class="fillInfo" v-if="step==0">
						<div class="infoList">
							<div class="infoItem flex">
								<div class="leftName"><span>*</span>姓名</div>
								<div class="rightInp"><input placeholder="请输入姓名" type="text"></div>
							</div>
							<div class="infoItem flex">
								<div class="leftName"><span></span>性别</div>
								<div class="rightInp">
									<RadioGroup v-model="type">
											<Radio label="男"></Radio>
											<Radio label="女"></Radio>
									</RadioGroup>
								</div>
							</div>
							<div class="infoItem flex">
								<div class="leftName"><span>*</span>身份证号</div>
								<div class="rightInp"><input placeholder="请输入身份证号" type="text"></div>
							</div>
							<div class="infoItem flex">
								<div class="leftName"><span>*</span>身份证照片</div>
								<div class="rightInp">
									<Upload multiple type="drag" action="//jsonplaceholder.typicode.com/posts/">
											<div class="cardImg">
												<img src="../../assets/imgs/upload.png" alt="">
												<p>点击或将身份证正面照片拖拽到这里上传</p>
												<p>支持扩展名:  jpg  、  png</p>
											</div>
									</Upload>
								</div>
							</div>
							<div class="infoItem flex">
								<div class="leftName"><span>*</span>职业</div>
								<div class="rightInp">
									<RadioGroup v-model="type">
											<Radio label="药剂师"></Radio>
											<Radio label="执业药师"></Radio>
											<Radio label="医生"></Radio>
											<Radio label="护士"></Radio>
											<Radio label="其他"></Radio>
									</RadioGroup>
								</div>
							</div>
							<div class="infoItem flex">
								<div class="leftName"><span>*</span>职称</div>
								<div class="rightInp">
									<RadioGroup v-model="type">
											<Radio label="主任药师"></Radio>
											<Radio label="副主任药师"></Radio>
											<Radio label="主管药师"></Radio>
											<Radio label="药师"></Radio>
											<Radio label="药士"></Radio>
									</RadioGroup>
								</div>
							</div>
							<div class="infoItem flex">
								<div class="leftName"><span>*</span>医院</div>
								<div class="rightInp">
									<div class="selectBox flex-btween" @click="selectDown">
										<p>请选择医院</p>
										<Icon type="md-arrow-dropdown" />
									</div>
									<!-- 医院下拉框 -->
									<div class="hospitalBox" v-if="showSelect">
										<div class="topSelect">
											<Row style="display:flex;justify-content: space-between;align-items: center;">
												<Col span="12" style="padding-right:10px">
													<Select v-model="model11" filterable>
														<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
													</Select>
												</Col>
												<Col span="12">
													<Select v-model="model12" filterable>
														<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
													</Select>
												</Col>
											</Row>
										</div>
										<div class="bottomInfo flex">
											<div class="leftClass">
												<div class="classItem" @click="classCur=index" :class="{active:classCur==index}" v-for="(item,index) in classList" :key="index">{{item.name}}</div>
											</div>
											<div class="rightHosName">
												<div class="hospitalItem" v-for="(item,index) in hospitalList" :key="index">{{item.name}}</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="infoItem flex">
								<div class="leftName"><span>*</span>工作证照片</div>
								<div class="rightInp">
									<Upload multiple type="drag" action="//jsonplaceholder.typicode.com/posts/">
										<div class="cardImg">
											<img src="../../assets/imgs/upload.png" alt="">
											<p>点击或将身份证正面照片拖拽到这里上传</p>
											<p>支持扩展名:  jpg  、  png</p>
										</div>
									</Upload>
								</div>
							</div>
						</div>
						<div class="btn">提交认证</div>
					</div>
					<div class="submit" v-if="step==1">
						<div class="subList">
							<div class="subItem flex">
								<div class="leftTitle"> 姓名</div>
								<div class="rightInfo">小酒窝～ </div>
							</div>
							<div class="subItem flex">
								<div class="leftTitle"> 性别</div>
								<div class="rightInfo">男 </div>
							</div>
							<div class="subItem flex">
								<div class="leftTitle"> 职业</div>
								<div class="rightInfo">其他 </div>
							</div>
							<div class="subItem flex">
								<div class="leftTitle"> 姓名</div>
								<div class="rightInfo">上海XX生物科技有限公司</div>
							</div>
						</div>
					</div>
					<div class="noPass" v-if="step==2&&result==0">
						<img src="../../assets/imgs/bg.png" alt="">
						<p>很遗憾，您的企业认证未通过</p>
						<p>未通过理由为：xxxxxxxxxxxxxxxxxxxxxx</p>
						<div class="btn">重新提交</div>
					</div>
					<div class="pass flex" v-if="step==2&&result==1">
						<img src="../../assets/imgs/pass.png" alt="">
						<div>
							<p>恭喜你，职业认证已通过</p>
							<p>如果职业信息有更改，请点击此处重新认证</p>
						</div>
					</div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
			return{
				showSelect:false,
				classCur:0,
				hospitalList:[
					{name:' 中国中医科学院广安门医院 '},
					{name:' 中国中医科学院广安门医院 '},
					{name:' 中国中医科学院广安门医院 '},
					{name:' 中国中医科学院广安门医院 '},
					{name:' 中国中医科学院广安门医院 '},
					{name:' 中国中医科学院广安门医院 '},
					{name:' 中国中医科学院广安门医院 '},
					{name:' 中国中医科学院广安门医院 '},
					{name:' 中国中医科学院广安门医院 '},
					{name:' 中国中医科学院广安门医院 '},
					{name:' 中国中医科学院广安门医院 '},
					{name:' 中国中医科学院广安门医院 '},
					{name:' 中国中医科学院广安门医院 '},
				],
				classList:[
					{name:'全部'},
					{name:'三甲'},
					{name:'三乙'},
					{name:'二甲'},
					{name:'二乙'},
					{name:'二级'},
					{name:'二级'},
					{name:'一甲'},
					{name:'一级'},
					{name:'其他'},
				],
				stepList:['填写资料','审核通过','认证通过'],
				type: "",
				step:0,
				result:0,
				cityList: [
					{
						value: 'New York',
						label: 'New York'
					},
					{
						value: 'London',
						label: 'London'
					},
					{
						value: 'Sydney',
						label: 'Sydney'
					},
					{
						value: 'Ottawa',
						label: 'Ottawa'
					},
					{
						value: 'Paris',
						label: 'Paris'
					},
					{
						value: 'Canberra',
						label: 'Canberra'
					}
				],
				model11: '',
				model12:""
			}
    },
		methods:{
			selectDown(){
				this.showSelect=!this.showSelect;
			},
		},
	}
</script>

<style scoped lang="less">
.content{
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
    .rightContent{
			width: 960px;
			background: #fff;
			border-radius: 2px;
			min-height: 600px;
			padding:30px;
			box-sizing: border-box;
			.stepBox{
				width:100%;
				height:80px;
				position: relative;
				.stepItem{
					margin:0 123px;
					display: flex;
					align-items: center;
					flex-direction: column;
					justify-content: center;
					color:#D2D1D5;
					position:absolute;
					.step{
						width:30px;
						height:30px;
						background:rgba(210,209,213,1);
						color: #fff;
						margin-bottom:6px;
						border-radius: 50%;
						text-align: center;
						line-height: 30px;
					}
				}
				.stepItem2{
					left:300px;
				}
				.stepItem3{
					left:600px;
				}
				.stepItem.step1{
					color:#29B28B;
					.step{
						background:rgba(41,178,139,1);
						box-shadow:0px 0px 12px 0px rgba(41,178,139,0.3);
					}
				}
				.stepItem.step2{
					color:#fff;
					.step{
						background:#333;
					}
				}
				.line{
					width:280px;
					height:2px;
					border-bottom:2px dashed #D2D1D5;
					position: absolute;
					z-index: 0;
					top:30px;
				}
				.line.steps{
					border-bottom:2px solid #333;
				}
				.line1{
					left:155px;
				}
				.line2{
					right:170px;
				}
			}
			.fillInfo{
				.infoList{
					.infoItem{
						width:100%;
						min-height:60px;
						margin-top:20px;
						
						// border:1px solid #ddd;
						.leftName{
							width:82px;
							text-align: right;
							font-size: 14px;
							span{
								color:#f00;
								margin-right:4px;
							}
						}
						.rightInp{
							position: relative;
							margin-left:30px;
							input{
								width:342px;
								height:40px;
								font-size: 14px;
								border:1px solid #E4E6EA;
								padding:0 10px;
								box-sizing: border-box;
							}
							.cardImg{
								width:300px;
								height:168px;
								background:#F6F6F6;
								display: flex;
								align-items: center;
								flex-direction:column;
								justify-content: center;
								img{
									width:50px;
									height:39px;
								}
								p{
									font-size: 14px;
									margin-top:10px;
									color:#29B28B;
									cursor: default;
								}
								p:last-child{
									margin-top:8px;
									color:#999999;
								}
							}
							.selectBox{
								width:342px;
								height:40px;
								border-radius:2px;
								border:1px solid rgba(228,230,234,1);
								padding:0 20px;
								box-sizing: border-box;
								font-size: 14px;
							}
							.hospitalBox{
								position: absolute;
								width:513px;
								height:516px;
								background:rgba(255,255,255,1);
								box-shadow:0px 4px 8px 8px rgba(24,31,29,0.08);
								border-radius:2px;
								z-index: 9999;
								top:50px;
								padding:20px 50px 20px 20px;
								box-sizing: border-box;
								.bottomInfo,.topSelect{
									width:440px;
								}
								.bottomInfo{
									height:420px;
									border-radius:2px;
									border:1px solid rgba(228,230,234,1);
									margin-top:20px;
									color:#666666;
									.leftClass{
										width:140px;
										height:100%;
										overflow-y: auto;
										.classItem{
											width:100%;
											height:40px;
											text-align: center;
											line-height: 40px;
											cursor: default;
										}
										.classItem.active{
											color:#29B28B;
										}
									}
									.rightHosName{
										width:300px;
										height:100%;
										overflow-y: auto;
										border-left:1px solid #E4E6EA;
										.hospitalItem{
											width:100%;
											height:40px;
											text-align: center;
											line-height: 40px;
											padding:0 20px;
											box-sizing: border-box;
											overflow: hidden;
											text-overflow: ellipsis;
											white-space: nowrap;
											cursor: default;
										}
									}
								}
							}
						}
					}
				}
				.btn{
					margin:0 auto;
					width:292px;
					height:50px;
					background:rgba(41,178,139,1);
					border-radius:4px;
					font-size: 15px;
					color:#fff;
					text-align: center;
					line-height:50px;
					margin-top:50px;
					cursor: default;
				}
			}
			.submit{
				.subList{
					.subItem{
						width:100%;
						height:60px;
						padding:0 30px;
						box-sizing: border-box;
						font-size: 14px;
						.rightInfo{
							margin-left:30px;
						}
					}
				}
			}
			.noPass{
				width:100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				img{
					width:400px;
					height:134px;
					margin-top:60px;
				}
				p{
					font-size:16px;
					color:#1F1F1F;
					margin-top:10px;
				}
				p:last-child{
					color:#757A82;
					font-size: 14px;
				}
				.btn{
					width:292px;
					height:50px;
					background:rgba(41,178,139,1);
					border-radius:4px;
					font-size: 15px;
					color:#fff;
					text-align: center;
					line-height: 50px;
					margin-top:90px;
				}
			}
			.pass{
				img{
					width:113px;
					height:105px;
				}
				div{
					margin-left:30px;
					p{
						font-size:24px;
						color:#1F1F1F;
					}
					p:last-child{
						font-size: 16px;
						color:#29B28B;
						margin-top:10px;
					}
				}
			}
    }
}
</style>