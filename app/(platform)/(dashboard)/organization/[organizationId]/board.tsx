import { deleteBoard } from "@/actions/delete-board";
import { FormDelete } from "./form-delete";

interface BoardProps {
    id: string;
    title: string;
}

export const Board = ({ id, title }: BoardProps) => {
    const deleteBoardWithId = deleteBoard.bind(null, id);

    return (
        <form action={deleteBoardWithId} className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
                <p>Board: {title}</p>
                <FormDelete />
            </div>
        </form>
    );
};
