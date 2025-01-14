"use client";
import React, { useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Textarea } from "../ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { Button } from "../ui/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Wrapper from "../wrapper/wrapper";

// zod schema for form validation
const userSchema = z.object({
  user_name: z.string().min(3).max(50),
  user_email: z.string().email(),
  message: z.string().min(10).max(500),
});

const Contact = () => {
  const ref: any = useRef();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  // onSubmit function to send email
  const onSubmit = (data: any) => {
    emailjs
      .sendForm(
        "service_r740fpu",
        "portofolio",
        ref.current,
        "9kAgROYSfFf9EA5Ey"
      )
      .then((result) => console.log("success"))
      .catch((error) => console.log("error"));
    reset();
    toast.success("Email sent successfully");
  };

  return (
    <>
      <h1 className="uppercase text-xl font-black md:text-2xl lg:text-4xl mb-2">
        Contact me
      </h1>
      <div className="bg-gradient-to-l from-neutral-950 from-50% to-white to-100% w-full h-2 mb-6" />
      <div className="flex justify-center" id="contact">
        <Wrapper className="flex flex-col gap-4 lg:flex-row lg:justify-between w-full">
          <form
            className="max-w-lg lg:max-w-2xl flex flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}
            ref={ref}
          >
            <div className="flex flex-col gap-3">
              <Label>Name</Label>
              <Input placeholder="Name" {...register("user_name")} />
              {errors.name && (
                <>
                  <span className="text-red-600">
                    {errors.name.message as React.ReactNode}
                  </span>
                </>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <Label>Email</Label>
              <Input placeholder="Email" {...register("user_email")} />
              {errors.email && (
                <>
                  <span className="text-red-600">
                    {errors.email.message as React.ReactNode}
                  </span>
                </>
              )}
            </div>
            <div className="flex flex-col gap-3 items-center my-5">
              <Label>Message</Label>
              <p>
                Please provide additional information that could help me
                evaluate this opportunity
              </p>
              <Textarea
                placeholder="Your Message"
                rows={10}
                {...register("message")}
              />
              {errors.message && (
                <>
                  <span className="text-red-600">
                    {errors.message.message as React.ReactNode}
                  </span>
                </>
              )}
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </div>
          </form>
          <div>
            <p>alxnbusiness1@gmail.com</p>
            <p>+49 1515 7491907</p>
          </div>
        </Wrapper>
      </div>
    </>
  );
};

export default Contact;
