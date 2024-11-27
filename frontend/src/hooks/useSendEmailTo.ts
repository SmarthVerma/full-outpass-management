import { SEND_EMAIL_TO } from '@/graphql/mutations/user.mutation';
import { useAppSelector } from '@/redux/hooks';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { useToast } from './use-toast';

// Custom Hook to send emails
export const useSendEmailTo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {toast} = useToast()
  // Selector to get the sender's email from Redux state
  const sendFrom = useAppSelector(state => state.authUser.user?.email);

  // Apollo mutation hook
  const [sendMailMutation] = useMutation(SEND_EMAIL_TO);

  const sendEmail = async (emailMessage: string, sendTo: string) => {
    if (!sendFrom) {
      setError('Sender email is not available');
      return;
    }

    setLoading(true);
    console.log('Inside custom hook');
    try {
      console.log({ emailMessage, sendFrom, sendTo });

      await sendMailMutation({
        variables: {
          input: {
            sendTo,
            sendFrom,
            message: emailMessage,
          },
        },
      });

      alert('Success in send')

      console.log('Email sent successfully');
    } catch (err: any) {
      if(err.message == "Cannot return null for non-nullable field EmailResponse.sucess.") {
        toast({ title: `Successfully message sent to mail ${sendTo}`, variant: "destructive" })

      }
      console.error('Error sending email:', err.message);
      setError('Failed to send email');
    } finally {
      setLoading(false);
    }
  };

  return { sendEmail, loading, error };
};