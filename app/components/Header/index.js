import React, { Component } from "react";

class Header extends Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
    }
    handleChange (e) {
        this.props.onAddhange(e.target.value)
    }
    /*新增待处理事项*/
    handleEnter (e) {
        this.props.onAddKeyUp(e)
    }
    render(){
        const item = this.props.items;
        const todolist = this.props.todo;
        return(
            <header className="header">
                <h1>{todolist.name}</h1>
                <input className="new-todo" placeholder="What needs to be done?" value={item} onChange={ this.handleChange } onKeyUp={ this.handleEnter }/>
            </header>
        )
    }
}
export default Header;