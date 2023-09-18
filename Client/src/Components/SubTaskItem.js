import React, { useState, useEffect } from 'react'
import DeleteIcon from './DeleteIcon'
import Swal from 'sweetalert2'
import { useTask } from '../Context/TaskStates';
function SubTaskItem({status, title, subtaskid, taskid}) {
  const TaskStates = useTask();
  const[done, setDone] = useState(status);
  useEffect(()=>{
    setDone(status);
  }, [status])
  const handlechange = (e)=>{
    setDone(e.target.checked);
    let newtask = JSON.parse(JSON.stringify(TaskStates.tasks));
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
        TaskStates.subtaskUpdate(subtaskid);
    if(e.target.checked === true)
    {
      newtask[taskindex].subtasks[subtaskindex].status = "completed";
        TaskStates.setTasks(newtask);
      TaskStates.triggerToast("Task updated as completed ");
    }
    else{
      newtask[taskindex].subtasks[subtaskindex].status = "pending";
        TaskStates.setTasks(newtask);
      TaskStates.triggerToast("Task updated as pending ");
    }
  }
  const handledelete = (subtaskid, taskid)=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
          TaskStates.deletesubtask(subtaskid, taskid);
  TaskStates.triggerToast("Sub task deleted successfully");
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }
  return (
    <div className='d-flex justify-content-between mx-5 my-2'>
        <div><input  id = "substatus" type = "checkbox" checked = {done} onChange={(e)=>{handlechange(e)}} style = {{width:"15px", height:"15px"}}/><strong className='mx-2'>{title}</strong></div>
        <div><button onClick = {()=>{handledelete(subtaskid, taskid)}} style ={{border:"none" ,background:"none"}}><DeleteIcon/></button></div>
    </div>
  )
}

export default SubTaskItem