import React, { useState } from "react";
import { X, CheckCircle, XCircle, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { payWithPaystack } from "../lib/paystack";

const PAYSTACK_PUBLIC_KEY =
  import.meta.env.VITE_PAYSTACK_PUBLIC_KEY ||
  "pk_test_f8b87d2272ea878a7f3fa568ccd5eea55a5b5a40";

const PaymentModal = ({ isOpen, onClose, product }) => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState("phone"); // 'phone' | 'processing' | 'success' | 'failed'
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handlePayment = async () => {
    setError("");
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    setStep("processing");
    payWithPaystack({
      email,
      amount: product.price,
      publicKey: PAYSTACK_PUBLIC_KEY,
      onSuccess: async (reference) => {
        try {
          const res = await fetch("/api/paystack/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reference }),
          });
          const data = await res.json();
          if (data.success) {
            setStep("success");
          } else {
            setError("Payment verification failed");
            setStep("failed");
          }
        } catch (e) {
          setError("Network error verifying payment");
          setStep("failed");
        }
      },
      onClose: () => setStep("phone"),
    });
  };

  const handleClose = () => {
    setStep("phone");
    setEmail("");
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-lg font-semibold">Buy Now - Pay</h3>
        </div>

        {step === "phone" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-2"
              />
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount
              </label>
              <Input
                type="text"
                value={formatPrice(product.price)}
                disabled
                className="mb-2"
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            <Button onClick={handlePayment} className="w-full" size="lg">
              Pay with Paystack
            </Button>
          </div>
        )}

        {step === "processing" && (
          <div className="text-center space-y-4">
            <Loader className="w-16 h-16 text-blue-600 mx-auto animate-spin" />
            <div>
              <h4 className="text-lg font-medium text-gray-900">
                Processing Payment
              </h4>
              <p className="text-gray-600">
                Please wait while we process your payment
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Amount: {formatPrice(product.price)}
              </p>
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
            <div>
              <h4 className="text-lg font-medium text-gray-900">
                Payment Successful!
              </h4>
              <p className="text-gray-600">
                Your payment of {formatPrice(product.price)} has been processed
                successfully.
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

        {step === "failed" && (
          <div className="text-center space-y-4">
            <XCircle className="w-16 h-16 text-red-600 mx-auto" />
            <div>
              <h4 className="text-lg font-medium text-gray-900">
                Payment Failed
              </h4>
              <p className="text-gray-600">
                Your payment could not be processed. Please try again.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Ensure your payment details are correct and try again.
              </p>
            </div>
            <div className="space-y-2">
              <Button onClick={() => setStep("phone")} className="w-full">
                Try Again
              </Button>
              <Button
                onClick={handleClose}
                variant="outline"
                className="w-full"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
