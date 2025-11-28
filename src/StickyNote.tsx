import { useState, useRef, useEffect } from 'react';
import { Trash2, Palette } from 'lucide-react';
import { Colorful } from '@uiw/react-color';
interface Note {
  id: string;
  content: string;
  color: string;
}

interface StickyNoteProps {
  note: Note;
  onUpdate: (id: string, content: string, color: string) => void;
  onDelete: (id: string) => void;
}

export function StickyNote({ note, onUpdate, onDelete }: StickyNoteProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(note.content);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showcolor, setShowcolor] = useState<boolean>(false);
  const [hexcode, setHexcode] = useState<string>('#FFFFFF');
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onUpdate(note.id, content, note.color);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsEditing(false);
      setContent(note.content);
    }
  };

  return (
    <div
      className="relative p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all min-h-[200px] group"
      style={{ backgroundColor: note.color }}
      onDoubleClick={handleDoubleClick}
    >
      {/* Delete Button */}
      <div className="flex flex-row gap-10">
        <button
          onClick={() => setShowcolor(true)}
          className="absolute top-2 right-13 p-2 bg-white border-2 border-black opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
          aria-label="Change Note Color"
        >
          <Palette size={16} />
          {
            showcolor && (
                 <Colorful
            color={hexcode}
            onMouseLeave={() => setShowcolor(false)}
            onChange={(color) => {
                onUpdate(note.id , content , color.hex)
                setHexcode(color.hex)
                
            }}
          />
            )
          }
         
        </button>
        <button
          onClick={() => onDelete(note.id)}
          className="absolute top-2 right-2 p-2 bg-white border-2 border-black opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
          aria-label="Delete note"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Content */}
      {isEditing ? (
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="w-full h-full min-h-[150px] bg-transparent border-2 border-black p-2 resize-none focus:outline-none focus:ring-0"
          placeholder="Write something..."
        />
      ) : (
        <div className="whitespace-pre-wrap wrap-break-word cursor-pointer min-h-[150px]">{content}</div>
      )}

      {/* Edit Hint */}
      {!isEditing && !showcolor && (
        <div className="absolute bottom-2 right-2 text-xs bg-black text-white px-2 py-1 border-2 border-black opacity-0 group-hover:opacity-100 transition-opacity">
          DOUBLE CLICK TO EDIT
        </div>
      )}
    </div>
  );
}
