"use client";

import { useProModal } from "@/hooks/use-pro-modal";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { useAction } from "@/hooks/use-action";
import { stripeRedirect } from "@/actions/stripe-redirect";
import { toast } from "sonner";

export const ProModal = () => {
    const proModal = useProModal();

    const { execute } = useAction(stripeRedirect, {
        onSuccess: (data) => {
            window.location.href = data;
        },
        onError: (error) => {
            toast.error(error);
        },
    });

    const onClick = () => {
        execute({});
    };

    return (
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
            <DialogContent className="max-w-md p-0 overflow-hidden">
                <div className="text-neutral-700 mx-auto space-y-6 p-6">
                    <h2 className="font-semibold">Upgrade to Thello pro today!</h2>

                    <p className="text-xs font-semibold text-neutral-600">
                        Explore the best of Thullo
                    </p>
                    <div className="pl-3">
                        <ul className="text-sm list-disc">
                            <li>Unlimited Boards</li>
                            <li>Advanced checklists</li>
                            <li>Admin and security featured</li>
                            <li>And more!</li>
                        </ul>
                    </div>

                    <Button onClick={onClick} className="w-full" variant={"primary"}>
                        Upgrade
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
