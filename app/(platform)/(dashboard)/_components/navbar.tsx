import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import { MobileSidebar } from "./mobile-sidebar";
import { FormPopover } from "@/components/form/form-popover";

export const Navbar = () => {
    return (
        <div className="fixed z-50 top-0 w-full px-4 h-14 border-b shadow-sm bg-white flex items-center">
            {/* Mobile sidebar */}
            <MobileSidebar />

            <div className="flex items-center gap-x-4 w-full">
                <div className="hidden md:block">
                    <Logo />
                </div>

                <div>
                    <OrganizationSwitcher
                        hidePersonal
                        afterCreateOrganizationUrl={"/organization/:id"}
                        afterSelectOrganizationUrl={"/organization/:id"}
                        afterLeaveOrganizationUrl="/select-org"
                        appearance={{
                            elements: {
                                rootBox: {
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                },
                            },
                        }}
                    />
                </div>

                <div>
                    <FormPopover>
                        <Button
                            size={"sm"}
                            variant={"primary"}
                            className="h-auto py-1.5 px-2 md:hidden "
                        >
                            <Plus className="w-5 h-5" />
                        </Button>
                    </FormPopover>

                    <FormPopover align="start" side="bottom" sideOffset={18}>
                        <Button
                            size={"sm"}
                            variant={"primary"}
                            className="h-auto py-1.5 px-2 hidden md:block"
                        >
                            Create
                        </Button>
                    </FormPopover>
                </div>

                <div className="ml-auto">
                    <UserButton
                        afterSignOutUrl="/sign-in"
                        appearance={{
                            elements: {
                                avatarBox: {
                                    height: 30,
                                    width: 30,
                                },
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
