"use client";
import ImageUpload from "@/components/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-hot-toast";

interface InitalStateProps {
	name?: string;
	imageSrc: string;
	description: string;
}

const initialState: InitalStateProps = {
	name: "",
	imageSrc: "",
	description: "",
};

const Page = () => {
	const [state, setState] = useState(initialState);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const onSubmit = (event: FormEvent) => {
		setIsLoading(true);
		event.preventDefault();
		axios
			.post("/api/blogs", state)
			.then(() => {
				toast.success("Created successfully");
				router.refresh();
				router.push("/");
			})
			.catch(() => {
				toast.error("Went wrong");
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	function handleChangeInput(event: ChangeEvent<HTMLInputElement>) {
		setState({ ...state, [event.target.name]: event.target.value });
	}

	function handleChangeTextArea(event: ChangeEvent<HTMLTextAreaElement>) {
		setState({ ...state, [event.target.name]: event.target.value });
	}

	const setCustomValue = (id: any, value: any) => {
		setState((prevValues) => ({
			...prevValues,
			[id]: value,
		}));
	};

	return (
		<div className="">
			<div className=" text-center">
				<h1 className="text-4xl">Post what&apos;s on your mind</h1>
			</div>
			<form onSubmit={onSubmit} className=" mx-auto py-12">
				<div>
					<ImageUpload
						value={state.imageSrc}
						onChange={(value) => setCustomValue("imageSrc", value)}
					/>
				</div>

				<div className="flex flex-col justify-center mx-auto mt-4 gap-2">
					<Input
						placeholder="Blog header"
						id="name"
						type="text"
						value={state.name}
						name="name"
						onChange={handleChangeInput}
					/>
					<Textarea
						placeholder="Blog content or description"
						id="description"
						value={state.description}
						name="description"
						onChange={handleChangeTextArea}
					/>
					<div></div>
					<Button type="submit" disabled={isLoading}>
						Create
					</Button>
				</div>
			</form>
		</div>
	);
};

export default Page;
