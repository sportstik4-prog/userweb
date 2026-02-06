import { useState } from 'react';
import { ChevronLeft, Calendar, Clock, MapPin, Users, CreditCard, Wallet, Check, Download, Share2 } from 'lucide-react';

interface BookingFlowProps {
  onBack: () => void;
  onComplete: () => void;
}

export function BookingFlow({ onBack, onComplete }: BookingFlowProps) {
  const [step, setStep] = useState<'booking-type' | 'payment' | 'confirmation'>('booking-type');
  const [bookingType, setBookingType] = useState<'full' | 'split' | 'other'>('full');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'wallet'>('upi');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const bookingDetails = {
    venue: 'Elite Sports Arena',
    location: 'Koramangala, Bangalore',
    sport: 'Cricket',
    court: 'Cricket Ground 1',
    date: 'Feb 5, 2026',
    time: '6:00 PM - 7:00 PM',
    price: 800,
    discount: 0,
  };

  const applyPromo = () => {
    if (promoCode === 'FIRST50') {
      bookingDetails.discount = bookingDetails.price * 0.5;
      setPromoApplied(true);
    }
  };

  const totalAmount = bookingType === 'split' 
    ? (bookingDetails.price - bookingDetails.discount) / 11 
    : bookingDetails.price - bookingDetails.discount;

  const handlePayment = () => {
    setStep('confirmation');
  };

  if (step === 'booking-type') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b sticky top-0 z-10">
          <div className="max-w-3xl mx-auto px-4 py-4">
            <div className="flex items-center gap-3">
              <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
                <ChevronLeft className="size-6" />
              </button>
              <h1 className="text-xl">Complete Booking</h1>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-6">
          {/* Booking Summary */}
          <div className="bg-white rounded-xl p-6 mb-6">
            <h2 className="mb-4">Booking Summary</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="size-5 text-gray-400 mt-0.5" />
                <div>
                  <div>{bookingDetails.venue}</div>
                  <div className="text-sm text-gray-600">{bookingDetails.location}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="size-5 text-gray-400" />
                <span>{bookingDetails.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="size-5 text-gray-400" />
                <span>{bookingDetails.time}</span>
              </div>
              <div className="pt-3 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Court</span>
                  <span>{bookingDetails.court}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Type Selection */}
          <div className="bg-white rounded-xl p-6 mb-6">
            <h2 className="mb-4">Choose Booking Type</h2>
            <div className="space-y-3">
              <button
                onClick={() => setBookingType('full')}
                className={`w-full p-4 border rounded-lg text-left transition-all ${
                  bookingType === 'full'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-300 hover:border-blue-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span>Full Booking</span>
                  {bookingType === 'full' && <Check className="size-5 text-blue-600" />}
                </div>
                <p className="text-sm text-gray-600">Book the entire court for yourself and your team</p>
                <div className="mt-2 text-blue-600">₹{bookingDetails.price}</div>
              </button>

              <button
                onClick={() => setBookingType('split')}
                className={`w-full p-4 border rounded-lg text-left transition-all ${
                  bookingType === 'split'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-300 hover:border-blue-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span>Per-Player Split (11 players)</span>
                  {bookingType === 'split' && <Check className="size-5 text-blue-600" />}
                </div>
                <p className="text-sm text-gray-600">Split the cost among all players (Cricket team)</p>
                <div className="mt-2 text-blue-600">₹{Math.round(bookingDetails.price / 11)} per player</div>
              </button>

              <button
                onClick={() => setBookingType('other')}
                className={`w-full p-4 border rounded-lg text-left transition-all ${
                  bookingType === 'other'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-300 hover:border-blue-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span>Custom Split</span>
                  {bookingType === 'other' && <Check className="size-5 text-blue-600" />}
                </div>
                <p className="text-sm text-gray-600">Specify custom number of players</p>
              </button>
            </div>
          </div>

          {/* Promo Code */}
          <div className="bg-white rounded-xl p-6 mb-6">
            <h2 className="mb-4">Apply Promo Code</h2>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                className="flex-1 p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-600"
              />
              <button
                onClick={applyPromo}
                disabled={promoApplied}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {promoApplied ? 'Applied' : 'Apply'}
              </button>
            </div>
            {promoApplied && (
              <div className="mt-2 text-sm text-green-600 flex items-center gap-1">
                <Check className="size-4" />
                Promo code applied successfully!
              </div>
            )}
          </div>

          {/* Price Breakdown */}
          <div className="bg-white rounded-xl p-6 mb-6">
            <h2 className="mb-4">Price Breakdown</h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-gray-600">
                <span>Court Fee</span>
                <span>₹{bookingDetails.price}</span>
              </div>
              {bookingDetails.discount > 0 && (
                <div className="flex items-center justify-between text-green-600">
                  <span>Discount</span>
                  <span>-₹{bookingDetails.discount}</span>
                </div>
              )}
              {bookingType === 'split' && (
                <div className="flex items-center justify-between text-gray-600">
                  <span>Split among 11 players</span>
                  <span>÷ 11</span>
                </div>
              )}
              <div className="pt-2 border-t flex items-center justify-between">
                <span>Total Amount</span>
                <span className="text-xl">₹{Math.round(totalAmount)}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setStep('payment')}
            className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700"
          >
            Continue to Payment
          </button>
        </div>
      </div>
    );
  }

  if (step === 'payment') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b sticky top-0 z-10">
          <div className="max-w-3xl mx-auto px-4 py-4">
            <div className="flex items-center gap-3">
              <button onClick={() => setStep('booking-type')} className="p-2 hover:bg-gray-100 rounded-full">
                <ChevronLeft className="size-6" />
              </button>
              <h1 className="text-xl">Payment</h1>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-6">
          {/* Payment Method Selection */}
          <div className="bg-white rounded-xl p-6 mb-6">
            <h2 className="mb-4">Select Payment Method</h2>
            <div className="space-y-3">
              <button
                onClick={() => setPaymentMethod('upi')}
                className={`w-full p-4 border rounded-lg text-left transition-all ${
                  paymentMethod === 'upi'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-300 hover:border-blue-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <CreditCard className="size-5 text-purple-600" />
                    </div>
                    <span>UPI</span>
                  </div>
                  {paymentMethod === 'upi' && <Check className="size-5 text-blue-600" />}
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod('card')}
                className={`w-full p-4 border rounded-lg text-left transition-all ${
                  paymentMethod === 'card'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-300 hover:border-blue-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <CreditCard className="size-5 text-blue-600" />
                    </div>
                    <span>Credit/Debit Card</span>
                  </div>
                  {paymentMethod === 'card' && <Check className="size-5 text-blue-600" />}
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod('wallet')}
                className={`w-full p-4 border rounded-lg text-left transition-all ${
                  paymentMethod === 'wallet'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-300 hover:border-blue-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Wallet className="size-5 text-green-600" />
                    </div>
                    <div>
                      <div>Wallet</div>
                      <div className="text-sm text-gray-600">Balance: ₹1,200</div>
                    </div>
                  </div>
                  {paymentMethod === 'wallet' && <Check className="size-5 text-blue-600" />}
                </div>
              </button>
            </div>
          </div>

          {/* Payment Details Form */}
          {paymentMethod === 'card' && (
            <div className="bg-white rounded-xl p-6 mb-6">
              <h2 className="mb-4">Card Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-600"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-600"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-2">Cardholder Name</label>
                  <input
                    type="text"
                    placeholder="Name on card"
                    className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-600"
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'upi' && (
            <div className="bg-white rounded-xl p-6 mb-6">
              <h2 className="mb-4">UPI Details</h2>
              <div>
                <label className="block text-sm mb-2">UPI ID</label>
                <input
                  type="text"
                  placeholder="yourname@upi"
                  className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-600"
                />
              </div>
            </div>
          )}

          {/* Amount Summary */}
          <div className="bg-white rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600">Amount to Pay</span>
              <span className="text-2xl">₹{Math.round(totalAmount)}</span>
            </div>
          </div>

          <button
            onClick={handlePayment}
            className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700"
          >
            Pay Now
          </button>
        </div>
      </div>
    );
  }

  // Confirmation step
  const bookingId = 'SPT' + Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-xl p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="size-10 text-green-600" />
          </div>
          <h1 className="text-2xl mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600">Your court has been successfully booked</p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
            <span className="text-gray-600">Booking ID</span>
            <span className="font-mono">{bookingId}</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="size-5 text-gray-400 mt-0.5" />
              <div>
                <div>{bookingDetails.venue}</div>
                <div className="text-sm text-gray-600">{bookingDetails.location}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="size-5 text-gray-400" />
              <span>{bookingDetails.date}</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="size-5 text-gray-400" />
              <span>{bookingDetails.time}</span>
            </div>
            <div className="flex items-center gap-3">
              <Users className="size-5 text-gray-400" />
              <span>{bookingDetails.court}</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Amount Paid</span>
              <span className="text-xl text-green-600">₹{Math.round(totalAmount)}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <button className="flex flex-col items-center gap-2 p-4 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="size-5 text-gray-600" />
            <span className="text-sm">Download</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Share2 className="size-5 text-gray-600" />
            <span className="text-sm">Share</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Calendar className="size-5 text-gray-600" />
            <span className="text-sm">Add to Calendar</span>
          </button>
        </div>

        <button
          onClick={onComplete}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
