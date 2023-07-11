export const TicketSearch = ({ setterFunction }) => {  // returns an input field 
    return (
        <div>
        <input 
            onChange={
                (changeEvent) => {
                    setterFunction(changeEvent.target.value)
                }
            }
        type="text" placeholder="Enter search terms" /> 
        </div>
    )
}

// devtools components: ticketContainer -> ticketSearch -> props setterFunction:ƒ bound dispatchSetState() {}

/* 章9 
第一步:
return (
        
        <input type="text" placeholder="Enter search terms" /> 
    
        )

第二步:  在applicationViews 中设置 routes
第三步:用div 来分隔这个input field和其他buttons
第四步: 建立 parent ,因为two children components can't talk to each other.
*/
