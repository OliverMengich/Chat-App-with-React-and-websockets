import React,{useState} from 'react';
import './App.css';
import { io} from'socket.io-client';
import Chatter from './components/chat/chatter';
const socket = io('ws://localhost:4000');
function App() {
  const [message,setMessage] = useState('');
  socket.on('Hello_client',(args)=>{
    console.log(args)
    setMessage(args.msg)
  })
  socket.emit('Hello_Server',{
    msg: 'Doing great, how are you'
  })
  return (
    <div className="App">
      <h1>{message}</h1>
      <Chatter />
    </div>
  );
}

export default App;
