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