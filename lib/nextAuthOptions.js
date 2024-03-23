import GoogleProvider from 'next-auth/providers/google';
import NextAuth from 'next-auth';
import { executeQuery } from './db';

export const nextAuthOptions = {

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async session({ session }) {
      // console.log('In Session Callback')
      if (!session ? .user) {
        // console.log('No Session User')
        return session
      } else {
        // store the user id from MySQl to Session
        const sessionUser = await executeQuery(`SELECT * FROM user WHERE email = '${session.user.email}'`);
        // console.log('In Session Callback: the session User', sessionUser)
        session.user.id = sessionUser[0].id.toString();
        // console.log('In Session Callback: The Session', session)
        return session;
      }
    },
    async signIn({ account, profile, user, credentials }) {
      // console.log('In Sign In Callback')
      try {
        // check if user already exists
        const userExists = await executeQuery(`SELECT * FROM user WHERE email = '${profile.email}'`);
        // console.log('In Sign In Callback: Get User', userExists)
        // if not, create a new document and save user in MongoDB
        if (!userExists[0]) {
          // console.log('In Sign In Callback: User Does Not Exists')
          let res = await executeQuery(`INSERT INTO user(email, firstName, lastName, image) VALUES('${profile.email}', '${profile?.given_name}', '${profile?.family_name}','${profile.picture}')`)
          // console.log('In Sign In Callback: Insert Into DB', res)
        }
        console.log(user)
        return true
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false
      }
    },
  }
}