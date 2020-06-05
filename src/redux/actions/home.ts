/*
 * @Author: tankswift
 * @Date: 2020-04-30 09:21:54
 * @LastEditors: tankswift
 * @LastEditTime: 2020-06-05 13:37:19
 * @Description: 文件描述
 * @FilePath: \workSpace\h5_demo\src\redux\actions\home.ts
 */
import * as actionTypes from '../constants/actionTypes';
export function share() {
    return (dispatch: any) => {
        let u: string = navigator.userAgent;
        let isiOS: boolean = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isiOS) {
            dispatch({
                type: actionTypes.SHARE_URL,
                data: {
                    url: window.location.href
                }
            })
        } else {
            dispatch({
                type: actionTypes.SHARE_URL,
                data: {
                    url: false
                }
            })
        }
    }
}

export function updataInfo(data: any) {
    return (dispatch: any) => {
        dispatch({
            type: actionTypes.UPDATA_USERINFO,
            data: data
        })
    }
}