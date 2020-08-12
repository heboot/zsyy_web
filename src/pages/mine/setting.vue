<template>
    <div class="content">
        <div class="rightContent">
            <div class="title">
                <p>基本信息</p>
                <div class="save" @click="save()">保存</div>
            </div>
            <div class="conBox">
                <div class="line">
                    <span class="titleMsg">头像</span>
                    <div id="upload">
                        <div class="item_bock">
                            <Upload class="head_img" :action="uploadImgUrl" :format="['jpg','jpeg','png']" :data="uploadData"
                                :show-upload-list="false" :headers="headers" :before-upload="onBeforeImgUploading"
                                :on-success="onImgUploadInforSuccess" :on-format-error="handleImgFormatError">
                                <img :src="userInfoFrom.avatar" />
                                <div class="update">修改</div>
                            </Upload>
                            <!-- <div  @click.stop="uploadHeadImg">
                                
                            </div> -->
                            <input type="file" accept="image/*" @change="handleFile" class="hiddenInput" />
                        </div>
                    </div>
                </div>
                <Form ref="formItem" style="width:100%;margin-top:20px;" :model="userInfoFrom" :rules="ruleInline" inline>
                    <FormItem>
                        <div class="flex" style="width:260px;font-size:14px;">
                            <span class="titleMsg">昵称</span>
                            <Input type="text" style="width:80%;font-size:14px;" v-model="userInfoFrom.userName" placeholder="请输入昵称"></Input>
                        </div>
                    </FormItem>
                    <!-- <FormItem>
                        <div class="flex" style="width:260px;font-size:14px;">
                            <span class="titleMsg">性别</span>
                            <Select style="width:80%;font-size:14px;" v-model="formItem.selectSex">
                                <Option value="0">男</Option>
                                <Option value="1">女</Option>
                            </Select>
                        </div>
                    </FormItem>
                    <FormItem>
                        <div class="flex" style="width:260px;font-size:14px;">
                            <span class="titleMsg">年龄</span>
                            <Input type="number" style="width:80%;font-size:14px;" v-model="formItem.age" placeholder="请输入年龄"></Input>
                        </div>
                    </FormItem> -->
                </Form>
            </div>
            <div class="title">
                <Dropdown trigger="click" style="margin-left: 20px">
                    <a href="javascript:void(0)" style="color:#000">
                        <p style="display:inline-block">{{selectedClass==""?'选择用户类别':selectedClass.categoryName}}</p>
                        <Icon type="md-arrow-dropdown" style="font-size:28px" />
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem  @click.native="getName(item)" v-for="(item,index) in userClass" :key="index">{{item.categoryName}}</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
            <div class="conBox">
                <Form ref="userInfoFrom" style="width:100%;margin-top:20px;" :model="userInfoFrom" :rules="ruleInline" inline>
                    <FormItem style="width:100%;">
                        <div class="flex" style="width:400px;font-size:14px;">
                            <span class="titleMsg">姓名</span>
                            <Input type="text" style="width:80%;font-size:14px;" v-model="userInfoFrom.realName" placeholder="请输入真实姓名"></Input>
                        </div>
                    </FormItem>
                    <FormItem style="width:100%;">
                        <div class="flex" style="width:400px;font-size:14px;">
                            <span class="titleMsg">性别</span>
                            <Select style="width:80%;font-size:14px;" v-model="userInfoFrom.gender">
                                <Option :value="item.value" v-for="(item,index) in sex" :key="index">{{item.name}}</Option>
                            </Select>
                        </div>
                    </FormItem>
                    <FormItem style="width:100%;">
                        <div class="flex" style="width:400px;font-size:14px;">
                            <span class="titleMsg">年龄</span>
                            <Input type="number" style="width:80%;font-size:14px;" v-model="userInfoFrom.userAge" placeholder="请输入年龄"></Input>
                        </div>
                    </FormItem>
                    <!-- <FormItem style="width:100%;">
                        <div class="flex" style="width:400px;font-size:14px;">
                            <span class="titleMsg">手机号</span>
                            <Input type="tel" style="width:80%;font-size:14px;" v-model="userInfoFrom.tel" placeholder="请输入手机号"></Input>
                        </div>
                    </FormItem> -->
                    <FormItem style="width:100%;" v-if="selectedClass.id==2||selectedClass.id==4||selectedClass.id==7">
                        <div class="flex" style="width:400px;font-size:14px;">
                            <span class="titleMsg">职称</span>
                            <Select style="width:80%;font-size:14px;" v-model="userInfoFrom.jobTitle">
                                <Option :value="item.value" v-for="(item,index) in rankList" :key="index">{{item.name}}</Option>
                            </Select>
                        </div>
                    </FormItem>
                    <FormItem style="width:100%;" v-if="selectedClass.id==2||selectedClass.id==7||selectedClass.id==8">
                        <div class="flex" style="width:400px;font-size:14px;">
                            <span class="titleMsg">专业</span>
                            <Input type="tel" style="width:80%;font-size:14px;" v-model="userInfoFrom.profession" placeholder="请输入专业"></Input>
                        </div>
                    </FormItem>
                    <FormItem style="width:100%;" v-if="selectedClass.id==2||selectedClass.id==4">
                        <div class="flex" style="width:400px;font-size:14px;">
                            <span class="titleMsg">工号</span>
                            <Input type="text" style="width:80%;font-size:14px;" v-model="userInfoFrom.jobNumber" placeholder="请输入工号"></Input>
                        </div>
                    </FormItem>
                    
                    <!-- <FormItem style="width:100%;">
                        <div class="flex" style="width:400px;font-size:14px;">
                            <span class="titleMsg">工作单位</span>
                            <Input type="text" style="width:80%;font-size:14px;" v-model="userInfoFrom.workUnit" placeholder="请输入工作单位"></Input>
                        </div>
                    </FormItem> -->
                    <FormItem style="width:100%;" v-if="selectedClass.id==4">
                        <div class="flex" style="width:400px;font-size:14px;">
                            <span class="titleMsg">选送单位</span>
                            <Input type="text" style="width:80%;font-size:14px;" v-model="userInfoFrom.electionUnit" placeholder="请输入选送单位"></Input>
                        </div>
                    </FormItem>
                    <FormItem style="width:100%;" v-if="selectedClass.id==4||selectedClass.id==6">
                        <div class="flex" style="width:400px;font-size:14px;">
                            <span class="titleMsg">毕业院校</span>
                            <Input type="text" style="width:80%;font-size:14px;" v-model="userInfoFrom.graduatedSchool" placeholder="请输入毕业院校"></Input>
                        </div>
                    </FormItem>
                    <FormItem style="width:100%;" v-if="selectedClass.id==4">
                        <div class="flex" style="width:400px;font-size:14px;">
                            <span class="titleMsg">进修时间段</span>
                           <Row  style="width:80%;font-size:14px;">
                                <Col span="11">
                                    <DatePicker type="date" placeholder="开始时间" v-model="formItem.urtherStudyStartTime"></DatePicker>
                                </Col>
                                <Col span="2" style="text-align: center">-</Col>
                                <Col span="11">
                                    <DatePicker type="date" placeholder="结束时间" v-model="formItem.furtherStudyEndTime"></DatePicker>
                                </Col>
                            </Row>
                        </div>
                    </FormItem>
                    <FormItem style="width:100%;" v-if="selectedClass.id==3||selectedClass.id==5">
                        <div class="flex" style="width:400px;font-size:14px;">
                            <span class="titleMsg">学号</span>
                            <Input type="text" style="width:80%;font-size:14px;" v-model="userInfoFrom.studentNum" placeholder="请输入学号"></Input>
                        </div>
                    </FormItem>
                    <FormItem style="width:100%;" v-if="selectedClass.id==3||selectedClass.id==5">
                        <div class="flex" style="width:400px;font-size:14px;">
                            <span class="titleMsg">班级</span>
                            <Input type="text" style="width:80%;font-size:14px;" v-model="userInfoFrom.studentClass" placeholder="请输入班级"></Input>
                        </div>
                    </FormItem>
                    <FormItem style="width:100%;" v-if="selectedClass.id==3||selectedClass.id==5">
                        <div class="flex" style="width:400px;font-size:14px;">
                            <span class="titleMsg">学校</span>
                            <Input type="text" style="width:80%;font-size:14px;" v-model="userInfoFrom.school" placeholder="请输入学校"></Input>
                        </div>
                    </FormItem>
                    <FormItem style="width:100%;" v-if="selectedClass.id==3||selectedClass.id==5">
                        <div class="flex" style="width:400px;font-size:14px;">
                            <span class="titleMsg">实习时间段</span>
                           <Row  style="width:80%;font-size:14px;">
                                <Col span="11">
                                    <DatePicker type="date" placeholder="开始时间" v-model="formItem.practiceStartTime"></DatePicker>
                                </Col>
                                <Col span="2" style="text-align: center">-</Col>
                                <Col span="11">
                                    <DatePicker type="date" placeholder="结束时间" v-model="formItem.practiceEndTime"></DatePicker>
                                </Col>
                            </Row>
                        </div>
                    </FormItem>
                    <FormItem style="width:100%;" v-if="selectedClass.id==6">
                        <div class="flex" style="width:400px;font-size:14px;">
                            <span class="titleMsg">专业方向</span>
                            <Input type="text" style="width:80%;font-size:14px;" v-model="userInfoFrom.professionalDirection" placeholder="请输入专业方向"></Input>
                        </div>
                    </FormItem>
                    <FormItem style="width:100%;" v-if="selectedClass.id==6">
                        <div class="flex" style="width:400px;font-size:14px;">
                            <span class="titleMsg">毕业年份</span>
                           <Row  style="width:80%;font-size:14px;">
                                <Col span="11">
                                    <DatePicker type="year" placeholder="请选择毕业年份" v-model="formItem.graduationYear"></DatePicker>
                                </Col>
                            </Row>
                        </div>
                    </FormItem>
                    <FormItem style="width:100%;" v-if="selectedClass.id==2">
                        <div class="flex" style="width:400px;font-size:14px;">
                            <span class="titleMsg">部门</span>
                            <Select style="width:80%;font-size:14px;" v-model="userInfoFrom.department">
                                <Option :value="item.value" v-for="(item,index) in departmentList" :key="index">{{item.name}}</Option>
                            </Select>
                        </div>
                    </FormItem>
                    <FormItem style="width:100%;" v-if="selectedClass.id==4">
                        <div class="flex" style="width:400px;font-size:14px;">
                            <span class="titleMsg">进修专业</span>
                            <Select style="width:80%;font-size:14px;" v-model="userInfoFrom.furtherStudies">
                                <Option :value="item.value" v-for="(item,index) in educationProfessionalList" :key="index">{{item.name}}</Option>
                            </Select>
                        </div>
                    </FormItem>
                    <FormItem style="width:100%;" v-if="selectedClass.id==6||selectedClass.id==7||selectedClass.id==8">
                        <div class="flex" style="width:400px;font-size:14px;">
                            <span class="titleMsg">学位</span>
                            <Select style="width:80%;font-size:14px;" v-model="userInfoFrom.academicDegree">
                                <Option :value="item.value" v-for="(item,index) in degreeList" :key="index">{{item.name}}</Option>
                            </Select>
                        </div>
                    </FormItem>
                    <FormItem style="width:100%;" v-if="selectedClass.id==8">
                        <div class="flex" style="width:400px;font-size:14px;">
                            <span class="titleMsg">职称</span>
                            <Select style="width:80%;font-size:14px;" v-model="userInfoFrom.jobTitle">
                                <Option :value="item.value" v-for="(item,index) in medicRankList" :key="index">{{item.name}}</Option>
                            </Select>
                        </div>
                    </FormItem>
                </Form>
            </div>
            <div class="title">
                <p>账号安全</p>
            </div>
            <div class="conBox">
                <div class="line">
                    <span class="titleMsg">手机号</span>
                    <span>{{userInfo.mobilePhone}}</span>
                    <p class="button" @click="updatePhone">更换</p>
                </div>
                <div class="line">
                    <span class="titleMsg">密码</span>
                    <span>******</span>
                    <p class="button" @click="updatePsd">修改</p>
                </div>
            </div>
        </div>
        <!-- 更换手机号 -->
        <div class="alertMask" v-show="phoneAlert">
            <div class="alert">
                <div class="alertTitle">
                    <p>更换手机号</p>
                    <Icon type="md-close" @click="closePhoneAlert" />
                </div>
                <div class="alertCon">
                    <div v-if="first">
                        <div class="conTit">
                            <p>验证旧手机号</p>
                            <p>{{userInfo.mobilePhone}}</p>
                        </div>
                        <div class="inputBox">
                            <input type="text" v-model="oldPhoneVer" placeholder="输入验证码">
                            <div class="code" @click="getVerCode">{{getMobileCodeText()}}</div>
                        </div>
                        <div class="button"  @click="next">下一步</div>
                    </div>
                    <div v-else>
                        <div class="phoneBox">
                            <div class="inputBox">
                                <div class="msg">+86</div>
                                <input type="text" v-model="phone" placeholder="输入新手机">
                            </div>
                            <div class="inputBox">
                                <input type="text" v-model="newPhoneVer" placeholder="输入验证码">
                                <div class="code" @click="getVerCode">{{getMobileCodeText()}}</div>
                            </div>
                            <div class="button" @click="boundPhone()">绑定</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 修改密码 -->
        <div class="alertMask" v-show="psdAlert">
            <div class="alert">
                <div class="alertTitle">
                    <p>修改密码</p>
                    <Icon type="md-close" @click="closePsdAlert" />
                </div>
                <div class="alertCon">
                    <div >
                        <div class="inputBox">
                            <div class="msg">+86</div>
                            <input type="text" v-model="userInfo.mobilePhone" disabled placeholder="输入新手机">
                        </div>
                        <div class="inputBox">
                            <input type="text" placeholder="输入验证码" v-model="passwordVer">
                            <div class="code" @click="getVerCode">{{getMobileCodeText()}}</div>
                        </div>
                        <div class="inputBox">
                            <input type="text" placeholder="输入新密码" v-model="newPassword" class="newInput">
                        </div>
                        <div class="button" @click="boundPassword()">绑定更改</div>
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
            first: true,
            phoneAlert: false,
            psdAlert: false,
            userName:'',
            userInfo:'',
            uploadImgUrl: `${this.host}/uc/upload/oss/image`,
            imgUploadLoading: false,
            uploadData: {},
            headers:{},
            modelType:'',
            phone:'',
            wait_timer:false,
            verContent:'',
            oldPhoneVer:'',
            newPhoneVer:'',
            passwordPhone:'',
            passwordVer:'',
            newPassword:'',
            // formItem: {
            //     userName: '',
            //     selectSex: '',
            //     age: '',
            // },
            userInfoFrom:{
                avatar:require('../../assets/imgs/index/userImg.png'),//用户头像
                userName: '',//用户名
                realName: '',//真实姓名
                gender: '',//性别
                // tel:'',//手机号
                userAge: '',//年龄
                jobTitle:'',//职称
                profession:'',//专业
                department:"",//部门
                furtherStudies:'',//进修专业
                academicDegree:'',//学位
                // medicRank:'',//医护职称
                jobNumber:'',//工号
                // workUnit:'',//工作单位
                electionUnit:'',//选送单位
                graduatedSchool:'',//毕业院校
                urtherStudyStartTime:'',//进修开始时间
                furtherStudyEndTime:'',//进修结束时间
                studentNum:'',//学号
                studentClass:'',//班级
                school:'',//学校
                practiceStartTime:'',//实习开始时间
                practiceEndTime:'',//实习结束时间段
                professionalDirection:'',//专业方向
                graduationYear:'',//毕业年份
                userCategoryId:'',//用户分类表id
            },
            sex:[
                {value:0,name:"男"},
                {value:1,name:"女"},
            ],
            rankList:[//职称
                {value:0,name:"药师"},
                {value:1,name:"主管药师"},
                {value:2,name:"副主任药师"},
                {value:3,name:"主任药师"},
            ],
            departmentList:[//部门
                {value:0,name:'办公室'},
                {value:1,name:'临床药学'},
                {value:2,name:'制剂室'},
                {value:3,name:'南院西药房'},
                {value:4,name:'北院西药房'},
                {value:5,name:'南院PIVAS'},
                {value:6,name:'北院PIVAS'},
                {value:7,name:'南院中心药房'},
                {value:8,name:'北院中心药房'},
                {value:9,name:'南院中药房'},
                {value:10,name:'北院中药房'},
            ],
            professionList:[//专业
                { value:0,name:"中药"},
                { value:1,name:"西药"},
            ],
            educationProfessionalList:[//进修专业
                {value:0,name:"临床药学抗感染专业"},
                {value:1,name:"临床药学心血管专业"},
                {value:2,name:"临床药学肾病专业"},
                {value:3,name:"临床药学肿瘤专业"},
                {value:4,name:"临床药学通科专业"},
            ],
            degreeList:[//学位
                {value:0,name:"学士"},
                {value:1,name:"硕士"},
                {value:2,name:"博士"},
            ],
            medicRankList:[//医护职称
                {value:0,name:"初级"},
                {value:1,name:"中级"},
                {value:2,name:"高级"},
            ],
            userClass:[],//用户分类
            selectedClass:''
        };
    },
    mounted(){
        this.userInfo=JSON.parse(localStorage.getItem("userInfo"))
        this.userInfoFrom.userName=this.userInfo.userName
        this.findUserClass();
        if(this.userInfo.headUrl!=null){
            this.userInfoFrom.avatar=this.userInfo.headUrl
        }
        this.headers={
            ['ACCESS-TOKEN']:localStorage.getItem("token"),
            ['User-Id']:localStorage.getItem("User_Id")
        }
    },
    methods: {
        getName(item){
            this.selectedClass=item;
            this.userInfoFrom.userCategoryId=item.id
        },
        // 查询用户分类
        findUserClass(){
            this.$http.get("user/findAllCategory").then(res=>{
                console.log(res);
                if(res.code==0){
                    res.data.splice(0,1);
                    this.userClass=res.data
                }
            })
        },
        boundPassword(){
            if(this.passwordPhone){
                this.$Message.warning("请输入手机号")
            }else if(this.passwordVer==""){
                this.$Message.warning("请输入验证码")
            }else if(this.newPassword==""){
                this.$Message.warning("请输入新密码")
            }else{
                this.upPassword()
            }
        },
        // 修改密码
        upPassword(){
            let data={
                mobilePhone:this.userInfo.mobilePhone,
                msgCode:this.passwordVer,
                password:this.newPassword
            }
            this.$http.form("user/update/password",data).then(res=>{
                if(res.code==0){
                    this.$Message.success('修改成功');
                    this.psdAlert=false;
                    this.wait_timer=false;
                }
            })

        },
        boundPhone(){
            if(this.phone==""){
                this.$Message.warning("请输入手机号")
            }else if(this.newPhoneVer==""){
                this.$Message.warning("请输入验证码")
            }else{
                this.updataNewPhone();
            }
        },
        next(){
            this.verifyPhone();
        },
        // 短信验证码
        getMobileCodeText(){
            if(this.wait_timer > 0){
                return this.wait_timer+'s后获取';
            }

            if(this.wait_timer === 0){
                return '重新获取';
            }

            if(this.wait_timer === false){
                return '获取验证码';
            }

        },
        // 获取短信验证码
        getVerCode(){
            let phone=""
            if(this.modelType=="phone"){
                if(this.first){
                    phone=this.userInfo.mobilePhone
                }else{
                    phone=this.phone
                }
            }else if(this.modelType=="password"){
                phone=this.userInfo.mobilePhone
            }
            
            if(phone){
                if (this.wait_timer > 0) {
                    return false;
                }
                this.wait_timer = 59;
                var that = this;
                var timer_interval = setInterval(function(){
                    if(that.wait_timer > 0){
                        that.wait_timer -- ;
                    }else{
                        clearInterval(timer_interval);
                    }
                },1000);
                this.verContent=this.getMobileCodeText();
                if(this.modelType=="phone"){
                    this.updateByPhone();
                }else if(this.modelType=="password"){
                    this.uppdateByPassword();
                }
            }
        },
        // 修改手机号
        updataNewPhone(){
            let data={
                mobilePhone:this.phone,
                msgCode:this.newPhoneVer
            }
            this.$http.form("user/update/phone",data).then(res=>{
                if(res.code==0){
                    this.$Message.success('修改成功');
                    localStorage.setItem('userInfo',JSON.parse(res.data))
                    this.userInfo=res.data
                    this.phoneAlert=false;
                    this.first=true;
                    this.wait_timer=false;
                }
            })
        },
        // 修改密码验证码
        uppdateByPassword(){
            this.$http.form("sms/update/password/code",{
                mobilePhone:this.userInfo.mobilePhone
            }).then(res=>{
                if(res.code==0){
                    this.$Message.success(res.message);
                }
            })
        },
        // 获取手机号验证码
        updateByPhone(){
            this.$http.form("sms/update/phone/code",{
                mobilePhone:this.first?this.userInfo.mobilePhone:this.phone
            }).then(res=>{
                if(res.code==0){
                    this.$Message.success(res.message);
                }
            })
        },
        // 验证是否修改手机号
        verifyPhone(){
            let data={
                mobilePhone:this.userInfo.mobilePhone,
                msgCode:this.oldPhoneVer
            }
            this.$http.form("user/verify/code",data).then(res=>{
                if(res.code==0){
                    this.first=false;
                    this.wait_timer=false;
                    // this.$Message.success(res.message);
                }
            })
        },
        onBeforeImgUploading() {
            this.imgUploadLoading = true;
        },
        onImgUploadInforSuccess(res) {
            this.imgUploadLoading = false;
            this.userInfoFrom.avatar = res.data || "";
        },
        handleImgFormatError(file) {
            this.$Notice.error({
                title: "文件格式错误",
                desc: "上传的文件格式是错误的，请选择jpg或者png格式的图片"
            });
        },
        // 保存个人资料
        save(){
            console.log("用户信息",this.userInfoFrom);
            let data=this.userInfoFrom;
            this.$http.post("user/update/resource",data).then(res=>{
                if(res.code==0){
                    this.$Message.success("修改成功")
                    localStorage.setItem('userInfo',JSON.stringify(res.data))
                }
            })
        },
        closePhoneAlert() {
            this.phoneAlert = false;
            this.first=true;
            this.wait_timer=false;
        },
        updatePhone() {
            this.phoneAlert = true;
            this.modelType="phone"
        },
        closePsdAlert(){
            this.psdAlert=false;
            this.wait_timer=false;
        },
        updatePsd(){
            this.psdAlert=true;
            this.modelType="password"
        },
        // 打开图片上传
        uploadHeadImg: function() {
            this.$el.querySelector(".hiddenInput").click();
        },
        // 将头像显示
        handleFile: function(e) {
            let $target = e.target || e.srcElement;
            let file = $target.files[0];
            var reader = new FileReader();
            reader.onload = data => {
                let res = data.target || data.srcElement;
                this.userInfo.avatar = res.result;
            };
            reader.readAsDataURL(file);
        }
    }
};
</script>

<style scoped lang="less">
.flex{
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
}
.content {
    .rightContent {
        width: 960px;
        background: #fff;
        border-radius: 2px;
        min-height: 800px;
        padding: 20px;
        .title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #eeeeee;
            padding: 0 0 20px;
            p {
                height: 30px;
                font-size: 22px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
                line-height: 30px;
            }
            .save {
                text-align: center;
                width: 88px;
                height: 40px;
                line-height: 40px;
                background: rgba(41, 178, 139, 1);
                border-radius: 4px;
                font-size: 15px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                cursor: pointer;
            }
        }
        .conBox {
            padding: 20px;
            margin-bottom: 20px;
            .line {
                height: 88px;
                line-height: 88px;
                display: flex;
                align-items: center;
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(102, 102, 102, 1);
                input {
                    width: 342px;
                    height: 40px;
                    background: rgba(255, 255, 255, 1);
                    border-radius: 2px;
                    border: 1px solid #eeeeee;
                }
                #upload {
                    .item_bock {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        background: #fff;
                    }
                    .head_img {
                        position: relative;
                        overflow: hidden;
                        width: 70px;
                        height: 70px;
                        cursor: pointer;
                        img {
                            width: 70px;
                            height: 70px;
                            border-radius: 50px;
                        }
                        .update {
                            position: absolute;
                            bottom: 0;
                            color: #fff;
                            background: rgba(0, 0, 0, 0.2);
                            width: 70px;
                            height: 35px;
                            line-height:35px;
                            text-align: center;
                            border-radius: 0 0 50px 50px;
                        }
                    }
                    .hiddenInput {
                        display: none;
                    }
                }
                .titleMsg {
                    width: 90px;
                }
                .button {
                    width: 88px;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    background: rgba(41, 178, 139, 1);
                    border-radius: 4px;
                    font-size: 15px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    margin-left: 60px;
                    color: rgba(255, 255, 255, 1);
                    cursor: default;
                }
            }
        }
        .conBox:last-child {
            border-bottom: 1px solid #ebeef2;
            padding-bottom: 80px;
        }
    }
    .alertMask {
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        position: fixed;
        background: rgba(0, 0, 0, 0.5);
        .alert {
            width: 500px;
            min-height: 376px;
            background: #fff;
            z-index: 999;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.05);
            border-radius: 5px;
            top: 50%;
            left: 50%;
            border-top: 3px solid #29b28b;
            position: absolute;
            margin-left: -250px;
            margin-top: -188px;
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
                text-align: center;
                .conTit {
                    width: 80%;
                    margin: 50px auto;
                    p:first-child {
                        height: 37px;
                        font-size: 26px;
                        font-family: PingFangSC-Medium, PingFang SC;
                        font-weight: 500;
                        color: rgba(51, 51, 51, 1);
                        line-height: 37px;
                    }
                    p:last-child {
                        font-size: 14px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: rgba(64, 72, 82, 1);
                    }
                }
                .inputBox {
                    .newInput {
                        width: 342px;
                        margin-bottom:20px;
                    }
                    width: 342px;
                    display: flex;
                    height: 40px;
                    line-height: 40px;
                    margin: 40px auto;
                    text-align: center;
                    input {
                        border: 1px solid #ddd;
                        width: 300px;
                        height: 40px;
                        padding-left: 10px;
                    }
                    .msg {
                        font-size: 14px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: rgba(64, 72, 82, 1);
                        border: 1px solid #ddd;
                        padding: 0 8px;
                        width: 80px;
                    }
                    .code {
                        width: 110px;
                        border: 1px solid #ddd;
                        padding: 0 8px;
                        cursor: default;
                        font-size: 14px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: rgba(41, 178, 139, 1);
                    }
                }
                .phoneBox {
                    margin: 40px 0;
                }
                .button {
                    margin: 35px auto;
                    width: 200px;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    background: rgba(41, 178, 139, 1);
                    border-radius: 2px;
                    font-size: 15px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 1);
                    cursor: default;
                }
            }
        }
    }
}
</style>