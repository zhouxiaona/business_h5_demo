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
const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 ${grid}px 0 0`,
    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',
    // styles we need to apply on draggables
    ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    display: 'flex',
    padding: grid,
    overflow: 'auto',
});

class DragMove extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [
                { id: 'item-0', content: 'hello' },
                { id: 'item-1', content: 'I' },
                { id: 'item-2', content: 'am' },
                { id: 'item-3', content: '卡' },
                { id: 'item-4', content: '特' },
                { id: 'item-5', content: '洛' },
            ]
        }
    }

    async componentDidMount() { }

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
                                style={getListStyle(snapshot.isDraggingOver)}
                                {...provided.droppableProps}
                            >
                                {this.state.items.map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}
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