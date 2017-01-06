import React from 'react';
import {render} from 'react-dom';
import {todoStore} from './reducers/index.jsx'

todoStore.subscribe((state)=>{
  console.log('------------------------------------------------');
  todoStore.getState()
  .forEach(e=> console.log(e));
});


class Clock extends React.Component {
    constructor(props){
      super(props);
      this.state ={
        currentTime: new Date().getSeconds()
      }
    }

    render(){
      return (
        <h2>{this.state.currentTime}</h2>
      )
    }

    componentDidMount(){ //este metodo es un metodo que estamos overrideando. se ejecuta cuando se termina de ejectutar el render
      this.intervalId = setInterval(()=> this.setState({currentTime: new Date().getSeconds()}), 1000);
    }
}

class FormTodo extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this); //si no se hiciera esto, el this dentro del metodo sería global, como si fuese jquety.
        this.changeField = this.changeField.bind(this); //se le dice al metodo que cuando invoque el this se refiera a la instancia en si.
        this.state = {
          title: ''
        };
    }

    changeField(evt){
      let own = {};
      own[evt.target.id] = evt.target.value; //lo hace porque si hay mas de un elemento, con esto se lo setea. en este caso va a ser own['title']
      this.setState(own);
    }

    handleSubmit(evt){
      evt.preventDefault();
      if(this.state.title.trim()==='') return;
      todoStore.dispatch({type: 'ADD_TODO', title: this.state.title});
      this.setState({title:''});
    }

    render(){
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Title: <input type="text" id='title' value={this.state.title} onChange={this.changeField} />
          </label>
          <input type="submit" value="Add" />
        </form>
      )
    }


}

class StartStopButton extends React.Component{
  constructor(props){
    super(props);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.clicked = this.clicked.bind(this);
    this.state = {
      started: false,
      counter: 0
    };
  }

  start(){
    this.intervalId = setInterval(()=> this.setState({started:true, counter: this.state.counter + 1}), 1000);
    todoStore.dispatch({type: 'START_TODO', id: this.props.todo.id});
  }

  stop(){
     clearInterval(this.intervalId);
     this.setState({started:false});
     todoStore.dispatch({type: 'STOP_TODO', id: this.props.todo.id});
  }
  
  clicked(){
    if (this.state.started)
      this.stop();
    else 
      this.start();
  }

  render(){
    let style = {
      display: this.state.counter ? 'block' : 'none'
    };

    return (
      <div>
        <button onClick={this.clicked}>{this.state.started ? 'Stop!' : 'Start!'}</button>
        <span style={style}>{this.state.counter}</span>
      </div>
    );
  }
}

class RemoveButton extends React.Component{
  constructor(props){
    super(props);
    this.removeItem = this.removeItem.bind(this);
  }

  removeItem(){
    todoStore.dispatch({type:'REMOVE_TODO', id: this.props.todo.id});
  }

  render(){
    return (
      <button onClick={this.removeItem}>Eliminar</button>
    );
  }
}


class TodoItem extends React.Component{
  constructor(props){
      super(props);
      this.toggleItem = this.toggleItem.bind(this);
  }

  toggleItem(){
    todoStore.dispatch({type:'TOGGLE_TODO', id: this.props.todo.id});
  }

  render(){
    const itemStyle = {
      color: this.props.todo.finish === true ? '#000000' : '#ff0000'
    };

    return (
      <li style={itemStyle } >
        <span onClick={this.toggleItem}>{this.props.todo.title}</span>
        <RemoveButton todo={this.props.todo}/>
        <StartStopButton todo={this.props.todo}/>
      </li>
    );
  }
}

class TodosList extends React.Component{

  render(){
    let list = '';
    return (
      <ul>
        {this.props.todos.map((t)=>{
          return <TodoItem key={t.id} todo={t} />
        })}
      </ul>
    );
  }
}


function Title(props){
  return (
    <h1>{props.value}</h1>
  )
}

class App extends React.Component {

  render() {
    return (
      <div>
      <Title value="relojes magicos"/>
      <Clock />
      <FormTodo />
      <TodosList todos={todoStore.getState()} />
      </div>
    );
  }
}

const appRender = ()=>render(<App />,
document.getElementById('app')
);

appRender();

todoStore.subscribe(()=> appRender())
