import { connectDB } from '@/lib/mongodb';
import About from '@/models/About';
import { successResponse, handleApiError } from '@/lib/api-utils';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET() {
  try {
    await connectDB();
    const db = mongoose.connection.db;

    let aboutData: any = await About.findOne({}).lean();

    if (!aboutData && db) {
      aboutData = await db.collection('abouts').findOne({});

      if (!aboutData) {
        aboutData = await db.collection('sitesettings').findOne({});
      }
    }

    if (!aboutData) {
      return NextResponse.json(
        { error: 'About data not found in database' },
        { status: 404 }
      );
    }

    return successResponse(aboutData);
  } catch (error) {
    return handleApiError(error);
  }
}
