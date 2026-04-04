import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

router.post('/shiprocket', async (req, res) => {
    const webhookData = req.body;

    // Verify webhook signature (security token)
    const token = req.headers['x-api-key'];
    if (token !== process.env.SHIPROCKET_WEBHOOK_SECRET) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        // Update your order with tracking info
        const { awb, order_id, current_status, scans } = webhookData;

        // Shiprocket order_id in webhook might be their internal ID or our order_id we passed
        // Based on snippet: Order.findOneAndUpdate({ shiprocketOrderId: order_id }, ...)

        await Order.findOneAndUpdate(
            { $or: [{ shiprocketOrderId: order_id }, { _id: order_id }] },
            {
                trackingStatus: current_status,
                trackingHistory: scans,
                awbNumber: awb
            }
        );

        res.status(200).send('OK');
    } catch (error) {
        console.error('Shiprocket Webhook Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
