import { createStore } from 'redux';

let id =0;

function todo(state={}, action){
  switch (action.type) {
    case 'ADD_TODO':
        return {
          title: action.title,
          finish: false,
          timer: 0,
          id: id++
        }
      break;
    case 'TOGGLE_TODO':
      //console.log(state.id, action.id);
      if(state.id !== action.id) return state;
      return Object.assign({},
        state,
        {finish: !state.finish}
      );
    case 'REMOVE_TODO':
      console.log(state.id, action.id);
      return !(state.id === action.id);
    case 'START_TODO':
      console.log(state);
      if(state.id !== action.id) return state;
      return Object.assign({},
        state,
        {
          finish: false,
          started: new Date()
        }
      );
    case 'STOP_TODO':
      console.log(state);
      if(state.id !== action.id) return state;
      return Object.assign({},
        state,
        {
          finish: true,
          finished: new Date()
        }
      );
    default:

  }
}

function todos(state=[], action){
  //console.log(state);
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, todo(null, action)];
      break;
    case 'REMOVE_TODO':
      return state.filter(t=> todo(t, action));
      break;
    case 'TOGGLE_TODO':
    case 'START_TODO':
    case 'STOP_TODO':
      return state.map( t=> todo(t, action));
      break;
    default:
      return state;
  }
}

module.exports = createStore(todos);