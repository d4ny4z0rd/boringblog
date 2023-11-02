"use client";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { SafeUser } from "@/types/type";
import { signOut } from "next-auth/react";

interface UserMenuProps {
	currentUser: SafeUser | null;
}

const Navbar = ({ currentUser }: UserMenuProps) => {
	console.log(currentUser);

	return (
		<header>
			<nav className="flex justify-between px-4 py-6 container">
				<div className="">
					<Link href={"/"} className="text-4xl font-semibold">
						boringblog
					</Link>
				</div>

				<div className="flex md:gap-20 lg:gap-20 gap-10">
					{currentUser ? (
						<>
							<div className="">
								<Button variant={"outline"}>
									<Link href="/create" className="text-lg">
										Create
									</Link>
								</Button>
							</div>
							<div className="text-lg pt-1.5">{currentUser?.name}</div>
							<div className="">
								<Button onClick={() => signOut()} className="text-md">
									Sign out
								</Button>
							</div>
						</>
					) : (
						<div className="">
							<div>
								<Button>
									<Link href={"/login"} className="text-lg">
										Sign in
									</Link>
								</Button>
							</div>
						</div>
					)}
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
