import React, { useState } from 'react'
import { StickyNote } from './StickyNote';
import { Plus } from 'lucide-react';

interface Note {
  id: string;
  content: string;
  color: string;
}

const COLORS = ['#FFD93D', '#FF6B9D', '#6BCB77', '#4D96FF', '#FF9F40'];



const Content = () => {
    const [notes, setNotes] = useState<Note[]>([
    { id: '1', content: 'Welcome to your sticky notes!', color: '#FFD93D' },
    { id: '2', content: 'Click the + button to add a new note', color: '#FF6B9D' },
    { id: '3', content: 'Double click to edit any note', color: '#6BCB77' },
  ]);


  const addNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      content: 'New sticky note...',
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };
    setNotes([...notes, newNote]);
  };

  const updateNote = (id: string, content: string , color : string ) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, content , color } : note
    ));
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };


  

  return (
    <div>
      <button
          onClick={addNote}
          className="mb-8 px-6 py-3 bg-black text-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] flex items-center gap-2"
        >
          <Plus size={24} />
          ADD STICKY NOTE
        </button>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 p-5">
          {notes.map(note => (
            <StickyNote
              key={note.id}
              note={note}
              onUpdate={updateNote}
              onDelete={deleteNote}
            />
          ))}
        </div>
    </div>
  )
}

export default Content
