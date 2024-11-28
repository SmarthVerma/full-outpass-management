import { useState } from "react";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/hooks";
// import { updateUserName } from "@/redux/slices/authUserSlice";
import { Pencil, Check } from "lucide-react"; // Lucide icons for edit and save

interface Props {
    isOpen: boolean;
    toggleModal: () => void;
}

export const ProfileModal = ({ isOpen, toggleModal }: Props) => {
    const user = useAppSelector((state) => state.authUser?.user);
    // const dispatch = useAppDispatch();

    const [isEditingName, setIsEditingName] = useState(false);
    const [newName, setNewName] = useState(user?.name || "");

    const handleSaveName = () => {
        // dispatch(updateUserName(newName)); // Replace with your actual dispatch logic
        setIsEditingName(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={toggleModal}>
            <DialogContent className="max-w-md mx-auto p-6">
                <header className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Profile Details</h2>
                    <p className="text-sm text-gray-500">View and edit your personal details below.</p>
                </header>

                <div className="space-y-4">
                    {/* Editable Name Field */}
                    <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Name:</span>
                        {isEditingName ? (
                            <div className="flex gap-2 items-center">
                                <input
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    className="border border-gray-300 rounded-md px-2 py-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                />
                                <Check
                                    onClick={handleSaveName}
                                    size={20}
                                    className="text-green-600 cursor-pointer hover:text-green-800"
                                />
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <span className="text-gray-900">{user?.name || "N/A"}</span>
                                <Pencil
                                    onClick={() => setIsEditingName(true)}
                                    size={20}
                                    className="text-gray-500 cursor-pointer hover:text-gray-700"
                                />
                            </div>
                        )}
                    </div>

                    {/* Non-editable fields */}
                    <ProfileDetail label="Email" value={user?.email} />
                    <ProfileDetail
                        label="Status"
                        value={user?.isStudent ? "Student" : "Faculty"}
                    />
                    {user?.isStudent && (
                        <ProfileDetail
                            label="Guardian Phone Number"
                            value={user?.guardianContactNo}
                        />
                    )}
                </div>

                <DialogFooter className="mt-6">
                    <Button onClick={toggleModal} className="w-full bg-gray-800 text-white hover:bg-gray-700">
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

// Helper component for displaying non-editable profile details
const ProfileDetail = ({
    label,
    value,
}: {
    label: string;
    value: string | undefined;
}) => (
    <div className="flex justify-between items-center text-gray-700">
        <span className="font-medium">{label}:</span>
        <span className="text-gray-900">{value || "N/A"}</span>
    </div>
);