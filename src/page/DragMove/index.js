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
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import 'antd-mobile/lib/toast/style/css'
import './index.styl';

const grid = 8;
// 水平样式
const getItemStyle = (provided, snapshot) => {
    console.log(provided, '---getItemStyle-provided--')
    console.log(snapshot, '---getItemStyle-snapshot--')
    return {
        // some basic styles to make the items look a bit nicer
        userSelect: 'none',
        padding: grid * 2,
        margin: `${grid}px`,
        // change background colour if dragging
        background: snapshot.isDragging ? 'lightgreen' : 'grey',
        // styles we need to apply on draggables
        ...provided.draggableProps.style,
    }
};

const getListStyle = (provided, snapshot) => {
    // console.log(provided, '---getListStyle-provided---')
    // console.log(snapshot, '--snapshot--snapshot----')
    // isDraggingOver: false
    // draggingOverWith: null
    // draggingFromThisWith: null
    // isUsingPlaceholder: false
    return {
        background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
        display: 'flex',
        flexWrap: 'wrap',
        padding: grid,
    }
};

class DragMove extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [
                { id: 'item-0', content: 'item-0' },
                { id: 'item-1', content: 'item-1' },
                { id: 'item-2', content: 'item-2' },
                { id: 'item-3', content: 'item-3' },
                { id: 'item-4', content: 'item-4' },
                { id: 'item-5', content: 'item-5' },
                { id: 'item-6', content: 'item-6' },
                { id: 'item-7', content: 'item-7' },
                { id: 'item-8', content: 'item-8' },
                { id: 'item-9', content: 'item-9' },
                { id: 'item-10', content: 'item-10' },
                { id: 'item-11', content: 'item-11' },
            ]
        }
    }

    async componentDidMount() {
        await Api.islogin()
    }

    // a little function to help us with reordering the result
    reOrder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }
        const items = this.reOrder(
            this.state.items,
            result.source.index,
            result.destination.index
        );
        this.setState({
            items
        });
    }

    render() {
        return (
            <div id="DragMove">
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="droppable" direction="horizontal">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle(provided, snapshot)}
                                {...provided.droppableProps}
                            >
                                {this.state.items.map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(provided, snapshot)}
                                            >
                                                {item.content}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>

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
export default connect(mapState, mapDispatchToProps)(DragMove);