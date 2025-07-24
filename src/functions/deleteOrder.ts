import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { deleteOrder } from "../services/orderService";

export async function httpDeleteOrder(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const id = request.params.id;

    const success = deleteOrder(id);

    return {
        status: success ? 200 : 404,
        body: success ? "Orden cancelada" : "Orden no encontrada"
    };
}

app.http('deleteOrder', {
    methods: ['DELETE'],
    route: 'orders/{id}',
    authLevel: 'anonymous',
    handler: httpDeleteOrder
});
