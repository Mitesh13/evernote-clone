
const Menubar = ({filterStarred}) => {
    
    return (
        <div className="menubar">
            <button>New</button>
            <button onClick={filterStarred}>Starred</button>
        </div>
    )
}

export default Menubar
