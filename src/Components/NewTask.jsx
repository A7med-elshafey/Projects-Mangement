import { useState } from "react"

export default function NewTask({onAdd}){
  const [enteredTask, setEnteredTask] = useState('');
  function handleChange(event){
    setEnteredTask(event.target.value)

  }
  function handleClick(){
    if(enteredTask.trim() === ''){
      return;
    }
    onAdd(enteredTask);
    setEnteredTask('')
  }
  return (
    <div className=" flex items-center gap-4">
      <input onChange={handleChange} value={enteredTask} type="text" className=" w-64 px-2 py-1 rounded-sm bg-stone-200"/>
      <button onClick={handleClick} className=" text-stone-400 hover:text-stone-600">Add Task</button>
    </div>
  )
}