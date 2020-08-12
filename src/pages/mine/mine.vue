<template>
	<div class="mine">
		<div class="mineBox flex-btween">
			<div class="left">
				<div class="leftTitle" @click="choseTabBar(item.router)" :class="{leftActive:routeName==item.router}" v-for="(item,index) in leftList" :key="index">{{item.name}}</div>
			</div>
            <router-view></router-view>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				leftList:[
					{name:"学习记录",id:1,router:"learningRecords"},
					{name:"我的收藏",id:2,router:"myCollection"},
					// {name:"学习任务",id:3,router:"tasks"},
					// {name:"我的订单",id:4,router:"myOrder"},
					// {name:"会员管理",id:5,router:"memberMgt"},
					{name:"个人设置",id:6,router:"setting"},
					// {name:"职业认证",id:7,router:"certification"},
					{name:"我的反馈",id:8,router:"feedback"},
                ],
                routeName:"",       //路由
			}
        },
        created(){
            this.routeName=this.$route.name;
        },
		methods:{
			// 侧边选项卡
			choseTabBar(name){
                this.routeName = name;
                this.$router.push(name);
			}
        },
	}
</script>

<style lang="less">
	body{
		background:#F5F6F6;
	}
	.mine{
		width:100%;
		padding:50px 0;
		box-sizing: border-box;
		.mineBox{
			width:1200px;
			margin:0 auto;
			align-items: flex-start;
			.left{
				width:220px;
				// height:548px;
				height:320px;
				background:#fff;
				display: flex;
				align-items: center;
				flex-direction: column;
				border-radius:2px;
				.leftTitle{
					width:70px;
					height:70px;
					text-align: center;
					line-height: 70px;
					font-size: 14px;
					color:#666666;
					cursor: default;
				}
				.leftTitle.leftActive{
					color:#1CB38A
				}
            }
		}
	}
	
</style>
