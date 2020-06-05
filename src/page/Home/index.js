/*
 * @Author: river
 * @Date: 2020-01-14 13:14:57
 * @LastEditors: tankswift
 * @LastEditTime: 2020-06-05 13:42:59
 * @Description: 首页逻辑
 * @FilePath: \workSpace\h5_demo\src\page\Home\index.js
 */
import React from 'react';
import { connect } from 'react-redux'
import * as homeActions from '../../redux/actions/home'
import { bindActionCreators } from 'redux'
import * as Api from '../../api/api.js'
import { MtaH5, TweenMaxs, Bounces, Swipers } from "../../type/index.d.ts"
import { Toast, Picker } from 'antd-mobile'
import 'antd-mobile/lib/toast/style/css'
import 'antd-mobile/lib/picker/style/css'
import bg from '../../image/bg.png'
import btn from '../../image/btn.png'
import titleBg from '../../image/titleBg.png'
import narrow from '../../image/narrow.png'
import narrowW from '../../image/narrowW.png'
import gou from '../../image/gou.png'
import success from '../../image/success.png'
import banner from '../../image/banner.png'
import './index.styl'

// 年级信息
const gradeArr = [
	{
		"id": 1,
		"value": -9,
		"label": "托班"
	}, {
		"id": 2,
		"value": -8,
		"label": "小班"
	}, {
		"id": 3,
		"value": -7,
		"label": "中班"
	}, {
		"id": 4,
		"value": -6,
		"label": "大班"
	}, {
		"id": 5,
		"value": 1,
		"label": "一年级"
	}, {
		"id": 6,
		"value": 2,
		"label": "二年级"
	}, {
		"id": 7,
		"value": 3,
		"label": "三年级"
	}, {
		"id": 8,
		"value": 4,
		"label": "四年级"
	}, {
		"id": 9,
		"value": 5,
		"label": "五年级"
	}, {
		"id": 10,
		"value": 6,
		"label": "六年级"
	}, {
		"id": 11,
		"value": 7,
		"label": "七年级"
	}, {
		"id": 12,
		"value": 8,
		"label": "八年级"
	}, {
		"id": 13,
		"value": 9,
		"label": "九年级"
	}, {
		"id": 14,
		"value": 10,
		"label": "高中一年级"
	}, {
		"id": 15,
		"value": 11,
		"label": "高中二年级"
	}, {
		"id": 16,
		"value": 12,
		"label": "高中三年级"
	}, {
		"id": 17,
		"value": 17,
		"label": "已毕业"
	}, {
		"id": 18,
		"value": -20,
		"label": "无年级"
	}
]

// 教学区和服务中心数据信息
const serviceListArr = [
	{
		"id": 1,
		"regionName": "普陀区",
		"signUpServiceList": [{
			"id": 1,
			"serviceName": "梅川路服务中心"
		}, {
			"id": 5,
			"serviceName": "长寿路地铁站服务中心"
		}, {
			"id": 8,
			"serviceName": "中潭路地铁站服务中心"
		}, {
			"id": 9,
			"serviceName": "曹杨路地铁站服务中心"
		}]
	},
	{
		"id": 2,
		"regionName": "长宁区",
		"signUpServiceList": [{
			"id": 2,
			"serviceName": "仙霞路服务中心"
		}, {
			"id": 3,
			"serviceName": "芙蓉江路教学点"
		}, {
			"id": 7,
			"serviceName": "SOHO天山服务中心"
		}]
	},
	{
		"id": 3,
		"regionName": "浦东新区",
		"signUpServiceList": [{
			"id": 4,
			"serviceName": "德平路地铁站服务中心"
		}, {
			"id": 14,
			"serviceName": "金高路服务中心"
		}, {
			"id": 15,
			"serviceName": "巨峰路服务中心"
		}, {
			"id": 28,
			"serviceName": "成山路服务中心"
		}, {
			"id": 39,
			"serviceName": "花木陆悦坊服务中心"
		}, {
			"id": 41,
			"serviceName": "浦东南路服务中心"
		}, {
			"id": 42,
			"serviceName": "峨山路教学点"
		}, {
			"id": 43,
			"serviceName": "塘桥地铁站服务中心"
		}, {
			"id": 44,
			"serviceName": "五星路服务中心"
		}, {
			"id": 45,
			"serviceName": "万科活力城服务中心"
		}, {
			"id": 46,
			"serviceName": "浦三路地铁站服务中心"
		}, {
			"id": 47,
			"serviceName": "铂中环服务中心"
		}, {
			"id": 48,
			"serviceName": "金湘路服务中心"
		}, {
			"id": 49,
			"serviceName": "台儿庄服务中心"
		}, {
			"id": 50,
			"serviceName": "唐镇服务中心"
		}, {
			"id": 53,
			"serviceName": "商城路地铁站服务中心"
		}, {
			"id": 54,
			"serviceName": "长清路服务中心"
		}]
	},
	{
		"id": 4,
		"regionName": "静安区",
		"signUpServiceList": [{
			"id": 6,
			"serviceName": "宜川路服务中心"
		}, {
			"id": 37,
			"serviceName": "宝山路地铁站服务中心"
		}]
	},
	{
		"id": 5,
		"regionName": "黄浦区",
		"signUpServiceList": [{
			"id": 10,
			"serviceName": "北海路服务中心"
		}, {
			"id": 11,
			"serviceName": "宁海东路教学点"
		}, {
			"id": 12,
			"serviceName": "汉口路教学点"
		}, {
			"id": 13,
			"serviceName": "斜土路服务中心"
		}, {
			"id": 18,
			"serviceName": "人民广场地铁站服务中心"
		}]
	},
	{
		"id": 6,
		"regionName": "徐汇区",
		"signUpServiceList": [{
			"id": 16,
			"serviceName": "大木桥路地铁站服务中心"
		}, {
			"id": 19,
			"serviceName": "柳州路服务中心"
		}, {
			"id": 20,
			"serviceName": "桂平路服务中心"
		}, {
			"id": 22,
			"serviceName": "嘉川路服务中心"
		}, {
			"id": 55,
			"serviceName": "龙漕路服务中心"
		}]
	},
	{
		"id": 7,
		"regionName": "闵行区",
		"signUpServiceList": [{
			"id": 17,
			"serviceName": "浦江路服务中心"
		}, {
			"id": 21,
			"serviceName": "银都路地铁站服务中心"
		}, {
			"id": 23,
			"serviceName": "七莘路地铁站服务中心"
		}, {
			"id": 24,
			"serviceName": "东闸路教学点"
		}, {
			"id": 25,
			"serviceName": "七宝地铁站服务中心"
		}, {
			"id": 26,
			"serviceName": "春申路（莘庄宝燕）服务中心"
		}, {
			"id": 27,
			"serviceName": "莘庄服务中心"
		}, {
			"id": 29,
			"serviceName": "金平路地铁站服务中心"
		}, {
			"id": 40,
			"serviceName": "合川路服务中心"
		}, {
			"id": 51,
			"serviceName": "沪闵路服务中心"
		}, {
			"id": 52,
			"serviceName": "宁谷国际教学点"
		}, {
			"id": 64,
			"serviceName": "星宝服务中心"
		}, {
			"id": 65,
			"serviceName": "龙茗路服务中心"
		}, {
			"id": 68,
			"serviceName": "东兰路服务中心"
		}]
	},
	{
		"id": 8,
		"regionName": "虹口区",
		"signUpServiceList": [{
			"id": 30,
			"serviceName": "卢比克服务中心"
		}, {
			"id": 32,
			"serviceName": "广中路服务中心"
		}, {
			"id": 35,
			"serviceName": "中山北一路服务中心"
		}, {
			"id": 36,
			"serviceName": "曲阳路教学点"
		}, {
			"id": 59,
			"serviceName": "临潼路服务中心"
		}]
	},
	{
		"id": 9,
		"regionName": "杨浦区",
		"signUpServiceList": [{
			"id": 31,
			"serviceName": "飞虹路教学点"
		}, {
			"id": 56,
			"serviceName": "老隆昌服务中心"
		}, {
			"id": 57,
			"serviceName": "新隆昌服务中心"
		}, {
			"id": 58,
			"serviceName": "大连路地铁站服务中心"
		}, {
			"id": 60,
			"serviceName": "黄兴公园地铁站服务中心"
		}, {
			"id": 61,
			"serviceName": "吉浦路服务中心"
		}, {
			"id": 62,
			"serviceName": "安波路服务中心"
		}, {
			"id": 63,
			"serviceName": "五角场服务中心"
		}, {
			"id": 69,
			"serviceName": "国霞路服务中心"
		}]
	},
	{
		"id": 10,
		"regionName": "闸北区",
		"signUpServiceList": [{
			"id": 33,
			"serviceName": "康宁路服务中心"
		}, {
			"id": 34,
			"serviceName": "共康路地铁站服务中心"
		}]
	},
	{
		"id": 11,
		"regionName": "宝山区",
		"signUpServiceList": [{
			"id": 38,
			"serviceName": "华灵路服务中心"
		}]
	},
	{
		"id": 12,
		"regionName": "松江",
		"signUpServiceList": [{
			"id": 66,
			"serviceName": "松江云间新天地服务中心"
		}, {
			"id": 67,
			"serviceName": "松江新城服务中心"
		}]
	},
	{
		"id": 13,
		"regionName": "嘉定",
		"signUpServiceList": [{
			"id": 70,
			"serviceName": "嘉定商城服务中心"
		}]
	}
]

// 根据geadeId匹配班级名字
function getGradeTextByGradeId(gradeList, gradeId) {
	let data = gradeList.filter(item => item.value === gradeId)
	return data.length === 0 ? "在读年级" : data[0].label
}

class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '', // 姓名
			phoneNum: '', // 手机号码
			code: '', // 验证码
			grade: '', // 年级id
			gradeTxt: "选择在读年级", // 年级文案
			codeTime: 60, // 倒计时时间
			isSign: -1, // 0-未签到 1-已签到
			regionId: -1, // 教学区id
			serviceId: '', // 服务中心id
			newServiceList: [], // 教学区数据
			signUpServiceList: [], // 服务中心数据
			timer: null,
		}
	}

	async componentWillMount() {
		await Api.islogin()
		await Api.configShare()
		console.log(this.props.home.userdata, '--userdata--')
		this.setState({
			name: this.props.home.userdata.name || '',
			grade: ~~this.props.home.userdata.grade,
			gradeTxt: getGradeTextByGradeId(gradeArr, ~~this.props.home.userdata.grade),
			isSign: ~~this.props.home.userdata.signStatus,
		})
		this.handleData()
	}

	componentDidMount() { }

	componentWillUnmount() { }

	// 处理教学点数据
	handleData = () => {
		let serviceList = Object.assign([], serviceListArr)
		// console.log(serviceList, '--serviceList11--')
		let allData = []
		serviceList.map((item, index) => {
			if (item.signUpServiceList && item.signUpServiceList.length > 0) {
				item.signUpServiceList.map(val => { val.isTrue = (val.id === this.state.serviceId) })
				allData = allData.concat(item.signUpServiceList)
			}
		})
		serviceList.unshift({ id: -1, regionName: '选择区域', signUpServiceList: allData })
		// console.log(serviceList, '--serviceList22--')
		this.setState({
			newServiceList: serviceList,
			signUpServiceList: serviceList.filter(item => item.id === this.state.regionId)[0].signUpServiceList
		})
	}

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
				timer: setInterval(() => {
					let codeTime = this.state.codeTime - 1
					if (codeTime <= 0) {
						clearInterval(this.state.timer)
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

	// 根据教学区id匹配服务中心数据
	mapSignUpServiceList = (id) => {
		return this.state.newServiceList.filter(item => item.id === id)[0].signUpServiceList
	}

	// 点击签到按钮
	goSign = async () => {
		const { name, phoneNum, code, grade, regionId, serviceId } = this.state
		console.log(name, '--name--')
		console.log(phoneNum, '--phoneNum--')
		console.log(code, '--code--')
		console.log(grade, '--grade--')
		console.log(regionId, '--regionId--')
		console.log(serviceId, '--serviceId--')
		if (name === '') {
			Toast.fail("请填写姓名", 1.5);
			return false;
		}
		if (!(/^1\d{10}$/.test(phoneNum))) {
			Toast.fail("手机号不正确", 1.5);
			return false;
		}
		if (!(/^\d{6}$/.test(code))) {
			Toast.fail("验证码不正确", 1.5);
			return false;
		}
		if (grade === '') {
			Toast.fail("请选择年级", 1.5);
			return false;
		}
		if (~~regionId < 0) {
			Toast.fail("请选择教学区域", 1.5);
			return false;
		}
		if (serviceId === '') {
			Toast.fail("请选择教学点", 1.5);
			return false;
		}
		let res = await Api.writeMessage({
			name, grade, phone: phoneNum, code, areaId: regionId, teachingPointId: serviceId
		})
		if (res.code != 1) return Toast.fail(res.message)
		this.props.homeActions.updataInfo({ name, signStatus: 1, grade })
		this.setState({
			isSign: 1
		})
	}

	// 点击教学服务中心
	lineClick = (item) => {
		// console.log(item, '--serviceItem--', regionId, '--regionId--', serviceListAsync, '--serviceListAsync--')
		this.setState({
			serviceId: item.id,
		}, () => {
			this.handleData()
		})
	}

	// 去往直播间
	gotoLive = () => {
		window.location.href = ''
	}

	render() {
		const { codeTime, name, phoneNum, code, grade, gradeTxt, isSign, regionId, signUpServiceList, newServiceList } = this.state
		const { goSign, lineClick, mapSignUpServiceList, startTimer, gotoLive } = this
		return (
			<div id="Home">
				{isSign === 0 && <div className="signPre">
					<img src={bg} className="bg" />
					<div className="bgCont">
						<img src={titleBg} className="titleBg" />
						<div className='formList'>
							<div className="inpWrap">
								<div className="wrapL">
									学员姓名
                				</div>
								<div className="wrapR">
									<input type="text" placeholder="请填写学员姓名"
										value={name}
										onBlur={() => {
											setTimeout(function () {
												var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
												window.scrollTo(0, Math.max(scrollHeight - 1, 0));
											}, 100);
										}}
										onChange={e => this.setState({ name: e.target.value })}
									/>
								</div>
							</div>
							<div className="inpWrap">
								<div className="wrapL">
									手机号
                				</div>
								<div className="wrapR">
									<input type="text" placeholder="请输入手机号"
										className="phoneInp"
										value={phoneNum}
										onBlur={() => {
											setTimeout(function () {
												var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
												window.scrollTo(0, Math.max(scrollHeight - 1, 0));
											}, 100);
										}}
										onChange={e => this.setState({ phoneNum: e.target.value })}
									/>
									<div className="codeTime" onClick={startTimer}>
										{codeTime === 60 ? "获取验证码" : codeTime + `s后重试`}
									</div>
								</div>
							</div>
							<div className="inpWrap">
								<div className="wrapL">
									验证码
                				</div>
								<div className="wrapR">
									<input type="text" placeholder="请输入验证码"
										value={code}
										onBlur={() => {
											setTimeout(function () {
												var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
												window.scrollTo(0, Math.max(scrollHeight - 1, 0));
											}, 100);
										}}
										onChange={e => this.setState({ code: e.target.value })}
									/>
								</div>
							</div>
							<div className="inpWrap">
								<div className="wrapL">
									就读年级
                				</div>
								<div className="wrapR">
									<Picker
										title="选择所在的年级"
										cols={1}
										data={gradeArr}
										value={[grade]}
										onPickerChange={v => {
											this.setState({
												grade: v[0],
												// gradeTxt: getGradeTextByGradeId(gradeArr, v[0] + '')
											})
										}}
										onOk={v => {
											this.setState({
												grade: v[0],
												gradeTxt: getGradeTextByGradeId(gradeArr, v[0])
											})
										}}
									>
										<div className="pickerWrap" >
											{gradeTxt}
										</div>
									</Picker>
									<img src={narrow} className="narrow" />
								</div>
							</div>
							<div className="inpWrap inpWrapSlect">
								<div className="wrapL">
									所在或意向教学点
                				</div>
								<div className="selectR">
									<select
										name="select"
										type="text"
										value={regionId}
										onChange={e => {
											// console.log(~~e.target.value, '--意向教学点--')
											setTimeout(function () {
												var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
												window.scrollTo(0, Math.max(scrollHeight - 1, 0));
											}, 100);
											this.setState({
												regionId: ~~e.target.value,
												signUpServiceList: mapSignUpServiceList(~~e.target.value)
											})
										}}
									>
										{newServiceList.map((item, index) => {
											return (<option value={item.id} key={index}>{item.regionName}</option>)
										})}
									</select>
									<img src={narrowW} className="narrowW" />
								</div>
							</div>
							<div className="lineWrap">
								{signUpServiceList.map((item, index) => {
									return (
										<div className="line" key={index} onClick={() => lineClick(item)}>
											<div className="lineL">
												{item.serviceName}
											</div>
											{item.isTrue && <img src={gou} className="gou" />}
											{!item.isTrue && <div className="circle"></div>}
										</div>
									)
								})}
							</div>
						</div>
					</div>
					<div className="btnWrap">
						<img src={btn} className="btn" onClick={goSign} />
					</div>
				</div>}
				{isSign === 1 && <div className="signEd">
					<div className="successWrap">
						<img src={success} className="success" />
						<div className="tip1">签到成功</div>
						<div className="tip2">恭喜您获得直播盛典抽奖资格</div>
					</div>
					<img src={banner} className="banner" onClick={gotoLive} />
				</div>}
			</div>
		);
	}
}
const mapState = (state) => ({
	home: state.home
});
const mapDispatchToProps = (dispatch) => {
	return {
		homeActions: bindActionCreators(homeActions, dispatch)
	}
}
export default connect(mapState, mapDispatchToProps)(Home);
