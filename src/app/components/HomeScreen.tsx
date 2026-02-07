import { useState } from 'react';
import { Search, MapPin, ChevronDown, Bell, User as UserIcon, Star, Clock, Users, TrendingUp, Calendar, ShoppingBag, ChevronRight, Utensils } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const sportCategories = [
  { id: 'cricket', name: 'Cricket', icon: '🏏', color: 'bg-orange-100' },
  { id: 'football', name: 'Football', icon: '⚽', color: 'bg-green-100' },
  { id: 'badminton', name: 'Badminton', icon: '🏸', color: 'bg-purple-100' },
  { id: 'tennis', name: 'Tennis', icon: '🎾', color: 'bg-yellow-100' },
  { id: 'basketball', name: 'Basketball', icon: '🏀', color: 'bg-orange-100' },
  { id: 'volleyball', name: 'Volleyball', icon: '🏐', color: 'bg-blue-100' },
  { id: 'swimming', name: 'Swimming', icon: '🏊', color: 'bg-cyan-100' },
  { id: 'yoga', name: 'Yoga', icon: '🧘', color: 'bg-pink-100' },
];

const featuredVenues = [
  {
    id: '1',
    name: 'Elite Sports Arena',
    image: 'https://images.unsplash.com/photo-1759733858225-f6d984629ea9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjB2ZW51ZSUyMGNyaWNrZXQlMjBmaWVsZHxlbnwxfHx8fDE3NzAxODI0NzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    location: 'Koramangala, Bangalore',
    sports: ['Cricket', 'Football'],
    rating: 4.8,
    reviews: 234,
    price: '₹800/hr',
    distance: '2.3 km',
    isPremium: true,
  },
  {
    id: '2',
    name: 'Champions Football Turf',
    image: 'https://images.unsplash.com/photo-1712418516923-527799fb2bec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMHR1cmYlMjBmaWVsZHxlbnwxfHx8fDE3NzAxMTAwMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    location: 'Indiranagar, Bangalore',
    sports: ['Football'],
    rating: 4.6,
    reviews: 156,
    price: '₹600/hr',
    distance: '3.1 km',
    isPremium: false,
  },
  {
    id: '3',
    name: 'Ace Badminton Academy',
    image: 'https://images.unsplash.com/photo-1624024834874-2a1611305604?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjBjb3VydCUyMGluZG9vcnxlbnwxfHx8fDE3NzAxNTI5MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    location: 'HSR Layout, Bangalore',
    sports: ['Badminton'],
    rating: 4.9,
    reviews: 189,
    price: '₹400/hr',
    distance: '1.8 km',
    isPremium: true,
  },
  {
    id: '4',
    name: 'Grand Slam Tennis Courts',
    image: 'https://images.unsplash.com/photo-1766675122854-28fc70f50132?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjBjb3VydCUyMG91dGRvb3J8ZW58MXx8fHwxNzcwMTMxNTM2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    location: 'Whitefield, Bangalore',
    sports: ['Tennis'],
    rating: 4.7,
    reviews: 112,
    price: '₹500/hr',
    distance: '4.5 km',
    isPremium: false,
  },
];

const upcomingGames = [
  {
    id: '1',
    sport: 'Cricket',
    icon: '🏏',
    title: 'Evening Cricket Match',
    venue: 'Elite Sports Arena',
    date: 'Today',
    time: '6:00 PM',
    players: '8/11',
    costPerPlayer: '₹150',
    skillLevel: 'Intermediate',
  },
  {
    id: '2',
    sport: 'Football',
    icon: '⚽',
    title: 'Weekend Football',
    venue: 'Champions Football Turf',
    date: 'Tomorrow',
    time: '7:00 AM',
    players: '10/11',
    costPerPlayer: '₹100',
    skillLevel: 'All Levels',
  },
  {
    id: '3',
    sport: 'Badminton',
    icon: '🏸',
    title: 'Doubles Practice',
    venue: 'Ace Badminton Academy',
    date: 'Feb 6',
    time: '5:30 PM',
    players: '3/4',
    costPerPlayer: '₹200',
    skillLevel: 'Advanced',
  },
];

const sportsMerchandise = [
  {
    id: 'm1',
    name: 'Pro Cricket Bat',
    price: '₹2,499',
    category: 'Cricket',
    image: 'https://images.unsplash.com/photo-1765429154824-b4a7dd58f7c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmlja2V0JTIwYmF0JTIwZ2VhcnxlbnwxfHx8fDE3NzAyNzMxOTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    discount: '15% Off',
  },
  {
    id: 'm2',
    name: 'Elite Football Boots',
    price: '₹3,299',
    category: 'Football',
    image: 'https://images.unsplash.com/photo-1614739947439-ad507bf07111?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMGJvb3RzJTIwc29jY2VyfGVufDF8fHx8MTc3MDI3MzE5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    discount: 'New',
  },
  {
    id: 'm3',
    name: 'Graphite Tennis Racket',
    price: '₹5,999',
    category: 'Tennis',
    image: 'https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjByYWNrZXQlMjBzcG9ydHN8ZW58MXx8fHwxNzcwMjM2NTAxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    discount: 'Best Seller',
  },
  {
    id: 'm4',
    name: 'Competition Basketball',
    price: '₹1,299',
    category: 'Basketball',
    image: 'https://images.unsplash.com/photo-1625038627556-966ed84eaa97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwYmFsbCUyMG9yYW5nZXxlbnwxfHx8fDE3NzAyNDk3ODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    discount: '10% Off',
  },
  {
    id: 'm5',
    name: 'Eco-Friendly Yoga Mat',
    price: '₹899',
    category: 'Yoga',
    image: 'https://images.unsplash.com/photo-1767605523281-8b54b3692078?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwbWF0JTIwcm9sbGVkfGVufDF8fHx8MTc3MDI3MzE5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    discount: 'Eco',
  },
  {
    id: 'm6',
    name: 'Custom Team Jersey',
    price: '₹799',
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1761751844072-120967509161?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBqZXJzZXklMjBhcHBhcmVsfGVufDF8fHx8MTc3MDI3MzE5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    discount: 'Customizable',
  },
];

const sportsFoods = [
  {
    id: 'f1',
    name: 'Whey Protein Isolate',
    price: '₹1,899',
    category: 'Supplements',
    image: 'https://images.unsplash.com/photo-1680265158261-5fd6ba5d9959?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGV5JTIwcHJvdGVpbiUyMHBvd2RlciUyMHNjb29wfGVufDF8fHx8MTc3MDI3MzU1OXww&ixlib=rb-4.1.0&q=80&w=1080',
    tag: 'High Protein',
  },
  {
    id: 'f2',
    name: 'Oat & Nut Energy Bar',
    price: '₹99',
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1704650312560-4414980bab95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm90ZWluJTIwYmFyJTIwbnV0cml0aW9ufGVufDF8fHx8MTc3MDI1OTMwOHww&ixlib=rb-4.1.0&q=80&w=1080',
    tag: 'Pre-Workout',
  },
  {
    id: 'f3',
    name: 'Isotonic Electrolyte Drink',
    price: '₹45',
    category: 'Hydration',
    image: 'https://images.unsplash.com/photo-1707910393331-0145331bc039?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc290b25pYyUyMGRyaW5rJTIwYm90dGxlfGVufDF8fHx8MTc3MDI3MzU1OXww&ixlib=rb-4.1.0&q=80&w=1080',
    tag: 'Recovery',
  },
  {
    id: 'f4',
    name: 'Quinoa & Avocado Bowl',
    price: '₹249',
    category: 'Meals',
    image: 'https://images.unsplash.com/photo-1723985021773-d1f4c4ebfdd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwc2FsYWQlMjBib3dsJTIwc3BvcnR8ZW58MXx8fHwxNzcwMjczNTU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    tag: 'Organic',
  },
  {
    id: 'f5',
    name: 'Natural Trail Mix',
    price: '₹149',
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1767877609689-beff32b9c0ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwdHJhaWwlMjBtaXglMjBzbmFja3xlbnwxfHx8fDE3NzAyNzM1NTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tag: 'Fiber Rich',
  },
  {
    id: 'f6',
    name: 'BCAA Recovery Formula',
    price: '₹1,249',
    category: 'Supplements',
    image: 'https://images.unsplash.com/photo-1653862493696-f635ffe46b9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmVyZ3klMjBkcmluayUyMHNwb3J0c3xlbnwxfHx8fDE3NzAyNzM1NTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tag: 'Zero Sugar',
  },
];

const offers = [
  {
    id: '1',
    title: 'New User Special',
    description: 'Get 50% off on your first booking',
    code: 'FIRST50',
    color: 'bg-gradient-to-r from-purple-500 to-pink-500',
  },
  {
    id: '2',
    title: 'Weekend Offer',
    description: 'Book 2 hours, get 1 hour free',
    code: 'WEEKEND',
    color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
  },
];

interface HomeScreenProps {
  onNavigate: (page: string, productId?: string) => void;
  onJoinGame: (gameId: string) => void;
}

export function HomeScreen({ onNavigate, onJoinGame }: HomeScreenProps) {
  const [location, setLocation] = useState('Hadapsar, Pune');
  const [searchQuery, setSearchQuery] = useState('');

  const handleMerchandiseClick = (productId: string) => {
    onNavigate('merchandise-detail', productId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <img
              src="\src\app\assets\images\logos\logo1.png"
              alt="Sportstik"
              className="h-10"              
            />
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-full relative">
                <Bell className="size-6 text-gray-700" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button
                onClick={() => onNavigate('profile')}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <UserIcon className="size-6 text-gray-700" />
              </button>
            </div>
          </div>

          {/* Location Selector */}
          <button className="flex items-center gap-2 mb-4 group">
            <MapPin className="size-5 text-blue-600" />
            <span className="group-hover:text-blue-600 transition-colors">{location}</span>
            <ChevronDown className="size-4 text-gray-500" />
          </button>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search venues, sports, trainers, locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-600"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        {/* Offers Banner */}
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className={`${offer.color} rounded-xl p-4 min-w-[300px] text-white flex-shrink-0`}
            >
              <h3 className="mb-1">{offer.title}</h3>
              <p className="text-sm opacity-90 mb-2">{offer.description}</p>
              <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                Code: {offer.code}
              </div>
            </div>
          ))}
        </div>

        {/* Sports Categories */}
        <div>
          <h2 className="text-xl mb-4">Browse by Sport</h2>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {sportCategories.map((sport) => (
              <button
                key={sport.id}
                onClick={() => onNavigate('venues')}
                className={`${sport.color} p-4 rounded-xl hover:scale-105 transition-transform`}
              >
                <div className="text-3xl mb-2">{sport.icon}</div>
                <div className="text-xs">{sport.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Venues */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl">Featured Venues</h2>
            <button
              onClick={() => onNavigate('venues')}
              className="text-blue-600 text-sm hover:underline"
            >
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredVenues.map((venue) => (
              <div
                key={venue.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onNavigate('venue-detail')}
              >
                <div className="relative h-48">
                  <ImageWithFallback
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover"
                  />
                  {venue.isPremium && (
                    <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                      <TrendingUp className="size-3" />
                      Premium
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs">
                    {venue.distance}
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
                    <span className="text-blue-600">{venue.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Games */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl">Upcoming Games Near You</h2>
            <button
              onClick={() => onNavigate('upcoming-games')}
              className="text-blue-600 text-sm hover:underline"
            >
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingGames.map((game) => (
              <div
                key={game.id}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onNavigate('game-detail')}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
                    {game.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1">{game.title}</h3>
                    <div className="text-xs text-gray-600 flex items-center gap-1">
                      <MapPin className="size-3" />
                      {game.venue}
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="size-4" />
                    <span>{game.date} at {game.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="size-4" />
                    <span>{game.players} players</span>
                    <span className="ml-auto text-blue-600">{game.costPerPlayer}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                      {game.skillLevel}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onJoinGame(game.id);
                      }}
                      className="px-4 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                    >
                      Join
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sports Merchandise */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl">Sports Merchandise</h2>
              <span className="bg-orange-100 text-orange-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Store</span>
            </div>
            <button className="text-blue-600 text-sm font-medium flex items-center gap-1 hover:underline">
              Visit Store
              <ChevronRight className="size-4" />
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            {sportsMerchandise.map((item) => (
              <div
                key={item.id}
                className="min-w-[200px] bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 group cursor-pointer"
                onClick={() => handleMerchandiseClick(item.id)}
              >
                <div className="relative h-40">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">
                      {item.category}
                    </span>
                  </div>
                  {item.discount && (
                    <div className="absolute top-2 right-2">
                      <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-md">
                        {item.discount}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium text-gray-800 mb-1 truncate">{item.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 font-bold">{item.price}</span>
                    <button className="p-1.5 bg-gray-50 text-gray-600 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      <ShoppingBag className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sports Foods */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl">Sports Nutrition</h2>
              <span className="bg-green-100 text-green-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Healthy</span>
            </div>
            <button className="text-blue-600 text-sm font-medium flex items-center gap-1 hover:underline">
              View Menu
              <ChevronRight className="size-4" />
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            {sportsFoods.map((item) => (
              <div
                key={item.id}
                className="min-w-[200px] bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 group cursor-pointer"
              >
                <div className="relative h-40">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">
                      {item.category}
                    </span>
                  </div>
                  {item.tag && (
                    <div className="absolute top-2 right-2">
                      <span className="bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-md">
                        {item.tag}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium text-gray-800 mb-1 truncate">{item.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 font-bold">{item.price}</span>
                    <button className="p-1.5 bg-gray-50 text-gray-600 rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors">
                      <Utensils className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => onNavigate('create-game')}
            className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-xl hover:scale-105 transition-transform"
          >
            <Users className="size-8 mb-2 mx-auto" />
            <div>Create a Game</div>
          </button>
          <button
            onClick={() => onNavigate('venues')}
            className="bg-gradient-to-br from-green-600 to-green-700 text-white p-6 rounded-xl hover:scale-105 transition-transform"
          >
            <MapPin className="size-8 mb-2 mx-auto" />
            <div>Find Venues</div>
          </button>
          <button
            onClick={() => onNavigate('trainers')}
            className="bg-gradient-to-br from-purple-600 to-purple-700 text-white p-6 rounded-xl hover:scale-105 transition-transform"
          >
            <UserIcon className="size-8 mb-2 mx-auto" />
            <div>Find Trainers</div>
          </button>
          <button
            onClick={() => onNavigate('players')}
            className="bg-gradient-to-br from-orange-600 to-orange-700 text-white p-6 rounded-xl hover:scale-105 transition-transform"
          >
            <Users className="size-8 mb-2 mx-auto" />
            <div>Find Players</div>
          </button>
        </div>
      </div>
    </div>
  );
}