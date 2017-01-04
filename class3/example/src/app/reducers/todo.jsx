import {createStore} from 'redux';

let id = 0;
function todo(state={}, action){
  switch(action.type){
    case 'ADD_TODO':
      return {
        title: action.title,
        status: true,
        id: id++
      }
      break;

    case 'ALTER_TODO':
      //si me mandan un objeto que no coincide, lo devuelvo tal cual
      if (state.id !== action.id) return state; 
      //si no, asigno a un objeto vacío el state original, y sobre eso cambio el estado
      return Object.assign({}, state, {status: !state.status}); 
      break;

    case 'REMOVE_TODO':
      return !(state.id === action.id);
      break;

    default:
    return state;
  }
}

function generateTodos(initState = []) {
  function todos(state=initState, action){
    switch(action.type){
      case 'ADD_TODO':
        return [...state, todo(null, action)];
      break;

      case 'REMOVE_TODO':
        return state.filter(t => todo(t, action));
        break;

      case 'ALTER_TODO':
        return state.map(t => todo(t, action));
        break;

      break;
      default:
      return state;
    }
  }
}


module.exports = (initState) => generateTodos(createStore(initState)); //devuelvo una factory de todosList
