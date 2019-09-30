// 引用axios
import axios from 'axios'
import config from '@/config'
import iView from 'iview'

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

http.interceptors.response.use(response => {
    if (response.data && response.data.code === 500) {

    }
    return response
}, error => {
    return Promise.reject(error)
})


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


function apiAxios ({method, url, params, success, failure}) {
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
        console.log('ajax result => ')
        console.log(data)
            if (data.code === config.result_code.success) {
                if (success) {

                    iView.Notice.success({
                        title: '提示',
                        desc: data.message
                    });
                    success(data)
                }
            } else {
                if (failure) {
                    failure(data)
                } else {
                    iView.Notice.error({
                        title: '提示',
                        desc: '系统错误'
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
    get : ({url, params, success, failure})  => apiAxios({method:'GET', url, params, success, failure}),
    post : ({url, params, success, failure}) => apiAxios({method:'POST', url, params, success, failure}),
    put : ({url, params, success, failure}) => apiAxios({method:'PUT', url, params, success, failure}),
    delete :({url, params, success, failure}) => apiAxios({method:'DELETE', url, params, success, failure})
}

