import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const TicketForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object

        这里新建一个state: ticket也就是未来要POST的内容
    */
    const [ticket, update] = useState({
        description: "",
        emergency: false
    })
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list

        新hook: useNavigate() 就是自动转跳
        注意 const navigate = useNavigate()必须要写在函数handleSaveButtonClick()之外,
        好像只能在React承认的函数格式中出现useNavigate(),
        也就是每个首字母都要大写
    */

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)
    const navigate = useNavigate()

    const handleSaveButtonClick = (event) => {
        event.preventDefault() //这句话:阻止这个click event的default behavior( 一般browser会perform a default behavior), 主要用于防止form自动提交,防止follow 默认ahref links,防止page refresh. 这里是防止refresh/reload. 我们不希望triger page refresh with a POST


        // TODO: Create the object to be saved to the API

        /*这是从server复制的模板
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
        // 这里直接用了ticket 因为下面会用update去修改它

        // TODO: Perform the fetch() to POST the object to the API
        return fetch(`http://localhost:8088/serviceTickets`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },//复数headers
            body: JSON.stringify(ticketObjToSendToAPI)
        })
            .then(res => res.json())//send back 完成的obj, via stringify()-json() 经历了obj-string/text-obj的过程
            .then(() => {
                navigate("/tickets")//要用斜杠
                // 要是不转跳的话, 需要1 refresh: 用setFiltered(tickets) 
                // 2. setUserChoice为初始值
                // 这可能要在父子组件中传递props
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
                                const copy = { ...ticket }//spread syntax
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
                onClick={(evt) => {
                    handleSaveButtonClick(evt)//这里invoke函数,注意要有argument:e/evt/event; 
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