import React from 'react'
import trashIcon from './trash.svg'
export default function Sidebar(props) {

    const notesList = props.notes.map(note => (
        <div
            key={note.id}
            className={`p-4 flex items-center justify-between group ${note.id === props.currentNote.id ? 'bg-[#4a4374] text-white' : 'text-gray-500'}`}
            onClick={() => props.updateCurrentNoteId(note.id)}
        >
            <p className="">
                {note.body.split('\n')[0]}
            </p>
            <img 
                src={trashIcon}
                onClick={(event) => props.deleteNote(event, note.id)}
                alt="Trash Icon" 
                className='w-6 h-6 cursor-pointer invisible group-hover:visible'
            />
        </div>
    ))
    return (
        <section className="h-full bg-white">
            <div className="flex justify-between items-center bg-white px-4 py-6">
                <h3 className="text-[#252525] font-bold text-3xl">
                    Notes
                </h3>
                <button className="bg-[#4a4374] text-[#f5f5f5] w-8 h-8" onClick={props.newNote}>
                    +
                </button>
            </div>
            <div className="">
                {notesList}
            </div>
        </section>
    )
};
