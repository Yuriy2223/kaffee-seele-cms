import { NextResponse } from 'next/server';
import { ValidationError } from 'yup';

export function successResponse(data: any, status = 200) {
  return NextResponse.json(data, { status });
}

export function errorResponse(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function validateBody(request: Request, schema: any) {
  try {
    const body = await request.json();
    const validatedData = await schema.validate(body, {
      abortEarly: false,
      stripUnknown: true,
    });
    return { data: validatedData, error: null };
  } catch (error) {
    if (error instanceof ValidationError) {
      return {
        data: null,
        error: error.errors.join(', '),
      };
    }
    return { data: null, error: (error as Error).message };
  }
}

export function handleApiError(error: any) {
  const message = error.message || 'An unexpected error occurred';
  const status = error.name === 'ValidationError' ? 400 : 500;
  return errorResponse(message, status);
}
