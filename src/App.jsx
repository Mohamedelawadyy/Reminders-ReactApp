import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addReminder, clearReminders, removeReminder } from './rtk/slices/reminderSlice'
import moment from "moment"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import logo from "./logo-removebg-preview.png"

function App() {
 const [text,setText] = useState("")
 const [date,setDate] = useState(new Date())
 const stateValue = useSelector((state)=>state.reminders)
 const dispatch = useDispatch()
  return (
    <>
      <div className='app'>
        <img src={logo} alt='logo'/>
        <div className="reminder-title">
          <h2>what should u do ?</h2>
        </div>
        <input type="text" className='form-control' placeholder='Enter something'value={text} onChange={(e)=>{setText(e.target.value)}}/>
        <DatePicker
        className='form-control mt-2'
        value={date}
      selected={date}
      onChange={(date) => setDate(date)}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={15}
      timeCaption="time"
      dateFormat="MMMM d, yyyy h:mm aa"
      placeholderText='Select Date'
    />
        <button className='btn btn-primary btn-block w-100 mb-2 mt-2' onClick={()=>{
          dispatch(addReminder({text,date ,id:Math.random()}))
          setText("")
          setDate("")
          } }>Add Reminder</button>
        <ul className='list-group'>
         {stateValue.map((item)=>(
           <li className="reminder-title" key={item.id}>
              <p >{item.text} </p>
              <p >{moment(new Date(item.date)).fromNow()} </p>
              <button className='close-icon btn btn-danger mb-2' onClick={()=>dispatch(removeReminder(item.id))}>X</button>
           </li>
         ))}
         </ul>
        <button className='btn btn-danger btn-block w-100' onClick={()=>dispatch(clearReminders())}>Clear Reminders</button>
       </div>

    </>
  )
}


export default App
