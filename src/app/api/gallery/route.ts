import { connectDB } from "@/lib/mongodb";
import Gallery from "@/models/Gallery";
import { successResponse, handleApiError } from "@/lib/api-utils";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const items = await Gallery.find({}).sort({ createdAt: -1 }).lean();
        return successResponse(items);
    } catch (error) {
        return handleApiError(error);
    }
}
