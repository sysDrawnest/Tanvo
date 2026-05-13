import SupportTicket from '../models/SupportTicket.js';
import BugReport from '../models/BugReport.js';
import { sendSupportTicketConfirmation } from '../utils/sendEmail.js';

/**
 * @desc    Submit a contact/support form
 * @route   POST /api/support/contact
 * @access  Public
 */
export const submitContactForm = async (req, res) => {
  try {
    const { name, email, category, message } = req.body;

    const ticket = await SupportTicket.create({
      name,
      email,
      category,
      message,
      user: req.user ? req.user._id : null
    });

    // Send confirmation email
    await sendSupportTicketConfirmation(ticket);

    res.status(201).json({
      success: true,
      message: 'Support ticket submitted successfully',
      data: ticket
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Submit a bug report
 * @route   POST /api/support/bug-report
 * @access  Public
 */
export const submitBugReport = async (req, res) => {
  try {
    const { description, route, deviceInfo, screenshotUrl } = req.body;

    const report = await BugReport.create({
      description,
      route,
      deviceInfo,
      screenshotUrl,
      user: req.user ? req.user._id : null
    });

    res.status(201).json({
      success: true,
      message: 'Bug report submitted successfully',
      data: report
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
