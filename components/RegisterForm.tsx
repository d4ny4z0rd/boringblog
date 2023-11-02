"use client";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
	name: z.string().min(1, "Username is required").max(100),
	email: z.string().min(1, "Email is required").email("Invalid email"),
	password: z
		.string()
		.min(1, "Password is required")
		.min(8, "Password must have than 8 characters"),
});

const RegisterForm = () => {
	const router = useRouter();
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const onSubmit = (values: z.infer<typeof FormSchema>) => {
		event?.preventDefault();

		axios
			.post("/api/register", values)
			.then(() => {
				router.refresh();
			})
			.then(() => {
				setTimeout(() => {
					router.push("/login");
				}, 2500);
			})
			.catch((err: any) => {});
	};

	return (
		<div className="flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2 lg:mt-20 md:mt-20">
			<div className="text-center my-10">
				<h1 className="text-2xl font-semibold">boringblog</h1>
			</div>
			<div>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
						<div className="space-y-2">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-md">Full Name</FormLabel>
										<FormControl>
											<Input {...field} className="text-md" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-md">Email</FormLabel>
										<FormControl>
											<Input {...field} className="text-md" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-md">Password</FormLabel>
										<FormControl>
											<Input type="password" {...field} className="text-md" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<Button className="w-full mt-6 text-md" type="submit">
							Create your account
						</Button>
					</form>
					<p className="text-center text-md text-gray-600 mt-8">
						Already have an account?
						<Link className="hover:underline ml-2" href="/login">
							Sign in
						</Link>
					</p>
				</Form>
			</div>
		</div>
	);
};

export default RegisterForm;
