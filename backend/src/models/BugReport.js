import mongoose from 'mongoose';

const bugReportSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, 'Please provide a description of the bug']
  },
  route: {
    type: String,
    required: true
  },
  deviceInfo: {
    type: String,
  },
  screenshotUrl: {
    type: String
  },
  status: {
    type: String,
    enum: ['New', 'Investigating', 'Fixed', 'Closed'],
    default: 'New'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

const BugReport = mongoose.model('BugReport', bugReportSchema);
export default BugReport;
