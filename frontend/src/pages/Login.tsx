/* eslint-disable @typescript-eslint/no-explicit-any */

import { useNavigate, Link } from "react-router-dom";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/schemas/loginSchema";
import UserTypeSwitcher from "@/components/UserTypeSwitcher";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "@/graphql/mutations/user.mutation";
import { FACULTY_NOT_VERIFIED, USER_NOT_FOUND } from "@/assets/constant";
import { NotFound } from "./NotFound";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { GET_AUTHENTICATED_USER } from "@/graphql/queries/user.query";


export const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast()
  // React Hook Form setup
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });
  const [login, { loading, error }] = useMutation(LOGIN_USER, { refetchQueries: [GET_AUTHENTICATED_USER] })

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    console.log('this is the data', data)
    try {
      await login({ variables: { input: data } })
      navigate('/')
    } catch (error: any) {
      console.error("Some error occured", error)
      toast({ title: `${error.message}`, variant: 'destructive' })
    }
  };

  if (error?.message == USER_NOT_FOUND) return <NotFound userType={form.watch('userType')} />
  if (error?.message == FACULTY_NOT_VERIFIED) return <h1>${error.message}</h1>

  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent p-6 sm:p-12">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-white shadow-lg space-y-2 rounded-lg p-8 w-full max-w-md border border-gray-300"
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">Login</h2>

          <UserTypeSwitcher name="userType" control={form.control} />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel className="text-sm font-medium text-gray-700">Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter your email"
                    className="w-full border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel className="text-sm font-medium text-gray-700">Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Enter your password"
                    className="w-full border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            {loading ? "Logging In..." : "Login"}
          </Button>

          <p className="mt-4 text-center text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};