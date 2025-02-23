'use server'

import *as z from 'zod';

import { db } from '@/lib/db';
import { SettingsShema } from '@/schemas';
import { getUserByEmail, getUserById } from '@/data/user';
import { currentUser } from '@/lib/auth';
import { generateTwoFactorToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';
import bcrypt from 'bcryptjs';

export const settings = async(
    values: z.infer<typeof SettingsShema>
) => {
    const user = await currentUser();

    if (!user) {
        return{error: "Unauthorized"}
    }

    const dbUser = await getUserById(user.id);

    if (!dbUser) {
        return{error: "Unauthorized"}
    }
    if (user.isOAuth) {
        values.email = undefined;
        values.password = undefined;
        values.newPassword = undefined;
        values.isTwoFactorEnabled = undefined;
    }

    //prevent updating the email to already existing email
    if (values.email && values.email !== user.email) {
        const existingUser = await getUserByEmail(values.email);

        if (existingUser && existingUser.id !== user.id) {
            return{error: "Email already in use"}
        }
        //verify through new token(create new token)
        const verificationToken = await generateTwoFactorToken(
            values.email
        )
        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token,
        );
        return{ success: "Verification token sent"}
    };

    if (values.password && values.newPassword && dbUser.password) {
        const passwordMatch = await bcrypt.compare(
        values.password,
        dbUser.password,
    );
    if(!passwordMatch){
        return{error: "Incorrect password!"}
    }

    const hashedPassword = await bcrypt.hash(
        values.newPassword,
        10,
    );
    values.password = hashedPassword;
    values.newPassword = undefined;
}

    await db.user.update({
        where:{id: dbUser.id},
        data: {
            ...values
        }
    })
    return{success: "Settings updated"}
}

