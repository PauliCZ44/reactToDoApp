import React, { Component } from 'react'

class AddTodo extends Component {
    state = {
        content: "",
        isVisible: true,
        isCompleted: false,
    }

    zpracujZmeny = (e) => {
        this.setState({
           content: e.target.value 
        })
    }

    zpracujSubmit = (e) => {

        e.preventDefault();
        this.props.addTodo(this.state)   //pass object with new content from form
        this.setState({
            content: ""
        })
    
    }

    render(){
        return (
            <div>
                <form onSubmit={this.zpracujSubmit}>
                    <label htmlFor="" >Add new todo:</label>
                    <input id="mainInput" placeholder="type here" type="text" onChange={this.zpracujZmeny} value={this.state.content}/>
                    <button className="btn waves-effect waves-light blue wideButton" >Add todo</button>
                </form>
            </div>
        )
    }
}

export default AddTodo