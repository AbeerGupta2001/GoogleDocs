import { Loader } from "lucide-react"

interface FullScreenLoaderProps{
    label?:string
}

const FullScreenLoader = ({label}:FullScreenLoaderProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-2">
        <Loader className="text-neutral-700 size-10 animate-spin" />
        <p className="text-center text-lg text-neutral-700">{label}</p>
    </div>
  )
}
export default FullScreenLoader