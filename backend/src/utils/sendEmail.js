import nodemailer from 'nodemailer';

/**
 * Send email using nodemailer
 * @param {Object} options - Email options
 * @param {string} options.email - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.message - Email message (text)
 * @param {string} options.html - Email HTML (optional)
 */
export const sendEmail = async (options) => {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: process.env.EMAIL_PORT || 587,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: `"Syssaree" <${process.env.EMAIL_USER}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: options.html || `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${options.subject}</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #C40C0C, #FF6500);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
              font-family: 'Georgia', serif;
            }
            .content {
              background: #fff;
              padding: 30px;
              border: 1px solid #eaeaea;
              border-top: none;
              border-radius: 0 0 10px 10px;
            }
            .button {
              display: inline-block;
              padding: 12px 30px;
              background: linear-gradient(135deg, #C40C0C, #FF6500);
              color: white;
              text-decoration: none;
              border-radius: 25px;
              font-weight: bold;
              margin: 20px 0;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #eaeaea;
              color: #999;
              font-size: 12px;
            }
            .social-links {
              margin: 20px 0;
            }
            .social-links a {
              display: inline-block;
              margin: 0 10px;
              color: #C40C0C;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✨ Syssaree ✨</h1>
              <p>Traditional Handloom Treasures</p>
            </div>
            <div class="content">
              ${options.message.replace(/\n/g, '<br>')}
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Syssaree. All rights reserved.</p>
              <p>Meher Weavers Cooperative, Bhubaneswar, Odisha</p>
              <div class="social-links">
                <a href="#">Instagram</a> |
                <a href="#">Facebook</a> |
                <a href="#">YouTube</a>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);
    
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Send welcome email to new user
 * @param {Object} user - User object
 */
export const sendWelcomeEmail = async (user) => {
  const message = `
    <h2>Welcome to Syssaree, ${user.name}! 🌸</h2>
    
    <p>Thank you for joining our community of handloom enthusiasts. We're thrilled to have you!</p>
    
    <p>At Syssaree, we connect you with:</p>
    <ul>
      <li>✨ Authentic Odisha handloom products</li>
      <li>🎨 Direct from master weavers</li>
      <li>🌟 Traditional designs with modern aesthetics</li>
      <li>💝 Exclusive member benefits</li>
    </ul>
    
    <p>Start exploring our collection:</p>
    <a href="${process.env.FRONTEND_URL}/shop" class="button">Shop Now</a>
    
    <p>Get 10% off your first order with code: <strong>WELCOME10</strong></p>
  `;

  return sendEmail({
    email: user.email,
    subject: 'Welcome to Syssaree - Traditional Handloom Treasures 🌸',
    message,
  });
};

/**
 * Send order confirmation email
 * @param {Object} order - Order object
 * @param {Object} user - User object
 */
export const sendOrderConfirmation = async (order, user) => {
  const itemsList = order.orderItems.map(item => 
    `• ${item.name} x ${item.quantity} - ₹${item.price * item.quantity}`
  ).join('<br>');

  const message = `
    <h2>Thank You for Your Order! 🎉</h2>
    
    <p>Hi ${user.name},</p>
    
    <p>Your order has been confirmed and is being prepared by our weavers.</p>
    
    <h3>Order Details:</h3>
    <p><strong>Order ID:</strong> #${order._id}</p>
    <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
    
    <h4>Items:</h4>
    ${itemsList}
    
    <h4>Order Summary:</h4>
    <p>Subtotal: ₹${order.itemsPrice}</p>
    <p>Shipping: ₹${order.shippingPrice}</p>
    <p>Tax: ₹${order.taxPrice}</p>
    <p><strong>Total: ₹${order.totalPrice}</strong></p>
    
    <h4>Shipping Address:</h4>
    <p>
      ${order.shippingAddress.addressLine1}<br>
      ${order.shippingAddress.addressLine2 ? order.shippingAddress.addressLine2 + '<br>' : ''}
      ${order.shippingAddress.city}, ${order.shippingAddress.state}<br>
      ${order.shippingAddress.pincode}<br>
      Phone: ${order.shippingAddress.phone}
    </p>
    
    <p>You can track your order status here:</p>
    <a href="${process.env.FRONTEND_URL}/order/${order._id}" class="button">Track Order</a>
  `;

  return sendEmail({
    email: user.email,
    subject: `Order Confirmed - #${order._id} - Syssaree`,
    message,
  });
};

/**
 * Send password reset email
 * @param {Object} user - User object
 * @param {string} resetToken - Password reset token
 */
export const sendPasswordResetEmail = async (user, resetToken) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  const message = `
    <h2>Reset Your Password 🔐</h2>
    
    <p>Hi ${user.name},</p>
    
    <p>We received a request to reset your password. Click the button below to proceed:</p>
    
    <a href="${resetUrl}" class="button">Reset Password</a>
    
    <p>This link will expire in 10 minutes.</p>
    
    <p>If you didn't request this, please ignore this email or contact support if you have concerns.</p>
    
    <p style="color: #999; font-size: 12px;">For security, please don't share this link with anyone.</p>
  `;

  return sendEmail({
    email: user.email,
    subject: 'Password Reset Request - Syssaree',
    message,
  });
};

/**
 * Send order status update email
 * @param {Object} order - Order object
 * @param {Object} user - User object
 */
export const sendOrderStatusUpdate = async (order, user) => {
  const statusMessages = {
    'Processing': 'Your order is now being processed by our team.',
    'Shipped': 'Great news! Your order has been shipped.',
    'Delivered': 'Your order has been delivered. We hope you love it!',
    'Cancelled': 'Your order has been cancelled as requested.'
  };

  const message = `
    <h2>Order Status Update 📦</h2>
    
    <p>Hi ${user.name},</p>
    
    <p>Your order <strong>#${order._id}</strong> status has been updated to: <strong>${order.orderStatus}</strong></p>
    
    <p>${statusMessages[order.orderStatus] || 'Your order status has been updated.'}</p>
    
    ${order.trackingNumber ? `
      <p><strong>Tracking Number:</strong> ${order.trackingNumber}</p>
    ` : ''}
    
    ${order.estimatedDelivery ? `
      <p><strong>Estimated Delivery:</strong> ${new Date(order.estimatedDelivery).toLocaleDateString()}</p>
    ` : ''}
    
    <a href="${process.env.FRONTEND_URL}/order/${order._id}" class="button">View Order Details</a>
  `;

  return sendEmail({
    email: user.email,
    subject: `Order ${order.orderStatus} - #${order._id} - Syssaree`,
    message,
  });
};

/**
 * Send low stock alert to admin
 * @param {Array} products - Low stock products
 */
export const sendLowStockAlert = async (products) => {
  const productList = products.map(p => 
    `• ${p.name} - Only ${p.stock} left!`
  ).join('<br>');

  const message = `
    <h2>⚠️ Low Stock Alert</h2>
    
    <p>The following products are running low on stock:</p>
    
    ${productList}
    
    <p>Please restock soon to avoid missing sales.</p>
    
    <a href="${process.env.FRONTEND_URL}/admin/products" class="button">Manage Inventory</a>
  `;

  return sendEmail({
    email: process.env.ADMIN_EMAIL,
    subject: 'Low Stock Alert - Syssaree',
    message,
  });
};

export default {
  sendEmail,
  sendWelcomeEmail,
  sendOrderConfirmation,
  sendPasswordResetEmail,
  sendOrderStatusUpdate,
  sendLowStockAlert
};