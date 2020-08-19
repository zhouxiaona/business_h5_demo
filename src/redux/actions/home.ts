import * as actionTypes from '../constants/actionTypes';
import { browser } from '../../utils/index'
export function share() {
    return (dispatch: any) => {
        if (browser.versions.ios) {
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