"use server";

import { db } from "@/lib/db";
import { InputType, ReturnType } from "./types";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateBoardSchema } from "./schema";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId } = auth();

    if (!userId) {
        return {
            error: "Unauthorized",
        };
    }

    const { title } = data;

    let board;

    try {
        board = await db.board.create({
            data: {
                title,
            },
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
