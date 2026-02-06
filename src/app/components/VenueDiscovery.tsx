import { useState } from 'react';
import { Search, SlidersHorizontal, MapPin, Star, X, ChevronLeft } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const allVenues = [
  {
    id: '1',
    name: 'Elite Sports Arena',
    image: 'https://images.unsplash.com/photo-1759733858225-f6d984629ea9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjB2ZW51ZSUyMGNyaWNrZXQlMjBmaWVsZHxlbnwxfHx8fDE3NzAxODI0NzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    location: 'Koramangala, Bangalore',
    sports: ['Cricket', 'Football'],
    rating: 4.8,
    reviews: 234,
    price: 800,
    distance: 2.3,
    isIndoor: false,
    amenities: ['Parking', 'Changing Room', 'Cafe'],
  },
  {
    id: '2',
    name: 'Champions Football Turf',
    image: 'https://images.unsplash.com/photo-1712418516923-527799fb2bec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMHR1cmYlMjBmaWVsZHxlbnwxfHx8fDE3NzAxMTAwMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    location: 'Indiranagar, Bangalore',
    sports: ['Football'],
    rating: 4.6,
    reviews: 156,
    price: 600,
    distance: 3.1,
    isIndoor: false,
    amenities: ['Parking', 'Changing Room'],
  },
  {
    id: '3',
    name: 'Ace Badminton Academy',
    image: 'https://images.unsplash.com/photo-1624024834874-2a1611305604?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjBjb3VydCUyMGluZG9vcnxlbnwxfHx8fDE3NzAxNTI5MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    location: 'HSR Layout, Bangalore',
    sports: ['Badminton'],
    rating: 4.9,
    reviews: 189,
    price: 400,
    distance: 1.8,
    isIndoor: true,
    amenities: ['Parking', 'Changing Room', 'Cafe', 'Pro Shop'],
  },
  {
    id: '4',
    name: 'Grand Slam Tennis Courts',
    image: 'https://images.unsplash.com/photo-1766675122854-28fc70f50132?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjBjb3VydCUyMG91dGRvb3J8ZW58MXx8fHwxNzcwMTMxNTM2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    location: 'Whitefield, Bangalore',
    sports: ['Tennis'],
    rating: 4.7,
    reviews: 112,
    price: 500,
    distance: 4.5,
    isIndoor: false,
    amenities: ['Parking', 'Changing Room', 'Coaching'],
  },
  {
    id: '5',
    name: 'AquaFit Swimming Complex',
    image: 'https://images.unsplash.com/photo-1680609989998-6183fcea718b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2ltbWluZyUyMHBvb2wlMjBpbmRvb3J8ZW58MXx8fHwxNzcwMTc0MDExfDA&ixlib=rb-4.1.0&q=80&w=1080',
    location: 'Jayanagar, Bangalore',
    sports: ['Swimming'],
    rating: 4.8,
    reviews: 201,
    price: 300,
    distance: 3.8,
    isIndoor: true,
    amenities: ['Parking', 'Changing Room', 'Lockers', 'Shower'],
  },
  {
    id: '6',
    name: 'Hoops Basketball Arena',
    image: 'https://images.unsplash.com/photo-1710378844976-93a6538671ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwY291cnQlMjBpbmRvb3J8ZW58MXx8fHwxNzcwMTE1OTQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    location: 'BTM Layout, Bangalore',
    sports: ['Basketball'],
    rating: 4.5,
    reviews: 98,
    price: 700,
    distance: 2.9,
    isIndoor: true,
    amenities: ['Parking', 'Changing Room', 'Cafe'],
  },
];

const sportTypes = ['All', 'Cricket', 'Football', 'Badminton', 'Tennis', 'Basketball', 'Swimming'];

interface VenueDiscoveryProps {
  onSelectVenue: (venueId: string) => void;
  onBack: () => void;
}

export function VenueDiscovery({ onSelectVenue, onBack }: VenueDiscoveryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    sport: 'All',
    distance: 10,
    priceRange: [0, 1000],
    isIndoor: null as boolean | null,
    rating: 0,
    sortBy: 'distance',
  });

  const filteredVenues = allVenues.filter((venue) => {
    const matchesSearch = venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         venue.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSport = filters.sport === 'All' || venue.sports.includes(filters.sport);
    const matchesDistance = venue.distance <= filters.distance;
    const matchesPrice = venue.price >= filters.priceRange[0] && venue.price <= filters.priceRange[1];
    const matchesIndoor = filters.isIndoor === null || venue.isIndoor === filters.isIndoor;
    const matchesRating = venue.rating >= filters.rating;

    return matchesSearch && matchesSport && matchesDistance && matchesPrice && matchesIndoor && matchesRating;
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case 'distance':
        return a.distance - b.distance;
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
              <ChevronLeft className="size-6" />
            </button>
            <h1 className="text-xl">Find Venues</h1>
          </div>

          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search venues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-600"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <SlidersHorizontal className="size-5" />
              Filters
            </button>
          </div>

          {/* Sport Filters */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
            {sportTypes.map((sport) => (
              <button
                key={sport}
                onClick={() => setFilters({ ...filters, sport })}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                  filters.sport === sport
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {sport}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="fixed inset-0 bg-black/50 z-20" onClick={() => setShowFilters(false)}>
          <div
            className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl">Filters</h2>
                <button onClick={() => setShowFilters(false)}>
                  <X className="size-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Distance Filter */}
                <div>
                  <label className="block mb-2">Distance (within {filters.distance} km)</label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={filters.distance}
                    onChange={(e) => setFilters({ ...filters, distance: Number(e.target.value) })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>1 km</span>
                    <span>20 km</span>
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block mb-2">
                    Price Range (₹{filters.priceRange[0]} - ₹{filters.priceRange[1]})
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="100"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters({ ...filters, priceRange: [0, Number(e.target.value)] })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₹0</span>
                    <span>₹1000+</span>
                  </div>
                </div>

                {/* Indoor/Outdoor */}
                <div>
                  <label className="block mb-2">Venue Type</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setFilters({ ...filters, isIndoor: null })}
                      className={`flex-1 py-2 px-4 rounded-lg border ${
                        filters.isIndoor === null
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-300'
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setFilters({ ...filters, isIndoor: true })}
                      className={`flex-1 py-2 px-4 rounded-lg border ${
                        filters.isIndoor === true
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-300'
                      }`}
                    >
                      Indoor
                    </button>
                    <button
                      onClick={() => setFilters({ ...filters, isIndoor: false })}
                      className={`flex-1 py-2 px-4 rounded-lg border ${
                        filters.isIndoor === false
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-300'
                      }`}
                    >
                      Outdoor
                    </button>
                  </div>
                </div>

                {/* Minimum Rating */}
                <div>
                  <label className="block mb-2">Minimum Rating</label>
                  <div className="flex gap-2">
                    {[0, 3, 4, 4.5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setFilters({ ...filters, rating })}
                        className={`flex-1 py-2 px-4 rounded-lg border ${
                          filters.rating === rating
                            ? 'border-blue-600 bg-blue-50 text-blue-600'
                            : 'border-gray-300'
                        }`}
                      >
                        {rating === 0 ? 'All' : `${rating}+`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block mb-2">Sort By</label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg outline-none"
                  >
                    <option value="distance">Nearest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>

                <button
                  onClick={() => setShowFilters(false)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Venue List */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-4 text-gray-600">
          {filteredVenues.length} venues found
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVenues.map((venue) => (
            <div
              key={venue.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onSelectVenue(venue.id)}
            >
              <div className="relative h-48">
                <ImageWithFallback
                  src={venue.image}
                  alt={venue.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs">
                  {venue.distance} km
                </div>
                <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs">
                  {venue.isIndoor ? 'Indoor' : 'Outdoor'}
                </div>
              </div>
              <div className="p-4">
                <h3 className="mb-1">{venue.name}</h3>
                <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                  <MapPin className="size-3" />
                  {venue.location}
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {venue.sports.map((sport) => (
                    <span
                      key={sport}
                      className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                    >
                      {sport}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="size-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm">{venue.rating}</span>
                    <span className="text-xs text-gray-500">({venue.reviews})</span>
                  </div>
                  <span className="text-blue-600">₹{venue.price}/hr</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
