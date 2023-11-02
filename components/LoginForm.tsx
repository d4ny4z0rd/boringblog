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
import React, { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

interface InitialStateProps {
	name: string;
	email: string;
	password: string;
}

const initialState: InitialStateProps = {
	name: "",
	email: "",
	password: "",
};

const LoginForm = () => {
	const router = useRouter();
	const [state, setState] = useState(initialState);

	const onSubmit = (event: FormEvent) => {
		event.preventDefault();

		signIn("credentials", {
			...state,
			redirect: false,
		}).then((callback) => {
			if (callback?.ok) {
				router.refresh();
				router.push("/");
			}

			if (callback?.error) {
				throw new Error("Wrong Credentials");
			}
		});
	};

	function handleChange(event: any) {
		setState({ ...state, [event.target.name]: event.target.value });
	}

	return (
		<div className="flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2 lg:mt-20 md:mt-20">
			<div className="text-center my-10">
				<h1 className="text-2xl font-semibold">boringblog</h1>
			</div>
			<form onSubmit={onSubmit} className="text-center">
				<div className="flex flex-col gap-2">
					<Label className="text-md text-left">Email</Label>
					<Input
						className="text-md"
						id="email"
						type="email"
						name="email"
						onChange={handleChange}
						value={state.email}
					/>
					<Label className="text-md text-left">Password</Label>
					<Input
						className="text-md"
						id="password"
						type="password"
						name="password"
						onChange={handleChange}
						value={state.password}
					/>
					<Button className="w-full mt-6 text-md" type="submit">
						Continue
					</Button>
					<p className="text-center text-md text-gray-600 mt-8">
						No account?
						<Link className="hover:underline ml-2" href="/register">
							Create one
						</Link>
					</p>
				</div>
			</form>
		</div>
	);
};

export default LoginForm;
