import { ChevronLeft, Trash2, Plus, Minus, ShoppingBag, Tag } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
}

interface ShoppingCartProps {
  cartItems: CartItem[];
  onBack: () => void;
  onUpdateQuantity: (id: string, size: string, quantity: number) => void;
  onRemoveItem: (id: string, size: string) => void;
  onProceedToCheckout: () => void;
}

export function ShoppingCart({ 
  cartItems, 
  onBack, 
  onUpdateQuantity, 
  onRemoveItem, 
  onProceedToCheckout 
}: ShoppingCartProps) {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 0 ? (subtotal > 2000 ? 0 : 50) : 0;
  const discount = 0; // Can add promo code logic later
  const total = subtotal + deliveryFee - discount;

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-0">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
                <ChevronLeft className="size-6" />
              </button>
              <h1 className="font-semibold">Shopping Cart</h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <ShoppingBag className="size-5" />
              <span>{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {cartItems.length === 0 ? (
          // Empty Cart State
          <div className="flex flex-col items-center justify-center py-20">
            <div className="size-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="size-12 text-gray-400" />
            </div>
            <h2 className="text-xl mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add items to get started</p>
            <button
              onClick={onBack}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}`} className="bg-white rounded-2xl p-4">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="size-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <ImageWithFallback 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-semibold mb-1">{item.name}</h3>
                          <p className="text-sm text-gray-600">Size: {item.size}</p>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.id, item.size)}
                          className="p-2 hover:bg-gray-100 rounded-lg text-red-600"
                        >
                          <Trash2 className="size-5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="text-lg text-blue-600">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 bg-gray-50 rounded-lg">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.size, Math.max(1, item.quantity - 1))}
                            className="size-8 flex items-center justify-center hover:bg-gray-200 rounded-lg"
                          >
                            <Minus className="size-4" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.size, Math.min(10, item.quantity + 1))}
                            className="size-8 flex items-center justify-center hover:bg-gray-200 rounded-lg"
                          >
                            <Plus className="size-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 sticky top-24">
                <h2 className="text-xl mb-6">Order Summary</h2>

                {/* Promo Code */}
                <div className="mb-6">
                  <div className="flex gap-2">
                    <div className="flex-1 flex items-center gap-2 px-4 py-3 border rounded-lg">
                      <Tag className="size-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Enter promo code"
                        className="flex-1 outline-none text-sm"
                      />
                    </div>
                    <button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                      Apply
                    </button>
                  </div>
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
                  {discount > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Discount</span>
                      <span className="text-green-600">-₹{discount.toLocaleString()}</span>
                    </div>
                  )}
                  {subtotal > 0 && subtotal <= 2000 && (
                    <div className="text-xs text-gray-500">
                      Add ₹{(2001 - subtotal).toLocaleString()} more for free delivery
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-lg mb-6">
                  <span>Total</span>
                  <span className="text-blue-600">₹{total.toLocaleString()}</span>
                </div>

                <button
                  onClick={onProceedToCheckout}
                  disabled={cartItems.length === 0}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Proceed to Checkout
                </button>

                <button
                  onClick={onBack}
                  className="w-full mt-3 py-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
