/*
 * @Author: tankswift
 * @Date: 2020-07-14 10:13:34
 * @LastEditors: tankswift
 * @LastEditTime: 2020-07-14 10:15:30
 * @Description: 文件描述
 * @FilePath: \workSpace\business_h5_demo\src\utils\index.js
 */
// 判断当前环境是微信内还是APP内部
export function isWXPlatform() {
    let wx = (function () {
        return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
    })();
    if (wx) {
        return true
    } else {
        return false
    }
}

// 判断当前终端环境
export const browser = {
    versions: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 || u.indexOf('Linux') > -1, //android终端
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web程序，没有头部与底部
            _weixin: u.toLowerCase().indexOf("micromessenger") > -1,// 微信
            qq: u.match(/\sQQ/i) == " qq" //是否QQ
        };
    }(),
}
