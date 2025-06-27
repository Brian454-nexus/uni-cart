// Paystack inline script loader and payment function
export function loadPaystackScript() {
  return new Promise((resolve) => {
    if (window.PaystackPop) return resolve(window.PaystackPop);
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.onload = () => resolve(window.PaystackPop);
    document.body.appendChild(script);
  });
}

export function payWithPaystack({
  email,
  amount,
  publicKey,
  onSuccess,
  onClose,
}) {
  loadPaystackScript().then(() => {
    const handler = window.PaystackPop.setup({
      key: publicKey,
      email,
      amount: amount * 100, // Paystack expects kobo
      currency: "KES",
      callback: function (response) {
        onSuccess(response.reference);
      },
      onClose,
    });
    handler.openIframe();
  });
}
