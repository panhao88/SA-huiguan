import service from "./index";
import qs from "qs"

export default {
    // 发送jsonp请求
    //验证码
    getcaptcha() {
        return service.post("/api/login/captcha")
    },
    //登录
    login({ username, password, captcha }) {
        return service.get(`/api/login/login?username=${username}&password=${password}&captcha=${captcha}`)
    },
    //退出登录
    getexit() {
        return service.post("/api/login/exit")
    },
    //导航菜单
    routing() {
        return service.get("/api/permissions/getMyMenus")
    },
    //角色列表
    role({ pageNo, pageSize, name, lock }) {
        return service.post("/api/role/getList", qs.stringify({ pageNo, pageSize, name, lock }))
    },
    //新增角色
    getadd({ name, info }) {
        return service.post("/api/role/add", qs.stringify({ name, info }))
    },
    //修改角色
    Modifythe({ name, info, id, lock }) {
        return service.post("/api/role/update", qs.stringify({
            name, info, id, lock
        }))
    },
    //删除角色
    delrole({ id }) {
        return service.post("/api/role/delete", qs.stringify({ id }))
    },
    //分配权限
    getAssign({ roleId, peris }) {
        return service.post("/api/role/batchAddPermission", qs.stringify({ roleId, peris }))
    },
    // 权限菜单
    getAllMenu() {
        return service.post("/api/permissions/getAllMenu")
    },
    //我的权限菜单
    getMyPermission({roleId}){
        return service.post("/api/permissions/getMyPermission",qs.stringify({roleId}))
    },
    //编辑权限菜单
    getupdate({ pname, actionKey, viewPath, icon, ptype, pid, remark, id }) {
        return service.post("/api/permissions/update", qs.stringify({
            pname, actionKey, viewPath, icon, ptype, pid, remark, id
        }))
    },
    // 删除权限菜单
    del({ id }) {
        return service.post("/api/permissions/delete", qs.stringify({ id }))
    },
    //新增权限菜单
    addpermissions({ pname, actionKey, viewPath, icon, ptype, pid, remark }) {
        return service.post("/api/permissions/add", qs.stringify({
            pname, actionKey, viewPath, icon, ptype, pid, remark
        }))
    },
    //刷新权限缓存
    Therefresh() {
        return service.post("/api/permissions/reload")
    },
    //权限同步
    synchronous() {
        return service.post("/api/permissions/sync")
    },
    //我的权限
    mypermissions() {
        return service.post("/api/permisions/getMyPermission")
    },
    // 账户列表
    getaccount() {
        return service.post("/api/account/getList")
    },
    //新增账户
    accountadd({ userName,
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
        return service.post("/api/account/add", qs.stringify({
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
            contractRenewalAt
        }))
    },
    //编辑账户
    EditAccount({ userName, nickName, id }) {
        return service.post("/api/account/update", qs.stringify({ userName, nickName, id }))
    },
    //操纵日志
    getsysLogList({ pageNo, pageSize }) {
        return service.post("/api/log/operationList", qs.stringify({ pageNo, pageSize }))
    },
    //登录日志
    getloginLogList({ pageNo, pageSize }) {
        return service.post("/api/log/loginLogList", qs.stringify({ pageNo, pageSize }))
    },
    //删除登录日志
    getdeleteLoginLog({ createAt }) {
        return service.post("/api/log/deleteLoginLog", qs.stringify({ createAt }))
    },
    // 删除操纵日志
    dellog({ ids }) {
        return service.post("/api/log/deleteOperation", qs.stringify({ ids }))
    },
    //校区信息
    getcampus({ pageNo, pageSize }) {
        return service.post("/api/campus/getList", qs.stringify({ pageNo, pageSize }))
    },
    // 校区新增
    addcampus({ code, fullName, shortName }) {
        return service.post("/api/campus/add", qs.stringify({ code, fullName, shortName }))
    },
    //校区编辑
    updataupdate({ id, code, fullName, shortName }) {
        return service.post("/api/campus/update", qs.stringify({ id, code, fullName, shortName }))
    },
    // 校区删除
    delcampus({ id }) {
        return service.post("/api/campus/delete", qs.stringify({ id }))
    },
    //校区事业中心列表
    getcauseCentre({ pageNo, pageSize }) {
        return service.post("/api/causeCentre/getList", qs.stringify({ pageNo, pageSize }))
    },
    //校区事业中心新增
    add({ name }) {
        return service.post("/api/causeCentre/add", qs.stringify({ name }))
    },
    //校区事业中心编辑
    updatecauseCentre({ id, name }) {
        return service.post("/api/causeCentre/update", qs.stringify({ id, name }))
    },
    //校区事业中心删除
    delcauseCentre({ id }) {
        return service.post("/api/causeCentre/delete", qs.stringify({ id }))
    },
    // 客户信息列表
    getcustomer({ pageNo, pageSize, id, name,
        mobile,
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
        return service.post("/api/customer/getList", qs.stringify({
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
        }))
    },
    //新增客户列表
    addcustomer({
        name, mobile, wechat, qq, appellation, sex, age, searchTerms, website, school, education, graduatedSchool, proposedMajor, source, customerType, remarks, createAc
    }) {
        return service.post("/api/customer/add", qs.stringify({
            name, mobile, wechat, qq, appellation, sex, age, searchTerms,
            website, school, education, graduatedSchool, proposedMajor, source, customerType,
            remarks, createAc
        }))
    },
    //编辑客户列表
    updatecustomer({
        id, name, mobile, wechat, qq, appellation, sex, age, searchTerms, website, school, education, graduatedSchool, proposedMajor, source, customerType, remarks, createAc
    }) {
        return service.post("/api/customer/update", qs.stringify({
            id, name, mobile, wechat, qq, appellation, sex, age, searchTerms, website, school, education, graduatedSchool, proposedMajor, source, customerType, remarks, createAc
        }))
    },
    //删除客户列表
    delcustomer({ id }) {
        return service.post("/api/customer/delete", qs.stringify({ id }))
    },
    //客户详情信息
    getdetails({ id }) {
        return service.post("/api/customerDetail/getDetail", qs.stringify({ id }))
    },
    //客户联系人
    getcontacts({ cid }) {
        return service.post("/api/customerContact/getList", qs.stringify({ cid }))
    },
    //客户联系人新增
    addcustomerContact({ cid, name, phone, sex, age, wechat, qq, address, idCard, job }) {
        return service.post("/api/customerContact/add", qs.stringify({ cid, name, phone, sex, age, wechat, qq, address, idCard, job }))
    },
    //客户联系人编辑
    updatecustomerContact({ cid, name, phone, sex, age, wechat, qq, address, idCard, job, id }) {
        return service.post("/api/customerContact/update", qs.stringify({ cid, name, phone, sex, age, wechat, qq, address, idCard, job, id }))
    },
    //客户转入公海
    getintoPublicSea({ ids }) {
        return service.post("/api/customer/intoPublicSea", qs.stringify({ ids }))
    },
    //客户转移
    gettransfer({ ids, accountId }) {
        return service.post("/api/customer/transfer", qs.stringify({ ids, accountId }))
    },
    //客户操纵记录
    getoperationRecord({ cid }) {
        return service.post("/api/operationRecord/getList", qs.stringify({ cid }))
    },
    //客户联系人删除
    detelecustomerContact({ id }) {
        return service.post("/api/customerContact/delete", qs.stringify({ id }))
    },
    // 客户来源信息
    getsource({ pageNo, pageSize }) {
        return service.post("/api/source/getList", qs.stringify({ pageNo, pageSize }))
    },
    //客户来源添加
    addsource({
        code, fullName, shortName, describe, beginAt, endAt, owner
    }) {
        return service.post("/api/source/add", qs.stringify({ code, fullName, shortName, describe, beginAt, endAt, owner }))
    },
    //客户来源编辑
    updatesource({ id, code, fullName, shortName, describe, beginAt, endAt, owner }) {
        return service.post("/api/source/update", qs.stringify({ id, code, fullName, shortName, describe, beginAt, endAt, owner }))
    },
    //客户来源删除
    deletesource({ id }) {
        return service.post("/api/source/delete", qs.stringify({ id }))
    },
    //咨询方式列表
    getadvisory({ pageNo, pageSize }) {
        return service.post("/api/advisory/getList", qs.stringify({ pageNo, pageSize }))
    },
    // //咨询方式添加
    addadvisory({ name, describe }) {
        return service.post("/api/advisory/add", qs.stringify({ name, describe }))
    },
    // //咨询方式编辑
    updateadvisory({ id, name, describe }) {
        return service.post("/api/advisory/update", qs.stringify({ id, name, describe }))
    },
    // //咨询方式删除
    deleteadvisory({ id }) {
        return service.post("/api/advisory/delete", qs.stringify({ id }))
    },
    //客户类别列表
    getvisitorTypeadvisory({ pageNo, pageSize }) {
        return service.post("/api/visitorType/getList", qs.stringify({ pageNo, pageSize }))
    },
    //客户类别添加
    addvisitorTypeadvisory({ name, describe }) {
        return service.post("/api/visitorType/add", qs.stringify({ name, describe }))
    },
    //客户类别删除
    deletevisitorTypeadvisory({ id }) {
        return service.post("/api/visitorType/delete", qs.stringify({ id }))
    },
    //客户类别编辑
    updatevisitorTypeadvisory({ id, name, describe }) {
        return service.post("/api/visitorType/update", qs.stringify({ id, name, describe }))
    },
    //客户类型列表
    getcustomerType({ pageNo, pageSize }) {
        return service.post("/api/customerType/getList", qs.stringify({ pageNo, pageSize }))
    },
    //客户类型列表添加
    addcustomerType({ name, describe, state }) {
        return service.post("/api/customerType/add", qs.stringify({ name, describe, state }))
    },
    //客户类型列表编辑
    updatecustomerType({ id, name, describe, state }) {
        return service.post("/api/customerType/update", qs.stringify({ id, name, describe, state }))
    },
    //客户类型列表删除
    detelecustomerType({ id }) {
        return service.post("/api/customerType/delete", qs.stringify({ id }))
    },
    //跟单管理列表
    getmerchandis({ cid, pageNo, pageSize }) {
        return service.post("/api/merchandis/getList", qs.stringify({ cid, pageNo, pageSize }))
    },
    //跟单管理列表添加
    addmerchandis({ cid, content, termination, lastAt, terminationAt }) {
        return service.post("/api/merchandis/add", qs.stringify({ cid, content, termination, lastAt, terminationAt }))
    },
    //跟单管理列表编辑
    updatemerchandis({ cid, content, termination, lastAt, terminationAt, id }) {
        return service.post("/api/merchandis/update", qs.stringify({ cid, content, termination, lastAt, terminationAt, id }))
    },
    //跟单管理列表删除
    detelemerchandis({ id, cid }) {
        return service.post("/api/merchandis/delete", qs.stringify({ id, cid }))
    },
    //账户锁定与解锁
    getChangeStatus({ accountId, lock }) {
        return service.post("/api/account/deblocking", qs.stringify({ accountId, lock }))
    },
    //专业信息列表
    getspecialty({ pageNo, pageSize }) {
        return service.post("/api/specialty/getList", qs.stringify({ pageNo, pageSize }))
    },
    //专业信息列表新增
    addspecialty({ name, synopsis }) {
        return service.post("/api/specialty/add", qs.stringify({ name, synopsis }))
    },
    //专业信息列表编辑
    updatespecialty({ name, synopsis, id }) {
        return service.post("/api/specialty/update", qs.stringify({ name, synopsis, id }))
    },
    //专业信息列表删除
    detelespecialty({ id }) {
        return service.post("/api/specialty/delete", qs.stringify({ id }))
    },
    //到访信息列表
    getarrive({ cid, pageNo, pageSize }) {
        return service.post("/api/arrive/getList", qs.stringify({ cid, pageNo, pageSize }))
    },
    //到访信息列表新增
    addarrive({ cid, predictAt, campus, reception }) {
        return service.post("/api/arrive/add", qs.stringify({ cid, predictAt, campus, reception }))
    },
    //到访信息列表删除
    detelearrive({ id, cid }) {
        return service.post("/api/arrive/delete", qs.stringify({ id, cid }))
    },
    //到访信息列表编辑
    updatearrive({ id, cid, practicalAt, campus, reception }) {
        return service.post("/api/arrive/update", qs.stringify({ id, cid, practicalAt, campus, reception }))
    },
    //学历信息列表
    geteducation({ pageNo, pageSize }) {
        return service.post("/api/education/getList", qs.stringify({ pageNo, pageSize }))
    },
    //学历信息列表新增
    addeducation({ name, synopsis }) {
        return service.post("/api/education/add", qs.stringify({ name, synopsis }))
    },
    //学历信息列表编辑
    updateeducation({ name, synopsis, id }) {
        return service.post("/api/education/update", qs.stringify({ name, synopsis, id }))
    },
    //学历信息列表删除
    deteleeducation({ id }) {
        return service.post("/api/education/delete", qs.stringify({ id }))
    },

}
