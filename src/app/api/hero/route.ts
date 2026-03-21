import { connectDB } from '@/lib/mongodb';
import Hero from '@/models/Hero';
import { successResponse, handleApiError } from '@/lib/api-utils';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET() {
  try {
    await connectDB();
    const db = mongoose.connection.db;

    let heroData: any = await Hero.findOne({}).lean();

    if (!heroData && db) {
      heroData = await db.collection('heroes').findOne({});

      if (!heroData) {
        heroData = await db.collection('sitesettings').findOne({});
      }
    }

    if (!heroData) {
      return NextResponse.json(
        { error: 'Hero data not found in database' },
        { status: 404 }
      );
    }

    const raw = heroData as any;
    const mappedData = {
      _id: raw._id,
      firstLine: raw.firstLine || raw.heroFirstLine || '',
      secondLine: raw.secondLine || raw.heroSecondLine || '',
      subtitle: raw.subtitle || raw.heroSubtitle || '',
      backgroundImage: raw.backgroundImage || raw.heroBackgroundImage || '',
    };

    return successResponse(mappedData);
  } catch (error) {
    return handleApiError(error);
  }
}
