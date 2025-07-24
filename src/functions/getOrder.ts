import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { getOrder } from "../services/orderService";

export async function httpGetOrder(
    request: HttpRequest,
    context: InvocationContext
): Promise<HttpResponseInit> {
    try {
        const id = request.params.id;
        context.log(`Fetching order with ID: ${id}`);

        const order = await getOrder(id); // Asegúrate que getOrder sea async
        if (!order) {
            return { status: 404, body: "Orden no encontrada" };
        }

        return { 
            status: 200,
            jsonBody: order 
        };
    } catch (error) {
        context.error('Error al obtener orden:', error);
        return { 
            status: 500,
            body: "Error interno del servidor" 
        };
    }
}

app.http('getOrder', {
    methods: ['GET'],
    route: 'orders/{id}',
    authLevel: 'anonymous',
    handler: httpGetOrder
});