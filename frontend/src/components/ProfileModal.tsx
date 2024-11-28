import { useState } from "react";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/hooks";
import { useMutation } from "@apollo/client";
import { GET_AUTHENTICATED_USER } from "@/graphql/queries/user.query";
import { CHANGE_NAME_ON_FIRST_LOGIN } from "@/graphql/mutations/user.mutation";

interface Props {
    isOpen: boolean;
    toggleModal: () => void;
    firstTimeLogin: boolean;
}

export const ProfileModal = ({ firstTimeLogin, isOpen, toggleModal }: Props) => {
    const user = useAppSelector((state) => state.authUser?.user);

    // Define newName state
    const [newName, setNewName] = useState(user?.name || "");

    // Mutation for changing the name
    const [changeName, { loading }] = useMutation(CHANGE_NAME_ON_FIRST_LOGIN, {
        refetchQueries: [GET_AUTHENTICATED_USER], // Refetch authenticated user query after mutation
    });

    const handleSave = async () => {

        await changeName({ variables: { input: { newName: newName } } });
    };
    const handleEnter = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSave();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={toggleModal}>
            <DialogContent className="max-w-md mx-auto p-6">
                <header className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 text-center">Profile Details</h2>
                    <p className="text-sm text-gray-500 text-center">
                        {firstTimeLogin
                            ? (<p className=" text-red-600 font-bold">ATTENTION! You can only edit your name once, write down your full name</p>)
                            : "View and edit your personal details below."}
                    </p>
                </header>

                <div className="space-y-4">
                    {/* Editable Name Field */}
                    <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Name:</span>
                        {firstTimeLogin ? (
                            <div className="flex gap-2 items-center">
                                <input
                                    onKeyDown={(e) => handleEnter(e)}
                                    type="text"
                                    value={newName}
                                    autoFocus={true} // Autofocus when firstTimeLogin is true
                                    onChange={(e) => setNewName(e.target.value)}
                                    className="border border-gray-300 rounded-md px-2 py-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                />
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <span className="text-gray-900">{user?.name || "N/A"}</span>
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
                    {firstTimeLogin ? (
                        <Button
                            onClick={handleSave}
                            disabled={loading}
                            className={`w-full text-white hover:bg-green-800 ${loading ? "bg-green-700" : "bg-green-800"}`}
                        >
                            {loading ? "Saving..." : "Save"}
                        </Button>
                    ) : (
                        <Button onClick={toggleModal} className="w-full bg-gray-800 text-white hover:bg-gray-700">
                            Close
                        </Button>
                    )}
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