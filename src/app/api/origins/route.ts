import { connectDB } from "@/lib/mongodb";
import CoffeeOrigin from "@/models/CoffeeOrigin";
import { successResponse, handleApiError } from "@/lib/api-utils";

export async function GET() {
    try {
        await connectDB();
        const items = await CoffeeOrigin.find({});
        return successResponse(items);
    } catch (error) {
        return handleApiError(error);
    }
}
