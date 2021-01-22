import Vue from 'vue'
import api from '../../http/api'
import router from '../../router'
import { Message } from 'element-ui'

export default {
    // 开启命名空间,这个文件就是单独的一个vuex的模块
    namespaced: true,
    state: {
        account: [] //账户列表
    },
    mutations: {
        // 账户列表
        setaccount(state, data) {
            state.account = data
        }
    },
    actions: {
        // 账户列表
        async getaccount({ commit }) {
            try {
                let res = await api.getaccount()
                if (res.code === 200) {
                    commit("setaccount", res.data)
                    console.log(res, "账户列表")
                } else {
                    Message.error(res.msg)
                    localStorage.setItem("showbox", true)
                }
            } catch (err) {
                console.log(err)
            }
        },
        // 新增账户
        async accountadd({ dispatch }, { 
            userName, 
            nickName, 
            password, 
            phone,
            campus,
            cause,
            job,
            state,
            recruit,
            idCard,
            sex,
            birth,
            permanentAddr,
            presentAddr,
            emergencyContact,
            emergencyContactNum,
            nation,
            marriage,
            education,
            major,
            graduationAt,
            graduationSchool,
            entryAt,
            socialInsuranceAt,
            contractSigningAt,
            contractExpirationAt,
            contractRenewalAt }) {
            try {
                let res = await api.accountadd({userName, 
                    nickName, 
                    password, 
                    phone,
                    campus,
                    cause,
                    job,
                    state,
                    recruit,
                    idCard,
                    sex,
                    birth,
                    permanentAddr,
                    presentAddr,
                    emergencyContact,
                    emergencyContactNum,
                    nation,
                    marriage,
                    education,
                    major,
                    graduationAt,
                    graduationSchool,
                    entryAt,
                    socialInsuranceAt,
                    contractSigningAt,
                    contractExpirationAt,
                    contractRenewalAt })
                if (res.code === 200) {
                    Message.success(res.msg)
                    dispatch("getaccount")
                } else {
                    Message.error(res.msg)
                }
                console.log(res, "新增账户")
            } catch (err) {
                console.log(err)
            }
        },
        // 账户编辑
        async EditAccount({ dispatch }, { userName, nickName, id }) {
            try {
                let res = await api.EditAccount({ userName, nickName, id })
                if (res.code === 200) {
                    Message.success(res.msg)
                    dispatch("getaccount")
                } else {
                    Message.error(res.msg)
                }
                console.log(res, "账户编辑")
            } catch (err) {
                console.log(err)
            }
        },
        async getChangeStatus({ }, { accountId, lock }) {
            try {
                let res = await api.getChangeStatus({ accountId, lock });
                if (res.code === 200) {
                    Message.success(res.msg)
                } else {
                    Message.error(res.msg)
                }
                console.log(res, "账户锁定与解锁")
            } catch {
                console.log(err)
            }
        }
    }
}