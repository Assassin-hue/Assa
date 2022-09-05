import request from '@/utils/request'
export default {
    // 获取列表数据
    getMessageList(search) {
        return request({
            url: `/info`,
            method: 'get',
            params: search
        })
    },
    // 查询详情
    getMessageDetails(id) {
        return request({
            url: `/info/html`,
            method: 'get',
            params: id
        })
    },
    // 城市查询
    getMessageCity(parentId) {
        return request({
            url:`/city`,
            method: 'get',
            params: parentId
        })
    }

}