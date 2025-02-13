import { TableCell,TableRow } from "@/components/ui/table"
import { Doc } from "../../../convex/_generated/dataModel"

import { SiGoogledocs } from "react-icons/si"
import { Building2Icon, CircleUserIcon } from "lucide-react"
import { format } from "date-fns"
import DocumentMenu from "./document-menu"
import { useRouter } from "next/navigation"


interface DocumentRowProps{
    document: Doc<"documents">
}

const DocumentRow:React.FC<DocumentRowProps> = ({document}) => {

  const router = useRouter()

  const onNewTabClick = (id:string) => {
    window.open(`/documents/${id}`,"_blank")
  }

  const onRowClick = (id:string) => {
    router.push(`/documents/${id}`);
  }


  return (
    <TableRow onClick={()=>onRowClick(document._id)} className="cursor-pointer">
      <TableCell className="w-[50px]">
        <SiGoogledocs className="size-6 fill-blue-500" />
      </TableCell>
      <TableCell className="font-medium md:w-[45%]">{document.title}</TableCell>
      <TableCell className="text-muted-foreground hidden md:table-cell h-full gap-2">
        <div className="flex items-center gap-2">
          {document.organizationId ? (
            <Building2Icon className="size-4" />
          ) : (
            <CircleUserIcon className="size-4" />
          )}
          {document.organizationId ? "Organization" : "Personal"}
        </div>
      </TableCell>
      <TableCell className="text-muted-foreground hidden md:table-cell">
        {format(new Date(document._creationTime), "MMM dd,yyyy")}
      </TableCell>
      <TableCell>
        <DocumentMenu documentId={document._id} title={document.title} onNewTab={onNewTabClick} />
      </TableCell>
    </TableRow>
  );
}
export default DocumentRow