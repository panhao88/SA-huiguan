import Vue from 'vue'
import api from '../../http/api'
import router from '../../router'
import { Message } from 'element-ui'
export default {
    // 开启命名空间,这个文件就是单独的一个vuex的模块
    namespaced: true,
    state: {
        list: [],//客户列表
        souecelist: [],//客户来源列表
        talRow: 0,//客户列表总数
        totalRow: 0, //客户来源总数
        advisory: [],//咨询方式列表
        sum: 0,//咨询方式总数
        listtype: [], //客户类别列表
        tasum: 0, // 客户类别总数
        customerTyplist: [],//客户类型列表
        total: 0, //客户类型总数
        objdetail: {}, //客户详情
        contacts: [],//客户联系人列表
        specialty: [],//专业信息列表
        total: 0, //专业信息列表总数
        educationlist: [], //学历信息列表
        toalall: 0,//学历总数
        campuslistL: [],//校区信息
        totalRowp: 0,//校区总数
    },
    mutations: {
        //客户列表
        setuserlist(state, data) {
            state.list = data
        },
        //客户列表总数
        settotalRow(state, data) {
            state.talRow = data
        },
        // 客户来源列表
        setsouece(state, data) {
            state.souecelist = data
        },
        //客户来源总数
        settotalRows(state, data) {
            state.totalRow = data
        },
        //咨询方式列表
        setadvisory(state, data) {
            state.advisory = data
        },
        //咨询方式总数
        setsum(state, data) {
            state.sum = data
        },
        //客户类别列表
        settype(state, data) {
            state.listtype = data
        },
        //客户类别条数
        setnumber(state, data) {
            state.tasum = data
        },
        //客户类型列表
        setcustomerType(state, data) {
            state.customerTyplist = data
        },
        //客户类型总数
        setshu(state, data) {
            state.total = data
        },
        //客户详情
        setdetails(state, data) {
            state.objdetail = data
        },
        //客户联系人
        setcontacts(state, data) {
            state.contacts = data
        },
        // 专业信息列表
        setspecialty(state, data) {
            state.specialty = data
        },
        // 专业信息列表总数
        settotal(state, data) {
            state.total = data
        },
        //学历信息列表
        seteducation(state, data) {
            state.educationlist = data
        },
        //学历总数
        setall(state, data) {
            state.toalall = data
        },
        //校区信息
        setcampus(state, data) {
            state.campuslistL = data
        },
        // 校区总数
        settotalRowp(state, data) {
            state.totalRowp = data
        },
    },
    actions: {
        // 客户列表
        async getcustomer({ commit }, { pageNo, pageSize, id, name, mobile,
            wechat,
            qq,
            appellation,
            sex,
            visitortype,
            age,
            searchTerms,
            website,
            school,
            education,
            graduatedSchool,
            proposedMajor,
            source,
            lastAt,
            customerType,
            remarks,
            createAt,
            createAc,
            salesman,
            state,
            advisory, }) {
            try {
                let res = await api.getcustomer({
                    pageNo, pageSize, id, name, mobile,
                    wechat,
                    qq,
                    appellation,
                    sex,
                    visitortype,
                    age,
                    searchTerms,
                    website,
                    school,
                    education,
                    graduatedSchool,
                    proposedMajor,
                    source,
                    lastAt,
                    customerType,
                    remarks,
                    createAt,
                    createAc,
                    salesman,
                    state,
                    advisory,
                })
                if (res.code === 200) {
                    commit("setuserlist", res.data)
                    commit('settotalRow', res.totalRow)
                } else {
                    localStorage.setItem("showbox",true)
                    Message.error(res.msg)
                }
                console.log(res, "客户列表")
            } catch (err) {
                console.log(err)
            }
        },
        //编辑客户列表
        async updatecustomer({ dispatch }, { id, name, mobile, wechat, qq, appellation, sex, age, searchTerms, website, school, education, graduatedSchool, proposedMajor, source, customerType, remarks, createAc, pageNo, pageSize }) {
            try {
                let res = await api.updatecustomer({ id, name, mobile, wechat, qq, appellation, sex, age, searchTerms, website, school, education, graduatedSchool, proposedMajor, source, customerType, remarks, createAc })
                if (res.code === 200) {
                    Message.success(res.msg)
                    dispatch("getcustomer", {
                        pageNo, pageSize, id, name, mobile,
            wechat,
            qq,
            appellation,
            sex,
            visitortype,
            age,
            searchTerms,
            website,
            school,
            education,
            graduatedSchool,
            proposedMajor,
            source,
            lastAt,
            customerType,
            remarks,
            createAt,
            createAc,
            salesman,
            state,
            advisory,
                    })
                } else {
                    Message.error(res.msg)
                }
            } catch (err) {
                console.log(err)
            }
        },
        // 新增客户列表
        async addcustomer({ dispatch }, { name, mobile, wechat, qq, appellation, sex, age, searchTerms, website, school, education, graduatedSchool, proposedMajor, source, customerType, remarks, createAc, pageNo, pageSize }) {
            try {
                let res = await api.addcustomer({ name, mobile, wechat, qq, appellation, sex, age, searchTerms, website, school, education, graduatedSchool, proposedMajor, source, customerType, remarks, createAc })
                if (res.code === 200) {
                    dispatch("getcustomer", {
                        pageNo, pageSize, id, name, mobile,
            wechat,
            qq,
            appellation,
            sex,
            visitortype,
            age,
            searchTerms,
            website,
            school,
            education,
            graduatedSchool,
            proposedMajor,
            source,
            lastAt,
            customerType,
            remarks,
            createAt,
            createAc,
            salesman,
            state,
            advisory,
                    })
                    Message.success(res.msg)
                } else {
                    Message.error(res.msg)
                }
                console.log(res, "客户新增")
            } catch (err) {
                console.log(err)
            }
        },
        //客户转入公海
        async getintoPublicSea({ dispatch }, { ids, pageNo, pageSize }) {
            try {
                let res = await api.getintoPublicSea({ ids })
                if (res.code === 200) {
                    dispatch("getcustomer", {
                        pageNo, pageSize, id, name, mobile,
                        wechat,
                        qq,
                        appellation,
                        sex,
                        visitortype,
                        age,
                        searchTerms,
                        website,
                        school,
                        education,
                        graduatedSchool,
                        proposedMajor,
                        source,
                        lastAt,
                        customerType,
                        remarks,
                        createAt,
                        createAc,
                        salesman,
                        state,
                        advisory,
                    })
                    Message.success(res.msg)
                } else {
                    Message.error(res.msg)
                }
                console.log(res, "客户转入公海")
            } catch (err) {
                console.log(err)
            }
        },
        //客户转移
        async gettransfer({ dispatch }, { ids, accountId, pageNo, pageSize }) {
            try {
                let res = await api.gettransfer({ ids, accountId })
                if (res.code === 200) {
                    dispatch("getcustomer", {
                        pageNo, pageSize, id, name, mobile,
            wechat,
            qq,
            appellation,
            sex,
            visitortype,
            age,
            searchTerms,
            website,
            school,
            education,
            graduatedSchool,
            proposedMajor,
            source,
            lastAt,
            customerType,
            remarks,
            createAt,
            createAc,
            salesman,
            state,
            advisory,
                    })
                    Message.success(res.msg)
                } else {
                    Message.error(res.msg)
                }
            } catch (err) {
                console.log(err)
            }
        },
        //客户操纵记录
        async getoperationRecord({ commit }, { cid, pageNo, pageSize }) {
            try {
                let res = await api.getoperationRecord({ cid })
                if (res.code === 200) {
                    dispatch("getcustomer", {
                        pageNo, pageSize, id, name, mobile,
            wechat,
            qq,
            appellation,
            sex,
            visitortype,
            age,
            searchTerms,
            website,
            school,
            education,
            graduatedSchool,
            proposedMajor,
            source,
            lastAt,
            customerType,
            remarks,
            createAt,
            createAc,
            salesman,
            state,
            advisory,
                    })
                    Message.success(res.msg)
                } else {
                    Message.error(res.msg)
                }
                console.log(res, "客户操纵记录")
            } catch (err) {
                console.log(err)
            }
        },
        //删除客户列表
        async delcustomer({ dispatch }, { id, pageNo, pageSize }) {
            try {
                let res = await api.delcustomer({ id })
                if (res.code === 200) {
                    dispatch("getcustomer", {
                        pageNo, pageSize, id, name, mobile,
            wechat,
            qq,
            appellation,
            sex,
            visitortype,
            age,
            searchTerms,
            website,
            school,
            education,
            graduatedSchool,
            proposedMajor,
            source,
            lastAt,
            customerType,
            remarks,
            createAt,
            createAc,
            salesman,
            state,
            advisory,
                    })
                    Message.success(res.msg)
                } else {
                    Message.error(res.msg)
                }
                console.log(res, "客户删除")
            } catch (err) {
                console.log(err)
            }
        },
        //客户详情信息
        async getdetails({ commit }, { id }) {
            try {
                let res = await api.getdetails({ id })
                commit("setdetails", res.data)
                console.log(res, "客户详情信息")
            } catch (err) {
                console.log(err)
            }
        },
        //客户联系人
        async getcontacts({ commit }, { cid }) {
            try {
                let res = await api.getcontacts({ cid })
                if (res.code === 200) {
                    res.data.map(item => {
                        if (item.sex === 0) {
                            item.sex = "女"
                        }
                        if (item.sex === 1) {
                            item.sex = "男"
                        }
                    })
                    commit("setcontacts", res.data)
                } else {
                    Message.error(res.msg)
                }
                console.log(res, "联系人")
            } catch (err) {
                console.log(err)
            }
        },
        //客户联系人新增
        async addcustomerContact({ dispatch }, { cid, name, phone, sex, age, wechat, qq, address, idCard, job }) {
            try {
                let res = await api.addcustomerContact({ cid, name, phone, sex, age, wechat, qq, address, idCard, job })
                if (res.code === 200) {
                    dispatch("getcontacts", { cid })
                    Message.success(res.msg)
                } else {
                    Message.error(res.msg)
                }
                console.log(res, "联系人添加")
            } catch (err) {
                console.log(err)
            }
        },
        //客户联系人编辑
        async updatecustomerContact({ dispatch }, { cid, name, phone, sex, age, wechat, qq, address, idCard, job, id }) {
            try {
                let res = await api.updatecustomerContact({ cid, name, phone, sex, age, wechat, qq, address, idCard, job, id })
                if (res.code === 200) {
                    dispatch("getcontacts", { cid })
                    Message.success(res.msg)
                } else {
                    Message.error(res.msg)
                }
            } catch (err) {
                console.log(err)
            }
        },
        //客户联系人删除
        async detelecustomerContact({ dispatch }, { id, cid }) {
            try {
                let res = await api.detelecustomerContact({ id })
                if (res.code === 200) {
                    dispatch("getcontacts", { cid })
                    Message.success(res.msg)
                } else {
                    Message.error(res.msg)
                }
            } catch (err) {
                console.log(err)
            }
        },
        // 客户来源信息
        async getsource({ commit }, { pageNo, pageSize }) {
            try {
                let res = await api.getsource({ pageNo, pageSize })
                commit("setsouece", res.data)
                commit("settotalRows", res.totalRow)
                console.log(res, "客户来源")
            } catch (err) {
                console.log(err)
            }
        },
        //客户来源添加
        async addsource({ dispatch }, { code, fullName, shortName, describe, beginAt, endAt, owner, pageNo, pageSize }) {
            try {
                let res = await api.addsource({ code, fullName, shortName, describe, beginAt, endAt, owner })
                if (res.code === 200) {
                    dispatch("getsource", {
                        pageNo, pageSize
                    })
                    Message.success(res.msg)
                } else {
                    Message.error(res.msg)
                }
            } catch (err) {
                console.log(err)
            }
        },
        //客户来源编辑
        async updatesource({ dispatch }, { id, code, fullName, shortName, describe, beginAt, endAt, owner, pageNo, pageSize }) {
            try {
                let res = await api.updatesource({ id, code, fullName, shortName, describe, beginAt, endAt, owner })
                if (res.code === 200) {
                    dispatch("getsource", {
                        pageNo, pageSize
                    })
                    Message.success(res.msg)
                } else {
                    Message.error(res.msg)
                }
            } catch (err) {
                console.log(err)
            }
        },
        //客户来源删除
        async deletesource({ dispatch }, { id, pageNo, pageSize }) {
            try {
                let res = await api.deletesource({ id })
                if (res.code === 200) {
                    dispatch("getsource", {
                        pageNo, pageSize
                    })
                    Message.success(res.msg)
                } else {
                    Message.error(res.msg)
                }
            } catch (err) {
                console.log(err)
            }
        },
        // 咨询方式列表
        async getadvisory({ commit }, { pageNo, pageSize }) {
            try {
                let res = await api.getadvisory({ pageNo, pageSize })
                if (res.code === 200) {
                    commit("setadvisory", res.data)
                    commit("setsum", res.totalRow)
                } else {
                    localStorage.setItem("showbox",true)
                    Message.error(res.msg)
                }
                console.log(res, "咨询方式列表")
            } catch (err) {
                console.log(err)
            }
        },
        // 咨询方式添加
        async addadvisory({ dispatch }, { name, describe, pageNo, pageSize }) {
            try {
                let res = await api.addadvisory({ name, describe })
                if (res.code === 200) {
                    dispatch("getadvisory", {
                        pageNo, pageSize
                    })
                    Message.success(res.msg)
                } else {
                    Message.error(res.msg)
                }
            } catch (err) {
                console.log(err)
            }
        },
        // 咨询方式编辑
        async updateadvisory({ dispatch }, { id, name, describe, pageNo, pageSize }) {
            try {
                let res = await api.updateadvisory({ id, name, describe })
                if (res.code === 200) {
                    dispatch("getadvisory", {
                        pageNo, pageSize
                    })
                    Message.success(res.msg)
                } else {
                    Message.error(res.msg)
                }
            } catch (err) {
                console.log(err)
            }
        },
        // 咨询方式删除
        async deleteadvisory({ dispatch }, { id, pageNo, pageSize }) {
            try {
                let res = await api.deleteadvisory({ id })
                if (res.code === 200) {
                    dispatch("getadvisory", {
                        pageNo, pageSize
                    })
                    Message.success(res.msg)
                } else {
                    Message.error(res.msg)
                }
            } catch (err) {
                console.log(err)
            }
        },
        // 客户类别列表
        async getvisitorTypeadvisory({ commit }, { pageNo, pageSize }) {
            try {
                let res = await api.getvisitorTypeadvisory({ pageNo, pageSize })
                if (res.code === 200) {
                    commit("settype", res.data)
                    commit("setnumber", res.totalRow)
                } else{
                    Message.error(res.msg)
                    localStorage.setItem("showbox",true)
                }
                console.log(res, "客户类别列表")
            } catch (err) {
                console.log(err)
            }
        },
        // 客户类别列表添加
        async addvisitorTypeadvisory({ dispatch }, { name, describe, pageNo, pageSize }) {
            try {
                let res = await api.addvisitorTypeadvisory({ name, describe })
                if (res.code === 200) {
                    dispatch("getvisitorTypeadvisory", {
                        pageNo, pageSize
                    })
                    Message.success(res.msg)
                } else {
                    Message.error(res.msg)
                }
            } catch (err) {
                console.log(err)
            }
        },
        // 客户类别列表编辑
        async updatevisitorTypeadvisory({ dispatch }, { id, name, describe, pageNo, pageSize }) {
            try {
                let res = await api.updatevisitorTypeadvisory({ id, name, describe })
                if (res.code === 200) {
                    dispatch("getvisitorTypeadvisory", {
                        pageNo, pageSize
                    })
                    Message.success(res.msg)
                } else {
                    Message.error(res.msg)
                }
            } catch (err) {
                console.log(err)
            }
        },
        // 客户类别列表删除
        async deletevisitorTypeadvisory({ dispatch }, { id, pageNo, pageSize }) {
            try {
                let res = await api.deletevisitorTypeadvisory({ id })
                if (res.code === 200) {
                    dispatch("getvisitorTypeadvisory", {
                        pageNo, pageSize
                    })
                    Message.success(res.msg)
                } else {
                    Message.error(res.msg)
                }
            } catch (err) {
                console.log(err)
            }
        },
        //客户类型列表
        async getcustomerType({ commit }, { pageNo, pageSize }) {
            try {
                let res = await api.getcustomerType({ pageNo, pageSize })
                if (res.code === 200) {
                    res.data.map(item => {
                        if (item.state === 0) {
                            item.state = "邀约"
                        }
                        if (item.state === 1) {
                            item.state = "财务"
                        }
                    })
                    commit("setcustomerType", res.data)
                    commit("setshu", res.totalRow)
                } else{
                    Message.error(res.msg)
                    localStorage.setItem("showbox",true)
                }
                console.log(res, "客户类型列表")
            } catch (err) {
                console.log(err)
            }
        },
        //客户类型添加
        async addcustomerType({ dispatch }, { name, describe, state, pageNo, pageSize }) {
            try {
                let res = await api.addcustomerType({ name, describe, state })
                if (res.code === 200) {
                    dispatch("getcustomerType", {
                        pageNo, pageSize
                    })
                    Message.success(res.msg)
                } else {
                    Message.error(res.msg)
                }
            } catch (err) {
                console.log(err)
            }
        },
        //客户类型编辑
        async updatecustomerType({ dispatch }, { id, name, describe, state, pageNo, pageSize }) {
            try {
                let res = await api.updatecustomerType({ id, name, describe, state })
                if (res.code === 200) {
                    dispatch("getcustomerType", {
                        pageNo, pageSize
                    })
                    Message.success(res.msg)
                } else {
                    Message.error(res.msg)
                }
            } catch (err) {
                console.log(err)
            }
        },
        //客户类型删除
        async detelecustomerType({ dispatch }, { id, pageNo, pageSize }) {
            try {
                let res = await api.detelecustomerType({ id })
                if (res.code === 200) {
                    dispatch("getcustomerType", {
                        pageNo, pageSize
                    })
                    Message.success(res.msg)
                } else {
                    Message.error(res.msg)
                }
            } catch (err) {
                console.log(err)
            }
        },
        //专业信息列表
        async getspecialty({ commit }, { pageNo, pageSize }) {
            try {
                let res = await api.getspecialty({ pageNo, pageSize })
                if (res.code === 200) {
                    commit("setspecialty", res.data)
                    commit("settotal", res.totalRow)
                } else {
                    localStorage.setItem("showbox",true)
                    Message.error(res.msg)
                }
                console.log(res, "专业信息列表")
            } catch (err) {
                console.log(err)
            }
        },
        //专业信息列表新增
        async addspecialty({ dispatch }, { name, synopsis, pageNo, pageSize }) {
            try {
                let res = await api.addspecialty({ name, synopsis })
                if (res.code === 200) {
                    dispatch("getspecialty", {
                        pageNo, pageSize
                    })
                    Message.success(res.msg)
                } else {
                    Message.error(res.msg)
                }
            } catch (err) {
                console.log(err)
            }
        },
        //专业信息列表编辑
        async updatespecialty({ dispatch }, { name, synopsis, pageNo, pageSize, id }) {
            try {
                let res = await api.updatespecialty({ name, synopsis, id })
                if (res.code === 200) {
                    dispatch("getspecialty", {
                        pageNo, pageSize
                    })
                    Message.success(res.msg)
                } else {
                    Message.error(res.msg)
                }
            } catch (err) {
                console.log(err)
            }
        },
        //专业信息列表删除
        async detelespecialty({ dispatch }, { pageNo, pageSize, id }) {
            try {
                let res = await api.detelespecialty({ pageNo, pageSize, id })
                if (res.code === 200) {
                    dispatch("getspecialty", {
                        pageNo, pageSize
                    })
                    Message.success(res.msg)
                } else {
                    Message.error(res.msg)
                }
            } catch (err) {
                console.log(err)
            }
        },
        //学历信息列表
        async geteducation({ commit }, { pageNo, pageSize }) {
            try {
                let res = await api.geteducation({ pageNo, pageSize })
                if (res.code === 200) {
                    commit("seteducation", res.data)
                    commit("setall", res.totalRow)
                } else {
                    localStorage.setItem("showbox",true)
                    Message.error(res.msg)
                }
                console.log(res, "学历信息列表")
            } catch (err) {
                console.log(err)
            }
        },
        //学历信息列表新增
        async addeducation({ dispatch }, { name, synopsis, pageNo, pageSize }) {
            try {
                let res = await api.addeducation({ name, synopsis })
                if (res.code === 200) {
                    dispatch("geteducation", {
                        pageNo, pageSize
                    })
                    Message.success(res.msg)
                } else {
                    Message.error(res.msg)
                }
            } catch (err) {
                console.log(err)
            }
        },
        //学历信息列表编辑
        async updateeducation({ dispatch }, { name, synopsis, pageNo, pageSize, id }) {
            try {
                let res = await api.updateeducation({ name, synopsis, id })
                if (res.code === 200) {
                    dispatch("geteducation", {
                        pageNo, pageSize
                    })
                    Message.success(res.msg)
                } else {
                    Message.error(res.msg)
                }
            } catch (err) {
                console.log(err)
            }
        },
        //学历信息列表删除
        async deteleeducation({ dispatch }, { pageNo, pageSize, id }) {
            try {
                let res = await api.deteleeducation({ pageNo, pageSize, id })
                if (res.code === 200) {
                    dispatch("geteducation", {
                        pageNo, pageSize
                    })
                    Message.success(res.msg)
                } else {
                    Message.error(res.msg)
                }
            } catch (err) {
                console.log(err)
            }
        },
        //校区信息
        async getcampus({ commit }, { pageNo, pageSize }) {
            try {
                let res = await api.getcampus({ pageNo, pageSize })
                if (res.code === 200) {
                    commit('setcampus', res.data)
                    commit('settotalRowp', res.totalRow)
                }else{
                    Message.error(res.msg)
                    localStorage.setItem("showbox",true)
                }
                console.log(res, "校区信息")
            } catch (err) {
                console.log(err)
            }
        },
        // 校区新增
        async addcampus({ dispatch }, { code, fullName, shortName, pageNo, pageSize }) {
            try {
                let res = await api.addcampus({ code, fullName, shortName })
                if (res.code === 200) {
                    dispatch("getcampus", { pageNo, pageSize })
                    Message.success(res.msg)
                } else {
                    Message.error(res.msg)
                }
                console.log(res, "校区新增")
            } catch (err) {
                console.log(err)
            }
        },
        // 校区删除
        async delcampus({ dispatch }, { id, pageNo, pageSize }) {
            try {
                let res = await api.delcampus({ id })
                if (res.code === 200) {
                    dispatch("getcampus", { pageNo, pageSize })
                    Message.success(res.msg)
                } else {
                    Message.error(res.msg)
                }
                console.log(res, "校区删除")
            } catch (err) {
                console.log(err)
            }
        },
        // 校区编辑
        async updataupdate({ dispatch }, { id, code, fullName, shortName, pageNo, pageSize }) {
            try {
                let res = await api.updataupdate({ id, code, fullName, shortName })
                if (res.code === 200) {
                    dispatch("getcampus", { pageNo, pageSize })
                    Message.success(res.msg)
                } else {
                    Message.error(res.msg)
                }
                console.log(res, "校区删除")
            } catch (err) {
                console.log(err)
            }
        },
    }
}