// 引用axios
import axios from 'axios'
import Config from '@/config'
import iView from 'view-design';
import Cookie from 'js-cookie'
import Router from '@/router';
// 配置API接口地址
const root = 'http://localhost:8091/lion'

const http = axios.create({
    timeout: 1000 * 60,
    withCredentials: true,
    baseURL: root,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
})
// 500 token 失效
http.interceptors.response.use(response => {
    if (response.data && response.data.code === "500") {
        Router.push({
            name: Config.loginUrl
         })
    }
    return response
}, error => {
    return Promise.reject(error)
})

 // 请求头带上token
http.interceptors.request.use(config => {
    config.headers['token'] = Cookie.get('token');
    return config;
  }, error => {
    return Promise.reject(error);
  });


// 自定义判断元素类型JS
const toType  = (obj) =>({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()


// 参数过滤函数
const filterNull = (list)=> {
    let arr = []
    for (let key in list) {
        let obj = list[key]

        if (obj === null) {
            delete list[key]
            continue
        }
        if (toType(obj) === 'string') {
            obj = obj.trim()

        } else if (toType(obj) === 'object') {
            obj = filterNull(obj)
        } else if (toType(obj) === 'array') {
            obj = filterNull(obj)
        }
        arr.push(obj)
    }
    return arr
}


function apiAxios ({method, notice=true, url, params, success, failure}) {
    if (params) {
        if((toType(params) === 'array')){
            params = filterNull(params)
        }

    }
    console.log('ajax request =>', root+url, 'params =>',params )
    http({
        method: method,
        url: url,
        data: method === 'POST' || method === 'PUT' ? params : null,
        params: method === 'GET' || method === 'DELETE' ? params : null,
        withCredentials: false
    }).then((res)=> {
        let data = res.data
        console.log('ajax result => ', data)
            if (data.code === Config.result_code.success) {
                if (success) {
                    if(notice){
                        iView.Notice.success({
                            title: '提示',
                            desc: data.message
                        });
                    }
                    success(data)
                }
            } else {
                if (failure) {
                    failure(data)
                } else {
                    let msg = data.message || '系统错误'
                    iView.Notice.error({
                        title: '提示',
                        desc: msg
                    });
                }
            }
        })
        .catch( (err) =>{
            console.log(err)
            iView.Notice.error({
                title: '提示',
                desc: '系统错误'
            });
        })
}

// 返回在vue模板中的调用接口

export default  {
    get : ({url, notice, params,  success, failure})  => apiAxios({method:'GET', notice,  url, params, success, failure}),
    post : ({url, notice,  params, success, failure}) => apiAxios({method:'POST', notice, url, params, success, failure}),
    put : ({url, notice,  params, success, failure}) => apiAxios({method:'PUT',notice,  url, params, success, failure}),
    delete :({url, notice,  params, success, failure}) => apiAxios({method:'DELETE', notice, url, params, success, failure})
}

