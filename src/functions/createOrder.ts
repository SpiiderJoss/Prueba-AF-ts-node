import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { OrderSchema } from "../models/order";
import { createOrder } from "../services/orderService";

export async function httpCreateOrder(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Processing order creation request at "${request.url}"`);

    try {
        const body = await request.json();
        const parseResult = OrderSchema.safeParse(body);

        if (!parseResult.success) {
            const errors = parseResult.error.issues.map(e => {
                const path = Array.isArray(e.path) && e.path.length > 0 ? e.path.join('.') : 'unknown';
                return `${path}: ${e.message}`;
            });

            return {
                status: 400,
                jsonBody: { errors }
            };
        }

        const orderId = await createOrder(parseResult.data);

        return {
            status: 201,
            jsonBody: { orderId }
        };

    } catch (err) {
        context.error("Internal server error:", err);
        return {
            status: 500,
            body: "Error interno"
        };
    }
}


app.http('createOrder', {
    methods: ['POST'],
    route: 'orders',
    authLevel: 'anonymous',
    handler: httpCreateOrder
});