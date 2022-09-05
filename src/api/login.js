import request from '@/utils/request'
export default {
    // 获取列表数据
    getUser(dataOne) {
        return request({
            url: `/user/login`,
            method: 'post',
            data: dataOne
        })
    },

}