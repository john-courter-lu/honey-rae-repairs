import { CustomerViews } from "./CustomerViews"
import { EmployeeViews } from "./EmployeeViews"

export const ApplicationViews = () => {

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser) 
  
    if (honeyUserObject.staff) {
        return <EmployeeViews />
    }  
    else {
        return <CustomerViews />

}
}

//章3 最后一节React Developer Tools

// 这里还显示不了tickets,要第四章过后才能正确显示tickets. 是强制我们看dev tools视频.
//学到新词汇: VanillaJS; 新观点: dev tools和vs code debugger是仅有的两个收集证据的方法

//看视频 https://www.youtube.com/watch?v=rb1GWqCJid4 重复的
//学到 标题右边的四个按钮 有眼睛/有甲虫/有代码
//学到 hooks 下面可以看到State 和 Effect

//章7 节3  为创建ticket form来增加route
//<Route path="ticket/create" element={ <TicketForm /> } />

/*章9 发现: 

这里的route不等于navigate, 而是但route matches时,指定哪几个components to render 

it uses a JSX fragment (<> ... </>) to enclose multiple components.
这两个components都会被render, 而他们的责任是render a search form and a list of tickets.

但是它们不能互相沟通, 于是TicketContainer.js和相应的组件(component)
*/

/*章10 Custom Routing Per User Type #custom-routes
 * EmployeeViews and CustomerViews
* 如果
*/

/*章11 List of Employees 显示employee的list #props #route-parameters 这里看视频
*/

/*章12 employee中显示Customer List 这里要自己写
Customer module
CustomerList module
CustomerDetails component
*/

/* 章13 Editing Profile: Employee #forms #edit 
 * 
*/