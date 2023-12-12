import { Separator } from "@/components/ui/separator";
import { Info } from "./_components/info";
import { BoardList } from "./_components/board-list";
import { checkSubscription } from "@/lib/subscription";

const OrganizationPage = async () => {
    const isPro = await checkSubscription();

    return (
        <div className="w-full mb-20">
            <Info isPro={isPro} />
            <Separator className="my-4" />
            <div className="px-2 md:px-4">
                {/* @ts-ignore */}
                <BoardList />
            </div>
        </div>
    );
};

export default OrganizationPage;
