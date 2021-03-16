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

import BindEffect from '../../compontents/BindEffect'

class TestPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            BindEffectOff: true,
        }
    }

    componentDidMount() {
        console.log(window, '--window--')
    }

    componentWillUnmount() { }

    render() {
        const { BindEffectOff } = this.state
        return (
            <div id="TestPage">
                <BindEffect
                    AlertShow={BindEffectOff}
                    close={() => this.setState({ BindEffectOff: false })}
                />
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
export default connect(mapState, mapDispatchToProps)(TestPage);