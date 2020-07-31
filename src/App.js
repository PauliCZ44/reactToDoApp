import React, { Component } from "react";
import Todos from './Todos'
import AddTodo from "./AddForm";
import Footer from "./Footer";

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      todos: [ {content: "Your todo", id: 10,  isVisible:false, isCompleted: false }
      ],
      show:"all"
    };
    this.deleteTodo = this.deleteTodo.bind(this);
    this.changeTodo = this.changeTodo.bind(this);
    this.completeTodo = this.completeTodo.bind(this);
    this.changeTodoContent = this.changeTodoContent.bind(this);

  }
  filterTodos() {
   const filteredTodos = this.state.todos.filter( x => x.isCompleted === false)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
        this.text.selectionStart = this.text.value.length;
        this.text.selectionEnd = this.text.value.length;
    }
};


  changeTodoContent = (e, todo) => {
    let newContent = e.currentTarget.textContent;
    console.log(e);
    console.log(e.currentTarget.textContent.length);
    todo.content = newContent;
    e.currentTarget.textContent = e.currentTarget.textContent.length;
   

    this.setState({
      content: newContent
    })
  }

  deleteTodo = (id, todo) => {
    console.log(id)
    todo.isVisible = false;
    console.log(todo.isVisible)
    const newTodos = this.state.todos.filter( tod => tod.id!==id)
    setTimeout(() => {

      this.setState({
        todos: newTodos
      })

  }, 150);
  
  }
  completeTodo = (id, todo) => {
    console.log("Completed", id)
    if (todo.isCompleted === false){
    todo.content += " -> COMPLETED";
    todo.isCompleted = true;
    this.setState((state) => ({
      isCompleted: true,
      content: state.content + " COMPLETED"
    }))
    }
 
    else if (todo.isCompleted === true) {
      let newContent = todo.content;
      newContent.replace(" -> COMPLETED", "")
      todo.content = todo.content.replace(" -> COMPLETED", "");
      todo.isCompleted = false;
      this.setState((state) => ({
        isCompleted: false,
        content: newContent
      }))
    }

  }

  changeTodo = (id, todo) => {
    let focusMethod = function getFocus(idtofocus) {           
      document.getElementById(idtofocus).focus();
    }
    console.log("Completed", id)
    focusMethod(id);

  }

  addTodo = (todo) => {
  if (todo.content===""){
    console.log("Empty cont")
    let radnomNum = todo.id
    console.log(radnomNum)
    if (radnomNum > 8){
      todo.content = "Empty task? You had one job and you failed."
    } else if (radnomNum > 6) {
      todo.content = "Did you really add an empty task?"
    } else if (radnomNum > 4) {
      todo.content = "Something should be here!"
    } else if (radnomNum > 2) {
      todo.content = "You have nothing to do?"
    } else if (radnomNum > 1) {
      todo.content = "You can delete this right now :)"
    } else if (radnomNum >0) {
      todo.content = "Again?"

    } else {
      todo.content = "Hmm..."
    }

  }
  todo.id = Math.random()*10;
  todo.isVisible = true;
  todo.isCompleted = false;
  let todosNew  = [...this.state.todos, todo]
  this.setState({
    todos: todosNew
  })
  }

  updateToShow = (state) => {
    this.setState({
      show: state
    })
  }
 /* jestli jsou všechny complete - tak na všechny pustit funci
    jestli nejsou všechny complete - tak spustit funci na ty co nejsou komplet

    jestli je alespoň jeden complete tak pustit finkci jen na nekomplete else
    pustit na všechny

    jestliže je aspoň jeden nekompletní tak to na něj pustíme
    pokud jsou všechny komplet nebo nekomplet tak 
 */
  completeAll = () => {
    if (this.state.todos.every(x => x.isCompleted === true)) {
      console.log("EVERY")
      this.state.todos.map(x => this.completeTodo(x.id, x))
     }

   if (this.state.todos.filter(x => x.isCompleted ===  true).length) {
    console.log("if větev", this.state.todos.filter(x => x.isCompleted ===  true).length)
    this.state.todos.filter(x => x.isCompleted === false).map(x => this.completeTodo(x.id, x))
  } else if ((this.state.todos.filter(x => x.isCompleted ===  true).length) === 0 )  {
    console.log("delka", this.state.todos.filter(x => x.isCompleted ===  true).length)
      console.log("else větev");
      this.state.todos.filter(x => x.isCompleted===false).map(x => this.completeTodo(x.id, x))
   }
   


    // if else not needed but idealy, we would update all to uncomplete if all are complete
   //no need to call setstate here if set state is called inside completeTodo
  }

  deleteAllCompleted = () => {
    this.setState({
      todos: this.state.todos.filter(todo=> !todo.isCompleted)
    })
  }

  deleteAll = () => {
    this.setState({
      todos: []
    })
  }



  render() {
    let showedTodos = []

    if (this.state.show==="all") {
      showedTodos = this.state.todos
    } else if (this.state.show==="completed"){
      showedTodos = this.state.todos.filter(todo=> todo.isCompleted)
    } else if (this.state.show==="active"){
      showedTodos = this.state.todos.filter(todo=> !todo.isCompleted)
    }

    return (
      <div className="todo-add container">
        <h1 className="center blue-text">Simple todo list</h1>
        <AddTodo addTodo={this.addTodo}/>
        <Todos todos={showedTodos} deleteTodo={this.deleteTodo} completeTodo={this.completeTodo} changeTodo={this.changeTodo} changeTodoContent={this.changeTodoContent} />

        <button className="btn light-blue darken-4  waves-effect waves-green controlBtn" onClick={() => this.updateToShow("completed")}>Only Completed</button>

        <button className="btn light-blue darken-4  waves-effect waves-green controlBtn" onClick={() => this.updateToShow("active")}>Only Active</button>

        <button className="btn light-blue darken-4  waves-effect waves-green controlBtn" onClick={() => this.updateToShow("all")}>Show All </button>

        <button className="btn green  waves-effect waves-light controlBtn" onClick={this.completeAll}>Complete All</button>

        

        <button className="btn red darken-4  waves-effect waves-yellow controlBtn" onClick= {this.deleteAll}>Delete All</button>

        {this.state.todos.some(x => x.isCompleted) ? 
        <button className="btn red darken-2  waves-effect waves-yellow controlBtn" onClick={this.deleteAllCompleted}>Delete Completed</button> 
        : null }

        <h5 className="right-align text-black marginExtra">Todos left: {this.state.todos.filter(todo=> !todo.isCompleted).length}</h5>
        <Footer />
      </div>

    );
  }
}
export default App;
