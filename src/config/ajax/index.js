// 引用axios
const axios = require('axios')
import config from '@/config'

// 配置API接口地址
const root = 'http://localhost:8081/lion'


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

/*
  接口处理函数
  这个函数每个项目都是不一样的，我现在调整的是适用于
  https://cnodejs.org/api/v1 的接口，如果是其他接口
  需要根据接口的参数进行调整。参考说明文档地址：
  https://cnodejs.org/topic/5378720ed6e2d16149fa16bd
  主要是，不同的接口的成功标识和失败提示是不一致的。
  另外，不同的项目的处理方法也是不一致的，这里出错就是简单的alert
*/
function apiAxios ({method, url, params, success, failure}) {
    if (params) {
        params = filterNull(params)
    }
    console.log('ajax request => ' + root+url)

    axios({
        method: method,
        url: url,
        data: method === 'POST' || method === 'PUT' ? params : null,
        params: method === 'GET' || method === 'DELETE' ? params : null,
        baseURL: root,
        withCredentials: false
    }).then((res)=> {
        let data = res.data
        console.log('ajax result => ')
        console.log(data)

            if (data.code === config.result_code.success) {
                if (success) {
                    success(data)
                }
            } else {
                if (failure) {
                    failure(data)
                } else {
                    window.alert('error: ' + JSON.stringify(data))
                }
            }
        })
        .catch( (err) =>{
            let res = err.response
            if (err) {
                // window.alert('api error, HTTP CODE: ' + res.status)
            }
        })
}

// 返回在vue模板中的调用接口

export default  {
    get : ({url, params, success, failure})=> apiAxios({method:'GET',url, params, success, failure}),
    post : (url, params, success, failure) => apiAxios({method:'POST', url, params, success, failure}),
    put : (url, params, success, failure) => apiAxios({method:'PUT', url, params, success, failure}),
    delete :(url, params, success, failure) => apiAxios({method:'DELETE', url, params, success, failure})
}

