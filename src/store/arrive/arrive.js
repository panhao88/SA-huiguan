import Vue from 'vue'
import api from '../../http/api'
import router from '../../router'
import { Message } from 'element-ui'

export default {
    // 开启命名空间,这个文件就是单独的一个vuex的模块
    namespaced: true,
    state: {
        arrivelist:[] ,//到访列表
        totalRow:0, // //到访总数
    },
    mutations: {
        //到访列表
        setarrive(state,data){
            state.arrivelist = data
        },
        //到访总数
        settotalRow(state,data){
            state.totalRow = data
        }
    },
    actions: {
           //到访信息列表
           async getarrive({ commit }, { cid,pageNo, pageSize }) {
            try {
                let res = await api.getarrive({cid,pageNo, pageSize })
                if (res.code === 200) {
                    commit('setarrive', res.data)
                    commit('settotalRow', res.totalRow)
                }else{
                    Message.error(res.msg)
                    localStorage.setItem("showbox",true)
                }
                console.log(res, "到访信息列表")
            } catch (err) {
                console.log(err)
            }
        },
        // 到访信息列表新增
        async addarrive({ dispatch }, { cid,predictAt,campus,reception, pageNo, pageSize }) {
            try {
                let res = await api.addarrive({ cid,predictAt,campus,reception, })
                if (res.code === 200) {
                    dispatch("getarrive", { cid,pageNo, pageSize })
                    Message.success(res.msg)
                }else {
                    Message.error(res.msg)
                }
                console.log(res, "到访信息列表新增")
            } catch (err) {
                console.log(err)
            }
        },
        // 到访信息列表删除
        async detelearrive({ dispatch }, { id,cid, pageNo, pageSize }) {
            try {
                let res = await api.detelearrive({ id,cid})
                if (res.code === 200) {
                    dispatch("getarrive", { cid,pageNo, pageSize })
                    Message.success(res.msg)
                }else {
                    Message.error(res.msg)
                }
                console.log(res, "到访信息列表删除")
            } catch (err) {
                console.log(err)
            }
        },
        // 到访信息编辑
        async updatearrive({ dispatch }, { id, cid,practicalAt,campus,reception, pageNo, pageSize }) {
            try {
                let res = await api.updatearrive({ id, cid,practicalAt,campus,reception })
                if (res.code === 200) {
                    dispatch("getarrive", { cid,pageNo, pageSize })
                    Message.success(res.msg)
                }else {
                    Message.error(res.msg)
                }
                console.log(res, "到访信息编辑")
            } catch (err) {
                console.log(err)
            }
        },
    }
}