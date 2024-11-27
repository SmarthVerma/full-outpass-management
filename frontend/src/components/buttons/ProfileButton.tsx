import { twMerge } from 'tailwind-merge';
import { ActionButton, ActionButtonProps } from './ActionButton';
import { MdPerson } from 'react-icons/md'; // Import profile-related icon

export const ProfileButton = ({ className, ...props }: ActionButtonProps) => (
  <ActionButton {...props} className={twMerge('flex gap-1', className)}>
    <MdPerson size={24} />
    Profile
  </ActionButton>
);