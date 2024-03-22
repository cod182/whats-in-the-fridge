import GoogleProvider from 'next-auth/providers/google';
import { NextAuthOptions } from "next-auth";
import { executeQuery } from "@/lib/db";

export const authOptions = {

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async session({ session }) {

      if (!session.user) {
        console.log('No Session User')
        return session
      } else {
        // store the user id from MySQl to Session
        const sessionUser = await executeQuery(`SELECT * FROM user WHERE email = '${session.user.email}'`);
        session.user.id = sessionUser[0].id.toString();
        return session;
      }
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        // check if user already exists
        const userExists = await executeQuery(`SELECT * FROM user WHERE email = '${profile.email}'`);

        // if not, create a new document and save user in MongoDB
        if (!userExists[0]) {
          await executeQuery(`INSERT INTO user(email, firstName, lastName, image) VALUES('${profile.email}', '${profile?.given_name}', '${profile?.family_name}','${profile.picture}')`)
        }
        return true
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false
      }
    },
  }
};