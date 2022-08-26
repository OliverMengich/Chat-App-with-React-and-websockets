import React from 'react';
import './App.css';
// import { io} from'socket.io-client';
import Chatter from './components/chat/chatter';
// const socket = io('ws://localhost:4000');
function App() {
  // const [message,setMessage] = useState('');
  // socket.on('connect',()=>{
  //   console.log('User connected')
  // })
  // socket.on('Hello_Client',(args)=>{
  //   console.log(args.msg)
  //   setMessage(args.msg)
  // })
  return (
    <div className="App">
      <h1>Hello_Client</h1>
      <Chatter name='Oliver' />
    </div>
  );
}

export default App;
