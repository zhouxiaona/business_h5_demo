/*
 * @Author: river
 * @Date: 2020-01-14 13:14:57
 * @LastEditors: tankswift
 * @LastEditTime: 2020-07-14 10:16:23
 * @Description: 首页逻辑
 * @FilePath: \workSpace\business_h5_demo\src\page\Home\index.js
 */
import React from 'react';
import { connect } from 'react-redux'
import * as homeActions from '../../redux/actions/home'
import { bindActionCreators } from 'redux'
import * as Api from '../../api/api.js'
import { Cookies } from "../../type/index.d.ts"
import { Toast, Picker } from 'antd-mobile'
import 'antd-mobile/lib/toast/style/css'
import 'antd-mobile/lib/picker/style/css'
import './index.styl'

class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	async componentWillMount() {
		// await Api.islogin()
		// await Api.configShare()
	}

	componentDidMount() { }

	componentWillUnmount() { }

	render() {
		const { } = this.state
		const { } = this
		return (
			<div id="Home">
				H5_DEMO
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
