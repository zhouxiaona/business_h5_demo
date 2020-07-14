/*
 * @Author: lei
 * @Date: 2020-06-12 21:52:57
 * @LastEditors: tankswift
 * @LastEditTime: 2020-07-14 10:12:32
 * @Description: 文件描述
 * @FilePath: \workSpace\business_h5_demo\src\page\Clear\index.js
 */
/*
 * @Author: river
 * @Date: 2020-01-14 13:14:57
 * @LastEditors  : river
 * @LastEditTime : 2020-01-19 11:12:55
 * @Description: 首页逻辑
 * @FilePath: \spring\src\page\Home\index.tsx
 */
import React from 'react';
import { Cookies } from '../../type/index.d';

class Clear extends React.Component {
    componentWillMount() {
        Cookies.set('userdata', undefined, { expires: 3 });
        sessionStorage.clear()
        localStorage.clear()
        window.location.href = window.location.origin + "/"
    }


    render() {
        return (
            <div></div>
        );
    }
}

export default Clear;