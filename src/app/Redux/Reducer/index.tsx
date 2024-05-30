import { combineReducers } from '@reduxjs/toolkit';
import globalReducer from "./globalReducer";


const reducersObj = {
    globalReducer:globalReducer,
};

const reducers = combineReducers(reducersObj);

export default reducers;