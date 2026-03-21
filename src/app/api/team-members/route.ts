import { connectDB } from '@/lib/mongodb';
import TeamMember from '@/models/TeamMember';
import { successResponse, handleApiError } from '@/lib/api-utils';

export async function GET() {
  try {
    await connectDB();
    const items = await TeamMember.find({});
    return successResponse(items);
  } catch (error) {
    return handleApiError(error);
  }
}
