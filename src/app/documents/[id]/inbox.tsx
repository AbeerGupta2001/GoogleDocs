"use client"


import { ClientSideSuspense } from "@liveblocks/react"
import {  BellIcon } from "lucide-react"
import { useInboxNotifications } from "@liveblocks/react/suspense"
import { InboxNotification,InboxNotificationList } from "@liveblocks/react-ui"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Room } from "./room"

export const Inbox = () => {
    return (
      <Room>
        <ClientSideSuspense
          fallback={
            <Button variant={"ghost"} className="relative" size="icon">
              <BellIcon className="size-5" />
            </Button>
          }
        >
          <InboxMenu />
        </ClientSideSuspense>
      </Room>
    );
}


const InboxMenu = () => {
    
    const { inboxNotifications } = useInboxNotifications()
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} className="relative" size="icon">
                    <BellIcon className="size-5" />
                    {
                        inboxNotifications.length > 0 && (
                            <span className="absolute -top-1 -right-1 size-4 rounded-full bg-sky-500 text-xs text-white flex items-center justify-center">
                                {inboxNotifications.length}
                            </span>
                        )
                    }
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-auto">
                {
                    inboxNotifications.length > 0 ? (
                        <InboxNotificationList>
                            {inboxNotifications.map((item)=>(
                                <InboxNotification key={item.id} inboxNotification={item} />
                            ))}
                        </InboxNotificationList>
                    ) : (
                        <div className="p-2 w-[400px] text-center text-sm text-muted-foreground">No notification</div>
                    )
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}