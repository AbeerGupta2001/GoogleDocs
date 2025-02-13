"use client"


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSearchParams } from "@/hooks/use-search-params"
import { SearchIcon, X } from "lucide-react"
import { useRef, useState } from "react"


const SearchInput = () => {
    const [search,setSearch] = useSearchParams()
    const [value,setValue] = useState(search)
    const inputRef = useRef<HTMLInputElement|null>(null)
    const handleClear = () => {
        setValue("")
        setSearch("")
        inputRef.current?.blur()
    }

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSearch(value);
        inputRef.current?.blur()
    }


  return (
    <div className="flex-1 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="relative max-w-[720px] w-full">
        <Input
          ref={inputRef}
          placeholder="Search"
          className="md:text-base placeholder:text-neutral-800 px-14 w-full border-none focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73,.3),0_1px_3px_1px_rgba(65,69,73,.15)] bg-[#f0f4f8] rounded-full h-[48px] focus-visible:ring-0 focus:bg-white"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          className="absolute left-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full"
        >
          <SearchIcon />
        </Button>
        {value && (
          <Button
            type="button"
            onClick={handleClear}
            variant="ghost"
            size="icon"
            className="absolute right-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full"
          >
            <X />
          </Button>
        )}
      </form>
    </div>
  );
}
export default SearchInput