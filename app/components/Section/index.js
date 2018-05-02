import React, { Component } from "react";
import SectionItem from "../SectionItem/index.js";
//待处理事项
class Section extends React.Component{
    constructor(props){
        super(props);
        this.handlesGender = this.handlesGender.bind(this);
        this.handlesDestroy = this.handlesDestroy.bind(this);
        this.handlesEdit = this.handlesEdit.bind(this);
    }
    handlesGender(todo){
        this.props.handleItemGender(todo)
    }
    handlesDestroy(todo){
        this.props.handleItemDestroy(todo)
    }
    handlesEdit(todo){
        this.props.handleItemEdit(todo)
    }
    render(){
        const todolist = this.props.todo;
        return(
            <section className = "main">
                <input className="toggle-all" type="checkbox"/>
                <ul className="todo-list">
                    {
                        todolist.todos.map((todo, i) => {
                            return (
                                <SectionItem key={i} todo={todo} todolist={todolist} handleGender={this.handlesGender} handleDestroy={this.handlesDestroy} handleEdit={this.handlesEdit}/>
                            )
                        })
                    }
                </ul>
            </section>
        )
    }
}
export default Section;