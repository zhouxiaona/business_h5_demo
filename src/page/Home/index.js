/*
 * @Author: river
 * @Date: 2020-01-14 13:14:57
 * @LastEditors: tankswift
 * @LastEditTime: 2020-07-20 15:32:06
 * @Description: 首页逻辑
 * @FilePath: \workSpace\business_h5_demo\src\page\Home\index.js
 */
import React from 'react';
import { connect } from 'react-redux'
import * as homeActions from '../../redux/actions/home'
import { bindActionCreators } from 'redux'
import qs from 'querystring'
import Jsbridge from "xesjsbridge/dist";
import AppApi from '../../api/AppApi.js'
import * as Api from '../../api/api.js'
import { Cookies } from "../../type/index.d.ts"
import { browser } from '../../utils/index.js'
import { Toast, Picker } from 'antd-mobile'
import 'antd-mobile/lib/toast/style/css'
import 'antd-mobile/lib/picker/style/css'
import './index.styl'

class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
		}
	}

	async componentWillMount() {
		// await Api.islogin()
		// await Api.configShare()
		console.log(navigator.userAgent, '--navigator.userAgent--')
		console.log(browser.versions.isxesApp, '--browser.versions.isxesApp--')
		if (browser.versions._weixin) {
			alert('是微信呀')
		} else if (browser.versions.isxesApp) {
			console.log(browser.versions.isxesApp, '--browser.versions.isxesApp--')
			AppApi.setTitle('h5_demo')
			AppApi.cancelLogin()
			AppApi.setShareContent('邀好友,领好礼', 'https://imgs.xrspy.com/old_new/share.jpg', '送好友9元学10课时名师直播课，15件礼物等你免费拿！', window.location.href)
			AppApi.navToFeShare(this.testFn)
			AppApi.guestLogin(this.appGetData)
		} else {
			alert('哈哈哈，我是除微信和学而思APP之外的环境~')
		}
	}

	async componentDidMount() {
		if (browser.versions.isxesApp) {
			console.log('--AppApi--')
			let res = await AppApi.getGuestMode()
			if (!res) return Toast.fail('AppApi报错,请稍后重试')
			if (res.state == 0) {
				await AppApi.openLoginVCOnGuestMode()
			} else {
				this.appGetData()
			}
		}
	}

	componentWillUnmount() { }

	testFn = () => {
		alert('分享成功')
	}

	appGetData = async () => {
		let data = await AppApi.getUserInfo()
		console.log(data, '--data--')
		console.log(this.props.home.userdata, '--this.props.home.userdata--')
	}

	render() {
		const { } = this.state
		const { } = this
		return (
			<div id="Home">
				H5_DEMO  666
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
