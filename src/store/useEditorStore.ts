

import {create}  from "zustand"
import { type Editor } from "@tiptap/react"


interface EditorStore{ 
    editor: Editor | null;
    setEditor: (editor: Editor | null) => void;
 }

 const useEditorStore = create<EditorStore>((set)=>({
    editor:null,
    setEditor: (editor:Editor | null) => set({editor:editor})
 }))


 export default useEditorStore;