import React, { useState } from 'react';
import { X, Smartphone, CheckCircle, XCircle, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const PaymentModal = ({ isOpen, onClose, product }) => {
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' | 'processing' | 'success' | 'failed'
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handlePayment = async () => {
    setError('');
    
    // Validate phone number
    const phoneRegex = /^(\+254|0)[7-9]\d{8}$/;
    if (!phoneRegex.test(phone)) {
      setError('Please enter a valid Kenyan phone number');
      return;
    }

    setStep('processing');

    // Simulate payment processing
    setTimeout(() => {
      // Mock payment success/failure (80% success rate)
      const success = Math.random() > 0.2;
      setStep(success ? 'success' : 'failed');
    }, 3000);
  };

  const handleClose = () => {
    setStep('phone');
    setPhone('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-lg font-semibold">Buy Now - M-PESA Payment</h3>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Product Info */}
          <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-16 h-16 object-cover rounded-md"
            />
            <div>
              <h4 className="font-medium text-gray-900 line-clamp-2">{product.title}</h4>
              <p className="text-lg font-bold text-blue-600">{formatPrice(product.price)}</p>
            </div>
          </div>

          {step === 'phone' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  M-PESA Phone Number
                </label>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="tel"
                    placeholder="e.g., +254712345678 or 0712345678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10"
                  />
                </div>
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>How it works:</strong><br />
                  1. Enter your M-PESA registered phone number<br />
                  2. You'll receive an STK push notification<br />
                  3. Enter your M-PESA PIN to complete payment<br />
                  4. Get instant confirmation
                </p>
              </div>

              <Button onClick={handlePayment} className="w-full" size="lg">
                Pay {formatPrice(product.price)} via M-PESA
              </Button>
            </div>
          )}

          {step === 'processing' && (
            <div className="text-center space-y-4">
              <Loader className="w-16 h-16 text-blue-600 mx-auto animate-spin" />
              <div>
                <h4 className="text-lg font-medium text-gray-900">Processing Payment</h4>
                <p className="text-gray-600">
                  Check your phone for M-PESA prompt and enter your PIN
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Payment to: {phone}
                </p>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center space-y-4">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
              <div>
                <h4 className="text-lg font-medium text-gray-900">Payment Successful!</h4>
                <p className="text-gray-600">
                  Your payment of {formatPrice(product.price)} has been processed successfully.
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  The seller has been notified and will contact you shortly.
                </p>
              </div>
              <Button onClick={handleClose} className="w-full">
                Continue Shopping
              </Button>
            </div>
          )}

          {step === 'failed' && (
            <div className="text-center space-y-4">
              <XCircle className="w-16 h-16 text-red-600 mx-auto" />
              <div>
                <h4 className="text-lg font-medium text-gray-900">Payment Failed</h4>
                <p className="text-gray-600">
                  Your payment could not be processed. Please try again.
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Make sure you have sufficient M-PESA balance and try again.
                </p>
              </div>
              <div className="space-y-2">
                <Button onClick={() => setStep('phone')} className="w-full">
                  Try Again
                </Button>
                <Button onClick={handleClose} variant="outline" className="w-full">
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
