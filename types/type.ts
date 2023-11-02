import { Blog, User } from "@prisma/client";

export type SafeBlog = Omit<Blog, "createdAt"> & {
    createdAt: string,
};

export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
};