import { Button } from "@/components/ui/button";
import React from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
} from "@/components/ui/dialog";
import { FormatOutpassTable } from "@/lib/formatOutpassForTable";
import { OutpassCard } from "./OutpassCard";
import { useMutation } from "@apollo/client";
import { ACCEPTING_OUTPASS } from "@/graphql/mutations/outpass.mutation";
import { GET_ALL_OUTPASSES } from "@/graphql/queries/outpass.query";

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
    // If no rowData is passed, close the modal immediately and return nothing
    if (!rowData) {
        setIsRowModalOpen(false);
        return null;
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [accept, { loading }] = useMutation(ACCEPTING_OUTPASS, { refetchQueries: [GET_ALL_OUTPASSES] });
    console.log('row', rowData.outpassId)
    const handleAccept = async () => {
        try {
            await accept({ variables: { verifyOutpassId: rowData.outpassId } });
            // Optionally add success logic (like a success message or additional redirects)
            setIsRowModalOpen(false);
            alert('Outpass is accepted ✅')
        } catch (error) {
            console.error("Error accepting outpass:", error);
            // Optionally handle the error with a user-friendly message
        }
    };

    return (
        <Dialog open={isRowModalOpen} onOpenChange={setIsRowModalOpen}>
            <DialogContent>
                <div className="py-1">
                    <OutpassCard rowData={rowData} />
                </div>
                <DialogFooter>
                    <Button
                        onClick={handleAccept}
                        className="w-full"
                        disabled={loading}
                    >
                        {loading ? "Accepting..." : "Accept"}
                    </Button>
                    <Button
                        onClick={() => setIsRowModalOpen(false)}
                        className="w-full"
                    >
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};