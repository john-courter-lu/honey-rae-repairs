//// one parameter should be defined for the props object if a child is expecting props from a parent

import { Link } from "react-router-dom"

/////employee key stays on employeelist 

export const Employee = ({ id, fullName, email }) => {
    // link employees 

    // devtools -> component -> employee list  changes to employeeDetails when clicking on a name
    //  /////neveeeer forget the $ symbol just almost restarted the entire project over that typo
        return <section className="employee" >
         { <div> 
            <Link to={`/employees/${id}`}>Name: {fullName}</Link>
            </div> }
         
            <div>Email: {email}</div>
        </section>
}

//${id} 一定要有$, 否则url会奇怪
//强大: 在API中写employee?_expand=user&_embed=employeeTickets&userId=4

//{/* <div> 
//<Link to={`/employees/${id}`}></Link>
//</div> */}

/////// before using link
// return <section className="employee" >
         
// <div>Name: {fullName}</div>
// <div>Email: {email}</div>
// </section>
// }