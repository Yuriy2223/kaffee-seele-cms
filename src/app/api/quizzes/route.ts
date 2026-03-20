import { connectDB } from "@/lib/mongodb";
import CoffeeQuiz from "@/models/CoffeeQuiz";
import { successResponse, handleApiError } from "@/lib/api-utils";

export async function GET() {
    try {
        await connectDB();
        const items = await CoffeeQuiz.find({});
        return successResponse(items);
    } catch (error) {
        return handleApiError(error);
    }
}
