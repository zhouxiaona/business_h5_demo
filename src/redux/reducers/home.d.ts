/*
 * @Author: river
 * @Date: 2020-01-13 10:07:23
 * @LastEditors: tankswift
 * @LastEditTime: 2020-06-03 13:10:12
 * @Description: 文件描述
 * @FilePath: \workSpace\live_events\src\redux\reducers\home.d.ts
 */
import * as actionTypes from '../constants/actionTypes'
export const home = (state = {
    userdata: {},
    url: false,
}, action: any) => {
    switch (action.type) {
        case actionTypes.SAVE_USERDATA:
            return {
                ...state,
                userdata: { ...action.data }
            };
        case actionTypes.SHARE_URL:
            return {
                ...state,
                url: action.data.url
            };
        case actionTypes.UPDATA_USERINFO:
            return {
                ...state,
                userdata: { ...state.userdata, ...action.data }
            };
        default:
            return state;
    }
}




