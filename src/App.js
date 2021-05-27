import {useState, useEffect} from 'react'

import Menubar from './Components/Menubar'
import NotesList from './Components/NotesList'
import NoteEditor from './Components/NoteEditor'
import DeleteScreen from './Components/DeleteScreen'

import './app.css'

function App() {

  const [notes, setNotes] = useState([])
  const [showStarred, setShowStarred] = useState(false)
  const [selected, setSelected] = useState()
  const [showDelete, setShowDelete] = useState(false)

  const getNotes = async () => {
    
    const res = await fetch('http://localhost:3000/notes')
    const data = await res.json()
    // if(data.body instanceof String)
    //   console.log(parse(data.body));
    
    setNotes(data)
    // console.log(data);
    setSelected(notes[0])
    console.log(notes);
    
  }

  const starNote = note =>
  {
    note.starred = !note.starred
    
    setNotes(notes.map(n => note.id === n.id ? note : n))
  }
 
  const showNotes = () => {
    
    return showStarred ? notes.filter(note => note.starred) : notes

  }

  const sendNote = async (note,method) =>
  {
    
    console.log(JSON.stringify(note));
    let id = note?.id
    let url = "http://localhost:3000/notes/"
    url += method === "PUT" ? `${id}`:""
    console.log("Data going:",JSON.stringify({"id":id,"title":note.title,"body":note.body,"starred":false}));
    
    await fetch(url,{
      method: method,
      headers: { 
        "Content-type": "application/json"
      },
      body: JSON.stringify({"id":id,"title":note.title,"body":note.body,"starred":note.starred})
    })
    
  }

  const deleteNote = async (note) =>
  {
    setShowDelete(!showDelete)
    // const res = await fetch("http://localhost:3000/notes/"+note.id,{
    //   method: "DELETE",
    //   headers:{
    //     "Content-Type": "application/json"
    //   }
    // })
  }
  
  useEffect(() => {
    console.log("notes init",notes);
    setSelected(notes[0])
  }, [notes])

  useEffect(() => {
    async function func()
    {
      await getNotes()
      // console.log(notes);
    }
    func()
      
  }, [])
  
  return (
    <div className="App">
      <Menubar filterStarred={()=>setShowStarred(!showStarred)}/>     
      {
        notes ?
          <NotesList notes={showNotes()} setSelected={(note)=>{
            setSelected(note)
            console.log("Note:"+note.body);
          }}/> :
          <p>No Notes Yet!</p>

      }
      
      <NoteEditor selected={selected} sendNote={sendNote} deleteNote={deleteNote} starNote={starNote}/> 

      {
        showDelete &&
        <DeleteScreen title={selected.title}/>
      }
    </div>
  );
}

export default App;
