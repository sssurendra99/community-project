import { db } from "@/lib/db";

export const getTwoFactorTokenByToken = async (token: string) => {
    try {
        const twoFactortoken = await db.twoFactorToken.findUnique({
            where: {token}
        });

        return twoFactortoken;
    } catch {
        return null;
    }
};
export const getTwoFactorTokenByEmail = async (
    email:string
) => {
    try {
        const twoFactortoken = await db.twoFactorToken.findFirst({
            where: {email}
        });

        return twoFactortoken;
    } catch {
        return null;
    }
};