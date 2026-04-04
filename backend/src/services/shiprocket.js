// import shiprocketModule from "shiprocket-sdk";
// const { Shiprocket } = shiprocketModule;
import dotenv from 'dotenv';

dotenv.config();

// Mock Shiprocket for now as the SDK is broken
const ShiprocketMock = {
    auth: {
        generateToken: async () => ({ token: 'mock_token' })
    },
    orders: {
        create: async (data) => ({ status: 'success', message: 'Order created (MOCKED)', data })
    },
    courier: {
        serviceability: async (data) => ({ status: 'success', message: 'Serviceable (MOCKED)', data })
    }
};

let shiprocketInstance = ShiprocketMock;
let tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

export const getShiprocketClient = async () => {
    return shiprocketInstance;
};

export const createShiprocketOrder = async (order, user) => {
    try {
        const client = await getShiprocketClient();

        // Map order items
        const orderItems = order.orderItems.map((item) => ({
            name: item.name,
            sku: item.product.toString().slice(-8),
            units: item.quantity,
            selling_price: item.price,
            weight: 0.5,
        }));

        const shiprocketOrderData = {
            order_id: order._id.toString(),
            order_date: new Date(order.createdAt).toISOString().split('T')[0],
            pickup_location: process.env.SHIPROCKET_PICKUP_LOCATION || "Primary",
            billing_customer_name: user.name,
            billing_last_name: "",
            billing_address: order.shippingAddress.addressLine1,
            billing_address_2: order.shippingAddress.addressLine2 || "",
            billing_city: order.shippingAddress.city,
            billing_pincode: order.shippingAddress.pincode,
            billing_state: order.shippingAddress.state,
            billing_country: "India",
            billing_email: user.email,
            billing_phone: order.shippingAddress.phone || user.phone,
            shipping_is_billing: true,
            order_items: orderItems,
            payment_method: order.paymentMethod === 'COD' ? 'Postpaid' : 'Prepaid',
            sub_total: order.totalPrice,
            length: 20,
            breadth: 15,
            height: 5,
            weight: 0.5
        };

        const response = await client.orders.create(shiprocketOrderData);
        return response;
    } catch (error) {
        console.error('Shiprocket Order Creation Error:', error);
        throw error;
    }
};

export const checkServiceability = async (deliveryPincode, weight = 0.5) => {
    try {
        const client = await getShiprocketClient();

        const response = await client.courier.serviceability({
            pickup_postcode: process.env.SHIPROCKET_PICKUP_PINCODE || "751012",
            delivery_postcode: deliveryPincode,
            weight: weight,
            cod: 1
        });

        return response;
    } catch (error) {
        console.error('Shiprocket Serviceability Check Error:', error);
        throw error;
    }
};

