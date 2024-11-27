import { twMerge } from 'tailwind-merge'
import { ActionButton, ActionButtonProps } from './ActionButton'
import {MdLogout } from 'react-icons/md'
import { useApolloClient, useMutation } from '@apollo/client'
import { LOGOUT_USER } from '@/graphql/mutations/user.mutation'
import { GET_AUTHENTICATED_USER } from '@/graphql/queries/user.query'
import { useToast } from '@/hooks/use-toast'

export const LogoutButton = ({ className , ...props }: ActionButtonProps) => {
  const {toast} = useToast()

const client = useApolloClient();  // Get the Apollo Client instance
const [logout, { loading }] = useMutation(LOGOUT_USER, {
  refetchQueries: [GET_AUTHENTICATED_USER],
  update() {
    client.cache.reset();  // Reset the cache
  }
});

  const handleLogout = async () => {
    console.log('clicked on logout BUtton')
try {
      await logout()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
} catch (error: any) {
    toast({title: error.message})
}
  }
  return (

    <ActionButton {...props} disabled={loading} onClick={() => handleLogout()} className={twMerge('flex gap-1', className)} >
        <MdLogout size={24} />
        Logout
  </ActionButton>
  )

}
