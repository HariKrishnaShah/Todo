import React from 'react'
import Alertbar from './Alertbar'
import SubTaskItem from './SubTaskItem';
import AddTask from './AddTask';


function SubTask({subtasks, taskid, taskindex}) {

  return (
    <>
    {subtasks && subtasks.length>0?
    (
      subtasks.map((subtask, index)=>{
        return(
          <SubTaskItem key = {index} taskid ={taskid} subtaskid = {subtask._id} status ={subtask.status === "completed"?true:false} title = {subtask.title} />
        );
      })
    ):<Alertbar Msg = "No subtasks found" Variant="danger" />}
    <div className='my-2 mx-5'>
      <span><AddTask key = {taskid} taskindex = {taskindex} Placeholder = "Add sub task" taskid = {taskid} type = "subtask" ButtonName="Add the Task" Heading = "Add new subtask" /></span>
    </div>
    </>
  )
}

export default SubTask