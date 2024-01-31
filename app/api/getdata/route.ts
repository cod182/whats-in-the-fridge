// import { executeQuery } from '@/lib/db';
// import { NextResponse, NextApiResponse } from 'next/server';

// export
//   const GET = async (req, res) => {

//     try {
//       const response = await executeQuery('SELECT * FROM users');
//       res.status(200).json({ users: response });
//     } catch (error) {
//       console.error('Error fetching data from the database:', error);
//       res.status(404).json(error)
//     }

//   };


//connecting API endpoints to db
//route.js
import { NextRequest, NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from "next";

import { executeQuery } from '@/lib/db';

export const GET = async({req, params, res}:any) => {

    try{
      const query = 'SELECT * FROM items';
      const response = await executeQuery(query, []);

      return NextResponse.json(response);

    }catch (error:any) {
      return NextResponse.json({ message: error.message });

    }
}