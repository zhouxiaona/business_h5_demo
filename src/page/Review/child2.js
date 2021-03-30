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
import { Toast } from 'antd-mobile'
import 'antd-mobile/lib/toast/style/css'
import './index.styl'

class child2 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            numArr: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            targetNumber: 532456,
            targetNumberArr: [],
            isAni: false,
            count: 1,
        }
    }



    componentDidMount() {
        // console.log('child2 componentDidMount')
        // this.setState({
        //     count: this.state.count + 1
        // })
        // console.log(this.state.count, '--count1--') // 1
        // console.log(this.state.count, '--count2--') // 1
        // setTimeout(() => {
        //     this.setState({
        //         count: this.state.count + 1
        //     })
        //     console.log(this.state.count, '--count5--') // 3
        // }, 0)
        // this.setState({
        //     count: this.state.count + 1
        // })
        // console.log(this.state.count, '--count3--') // 1
        // console.log(this.state.count, '--count4--') // 1

        // setTimeout(() => {
        //     this.setState({
        //         count: this.state.count + 1
        //     })
        //     console.log(this.state.count, '--count5--') // 3
        // }, 0)
    }

    componentWillUnmount() { }

    render() {
        const { targetNumberArr, numArr, isAni } = this.state
        return (
            <div id="child2">
                child2
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
export default connect(mapState, mapDispatchToProps)(child2);