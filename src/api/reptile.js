import request from '@/utils/request'
export default {
    // 获取列表数据
    getReptileList(search) {
        return request({
            url: `/source`,
            method: 'get',
            params: search
        })
    },
    // 根据 id 查询,   有点多余
    getReptileListId(id) {
        return request({
            url: `/source`,
            method: 'get',
            params: id
        })
    },
    // 添加爬虫数据
    addReptile(data) {
        return request({
            url: `/source`,
            method: 'post',
            // params:search
            params: data
        })
    },
    // 删除
    deleteReptile(id) {
        return request({
            url: `/source`,
            method: 'delete',
            params: id
        })
    },
    // 更新爬虫数据
    updateReptile(data) {
        return request({
            url: `/source/`,
            method: 'put',
            params: data
        })
    },
    // 日志查询
    journalReptile(data) {
        return request({
            url: `/source/log`,
            method: 'get',
            params: data
        })
    }
}