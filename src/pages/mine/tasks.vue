<template>
    <div class="content">
        <div class="rightContent">
            <div class="box">
                <div class="item">
                    <p>0</p>
                    <p>任务数量</p>
                </div>
                <div class="item">
                    <p>0</p>
                    <p>今日学习（分钟）</p>
                </div>
                <div class="item">
                    <p>0</p>
                    <p>高于任务（学员）</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    }
}
</script>

<style scoped lang="less">
.content{
    .rightContent{
        width: 960px;
        background: #fff;
        border-radius: 2px;
        min-height: 600px;
        padding:20px;
        .box{
            width:900px;
            height:160px;
            background:rgba(246,248,250,1);
            border-radius:2px;
            margin:auto;
            display:flex;
            justify-content:space-around;
            .item{
                text-align:center;
                margin-top:35px;
            }
            .item p:first-child{
                height:59px;
                font-size:42px;
                font-family:PingFang-SC-Heavy,PingFang-SC;
                font-weight:800;
                color:rgba(51,51,51,1);
                line-height:59px;
            }
            .item p:last-child{
                height:20px;
                font-size:14px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(136,136,136,1);
                line-height:20px;
            }
        }
    }
}
</style>