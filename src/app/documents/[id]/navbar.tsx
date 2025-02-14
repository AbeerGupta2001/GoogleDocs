
"use client"

import Image from "next/image"
import Link from "next/link";
import DocumentInput from "./document-input";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { BoldIcon, FileIcon, FileJson, FilePenIcon, FilePlusIcon, GlobeIcon, ItalicIcon, PrinterIcon, RedoIcon, RemoveFormattingIcon, TextIcon, TrashIcon, UnderlineIcon, UndoIcon } from "lucide-react";
import { BsFilePdf, BsFileTextFill } from "react-icons/bs";
import useEditorStore from "@/store/useEditorStore";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Doc } from "../../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import RemoveDialog from "@/components/remove-dialog";
import RenameDialog from "@/components/rename-dialog";

interface NavbarProps{
  data: Doc<"documents">
}


const Navbar = ({data}:NavbarProps) => {
  const create = useMutation(api.documents.create)
  const router = useRouter()


  const {editor} = useEditorStore()

  const onCreate = (title:string,initialContent:string) => {
    create({title,initialContent}).catch(()=>toast.error("Error creating document")).then((documentId)=>{
      router.push(`/documents/${documentId}`)
      toast.success("Document Created")
    })
  }

  

  const onDownload = (blob:Blob , filename:string) => {
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url;
    a.download = filename;
    a.click()
  }

  const onSaveJSON  = () =>{
    if(!editor)return

    const content = editor.getJSON();
    const blob = new Blob([JSON.stringify(content)],{type: "application/json"})
    onDownload(blob,`${data.title}.json`);
  }

  const onSaveHTML = () =>{
    if(!editor) return

    const content = editor.getHTML();
    const blob = new Blob([content],{type:"text/html"})
    onDownload(blob,`${data.title}.html`)
  }

  const onSaveText = () => {
    if (!editor) return;

    const content = editor.getText();
    const blob = new Blob([content], { type: "text/plain" });
    onDownload(blob, `${data.title}.txt`);
  };

  return (
    <nav className="flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <Link href={"/"}>
          <Image src="/logo.svg" alt="logo" width={36} height={36} />
        </Link>
        <div className="flex flex-col">
          <DocumentInput title={data.title} id={data._id} />
          <div className="flex">
            <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  File
                </MenubarTrigger>
                <MenubarContent className="print:hidden">
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <FileIcon className="size-4 mr-2" />
                      Save
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={onSaveJSON}>
                        <FileJson className="size-4 mr-2" />
                        JSON
                      </MenubarItem>
                      <MenubarItem onClick={onSaveHTML}>
                        <GlobeIcon className="size-4 mr-2" />
                        HTML
                      </MenubarItem>
                      <MenubarItem onClick={() => window.print()}>
                        <BsFilePdf className="size-4 mr-2" />
                        PDF
                      </MenubarItem>
                      <MenubarItem onClick={onSaveText}>
                        <BsFileTextFill className="size-4 mr-2" />
                        Text
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem onClick={() => onCreate(data.title, data.initialContent!)}>
                    <FilePlusIcon className="size-4 mr-2" />
                    New Document
                  </MenubarItem>
                  <MenubarSeparator />
                  <RenameDialog documentId={data._id} initialTitle={data.title}>
                    <MenubarItem
                      onSelect={(e) => e.preventDefault()}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FilePenIcon className="size-4 mr-2" />
                      Rename
                    </MenubarItem>
                  </RenameDialog>

                  <RemoveDialog documentId={data._id} title={data.title}>
                    <MenubarItem
                      onSelect={(e) => e.preventDefault()}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <TrashIcon className="size-4 mr-2" />
                      Remove
                    </MenubarItem>
                  </RemoveDialog>

                  <MenubarSeparator />
                  <MenubarItem onClick={() => window.print()}>
                    <PrinterIcon className="size-4 mr-2" />
                    Print{" "}
                    <MenubarShortcut className="text-xs">
                      Ctrl+P
                    </MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Edit
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem
                    onClick={() => editor?.chain().focus().undo().run()}
                  >
                    <UndoIcon className="size-4 mr-2" />
                    Undo{" "}
                    <MenubarShortcut className="text-xs">
                      Ctrl+Z
                    </MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem
                    onClick={() => editor?.chain().focus().redo().run()}
                  >
                    <RedoIcon className="size-4 mr-2" />
                    Redo{" "}
                    <MenubarShortcut className="text-xs">
                      Ctrl+Y
                    </MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Insert
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>Table</MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem
                        onClick={() =>
                          editor
                            ?.chain()
                            .focus()
                            .insertTable({
                              rows: 1,
                              cols: 1,
                              withHeaderRow: true,
                            })
                            .run()
                        }
                      >
                        1 x 1
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor
                            ?.chain()
                            .focus()
                            .insertTable({
                              rows: 2,
                              cols: 2,
                              withHeaderRow: true,
                            })
                            .run()
                        }
                      >
                        2 x 2
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor
                            ?.chain()
                            .focus()
                            .insertTable({
                              rows: 3,
                              cols: 3,
                              withHeaderRow: true,
                            })
                            .run()
                        }
                      >
                        3 x 3
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor
                            ?.chain()
                            .focus()
                            .insertTable({
                              rows: 4,
                              cols: 4,
                              withHeaderRow: true,
                            })
                            .run()
                        }
                      >
                        4 x 4
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Format
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <TextIcon className="size-4 mr-2" />
                      Text
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem
                        onClick={() => editor?.chain().focus().setBold().run()}
                      >
                        <BoldIcon className="size-4 mr-2" />
                        Bold
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().setItalic().run()
                        }
                      >
                        <ItalicIcon className="size-4 mr-2" />
                        Italic
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().setUnderline().run()
                        }
                      >
                        <UnderlineIcon className="size-4 mr-2" />
                        Underline
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem
                    onClick={() =>
                      editor?.chain().focus().unsetAllMarks().run()
                    }
                  >
                    <RemoveFormattingIcon className="size-4 mr-2" />
                    Remove Format
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <OrganizationSwitcher
          afterCreateOrganizationUrl="/"
          afterLeaveOrganizationUrl="/"
          afterSelectOrganizationUrl="/"
          afterSelectPersonalUrl="/"
        />
        <UserButton />
      </div>
    </nav>
  );
}
export default Navbar