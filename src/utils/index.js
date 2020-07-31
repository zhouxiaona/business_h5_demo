/*
 * @Author: tankswift
 * @Date: 2020-07-14 10:13:34
 * @LastEditors: tankswift
 * @LastEditTime: 2020-07-20 13:48:23
 * @Description: 公用工具函数库
 * @FilePath: \workSpace\business_h5_demo\src\utils\index.js
 */

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
            qq: u.match(/\sQQ/i) == " qq", //是否QQ
            _weixin: u.toLowerCase().indexOf("micromessenger") > -1,// 微信
            isxesApp: u.indexOf('XesApp') > -1, //是否是学而思APP
        };
    }(),
}

// 判断路由中是否含有某个参数
export function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}
