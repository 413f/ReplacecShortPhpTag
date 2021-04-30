//import React from 'react'
import {useEffect,useState} from 'react';
import './RFixPhpTags.css'

import {processZip} from '../../functions/processZip'
import RFileInput from './RFileInput/RFileInput'
import RProcessLog, {processLog} from './RProcessLog/RProcessLog'


function RFixPhpTags() {

    const [messages,setMessages] = useState<processLog[]>([]);
    const [isProcessing,setIsProcessing] = useState<Boolean>(false);
    const [message,setMessage] =  useState<String>('');

    function addMessage(log: String) {
        let oldMessages = [...messages];
        oldMessages.unshift(new processLog(Date.now(),log));
        setMessages(oldMessages);
    }

    useEffect(() => {
        addMessage(message);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[message]);

    async function processFile(file: File) {
        if(isProcessing){
            //setMessage('Process is runing');
            return;
        }
        setMessages([]);
        setIsProcessing(true);
        await processZip(file,setMessage).then((r: any) => {
            setIsProcessing(false);
        },console.log)
        return;
    }

    return <div className='fix-php-tags'>
        <div className='select-file-block'>
        <RFileInput
            onStartProccess={(file: File) => {processFile(file); }}
        ></RFileInput>
        </div>
        <div className='messages-block'>
            <RProcessLog
                messages={messages}
            ></RProcessLog>
        </div>
    </div>

}

export default RFixPhpTags;