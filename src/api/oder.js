import request from '@/utils/request'
export default {
    // 获取列表数据
    getOderList(search) {
        return request({
            url: `/order`,
            method: 'get',
            params: search
        })
    },

}