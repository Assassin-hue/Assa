import request from '@/utils/request'
export default {
    // 获取列表数据
    getUserList(search) {
        return request({
            url: `/user`,
            method: 'get',
            params: search
        })
    },
}