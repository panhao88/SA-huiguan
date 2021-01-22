import Vue from 'vue'
import api from '../../http/api'
import router from '../../router'
import { Message } from 'element-ui'
export default {
    // 开启命名空间,这个文件就是单独的一个vuex的模块
    namespaced: true,
    state: {
        rolelist: [],//角色
        totalRow: 0, //角色总条数
        allmenu: [], //权限菜单
    },
    mutations: {
        // 角色列表
        setrolelist(state, data) {
            state.rolelist = data
        },
        // 权限菜单
        setallmenu(state, data) {
            state.allmenu = data
        },
        settotalRow(state, data) {
            state.totalRow = data
        }
    },
    actions: {
        //登录
        async login({ commit }, { username, password ,captcha}) {
            try {
                let res = await api.login({ username, password,captcha })
                if (res.code === 200) {
                    Message.success("登录成功")
                    localStorage.setItem('adminUser', JSON.stringify(res.account))
                    localStorage.removeItem("showbox");
                    router.push('/')
                    console.log(res, "登录")
                }else{
                    Message.error(res.msg)
                }
            } catch (err) {
                console.log(err)
            }
        },
        //退出登录
        async getexit({ dispatch }) {
            try {
                let res = await api.getexit()
                console.log(res, "退出登录")
            } catch (err) {
                console.log(err)
            }
        },
        //角色列表
        async role({ commit }, { pageNo, pageSize, name, lock }) {
            try {
                let res = await api.role({ pageNo, pageSize, name, lock })
                if (res.code === 200) {
                    commit('setrolelist', res.data)
                    commit('settotalRow', res.totalRow)
                    res.data.map(item => {
                        if (item.lock === "1") {
                            item.lock = false
                        } else if (item.lock === "0") {
                            item.lock = true
                        }
                    })
                }else {
                    localStorage.setItem("showbox",true)
                    Message.error(res.msg)
                }
                console.log(res, "角色列表")
            } catch (err) {
                console.log(err)
            }
        },
        //新增角色
        async getadd({ dispatch }, { name, info, pageNo, pageSize }) {
            try {
                let res = await api.getadd({ name, info })
                if (res.code === 200) {
                    dispatch("role", { pageNo, pageSize })
                    Message.success(res.msg)
                }else{
                    Message.success("添加失败")
                }
                console.log(res, "新增角色")
            } catch (err) {
                console.log(err)
            }
        },
        //修改角色
        async Modifythe({ dispatch }, { name, info, id, lock,pageNo, pageSize}) {
            try {
                let res = await api.Modifythe({ name, info, id, lock })
                if (res.code === 200) {
                    dispatch("role",{pageNo, pageSize})
                    Message.success(res.msg)
                }else{
                    Message.error(res.msg)
                }
                console.log(res, "修改角色")
            } catch (err) {
                console.log(err)
            }
        },
        //删除角色
        async delrole({ dispatch }, { id, pageNo, pageSize }) {
            try {
                let res = await api.delrole({ id })
                if (res.code === 200) {
                    Message.success(res.msg)
                    dispatch("role", {
                        pageNo, pageSize
                    })
                } else {
                    Message.error("删除失败")
                }
                console.log(res, "删除角色")
            } catch (err) {
                console.log(err)
            }
        },
        //分配权限
        async getAssign({ dispatch }, { roleId, peris,pageNo, pageSize }) {
            try {
                let res = await api.getAssign({ roleId, peris })
                if(res.code === 200){
                    Message.success(res.msg)
                    dispatch("role", {
                        pageNo, pageSize
                    })
                }else {
                    Message.error(res.msg)
                }
                console.log(res, "分配权限")
            } catch (err) {
                console.log(err)
            }
        },
        // 权限菜单
        async getAllMenu({ commit }) {
            try {
                let res = await api.getAllMenu()
                if (res.code === 200) {
                    res.data.map(item => {
                        if(item.children && item.children.length > 0){
                            item.children.map(item1 => {
                                if(item1.children && item1.children.length > 0){
                                    item1.children.map(item2 => {
                                            Vue.set(item2, "disabled",true)
                                    })    
                                }else{
                                    Vue.set(item1, "disabled",true)
                                }
                            })
                        }
                    })
                    commit("setallmenu", res.data)
                } else  {
                    localStorage.setItem("showbox",true)
                    Message.error(res.msg)
                }
                console.log(res, "权限菜单1111")
            } catch (err) {
                console.log(err)
            }
        },
        
        //删除权限菜单
        async del({ dispatch }, { id }) {
            try {
                let res = await api.del({ id })
                if (res.code === 200) {
                    dispatch("getAllMenu")
                    Message.success(res.msg)
                } else {
                    Message.error(res.msg)
                }
                console.log(res, "删除权限列表")
            } catch (err) {
                console.log(err)
            }
        },
        //编辑权限菜单
        async getupdate({ dispatch }, { pname, actionKey, viewPath, icon, ptype, pid, remark, id }) {
            try {
                let res = await api.getupdate({ pname, actionKey, viewPath, icon, ptype, pid, remark, id })
                if (res.code === 200) {
                    Message.success(res.msg)
                    dispatch("getAllMenu")
                } else {
                    Message.error("编辑失败")
                }
                console.log(res, "编辑权限菜单")
            } catch (err) {
                console.log(err)
            }
        },
        //新增权限菜单
        async addpermissions({ dispatch }, { pname, actionKey, viewPath, icon, ptype, pid, remark }) {
            try {
                let res = await api.addpermissions({ pname, actionKey, viewPath, icon, ptype, pid, remark })
                if(res.code === 200){
                    Message.success(res.msg)
                    dispatch("getAllMenu")
                }
                console.log(res, "新增权限菜单")
            } catch (err) {
                console.log(err)
            }
        },
        //刷新权限缓存
        async Therefresh({ dispatch }) {
            try {
                let res = await api.Therefresh()
                if(res.code === 200){
                    Message.success(res.msg)
                    dispatch("getAllMenu")
                }else{
                    Message.error("同步失败")
                }
                console.log(res, "刷新权限缓存")
            } catch (err) {
                console.log(err)
            }
        },
        // 权限同步
        async synchronous({ commit }) {
            try {
                let res = await api.synchronous()
                if(res.code === 200){
                    Message.success(res.msg)
                }else{
                    Message.error("同步失败")
                }
                console.log(res, "权限同步")
            } catch (err) {
                console.log(err)
            }
        },
        // 我的权限
        async mypermissions({ commit }) {
            try {
                let res = await api.mypermissions()
                console.log(res, "我的权限")
            } catch (err) {
                console.log(err)
            }
        },
    }
}