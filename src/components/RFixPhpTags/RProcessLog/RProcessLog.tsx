import './RProcessLog.css'

export class processLog {
    public key: String | Number;
    public text: String;
    constructor(key?: String | Number, text?: String){
        this.key = key || 0;
        this.text = text || '';
    }
    
}

function RProcessLog <processLog> (params:{messages: processLog[]}) {
    return <div className='log-messages'>
            {params.messages.map((item,index) => {
                if(item instanceof processLog ){
                    return <div className='log-message' key={(item.key || '').toString() || index }>{item.text || ''}</div>
                }
                return '';
            })}
    </div>
}
export default RProcessLog