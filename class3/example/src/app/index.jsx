import React from 'react';
import {render} from 'react-dom';
import { createStore } from 'redux';
const todo = require('./reducers/multipletodos.jsx');

class Title extends React.Component {
  render(){
    return (
      <h1>{this.props.value}</h1>
    );
  }
}

//un componente no necesariamente tiene que ser una clase
function TodoItem(props){  
  return (
    <li>
      {props.todo.title}
    </li>
  )
}

class Todos extends React.Component{
  render(){
    const items = this.props.todos.map(t=>(
      <TodoItem key={t.id} todo={t} />
    ))
    return (
      <ul>
          {items}
      </ul>
    );
  }
}

class App extends React.Component {
  render() {
    let todoLists = this.props.todos.map(t => (
      <Todos todos={t} />
    ));
    return (
      <div>
        <Title value="hola a todos" />
        {todoLists}
      </div>
    );
  }
}


//leer sobre inmutables
//render() lo importa arriba
//todo lo importa arriba
const appRender = ()=>render(
  <App todos={[todo.getState()]} />,
  document.getElementById('app')
);

todo.subscribe(()=> console.log(todo.getState()));

todo.dispatch({type:'ADD_LIST'});
todo.dispatch({type:'ADD_LIST'});
todo.dispatch({type:'ADD_LIST'});
