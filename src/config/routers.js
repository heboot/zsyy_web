export default [
    { path: '/', name: 'index', component: resolve => require(['../pages/index/index.vue'], resolve) },
    { path: '/index', name: 'index', component: resolve => require(['../pages/index/index.vue'], resolve) },
    // 课程
    { path: '/course', name: 'course', component: resolve => require(['../pages/course/course.vue'], resolve) },
    // 购买课程
    { path: '/courseBuy', name: 'course', component: resolve => require(['../pages/course/courseBuy.vue'], resolve) },
    // 课程详情
    { path: '/detail', name: 'course', component: resolve => require(['../pages/course/detail.vue'], resolve) },
    // 题库
    { path: '/question', name: 'question', component: resolve => require(['../pages/question/question.vue'], resolve) },
    // 试卷
    { path: '/testPaper', name: 'testPaper', component: resolve => require(['../pages/testPaper/testPaper.vue'], resolve) },
    // 试题
    { path: '/testQuestion', name: 'testQuestion', component: resolve => require(['../pages/testPaper/testQuestion.vue'], resolve) },
	// 练习
	{ path: '/exercise', name: 'exercise', component: resolve => require(['../pages/question/exercise.vue'], resolve) },
    // 答案
    { path: '/answer', name: 'answer', component: resolve => require(['../pages/question/answer.vue'], resolve) },
    // 通知
    { path: '/notice', name: 'notice', component: resolve => require(['../pages/notice/notice.vue'], resolve) },
    // 通知详情
    { path: '/noticeDetail', name: 'noticeDetail', component: resolve => require(['../pages/notice/noticeDetail.vue'], resolve) },
    // 用户信息列表
    {
        path: '/mine', name: 'mine', component: resolve => require(['../pages/mine/mine.vue'], resolve),
        children: [
            {
                //学习记录
                path: '/learningRecords',
                name: "learningRecords",
                component: resolve => require(['../pages/mine/learningRecords'], resolve),
            },
            {
                //我的收藏
                path: '/myCollection',
                name: "myCollection",
                component: resolve => require(['../pages/mine/myCollection'], resolve),
            },
            // {
            //     //学习任务
            //     path: '/tasks',
            //     name: "tasks",
            //     component: resolve => require(['../pages/mine/tasks'], resolve),
            // },
            // {
            //     //我的订单
            //     path: '/myOrder',
            //     name: "myOrder",
            //     component: resolve => require(['../pages/mine/myOrder'], resolve),
            // },
            // {
            //     //会员管理
            //     path: '/memberMgt',
            //     name: "memberMgt",
            //     component: resolve => require(['../pages/mine/memberMgt'], resolve),
            // },
            {
                //个人设置
                path: '/setting',
                name: "setting",
                component: resolve => require(['../pages/mine/setting'], resolve),
            },
            // {
            //     //职业认证
            //     path: '/certification',
            //     name: "certification",
            //     component: resolve => require(['../pages/mine/certification'], resolve),
            // },
            {
                //我的反馈
                path: '/feedback',
                name: "feedback",
                component: resolve => require(['../pages/mine/feedback'], resolve),
            },
        ]
    },
];