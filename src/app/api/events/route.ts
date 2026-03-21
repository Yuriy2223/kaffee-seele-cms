import { connectDB } from '@/lib/mongodb';
import UpcomingEvent from '@/models/UpcomingEvent';
import { successResponse, handleApiError } from '@/lib/api-utils';

export async function GET() {
  try {
    await connectDB();
    const items = await UpcomingEvent.find({}).sort({ date: 1 });
    return successResponse(items);
  } catch (error) {
    return handleApiError(error);
  }
}
