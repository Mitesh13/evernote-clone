import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {useState, useEffect} from 'react'

import '../noteEditor.css'


const NoteEditor = ({selected,sendNote,deleteNote}) => {
    
    const [noteText, setText] = useState()
    const [noteTitle, setNoteTitle] = useState("")
    const [noteStarred, setNoteStarred] = useState(false)
    const [note, setNote] = useState()
    
    console.log({...note,body:"haha"});
    
    useEffect(() => {
        setText(selected?.body)
        setNoteTitle(selected?.title)
        setNoteStarred(selected?.starred)
        setNote(selected)
    }, [selected])

    const saveNote = async e =>{
        e?.preventDefault()
        const method = selected ? "PUT" : "POST"
        // console.log(noteText,noteTitle);
        // if(!noteText || !noteTitle)
        //     return alert("Fill all the details please")
        // else
        // {
            const data = {...note,title:noteTitle,starred:noteStarred,body:noteText}
            console.log(data,method);
            await sendNote(data,method)
        // }
        
        
    }
    return (
        
        <div className="editor-container">
            <button className="done-btn" onClick={()=>deleteNote(note)}>Delete</button>
            <button className="done-btn" onClick={(e)=>setNoteStarred(!noteStarred)}>{noteStarred?"Unstar":"Star"}</button>
            <button className="done-btn" onClick={saveNote}>Done</button>
            
            <input type="text" className="notes-editor-heading" value={noteTitle} onChange={(d)=>setNoteTitle(d.target.value)} placeholder="Note Heading" />
            <div className="editor">
                <CKEditor 
                    editor={ClassicEditor}
                    data={noteText? noteText :""}
                    onChange={(e,editor)=>{
                        const data = editor.getData()
                        console.log("onchange Called")
                        console.log(note?.body)
                        if(data)
                            setText(data)
                        // if(data != note?.body)
                        //     saveNote()
                    }}
                />
            </div>
            
        </div>
    )
}

export default NoteEditor
