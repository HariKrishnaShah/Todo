import React, { useContext, useState} from 'react'
import TaskContext from "./TaskContext";
import axios from 'axios';
export default function TaskStates(props) {
    const host = process.env.REACT_APP_HOST;
    const authToken = localStorage.getItem('token');
    const[toast, setToast] = useState();
    const[tasks, setTasks] = useState();
    const payload = {headers:{"authToken":authToken, "Content-Type": "application/json"}}

    
    //Toast
    let triggerToast = (msg)=>
    {
        setToast({msg:msg});
        let timer = setTimeout(
            ()=>{
                setToast(null)
            }, 1000
        );
        return(()=>clearTimeout(timer));
    }
    let closeToast = ()=>{
        setToast(null);
    }

//Fetch all tasks
const fetchTask = async()=>{
    let {data} = await axios.get(`${host}/task/viewtasks`, payload);
    setTasks(data);
}


// Add tasks

const taskadd = async(newtask)=>{
    let {data} = await axios.post(`${host}/task/addtask`, newtask, payload);
    return (data);
    
}

// Add Subtask

const subtaskAdd = async(subtask)=>{
    let {data} = await axios.post(`${host}/subtask/addsubtask`, subtask, payload);
    return data;
}


// Update Subtask
const subtaskUpdate = async(subtaskid)=>
{
    await axios.put(`${host}/subtask/updatesubtask`, {subtaskid}, payload);
}

    //Delete Subtask //yet to correct
    const deletesubtask = async (subtaskid, taskid)=>{
        await axios.delete(`${host}/subtask/deletesubtask`, {...payload, data:{subtaskid:subtaskid}});
        let newtask = JSON.parse(JSON.stringify(tasks));
        let taskindex =0;
        let subtaskindex = 0;
        newtask.find((task, taskind)=>{
            if(task._id === taskid)
            {
                taskindex = taskind;
                task.subtasks.find((subtask, subind)=>{
                    if(subtask._id === subtaskid)
                    {
                        subtaskindex = subind;
                    }
                    return 0;
                })
            }
            return 0;
        })
            if (newtask.length > 0) {
            newtask[taskindex].subtasks.splice(subtaskindex, 1);
          }
        setTasks(newtask);   
    }

    //Update Task

    const taskupdate = async(taskid, task)=>{
        await axios.put(`${host}/task/updatetask`, {taskid}, payload);
    for(let subtask of task.subtasks)
    {
        await axios.put(`${host}/subtask/updatesubtask`, {subtaskid:subtask._id, markasdone:"yes"}, payload);
    }
    }
  return (
    <TaskContext.Provider value = {{triggerToast, toast, closeToast, tasks, setTasks, deletesubtask, fetchTask, taskadd, subtaskUpdate, subtaskAdd, taskupdate}} >
    {props.children}
    </TaskContext.Provider>
  )
}

export const useTask = ()=>{
    const context = useContext(TaskContext);
    if(!context)
    {
        throw new Error("Task Context must be called inside the Task Context Provider");
    }
    return context;
    
}
