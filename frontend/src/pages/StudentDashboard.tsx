import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createOutpassSchema } from "@/schemas/createOutpassSchema";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@apollo/client";
import { CREATE_OUTPASS } from "@/graphql/mutations/outpass.mutation";
import { useAppSelector } from "@/redux/hooks";
import { formatHostel } from "@/lib/formatHostelString";
import { OtpModal } from "@/components/OtpModal";

export const StudentDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const name = useAppSelector(state => state.authUser.user?.name)

  const { hostel } = useParams();
  const hostelName = formatHostel(hostel);
  const form = useForm<z.infer<typeof createOutpassSchema>>({
    resolver: zodResolver(createOutpassSchema),
    defaultValues: {
      name,
      dateFrom: new Date().toISOString().split("T")[0], // Set default to today's date
      dateTo: "",
      contactNumber: "",
      reason: "",
      block_or_building: "A",
    },
  });

  const [createOutpass, { loading }] = useMutation(CREATE_OUTPASS);
  const userId = useAppSelector((state) => state.authUser.user?.id);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false); // State for OTP modal
  const [outpassId, setOutpassId] = useState("")

  const onSubmit = async (data: z.infer<typeof createOutpassSchema>) => {
    try {
      const dateFrom = new Date(data.dateFrom).toISOString();
      const dateTo = new Date(data.dateTo).toISOString();
      const roomNo = Number(data.roomNo)
      console.log('this is the type', typeof (roomNo))

      console.log({ data, dateFrom })
      const response = await createOutpass({
        variables: {
          input: {
            name: data.name,
            dateFrom,
            dateTo,
            roomNo,
            contactNumber: data.contactNumber,
            reason: data.reason,
            block_or_building: data.block_or_building,
            userId: userId,
            hostelName,
          },
        },
      });

      console.log('this is data', response.data.createOutpass.id)
      setOutpassId(response.data.createOutpass.id)

      toast({
        title: "Outpass request submitted successfully!",
        description:
          "An email will be sent to the respective warden, and you will be notified once the outpass is confirmed.",
        variant: "default",
      });

      // reset the form
      form.reset()
      // Open OTP modal after successful submission
      setIsOtpModalOpen(true);
    } catch (error: any) {
      console.error("Error submitting outpass request:", error);
      toast({
        title: "Failed to submit the request",
        description: `${error.message}`,
        variant: "destructive",
      });
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-white border border-blue-400/20 shadow-md rounded-lg p-8 w-full max-w-lg"
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Student Dashboard
          </h2>
          <p className="text-center text-gray-600 mb-4">
            Welcome! Here you can request and manage your outpasses.
          </p>

          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Student Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your full name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date From */}
          <FormField
            control={form.control}
            name="dateFrom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date From</FormLabel>
                <FormControl>
                  <Input {...field} type="date" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date To */}
          <FormField
            control={form.control}
            name="dateTo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date To</FormLabel>
                <FormControl>
                  <Input {...field} type="date" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Hostel Number */}
          <FormField
            control={form.control}
            name="roomNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room Number</FormLabel>
                <FormControl>
                  <Input {...field} type="number" placeholder="Enter your Room number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Contact Number */}
          <FormField
            control={form.control}
            name="contactNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Number</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your 10-digit contact number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Reason */}
          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reason for Outpass</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter the reason for your outpass" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Block */}
          <FormField
            control={form.control}
            name="block_or_building"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Block/Building</FormLabel>
                <FormControl>
                  <select {...field} className="border border-gray-300 p-2 w-full rounded">
                    <option value="">Select Block</option>
                    {["A", "B", "C", "D", "H1", "H2", "H3", "H4", "H5", "H6"].map((block) => (
                      <option key={block} value={block}>
                        {block}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" disabled={loading} className="w-full mt-4">
            Submit Request
          </Button>

          <Button
            onClick={() => navigate("/home")}
            variant="outline"
            className="w-full mt-4"
            type="button"
          >
            Back to Home
          </Button>
        </form>
      </Form>

      {/* OTP Modal */}
      <OtpModal setIsOtpModalOpen={setIsOtpModalOpen} outpassId={outpassId} isOtpModalOpen={isOtpModalOpen} />
    </div>
  );
};