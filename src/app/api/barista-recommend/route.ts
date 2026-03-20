
import { connectDB } from "@/lib/mongodb";
import BaristaRecommend from "@/models/BaristaRecommend";
import { successResponse, handleApiError } from "@/lib/api-utils";
import mongoose from "mongoose";

export async function GET() {
    try {
        await connectDB();

        const count = await BaristaRecommend.countDocuments();
        const items = await BaristaRecommend.find({}).sort({ createdAt: -1 }).limit(1);

        return successResponse({
            success: true,
            connectionState: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
            totalDocuments: count,
            latestItem: items[0] || null
        });
    } catch (error) {
        return handleApiError(error);
    }
}