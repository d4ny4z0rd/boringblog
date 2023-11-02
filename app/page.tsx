import Image from "next/image";
import getCurrentUser from "./actions/getCurrentUser";
import getBlogs, { IBlogParams } from "./actions/getBlogs";
import SingleBlog from "@/components/SingleBlog";

interface HomeProps {
	searchParams: IBlogParams;
}

export default async function Home({ searchParams }: HomeProps) {
	const currentUser = await getCurrentUser();
	const blogs = await getBlogs(searchParams);

	return (
		<div>
			{blogs.map((item: any) => (
				<SingleBlog key={item.id} data={item} currentUser={currentUser} />
			))}
		</div>
	);
}
