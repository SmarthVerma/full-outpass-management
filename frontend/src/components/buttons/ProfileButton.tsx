import { useState, useCallback } from "react";
import { twMerge } from "tailwind-merge";
import { ActionButton, ActionButtonProps } from "./ActionButton";
import { MdPerson } from "react-icons/md";
import { ProfileModal } from "../ProfileModal";

export const ProfileButton = ({ className, ...props }: ActionButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);


  const toggleModal = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  return (
    <>
      <ActionButton onClick={toggleModal} {...props} className={twMerge("flex gap-1", className)}>
        <MdPerson size={24} />
        Profile
      </ActionButton>
      <ProfileModal isOpen={isOpen} toggleModal={toggleModal} />
    </>


  )
    ;
}

