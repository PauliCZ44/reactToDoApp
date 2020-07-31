import React from "react";
//import ReactDOM from "react-dom";
import ContentEditable from "react-contenteditable";

class MyComponent extends React.Component {

  constructor() {
    super();
    this.state = { html: "Notes: <em>You can add notes here<em>"};
  }

  handleChange = evt => {
    this.setState({ html: evt.target.value });
  };

  render = () => {
    //let todoContent =  this.props.todo.content
    //console.log("props are",   this.props.todo.content)
    return (
      <ContentEditable
        html={this.state.html} // innerHTML of the editable div
        disabled={false} // use true to disable edition
        onChange={this.handleChange} // handle innerHTML change
        className= "notes"
        id= {this.props.todo.id}
      />
    );
  };
}


const Todos = ({ todos, deleteTodo, completeTodo, changeTodo, changeTodoContent}) => {


  const todoList = todos.length ? (
    todos.map((todo) => {
        let collectionItem = "collection-item"
        if (todo.isCompleted === true) {
            collectionItem += " completedTodo"
        }
      //  let animationClass = ""
        if (todo.isVisible === false){
           // animationClass += "animate__animated animate__backOutRight"
        }
        
        let animationOnAdd = "myLayout animate__animated"
        let radnomNum = todo.id

        if (animationOnAdd === "myLayout animate__animated"){
        if (radnomNum > 8){
            animationOnAdd += " animate__backInLeft"
          } else if (radnomNum > 6) {
            animationOnAdd += " animate__backInRight"
          } else if (radnomNum > 4) {
            animationOnAdd += " animate__backInUp"
          } else if (radnomNum > 2) {
            animationOnAdd += " animate__fadeInRightBig"
          } else if (radnomNum > 1) {
            animationOnAdd += " animate__fadeInUpBig"
          } else if (radnomNum >0) {
            animationOnAdd += " animate__lightSpeedInLeft"
      
          } else {
            animationOnAdd += " animate__bounceInUp"
          }
        }
      return (
        <div className={collectionItem}   key={todo.id}>
           
          <div className={animationOnAdd}>
            
            <div className="item1">
              <span className="todo-point" style={{fontSize: "25px"}}> ► </span>
              <span className="todo-text" /* contentEditable="true" -> For now i had to cancel this because of caret position problems.*/  onInput={(e) => {changeTodoContent(e, todo)}} >{todo.content}</span>
         
              <MyComponent todo={todo}/>

            </div>

            <div className="item2">
              <button onClick={() => {completeTodo(todo.id, todo)}} className="btn-floating button-small waves-effect waves-light green">
                <i className="tiny material-icons">check</i>
              </button>


              <button onClick={() => {deleteTodo(todo.id, todo)}} className="btn-floating button-small waves-effect waves-light red  scale-transition">
                <i className="tiny material-icons">delete_forever</i>
              </button>

              <button onClick={() => {changeTodo(todo.id, todo)}} className="btn-floating button-small waves-effect waves-light blue">
                <i className="tiny material-icons">create</i>
              </button>
            </div>
          
          </div>
        </div>
      );
    })
  ) : (
    <h4 className="center green-text">Nothing to show here!</h4>
  );
  return <div className="todos collection">{todoList}</div>;
};

export default Todos;
