import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { signUpSchema } from "@/types and schemas/signupSchema";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import UserTypeSwitcher from "@/components/UserTypeSwitcher";
import { useMutation } from "@apollo/client";
import { SIGNUP_USER } from "@/graphql/mutations/user.mutation";
import { useToast } from "@/hooks/use-toast";
import { GET_AUTHENTICATED_USER } from "@/graphql/queries/user.query";
import { STUDENT_NOT_VERIFIED, USER_FACULTY } from "@/assets/constant";

export const Signup = () => {
    const { toast } = useToast()
    const [signup, { loading }] = useMutation(SIGNUP_USER, { refetchQueries: [GET_AUTHENTICATED_USER] })

    const navigate = useNavigate()
    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            gender: "MALE"
        }
    });
    const isFaculty = form.watch('userType') != USER_FACULTY


    const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
        try {
            console.log("Signup data:", data);
            if (data.confirmPassword !== data.password) throw "Password does not match"

            await signup({
                variables: {
                    input: {
                        email: data.email,
                        password: data.password,
                        gender: data.gender ? data.gender : "MALE",
                        userType: data.userType,
                        confirmPassword: data.confirmPassword
                    }
                }
            })
            toast({ title: "Successfully registered", variant: 'default' })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.message == STUDENT_NOT_VERIFIED) {
                navigate("/verify-your-acount")
            }
            form.reset()
            toast({ title: `${error.message}`, variant: "destructive" })
            console.error('Error:', error)
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6 sm:p-12">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="bg-white shadow-lg rounded-lg space-y-2 p-8 w-full max-w-md border border-gray-300"
                >
                    <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">Register</h2>

                    <UserTypeSwitcher name="userType" control={form.control} />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="space-y-0">
                                <FormLabel className="text-sm font-medium text-gray-700">Email</FormLabel>
                                <FormControl >
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

                    {isFaculty && (
                        <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                                <FormItem className="space-y-0">
                                    <FormLabel className="text-sm font-medium text-gray-700">Gender</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center gap-6 mt-2">
                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="radio"
                                                    value="MALE"
                                                    checked={field.value === "MALE"}
                                                    onChange={() => field.onChange("MALE")}
                                                    className="form-radio text-blue-600 focus:ring-blue-500"
                                                />
                                                <span className="text-gray-700">Male</span>
                                            </label>
                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="radio"
                                                    value="FEMALE"
                                                    checked={field.value === "FEMALE"}
                                                    onChange={() => field.onChange("FEMALE")}
                                                    className="form-radio text-pink-500 focus:ring-pink-400"
                                                />
                                                <span className="text-gray-700">Female</span>
                                            </label>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}

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

                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem className="space-y-0">
                                <FormLabel className="text-sm font-medium text-gray-700">Confirm Password</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="password"
                                        placeholder="Confirm your password"
                                        className="w-full border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                        disabled={loading}
                    >
                        {loading ? "Registering..." : "Register"}
                    </Button>

                    <p className="mt-4 text-center text-gray-600">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            Login
                        </Link>
                    </p>
                </form>
            </Form>
        </div>
    );
}