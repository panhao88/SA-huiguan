import Vue from 'vue'
import api from '../../http/api'
import router from '../../router'
import { Message } from 'element-ui'
export default {
    // 开启命名空间,这个文件就是单独的一个vuex的模块
    namespaced: true,
    state: {
        dailylist: [], //操纵日志数据列表
        totalRow: 0,// 操纵日志条数
        loginLogList: [],//登录日志
        talrow: 0, //登录日志删除
    },
    mutations: {
        //操纵日志数据列表
        setdaily(state, data) {
            state.dailylist = data
        },
        // 操纵日志条数
        settotalRow(state, data) {
            state.totalRow = data
        },
        //登录日志
        setregister(state, data) {
            state.loginLogList = data
        },
        settalRow(state, data) {
            state.talrow = data
        }
    },
    actions: {
        //操纵日志
        async getsysLogList({ commit }, { pageNo, pageSize }) {
            try {
                let res = await api.getsysLogList({ pageNo, pageSize })
                if (res.code === 200) {
                    commit("setdaily", res.data)
                    commit("settotalRow", res.totalRow)
                    console.log(res, "操纵日志")
                }
                else  {
                    localStorage.setItem("showbox",true)
                    Message.error(res.msg)
                }
            } catch (err) {
                console.log(err)
            }
        },
        //删除操作日志
        async dellog({ dispatch }, { ids, pageNo, pageSize }) {
            try {
                let res = await api.dellog({ ids })
                if (res.code === 200) {
                    dispatch("getsysLogList", {
                        pageNo, pageSize
                    })
                    Message.success(res.msg)
                } else  {
                    Message.error(res.msg)
                }
                console.log(res, "删除操作日志")
            } catch (err) {
                console.log(err)
            }
        },
        //登录日志
        async getloginLogList({ commit }, { pageNo, pageSize }) {
            try {
                let res = await api.getloginLogList({ pageNo, pageSize })
                if (res.code === 200) {
                    commit("setregister", res.data)
                    commit("settalRow", res.totalRow)
                } else  {
                    localStorage.setItem("showbox",true)
                    Message.error(res.msg)
                }
                console.log(res, "登录日志")
            } catch (err) {
                console.log(err)
            }
        },
        //删除登录日志
        async getdeleteLoginLog({ dispatch }, { createAt, pageNo, pageSize }) {
            try {
                let res = await api.getdeleteLoginLog({ createAt })
                if (res.code === 200) {
                    dispatch("getloginLogList", {
                        pageNo, pageSize
                    })
                    Message.success(res.msg)
                } else  {
                    Message.error(res.msg)
                }
                console.log(res, "删除操作日志")
            } catch (err) {
                console.log(err)
            }
        }
    }
}