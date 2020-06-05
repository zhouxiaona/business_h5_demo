/*
 * @Author: river
 * @Date: 2020-03-12 17:23:22
 * @LastEditors: tankswift
 * @LastEditTime: 2020-06-03 14:07:43
 * @Description: mock数据
 * @FilePath: \workSpace\live_events\src\mock.js
 */

import fetchMock from 'fetch-mock'

fetchMock.mock('/index/getPhoneCode', () => {
    return {
        "msg": "成功",
        "code": 1,
        "data": true
    }
})

fetchMock.mock('/index/phoneLogin', () => {
    return {
        "msg": "成功",
        "code": 1,
        "data": {
            "pUid": "6778427",
            "stu_number": "192021784555",
            "grade": "10",
            "name": "李梓蔓",
            "is_edit": "0"
        },
    }
})
fetchMock.mock('/index/completeUserInfo', () => {
    return {
        "msg": "成功",
        "code": 1,
        "data": "192021784555",
    }
})


fetchMock.mock('/auth/getInfoByOpenId', () => {
    return {
        "msg": "成功",
        "code": 1,
        "data": {
            "imgUrl": "http:\/\/thirdwx.qlogo.cn\/mmopen\/vi_32\/Q0j4TwGTfTK7H70jhKO2oEyKkLB4EqHEJARTZxfCsLHbeN00gkoJPpIUTib8mx6kdhJGV5Zucf9rl6PMV4VW6eg\/132",
            "number": "192021784555",
            "isBind": 1,
            "name": "面条君",
            "studentId": '1',
            'isSign': 0,
            'grade': -6
        }
    }
})
fetchMock.mock('/auth/getSignature', () => {
    return {
        "msg": "成功",
        "code": 1,
        "data": {
            "signature": "34b2214ab0c2a60e95411730f5664a352cdb92c5",
            "nonceStr": "ccca656c-bcd5-491e-a013-3c98f1a89c54",
            "timestamp": "1586338123"
        }
    }
})

