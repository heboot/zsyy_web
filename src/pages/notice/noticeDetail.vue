<template>
    <div class="content">
        <div class="infoBox">
            <p class="title">大“疫”当前  同舟共济</p>
            <p class="time">发布时间：2018-12-18 12:12:12</p>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            query:''
        }
    },
    created(){
        this.query=this.$route.query;
        this.updateMes(this.query.id);
    },
    methods:{
        // 修改已读消息状态
        updateMes(id){
            let data={id:id}
            this.$http.get('inform/updateStatus/'+id).then(res=>{
            })
        },
    }
}
</script>

<style scoped lang="less">
.content{
    width: 100%;
    background: #f5f6f6;
    padding: 1% 15%;
    height: 100vh;
    .infoBox{
        background:#fff;
        width:1200px;
        margin:auto;
        padding:20px;
        .title{
            text-align:center;
            height:33px;
            font-size:24px;
            font-family:PingFang-SC-Heavy,PingFang-SC;
            font-weight:800;
            color:rgba(60,62,78,1);
            line-height:33px;
        }
        .time{
            margin:20px auto;
            text-align:center;
            height:25px;
            font-size:14px;
            font-family:PingFang-SC-Regular,PingFang-SC;
            font-weight:400;
            color:rgba(102,102,102,1);
            line-height:25px;
        }
    }
}
</style>