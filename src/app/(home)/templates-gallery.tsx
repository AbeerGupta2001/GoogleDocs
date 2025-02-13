"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { templates } from "@/constants/templates";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import FullScreenLoader from "@/components/fullscreen-loader";
import { toast } from "sonner";



export const TemplatesGallery = () => {
  const router = useRouter()
  const create = useMutation(api.documents.create)
  const [isCreating,setIsCreating] = useState(false);
  const onTemplateClick = (title:string,initialContent:string) => {
    setIsCreating(true);
    create({title,initialContent}).catch(()=>toast.error("Something went wrong")).then((documentId)=>{
      router.push(`/documents/${documentId}`);
      toast.success("Template Created")
    }).finally(()=>{
      setIsCreating(false)
    })
  }
  if(isCreating){
    return (<FullScreenLoader label="Creating template" />)
  }
  return (
    <div className="bg-[#f1f3f4]">
      <div className="max-w-screen-xl mx-auto px-20 py-5 flex flex-col gap-y-4">
        <h3 className="font-medium">Start a new document</h3>
        <Carousel>
          <CarouselContent className="-ml-4">
            {templates.map((item) => (
              <CarouselItem
                key={item.id}
                className="basis-1/2 sm:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-[14.285714%] pl-4"
              >
                <div
                  className={cn(
                    "aspect-[3/4] flex flex-col gap-y-2.5",
                    isCreating && "pointer-events-none opacity-50"
                  )}
                >
                  <button
                    disabled={isCreating}
                    onClick={()=>onTemplateClick(item.label,"")}
                    style={{
                      backgroundImage: `url(${item.imageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                    className="size-full hover:border-blue-500 rounded-sm border hover:bg-blue-50 transition flex flex-col items-center justify-center gap-y-4 bg-white"
                  />
                  <p className="text-sm font-medium truncate">{item.label}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};
