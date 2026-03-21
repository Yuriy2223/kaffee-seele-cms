import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Contacts from '@/models/Contacts';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    const contacts = await Contacts.findOne();

    if (!contacts) {
      return NextResponse.json(
        { message: 'Contacts data not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: contacts });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}
