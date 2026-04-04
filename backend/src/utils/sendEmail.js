import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

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
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"TANVO Heritage" <${process.env.EMAIL_USER}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: options.html,
    };

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
 */
export const sendWelcomeEmail = async (user) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 20px auto; border: 1px solid #c9a84c; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #1a362d, #2d5a4c); color: #fdfbf7; padding: 40px 20px; text-align: center; }
        .header h1 { margin: 0; font-family: 'Playfair Display', serif; letter-spacing: 4px; font-size: 32px; }
        .content { padding: 40px; background-color: #fdfbf7; }
        .footer { background: #1a362d; color: #fdfbf7; text-align: center; padding: 20px; font-size: 12px; }
        .button { display: inline-block; padding: 15px 30px; background-color: #c9a84c; color: #1c1a17; text-decoration: none; border-radius: 30px; font-weight: bold; margin-top: 25px; transition: all 0.3s; }
        .gold { color: #c9a84c; font-weight: bold; }
        .welcome-text { font-size: 24px; color: #1a362d; margin-bottom: 20px; text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>TANVO</h1>
          <p style="margin-top: 10px; opacity: 0.8; letter-spacing: 1px;">PRESERVING ODISHA'S HERITAGE</p>
        </div>
        <div class="content">
          <div class="welcome-text">Namaste, <span class="gold">${user.name}</span>!</div>
          <p>Welcome to the <strong>TANVO</strong> family. We're honored to have you join our community of handloom enthusiasts and heritage preservers.</p>
          <p>Your account is now active. You can start exploring our curated collection of GI-certified masterpieces - from the intricate weaves of Sambalpuri to the elegance of Bomkai and Ikat.</p>
          <div style="text-align: center;">
            <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}" class="button">Explore Collection</a>
          </div>
          <p style="margin-top: 30px; border-top: 1px solid #eee; pt: 20px;">Use code <span class="gold">HERITAGE10</span> for 10% off your first treasure.</p>
          <p>With love,<br><strong>Satyasai Yangyadatta</strong><br>Founder, TANVO</p>
        </div>
        <div class="footer">
          <p>© 2024 TANVO Heritage. All rights reserved.</p>
          <p>Artisan Direct | GI Certified | Heritage Wear</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    email: user.email,
    subject: 'Welcome to the TANVO Family 🌸',
    html
  });
};

/**
 * Send order confirmation email
 */
export const sendOrderConfirmation = async (order, user) => {
  const itemsHtml = order.orderItems.map(item => `
    <tr>
      <td style="padding: 15px; border-bottom: 1px solid #eee;">
        <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px; border: 1px solid #eee;" />
      </td>
      <td style="padding: 15px; border-bottom: 1px solid #eee;">
        <div style="font-weight: bold; color: #1a362d;">${item.name}</div>
        <div style="font-size: 13px; color: #666; margin-top: 4px;">Qty: ${item.quantity} | Color: ${item.color || 'Default'}</div>
      </td>
      <td style="padding: 15px; border-bottom: 1px solid #eee; text-align: right; font-weight: bold;">
        ₹${(item.price * item.quantity).toLocaleString()}
      </td>
    </tr>
  `).join('');

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 20px auto; border: 1px solid #c9a84c; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .header { background: #1a362d; color: #fdfbf7; padding: 30px; text-align: center; }
        .header h1 { margin: 0; letter-spacing: 3px; font-size: 28px; }
        .content { padding: 40px; background-color: #fdfbf7; }
        .order-card { background: white; border: 1px solid #c9a84c; border-radius: 12px; padding: 25px; margin: 20px 0; }
        .total-row { display: flex; justify-content: space-between; margin: 8px 0; border-top: 1px solid #eee; padding-top: 8px; }
        .footer { background: #f4f4f4; color: #666; text-align: center; padding: 20px; font-size: 11px; }
        .gold { color: #c9a84c; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>TANVO</h1>
        </div>
        <div class="content">
          <h2 style="color: #1a362d; margin-top: 0;">Order Confirmed! 🎉</h2>
          <p>Namaste ${user.name},</p>
          <p>Thank you for choosing TANVO. Your order is being prepared with the utmost care by our artisans.</p>
          
          <div class="order-card">
            <p style="margin-top: 0;"><strong>Order ID:</strong> <span class="gold">#${order._id}</span></p>
            <p><strong>Shipping to:</strong><br>
              ${order.shippingAddress.addressLine1}, ${order.shippingAddress.addressLine2 || ''}<br>
              ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}<br>
              <strong>Phone:</strong> ${order.shippingAddress.phone}
            </p>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              ${itemsHtml}
            </table>
            
            <div style="margin-top: 20px; text-align: right;">
              <p style="margin: 5px 0;">Subtotal: ₹${order.itemsPrice.toLocaleString()}</p>
              <p style="margin: 5px 0;">Shipping: ₹${order.shippingPrice.toLocaleString()}</p>
              <p style="margin: 5px 0;">Tax: ₹${order.taxPrice.toLocaleString()}</p>
              ${order.discountPrice > 0 ? `<p style="margin: 5px 0; color: #27ae60;">Discount: -₹${order.discountPrice.toLocaleString()}</p>` : ''}
              <p style="font-size: 20px; font-weight: bold; color: #1a362d; border-top: 2px solid #c9a84c; padding-top: 10px; margin-top: 10px;">
                Total: ₹${order.totalPrice.toLocaleString()}
              </p>
            </div>
          </div>
          
          <p>We'll notify you as soon as your treasure is shipped!</p>
          <p>Warmly,<br>The TANVO Team</p>
        </div>
        <div class="footer">
          <p>TANVO Heritage | Meher Weavers Cooperative, Odisha</p>
          <p>© 2024 All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  // Send to user
  await sendEmail({
    email: user.email,
    subject: `Your TANVO Order #${order._id} is Confirmed! ✨`,
    html
  });

  // Send to Admin (sethysaiyangyadatta@gmail.com)
  const whatsappMsg = encodeURIComponent(`Hi ${user.name}, this is TANVO. We've received your order #${order._id} for ₹${order.totalPrice.toLocaleString()}. We'll process it soon!`);
  const whatsappUrl = `https://wa.me/${order.shippingAddress.phone}?text=${whatsappMsg}`;

  const adminHtml = `
    <div style="background: #fdfbf7; padding: 20px; border: 2px solid #1a362d; border-radius: 12px;">
      <h2 style="color: #1a362d;">New Order Received! 🛍️</h2>
      <p><strong>Customer:</strong> ${user.name} (${user.email})</p>
      <p><strong>Total:</strong> ₹${order.totalPrice.toLocaleString()}</p>
      <div style="margin-top: 20px;">
        <a href="${whatsappUrl}" style="display: inline-block; padding: 12px 24px; background-color: #25D366; color: white; text-decoration: none; border-radius: 30px; font-weight: bold;">
          Chat with Customer on WhatsApp
        </a>
      </div>
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #1a362d;">
      ${html}
    </div>
  `;

  await sendEmail({
    email: 'sethysaiyangyadatta@gmail.com',
    subject: `New Order Received - #${order._id} - ${user.name}`,
    html: adminHtml
  });
};

export default {
  sendEmail,
  sendWelcomeEmail,
  sendOrderConfirmation
};