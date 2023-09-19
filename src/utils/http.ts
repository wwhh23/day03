import axios, { AxiosInstance } from 'axios';
import { ElLoading, ElMessage } from 'element-plus';

class Request {
    instance: AxiosInstance;
    loading: any;
    constructor() {
        this.instance = axios.create({
            baseURL: 'http://interview-api-t.itheima.net/'
        })
        this.instance.interceptors.request.use(config => {
            config.headers.Authorization = 'Bearer' + ' ' + localStorage.getItem('token');
            return config;
        }, err => {
            Promise.reject(err);
        })

        this.instance.interceptors.response.use(result => {
            return result;
        }, err => {
            Promise.reject(err);
        })
    }

    async get(url: string, data?: any) {
        let res = await this.instance({
            url: url,
            method: 'get',
            params: data
        })
        return res;
    }
    async post(url: string, data?: any) {
        let res = await this.instance({
            url: url,
            method: 'post',
            data: data
        })
        return res;
    }
    async put(url: string, data?: any) {
        let res = await this.instance({
            url: url,
            method: 'put',
            data: data
        })
        return res;
    }
    async delete(url: string, data?: any) {
        let res = await this.instance({
            url: url,
            method: 'delete',
            params: data
        })
        return res;
    }
}


export default new Request();