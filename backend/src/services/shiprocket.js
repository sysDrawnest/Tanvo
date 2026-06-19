import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

let cachedToken = null;
let tokenExpiry = null;

export const getShiprocketToken = async () => {
    if (cachedToken && tokenExpiry && new Date() < tokenExpiry) {
        return cachedToken;
    }

    try {
        const email = process.env.SHIPROCKET_EMAIL;
        const password = process.env.SHIPROCKET_PASSWORD;

        if (!email || !password) {
            console.warn('Shiprocket credentials missing. Using dummy token.');
            cachedToken = 'dummy_token';
            tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);
            return cachedToken;
        }

        const response = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login', {
            email,
            password
        });

        if (response.data && response.data.token) {
            cachedToken = response.data.token;
            tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);
            return cachedToken;
        } else {
            throw new Error('Failed to obtain token from Shiprocket response');
        }
    } catch (error) {
        console.error('Shiprocket login failed:', error.response?.data || error.message);
        if (process.env.NODE_ENV !== 'production') {
            console.log('Falling back to dummy Shiprocket token in development.');
            return 'dummy_token';
        }
        throw error;
    }
};

export const createShiprocketOrder = async (order, user) => {
    try {
        const token = await getShiprocketToken();
        if (token === 'dummy_token') {
            console.log('Skipping Shiprocket order creation (using dummy token).');
            return { order_id: 'mock_shiprocket_id', shipment_id: 'mock_shipment_id' };
        }

        // Map order items
        const orderItems = order.orderItems.map((item) => ({
            name: item.name,
            sku: item.product.toString().slice(-8),
            units: item.quantity,
            selling_price: item.price,
            discount: 0,
            tax: 0,
            hsn: 5007
        }));

        const shiprocketOrderData = {
            order_id: order._id.toString(),
            order_date: new Date(order.createdAt).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
            pickup_location: process.env.SHIPROCKET_PICKUP_LOCATION || 'Primary',
            billing_customer_name: user.name.split(' ')[0] || 'Customer',
            billing_last_name: user.name.split(' ')[1] || 'Name',
            billing_address: order.shippingAddress.addressLine1,
            billing_address_2: order.shippingAddress.addressLine2 || '',
            billing_city: order.shippingAddress.city,
            billing_pincode: order.shippingAddress.pincode,
            billing_state: order.shippingAddress.state,
            billing_country: 'India',
            billing_email: user.email,
            billing_phone: order.shippingAddress.phone || user.phone,
            shipping_is_billing: true,
            order_items: orderItems,
            payment_method: order.paymentMethod === 'COD' ? 'COD' : 'Prepaid',
            sub_total: order.totalPrice,
            length: 20,
            breadth: 15,
            height: 5,
            weight: 0.5
        };

        const response = await axios.post(
            'https://apiv2.shiprocket.in/v1/external/orders/create/adhoc',
            shiprocketOrderData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error('Shiprocket Order Creation Error:', error.response?.data || error.message);
        if (process.env.NODE_ENV !== 'production') {
            return { order_id: 'mock_shiprocket_id', shipment_id: 'mock_shipment_id' };
        }
        throw error;
    }
};

export const checkServiceability = async (deliveryPincode, weight = 0.5) => {
    try {
        const token = await getShiprocketToken();
        if (token === 'dummy_token') {
            return { status: 'mocked', serviceable: true };
        }

        const response = await axios.get(
            'https://apiv2.shiprocket.in/v1/external/courier/serviceability',
            {
                params: {
                    pickup_postcode: process.env.SHIPROCKET_PICKUP_PINCODE || '751012',
                    delivery_postcode: deliveryPincode,
                    weight: weight,
                    cod: 1
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error('Shiprocket Serviceability Check Error:', error.response?.data || error.message);
        if (process.env.NODE_ENV !== 'production') {
            return { status: 'mocked', serviceable: true };
        }
        throw error;
    }
};

