// import { LoginReducer} from "../../OtherFiles/Constant";
const LoginReducer = ''
let defaultState = {
  LoginReducer: null,


};

const globalReducer = (state = defaultState, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case LoginReducer:
      return Object.assign({}, state, {
        LoginReducer: action.payload,
      });


     
    default:
      return state;

    
  }
};

export default globalReducer;
