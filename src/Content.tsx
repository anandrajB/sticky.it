import { StickyNote } from './StickyNote';
import { Plus } from 'lucide-react';
import useDb from 'use-db';
import { Note } from './types';
import { Button } from './components/ui/button';
const COLORS = ['#FFD93D', '#FF6B9D', '#6BCB77', '#4D96FF', '#FF9F40'];



const Content = () => {

    const date = new Date();
const [notes , setNotes] = useDb('notes' , {
    defaultValue : [
    { id: '1', content: 'Welcome to your sticky notes!', color: '#FFD93D'  ,timestamp : date.toDateString()},
    { id: '2', content: 'Click the + button to add a new note', color: '#FF6B9D' , timestamp : date.toDateString()},
    { id: '3', content: 'Double click to edit any note', color: '#6BCB77', timestamp : date.toDateString()},
  ]
})


  const addNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      content: 'New sticky note...',
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      timestamp : date.toDateString()
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
      

        <Button onClick={addNote}>
<Plus size={24} />
          ADD STICKY NOTE
        </Button>

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
