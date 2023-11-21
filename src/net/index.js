import axios from "axios";
import { accessHeader } from "@/net/auth";

const defaultError = (error) => {
    console.error(error)
    ElMessage.error("请求失败，请联系系统管理员！")
}

const defaultFailure = (message, status, url) => {
    console.warn(`请求地址: ${url}, 状态码: ${status}, 错误信息: ${message}`)
    ElMessage.warning(message)
}

function internalPost(url, data, headers, success, failure, error = defaultError){
    axios.post(url, data, { headers: headers }).then(({data}) => {
        if(data.code === 200)
            success(data.data)
        else
            failure(data.message, data.code, url)
    }).catch(err => error(err))
}

function post(url, data, success, failure = defaultFailure) {
    internalPost(url, data, accessHeader() , success, failure)
}


function internalGet(url, headers, success, failure, error = defaultError){
    axios.get(url, { headers: headers }).then(({data}) => {
        if(data.code === 200)
            success(data.data)
        else
            failure(data.message, data.code, url)
    }).catch(err => error(err))
}


function get(url, success, failure = defaultFailure) {
    internalGet(url, accessHeader(), success, failure)
}

export { defaultFailure, defaultError, post, get, internalGet, internalPost }