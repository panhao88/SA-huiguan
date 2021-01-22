import Vue from 'vue'
import api from '../../http/api'
import router from '../../router'
import { Message } from 'element-ui'

export default {
    // 开启命名空间,这个文件就是单独的一个vuex的模块
    namespaced: true,
    state: {
        causeCentrelist:[] ,//事业中心列表
        totalRow:0 //事业中心列表条数
    },
    mutations: {
        // 事业中心列表
        setcauseCentre(state,data){
            state.causeCentrelist = data
        },
        //事业中心列表条数
        settotalRow(state,data){
            state.totalRow = data
        },
    },
    actions: {
        // 事业中心列表
        async getcauseCentre({commit},{pageNo, pageSize}){
            try{
                let res = await api.getcauseCentre({pageNo, pageSize})
                if(res.code === 200){
                    commit("setcauseCentre",res.data)
                    commit("settotalRow",res.totalRow)
                }else{
                    Message.error(res.msg)
                    localStorage.setItem("showbox",true)
                }
                console.log(res,"事业中心列表")
            }catch(err){
                console.log(err)
            }
        },
        // 事业中心新增
        async add({dispatch},{name,pageNo, pageSize}){
            try{
                let res = await api.add({name})
                if(res.code === 200){
                    Message.success(res.msg)
                    dispatch("getcauseCentre",{
                        pageNo, pageSize
                    })
                }else {
                    Message.error(res.msg)
                }
                console.log(res,"事业中心新增")
            }catch(err){
                console.log(err)
            }
        },
        // 事业中心编辑
        async updatecauseCentre({dispatch},{id,name,pageNo, pageSize}){
            try{
                let res = await api.updatecauseCentre({id,name})
                if(res.code === 200){
                    Message.success(res.msg)
                    dispatch("getcauseCentre",{
                        pageNo, pageSize
                    })
                }else {
                    Message.error(res.msg)
                }
                console.log(res,"事业中心编辑")
            }catch(err){
                console.log(err)
            }
        },
        // 事业中心删除
        async delcauseCentre({dispatch},{id,pageNo, pageSize}){
            try{
                let res = await api.delcauseCentre({id})
                if(res.code === 200){
                    dispatch("getcauseCentre",{
                        pageNo, pageSize
                    })
                    Message.success(res.msg)
                }else {
                    Message.error(res.msg)
                }
                console.log(res,"事业中心删除")
            }catch(err){
                console.log(err)
            }
        },
    }
}