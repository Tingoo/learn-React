import React, { Component } from "react";

class Footer extends Component{
    constructor(props){
        super(props);
        this.handleClearCompleted = this.handleClearCompleted.bind(this);
        this.all = this.all.bind(this);
        this.active = this.active.bind(this);
        this.completed = this.completed.bind(this);
    }
    componentDidMount(){

    }
    handleClearCompleted(){
        this.props.handleDestroy()
    }
    all(){
        this.refAll.className = 'selected';
        this.refActive.className = '';
        this.refCompleted.className = '';
        this.props.changeStatus("all");
    }
    active(){
        this.refAll.className = '';
        this.refActive.className = 'selected';
        this.refCompleted.className = '';
        this.props.changeStatus("active");
    }
    completed(){
        this.refAll.className = '';
        this.refActive.className = '';
        this.refCompleted.className = 'selected';
        this.props.changeStatus("completed");
    }
    render(){
        const todolist = this.props.todo;
        let lefted = todolist.todos.reduce((acc, todo) => {
            return todo.completed ? acc : acc+1;
        }, 0);
        return(
            <footer className="footer">
                        <span className="todo-count">
                            <strong> {lefted} </strong> <span> </span> <span> items </span> <span> left </span>
                        </span>
                <ul className="filters">
                    <li> <a href="javascript:void(0)" ref={ (ref)=>this.refAll = ref } className="selected" onClick={this.all}> All </a> </li>
                    <li> <a href="javascript:void(0)" ref={ (ref)=>this.refActive = ref } className="" onClick={this.active}> Active </a> </li>
                    <li> <a href="javascript:void(0)" ref={ (ref)=>this.refCompleted = ref } className="" onClick={this.completed}> Completed </a> </li>
                </ul>
                <button className="clear-completed" onClick={this.handleClearCompleted}>
                    Clear completed
                </button>
            </footer>
        )
    }
}
export default Footer;