import GoogleProvider from 'next-auth/providers/google';
import NextAuth from 'next-auth/next';
import { authOptions } from '@/utilities/authOptions';
import { executeQuery } from '../../../../lib/db';

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }