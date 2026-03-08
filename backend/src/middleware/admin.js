import User from '../models/User.js';

// @desc    Check if user is admin
// @access  Middleware
export const admin = async (req, res, next) => {
  try {
    // Check if user exists in request (from auth middleware)
    if (!req.user) {
      return res.status(401).json({ 
        success: false,
        message: 'Not authorized, no user found' 
      });
    }

    // Get fresh user data from database
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    // Check if user role is admin
    if (user.role !== 'admin') {
      return res.status(403).json({ 
        success: false,
        message: 'Access denied. Admin privileges required.' 
      });
    }

    // Attach fresh user data to request
    req.user = user;
    next();
  } catch (error) {
    console.error('Admin middleware error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error in admin authorization' 
    });
  }
};

// @desc    Check if user is admin or super admin (for future use)
// @access  Middleware
export const adminOrSuperAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ 
        success: false,
        message: 'Not authorized, no user found' 
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    // Check if user is admin or super admin
    if (user.role !== 'admin' && user.role !== 'super_admin') {
      return res.status(403).json({ 
        success: false,
        message: 'Access denied. Admin or Super Admin privileges required.' 
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Admin/SuperAdmin middleware error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error in authorization' 
    });
  }
};

// @desc    Check if user is super admin only
// @access  Middleware
export const superAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ 
        success: false,
        message: 'Not authorized, no user found' 
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    // Check if user is super admin
    if (user.role !== 'super_admin') {
      return res.status(403).json({ 
        success: false,
        message: 'Access denied. Super Admin privileges required.' 
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('SuperAdmin middleware error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error in super admin authorization' 
    });
  }
};

// @desc    Check if user is admin or the same user (for profile access)
// @access  Middleware
export const adminOrSameUser = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ 
        success: false,
        message: 'Not authorized, no user found' 
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    const targetUserId = req.params.id || req.body.userId;

    // Allow if user is admin OR accessing their own data
    if (user.role === 'admin' || user.role === 'super_admin' || user._id.toString() === targetUserId) {
      req.user = user;
      return next();
    }

    return res.status(403).json({ 
      success: false,
      message: 'Access denied. You can only access your own data.' 
    });

  } catch (error) {
    console.error('AdminOrSameUser middleware error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error in authorization' 
    });
  }
};

// @desc    Log admin actions (optional - for audit trail)
// @access  Middleware
export const logAdminAction = async (req, res, next) => {
  // Store original send function
  const originalSend = res.send;
  
  // Override send function to log after response
  res.send = function(body) {
    // Log admin action if response was successful
    if (res.statusCode >= 200 && res.statusCode < 300) {
      console.log(`
        ════════════════════════════════════════
        ADMIN ACTION LOG
        ════════════════════════════════════════
        Admin: ${req.user?.email || 'Unknown'}
        Action: ${req.method} ${req.originalUrl}
        Timestamp: ${new Date().toISOString()}
        IP: ${req.ip}
        User Agent: ${req.get('user-agent')}
        Body: ${JSON.stringify(req.body).substring(0, 200)}
        ════════════════════════════════════════
      `);
      
      // Here you could also save to database for audit trail
      // await AdminLog.create({ ... })
    }
    
    // Call original send function
    return originalSend.call(this, body);
  };
  
  next();
};