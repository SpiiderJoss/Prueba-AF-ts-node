import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { listAllOrders } from "../services/orderService";

export async function httpListAllOrders(
    request: HttpRequest,
    context: InvocationContext
): Promise<HttpResponseInit> {
    try {
        context.log("Listing all orders");

        const orders = listAllOrders();
        return {
            status: 200,
            jsonBody: orders
        };
    } catch (error) {
        context.error('Error al listar órdenes:', error);
        return {
            status: 500,
            body: "Error interno del servidor"
        };
    }
}

app.http('listAllOrders', {
    methods: ['GET'],
    route: 'orders',
    authLevel: 'anonymous',
    handler: httpListAllOrders
});
