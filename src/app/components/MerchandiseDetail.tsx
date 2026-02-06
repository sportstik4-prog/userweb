import { useState } from 'react';
import { ChevronLeft, Star, Heart, Share2, ShoppingCart, ChevronRight, Package, Shield, RefreshCw } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Product data (in real app, this would come from API or props)
const productData = {
  m1: {
    id: 'm1',
    name: 'Pro Cricket Bat',
    price: 2499,
    originalPrice: 2940,
    discount: '15% Off',
    rating: 4.7,
    reviews: 342,
    category: 'Cricket',
    images: [
      'https://images.unsplash.com/photo-1765429154824-b4a7dd58f7c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmlja2V0JTIwYmF0JTIwZ2VhcnxlbnwxfHx8fDE3NzAyNzMxOTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1531415074968-7437e0a8f30f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxjcmlja2V0JTIwYmF0JTIwZ2VhcnxlbnwxfHx8fDE3NzAyNzMxOTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1540747913346-19e32778e8e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxjcmlja2V0JTIwYmF0fGVufDF8fHx8MTc3MDI3MzE5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Premium quality cricket bat crafted from high-grade English willow. Perfect weight balance for powerful shots and precise control. Ideal for intermediate to advanced players.',
    features: [
      'Grade 1 English Willow',
      'Professional weight balance',
      'Anti-scuff sheet protection',
      'Ergonomic grip design',
      'Pre-knocked and ready to play',
    ],
    sizes: ['Short Handle', 'Long Handle', 'Long Handle Light'],
    inStock: true,
  },
  m2: {
    id: 'm2',
    name: 'Elite Football Boots',
    price: 3299,
    originalPrice: 3299,
    discount: 'New',
    rating: 4.9,
    reviews: 567,
    category: 'Football',
    images: [
      'https://images.unsplash.com/photo-1614739947439-ad507bf07111?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMGJvb3RzJTIwc29jY2VyfGVufDF8fHx8MTc3MDI3MzE5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1595777216814-c9c069c38d51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxmb290YmFsbCUyMGJvb3RzfGVufDF8fHx8MTc3MDI3MzE5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxmb290YmFsbCUyMHNob2VzfGVufDF8fHx8MTc3MDI3MzE5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Professional-grade football boots with advanced grip technology for superior ball control and explosive speed on the field.',
    features: [
      'Flyknit upper for perfect fit',
      'Dynamic traction studs',
      'Breathable mesh panels',
      'Reinforced toe cap',
      'Lightweight design (230g)',
    ],
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    inStock: true,
  },
  m3: {
    id: 'm3',
    name: 'Graphite Tennis Racket',
    price: 5999,
    originalPrice: 5999,
    discount: 'Best Seller',
    rating: 4.8,
    reviews: 891,
    category: 'Tennis',
    images: [
      'https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjByYWNrZXQlMjBzcG9ydHN8ZW58MXx8fHwxNzcwMjM2NTAxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHx0ZW5uaXMlMjByYWNrZXR8ZW58MXx8fHwxNzcwMjM2NTAxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1617083278223-13e95d60d2ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHx0ZW5uaXMlMjByYWNrZXR8ZW58MXx8fHwxNzcwMjM2NTAxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Professional carbon graphite tennis racket with extended sweet spot. Designed for players who demand power and precision in every shot.',
    features: [
      '100% Carbon Graphite Frame',
      'Head size: 100 sq. inches',
      'Weight: 300g (unstrung)',
      'Includes premium cover',
      'Pre-strung with synthetic gut',
    ],
    sizes: ['Grip 3', 'Grip 4', 'Grip 5'],
    inStock: true,
  },
  m4: {
    id: 'm4',
    name: 'Competition Basketball',
    price: 1299,
    originalPrice: 1444,
    discount: '10% Off',
    rating: 4.6,
    reviews: 423,
    category: 'Basketball',
    images: [
      'https://images.unsplash.com/photo-1625038627556-966ed84eaa97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwYmFsbCUyMG9yYW5nZXxlbnwxfHx8fDE3NzAyNDk3ODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxiYXNrZXRiYWxsJTIwYmFsbHxlbnwxfHx8fDE3NzAyNDk3ODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Official size and weight basketball with superior grip and durability. Perfect for indoor and outdoor games.',
    features: [
      'Size 7 (Official)',
      'Composite leather cover',
      'Deep channel design',
      'All-surface performance',
      'Inflation pump included',
    ],
    sizes: ['Size 5', 'Size 6', 'Size 7'],
    inStock: true,
  },
  m5: {
    id: 'm5',
    name: 'Eco-Friendly Yoga Mat',
    price: 899,
    originalPrice: 899,
    discount: 'Eco',
    rating: 4.5,
    reviews: 234,
    category: 'Yoga',
    images: [
      'https://images.unsplash.com/photo-1767605523281-8b54b3692078?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwbWF0JTIwcm9sbGVkfGVufDF8fHx8MTc3MDI3MzE5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHx5b2dhJTIwbWF0fGVufDF8fHx8MTc3MDI3MzE5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Sustainable natural rubber yoga mat with superior cushioning and grip. Free from harmful chemicals and perfect for all yoga styles.',
    features: [
      'Natural tree rubber base',
      'Extra thick (6mm)',
      'Non-slip texture both sides',
      'Biodegradable materials',
      'Carrying strap included',
    ],
    sizes: ['Standard (183cm)', 'Long (200cm)'],
    inStock: true,
  },
  m6: {
    id: 'm6',
    name: 'Custom Team Jersey',
    price: 799,
    originalPrice: 799,
    discount: 'Customizable',
    rating: 4.7,
    reviews: 156,
    category: 'Apparel',
    images: [
      'https://images.unsplash.com/photo-1761751844072-120967509161?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBqZXJzZXklMjBhcHBhcmVsfGVufDF8fHx8MTc3MDI3MzE5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxzcG9ydHMlMjBqZXJzZXl8ZW58MXx8fHwxNzcwMjczMTk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'High-performance sports jersey with moisture-wicking technology. Customize with your team name and number.',
    features: [
      'Dri-FIT fabric technology',
      'Breathable mesh panels',
      'Customization available',
      'Fade-resistant colors',
      'Athletic fit design',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
  },
};

const relatedProducts = [
  {
    id: 'm2',
    name: 'Elite Football Boots',
    price: '₹3,299',
    image: 'https://images.unsplash.com/photo-1614739947439-ad507bf07111?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMGJvb3RzJTIwc29jY2VyfGVufDF8fHx8MTc3MDI3MzE5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'm3',
    name: 'Graphite Tennis Racket',
    price: '₹5,999',
    image: 'https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjByYWNrZXQlMjBzcG9ydHN8ZW58MXx8fHwxNzcwMjM2NTAxfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'm4',
    name: 'Competition Basketball',
    price: '₹1,299',
    image: 'https://images.unsplash.com/photo-1625038627556-966ed84eaa97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwYmFsbCUyMG9yYW5nZXxlbnwxfHx8fDE3NzAyNDk3ODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'm5',
    name: 'Eco-Friendly Yoga Mat',
    price: '₹899',
    image: 'https://images.unsplash.com/photo-1767605523281-8b54b3692078?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwbWF0JTIwcm9sbGVkfGVufDF8fHx8MTc3MDI3MzE5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

interface MerchandiseDetailProps {
  productId: string;
  onBack: () => void;
  onAddToCart: (item: { id: string; name: string; price: number; size: string; quantity: number; image: string }) => void;
  onNavigateToProduct: (productId: string) => void;
}

export function MerchandiseDetail({ productId, onBack, onAddToCart, onNavigateToProduct }: MerchandiseDetailProps) {
  const product = productData[productId as keyof typeof productData] || productData.m1;
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = () => {
    onAddToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      quantity,
      image: product.images[0],
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
                <ChevronLeft className="size-6" />
              </button>
              <h1 className="font-semibold">Product Details</h1>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Share2 className="size-5" />
              </button>
              <button 
                onClick={() => setIsFavorite(!isFavorite)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <Heart className={`size-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl overflow-hidden aspect-square">
              <ImageWithFallback 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-blue-600' : 'border-transparent'
                  }`}
                >
                  <ImageWithFallback 
                    src={image} 
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg">
                  {product.category}
                </span>
                {product.discount && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-lg">
                    {product.discount}
                  </span>
                )}
              </div>
              <h2 className="text-2xl mb-2">{product.name}</h2>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="size-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{product.rating}</span>
                </div>
                <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl">₹{product.price.toLocaleString()}</span>
              {product.originalPrice > product.price && (
                <span className="text-lg text-gray-500 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold mb-2">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="size-1.5 bg-blue-600 rounded-full mt-2"></div>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-semibold mb-3">Select {product.category === 'Apparel' || product.category === 'Football' ? 'Size' : 'Variant'}</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border transition-all ${
                      selectedSize === size
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-300 hover:border-blue-600'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="size-10 flex items-center justify-center border rounded-lg hover:bg-gray-50"
                >
                  -
                </button>
                <span className="text-lg w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  className="size-10 flex items-center justify-center border rounded-lg hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 py-4 border-t border-b">
              <div className="flex flex-col items-center text-center gap-2">
                <Package className="size-6 text-blue-600" />
                <span className="text-xs text-gray-600">Free Delivery</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <RefreshCw className="size-6 text-blue-600" />
                <span className="text-xs text-gray-600">7 Days Return</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <Shield className="size-6 text-blue-600" />
                <span className="text-xs text-gray-600">Secure Payment</span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-blue-600 text-white py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
            >
              <ShoppingCart className="size-5" />
              Add to Cart
            </button>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl">You May Also Like</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.filter(p => p.id !== productId).slice(0, 4).map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigateToProduct(item.id)}
                className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-shadow text-left"
              >
                <div className="aspect-square bg-gray-100">
                  <ImageWithFallback 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-sm mb-1 line-clamp-2">{item.name}</h3>
                  <p className="text-blue-600">{item.price}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
