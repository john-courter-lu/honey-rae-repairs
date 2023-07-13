import { Outlet, Route, Routes } from "react-router-dom"
import { TicketList } from "../tickets/TicketList"
import { TicketForm } from "../tickets/TicketForm"
import { Profile } from "../profile/Profile.js"


////// dont forget to change from ApplicationViews to CustomerViews
export const CustomerViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Honey Rae Repair Shop</h1>
                    <div>Your one-stop-shop to getting all your electronics fixed</div>

                    <Outlet />
                </>
            }>

                <Route path="tickets" element={ <TicketList /> } />                             
                <Route path="ticket/create" element={ <TicketForm /> } />
                <Route path="profile" element={ <Profile /> } />
     
            </Route>
        </Routes>
    )
}

// second page 
/// the applicationViews component watches the browser URL & displays the correct component
//////////////////////////in this page////////////////////////////
//////custom routing per ticket type
///// application views has been split into 2 different views. copy pasta application views over to employee & client , then modify for both
//// application views will now show an if else statement for employeeViews vs CustomerViews depending on isStaff or not
///////////////higher order component