import {useState,useRef} from 'react'
import './RFileInput.css'

function RFileInput(props: {onStartProccess: Function}){

    const zipType = 'application/x-zip-compressed';
    const onStartProccess = props.onStartProccess || console.log;
    const [file, setFile] = useState(new File([],''));

    const handleChange = (selectorFiles: any) =>    
    {
        const inputFile = selectorFiles[0];
        if(!(inputFile instanceof File)){
            console.log('file not selected');
            setFile(new File([],''));
            return;
        }else if(inputFile.type !== zipType){
            console.log('Need select zip file');
            setFile(new File([],''));
            return;
        }
        
        setFile(inputFile);
    }

    const isSelectedFile = file.size > 0;
    let fileSelected = '';
    if(isSelectedFile){
        fileSelected = 'Selected file: '+file.name;
    }else{
        fileSelected = 'File not selected';
    }

    const inputRef = useRef<HTMLInputElement>(null);

    const onClickElement = () => {
        if(inputRef && inputRef.current) {
            inputRef.current.click()
        }
    }
    const unsetSelectedFile = () =>{
        if(inputRef && inputRef.current) {
            inputRef.current.value = '';
        }
        setFile(new File([],''));
    }

    const inputNode =   <input 
        type='file' 
        onChange={ (e) => handleChange(e.target.files) }
        accept={zipType}
        className='input-select-file'
        ref={inputRef}
    ></input>
    
    const unsetNode = <span className='unset-select-file' onClick={unsetSelectedFile} >Unset</span>;
    const processFileButton = <span className='button-process-file' onClick={() => {onStartProccess(file)}}>Process</span>
    return <div className='select-file'>
        <span onClick={onClickElement} className='button-select-file'>Select File</span>
        {inputNode}
        <div className='state-select-file'>
            <span className="title-select-file">{fileSelected}</span>
            {isSelectedFile ? unsetNode : ''}
        </div>
        {isSelectedFile ?
            <div className='process-file-block'>
                {processFileButton}
            </div>
        :''}
    </div>
}

export default RFileInput