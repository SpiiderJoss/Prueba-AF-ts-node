import { Order } from "../models/order";
import { v4 as uuidv4 } from "uuid";

type OrderStatus = "active" | "cancelled";

interface OrderStored extends Order {
    id: string;
    status: OrderStatus;
    createdAt: Date;
}

class OrderService {
    private orders: Record<string, OrderStored> = {};

    createOrder(order: Order): string {
        const id = `order-${uuidv4()}`;
        this.orders[id] = { 
            ...order, 
            id, 
            status: "active",
            createdAt: new Date()
        };
        console.log(`Order created: ${id}`);
        return id;
    }

    getOrder(id: string): Promise<OrderStored | undefined> {
    return new Promise((resolve) => {
        const order = this.orders[id];
        if (order) {
            console.log(`Order recuperado: ${id}`);
            resolve(order);
        } else {
            console.log(`Order no encontrado: ${id}`);
            resolve(undefined);
        }
    });
}

    deleteOrder(id: string): boolean {
        const order = this.orders[id];
        if (order && order.status === "active") {
            order.status = "cancelled";
            console.log(`Order cancelled: ${id}`);
            return true;
        }
        console.log(`Order cancellation failed: ${id}`);
        return false;
    }
    listAllOrders(): OrderStored[] {
        return Object.values(this.orders);
    }
}

const orderService = new OrderService();

export const createOrder = (order: Order) => orderService.createOrder(order);
export const getOrder = (id: string) => orderService.getOrder(id);
export const deleteOrder = (id: string) => orderService.deleteOrder(id);
export const listAllOrders = () => orderService.listAllOrders();


if (process.env.NODE_ENV === 'development') {
    global.debugOrders = () => console.log(orderService.listAllOrders());
}