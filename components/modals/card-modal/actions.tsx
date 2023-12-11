"use client";

import { copyCard } from "@/actions/copy-card";
import { deleteCard } from "@/actions/delete-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import { useCardModal } from "@/hooks/use-card-modal";
import { CardWithList } from "@/types";
import { Copy, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

interface ActionsProps {
    data: CardWithList;
}

export const Actions = ({ data }: ActionsProps) => {
    const cardModal = useCardModal();
    const params = useParams();

    const { execute: executeDeleteCard, isLoading: isDeleteLoading } = useAction(deleteCard, {
        onSuccess: (data) => {
            toast.success(`Card "${data.title}" deleted`);
            cardModal.onClose();
        },
        onError: (err) => {
            toast.error(err);
        },
    });

    const { execute: executeCopyCard, isLoading: isCopyLoading } = useAction(copyCard, {
        onSuccess: (data) => {
            toast.success(`Card "${data.title}" copied`);
            cardModal.onClose();
        },
        onError: (err) => {
            toast.error(err);
        },
    });

    const onDelete = () => {
        const boardId = params.boardId as string;

        executeDeleteCard({
            id: data.id,
            boardId,
        });
    };

    const onCopy = () => {
        const boardId = params.boardId as string;

        executeCopyCard({
            id: data.id,
            boardId,
        });
    };

    return (
        <div className="space-y-2 mt-2 ">
            <p className="text-xs font-semibold ">Actions</p>
            <Button
                disabled={isCopyLoading}
                onClick={onCopy}
                variant={"gray"}
                className="w-full justify-start"
                size={"inline"}
            >
                <Copy className="h-4 w-4 mr-2" />
                Copy
            </Button>
            <Button
                disabled={isDeleteLoading}
                onClick={onDelete}
                variant={"gray"}
                className="w-full justify-start"
                size={"inline"}
            >
                <Trash className="h-4 w-4 mr-2" />
                Delete
            </Button>
        </div>
    );
};

Actions.Skeleton = function ActionsSkeleton() {
    return (
        <div className="space-y-2 mt-2">
            <Skeleton className="w-20 h-4 bg-neutral-200" />
            <Skeleton className="w-full h-8 bg-neutral-200" />
            <Skeleton className="w-full h-8 bg-neutral-200" />
        </div>
    );
};
