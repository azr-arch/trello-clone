"use server";

import { db } from "@/lib/db";
import { InputType, ReturnType } from "./types";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateBoardSchema } from "./schema";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { incrementAvailableCount, hasAvailable } from "@/lib/org-limit";
import { checkSubscription } from "@/lib/subscription";

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return {
            error: "Unauthorized",
        };
    }

    const canCreate = await hasAvailable();
    const isPro = await checkSubscription();

    if (!canCreate && !isPro) {
        return {
            error: "You have reached your limits of free boards. Please upgrade to create more.",
        };
    }

    const { title, image } = data;

    const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] = image.split("|");

    if (!imageId || !imageThumbUrl || !imageFullUrl || !imageLinkHTML || !imageUserName) {
        return {
            error: "Missing fields. Failed to create board",
        };
    }

    let board;

    try {
        board = await db.board.create({
            data: {
                title,
                orgId,
                imageId,
                imageLinkHTML,
                imageUserName,
                imageThumbUrl,
                imageFullUrl,
            },
        });

        if (!isPro) {
            await incrementAvailableCount();
        }

        await createAuditLog({
            entityId: board.id,
            entityTitle: board.title,
            entityType: ENTITY_TYPE.BOARD,
            action: ACTION.CREATE,
        });
    } catch (error) {
        return {
            error: "Failed to create",
        };
    }

    revalidatePath(`/board/${board.id}`);
    return { data: board };
};

export const createBoard = createSafeAction(CreateBoardSchema, handler);
