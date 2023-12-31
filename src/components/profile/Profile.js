//////copypasta applicationViews 类似
/////////copypasta navBar.js 类似


import { CustomerForm } from "./CustomerForm"

import { EmployeeForm } from "./EmployeeForm"





export const Profile = () => {
    const localHoneyUser = localStorage.getItem("honey_user")
    //  grabs honey_user out of storage
    // ^string, needs to be converted into an objext
    const honeyUserObject = JSON.parse(localHoneyUser) 
    // devtools -> application -> storage -> localhost -> now shows the value of staff and id under it 
    //stole from ticketList.js/////////////////

    if (honeyUserObject.staff) {
        //return employee views 
        return <EmployeeForm />
    }  // devtools -> components -> applicationViews -> employeeViews -> ticket container ticket search ticket 
    else {
        //return customer views
        return <CustomerForm />
    }  // devtools -> components -> applicationViews -> customerViews -> ticketList  (under create ticket it shows create form)


///two separate return statements in the if statement
}