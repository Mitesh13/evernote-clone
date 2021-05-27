import Note from './Note'

const NotesList = ({notes, setSelected}) => {
    return (
        <div className="notes-list">
            {
                notes.map((note) => <Note key={note.id} note={note} setSelected={setSelected}/>)
            }
        </div>
    )
}

export default NotesList
