"use server";

import { db } from "@/lib/db";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type State = {
    errors?: {
        title: string[];
    };
    message?: string | null;
};

const CreateBoard = z.object({
    title: z.string().min(3, {
        message: "Minimum length of 3 letters is required",
    }),
});

export async function create(prevState: State, formData: FormData) {
    const validatedField = CreateBoard.safeParse({
        title: formData.get("title"),
    });

    if (!validatedField.success) {
        return {
            errors: validatedField.error.flatten().fieldErrors,
            message: "Missing fields",
        };
    }

    const { title } = validatedField.data;

    try {
        await db.board.create({
            data: {
                title,
            },
        });
    } catch (error) {
        return {
            message: "Database Error",
        };
    }

    revalidatePath("/organization/org_2YX70hizDS7pr5QCL1zpCj2h3YP");
    redirect("/organization/org_2YX70hizDS7pr5QCL1zpCj2h3YP");
}
