import { User } from '@prisma/client';
import { NextResponse } from 'next/server';

import prisma from '@/db';

export async function POST(request: Request) {
  const data = (await request.json()) as Pick<User, 'name'>;

  try {
    const res = await prisma.user.create({ data });

    return NextResponse.json({ data: res }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
