import React, { Component } from "react";
import Header from "../Header/index.js";
import Footer from "../Footer/index.js";
import Section from "../Section/index.js";
/*import data from "/learn-React/data/things.json";*/

class Main extends Component{
    constructor (props) {
        super(props);

        this.state = {
            item: "",
            finish: false,
            noChecked: [],
            todolist: null
        };

        this.onListAddhange = this.onListAddhange.bind(this);
        this.handleGender = this.handleGender.bind(this);
        this.handleAddEnter = this.handleAddEnter.bind(this);
        this.handleDestroy = this.handleDestroy.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDestroyCompleted = this.handleDestroyCompleted.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
    }
    componentDidMount() {
        $.getJSON('/learn-React/data/things.json').done(function (data) {
            this.setState({todolist: data});
        }.bind(this));
        /*this.setState({todolist: data});*/
    }
    onListAddhange (text) {
        this.setState({item:text})
    }
    /*新增待处理事项*/
    handleAddEnter (e) {
        const {item,todolist} = this.state;
        if (e.keyCode == 13 && item) {
            todolist.todos.push({
                completed: false,
                title: item
            });
            e.target.value = "";
            this.setState({
                todolist:todolist,
                item:""
            })
        }
    }
    /*改变完成状态*/
    handleGender (todo) {
        //此处todo是按值传递，他的值是object的地址；此处改变了item的completed值
        const {todolist} = this.state;
        todolist.todos.map((item)=>{
            if (item === todo){
                item.completed = !todo.completed;
            }
        });
        //更新状态触发渲染
        this.setState({
            todolist: todolist
        });
    }
    /*删除事项*/
    handleDestroy(todo){
        const {todolist} = this.state;
        todolist.todos.map((item,index)=>{
            if(item === todo){
                delete todolist.todos[index];
            }
        });
        this.setState({
            todolist: todolist
        })
    }
    /*修改事项*/
    handleEdit(edit){
        const {todolist} = this.state;
        todolist.todos.map((item,index)=>{
            if(item === edit.todo){
                item.title = edit.title;
            }
        });
        this.setState({
            todolist: todolist
        })
    }
    /*删除所有已完成的事项*/
    handleDestroyCompleted(){
        const {todolist} = this.state;
        todolist.todos.map((item, index) => {
            item.completed && delete todolist.todos[index];
        });
        this.setState({
            todolist: todolist
        })
    }
    /*根据条件过滤事项*/
    handleChangeStatus(value){
        const {todolist} = this.state;
        switch(value){
            case 'all':
                todolist.flag = "all";
                break;
            case 'active':
                todolist.flag = "active";
                break;
            case 'completed':
                todolist.flag = "completed";
                break;
        }
        this.setState({
            todolist: todolist
        });
    }
    render () {
        const { item,todolist } = this.state;

        if (!todolist) {
            return <div>Loading</div>;
        }
        return <div>
            <Header todo={todolist} items={item} onAddhange={this.onListAddhange} onAddKeyUp = {this.handleAddEnter}/>
            <Section todo={todolist} handleItemGender={this.handleGender} handleItemDestroy = {this.handleDestroy} handleItemEdit = {this.handleEdit}/>
            <Footer todo={todolist} handleDestroy = {this.handleDestroyCompleted} changeStatus = {this.handleChangeStatus}/>
        </div>
    }
}
export default Main;