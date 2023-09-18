import React  from 'react'
import SubTask from './SubTask';
import TaskCounter from './TaskCounter';
import { Accordion } from 'react-bootstrap';
import { useState } from 'react';
import { useTask } from '../Context/TaskStates';

function EachTask({task, index, taskid, taskindex}) {
  const TaskStates = useTask();
    const[done, setDone] = useState(task.status === "completed"?true:false);
  const handlechange = (e)=>{
    setDone(e.target.checked);
    let newtask = JSON.parse(JSON.stringify(TaskStates.tasks));
        let taskindex =0;
        newtask.find((task, taskind)=>{
            if(task._id === taskid)
            {
                taskindex = taskind;
            }
            return 0;
        })
        TaskStates.taskupdate(taskid, task);
    if(e.target.checked === true)
    {
      for(let i = 0; i<newtask[taskindex].subtasks.length; i++)
      {
        newtask[taskindex].subtasks[i].status = "completed";
      }
      TaskStates.setTasks(newtask);
      TaskStates.triggerToast("Task updated as completed ");
    }
    else{
      TaskStates.triggerToast("Task updated as pending ");
    }
  }
  return (
    <Accordion.Item eventKey={index.toString()}>
            <Accordion.Header>
              <div className=''>
              <div><input  id = "status" type = "checkbox" checked = {done} onChange={(e)=>{handlechange(e)}} style = {{width:"16px", height:"16px", marginRight:"10px"}}/><strong style={{fontSize:"16px"}}>{task.title || "Task Title"}</strong></div>
              <div style = {{position:"absolute", left:"40%", top:"40%"}}><TaskCounter subtasks={task.subtasks} /></div>
              </div>
              </Accordion.Header>
            <Accordion.Body>
              <SubTask subtasks = {task.subtasks} taskid = {taskid} taskindex = {taskindex}></SubTask>
            </Accordion.Body>
          </Accordion.Item>
  )
}

export default EachTask
//<TaskCounter subtasks={task.subtasks} />