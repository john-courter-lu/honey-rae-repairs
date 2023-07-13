import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./TicketList.css"

export const TicketList = ({ searchTermState }) => { //章9 引入props
  const [tickets, setTickets] = useState([]) //章3 节1
  const [filteredTickets, setFiltered] = useState([]) //章5 显示顾客的tickets
  const [emergency, setEmergency] = useState(false)// 章6 与其是empty array, 这里用false, 说明:希望default是false. 我的理解: const后的第一个variable的initial value是useState括号中指定的.
  const [openOnly, updateOpenOnly] = useState(false)

  const navigate = useNavigate() //章7 节2 创建form button同时onClick是打开新webpage

  const localHoneyUser = localStorage.getItem("honey_user")//章5 从local storage中提取当前登录的user的obj(包括id,staff), 但一开始是string(问题:默认是string?)
  const honeyUserObject = JSON.parse(localHoneyUser) //把string变为obj

  useEffect(      // to observe state from parent  & filter down to what is typed into search tab
    () => {
      const searchedTickets = tickets.filter(ticket => ticket.description?.startsWith(searchTermState)) // 再次打开了filter的思路: 用大括号和return, 结合startWith; 也可去掉大括号和return, 但要同一行
      //发现: 是因为有些ticket没有description. 是我create时没有description
      setFiltered(searchedTickets)
      //console.log(searchTermState)
    },
    [searchTermState]
  )
  // devTools components -> ticketList -> props -> searchTermState: ""     <-shows in parentheses what you are currently typing
  // if you console.log(searchTermState) in the use effect it will show everything typed into the search in the console log


  useEffect(() => { //afee 快捷键 empty arrow function
    if (emergency) {
      const emergencyTickets = tickets.filter(ticket => ticket.emergency === true)
      setFiltered(emergencyTickets)//这句话等同于 filteredTickets = emergencyTickets
    } else {
      setFiltered(tickets)
    }
  },
    [emergency]//观察emergency的state; 问题: 在哪里观察? u's
  )

  useEffect( //章4 节1 //功能: observe the current state
    () => {
      fetch(`http://localhost:8088/serviceTickets`)
        .then(res => res.json())
        .then((fetchedArray) => { setTickets(fetchedArray) }) //章4 节1

      //console.log("Initial state of tickets", tickets) // View the initial state of tickets
    },
    [] // When this array is empty, you are observing initial component state
  )

  useEffect(
    () => {
      //console.log("Logged-in user state of tickets", tickets)
      if (honeyUserObject.staff) {
        //for 雇员
        setFiltered(tickets)//不明白为何不是(filteredTickets)
      } else {
        //for 顾客
        const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
        setFiltered(myTickets)
      }
    },
    [tickets]//问题:空着是看initial state, 那写上tickets是observing what?答案: observing tickets
  )

  //问题: 写了之后,不行. 在dev tools中Components中显示第二个state是我们需要的,但是不显示. 

  // 章8 顾客可以选择只看open tickets
  useEffect(
    () => {
      const openTicketArray = tickets.filter(ticket => {
        return ticket.userId === honeyUserObject.id && ticket.dateCompleted === ""
      })  //这里可以用大括号+return的方式, 来让conditional更加复杂( and )
      const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
      openOnly ? setFiltered(openTicketArray) : setFiltered(myTickets)  //教材中用了if else
    },
    [openOnly]
  )

  return <>
    {
      honeyUserObject.staff
        ? <>
          <button onClick={() => { setEmergency(true) }}>Emergency Only</button>
          <button onClick={() => { setEmergency(false) }}>Show All</button>
        </>
        : <>
          <button onClick={() => navigate("/ticket/create")}>Create Ticket</button>
          <button onClick={() => updateOpenOnly(true)}>Open Ticket</button>
          <button onClick={() => updateOpenOnly(false)}>Show All</button>
        </>
    }
    <h2>List of Tickets</h2>
    <article className="tickets">
      {
        filteredTickets.map(//章5 把原来的tickets改为了filteredTickets
          (ticket) => {
            return <section className="ticket">
              <header>[ {ticket.id} ] {ticket.description}</header>
              <footer>Emergency: {ticket.emergency ? "🧨" : "No"}</footer>
            </section>
          }
        )
      }

    </article>
  </>
}

//章3 Employee: List All Tickets Part 1 -- Tickets Route

//首先json-server来架设server(server文件夹)
//然后用npm start来代替serve来显示localhost(honey-ray-repair总文件夹)

/*章3 节1 Component State (the state in a component)

  const [tickets, setTickets] = useState([])

    useState() 一个 React library 中的函数, 用来 store the state in a component;
    tickets 一个空的数组; contains the intial state value at index 0
    setTickets 一个函数; a function that modifies the state at index 1.

*/

/*章3 节2 Observing State

  useEffect(() => {console.log(tickets)},[] )

    //小括号里是一个arrow function和一个空array
    //这里不称之为 the useEffect()函数或method, 这里称之为 the useEffect() hook
    // View the initial state of tickets
    // When this array is empty, you are observing initial component state

    补充: useEffect总是一个function+一个可选的an optional dependency array
    The dependency array is an array of values that the effect depends on.
    这不是用来observe,是用来决定何时when the effect should be executed
    好像是个conditional, 是个if('the value of the dependency' changes) { do the effect}
    如果是空array, the effect will only run once, after the initial render.
    若没有, the effect will run after every render.

*/


/*章4 Employee: List All Tickets Part 2 -- Tickets Route


 从章4开始到全部章8结束, 都需要"implement the code yourself"(我觉得这里implement是fill in不是execute)

 *章4 节1 视频 HTML的生成
  学到词汇:
   JSON server: http application server
   JSX: Syntax to create HTML elements

   学到JSON的插值和对待字符串的方式
   在return全部html string前要用<></> 包裹全部string, 这是JSX的syntax,替代了``
   在JSON中用${}时,不用$
   在.map()中return后面的html string,也没有用引号,估计<></> 已经提到了多层的``

   在dev tools中, lists是在hooks-State下面显示(array of objects)

 *章4 节2 视频 CSS的生成

 学到:
 JSX中不用class= 而是用className=
 可以引用单个module对应的css

 直接import"文件夹的路径.css"
*/

//章5 但用户登录时,只显示他们的ticket

/* 
介绍了nav和auth的code的含义
主要是若isStaff:false 那就fetch filtered order
问题: 不管用
*/

/* 
章6 雇员: 只显示 紧急 tickets 三个video
节1 紧急按钮的Implementation/设置 https://watch.screencastify.com/v/NYREp42EGNkq8knMeZAY

先添加button
再const[]=useState()
再button中 onClick={}; 大括号中, 是一个callback function,来setEmergency(true)
再增加useEffect, 要观察的是emergency, 写在最后的中括号里
callback function中写 : 如果emergency是ture, 做一个filter; 第二步: setFiltered()

补充:
onClick={}; 大括号中, 是一个callback function, 即使不是return(如setFiltered()) 也可以去掉{}(可能需要一句话).

节2 只有雇员可以filter. 可以看到filter 按钮 
二进制statments: ternary statements, syntax 对比值? A:B
可以直接在JSX中用, 需要{}(等于${})

节3 雇员可以show all

*/

