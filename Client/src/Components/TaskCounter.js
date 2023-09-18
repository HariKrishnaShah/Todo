import React from 'react'

function TaskCounter({subtasks}) {
    let completed = 0;
    for(let i = 0; i<subtasks.length; i++)
    {
        if(subtasks[i].status === "completed")
        {
            completed++
        }
    }
  return (
    <span>{completed} of {subtasks.length} task completed</span>
  )
}

export default TaskCounter