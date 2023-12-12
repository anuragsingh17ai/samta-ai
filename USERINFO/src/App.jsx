import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [data,setData] = useState([])
  const [name,setName] = useState('')
  const [searchHistory,setSearchedHistory] = useState([])
  const [showHistory,setShowHistory] = useState(false)
  const [sorted,SetSorted] = useState(false)
  const [searchedName, setSearchedName] = useState('')


  useEffect(()=>{
      axios.get('https://jsonplaceholder.typicode.com/users')
      .then((res)=>{
        setData(res.data)
      })
      .catch((error)=>{
        console.log(error)
      })

      const locallySavedHistory = window.localStorage.getItem('samtaAihard')
      setSearchedHistory(JSON.parse(locallySavedHistory));
      
      console.log(locallySavedHistory)
 
  },[]);

  useEffect(()=>{
    window.localStorage.setItem('samtaAihard',JSON.stringify([...searchHistory]))
  },[searchHistory])

  const sortedData = [...data].sort((a, b) => a.name.localeCompare(b.name));
  

  return(
    <>
      <div className='Search'>
        <input className='input' onChange={(e)=>{setName(e.target.value)}} placeholder='Enter Name to search'/>
        <button className='button' 
        onClick={()=>{
          setSearchedName(name.trim())
          name && setSearchedHistory([...searchHistory,name])
        }
        }>Search</button>

      </div>

      <div>
        <button className= 'history-btn' onClick={()=>{setShowHistory(!showHistory)}}>
          {showHistory ?<>History OFF</>:<>History ON</>}
        </button>
        {showHistory && searchHistory
          .map((history)=><span className='history'>{history},</span>)
          }
      </div>

      <div>

      <button className='sortButton' onClick={()=>{SetSorted(!sorted)}}>
          Sort By Name
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Phone no.</th>
            <th>Email</th>
            <th>City</th>
            <th>Company Name</th>
          </tr>
        </thead>
        <tbody>
          {
            
            sorted?sortedData.map((user) => (
              user.name.toLowerCase()===searchedName.toLocaleLowerCase() ||searchedName === ''?(
                <tr key={user.id} className='rowData'>
                  {
                    
                      <>
                        <td className='name'>{user.name}</td>
                        <td>{user.username}</td>
                        <td>{user.phone}</td>
                        <td>{user.email}</td>
                        <td>{user.address.city}</td>
                        <td>{user.company.name}</td>
                      </>
                    }
                </tr>
              ): null
            )):data.map((user) => (
              user.name.toLowerCase()===searchedName.toLocaleLowerCase() ||searchedName === ''?(
                <tr key={user.id} className='rowData'>
                  {
                    
                      <>
                        <td className='name'>{user.name}</td>
                        <td>{user.username}</td>
                        <td>{user.phone}</td>
                        <td>{user.email}</td>
                        <td>{user.address.city}</td>
                        <td>{user.company.name}</td>
                      </>
                    }
                </tr>
              ): null
            ))
          }
        </tbody>
      </table>
    </>
  )
}

export default App
