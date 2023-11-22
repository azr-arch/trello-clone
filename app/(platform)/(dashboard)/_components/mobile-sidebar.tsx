"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMobileSidebar } from "@/hooks/use-mobile-sidebar";
import { Menu } from "lucide-react";

import { Sidebar } from "./sidebar";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export const MobileSidebar = () => {
    const pathname = usePathname();
    const [isMounted, setIsMounted] = useState(false);

    // const isOpen = useMobileSidebar((state) => state.isOpen);
    const { isOpen, onOpen, onClose } = useMobileSidebar();
    // const onOpen = useMobileSidebar((state) => state.onOpen);
    // const onClose = useMobileSidebar((state) => state.onClose);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        onClose();
    }, [pathname, onClose]);

    if (!isMounted) return null;

    return (
        <>
            <Button onClick={onOpen} size={"sm"} className="block md:hidden mr-2" variant={"ghost"}>
                <Menu className="w-4 h-4" />
            </Button>
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent side={"left"} className="p-2 pt-10">
                    <Sidebar storageKey="t-sidebar-mobile-state" />
                </SheetContent>
            </Sheet>
        </>
    );
};
