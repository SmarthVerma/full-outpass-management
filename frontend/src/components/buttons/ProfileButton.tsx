import { useState, useCallback } from "react";
import { twMerge } from "tailwind-merge";
import { ActionButton, ActionButtonProps } from "./ActionButton";
import { MdPerson } from "react-icons/md";
import { ProfileModal } from "../ProfileModal";
import { useAppSelector } from "@/redux/hooks";

export const ProfileButton = ({ className, ...props }: ActionButtonProps) => {
  const firstTimeLogin = useAppSelector(state => state.authUser.user?.firstTimeLogin ? true : false)
  const [isOpen, setIsOpen] = useState(firstTimeLogin);


  const toggleModal = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  return (
    <>
      <ActionButton onClick={toggleModal} {...props} className={twMerge("flex gap-1", className)}>
        <MdPerson size={24} />
        Profile
      </ActionButton>
      <ProfileModal firstTimeLogin={firstTimeLogin} isOpen={isOpen} toggleModal={toggleModal} />
    </>


  )
    ;
}

