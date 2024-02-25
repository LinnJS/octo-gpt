export const dynamic = 'force-dynamic'; // defaults to auto

import { NextRequest, NextResponse } from 'next/server';

import { getDraftTasks } from '@/app/dashboard/actions';

// export async function GET(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const data = await getDraftTasks();
//     console.log('data: ', data);
//     res.status(200).json(data);
//   } catch (error) {
//     console.error('Error fetching draft tasks:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// }

export async function GET() {
  const data = await getDraftTasks();

  return NextResponse.json({ data });
}
