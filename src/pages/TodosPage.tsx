import React, { useState, useEffect } from 'react';
import { TodoFormes } from "../components/TodoFormes";
import { TodoList } from "../components/TodoList";
import { ITodo } from "../interfaces";

declare var confirm: (question: string) => boolean;

export const TodosPage: React.FC = () =>{

    const [todos, setTodos] = useState<ITodo[]>([]);

    useEffect(()=>{
        const saved = JSON.parse(localStorage.getItem('todos') || '[]') as ITodo[];
        setTodos(saved)
    },[]);

    useEffect(()=>{
        localStorage.setItem('todos', JSON.stringify(todos));
    },[todos]);

    const addHandler = (title: string) => {
        const newTodo: ITodo = {
            title: title,
            id: Date.now(),
            completed: false
        };
        setTodos(prev => [newTodo, ...prev]);
    };

    const toggleHandler = (id: number) => {
        setTodos(todos.map(todo => {
            if (todo.id === id){
                todo.completed = !todo.completed;
            }
            return todo;
        }))
    };

    const removeleHandler = (id: number) => {
        const element = todos.find( (item) => item.id === id) || {title:''};
        const shouldRemove = confirm(`Вы уверены, что хотите удалить элемент?\n ${element.title}`);
        if (shouldRemove){
            setTodos(prev => prev.filter(todo => todo.id !== id));
        }
    };

    return (
        <>
            <TodoFormes onAdd={addHandler}/>

            <TodoList
                todos={todos}
                onToggle={toggleHandler}
                onRemove={removeleHandler}
            />
        </>
    )
};
