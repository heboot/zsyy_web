<template>
    <div id="login">
        <!-- 登录注册弹框 -->
        <div class="loginModel" v-if="loginP.showModel">
            <div class="login" v-if="login">
                <Icon type="ios-close" class="close" @click="close" sice="20" />
                <div class="loginTitle flex">
                    <div class="log" :class="{active:loginP.loginCur==0}" @click="loginType(0)">
                        <span>登录</span>
                        <p></p>
                    </div>
                    <div class="reg" :class="{active:loginP.loginCur==1}" @click="loginType(1)">
                        <span>注册</span>
                        <p></p>
                    </div>
                </div>
                <div class="inpList">
                    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
                        <FormItem prop="phone" class="inpItem">
                            <Input type="text" v-model="formInline.phone" placeholder="请输入手机号"></Input>
                        </FormItem>
                        <FormItem prop="verImgCode" class="inpItem verifyByPhone" v-if="loginP.loginCur==1">
                            <div class="verifyBox flex">
                                <Input type="text" style="width:70%;" class="verCodeInp" v-model="formInline.verImgCode"
                                    placeholder="请输入图片验证码"></Input>
                                <img :src="captchaPath" alt="" class="codeImg" @click="getCaptcha">
                            </div>
                        </FormItem>
                        <FormItem prop="verCode" class="inpItem verifyByPhone" v-if="loginP.loginCur==1">
                            <div class="verifyBox flex">
                                <Input type="text" style="width:70%;border:none" class="verCodeInp"
                                    v-model="formInline.verCode" placeholder="请输入验证码"></Input>
                                <div @click="getVerCode">
                                    <p>{{getMobileCodeText()}}</p>
                                </div>
                            </div>
                        </FormItem>
                        <FormItem prop="password" class="inpItem">
                            <Input type="password" v-model="formInline.password" placeholder="请输入密码"></Input>
                        </FormItem>
                    </Form>
                    <div class="saveLogin">
                        <div class="flex" v-if="loginP.loginCur==1">
                            <img :src="checked?checkAUrl:checkUrl" alt @click="choseType" />
                            <span>
                                我已同意并阅读
                                <span style="color:#29B28B;cursor: default;">【用户条款】</span>
                            </span>
                        </div>
                        <div class="flex-btween" v-if="loginP.loginCur==0">
                            <!-- <div class="flex">
                                <img :src="checked?checkAUrl:checkUrl" alt @click="choseType" />
                                <span>10天内自动登录</span>
                            </div> -->
                            <div @click="backPassword" style="cursor: default;">忘记密码</div>
                        </div>
                    </div>
                     <!-- :class="{active:checked}" -->
                    <div class="btn active" v-if="loginP.loginCur==0" @click="userLogin">登录</div>
                    <div class="btn" :class="{active:checked}" v-if="loginP.loginCur==1" @click="register">
                        
                        {{registerText}}</div>
                </div>
            </div>
            <!-- 找回密码 -->
            <div class="login backPassword" v-if="!login" sice="20">
                <Icon type="ios-arrow-back" @click="back" class="close" />
                <div class="loginTitle flex-center">
                    <div>找回密码</div>
                </div>
                <div class="inpList">
                    <Form ref="formForget" :model="formForget" :rules="ruleForget">
                        <FormItem prop="mobilePhone" class="inpItem">
                            <Input type="text" v-model="formForget.mobilePhone" placeholder="请输入手机号"></Input>
                        </FormItem>
                        <FormItem prop="code" class="inpItem verifyByPhone">
                            <div class="verifyBox flex">
                                <Input type="text" style="width:70%;" class="verCodeInp" v-model="formForget.code"
                                    placeholder="请输入图片验证码"></Input>
                                <img :src="captchaPath" alt="" class="codeImg" @click="getCaptcha">
                            </div>
                        </FormItem>
                        <FormItem prop="msgCode" class="inpItem verifyByPhone">
                            <div class="verifyBox flex">
                                <Input type="text" style="width:70%;border:none" class="verCodeInp"
                                    v-model="formForget.msgCode" placeholder="请输入验证码"></Input>
                                <div @click="getForgetVerCode">
                                    <p>{{getMobileCodeText()}}</p>
                                </div>
                            </div>
                        </FormItem>
                        <FormItem prop="password" class="inpItem">
                            <Input type="password" v-model="formForget.password" placeholder="请输入新密码"></Input>
                        </FormItem>
                    </Form>
                    <div class="saveLogin">
                        <div class="flex">
                            <img :src="checked?checkAUrl:checkUrl" alt @click="choseType" />
                            <span>
                                我已同意并阅读
                                <span style="color:#29B28B;cursor: default;">【用户条款】</span>
                            </span>
                        </div>
                    </div>
                    <div class="btn" :class="{active:checked}" v-if="loginP.loginCur==0" @click="updatePsd">确定</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import storage from "../config/storage";
// 图片验证码方法
export function getUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
        return (c === "x"
            ? (Math.random() * 16) | 0
            : "r&0x3" | "0x8"
        ).toString(16);
    });
}
export default {
    inject: ["reload"],
    name: "loginModel",
    props: {
        loginInfo: {
            type: Object
        }
    },
    data() {
        return {
            isRegister:false,
            formForget:{
                mobilePhone:"",
                msgCode:"",
                password:"",
                code:""
            },
            registerText:"注册",
            ruleForget:{
                mobilePhone: [
                    {
                        required: true,
                        message: "请输入手机号",
                        trigger: "blur"
                    },
                    {
                        pattern: /^1[3456789]\d{9}$/,
                        message: "手机号码格式不正确",
                        trigger: "blur"
                    }
                ],
                password: [
                    { required: true, message: "请输入新密码", trigger: "blur" },
                    {
                        type: "string",
                        min: 6,
                        message: "密码格式为6位以上",
                        trigger: "blur"
                    }
                ],
                code: [
                    { required: true, message: "请输入验证码", trigger: "blur" }
                ],
                msgCode: [
                    {
                        required: true,
                        message: "请输入图片验证码",
                        trigger: "blur"
                    }
                ]
            },
            loginP: {
                loginCur: 0,
                showModel: false
            },
            formInline: {
                phone: "",
                password: "",
                verCode: "",
                verImgCode: ""
            },
            ruleInline: {
                phone: [
                    {
                        required: true,
                        message: "请输入手机号",
                        trigger: "blur"
                    },
                    {
                        pattern: /^1[3456789]\d{9}$/,
                        message: "手机号码格式不正确",
                        trigger: "blur"
                    }
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    {
                        type: "string",
                        min: 6,
                        message: "密码格式为6位以上",
                        trigger: "blur"
                    }
                ],
                verCode: [
                    { required: true, message: "请输入验证码", trigger: "blur" }
                ],
                verImgCode: [
                    {
                        required: true,
                        message: "请输入图片验证码",
                        trigger: "blur"
                    }
                ]
            },
            isRouterAlive: true,
            showLoginList: false, //显示用户列表
            selectShow: false, //头部下拉框内容
            historyShow: false, //历史搜索内容
            nologin: false, //登录状态
            routeName: "/", //当前路由
            searchKey: "", //搜索关键字
            showModel: true,
            loginCur: 0,
            checked: true,
            checkUrl: require("@/assets/imgs/index/loginCheck.png"),
            checkAUrl: require("@/assets/imgs/index/loginCheckA.png"),
            login: true,
            wait_timer: false,
            verContent: "",
            uuid: "",
            captchaPath: "", //图片验证码
            isLogin: false
        };
    },
    created() {
        this.getCaptcha(); //获取图片验证码
    },
    destroyed(){
        this.isRegister = false;
    },
    methods: {
        isShow() {
            this.showModel = true;
            this.$emit("showLogin");
        },
        // 注册
        register() {
             this.$refs["formInline"].validate(valid => {
                  if (valid) {
                      let data = {
                mobilePhone: this.formInline.phone,
                password: this.formInline.password,
                msgCode: this.formInline.verCode,
                uuid: this.uuid,
                code: this.formInline.verImgCode
            };
            console.log("注册状态",this.isRegister)
            if(this.isRegister){
                return
            }
            this.isRegister = true;
            this.registerText = "注册中";
            this.$http.post2("/register/user/phone", data).then(res => {
                console.log(res);
                if (res.code == 0) {
                    this.$Message.success(res.message);
                    // this.formInline.phone = "";
                    // this.formInline.password = "";
                    // this.formInline.verCode = "";
                    // this.formInline.verImgCode = "";
                    // this.loginP.loginCur = 0; //转为登录
                    
                    console.log("test login type", this.loginP.loginCur)
                    this.userLogin();
                }else{
                     Message.error(res.message)
                    this.isRegister = false;
                    this.registerText = "注册";
                }
            });
                  }
             });
            
            
        },
        // 登录
        userLogin() {
            if (!this.formInline.phone) {
                this.$Message.error("请输入手机号!");
                return;
            }
            if (!this.formInline.password) {
                this.$Message.error("请输入密码!");
                return;
            }
            this.$http.form("/login/user/phone", {
                    mobilePhone: this.formInline.phone,
                    password: this.formInline.password
                })
                .then(res => {
                    if (res.code == 0) {
                        console.log("test login type", this.loginP.loginCur)
                        this.$Message.success("登录成功!");
                        storage.set("User_Id", res.data.user.id);
                        storage.set("userInfo", JSON.stringify(res.data.user));
                        storage.set("token", res.data.token);
                        storage.set("isLogin", true);
                        this.isLogin = true;
                        this.loginP.showModel = false;
                        let obj = {
                            isLogin: this.isLogin,
                            userInfo: res.data.user
                        };
                        if(this.loginP.loginCur == 1){
                             this.isRegister = false;
                            this.$router.push("setting");
   this.registerText = "注册";
                            this.formInline.phone = "";
                    this.formInline.password = "";
                    this.formInline.verCode = "";
                    this.formInline.verImgCode = "";
                        }else{
                            this.reload();
                            location.reload();          
                        }
                        this.$emit("isLogin", obj);
                    }
                });
        },
        // 修改密码
        updatePsd(){
            this.$refs["formForget"].validate(valid => {
                if (valid) {
                    this.$http.post("/register/forget/phone", {
                        ...this.formForget,
                        uuid:this.uuid
                    }).then(res => {
                        if (res.code == 0) {
                            console.log(res);
                            this.$Message.success(res.message);
                            this.login = true;
                        }else{
                            this.$Message.error(res.message);
                        }
                    });
                }
            });
        },
        // 短信验证码
        getMobileCodeText() {
            if (this.wait_timer > 0) {
                return this.wait_timer + "s后获取";
            }

            if (this.wait_timer === 0) {
                return "重新获取";
            }

            if (this.wait_timer === false) {
                return "获取验证码";
            }
        },
        // 获取短信验证码
        getVerCode() {
            if (this.formInline.phone) {
                if (this.wait_timer > 0) {
                    return false;
                }
                this.wait_timer = 59;
                var that = this;
                var timer_interval = setInterval(function() {
                    if (that.wait_timer > 0) {
                        that.wait_timer--;
                    } else {
                        clearInterval(timer_interval);
                    }
                }, 1000);
                this.verContent = this.getMobileCodeText();
                this.$http
                    .form("sms/register/code", {
                        mobilePhone: this.formInline.phone
                    })
                    .then(res => {
                        if (res.code == 0) {
                            this.$Message.success(res.message);
                        }
                    });
            }else{
                this.$Message.error("请输入手机号码！");
            }
        },
        // 忘记密码的验证码
        getForgetVerCode(){
            console.log(this.formForget.mobilePhone)
            if (this.formForget.mobilePhone) {
                if (this.wait_timer > 0) {
                    return false;
                }
                this.wait_timer = 59;
                var that = this;
                var timer_interval = setInterval(function() {
                    if (that.wait_timer > 0) {
                        that.wait_timer--;
                    } else {
                        clearInterval(timer_interval);
                    }
                }, 1000);
                this.verContent = this.getMobileCodeText();
                this.$http.form("/sms/forget/password/code", {
                        mobilePhone: this.formForget.mobilePhone
                    })
                    .then(res => {
                        if (res.code == 0) {
                            this.$Message.success(res.message);
                        }
                    });
            }else{
                this.$Message.error("请输入手机号码！");
            }
        },
        // 获取图片验证码
        getCaptcha() {
            this.uuid = getUUID();
            this.$http
                .getImg("/register/captcha.jpg", {
                    uuid: this.uuid
                })
                .then(res => {
                    this.captchaPath = res;
                });
        },
        closeLoginList() {
            this.showLoginList = false;
        },
        // 找回密码
        backPassword() {
            this.login = false;
        },
        // 关闭弹出层
        close() {
            this.registerText = "注册";
            this.loginP.showModel = false;
        },
        // 返回上层
        back() {
            this.login = true;
        },
        // 登录/注册选项卡
        loginType(i) {
            for (let key in this.formInline) {
                this.formInline[key] = "";
            }
            this.loginP.loginCur = i;
        },
        // 选择登录保存
        choseType() {
            this.checked = !this.checked;
        },
        showLogin() {
            this.showLoginList = !this.showLoginList;
        }
    },
    // 监听当前路由
    watch: {
        loginInfo(e) {
            this.loginP = e;
        }
    }
};
</script>

<style lang="less">
a {
    text-decoration: none;
    color: #333333;
}
ul > li {
    list-style: none;
}
ul {
    margin: 0;
    padding: 0;
}
input {
    border: 0;
}
::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
}
.flex-btween {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.flex {
    display: flex;
    align-items: center;
}
.flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
}
.flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
}
.flex-end {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
// 弹框
.model {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    // z-index: 99999;
}
#login {
    width: 100%;
    .loginModel {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 222;
        .login {
            width: 380px;
            padding: 20px 30px;
            box-sizing: border-box;
            background: #fff;
            position: relative;
            .close {
                font-size: 40px;
                position: absolute;
                top: 20px;
                right: 15px;
            }
            .loginTitle {
                font-size: 16px;
                div {
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    justify-content: center;
                    cursor: default;
                    p {
                        width: 16px;
                        height: 4px;
                        border-radius: 2px;
                        margin-top: 4px;
                    }
                }
                .reg {
                    margin-left: 60px;
                }
                div.active {
                    font-size: 18px;
                    color: #29b28b;
                    font-weight: bold;
                    p {
                        background: #29b28b;
                    }
                }
            }
            .inpList {
                width: 100%;
                margin-top: 30px;
                .codeImg {
                    width: 150px;
                    height: 48px;
                }
                .inpItem,
                .verifyByPhone {
                    width: 100%;
                    height: 50px;
                    // margin-top: 25px;
                    input,
                    .verCodeInp {
                        width: 100%;
                        height: 48px;
                        background: #f2f2f2;
                        // padding: 0 20px;
                        box-sizing: border-box;
                        font-size: 14px;
                        border-radius: 2px;
                        outline: none;
                    }
                    input,
                    input:active {
                        border: none !important;
                        // border-bottom: 1px solid #d2d2d2 !important;
                        outline: none;
                        box-shadow: none;
                        width: 100%;
                    }
                    .verifyBox {
                        input {
                            width: 100%;
                        }
                        div {
                            width: 110px;
                            text-align: center;
                            // margin-left: 10px;
                            line-height: 48px;
                        }
                    }
                    p {
                        padding: 0 10px;
                        box-sizing: border-box;
                        color: #f00;
                        margin-top: 5px;
                    }
                }
                .verifyByPhone {
                    border-radius: 2px;
                    background: #f2f2f2;
                    .verifyBox {
                        div {
                            p {
                                width: 100%;
                                height: 30px;
                                border-left: 1px solid #ddd;
                                font-size: 14px;
                                color: #29b28b;
                                text-align: center;
                                line-height: 30px;
                                cursor: default;
                            }
                        }
                    }
                }
                .saveLogin {
                    // margin-top: 25px;
                    div {
                        font-size: 14px;
                        img {
                            width: 16px;
                            height: 16px;
                        }
                        span {
                            height: 16px;
                            line-height: 16px;
                            margin-left: 6px;
                        }
                    }
                }
                .btn {
                    width: 100%;
                    height: 48px;
                    background: #ddd;
                    color: #fff;
                    text-align: center;
                    line-height: 48px;
                    font-size: 18px;
                    margin-top: 40px;
                    border-radius: 6px;
                    cursor: default;
                }
                .btn.active {
                    background: #29b28b;
                }
            }
        }
        .backPassword {
            .close {
                position: absolute;
                left: 30px;
                font-size: 24px;
                font-weight: 300;
            }
        }
    }
}
</style>
