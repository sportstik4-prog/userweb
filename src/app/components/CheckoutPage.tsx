import { useState } from 'react';
import { ChevronLeft, CreditCard, Wallet, Building, CheckCircle2, MapPin, Phone, Mail, User as UserIcon } from 'lucide-react';
import { CartItem } from './ShoppingCart';

interface CheckoutPageProps {
  cartItems: CartItem[];
  onBack: () => void;
  onOrderComplete: () => void;
}

export function CheckoutPage({ cartItems, onBack, onOrderComplete }: CheckoutPageProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod'>('card');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 2000 ? 0 : 50;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      onOrderComplete();
    }, 3000);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 text-center">
          <div className="size-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="size-10 text-green-600" />
          </div>
          <h2 className="text-2xl mb-3">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your order. You'll receive a confirmation email shortly.
          </p>
          <div className="p-4 bg-gray-50 rounded-xl mb-6">
            <div className="text-sm text-gray-600 mb-1">Order Number</div>
            <div className="text-xl text-blue-600">#SPT{Math.floor(Math.random() * 100000)}</div>
          </div>
          <button
            onClick={onOrderComplete}
            className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-0">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
              <ChevronLeft className="size-6" />
            </button>
            <h1 className="font-semibold">Checkout</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <div className="bg-white rounded-2xl p-6">
              <h2 className="text-xl mb-4 flex items-center gap-2">
                <MapPin className="size-5 text-blue-600" />
                Delivery Address
              </h2>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Full Name</label>
                    <div className="flex items-center gap-2 px-4 py-3 border rounded-lg">
                      <UserIcon className="size-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="flex-1 outline-none"
                        defaultValue="John Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Phone Number</label>
                    <div className="flex items-center gap-2 px-4 py-3 border rounded-lg">
                      <Phone className="size-4 text-gray-400" />
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        className="flex-1 outline-none"
                        defaultValue="+91 98765 43210"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Email</label>
                  <div className="flex items-center gap-2 px-4 py-3 border rounded-lg">
                    <Mail className="size-4 text-gray-400" />
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="flex-1 outline-none"
                      defaultValue="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Address Line 1</label>
                  <input
                    type="text"
                    placeholder="House No., Street Name"
                    className="w-full px-4 py-3 border rounded-lg outline-none focus:border-blue-600"
                    defaultValue="123, MG Road"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Address Line 2</label>
                  <input
                    type="text"
                    placeholder="Landmark, Area"
                    className="w-full px-4 py-3 border rounded-lg outline-none focus:border-blue-600"
                    defaultValue="Near City Mall"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">City</label>
                    <input
                      type="text"
                      placeholder="City"
                      className="w-full px-4 py-3 border rounded-lg outline-none focus:border-blue-600"
                      defaultValue="Bangalore"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">State</label>
                    <input
                      type="text"
                      placeholder="State"
                      className="w-full px-4 py-3 border rounded-lg outline-none focus:border-blue-600"
                      defaultValue="Karnataka"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Pincode</label>
                    <input
                      type="text"
                      placeholder="560001"
                      className="w-full px-4 py-3 border rounded-lg outline-none focus:border-blue-600"
                      defaultValue="560001"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl p-6">
              <h2 className="text-xl mb-4">Payment Method</h2>
              
              <div className="space-y-3 mb-6">
                {/* Card Payment */}
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`w-full p-4 border-2 rounded-xl flex items-center gap-3 transition-all ${
                    paymentMethod === 'card' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <div className={`size-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === 'card' ? 'border-blue-600' : 'border-gray-300'
                  }`}>
                    {paymentMethod === 'card' && <div className="size-3 bg-blue-600 rounded-full"></div>}
                  </div>
                  <CreditCard className="size-5 text-gray-600" />
                  <span className="flex-1 text-left">Credit / Debit Card</span>
                </button>

                {/* UPI Payment */}
                <button
                  onClick={() => setPaymentMethod('upi')}
                  className={`w-full p-4 border-2 rounded-xl flex items-center gap-3 transition-all ${
                    paymentMethod === 'upi' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <div className={`size-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === 'upi' ? 'border-blue-600' : 'border-gray-300'
                  }`}>
                    {paymentMethod === 'upi' && <div className="size-3 bg-blue-600 rounded-full"></div>}
                  </div>
                  <Wallet className="size-5 text-gray-600" />
                  <span className="flex-1 text-left">UPI / Wallet</span>
                </button>

                {/* Cash on Delivery */}
                <button
                  onClick={() => setPaymentMethod('cod')}
                  className={`w-full p-4 border-2 rounded-xl flex items-center gap-3 transition-all ${
                    paymentMethod === 'cod' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <div className={`size-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === 'cod' ? 'border-blue-600' : 'border-gray-300'
                  }`}>
                    {paymentMethod === 'cod' && <div className="size-3 bg-blue-600 rounded-full"></div>}
                  </div>
                  <Building className="size-5 text-gray-600" />
                  <span className="flex-1 text-left">Cash on Delivery</span>
                </button>
              </div>

              {/* Card Details (if card selected) */}
              {paymentMethod === 'card' && (
                <div className="space-y-4 pt-4 border-t">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 border rounded-lg outline-none focus:border-blue-600"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 border rounded-lg outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-3 border rounded-lg outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="JOHN DOE"
                      className="w-full px-4 py-3 border rounded-lg outline-none focus:border-blue-600"
                    />
                  </div>
                </div>
              )}

              {/* UPI Details (if UPI selected) */}
              {paymentMethod === 'upi' && (
                <div className="space-y-4 pt-4 border-t">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">UPI ID</label>
                    <input
                      type="text"
                      placeholder="yourname@upi"
                      className="w-full px-4 py-3 border rounded-lg outline-none focus:border-blue-600"
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    You will be redirected to verify your UPI payment after placing the order.
                  </p>
                </div>
              )}

              {/* COD Message */}
              {paymentMethod === 'cod' && (
                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-600">
                    Pay with cash when your order is delivered. Please keep exact change handy.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl mb-4">Order Summary</h2>

              {/* Items */}
              <div className="space-y-3 mb-6 pb-6 border-b max-h-60 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-3">
                    <div className="size-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm line-clamp-1">{item.name}</h3>
                      <p className="text-xs text-gray-500">Size: {item.size}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                        <span className="text-sm">₹{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6 pb-6 border-b">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className={deliveryFee === 0 ? 'text-green-600' : ''}>
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-lg mb-6">
                <span>Total</span>
                <span className="text-blue-600">₹{total.toLocaleString()}</span>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Place Order
              </button>

              <p className="text-xs text-center text-gray-500 mt-4">
                By placing this order, you agree to our Terms & Conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
