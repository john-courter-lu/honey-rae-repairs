import { Outlet, Route, Routes } from "react-router-dom"
import { TicketContainer } from "../tickets/TicketContainer" //parent
import { EmployeeList } from "../employee/EmployeeList.js"
import { EmployeeDetails } from "../employee/EmployeeDetails.js"


////// dont forget to change from ApplicationViews to Employee Views
export const EmployeeViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Honey Rae Repair Shop</h1>
                    <div>Your one-stop-shop to getting all your electronics fixed</div>

                    <Outlet />
                </>
            }>

 
                <Route path="tickets" element={ <TicketContainer /> } />
                <Route path="employees" element={ <EmployeeList /> } />
                <Route path="employees/:employeeId" element={ <EmployeeDetails/> } />
              
            </Route>
        </Routes>
    )
}

/*章11 节3 
route path = 
 element
*/ 