import axios from 'axios';
import { Message } from 'iview';
import storage from './storage';

axios.defaults.baseURL = '/uc'
let http = {}
const querystring = require('querystring');
http.ajax = axios.create();
// 增加请求头
http.ajax.interceptors.request.use(config => {
    // 从本地拿用户id
    const userId = storage.get("User_Id")
    // token
    config.headers['ACCESS-TOKEN'] = storage.get("token")
    // 增加用户id请求头
    config.headers['User-Id'] = userId;
    return config
}, function(error) {
    return Promise.reject(error);
});

//token过期重新登录
http.ajax.interceptors.response.use((response) => {
    // 用户禁用状态拦截
    if(response.data.code == '4000'){
        storage.clear();        //清除缓存  
        window.location="/";    //返回首页
        Message.error("登录失效，请重新登录...");
        return response;
    }
    return response;
}); 

// get
http.get = (url, data) => {
  return new Promise((resolve, reject) => {
    http.ajax.get(url, data || {}).then((res) => {
      if (res.status == 200) {
        if (res.data.code == 0) {
          resolve(res.data)
        } else {
          Message.error(res.data.message)
          reject(res.data.message)
        }
      } else {
        reject(res.status)
        Message.error(res.status)
      }
    }).catch((error) => {
      reject(error)
      Message.error(error)
    })
  })
}
// json
http.post = (url, data) => {
  return new Promise((resolve, reject) => {
    http.ajax.post(url, data).then((res) => {
      if (res.status == 200) {
        if (res.data.code == 0) {
          resolve(res.data)
        } else {
          Message.error(res.data.message);
          reject(res.data.message)
        }
      } else {
        reject(res.data);
      }
    }).catch((error) => {
      reject(error)
      Message.error(error)
    })
  })
}

// json
http.post2 = (url, data) => {
  return new Promise((resolve, reject) => {
    http.ajax.post(url, data).then((res) => {
      if (res.status == 200) {
        
          resolve(res.data)
         
      } else {
        reject(res.data);
      }
    }).catch((error) => {
      reject(error)
      Message.error(error)
    })
  })
}

// formd
http.form = (url, data) => {
    return new Promise((resolve, reject) => {
        http.ajax.post(url, querystring.stringify(data), {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        }).then((res) => {
            if (res.status == 200) {
                if (!res.data.code) {
                    resolve(res.data);
                    return;
                }
                if (res.data.code == 0) {
                    resolve(res.data);
                } else {
                    Message.error(res.data.message);
                    reject(res.data.message);
                }
            } else {
                reject(res.status || "失败");
            }
        }).catch((error) => {
            reject(error);
        })
    })
}

// 获取图片验证码
http.getImg=(url,data)=>{
    return new Promise((resolve, reject) => {
        http.ajax.post(url,querystring.stringify(data), {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            responseType: 'arraybuffer'
        }).then((res) => {
            resolve( 'data:image/png;base64,' + btoa(
                new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
            ))
        }).catch((error) => {
            reject(error);
        })
    })
}
export default http