import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
} from "@/components/ui/dialog";
import { FormatOutpassTable } from "@/lib/formatOutpassForTable";
import { OutpassCard } from "./OutpassCard";


interface Props {
    isRowModalOpen: boolean;
    setIsRowModalOpen: (value: boolean) => void;
    rowData: FormatOutpassTable | null;
}

export const FullOutpassModel = ({
    isRowModalOpen,
    setIsRowModalOpen,
    rowData,
}: Props) => {
    if (!rowData) {
        setIsRowModalOpen(false)
        return null
    }
    return (
        <Dialog open={isRowModalOpen} onOpenChange={setIsRowModalOpen}>
            <DialogContent>

                <div className="py-1">
                    <OutpassCard rowData={rowData} />
                </div>
                <DialogFooter>
                    <Button onClick={() => setIsRowModalOpen(false)} className="w-full">
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};