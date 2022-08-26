import React,{useState,useRef} from 'react';
import './chatter.css';
function Chatter(){
    const inputEl = useRef();
    const [leftOrRight, setLeftOrRight] = useState(false);
    const [msgs,setMessage] = useState([])
    const submitTxt = (e)=>{
        setLeftOrRight(!leftOrRight);
        let date = new Date();
        let txt = {
            isLeft: leftOrRight,
            text:inputEl.current.value,
            time: date.toLocaleTimeString()
        };
        e.preventDefault();
        setMessage((prevState)=>[
                ...prevState,
                txt
            ]
        )
        inputEl.current.value='';
        date=null;
    }
    
    return (
        <div className='chatter-container'>
            <div className='scroller'>
                {
                    msgs.map(msg=>{
                        return(
                            <div className={ msg.isLeft?'text-container right': 'text-container left'}>
                                <h2>{msg.text}</h2>
                                <p>{msg.time}</p>
                            </div>
                        )
                    })
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