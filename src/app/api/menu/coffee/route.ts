import { connectDB } from "@/lib/mongodb";
import CoffeeMenu from "@/models/CoffeeMenu";
import { successResponse, handleApiError } from "@/lib/api-utils";

export async function GET() {
    try {
        await connectDB();
        const items = await CoffeeMenu.find({});
        return successResponse(items);
    } catch (error) {
        return handleApiError(error);
    }
}
