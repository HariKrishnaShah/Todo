import React, { useContext, useState} from 'react'
import TaskContext from "./TaskContext";
import axios from 'axios';
export default function TaskStates(props) {
    const host = process.env.REACT_APP_HOST;
    const authToken = localStorage.getItem('token');
    const[toast, setToast] = useState();
    const[tasks, setTasks] = useState();
    const[loading, setLoading] = useState(false);
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
    setLoading(true);
    let {data} = await axios.get(`${host}/task/viewtasks`, payload);
    setTasks(data);
    setLoading(false);
}


// Add tasks

const taskadd = async(newtask)=>{
    setLoading(true);
    let {data} = await axios.post(`${host}/task/addtask`, newtask, payload);
    setLoading(false);
    return (data);
    
}

// Add Subtask

const subtaskAdd = async(subtask)=>{
    setLoading(true);
    let {data} = await axios.post(`${host}/subtask/addsubtask`, subtask, payload);
    setLoading(false);
    return data;
}


// Update Subtask
const subtaskUpdate = async(subtaskid)=>
{
    setLoading(true);
    await axios.put(`${host}/subtask/updatesubtask`, {subtaskid}, payload);
    setLoading(false);
}

    //Delete Subtask //yet to correct
    const deletesubtask = async (subtaskid, taskid)=>{
        setLoading(true);
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
        setLoading(false);   
    }

    //Update Task

    const taskupdate = async(taskid, task)=>{
        setLoading(true);
        await axios.put(`${host}/task/updatetask`, {taskid}, payload);
    for(let subtask of task.subtasks)
    {
        await axios.put(`${host}/subtask/updatesubtask`, {subtaskid:subtask._id, markasdone:"yes"}, payload);
    }
    setLoading(false);
    }
  return (
    <TaskContext.Provider value = {{triggerToast, toast, closeToast, tasks, setTasks, deletesubtask, fetchTask, taskadd, subtaskUpdate, subtaskAdd, taskupdate, setLoading, loading}} >
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
