import { auth } from "@/auth";

export const currentUser = async () => {
    const session = await auth();

    return session?.user;
};

//get user role as server component

export const currentRole = async () => {
    const session = await auth();

    return session?.user?.role;
};