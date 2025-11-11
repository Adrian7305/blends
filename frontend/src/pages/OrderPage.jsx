import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CreditCard, QrCode, User, Calendar, MapPin, DollarSign, Users, CheckCircle } from 'lucide-react';
import { paymentsAPI, eventsAPI, api, authAPI } from '../api';

const OrderPage = ({ orderDetails: propOrderDetails, onPaymentSuccess }) => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(propOrderDetails);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pollTimer, setPollTimer] = useState(null);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(!propOrderDetails);
  const [error, setError] = useState(null);

  const isValidMongoId = (val) => typeof val === 'string' && /^[a-fA-F0-9]{24}$/.test(val);

  // Fetch order details if not provided via props
  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (propOrderDetails) {
        setOrderDetails(propOrderDetails);
        setIsLoading(false);
        return;
      }

      if (!orderId) {
        setError('No order ID provided');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        // For now, we'll simulate order details since there's no getOrderById endpoint
        // In a real implementation, you'd fetch this from your backend
        setError('Order details must be passed as props. Direct order fetching not implemented yet.');
      } catch (err) {
        console.error('Error fetching order details:', err);
        setError('Failed to load order details. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, propOrderDetails]);

  // Loading and error states
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-red-600/20 border border-red-600 rounded-lg p-6 text-center">
            <h2 className="text-xl font-bold text-red-400 mb-2">Error</h2>
            <p className="text-gray-300 mb-4">{error}</p>
            <button
              onClick={() => navigate('/events')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Back to Events
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-6 text-center">
            <h2 className="text-xl font-bold text-gray-300 mb-2">Order Not Found</h2>
            <p className="text-gray-400 mb-4">The order you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate('/events')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Back to Events
            </button>
          </div>
        </div>
      </div>
    );
  }
  // Handle both frontend mock data and backend API data structures
  const eventId = orderDetails.event?._id || orderDetails.event?.id;
  const eventTitle = orderDetails.event?.eventTitle || orderDetails.event?.name;
  const eventImage = orderDetails.event?.bannerImage || orderDetails.event?.image;
  const eventDate = orderDetails.event?.startDate || orderDetails.event?.date;
  const eventVenue = orderDetails.event?.location || orderDetails.event?.venue;
  const eventCategory = orderDetails.event?.eventType || orderDetails.event?.category;
  const eventPrice = orderDetails.event?.registrationFee || orderDetails.event?.price;
  const orderNumber = orderDetails._id || orderDetails.orderNumber;

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      // Build payload expected by backend PhonePe create-order
      const storedProfile = (() => {
        try { return JSON.parse(localStorage.getItem('userProfile')); } catch { return null; }
      })();
      let userId = storedProfile?.id || storedProfile?._id;
      let eventId = orderDetails.eventId || orderDetails.event?._id || orderDetails.event?.id;

      // If userId is missing, fetch profile from backend and cache
      if (!userId) {
        try {
          const profile = await authAPI.getProfile();
          userId = profile?.id || profile?._id;
          if (userId) {
            const merged = { ...(storedProfile || {}), id: userId };
            localStorage.setItem('userProfile', JSON.stringify(merged));
          }
        } catch {}
      }

      // Resolve backend event id if missing or invalid (match by title)
      if (!eventId || !isValidMongoId(String(eventId))) {
        try {
          const title = orderDetails.event?.eventTitle || orderDetails.event?.name;
          const res = await eventsAPI.getEvents({ q: title, query: title });
          const items = res.items || res.data?.items || [];
          const match = items.find(e => (e.eventTitle || e.name) === title);
          if (match?._id) eventId = match._id;
        } catch {}
      }

      // If still invalid, try fetching by the route param/id from orderDetails
      if (!eventId || !isValidMongoId(String(eventId))) {
        try {
          const rawId = orderDetails.event?.id || orderDetails.eventId;
          if (rawId) {
            const byId = await eventsAPI.getEventById(String(rawId));
            const doc = byId.event || byId?.data?.event || byId;
            if (doc?._id) eventId = doc._id;
          }
        } catch {}
      }

      if (!userId || !eventId) {
        throw new Error('Missing user or event information for payment');
      }

      // Block payments if event does not exist in backend
      if (!isValidMongoId(String(eventId))) {
        alert('This event is not available for backend registration. Please select an event created in the backend.');
        setIsProcessing(false);
        return;
      }

      const paymentData = {
        amount: Number(orderDetails.totalAmount) || 0,
        userId,
        eventId,
      };

      const response = await paymentsAPI.createOrder(paymentData);

      // Expect checkoutPageUrl from backend; redirect user to PhonePe checkout
      if (response?.checkoutPageUrl) {
        // Open in new tab to allow external checkout; backend will redirect to /success or /failure after completion
        window.open(response.checkoutPageUrl, '_blank', 'noopener');
        setIsProcessing(false);

        // Start polling for status in case user closes tab without redirect
        const merchantOrderId = response.merchantOrderId;
        let attempts = 0;
        const timer = setInterval(async () => {
          try {
            attempts += 1;
            const status = await paymentsAPI.getPaymentStatus(merchantOrderId);
            const state = status.state || status?.data?.state;
            if (state === 'COMPLETED') {
              clearInterval(timer);
              setPollTimer(null);
              // Trigger backend check-status to create registration and redirect to success
              const base = api.defaults.baseURL?.replace(/\/$/, '') || 'http://127.0.0.1:3000/api';
              const qs = new URLSearchParams({ merchantOrderId, userId, eventId }).toString();
              window.location.href = `${base}/payments/check-status?${qs}`;
            } else if (state === 'FAILED' || state === 'DECLINED') {
              clearInterval(timer);
              setPollTimer(null);
              alert('Payment failed. Please try again.');
            } else if (attempts > 30) { // ~2 minutes at 4s interval
              clearInterval(timer);
              setPollTimer(null);
              alert('Payment pending. If you completed payment, please reopen the payment tab.');
            }
          } catch (e) {
            // Ignore transient errors but stop after several attempts
            if (attempts > 30) {
              clearInterval(timer);
              setPollTimer(null);
            }
          }
        }, 4000);
        setPollTimer(timer);
      } else {
        throw new Error(response?.message || 'Payment initialization failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setIsProcessing(false);
      alert('Payment failed: ' + (error.message || 'Please try again'));
    }
  };

  // Clean up poller on unmount
  useEffect(() => {
    return () => {
      if (pollTimer) clearInterval(pollTimer);
    };
  }, [pollTimer]);

  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-8 text-center">
            <div className="w-20 h-20 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-green-400 mb-2">Payment Successful!</h2>
            <p className="text-gray-300 mb-4">
              Your registration for {eventTitle} has been confirmed.
            </p>
            <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-400">Order Number</p>
              <p className="font-mono font-semibold">{orderNumber}</p>
            </div>
            <p className="text-sm text-gray-500">Redirecting to your tickets...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/events" className="text-gray-400 hover:text-purple-400 transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Complete Payment
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-6 sticky top-6">
              <h2 className="text-xl font-bold mb-6 text-purple-400">Order Summary</h2>
              
              {/* Event Info */}
              <div className="mb-6">
                <img 
                  src={eventImage} 
                  alt={eventTitle}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <h3 className="font-semibold text-lg mb-2">{eventTitle}</h3>
                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {new Date(eventDate).toLocaleDateString('en-IN')}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    {eventVenue}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} />
                    {eventCategory}
                  </div>
                </div>
              </div>

              {/* Team Members */}
              {orderDetails.teamMembers && orderDetails.teamMembers.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Team Members ({orderDetails.teamMembers.length})</h4>
                  <div className="space-y-2">
                    {orderDetails.teamMembers.map((member, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-gray-300">{member.email}</span>
                        <span className="text-green-400">✓</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="border-t border-gray-700 pt-4">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Event Price</span>
                    <span>₹{eventPrice}</span>
                  </div>
                  {orderDetails.teamMembers && orderDetails.teamMembers.length > 1 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Quantity</span>
                      <span>× {orderDetails.teamMembers.length}</span>
                    </div>
                  )}
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-gray-700 pt-3">
                  <span>Total Amount</span>
                  <span className="text-green-400">₹{orderDetails.totalAmount}</span>
                </div>
              </div>

              <div className="mt-4 text-xs text-gray-500">
                Order ID: {orderNumber}
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-6">
              <h2 className="text-xl font-bold mb-6 text-purple-400">Review & Pay</h2>
              <p className="text-gray-400">You will be redirected to our secure payment gateway. No card or UPI details are collected on this site.</p>

              {/* Pay Button */}
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 px-6 rounded-lg transition-all mt-8"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </div>
                ) : (
                  `Pay ₹${orderDetails.totalAmount}`
                )}
              </button>

              <div className="mt-4 text-xs text-gray-500 text-center">
                By proceeding, you agree to our terms and conditions
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
