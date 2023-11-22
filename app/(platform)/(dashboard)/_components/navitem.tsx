"use client";

import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { AccordionContent, AccordionTrigger } from "@radix-ui/react-accordion";
import Image from "next/image";

import { Activity, CreditCard, Layout, Settings } from "lucide-react";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export type Organization = {
    id: string;
    slug: string;
    imageUrl: string;
    name: string;
};

interface NavItemProps {
    isExpanded: boolean;
    isActive: boolean;
    organization: any;
    onExpand: (id: string) => void;
}

export const NavItem = ({ isExpanded, isActive, organization, onExpand }: NavItemProps) => {
    const router = useRouter();
    const pathname = usePathname();

    const routes = [
        {
            label: "Boards",
            icon: <Layout className="h-4 w-4 mr-2" />,
            href: `/organization/${organization.id}`,
            // active: pathname === `/organization/${organization.id}`
        },
        {
            label: "Activity",
            icon: <Activity className="h-4 w-4 mr-2" />,
            href: `/organization/${organization.id}/activity`,
        },
        {
            label: "Settings",
            icon: <Settings className="h-4 w-4 mr-2" />,
            href: `/organization/${organization.id}/settings`,
        },
        {
            label: "Billing",
            icon: <CreditCard className="h-4 w-4 mr-2" />,
            href: `/organization/${organization.id}/billing`,
        },
    ];

    const onClick = (href: string) => {
        router.push(href);
    };

    return (
        <AccordionItem value={organization.id} className="border-none">
            <AccordionTrigger
                onClick={() => onExpand(organization.id)}
                className={cn(
                    "w-full flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start underline hover:no-underline",
                    isActive && !isExpanded && "bg-blue-500/10 text-blue-700"
                )}
            >
                <div className="flex items-center gap-x-2">
                    <div className="w-7 h-7 relative">
                        <Image
                            fill
                            src={organization.imageUrl}
                            alt="Organization Cover"
                            className="rounded-sm object-cover"
                        />
                    </div>
                    <span className="font-medium text-sm">{organization.name}</span>
                </div>
            </AccordionTrigger>
            <AccordionContent>
                {routes.map((route) => (
                    <Button
                        key={route.label}
                        size={"sm"}
                        onClick={() => onClick(route.href)}
                        className={cn(
                            "w-full font-normal justify-start pl-10 mb-1",
                            pathname === route.href && "bg-blue-500/10 text-blue-700"
                        )}
                        variant={"ghost"}
                    >
                        {route.icon}
                        {/* <Link href={route.href}>{route.label}</Link> */}
                        {route.label}
                    </Button>
                ))}
            </AccordionContent>
        </AccordionItem>
    );
};