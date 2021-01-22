
import Vue from 'vue'
import api from '../../http/api'
import router from '../../router'
import { Message } from 'element-ui'

export default {
    // 开启命名空间,这个文件就是单独的一个vuex的模块
    namespaced: true,
    state: {
        merchandislist:[] , // 跟单管理列表
        totalRowg:0 ,//列表总数
    },
    mutations: {
        // 跟单管理列表
        setmerchandis(state,data){
            state.merchandislist = data
        },
        settodoshu(state,data){
            state.totalRowg = data
        }
    },
    actions: {
        //跟单列表
        async getmerchandis({ commit }, {cid, pageNo, pageSize }) {
            try {
                let res = await api.getmerchandis({cid,pageNo, pageSize})
                if (res.code === 200) {
                    res.data.map(item => {
                        if(item.termination === 0){
                            item.termination = "否"
                        }
                        if(item.termination === 1){
                            item.termination = "是"
                        }
                    })
                    commit("setmerchandis", res.data)
                    commit("settodoshu", res.totalRow)
                } else  {
                    localStorage.setItem("showbox",true)
                    Message.error(res.msg)
                }
                console.log(res, "客户跟单列表")
            } catch (err) {
                console.log(err)
            }
        },
        //跟单列表添加
        async addmerchandis({ dispatch }, {cid,content,termination,lastAt,terminationAt,pageNo, pageSize }) {
            try {
                let res = await api.addmerchandis({cid,content,termination,lastAt,terminationAt})
                if (res.code === 200) {
                    dispatch("getmerchandis", {
                       cid,pageNo, pageSize
                    })
                    Message.success(res.msg)
                } else  {
                    Message.error(res.msg)
                }
                console.log(res,"跟单添加")
            } catch (err) {
                console.log(err)
            }
        },
        //跟单列表编辑
        async updatemerchandis({ dispatch }, { cid,content,termination,lastAt,terminationAt, pageNo, pageSize,id }) {
            try {
                let res = await api.updatemerchandis({ cid,content,termination,lastAt,terminationAt,id})
                if (res.code === 200) {
                    dispatch("getmerchandis", {
                       cid,pageNo, pageSize
                    })
                    Message.success(res.msg)
                } else  {
                    Message.error(res.msg)
                }
            } catch (err) {
                console.log(err)
            }
        },
        //跟单列表删除
        async detelemerchandis({ dispatch }, { id,cid, pageNo, pageSize }) {
            try {
                let res = await api.detelemerchandis({ id,cid })
                if (res.code === 200) {
                    dispatch("getmerchandis", {
                       cid, pageNo, pageSize
                    })
                    Message.success(res.msg)
                } else  {
                    Message.error(res.msg)
                }
            } catch (err) {
                console.log(err)
            }
        },
    }
}