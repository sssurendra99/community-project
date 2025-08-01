import NextAuth from "next-auth"
import { PrismaAdapter } from  '@auth/prisma-adapter'
import { db } from "@/lib/db"
import authConfig from "@/auth.config"
import { getUserById } from "@/data/user"
import {UserRole} from '@prisma/client';
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation"
import { getAccountByUserId } from "./data/account"

declare module '@auth/core';

export const { 
    handlers,
    auth,
    signIn,
    signOut,
 } = NextAuth({
    pages:{
        signIn:'/login',
        error:'/error',
    },
    events:{
        async linkAccount({user}){
            await db.user.update({
                where:{id:user.id},
                data:{emailVerified:new Date()}
            })
        }
    },
    callbacks:{
        async signIn({user,account}){
            //allow OAuth without email verification
            if (account?.provider != "credentials") return true;
            
            const existingUser = await getUserById(user.id);

            //Prevent sign in without email verify
            if (!existingUser?.emailVerified) 
                return false;

            if (existingUser.isTwoFactorEnabled) {
                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

                if (!twoFactorConfirmation) return false;
                
                await db.twoFactorConfirmation.delete({
                    where: {id: twoFactorConfirmation.id}
                })
            }

            return true;
        },
        async session({token,session}){
            console.log(
                "Im called"
            )
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            if (token.role && session.user) {
                session.user.role = token.role as UserRole;
            } 
            if (session.user) {
                session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
            }           
            if (session.user) {
                session.user.name = token.name;
                session.user.email = token.email as string;
                session.user.isOAuth = token.isOAuth as boolean;
            }            
            return session;
        },
        async jwt({token}){
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);
            if (!existingUser) return token;

            const existingAccount = await getAccountByUserId(
                existingUser.id
            )

            token.isOAth = !!existingAccount;
            token.name = existingUser.name;
            token.email = existingUser.email;
            token.role = existingUser.role;
            token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
            return token;
        }
    },
    adapter:PrismaAdapter(db),
    session:{strategy:'jwt'},
    ...authConfig,
});


// import NextAuth from "next-auth"
// import GitHub from "next-auth/providers/github"
// import Google from "next-auth/providers/google"
 
// export const { auth, handlers } = NextAuth({
//   providers: [GitHub],
// })