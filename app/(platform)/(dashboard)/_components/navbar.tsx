import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import { MobileSidebar } from "./mobile-sidebar";

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
                    <Button size={"sm"} variant={"primary"} className="h-auto py-1.5 px-2">
                        <span className="md:hidden">
                            <Plus className="w-5 h-5" />
                        </span>

                        <span className="hidden md:block">Create</span>
                    </Button>
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
