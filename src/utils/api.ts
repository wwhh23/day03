import http from "./http";

export const getLogin = (params: { username: string, password: string }) => {
    return http.post('/auth/login', params);
}
export const getList = (params: { current: number, pageSize: number, stem: string, keyWord: string, sorter: string }) => {
    return http.get('/admin/interview/query', params);
}
export const getCreate = (params: { stem: string, content: string }) => {
    return http.post('/admin/interview/create', params);
}
export const getCurrentUser = () => {
    return http.post('/auth/currentUser');
}
export const getshow = (params:{id:number}) => {
    return http.get('/admin/interview/show',params);
}