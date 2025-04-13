import './App.css';
import Header from './MyComponents/Header'; //import header
import {Todos} from './MyComponents/Todos';
import {Footer} from './MyComponents/Footer';
import React, { useState, useEffect } from 'react';
import { AddTodo } from './MyComponents/AddTodo';
import {
  BrowserRouter as Router,
} from "react-router-dom";

function App() {
  let initTodo;
  if(localStorage.getItem("todos") === null){
    initTodo = [];
  }else{
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }
  //function to delete todo
  const onDelete = (todo)=>{
    console.log("I am ondelete of todo", todo);
    setTodos(todos.filter((e)=>{
      return e!=todo;
    }));
    localStorage.getItem("todos");
  }

  //function to add todo
  const addTodo = (title, desc) => {
    console.log("I am adding this todo", title, desc);
    let sno;
    if (todos.length === 0) {
      sno = 1;
    } else {
      sno = todos[todos.length - 1].sno + 1;
    }
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    };
    setTodos([...todos, myTodo]);
    console.log(myTodo);
    if(localStorage.getItem("todos")){
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  };

  //array list of todos
  const [todos, setTodos] = useState(initTodo);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  return (
    <>
    <Router>
      <Header title="My Todos List"/>

      <AddTodo addTodo={addTodo}/>
      <Todos todos={todos} onDelete={onDelete}/>
      
      <Footer/>
    </Router>
    </>
  );
}

export default App;
