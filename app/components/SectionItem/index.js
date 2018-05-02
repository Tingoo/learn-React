import React, { Component } from "react";

class SectionItem extends Component{
    constructor(props){
        super(props);
        const { todo, todolist } = this.props,
            that  =this;
        if(todolist.flag==="active" && todo.completed){
            that.state=({
                checked : true,
                className : "hide"
            });
        }else if(todolist.flag==="completed" && !todo.completed){
            that.state=({
                checked : false,
                className : "hide"
            });
        }else if (todo.completed) {
            that.state=({
                checked : true,
                className : "completed"
            });
        }else {
            that.state=({
                checked: false,
                className:""
            });
        }
        this.edit = this.edit.bind(this);
        this.handlesGender = this.handlesGender.bind(this);
        this.handlesDestroy = this.handlesDestroy.bind(this);
        this.handlesEdit = this.handlesEdit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }
    //组件接收到新的props时调用
    componentWillReceiveProps (nextProps){
        const { todo, todolist } = nextProps,
            that  =this;
        if(todolist.flag==="active" && todo.completed){
            that.state=({
                checked : true,
                className : "hide"
            });
        }else if(todolist.flag==="completed" && !todo.completed){
            that.state=({
                checked : false,
                className : "hide"
            });
        }else if (todo.completed) {
            that.state=({
                checked : true,
                className : "completed"
            });
        }else {
            that.state=({
                checked: false,
                className:""
            });
        }
    }
    edit(){
        const {className} = this.state;
        if(!className) {
            this.setState({
                className : "editing"
            })
        }else {
            this.setState({
                className : "editing completed"
            });
        }
        this.refs.view.style.display="none";
        this.refs.edit.style.display="block";
        this.refs.edit.focus();
    }
    handlesGender(){
        this.props.handleGender(this.props.todo);
    }
    handlesDestroy(){
        this.props.handleDestroy(this.props.todo);
    }
    handlesEdit(e){
        let that = this;
        if(e.keyCode===13) {
            that.refView.style.display = "block";
            that.refEdit.style.display = "none";
            let edit = {
                todo: this.props.todo,
                title: this.refEdit.value
            };
            this.props.handleEdit(edit);
        }
    }
    handleBlur(){
        this.refView.style.display = "block";
        this.refEdit.style.display = "none";
        let edit = {
            todo: this.props.todo,
            title: this.refEdit.value
        };
        this.props.handleEdit(edit);
    }
    render(){
        const { todo } = this.props;
        const { className, checked } = this.state;
        return(
            <li className={className}>
                <div className="view" ref={ (ref)=>this.refView = ref } onDoubleClick={this.edit}>
                    <input type="checkbox" className="toggle" checked={checked} onClick={ this.handlesGender}/>
                    <label>{todo.title}</label>
                    <button className="destroy" onClick={this.handlesDestroy}> </button>
                </div>
                <input type="text" className="edit" ref={ (ref)=>this.refEdit = ref } defaultValue = {todo.title} onKeyUp ={ this.handlesEdit }  onBlur={this.handleBlur} />
            </li>
        )
    }
}
export default SectionItem;