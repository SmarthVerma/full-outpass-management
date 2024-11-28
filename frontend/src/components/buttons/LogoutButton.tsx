import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { ActionButton, ActionButtonProps } from './ActionButton';
import { MdLogout } from 'react-icons/md';
import { useApolloClient, useMutation } from '@apollo/client';
import { LOGOUT_USER } from '@/graphql/mutations/user.mutation';
import { GET_AUTHENTICATED_USER } from '@/graphql/queries/user.query';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { ClipLoader } from 'react-spinners';

export const LogoutButton = ({ className, ...props }: ActionButtonProps) => {
  const { toast } = useToast();
  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false);

  const client = useApolloClient();  // Get the Apollo Client instance
  const [logout, { loading }] = useMutation(LOGOUT_USER, {
    refetchQueries: [GET_AUTHENTICATED_USER],
    update() {
      client.cache.reset();  // Reset the cache
    },
    onCompleted: () => {
      setIsLoadingModalOpen(false); // Close the loading modal after success
    },
    onError: () => {
      setIsLoadingModalOpen(false); // Close the loading modal on error
    }
  });

  const handleLogout = async () => {
    setIsLoadingModalOpen(true); // Open the loading modal before making the request
    try {
      await logout();
    } catch (error: any) {
      toast({ title: error.message });
      setIsLoadingModalOpen(false); // Close on error
    }
  };

  return (
    <>
      {/* Logout Button */}
      <ActionButton
        {...props}
        disabled={loading}
        onClick={() => handleLogout()}
        className={twMerge('flex gap-1', className)}
      >
        <MdLogout size={24} />
        Logout
      </ActionButton>

      {/* Loading Dialog (Modal) */}
      <Dialog open={isLoadingModalOpen}>
        <DialogContent className="sm:max-w-[300px] h-[100px]">
          <DialogHeader className='flex flex-row items-center justify-center gap-2'>
            <ClipLoader size={20} color="#3498db" loading={true} />
            Logging out...

          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};