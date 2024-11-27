import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface params {
    isOtpModalOpen: boolean,
    setIsOtpModalOpen: (value: boolean) => void
}

export const OtpModal = ({ isOtpModalOpen, setIsOtpModalOpen }: params) => {

    // Handle form submission
    const [otp, setOtp] = useState(""); // State to handle OTP input

    const handleOtpSubmit = () => {

    }

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
                <DialogFooter>
                    <Button onClick={handleOtpSubmit} className="w-full">
                        Submit OTP
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}