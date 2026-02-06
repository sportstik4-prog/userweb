import { useState } from 'react';
import { ChevronLeft, MapPin, Star, Clock, Users, Wifi, Car, Coffee, ShoppingBag, Share2, Heart, Calendar, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const venueData = {
  id: '1',
  name: 'Elite Sports Arena',
  images: [
    'https://images.unsplash.com/photo-1759733858225-f6d984629ea9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjB2ZW51ZSUyMGNyaWNrZXQlMjBmaWVsZHxlbnwxfHx8fDE3NzAxODI0NzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1712418516923-527799fb2bec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMHR1cmYlMjBmaWVsZHxlbnwxfHx8fDE3NzAxMTAwMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1624024834874-2a1611305604?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjBjb3VydCUyMGluZG9vcnxlbnwxfHx8fDE3NzAxNTI5MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  ],
  location: 'Koramangala, Bangalore',
  address: '123 Main Road, Koramangala 4th Block, Bangalore - 560034',
  rating: 4.8,
  reviews: 234,
  description: 'Elite Sports Arena is a premium multi-sport facility offering world-class infrastructure for cricket, football, and badminton. Our state-of-the-art grounds are professionally maintained and equipped with modern amenities to ensure the best sporting experience.',
  sports: [
    { name: 'Cricket', courts: 2 },
    { name: 'Football', courts: 1 },
    { name: 'Badminton', courts: 4 },
  ],
  amenities: [
    { name: 'Parking', icon: Car },
    { name: 'WiFi', icon: Wifi },
    { name: 'Cafe', icon: Coffee },
    { name: 'Pro Shop', icon: ShoppingBag },
  ],
  courts: [
    {
      id: 'c1',
      name: 'Cricket Ground 1',
      type: 'Cricket',
      image: 'https://images.unsplash.com/photo-1759733858225-f6d984629ea9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjB2ZW51ZSUyMGNyaWNrZXQlMjBmaWVsZHxlbnwxfHx8fDE3NzAxODI0NzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      capacity: '22 players',
      price: 800,
    },
    {
      id: 'c2',
      name: 'Football Turf',
      type: 'Football',
      image: 'https://images.unsplash.com/photo-1712418516923-527799fb2bec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMHR1cmYlMjBmaWVsZHxlbnwxfHx8fDE3NzAxMTAwMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      capacity: '14 players',
      price: 600,
    },
    {
      id: 'c3',
      name: 'Badminton Court 1-4',
      type: 'Badminton',
      image: 'https://images.unsplash.com/photo-1624024834874-2a1611305604?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjBjb3VydCUyMGluZG9vcnxlbnwxfHx8fDE3NzAxNTI5MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      capacity: '4 players per court',
      price: 400,
    },
  ],
  rules: [
    'Appropriate sports attire and footwear mandatory',
    'Outside food and beverages not allowed',
    'Smoking and alcohol strictly prohibited',
    'Booking cancellation must be done 24 hours in advance for full refund',
    'Maximum 15 minutes grace period after booking time',
  ],
  cancellationPolicy: 'Free cancellation up to 24 hours before booking. 50% refund for cancellations between 12-24 hours. No refund for cancellations within 12 hours.',
  openingHours: '6:00 AM - 11:00 PM',
};

const timeSlots = [
  '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
  '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM',
];

const reviews = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    rating: 5,
    date: 'Jan 28, 2026',
    comment: 'Excellent facility with well-maintained grounds. Staff is very professional and helpful.',
    avatar: '👨',
  },
  {
    id: '2',
    name: 'Priya Sharma',
    rating: 4,
    date: 'Jan 25, 2026',
    comment: 'Great place for badminton. Courts are in perfect condition. Only issue is parking can be tight during peak hours.',
    avatar: '👩',
  },
  {
    id: '3',
    name: 'Amit Patel',
    rating: 5,
    date: 'Jan 20, 2026',
    comment: 'Best cricket ground in the area. Love the floodlights for evening matches!',
    avatar: '👨',
  },
];

interface VenueDetailProps {
  onBack: () => void;
  onBookNow: () => void;
}

export function VenueDetail({ onBack, onBookNow }: VenueDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'courts' | 'reviews'>('overview');
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
              <ChevronLeft className="size-6" />
            </button>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Share2 className="size-6" />
              </button>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <Heart className={`size-6 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative h-80 bg-black">
        <ImageWithFallback
          src={venueData.images[currentImageIndex]}
          alt={venueData.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {venueData.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Venue Info */}
            <div className="bg-white rounded-xl p-6">
              <h1 className="text-2xl mb-2">{venueData.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="size-5 text-yellow-500 fill-yellow-500" />
                  <span>{venueData.rating}</span>
                  <span className="text-gray-500">({venueData.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <MapPin className="size-4" />
                  <span className="text-sm">{venueData.location}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {venueData.sports.map((sport) => (
                  <span
                    key={sport.name}
                    className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                  >
                    {sport.name} ({sport.courts} {sport.courts === 1 ? 'court' : 'courts'})
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-1 text-gray-600 text-sm">
                <Clock className="size-4" />
                <span>{venueData.openingHours}</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl overflow-hidden">
              <div className="flex border-b">
                {(['overview', 'courts', 'reviews'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3 px-4 capitalize ${
                      activeTab === tab
                        ? 'border-b-2 border-blue-600 text-blue-600'
                        : 'text-gray-600'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="mb-3">About</h3>
                      <p className="text-gray-600">{venueData.description}</p>
                    </div>

                    <div>
                      <h3 className="mb-3">Amenities</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {venueData.amenities.map((amenity) => (
                          <div
                            key={amenity.name}
                            className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg"
                          >
                            <amenity.icon className="size-5 text-blue-600" />
                            <span className="text-sm">{amenity.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-3">Rules & Regulations</h3>
                      <ul className="space-y-2">
                        {venueData.rules.map((rule, index) => (
                          <li key={index} className="flex gap-2 text-sm text-gray-600">
                            <span className="text-blue-600">•</span>
                            <span>{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="mb-3">Cancellation Policy</h3>
                      <p className="text-sm text-gray-600">{venueData.cancellationPolicy}</p>
                    </div>

                    <div>
                      <h3 className="mb-3">Location</h3>
                      <p className="text-sm text-gray-600 mb-3">{venueData.address}</p>
                      <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                        <MapPin className="size-8 text-gray-400" />
                        <span className="text-gray-500 ml-2">Map View</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'courts' && (
                  <div className="space-y-4">
                    {venueData.courts.map((court) => (
                      <div
                        key={court.id}
                        className="border border-gray-200 rounded-lg overflow-hidden"
                      >
                        <div className="flex flex-col sm:flex-row">
                          <div className="w-full sm:w-48 h-32 bg-gray-200 flex-shrink-0">
                            <ImageWithFallback
                              src={court.image}
                              alt={court.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-4 flex-1">
                            <h4 className="mb-1">{court.name}</h4>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                              <div className="flex items-center gap-1">
                                <Users className="size-4" />
                                {court.capacity}
                              </div>
                              <span className="text-blue-600">₹{court.price}/hr</span>
                            </div>
                            <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b">
                      <div>
                        <div className="text-3xl mb-1">{venueData.rating}</div>
                        <div className="flex items-center gap-1 mb-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`size-4 ${
                                star <= Math.round(venueData.rating)
                                  ? 'text-yellow-500 fill-yellow-500'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-gray-600">{venueData.reviews} reviews</div>
                      </div>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Write Review
                      </button>
                    </div>

                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-200 pb-4 last:border-0">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-xl">
                              {review.avatar}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span>{review.name}</span>
                                <span className="text-sm text-gray-500">{review.date}</span>
                              </div>
                              <div className="flex items-center gap-1 mb-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`size-3 ${
                                      star <= review.rating
                                        ? 'text-yellow-500 fill-yellow-500'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <p className="text-sm text-gray-600">{review.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 sticky top-24">
              <h3 className="mb-4">Book Your Slot</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">Select Sport</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg outline-none">
                    {venueData.sports.map((sport) => (
                      <option key={sport.name} value={sport.name}>
                        {sport.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-2">Select Court</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg outline-none">
                    {venueData.courts.map((court) => (
                      <option key={court.id} value={court.id}>
                        {court.name} - ₹{court.price}/hr
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-2">Select Date</label>
                  <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-3">
                    <Calendar className="size-5 text-gray-400" />
                    <input
                      type="date"
                      className="flex-1 outline-none"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2">Select Time Slot</label>
                  <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        className="p-2 text-sm border border-gray-300 rounded-lg hover:border-blue-600 hover:bg-blue-50 text-center"
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-600">Price</span>
                    <span className="text-xl">₹800</span>
                  </div>
                  <button
                    onClick={onBookNow}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                  >
                    Continue to Book
                    <ChevronRight className="size-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
