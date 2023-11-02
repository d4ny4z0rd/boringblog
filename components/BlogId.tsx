"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import ImageUpload from "./ImageUpload";
import { toast } from "react-hot-toast";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface BlogProps {
	name?: string;
	description?: string;
	imageSrc?: any;
	blogId?: string;
}

interface InitalStateProps {
	name: string;
	description: string;
	imageSrc: string;
}

const initialState: InitalStateProps = {
	name: "",
	description: "",
	imageSrc: "",
};

export default function BlogId({
	name,
	description,
	imageSrc,
	blogId,
}: BlogProps) {
	const router = useRouter();
	const [onActive, setOnActive] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const [state, setState] = useState(initialState);

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		setState({ ...state, [event.target.name]: event.target.value });
	}

	function handleChangeTextArea(event: ChangeEvent<HTMLTextAreaElement>) {
		setState({ ...state, [event.target.name]: event.target.value });
	}

	const onSubmit = (event: FormEvent) => {
		setIsLoading(true);

		event.preventDefault();
		axios
			.put(`/api/blogs/${blogId}`, state)
			.then(() => {
				toast.success("Updated Successfully");
				router.refresh();
				router.push("/");
			})

			.catch((err) => {
				throw new Error(err);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const onDelete = (event: FormEvent) => {
		setIsLoading(true);

		event.preventDefault();
		axios
			.delete(`/api/blogs/${blogId}`)
			.then(() => {
				toast.success("Updated Successfully");
				router.refresh();
				router.push("/");
			})

			.catch((err) => {
				throw new Error(err);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const setCustomValue = (id: any, value: any) => {
		setState((prevValues) => ({
			...prevValues,
			[id]: value,
		}));
	};

	return (
		<div className=" w-full mx-auto py-16 px-12 flex flex-col gap-4">
			<div className="flex flex-col mb-4">
				<span className="text-4xl font-semibold text-center">{name}</span>
			</div>
			<div>
				<span className="text-lg my-10">{description}</span>
			</div>

			<div className="flex justify-center my-10">
				<Image
					src={imageSrc}
					width={400}
					height={400}
					alt="Image"
					className="rounded-md"
				/>
			</div>

			<div className="flex justify-center gap-2">
				<Button onClick={() => setOnActive(!onActive)} className="uppercase">
					edit
				</Button>
				<Button
					variant={"destructive"}
					disabled={isLoading}
					className="uppercase"
					onClick={onDelete}>
					Delete
				</Button>
			</div>

			{onActive && (
				<form onSubmit={onSubmit}>
					<div>
						<ImageUpload
							value={state.imageSrc}
							onChange={(value) => setCustomValue("imageSrc", value)}
						/>
					</div>
					<div className="flex flex-col gap-2 my-4">
						<Input
							placeholder="Blog header"
							id="name"
							type="text"
							value={state.name}
							name="name"
							onChange={handleChange}
						/>
						<Textarea
							placeholder="Blog content or description"
							id="description"
							value={state.description}
							name="description"
							onChange={handleChangeTextArea}
						/>
						<Button type="submit" disabled={isLoading}>
							Create as new
						</Button>
					</div>
				</form>
			)}
		</div>
	);
}
