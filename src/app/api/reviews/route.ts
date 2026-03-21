export const dynamic = 'force-dynamic';
import { connectDB } from '@/lib/mongodb';
import Review from '@/models/Review';
import { reviewSchema } from '@/lib/schemas';
import {
  successResponse,
  errorResponse,
  validateBody,
  handleApiError,
} from '@/lib/api-utils';

export async function GET() {
  try {
    await connectDB();
    const items = await Review.find({}).sort({ createdAt: -1 });
    return successResponse(items);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const { data, error } = await validateBody(request, reviewSchema);
    if (error) return errorResponse(error, 400);

    const item = await Review.create(data);
    return successResponse(item, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
