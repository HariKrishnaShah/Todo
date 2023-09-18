import React, {useState}from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useTask } from '../Context/TaskStates';

function AddTask({ButtonName, Heading, Placeholder, taskid, type, taskindex}) {
  const TaskStates = useTask();
  const {tasks, setTasks} = TaskStates;
  const [item, setItem] = useState("");
  const handleChange = (e)=>{
    setItem(e.target.value);
  }
  const taskadds = async()=>{
    if(!item)
    {
      return 0;
    }
    let newtasklist = JSON.parse(JSON.stringify(tasks))
    if(type === "task")
    {
      let tRes = await TaskStates.taskadd({title:item, status:"pending" , subtasks:[]});
      let newtask = {_id: tRes._id, title:item, status:"pending" , subtasks:[]};
      if(newtasklist.length<=0)
      {
        setTasks([newtask])
      }
      else{
        newtasklist.push(newtask)
        setTasks(newtasklist);
      }
      //setTasks(newtasklist);
      TaskStates.triggerToast("New Task Added: " + item);
    }
    else if(type === "subtask")
    {
      let subtaskObj = await TaskStates.subtaskAdd({taskid:taskid,title:item, status:"pending" });
      let newtask = JSON.parse(JSON.stringify(tasks));
      const newsubtask = {title:item, status:"pending", taskid:taskid, _id:subtaskObj._id};
      newtask[taskindex].subtasks.push(newsubtask);
      setTasks(newtask);
      
      TaskStates.triggerToast("New sub task Added: " + item);
    }
    setItem("");
  }
  return (
    <>
      <InputGroup className="mb-3">
        <InputGroup.Text>{Heading}</InputGroup.Text>
        <Form.Control value = {item} onChange={(e)=>{handleChange(e)}} id = "taskadder" placeholder= {Placeholder}/>
        <Button variant="success" onClick={taskadds}>{ButtonName || "ButtonName"}</Button>
      </InputGroup>

    </>
  )
}


export default AddTask