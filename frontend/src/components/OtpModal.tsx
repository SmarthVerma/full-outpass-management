import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { OTP_VERIFY } from "@/graphql/mutations/outpass.mutation";
import { useMutation } from "@apollo/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface Params {
    isOtpModalOpen: boolean;
    setIsOtpModalOpen: (value: boolean) => void;
    outpassId: string;
}

export const OtpModal = ({ isOtpModalOpen, setIsOtpModalOpen, outpassId }: Params) => {
    const [otp, setOtp] = useState(""); // State to handle OTP input
    const { toast } = useToast()
    const navigate = useNavigate()

    const [verify, { loading, error }] = useMutation(OTP_VERIFY);
    console.log({ outpassId })
    const handleOtpSubmit = useCallback(() => {
        verify({
            variables: {
                input: { id: outpassId, code: otp },
            },
        });

        toast({ title: "Otp verified successfully", variant: "default" })
        setIsOtpModalOpen(false)
        navigate('/')
    }, [verify, outpassId, otp, toast, setIsOtpModalOpen, navigate]);

    return (
        <Dialog open={isOtpModalOpen} onOpenChange={setIsOtpModalOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Enter OTP</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <Input
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter OTP"
                        className="w-full"
                    />
                </div>
                {error && (
                    <div className="text-red-500 text-sm mt-2">
                        <p>Error: {error.message}</p>
                    </div>
                )}
                <DialogFooter>
                    <Button
                        onClick={handleOtpSubmit}
                        className="w-full"
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Submit OTP"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};