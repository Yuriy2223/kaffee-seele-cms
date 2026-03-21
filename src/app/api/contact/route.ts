import { connectDB } from '@/lib/mongodb';
import ContactRequest from '@/models/ContactRequest';
import { contactRequestSchema } from '@/lib/schemas';
import {
  successResponse,
  errorResponse,
  validateBody,
  handleApiError,
} from '@/lib/api-utils';

export async function POST(request: Request) {
  try {
    await connectDB();

    const { data, error } = await validateBody(request, contactRequestSchema);
    if (error) return errorResponse(error, 400);

    const contactRequest = await ContactRequest.create(data);
    return successResponse(contactRequest, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
