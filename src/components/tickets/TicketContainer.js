import { useState } from "react"
import { TicketList } from "./TicketList"
import { TicketSearch } from "./TicketSearch"    // combines these two with parent

export const TicketContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")   // keeping the state of search terms in here  // 因为子组件不能互相交谈
    //下面的return其实就是两个子组件用JSX fragment wrapped
    return <>
        <TicketSearch setterFunction={setSearchTerms} /> 
        <TicketList searchTermState={searchTerms} />
    </>
}


/**
 * setterFunction={setSearchTerms} 
 * searchTermState={searchTerms}
 * 这就是给props的方法
 * 
 * 注意貌似React所有的赋值都加入了大括号
 * 
 * setterFunction={setSearchTerms}  等于import setSearchTerms as setterFunction 
 * 这可以在任何时候import components时用 
 * 也就是 return <组件名字 import..as />
 */




// return <>
// props on a single object -> no matter how many you make you can deconstruct them
// <TicketSearch setterFunction={setSearchTerms}/>   
// give one the parents function object keys and values, variable = values
// <TicketList searchTermState={searchTerms}/>   
// the other its state 
       // cannot directly send state to each other. 
       // put the states they want to share in a parent 
       // tw
// </>

// this is the parent component that will maintain the state and ticket list and 

// ticket search are going to get access to this state via props 



///// TicketSearch does not contain the state of searchTerms or the function of setSearchTerms , the parent TicketContainer does


/////// TicketSearch needs access to setSearchTerms function -> settter function  

///// TicketList needs acces to the actual state -> searchTermState

/// passing values down to child components 

//// setterFunction is name of key