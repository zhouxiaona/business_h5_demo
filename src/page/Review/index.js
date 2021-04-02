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

import Child1 from './child1'
import Child2 from './child2'

class Index extends React.Component {
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



    async componentDidMount() {
        let { code, data, msg } = await Api.signUpIndex()
        if (code != 1) return Toast.info(msg, 1.8)
        console.log(data, '--data--')
        // Object.prototype.a = "jing1";
        // Function.prototype.a = "jing2";
        // function Preson() { };
        // var p = new Preson();
        // console.log(p.a);
        // console.log(p.constructor);
        // console.log(p.__proto__.__proto__.constructor);

        //原型对象
        // var Jing = {
        //     name: function () {
        //         console.log('jingda');
        //     }
        // };

        // //实例对象
        // var Hao = Object.create(Jing);
        // console.log(Object.getPrototypeOf(Hao) === Jing);
        // Hao.name();
        // console.log(Jing.name === Hao.name);



        // console.log('parent componentDidMount')
        // this.setState({
        //     count: this.state.count + 1
        // }, () => {
        //     console.log(this.state.count, '--count1--')
        // })
        // this.setState({
        //     count: this.state.count + 1
        // }, () => {
        //     console.log(this.state.count, '--count2--')
        // })

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
            <div id="Index">
                <Child1 />
                <Child2 />
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
export default connect(mapState, mapDispatchToProps)(Index);