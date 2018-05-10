import React, { Component } from 'react';
import update from 'immutability-helper';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ReorderListItem from './ReorderListItem';
import { List } from 'material-ui';

class ReorderList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: props.items && props.items.map(item => ({ id: item, data: item }))
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            items: nextProps.items && nextProps.items.map(item => ({ id: item, data: item }))
        })
    }

    handleOnClick = (item) => {
    }

    handleOnRemove = (item) => {
        this.setState(
            update(this.state, {
                items: {
                    $splice: [[this.state.items.indexOf(item), 1]],
                },
            }),
            this.notifyListChange
        );
    }

    notifyListChange = () => {
        this.props.onItemsChange(this.state.items.map((item) => item.data));
    }

    moveListItem = (dragIndex, hoverIndex) => {
        const { items } = this.state;
        const dragitem = items[dragIndex];

        this.setState(
            update(this.state, {
                items: {
                    $splice: [[dragIndex, 1], [hoverIndex, 0, dragitem]],
                },
            }),
            this.notifyListChange
        );
    }

    render() {
        const { items } = this.state;

        return (
            <div>
                <List>
                    {items.map((item, i) => (
                        <ReorderListItem
                            key={item.id}
                            handleOnClick={() => this.handleOnClick(item)}
                            handleOnRemove={() => this.handleOnRemove(item)}
                            index={i}
                            id={item.id}
                            text={item.data}
                            moveListItem={this.moveListItem}
                        />
                    ))}
                </List>
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(ReorderList);