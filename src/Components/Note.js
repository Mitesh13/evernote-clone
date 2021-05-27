import parse from 'html-react-parser'

const Note = ({note,setSelected}) => {
    return (
        <div onClick={()=>setSelected(note)}>
            <div className="note" style={{backgroundColor:"pink"}}>
                <p className="note-header">{note.title}</p>
                <p className="note-body">{parse(note.body)}</p>
                <p className="note-body">{note.starred? "Starred!" : ""}</p>
            </div>
        </div>
    )
}

export default Note
