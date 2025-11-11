import React, { useEffect } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const StatusLayout = ({ title, description, success }) => (
  <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
    <div className="max-w-md w-full mx-4">
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-8 text-center">
        <div className={`w-20 h-20 ${success ? 'bg-green-600/20' : 'bg-red-600/20'} rounded-full flex items-center justify-center mx-auto mb-6`}>
          {success ? <CheckCircle size={40} className="text-green-400" /> : <XCircle size={40} className="text-red-400" />}
        </div>
        <h2 className={`text-2xl font-bold mb-2 ${success ? 'text-green-400' : 'text-red-400'}`}>{title}</h2>
        <p className="text-gray-300 mb-4">{description}</p>
      </div>
    </div>
  </div>
);

export const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => navigate('/tickets'), 2000);
    return () => clearTimeout(t);
  }, [navigate]);
  return (
    <StatusLayout 
      title="Payment Successful!" 
      description="Redirecting to your tickets..." 
      success
    />
  );
};

export const PaymentFailurePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => navigate('/events'), 2500);
    return () => clearTimeout(t);
  }, [navigate]);
  return (
    <StatusLayout 
      title="Payment Failed" 
      description="Please try again or use a different method." 
    />
  );
};

export default PaymentSuccessPage;

