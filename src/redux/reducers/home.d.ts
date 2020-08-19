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




