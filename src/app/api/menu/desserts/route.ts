import { connectDB } from "@/lib/mongodb";
import DessertMenu from "@/models/DessertMenu";
import { successResponse, handleApiError } from "@/lib/api-utils";

export async function GET() {
    try {
        await connectDB();
        const items = await DessertMenu.find({});
        return successResponse(items);
    } catch (error) {
        return handleApiError(error);
    }
}
