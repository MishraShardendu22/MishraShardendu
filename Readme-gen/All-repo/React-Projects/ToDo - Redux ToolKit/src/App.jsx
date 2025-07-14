/* eslint-disable no-unused-vars */
import React from 'react'
import Name from "./Name"
import AddTodo from './components/AddTodo'
import Todos from './components/Todos'
import {store} from "../src/app/store.js"
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}> 
      <div>
         <AddTodo />
         <Todos />
      </div>
      <div>
        <Name />
      </div>
     </ Provider> 
  )
}

export default App
