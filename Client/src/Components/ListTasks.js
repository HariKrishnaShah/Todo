import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import Alertbar from './Alertbar';
import EachTask from './EachTask';
import { useTask } from '../Context/TaskStates';
function ListTasks() {
  const TaskStates = useTask();
  const {tasks} = TaskStates;
  
  return (
      <>
    <Accordion defaultActiveKey="0">
        {tasks && tasks.length>0 ?(
            tasks.map((task, index)=>{
                return(
                  <EachTask key = {index} taskindex= {index} task = {task} taskid = {task._id} index = {index} />);
            })
        ):<Alertbar Variant = "danger" Msg = "No Task Found" />}
      </Accordion>
    </>
  )
}

export default ListTasks