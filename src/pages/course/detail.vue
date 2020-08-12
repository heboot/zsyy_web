<template>
	<div class="classDetail">
		<div class="detail">
			<div class="detailBox">
				<div class="crumbBox flex">
					<Breadcrumb>
						<BreadcrumbItem>全部课程</BreadcrumbItem>
						<BreadcrumbItem>{{components}}</BreadcrumbItem>
					</Breadcrumb>
				</div>
				<div class="videoBox flex" @contextmenu.prevent="menuPlayer()">
					<!-- <div class="shade" v-if="isInStudy&&isShow">
						<Button style="width:200px;height:60px;font-size:16px;background:#29b28b;" type="success" @click=''>继续学习</Button>
					</div> -->
					<img v-if="!isInStudy" style="width:900px;height:490px;" :src="videoDetail.imgUrl" alt="">
					<video-player  v-if="isInStudy" class="video-player vjs-custom-skin"
						 ref="videoPlayer"
						 :playsinline="true"
						 :options="videoPlayerOptions"
						 @play="onPlayerPlay($event)"
						 @pause="onPlayerPause($event)"
						 @ended="onPlayerEnded($event)"
						 @waiting="onPlayerWaiting($event)"
						 @playing="onPlayerPlaying($event)"
						 @loadeddata="onPlayerLoadeddata($event)"
						 @timeupdate="onPlayerTimeupdate($event)"
						 @canplay="onPlayerCanplay($event)"
						 @canplaythrough="onPlayerCanplaythrough($event)"
						 @statechanged="playerStateChanged($event)"
						 @ready="playerReadied"
						></video-player>
					<div class="classList">
						<div class="classItem" @click="choseVideo(index,item.classUrl)" v-for="(item,index) in videoList" :key="index" :class="{isPlay:index==videoCur}">
							<div class="videoType">录播</div>
							<div class="rightTitle">
								<div>{{item.classTitle}}</div>
								<div>{{item.hour}}时{{item.minute}}分钟{{item.second}}秒</div>
							</div>
						</div>
					</div>
				</div>
				<div class="videoTitleBox flex-btween">
					<div class="leftVideoInfo">
						<div class="videoTitle">{{videoDetail.courseTitle}}</div>
						<div class="flex subTItleBox">
							<span class="isFree" v-if="videoDetail.whetherPay==0">免费</span>
							<span class="isFree" v-if="videoDetail.whetherPay==1">¥{{videoDetail.coursePrice}}</span>
							<span class="period">有效期180天</span>
							<div class="collect" :class="{active:isCollect}" @click="collect">
								<Icon type="md-heart" />
								<span>收藏</span>
							</div>
							<div class="collect" style="margin-left:20px" 
								v-clipboard:copy="locationHref" 
								v-clipboard:success="copy" 
								v-clipboard:error="onError">
								<Icon type="md-share" />
								<span>分享</span>
							</div>
						</div>
					</div>
					<div class="studyBtn" @click="addStudy(videoDetail.id)">+加入学习</div>
				</div>
			</div>
		</div>
		<div class="courseBox flex-btween">
			<div class="courseLeft">
				<div class="courseTab flex">
					<div :class="{active:tabCur==0}" @click="choseTab(0)">课程概述</div>
					<div :class="{active:tabCur==1}" @click="choseTab(1)">课程目录</div>
				</div>
				<div class="tabContent">
					<div v-html="videoDetail.description" class="summarize" v-if="tabCur==0">
						
						<!-- <img src="../../assets/imgs/detail.jpg" mode="widthFix" alt=""> -->
					</div>
					<div class="catalogue" v-if="tabCur==1">
						<div class="list">
							<div class="item" v-for="(item,index) in videoList" :key="index">
								<img src="../../assets/imgs/video.png" alt="">
								<div class="rightInfo">
									<div class="title">{{item.classTitle}}</div>
									<div class="time">{{item.hour}}时{{item.minute}}分钟{{item.second}}秒</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="correlationCourse">
				<div class="correlationTitle">相关题目</div>
				<div class="content">
					暂无相关内容
				</div>
			</div>
		</div>
	</div>
	
</template>

<script>
	// 导入组件
	import {videoPlayer} from 'vue-video-player'
	export default{
		name: 'VideoPlayer',
		components: {
			videoPlayer
		},
		data(){
			return {
				video:'',         //具体视频
				fileType: 'mp4', // 资源的类型
				videoUrl: '',	// 资源的路径地址
				posterUrl:''  ,//封面地址
				tabCur:0,
				videoList:[],
				videoDetail:{},
				videoCur:0,
				isJoinStudy:false,
				components:'',
				isInStudy:false,
				isCollect:false,
                playTime: '0',
				paused: true,
				isShow:true,
				nowId:'',
				reqCount:0,
				timeInfo:'',
				locationHref:'',
				getVideoDetail:''
			}
		},
		mounted() {
			this.locationHref=location.href+'?item='+encodeURI(localStorage.getItem("videoDetail"))
			if(this.$route.query.item){
				this.getVideoDetail=JSON.parse(this.$route.query.item)
			}else{
				this.getVideoDetail=JSON.parse(localStorage.getItem("videoDetail"))
			}
			if(localStorage.getItem('isLogin')){
				this.findLastTime();
			}else{
				this.detail();
			}
			window.addEventListener("beforeunload", e => {
                this.beforeunloadHandler(e);
			});
		},
		methods: {
			copy(e) {
				this.$Message.success('已成功复制剪贴板')
			},
			onError(e) {
				this.$Message.success('复制失败')
			},
			// 查询视频上次播放时间节点
			findLastTime(){
				let info="";
				let id=this.getVideoDetail.id;
				if(localStorage.getItem("isLogin")&&this.reqCount==0){
					this.$http.get("course/findRecord/"+id).then(res=>{
						this.reqCount++;
						this.timeInfo=res.data;
						this.detail();
					})
				}
			},
			// 视频保存请求
			 beforeunloadHandler(e) {
                e = e || window.event;
                if (e) {
					let data={
						courseClassId:this.videoList[this.videoCur].id,//视频id
						courseId:this.videoDetail.id,
						position:this.playTime,//播放时间保存
					}
					if(this.isInStudy){
						// 保存请求
						this.$http.post('course/record',data).then(res => {
							
						})
					}
                }
                // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
                return "您是否确认离开此页面-您输入的数据可能不会被保存";

            },
			// 查询课程是否收藏
			getIsCollect(){
				let videoDetail=this.getVideoDetail;
				this.$http.get(`/course/queryCollect/${videoDetail.id}`).then(res=>{
					if(res.code==0){
						this.isCollect=res.data;
					}
				})
				
			},
			// 取消收藏
			cancelCollect(){
				let data={
					courseId:this.videoDetail.id,
					status:false
				}
				this.$http.form('course/collect',data).then(res=>{
					if(res.code==0){
						this.isCollect=false;
						this.$Message.success('已取消收藏')
						this.getIsCollect();
					}
				})
			},
			// 收藏按钮点击
			collect(){
				if(localStorage.getItem("isLogin")){
					if(this.isCollect==true){
						this.cancelCollect()
					}else{
						this.addCollect();
					}
				}else{
					this.$Message.warning("请先登录")
				}
				
			},
			// 添加收藏
			addCollect(){
				let data={
					courseId:this.videoDetail.id,
					status:true
				}
				this.$http.form('course/collect',data).then(res=>{
					if(res.code==0){
						this.isCollect=true;
						this.$Message.success("已添加收藏！");
						this.getIsCollect();
					}
				})
			},
			// 查询当前课程是否加入学习
			findStudy(courseId){
				this.$http.get('/course/isStudyRecord/'+courseId).then(res=>{
					if(res.message==1){
						this.isInStudy=true
					}else if(res.message==0){
						this.isInStudy=false
					}
				})
			},
			// 加入学习
			addStudy(id){
				if(localStorage.getItem("isLogin")){
					if(this.isInStudy){
						this.$Message.warning("您已加入学习列表，无需再次加入")
					}else{
						this.$http.get('course/addStudyRecord/'+id).then(res=>{
							if(res.code==0){
								this.$Message.success('加入成功！');
								this.isInStudy=true
							}
						})
					}
				}else{
					this.$Message.warning("请先登录")
				}
				
				
			},
			// 选择视频
			choseVideo(index,url){
				if(!this.isInStudy){
					 this.$Message.warning('请加入学习！');
					//  this.videoCur=""
				}else{
					this.reqCount++;
					this.videoUrl=url
					this.videoCur=index
					this.components=this.videoList[index].classTitle
				}
				
			},
			// 详情渲染
			detail(){
				let videoDetail=this.getVideoDetail
				this.videoDetail=videoDetail;
				let videoList=videoDetail.classHours
				videoList.forEach((item,index)=>{
					item.second = parseInt(item.videoDuration);// 秒
					item.minute = 0;// 分
					item.hour = 0;// 小时
					item.hour=Math.floor(item.videoDuration/3600);
					item.minute=Math.floor(item.videoDuration/60%60);
					item.second=Math.floor(item.videoDuration%60);
					if(item.id==this.timeInfo && this.timeInfo.lastWatch){
						this.videoUrl=item.classUrl;
						this.components=item.classTitle
						this.videoCur=index
					}else{
						if(index==0){
							this.videoUrl=item.classUrl
							this.components=item.classTitle
						}
						
					}
				})
				this.videoList=videoList
				// this.videoUrl=this.videoList[0].classUrl
				// this.components=this.videoList[0].classTitle
				if(localStorage.getItem("isLogin")){
					this.getIsCollect();
					this.findStudy(videoDetail.id)
				}
			},
			// 选项卡
			choseTab(i){
				this.tabCur=i
				
			},
			// 播放回调
			onPlayerPlay(player) {
				this.paused = false;
				//console.log('player play!', player)
			},
			// 暂停回调
			onPlayerPause(player) {
				this.paused = true
				//console.log('player pause!', player)
			},
			// 视频播完回调
			onPlayerEnded($event) {
				this.paused = false
				// this.$refs.videoPlayer.player.src(this.fileUrl)//循环播放
			},
			// DOM元素上的readyState更改导致播放停止
			onPlayerWaiting($event) {
				//console.log(player)
			},
			// 已开始播放回调
			onPlayerPlaying($event) {
			 // console.log(player)
			},

			// 当播放器在当前播放位置下载数据时触发
			onPlayerLoadeddata($event) {
			 // console.log(player)
			},

			// 当前播放位置发生变化时触发。
			onPlayerTimeupdate($event) {
				// console.log($event.cache_.currentTime);
				this.playTime=$event.cache_.currentTime;
				//console.log(player)
			},

			//媒体的readyState为HAVE_FUTURE_DATA或更高
			onPlayerCanplay(player) {
				// console.log('player Canplay!', player)
			},
			//媒体的readyState为HAVE_ENOUGH_DATA或更高。这意味着可以在不缓冲的情况下播放整个媒体文件。
			onPlayerCanplaythrough(player) {
				// console.log('player Canplaythrough!', player)
			},

			//播放状态改变回调
			playerStateChanged(playerCurrentState) {
				//console.log('player current update state', playerCurrentState)
			},

			//将侦听器绑定到组件的就绪状态。与事件监听器的不同之处在于，如果ready事件已经发生，它将立即触发该函数。。
			playerReadied(player) {
				// this.palyer=payer
				
				if(this.reqCount==0||this.reqCount==1){
					player.currentTime(this.timeInfo.lastTimestamp)
				}
				   //恢复上次播放进度
				//console.log('example player 1 readied', player);
			},
		},
		// 销毁后
		destroyed(){
			window.removeEventListener("beforeunload", e => {
                this.beforeunloadHandler(e);
			});
			// let data={
			// 	courseClassId:this.videoList[this.videoCur].id,//视频id
			// 	courseId:this.videoDetail.id,
			// 	position:this.playTime,//播放时间保存
			// }
			// if(this.isInStudy){
			// 	// 保存请求
			// 	this.$http.post('course/record',data).then(res => {
			// 		console.log(res);
			// 	})
			// }
			
		},
		computed:{
			videoPlayerOptions () {
				const videoPlayerOptions = {
					playbackRates: [0.75, 1.0, 1.25, 1.5,2.0], //播放速度
					autoplay: false, // 是否自动播放。
					muted: false, // 是否静音播放，默认情况下将会消除任何音频。
					loop: false, // 是否循环播放。
					preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
					language: 'zh-CN',
					width:"900px",
					height:"490px",
					// aspectRatio: '3:1', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
					fluid: false, // 是否流体从而按比例缩放以适应其容器。
					flash:{hls:{withCreadentials:false}},//可以播放rtmp视频
					html5:{hls:{withCreadentials:false}},//可以播放m3u8视频
					sources: [{
						type: 'video/' + this.fileType,
						src: this.videoUrl // 视频url地址
					}],
					poster: this.posterUrl, // 封面地址
					width: '100%',
					notSupportedMessage: '此视频暂无法播放...', // 当无法播放时允许覆盖Video.js，显示的默认信息。
					controlBar: {
						timeDivider: true,
						durationDisplay: true,
						remainingTimeDisplay: false,
						fullscreenToggle: true
					}
				}
				return videoPlayerOptions
			}
		}
	}
</script>

<style scoped lang="less">
	body{
		background:#F5F6F6;
	}
	.classDetail{
		padding-bottom:80px;
		.detail{
			width:100%;
			height:660px;
			background:#fff;
			.detailBox{
				width:1200px;
				height:100%;
				margin:0 auto;
				.crumbBox{
					width:100%;
					height:80px;
				}
				.videoBox{
					width:100%;
					height:490px;
					background:#000;
					position: relative;
					.shade{
						width:900px;
						height:490px;
						position: absolute;
						top:0;
						left:0;
						background:rgba(0,0,0,0.7);
						z-index:999;
						display: flex;
						align-items: center;
						justify-content: center;
					}
					.video-player,.vjs_video_3,.vjs-tech{
						width:900px;
						height:490px;
					}
					.video-js .vjs-icon-placeholder {
						width: 100%;
						height: 100%;
						display: block;
					}
					.classList{
						width:320px;
						height:490px;
						background:#000;
						padding:0 20px;
						box-sizing: border-box;
						overflow-y: auto;
						.classItem{
							width:100%;
							height:80px;
							border-bottom:1px solid rgba(255,255,255,0.6);
							display: flex;
							align-items: flex-start;
							padding:20px 0;
							box-sizing: border-box;
							cursor: default;
							.videoType{
								width:32px;
								height:18px;
								background:#787A7E;
								color:#131313;
								border-radius:2px;
								text-align: center;
								line-height: 18px;
								font-size: 12px;
								margin-top:3px;
							}
							.rightTitle{
								margin-left:10px;
								div:first-child{
									padding:0;
									color:#fff;
									font-weight:800;
									font-size: 15px;
								}
								div:last-child{
									margin-top:4px;
									font-size: 14px;
									color:rgba(113,113,113,1);
								}
							}
						}
						.classItem.isPlay{
							.rightTitle{
								div{
									color:rgba(41,178,139,1);
									width:230px;
									// border:1px solid #fff;
									overflow: hidden;
									white-space: nowrap;
									text-overflow: ellipsis;
								}
							}
							.videoType{
								color:#fff;
								background:rgba(41,178,139,1);
							}
						}
					}
				}
				.videoTitleBox{
					width:100%;
					height:94px;
					background:#232323;
					padding:0 20px;
					box-sizing: border-box;
					font-size:22px;
					.leftVideoInfo{
						.videoTitle{
							width:730px;
							overflow: hidden;
							text-overflow:ellipsis;
							white-space: nowrap;
							color:#fff;
						}
						.subTItleBox{
							.isFree{
								color:#FF077A;
								margin-right:30px;
							}
							.period{
								font-size: 14px;
								color:#9C9C9C;
								margin-right:30px;
							}
							.collect{
								font-size: 14px;
								color:#fff;
								cursor: pointer;
								span{
									margin-left:4px;
								}
							}
							.collect.active{
								color:#FF077A;
							}
						}
					}
					.studyBtn{
						width:292px;
						height:50px;
						background:rgba(41,178,139,1);
						border-radius:2px;
						text-align: center;
						line-height:50px;
						color:#fff;
						font-size:15px;
						cursor:pointer  ;
					}
				}
			}
		}
		.courseBox{
			width:1200px;
			height:auto;
			// min-height:100px;
			margin:0 auto;
			margin-top:20px;
			align-items: flex-start;
			.courseLeft{
				width:850px;
				// height:100%;
				background:#fff;
				.courseTab{
					width:850px;
					height:80px;
					background:#fff;
					border-bottom:1px solid #F0F2F5;
					div{
						width:190px;
						height:100%;
						text-align: center;
						line-height: 80px;
						box-sizing: border-box;
						font-size: 14px;
						color:#313436;
						cursor: pointer;
					}
					div.active{
						color:#29B28B;
						font-size: 18px;
						border-bottom: 2px solid #29B28B;
					}
				}
				.tabContent{
					width:100%;
					padding:30px;
					box-sizing: border-box;
					.summarize{
						width:100%;
						img{
							width:100%;
							height:2020px;
						}
					}
					.catalogue{
						.list{
							.item{
								width:100%;
								height:70px;
								background:#F5F6F6;
								padding:13px 20px;
								box-sizing: border-box;
								display: flex;
								align-items: flex-start;
								margin-top:20px;
								cursor: default;
								img{
									width: 18px;
									height:11px;
									margin-top:4px;
								}
								.rightInfo{
									margin-left:10px;
									.title{
										font-size:15px;
										color:#333333;
									}
									.time{
										color:#999999;
										font-size: 14px;
									}
								}
							}
						}
					}
				}
			}
			.correlationCourse{
				width:330px;
				height:328px;
				background:#fff;
				padding:30px;
				box-sizing: border-box;
				.correlationTitle{
					text-align: center;
					color:#1C1F21;
					font-weight:600;
					font-size:18px;
				}
				.content{
					text-align: center;
					margin-top:30px;
					color:#B4B9BE;
					font-size: 14px;
				}
			}
		}
	}
	
</style>
