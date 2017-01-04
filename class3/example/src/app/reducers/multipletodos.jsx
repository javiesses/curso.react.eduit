import {createStore} from 'redux';
const factoryTodos = require('./todo.jsx');

function multipleTodos(state=[], action){
  switch(action.type){
    case 'ADD_LIST':
      return [...state, factoryTodos()]; //ejecuto la function que importé. agrego un store a la lista
      break;

    case 'ALTER_TODO':
      return state.map((todosStore, index) => {
        if (action.index !== index) return todosStore;
        todosStore.dispatch({type: 'ADD_TODO', id: action.id, title: action.title});
        return todosStore;
      });
      break;

    default:
    return state;
  }
}


module.exports = createStore(todos);
