import React, { useState, useEffect } from 'react';
import { 
  Settings, Save, Globe, Mail, Shield, Bell, CreditCard, 
  Truck, Percent, Star, Lock, Users, Image, Palette,
  RefreshCw, AlertCircle, CheckCircle, XCircle, Eye,
  EyeOff, Sun, Moon, Smartphone, Database, Key
} from 'lucide-react';
import API from '../../services/api';
import { useStore } from '../../context/StoreContext';

interface GeneralSettings {
  storeName: string;
  storeEmail: string;
  storePhone: string;
  storeAddress: string;
  currency: string;
  timezone: string;
  dateFormat: string;
}

interface AppearanceSettings {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  logo: string | null;
  favicon: string | null;
  customCSS?: string;
}

interface EmailSettings {
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPassword: string;
  smtpSecure: boolean;
  fromEmail: string;
  fromName: string;
  orderConfirmationTemplate: string;
  passwordResetTemplate: string;
  welcomeEmailTemplate: string;
}

interface PaymentSettings {
  stripeEnabled: boolean;
  stripePublicKey: string;
  stripeSecretKey: string;
  razorpayEnabled: boolean;
  razorpayKeyId: string;
  razorpayKeySecret: string;
  codEnabled: boolean;
  upiEnabled: boolean;
  upiId: string;
}

interface ShippingSettings {
  freeShippingThreshold: number;
  domesticShippingRate: number;
  internationalShippingRate: number;
  shippingZones: Array<{
    name: string;
    countries: string[];
    rate: number;
    estimatedDays: string;
  }>;
}

interface NotificationSettings {
  orderNotifications: boolean;
  stockAlerts: boolean;
  newUserNotifications: boolean;
  reviewNotifications: boolean;
  marketingEmails: boolean;
  adminEmails: string[];
  slackWebhook?: string;
}

interface SEOSettings {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  googleAnalyticsId: string;
  googleTagManagerId: string;
  facebookPixelId: string;
  robotsTxt: string;
}

interface SecuritySettings {
  twoFactorAuth: boolean;
  sessionTimeout: number;
  maxLoginAttempts: number;
  passwordMinLength: number;
  requireStrongPassword: boolean;
  ipWhitelist: string[];
}

const AdminSettings: React.FC = () => {
  const { user } = useStore();
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});

  // Settings state
  const [general, setGeneral] = useState<GeneralSettings>({
    storeName: 'Tanvo',
    storeEmail: 'hello@tanvo.com',
    storePhone: '+91 98765 43210',
    storeAddress: 'Bhubaneswar, Odisha, India',
    currency: 'INR',
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY'
  });

  const [appearance, setAppearance] = useState<AppearanceSettings>({
    primaryColor: '#C9A84C',
    secondaryColor: '#E8C97A',
    accentColor: '#C9A84C',
    logo: null,
    favicon: null,
    customCSS: ''
  });

  const [email, setEmail] = useState<EmailSettings>({
    smtpHost: 'smtp.gmail.com',
    smtpPort: 587,
    smtpUser: '',
    smtpPassword: '',
    smtpSecure: true,
    fromEmail: 'noreply@tanvo.com',
    fromName: 'Tanvo',
    orderConfirmationTemplate: 'default',
    passwordResetTemplate: 'default',
    welcomeEmailTemplate: 'default'
  });

  const [payment, setPayment] = useState<PaymentSettings>({
    stripeEnabled: false,
    stripePublicKey: '',
    stripeSecretKey: '',
    razorpayEnabled: true,
    razorpayKeyId: 'rzp_test_xxxx',
    razorpayKeySecret: '',
    codEnabled: true,
    upiEnabled: true,
    upiId: 'tanvo@okhdfcbank'
  });

  const [shipping, setShipping] = useState<ShippingSettings>({
    freeShippingThreshold: 5000,
    domesticShippingRate: 100,
    internationalShippingRate: 1500,
    shippingZones: [
      {
        name: 'Domestic',
        countries: ['India'],
        rate: 100,
        estimatedDays: '3-5 business days'
      },
      {
        name: 'International',
        countries: ['USA', 'UK', 'Canada', 'Australia'],
        rate: 1500,
        estimatedDays: '7-14 business days'
      }
    ]
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    orderNotifications: true,
    stockAlerts: true,
    newUserNotifications: true,
    reviewNotifications: true,
    marketingEmails: false,
    adminEmails: ['admin@tanvo.com'],
    slackWebhook: ''
  });

  const [seo, setSeo] = useState<SEOSettings>({
    metaTitle: 'Tanvo - Authentic Odisha Handlooms',
    metaDescription: 'Discover authentic Odisha handlooms including Sambalpuri, Bomkai, and Ikat sarees directly from master weavers.',
    metaKeywords: 'handloom, saree, odisha, sambalpuri, ikat, bomkai',
    googleAnalyticsId: 'UA-XXXXX-Y',
    googleTagManagerId: 'GTM-XXXXXX',
    facebookPixelId: '123456789',
    robotsTxt: 'User-agent: *\nAllow: /'
  });

  const [security, setSecurity] = useState<SecuritySettings>({
    twoFactorAuth: false,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    passwordMinLength: 8,
    requireStrongPassword: true,
    ipWhitelist: []
  });

  // Load settings on mount
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/admin/settings');
      
      // Update states with fetched data
      if (data.general) setGeneral(data.general);
      if (data.appearance) setAppearance(data.appearance);
      if (data.email) setEmail(data.email);
      if (data.payment) setPayment(data.payment);
      if (data.shipping) setShipping(data.shipping);
      if (data.notifications) setNotifications(data.notifications);
      if (data.seo) setSeo(data.seo);
      if (data.security) setSecurity(data.security);
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveSuccess(false);
    setSaveError('');

    try {
      const settings = {
        general,
        appearance,
        email,
        payment,
        shipping,
        notifications,
        seo,
        security
      };

      await API.put('/admin/settings', settings);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error: any) {
      console.error('Error saving settings:', error);
      setSaveError(error.response?.data?.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (!window.confirm('Are you sure you want to reset all settings to defaults?')) {
      return;
    }

    try {
      setLoading(true);
      const { data } = await API.post('/admin/settings/reset');
      
      // Update states with default data
      if (data.general) setGeneral(data.general);
      if (data.appearance) setAppearance(data.appearance);
      if (data.email) setEmail(data.email);
      if (data.payment) setPayment(data.payment);
      if (data.shipping) setShipping(data.shipping);
      if (data.notifications) setNotifications(data.notifications);
      if (data.seo) setSeo(data.seo);
      if (data.security) setSecurity(data.security);
    } catch (error) {
      console.error('Error resetting settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAppearance({ ...appearance, logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFaviconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAppearance({ ...appearance, favicon: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const togglePasswordVisibility = (field: string) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'shipping', label: 'Shipping', icon: Truck },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'seo', label: 'SEO', icon: Globe },
    { id: 'security', label: 'Security', icon: Shield }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#C9A84C] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-[#0D0B0A]">Settings</h1>
          <p className="text-gray-500 mt-1">Manage your store configuration and preferences</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleReset}
            className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <RefreshCw size={18} />
            Reset to Defaults
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#C9A84C] to-[#E8C97A] text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              <>
                <Save size={18} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Success/Error Messages */}
      {saveSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 text-green-700">
          <CheckCircle size={20} />
          <span>Settings saved successfully!</span>
        </div>
      )}
      
      {saveError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700">
          <XCircle size={20} />
          <span>{saveError}</span>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="lg:w-64 space-y-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                activeTab === tab.id
                  ? 'bg-[#C9A84C] text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon size={18} />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:p-8">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold mb-6">General Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Store Name
                  </label>
                  <input
                    type="text"
                    value={general.storeName}
                    onChange={(e) => setGeneral({ ...general, storeName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Store Email
                  </label>
                  <input
                    type="email"
                    value={general.storeEmail}
                    onChange={(e) => setGeneral({ ...general, storeEmail: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Store Phone
                  </label>
                  <input
                    type="tel"
                    value={general.storePhone}
                    onChange={(e) => setGeneral({ ...general, storePhone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Store Address
                  </label>
                  <input
                    type="text"
                    value={general.storeAddress}
                    onChange={(e) => setGeneral({ ...general, storeAddress: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Currency
                  </label>
                  <select
                    value={general.currency}
                    onChange={(e) => setGeneral({ ...general, currency: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                  >
                    <option value="INR">INR - Indian Rupee</option>
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timezone
                  </label>
                  <select
                    value={general.timezone}
                    onChange={(e) => setGeneral({ ...general, timezone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                  >
                    <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                    <option value="America/New_York">America/New York (EST)</option>
                    <option value="Europe/London">Europe/London (GMT)</option>
                    <option value="Asia/Dubai">Asia/Dubai (GST)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Format
                  </label>
                  <select
                    value={general.dateFormat}
                    onChange={(e) => setGeneral({ ...general, dateFormat: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold mb-6">Appearance Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={appearance.primaryColor}
                      onChange={(e) => setAppearance({ ...appearance, primaryColor: e.target.value })}
                      className="w-12 h-10 rounded border border-gray-200"
                    />
                    <input
                      type="text"
                      value={appearance.primaryColor}
                      onChange={(e) => setAppearance({ ...appearance, primaryColor: e.target.value })}
                      className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Secondary Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={appearance.secondaryColor}
                      onChange={(e) => setAppearance({ ...appearance, secondaryColor: e.target.value })}
                      className="w-12 h-10 rounded border border-gray-200"
                    />
                    <input
                      type="text"
                      value={appearance.secondaryColor}
                      onChange={(e) => setAppearance({ ...appearance, secondaryColor: e.target.value })}
                      className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Accent Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={appearance.accentColor}
                      onChange={(e) => setAppearance({ ...appearance, accentColor: e.target.value })}
                      className="w-12 h-10 rounded border border-gray-200"
                    />
                    <input
                      type="text"
                      value={appearance.accentColor}
                      onChange={(e) => setAppearance({ ...appearance, accentColor: e.target.value })}
                      className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Store Logo
                </label>
                <div className="flex items-center gap-4">
                  {appearance.logo ? (
                    <img src={appearance.logo} alt="Logo" className="w-20 h-20 object-contain border rounded-lg" />
                  ) : (
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                      <Image size={32} />
                    </div>
                  )}
                  <label className="cursor-pointer px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    Upload Logo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Favicon
                </label>
                <div className="flex items-center gap-4">
                  {appearance.favicon ? (
                    <img src={appearance.favicon} alt="Favicon" className="w-10 h-10 object-contain border rounded" />
                  ) : (
                    <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                      <Image size={16} />
                    </div>
                  )}
                  <label className="cursor-pointer px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    Upload Favicon
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFaviconUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom CSS
                </label>
                <textarea
                  value={appearance.customCSS}
                  onChange={(e) => setAppearance({ ...appearance, customCSS: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 font-mono text-sm"
                  placeholder="/* Add custom CSS here */"
                />
              </div>
            </div>
          )}

          {/* Email Settings */}
          {activeTab === 'email' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold mb-6">Email Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SMTP Host
                  </label>
                  <input
                    type="text"
                    value={email.smtpHost}
                    onChange={(e) => setEmail({ ...email, smtpHost: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SMTP Port
                  </label>
                  <input
                    type="number"
                    value={email.smtpPort}
                    onChange={(e) => setEmail({ ...email, smtpPort: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SMTP Username
                  </label>
                  <input
                    type="text"
                    value={email.smtpUser}
                    onChange={(e) => setEmail({ ...email, smtpUser: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SMTP Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword.smtp ? 'text' : 'password'}
                      value={email.smtpPassword}
                      onChange={(e) => setEmail({ ...email, smtpPassword: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('smtp')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword.smtp ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    From Email
                  </label>
                  <input
                    type="email"
                    value={email.fromEmail}
                    onChange={(e) => setEmail({ ...email, fromEmail: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    From Name
                  </label>
                  <input
                    type="text"
                    value={email.fromName}
                    onChange={(e) => setEmail({ ...email, fromName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="smtpSecure"
                  checked={email.smtpSecure}
                  onChange={(e) => setEmail({ ...email, smtpSecure: e.target.checked })}
                  className="w-4 h-4 text-[#C9A84C] rounded focus:ring-[#C9A84C]"
                />
                <label htmlFor="smtpSecure" className="text-sm text-gray-700">
                  Use Secure Connection (TLS/SSL)
                </label>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <h3 className="font-bold text-lg mb-4">Email Templates</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Order Confirmation
                    </label>
                    <select
                      value={email.orderConfirmationTemplate}
                      onChange={(e) => setEmail({ ...email, orderConfirmationTemplate: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                    >
                      <option value="default">Default Template</option>
                      <option value="minimal">Minimal</option>
                      <option value="branded">Branded</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password Reset
                    </label>
                    <select
                      value={email.passwordResetTemplate}
                      onChange={(e) => setEmail({ ...email, passwordResetTemplate: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                    >
                      <option value="default">Default Template</option>
                      <option value="minimal">Minimal</option>
                      <option value="branded">Branded</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Welcome Email
                    </label>
                    <select
                      value={email.welcomeEmailTemplate}
                      onChange={(e) => setEmail({ ...email, welcomeEmailTemplate: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                    >
                      <option value="default">Default Template</option>
                      <option value="minimal">Minimal</option>
                      <option value="branded">Branded</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payment Settings */}
          {activeTab === 'payment' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold mb-6">Payment Settings</h2>
              
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-[#C9A84C]" />
                      <h3 className="font-bold">Stripe</h3>
                    </div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={payment.stripeEnabled}
                        onChange={(e) => setPayment({ ...payment, stripeEnabled: e.target.checked })}
                        className="w-4 h-4 text-[#C9A84C] rounded focus:ring-[#C9A84C]"
                      />
                      <span className="text-sm">Enable</span>
                    </label>
                  </div>
                  
                  {payment.stripeEnabled && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Public Key
                        </label>
                        <input
                          type="text"
                          value={payment.stripePublicKey}
                          onChange={(e) => setPayment({ ...payment, stripePublicKey: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Secret Key
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword.stripe ? 'text' : 'password'}
                            value={payment.stripeSecretKey}
                            onChange={(e) => setPayment({ ...payment, stripeSecretKey: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility('stripe')}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword.stripe ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-[#E8C97A]" />
                      <h3 className="font-bold">Razorpay</h3>
                    </div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={payment.razorpayEnabled}
                        onChange={(e) => setPayment({ ...payment, razorpayEnabled: e.target.checked })}
                        className="w-4 h-4 text-[#C9A84C] rounded focus:ring-[#C9A84C]"
                      />
                      <span className="text-sm">Enable</span>
                    </label>
                  </div>
                  
                  {payment.razorpayEnabled && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Key ID
                        </label>
                        <input
                          type="text"
                          value={payment.razorpayKeyId}
                          onChange={(e) => setPayment({ ...payment, razorpayKeyId: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Key Secret
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword.razorpay ? 'text' : 'password'}
                            value={payment.razorpayKeySecret}
                            onChange={(e) => setPayment({ ...payment, razorpayKeySecret: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility('razorpay')}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword.razorpay ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-green-600" />
                      <h3 className="font-bold">Cash on Delivery</h3>
                    </div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={payment.codEnabled}
                        onChange={(e) => setPayment({ ...payment, codEnabled: e.target.checked })}
                        className="w-4 h-4 text-[#C9A84C] rounded focus:ring-[#C9A84C]"
                      />
                      <span className="text-sm">Enable</span>
                    </label>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-5 h-5 text-purple-600" />
                      <h3 className="font-bold">UPI</h3>
                    </div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={payment.upiEnabled}
                        onChange={(e) => setPayment({ ...payment, upiEnabled: e.target.checked })}
                        className="w-4 h-4 text-[#C9A84C] rounded focus:ring-[#C9A84C]"
                      />
                      <span className="text-sm">Enable</span>
                    </label>
                  </div>
                  
                  {payment.upiEnabled && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        UPI ID
                      </label>
                      <input
                        type="text"
                        value={payment.upiId}
                        onChange={(e) => setPayment({ ...payment, upiId: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                        placeholder="merchant@bank"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Shipping Settings */}
          {activeTab === 'shipping' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold mb-6">Shipping Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Free Shipping Threshold (₹)
                  </label>
                  <input
                    type="number"
                    value={shipping.freeShippingThreshold}
                    onChange={(e) => setShipping({ ...shipping, freeShippingThreshold: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Domestic Shipping Rate (₹)
                  </label>
                  <input
                    type="number"
                    value={shipping.domesticShippingRate}
                    onChange={(e) => setShipping({ ...shipping, domesticShippingRate: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    International Shipping Rate (₹)
                  </label>
                  <input
                    type="number"
                    value={shipping.internationalShippingRate}
                    onChange={(e) => setShipping({ ...shipping, internationalShippingRate: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                  />
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <h3 className="font-bold text-lg mb-4">Shipping Zones</h3>
                
                {shipping.shippingZones.map((zone, index) => (
                  <div key={index} className="mb-6 p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-bold mb-4">{zone.name}</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Countries (comma separated)
                        </label>
                        <input
                          type="text"
                          value={zone.countries.join(', ')}
                          onChange={(e) => {
                            const newZones = [...shipping.shippingZones];
                            newZones[index].countries = e.target.value.split(',').map(c => c.trim());
                            setShipping({ ...shipping, shippingZones: newZones });
                          }}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Shipping Rate (₹)
                        </label>
                        <input
                          type="number"
                          value={zone.rate}
                          onChange={(e) => {
                            const newZones = [...shipping.shippingZones];
                            newZones[index].rate = parseInt(e.target.value);
                            setShipping({ ...shipping, shippingZones: newZones });
                          }}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Estimated Delivery
                        </label>
                        <input
                          type="text"
                          value={zone.estimatedDays}
                          onChange={(e) => {
                            const newZones = [...shipping.shippingZones];
                            newZones[index].estimatedDays = e.target.value;
                            setShipping({ ...shipping, shippingZones: newZones });
                          }}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                          placeholder="e.g., 3-5 business days"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => {
                    setShipping({
                      ...shipping,
                      shippingZones: [
                        ...shipping.shippingZones,
                        {
                          name: 'New Zone',
                          countries: [],
                          rate: 0,
                          estimatedDays: ''
                        }
                      ]
                    });
                  }}
                  className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Add Shipping Zone
                </button>
              </div>
            </div>
          )}

          {/* Notifications Settings */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold mb-6">Notification Settings</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-bold">Order Notifications</h3>
                    <p className="text-sm text-gray-500">Receive email when new orders are placed</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.orderNotifications}
                      onChange={(e) => setNotifications({ ...notifications, orderNotifications: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#C9A84C]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C9A84C]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-bold">Stock Alerts</h3>
                    <p className="text-sm text-gray-500">Get notified when products are low in stock</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.stockAlerts}
                      onChange={(e) => setNotifications({ ...notifications, stockAlerts: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#C9A84C]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C9A84C]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-bold">New User Notifications</h3>
                    <p className="text-sm text-gray-500">Get notified when new users register</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.newUserNotifications}
                      onChange={(e) => setNotifications({ ...notifications, newUserNotifications: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#C9A84C]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C9A84C]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-bold">Review Notifications</h3>
                    <p className="text-sm text-gray-500">Get notified when new reviews are submitted</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.reviewNotifications}
                      onChange={(e) => setNotifications({ ...notifications, reviewNotifications: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#C9A84C]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C9A84C]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-bold">Marketing Emails</h3>
                    <p className="text-sm text-gray-500">Send promotional emails to customers</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.marketingEmails}
                      onChange={(e) => setNotifications({ ...notifications, marketingEmails: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#C9A84C]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C9A84C]"></div>
                  </label>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Admin Email Addresses
                </label>
                <input
                  type="text"
                  value={notifications.adminEmails.join(', ')}
                  onChange={(e) => setNotifications({ ...notifications, adminEmails: e.target.value.split(',').map(email => email.trim()) })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                  placeholder="admin@example.com, manager@example.com"
                />
                <p className="text-xs text-gray-500 mt-1">Separate multiple emails with commas</p>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slack Webhook URL (Optional)
                </label>
                <input
                  type="url"
                  value={notifications.slackWebhook}
                  onChange={(e) => setNotifications({ ...notifications, slackWebhook: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                  placeholder="https://hooks.slack.com/services/..."
                />
              </div>
            </div>
          )}

          {/* SEO Settings */}
          {activeTab === 'seo' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold mb-6">SEO Settings</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={seo.metaTitle}
                  onChange={(e) => setSeo({ ...seo, metaTitle: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                />
                <p className="text-xs text-gray-500 mt-1">Recommended length: 50-60 characters</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Description
                </label>
                <textarea
                  value={seo.metaDescription}
                  onChange={(e) => setSeo({ ...seo, metaDescription: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                />
                <p className="text-xs text-gray-500 mt-1">Recommended length: 150-160 characters</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Keywords
                </label>
                <input
                  type="text"
                  value={seo.metaKeywords}
                  onChange={(e) => setSeo({ ...seo, metaKeywords: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                  placeholder="handloom, saree, odisha, sambalpuri"
                />
                <p className="text-xs text-gray-500 mt-1">Separate keywords with commas</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Google Analytics ID
                  </label>
                  <input
                    type="text"
                    value={seo.googleAnalyticsId}
                    onChange={(e) => setSeo({ ...seo, googleAnalyticsId: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                    placeholder="UA-XXXXX-Y"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Google Tag Manager ID
                  </label>
                  <input
                    type="text"
                    value={seo.googleTagManagerId}
                    onChange={(e) => setSeo({ ...seo, googleTagManagerId: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                    placeholder="GTM-XXXXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Facebook Pixel ID
                  </label>
                  <input
                    type="text"
                    value={seo.facebookPixelId}
                    onChange={(e) => setSeo({ ...seo, facebookPixelId: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                    placeholder="123456789"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  robots.txt
                </label>
                <textarea
                  value={seo.robotsTxt}
                  onChange={(e) => setSeo({ ...seo, robotsTxt: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 font-mono text-sm"
                />
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold mb-6">Security Settings</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-bold">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-500">Require 2FA for admin accounts</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={security.twoFactorAuth}
                      onChange={(e) => setSecurity({ ...security, twoFactorAuth: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#C9A84C]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C9A84C]"></div>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Session Timeout (minutes)
                    </label>
                    <input
                      type="number"
                      value={security.sessionTimeout}
                      onChange={(e) => setSecurity({ ...security, sessionTimeout: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Login Attempts
                    </label>
                    <input
                      type="number"
                      value={security.maxLoginAttempts}
                      onChange={(e) => setSecurity({ ...security, maxLoginAttempts: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Minimum Password Length
                    </label>
                    <input
                      type="number"
                      value={security.passwordMinLength}
                      onChange={(e) => setSecurity({ ...security, passwordMinLength: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-8">
                    <input
                      type="checkbox"
                      id="requireStrongPassword"
                      checked={security.requireStrongPassword}
                      onChange={(e) => setSecurity({ ...security, requireStrongPassword: e.target.checked })}
                      className="w-4 h-4 text-[#C9A84C] rounded focus:ring-[#C9A84C]"
                    />
                    <label htmlFor="requireStrongPassword" className="text-sm text-gray-700">
                      Require strong passwords (uppercase, lowercase, number, special character)
                    </label>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    IP Whitelist (for admin access)
                  </label>
                  <textarea
                    value={security.ipWhitelist.join('\n')}
                    onChange={(e) => setSecurity({ ...security, ipWhitelist: e.target.value.split('\n').filter(ip => ip.trim()) })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 font-mono text-sm"
                    placeholder="192.168.1.1&#10;10.0.0.1&#10;203.0.113.0/24"
                  />
                  <p className="text-xs text-gray-500 mt-1">One IP address or CIDR range per line. Leave empty to allow all IPs.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;