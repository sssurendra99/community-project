import CredentialsProvider from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";
import bcrypt from 'bcryptjs';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google'; 
import Facebook from 'next-auth/providers/facebook';
import { NextAuthConfig } from "next-auth";

export default { providers: [
    Facebook({
        clientId: process.env.FACEBOOK_APP_ID,
        clientSecret:process.env.FACEBOOK_APP_SECRET, 
    }),
    Github({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret:process.env.GITHUB_CLIENT_SECRET, 
    }),
    Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET, 
    }),
    CredentialsProvider({
        async authorize(credentials){
            const validatedFields = LoginSchema.safeParse(credentials);
            if (validatedFields.success) {
                const{email,password} = validatedFields.data;

                const user = await getUserByEmail(email);
                if (!user || !user.password) return undefined;
                
                const passwordMatch = await bcrypt.compare(
                    password,
                    user.password,
                );

                if (passwordMatch) return user;
            }
        }
    })
] 

} satisfies NextAuthConfig;