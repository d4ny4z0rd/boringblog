"use client";

import Image from "next/image";
import { SafeBlog, SafeUser } from "@/types/type";
import axios from "axios";
import { useRouter } from "next/navigation";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BsFillPencilFill } from "react-icons/bs";

interface BlogProps {
	key: string;
	data: SafeBlog;
	currentUser?: SafeUser | null;
}

export default function SingleBlog({ key, data, currentUser }: BlogProps) {
	const router = useRouter();

	const onLike = () => {
		axios
			.post(`/api/like/${data.id}`)
			.then(() => {
				router.refresh();
			})
			.catch((error) => {})
			.finally(() => {});
	};

	const onDelete = () => {
		axios
			.delete(`/api/blogs/${data.id}`)
			.then(() => {
				router.refresh();
			})
			.catch((error) => {})
			.finally(() => {});
	};

	return (
		<div className="my-4  p-4 w-full">
			<div className="">
				<div className="">
					<div className=" flex justify-center">
						<Image
							width={400}
							className="w-[500px] object-contain rounded-md"
							height={300}
							src={data.imageSrc}
							alt="Blog Image"
						/>
					</div>
					<div className="">
						<h1 className="text-2xl font-semibold my-2 mt-4">{data.name}</h1>
						<p className="text-lg">{data.description}</p>
					</div>
				</div>
			</div>
			{data.userId === currentUser?.id && (
				<div className="flex items-center gap-10 mt-8">
					<RiDeleteBin5Line
						onClick={onDelete}
						className=" cursor-pointer text-[1.5rem]"
					/>
					<BsFillPencilFill
						onClick={() => router.push(`/blogs/${data.id}`)}
						className=" cursor-pointer text-[1.2rem]"
					/>
					{/* <button className="bg-red-400 px-6 py-2" onClick={onDelete}>Delete</button> */}
					{/* <button className="bg-yellow-400 px-6 py-2" onClick={() => router.push(`/blogs/${data.id}`)}>Edit</button> */}
				</div>
			)}
		</div>
	);
}
