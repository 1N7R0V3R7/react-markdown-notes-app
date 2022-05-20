import React, { useEffect, useState } from 'react'
import Split from 'react-split'
import Sidebar from './components/Sidebar'
import Editor from './components/Editor'
import { nanoid } from 'nanoid'

export default function App() {
    const [notes, setNotes] = useState(
        () => JSON.parse(localStorage.getItem("notes")) || []
    )
    const [currentNoteId, setCurrentNoteId] = useState((notes[0] && notes[0].id) || '')

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes))
    }, [notes])

    function createNewNote() {
        const newNote = {
            id: nanoid(),
            body: 'Write something here...'
        }
        setNotes(prevNotes => ([
            newNote, ...prevNotes
        ]))
        setCurrentNoteId(newNote.id)
    }

    function findCurrentNote() {
        return notes.find(note => note.id === currentNoteId)
    }

    function updateCurrentNoteId(id) {
        setCurrentNoteId(id)
    }

    function updateNote(text) {
        setNotes(prevNotes => {
            const temp = []
            for (let i = 0; i < prevNotes.length; i++) {
                const note = prevNotes[i];
                if(note.id === currentNoteId) {
                    text = !text ? 'Empty Note' : text
                    temp.unshift({
                        ...note,
                        body: text
                    })
                }
                else {
                    temp.push(note)
                }
            }
            return temp
        })
    }

    function deleteNote(event, noteId) {
        event.stopPropagation()
        setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
        setCurrentNoteId((notes[0] && notes[0].id) || '')
    }

    return (
        <main className="w-full h-screen bg-[#f5f5f5]">
            {
                notes.length>0
                ?
                <Split
                    sizes={[30, 70]}
                    direction="horizontal"
                    className='max-w-4xl mx-auto flex h-full'
                >
                    <Sidebar 
                        notes={notes}
                        currentNote={findCurrentNote()}
                        newNote={createNewNote}
                        updateCurrentNoteId={updateCurrentNoteId}
                        deleteNote={deleteNote}
                />
                    <Editor 
                        currentNote={findCurrentNote()}
                        updateNote={updateNote}
                    />
                </Split>
                :
                <section className="w-fit text-center absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                    <h1 className="text-[#252525] font-bold text-4xl mb-4   ">
                        You have no notes
                    </h1>
                    <button className="bg-[#4a4374] text-[#f5f5f5] p-4" onClick={createNewNote}>
                        Create one now
                    </button>
                </section>
            }
        </main>
    )
}
