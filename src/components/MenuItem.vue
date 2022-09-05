<template>
    <div>
    <template v-for="menu in menuList">
        <el-submenu v-if="menu.children.length > 0" :index="menu.path" :key='menu.path'>
            <template slot="title">
                <i :class="menu.icon"></i>
                <span slot="title">{{menu.label}}</span>
            </template>
            <menu-item :menuList="menu.children"></menu-item>
        </el-submenu>
        <el-menu-item slot="title" @click="selectMenu(menu)" v-else :index="menu.path">
                <i :class="menu.icon"></i>
                <span slot="title">{{menu.label}}</span>
        </el-menu-item>
    </template>
    <!-- 这是自己手动写的导航菜单 -->
        <!-- <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">系统管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="1-1">项目组管理</el-menu-item>
                <el-menu-item index="1-2">用户管理</el-menu-item>
                <el-menu-item index="1-3">角色管理</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">工作日常</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="1-1">个人周报</el-menu-item>
                <el-submenu index="1-2">
                    <span slot="title">新人指引</span>
                    <el-menu-item index="1-2-1">技术手册</el-menu-item>
                    <el-menu-item index="1-2-1">日常工具</el-menu-item>
                </el-submenu>
                <el-menu-item index="1-3">新人日报</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">产品中心</span>
            </template>
            <el-submenu index="3-1">
                <span slot="title">1.今日招标</span>
                <el-submenu index="3-1-1">
                    <span slot="title">1.1项目计划</span>
                    <el-menu-item index="3-1-1-1">1.1.1服务器选型</el-menu-item>
                </el-submenu>
                <el-submenu index="3-1-2">
                    <span slot="title">1.2产品预研</span>
                    <el-menu-item index="3-1-2-1">乙方宝分析</el-menu-item>
                    <el-menu-item index="3-1-1-1">今日招标分析</el-menu-item>
                    <el-menu-item index="3-1-1-1">千里马分析</el-menu-item>
                    <el-menu-item index="3-1-1-1">数据源分析</el-menu-item>
                    <el-menu-item index="3-1-1-1">沟通记录</el-menu-item>
                    <el-menu-item index="3-1-1-1">用户分析</el-menu-item>
                    <el-menu-item index="3-1-1-1">竞品分析</el-menu-item>
                    <el-submenu index="3-1-2-7">
                        <span slot="title">软件资源</span>
                        <el-menu-item index="3-1-2-7-1">华为市场</el-menu-item>
                        <el-menu-item index="3-1-2-7-2">小米市场</el-menu-item>
                        <el-menu-item index="3-1-2-7-3">苹果审核指南</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-submenu index="3-1-3">
                    <span slot="title">1.3数据爬虫</span>
                    <el-menu-item index="3-1-3-1">1.1.1服务器选型</el-menu-item>
                </el-submenu>
                <el-menu-item index="3-1-4">1.4数据清洗</el-menu-item>
            </el-submenu>
        </el-submenu>
        <el-submenu index="4">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">技术服务</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="4-1">1.服务规划</el-menu-item>
            </el-menu-item-group>
        </el-submenu> -->
    </div>
</template>

<script>
import MenuItem from './MenuItem.vue'
export default {
    name:'MenuItem',
    props:['menuList'],
    components:{
        MenuItem,
    },
    methods: {
        selectMenu(item) {
            // 设置选项卡
            this.$store.commit('selectMenu',item);
            // 设置路由
            this.$router.push({name:item.name});
        }
    },
}
</script>

<style lang="scss" scoped>
</style>