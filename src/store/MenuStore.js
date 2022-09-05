import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 当作存储数据的
export default ({
    // 相当于一个内存，存储数据的，不能直接操作state里的数据
    // 需要mutations 来操作
    state: {
        // 当前激活的选项卡
        editableTabsValue: "desktoop",
        // 选项卡数据 默认的
        tabs:[
            {
                title: '首页',
                name:'desktop',
            },

        ]
    },
    mutations: {
        // 菜单点击的时候调用
        selectMenu(state,val) {
            // console.log(val);
            // 把当前点击的菜单对象加到 tabs 中
            let res = state.tabs.findIndex(item => item.name == val.name);
            // 判断 tabs 是否存在，不存在才加入 tabs
            if(res === -1) {
                let obj = {};
                obj.title = val.label;
                obj.name = val.name;
                state.tabs.push(obj);
            }
            // 设置当前选中的对象
            state.editableTabsValue = val.name;
            // 设置当前打开的选项卡
            sessionStorage.setItem('tabList',JSON.stringify(state.tabs));
        },
        // 设置当前选中选项卡
        getTabs(state) {
            let tabs = sessionStorage.getItem('tabList');
            if(tabs) {
                state.tabs = JSON.parse(tabs);
            }
        },
        // 设置当前激活的选项卡
        setActiveTabs(state,val) {
            state.editableTabsValue = val;
        }
    },
    actions: {
    },
})
