import React,{useState,useRef} from 'react';
import './chatter.css';
import { io} from'socket.io-client';
const socket = io('http://localhost:4000');
function Chatter({name}){
    const inputEl = useRef();
    const userName = useRef();
    // const [leftOrRight, setLeftOrRight] = useState(false);
    const [msgs,setMessage] = useState([]);
    const [loggedname, setloggedName] = useState('');
    React.useEffect(()=>{
        console.log(msgs)
    },[msgs])
    socket.on('connect',(args)=>{
        console.log('New user Joined');
        console.log(name+' Joined the room connected')
        socket.on('message',(args)=>{
            console.log(args)
            setMessage((prevState)=>[
                ...prevState,
                args.msg
            ])
            console.log(msgs)
        })
    })
    const toggleLeftOrRight = ()=>{
        if(msgs[msgs.length - 1].sender ===loggedname){
            return msgs[msgs.length - 1].isLeft;
        }else{
            return !(msgs[msgs.length - 1].isLeft);
        }
    }
    const submitTxt = (e)=>{
        e.preventDefault();
        // setLeftOrRight(!leftOrRight);
        let date = new Date();
        let txt = {
            count: Math.floor(Math.random() * 10000+1),
            isLeft: toggleLeftOrRight,
            text:inputEl.current.value,
            time: date.toLocaleTimeString(),
            sender: loggedname
        };
        socket.emit('message',txt);
        inputEl.current.value='';
        date=null;
    }
    return (
        <div className='chatter-container'>
            {
                (loggedname ==='') &&(
                        <form onSubmit={e=>{
                        e.preventDefault();
                        setloggedName(userName.current.value)
                    }} style={{display:'flex', alignItems:'center', color:'black'}}>
                        <input  style={{color:'black'}} ref={userName} required type='text' placeholder='Enter your name'/>
                        <button type='submit'>Submit</button>
                    </form>
                )
            }
            <div className='scroller'>
                {
                    (msgs.length >0 ) &&(
                        (msgs.map(msg=>{
                            return(
                                <div key={msg.count} className={ (msg.isLeft)?'text-container right': 'text-container left'}>
                                    <h2>{msg.text}</h2>
                                    <p>{msg.time}</p>
                                </div>
                            )
                        }))
                    )
                }
            </div>
            <div className='message-input'>
                <form onSubmit={submitTxt}>
                    <input required ref={inputEl} placeholder='Type message here' type='text'/>
                    <button type='submit' className='btn'>
                        <img alt='send' src={require('./send.png')}/>
                    </button>
                </form>
            </div>
        </div>
    )
}
export default Chatter;