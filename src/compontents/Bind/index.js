/*
 * @Author: river
 * @Date: 2020-03-10 20:43:49
 * @LastEditors: tankswift
 * @LastEditTime: 2020-07-08 13:39:36
 * @Description: 文件描述
 * @FilePath: \workSpace\business_h5_demo\src\compontents\Bind\index.js
 */
import React from 'react';
import * as Api from '../../api/api';
import { TweenMaxs, Bounces } from "../../type/index.d"
import Store from '../../redux/store/Store';
import { Toast, Picker } from 'antd-mobile';
import phoneImg from '../../image/phone.png'
import nameImg from '../../image/name.png'
import selectImg from '../../image/select.png'
import Close from "../../image/alert_close.png"
import 'antd-mobile/lib/toast/style/css';
import 'antd-mobile/lib/picker/style/css';

import './index.styl'
const gradeArr = [
    { "id": "1", "value": "-9", "label": "托班" },
    { "id": "2", "value": "-8", "label": "小班" },
    { "id": "3", "value": "-7", "label": "中班" },
    { "id": "4", "value": "-6", "label": "大班" },
    { "id": "5", "value": "1", "label": "一年级" },
    { "id": "6", "value": "2", "label": "二年级" },
    { "id": "7", "value": "3", "label": "三年级" },
    { "id": "8", "value": "4", "label": "四年级" },
    { "id": "9", "value": "5", "label": "五年级" },
    { "id": "10", "value": "6", "label": "六年级" },
    { "id": "11", "value": "7", "label": "七年级" },
    { "id": "12", "value": "8", "label": "八年级" },
    { "id": "13", "value": "9", "label": "九年级" },
    { "id": "14", "value": "10", "label": "高中一年级" },
    { "id": "15", "value": "11", "label": "高中二年级" },
    { "id": "16", "value": "12", "label": "高中三年级" },
]

function getGradeTextByGradeId(gradeList, gradeId) {
    let data = gradeList.filter(item => item.value === gradeId)
    return data.length === 0 ? "在读年级" : data[0].label
}

class Bind extends React.Component {
    constructor(props) {
        this.state = {
            type: true,
            phoneNum: "",   // 手机号
            codeNum: "",    // 验证码
            name: "",       // 姓名
            grade: "",      // 年级
            gradeText: "请选择在读年级",
            codeTime: 60,
            Timer: null,
            pUid: ""
        }
    }

    componentWillMount() { }

    componentDidMount() { }

    componentWillUnmount() { }

    // 获取手机验证码
    startTimer = async () => {
        if (!(/^1\d{10}$/.test(this.state.phoneNum))) {
            Toast.fail("手机号不正确", 1.5);
            return false;
        }
        if (this.state.codeTime !== 60) return
        let res = await Api.getPhoneCode(this.state.phoneNum)
        if (res.code === 1) {
            Toast.success("验证码已发送", 1.5)
            this.setState({
                Timer: setInterval(() => {
                    let codeTime = this.state.codeTime - 1
                    if (codeTime <= 0) {
                        clearInterval(this.state.Timer)
                        this.setState({
                            codeTime: 60
                        })
                        return
                    }
                    this.setState({
                        codeTime
                    })
                }, 1000)
            })
        } else {
            Toast.fail(res.message, 2);
        }
    }

    // 提交数据
    submit = async () => {
        if (!(/^1\d{10}$/.test(this.state.phoneNum))) {
            Toast.fail("手机号不正确", 1.5);
            return false;
        }
        if (!(/^\d{6}$/.test(this.state.codeNum))) {
            Toast.fail("验证码不正确", 1.5);
            return false;
        }
        let res = await Api.bindInfo(this.state.codeNum, this.state.phoneNum)
        if (res.code === 1) {
            clearInterval(this.state.Timer)
            // 验证完善信息
            if (res.data.is_edit == '0') {
                // 切换到完善信息页面
                this.setState({
                    type: false,
                    pUid: res.data.pUid
                })
            } else {
                //登录成功关闭页面
                //改变完善状态
                Store.dispatch({
                    type: 'UPDATA_USERINFO',
                    data: {
                        number: res.data.stu_number,
                        grade: res.data.grade,
                        name: res.data.name,
                        isBind: 1
                    }
                })
                this.props.close()
            }
        } else {
            Toast.fail(res.message, 2);
        }
    }

    // 完善信息
    complate = async () => {
        if (this.state.name === '') {
            Toast.fail("姓名不能为空", 1.5);
            return false;
        }
        if (this.state.name.length < 2) {
            Toast.fail("请填写至少2个字的姓名", 1.5);
            return false;
        }
        if (this.state.grade === "") {
            Toast.fail("请选择年级", 1.5);
            return false;
        }
        let res = await Api.completeUserInfo(this.state.name, this.state.grade, this.state.pUid)
        if (res.code === 1) {
            //信息完善成功，关闭完善信息页面,更改状态
            Store.dispatch({
                type: 'UPDATA_USERINFO',
                data: {
                    number: res.data,
                    grade: this.state.grade,
                    name: this.state.name,
                    isBind: 1
                }
            })
            this.props.close()
        } else {
            Toast.fail(res.message, 2);
        }
    }

    render() {
        return (
            <div id="Bind">
                <div className="BindBox">
                    <div className="title">
                        {this.state.type ? (Store.getState().home.userdata.isBind === 1 ? "切换账号" : "快速登录") : "完善信息"} <br />
                        <span></span>
                    </div>
                    {this.state.type ? <div className="inputBox">
                        <div className="input">
                            <input type="number" className="inputFrom"
                                onChange={e => this.setState({ phoneNum: e.target.value })}
                                placeholder="输入手机号"
                                onBlur={() => {
                                    setTimeout(function () {
                                        var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
                                        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
                                    }, 100);
                                }}
                            />
                            <img src={phoneImg} alt="phoneImg" className="phoneImg" />
                        </div>
                    </div> :
                        <div className="inputBox">
                            <div className="input">
                                <input type="text" className="inputFrom"
                                    onChange={e => this.setState({ name: e.target.value })}

                                    onBlur={() => {
                                        setTimeout(function () {
                                            var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
                                            window.scrollTo(0, Math.max(scrollHeight - 1, 0));
                                        }, 100);
                                    }}
                                    placeholder="请输入学员姓名" />
                                <img src={nameImg} alt="nameImg" className="nameImg" />
                            </div>
                        </div>
                    }

                    {this.state.type ? <div className="inputBox">
                        <div className="codeInput">
                            <input type="number" className="inputFrom"
                                onChange={e => this.setState({ codeNum: e.target.value })}

                                onBlur={() => {
                                    setTimeout(function () {
                                        var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
                                        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
                                    }, 100);
                                }}
                                placeholder="填写验证码" />

                        </div>
                        <div className="codeBtn" onClick={this.startTimer}>
                            {this.state.codeTime === 60 ? "获取验证码" : this.state.codeTime + `s后重试`}
                        </div>
                    </div> :
                        <div className="inputBox">

                            <div className="input">
                                <Picker
                                    title="在读年级"
                                    cols={1}
                                    data={gradeArr}
                                    value={[this.state.grade]}
                                    onPickerChange={v => {
                                        this.setState({
                                            grade: v[0] + "",
                                        })
                                    }}
                                    onOk={v => {
                                        this.setState({
                                            grade: v[0],
                                            gradeText: getGradeTextByGradeId(gradeArr, v[0])
                                        })
                                    }
                                    }
                                >
                                    <div className="inputFrom"  >
                                        {this.state.gradeText}
                                    </div>
                                </Picker>
                                <img src={selectImg} alt="nameImg" className="nameImg" />
                            </div>
                        </div>
                    }

                    {this.state.type ? <div className="submitBtn" onClick={this.submit}>
                        {Store.getState().home.userdata.isBind === 1 ? "切     换" : "登    录"}
                    </div> :
                        <div className="submitBtn" onClick={this.complate}>
                            完  成
                    </div>
                    }
                    <img src={Close} alt="" className="close" onClick={() => this.props.close()} />
                </div>
            </div>
        );
    }
}

export default Bind;
