import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const TicketForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [ticket, update] = useState({
        description: "",
        emergency: false
    })
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)
    const navigate = useNavigate()

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        // TODO: Create the object to be saved to the API
        /**
         *   {
            "id": 5,
            "userId": 1,
            "description": "Pariatur nihil animi eos doloremque laborum fugiat consequuntur iusto. Et tempore a enim.",
            "emergency": true,
            "dateCompleted": "Fri Apr 29 2022 21:24:29 GMT-0500 (Central Daylight Time)"
        }
        */
        const ticketObjToSendToAPI = {
            userId: honeyUserObject.id,
            description: ticket.description,
            emergency: ticket.emergency,
            dateCompleted: ""
        }

        // TODO: Perform the fetch() to POST the object to the API


        return fetch(`http://localhost:8088/serviceTickets`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(ticketObjToSendToAPI)
        })
            .then(res => res.json())
            .then(() => {
                navigate("/tickets")
            })

    }
    // 在下面的return中,主要修改了两个onChange={} 
    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brief description of problem"
                        value={ticket.description}
                        onChange={
                            (e) => {
                                const copy = { ...ticket }
                                copy.description = e.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input type="checkbox"
                        value={ticket.emergency}
                        onChange={
                            (e) => {
                                const copy = { ...ticket }
                                copy.emergency = e.target.checked
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => {
                    handleSaveButtonClick(clickEvent)
                }}
                className="btn btn-primary">
                Submit Ticket
            </button>
        </form>
    )
}

//章7 节1 看视频 补充code
//


//章7 节2 只在用户log in的时候,显示ticket form的button. 这里复制到ticketList.js
//<button onClick={() => navigate("/ticket/create")}>Create Ticket</button>