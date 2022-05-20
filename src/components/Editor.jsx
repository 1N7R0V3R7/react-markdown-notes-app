import React, { useState } from 'react'
import ReactMde from 'react-mde'
import showdown from 'showdown'
import "react-mde/lib/styles/css/react-mde-all.css";

export default function Editor({ currentNote, updateNote }) {
    const [selectedTab, setSelectedTab] = useState("write")
    const converter = new showdown.Converter({
        tables:true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true
    })
    return (

        <section className="overflow-y-auto">
            <ReactMde 
                value={currentNote.body}
                onChange={updateNote}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={(markdown) =>
                    Promise.resolve(converter.makeHtml(markdown))
                }
                minEditorHeight={50}
                heightUnits="vh"
            />
        </section>
    )
};
