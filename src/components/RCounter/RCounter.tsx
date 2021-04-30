import React, { useState } from 'react';
import './RCounter.css'

function RCounter(props: { from ?: number }) {
    const from = props.from || 0;
    const [count, setCount] = useState(from);
    
    function increment(){
        console.log(count);
        setCount(count + 1);
    }

    function decrement(){
        console.log(count);
        setCount(count - 1);
    } 

    return <div>
        
        <div className='counter-buttons'>
            <div onClick={decrement} className='counter'>-</div>
            <div>{count}</div>
            <div onClick={increment} className='counter'>+</div>
        </div>
    </div>
}

export default RCounter