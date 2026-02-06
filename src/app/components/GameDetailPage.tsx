import { ChevronLeft, MapPin, Calendar, Clock, Users, Shield, MessageSquare, Share2, Star, TrendingUp } from 'lucide-react';

interface GameDetailPageProps {
  gameId?: string;
  onBack: () => void;
  onJoin: () => void;
}

export function GameDetailPage({ gameId, onBack, onJoin }: GameDetailPageProps) {
  // Mock game data - in a real app, this would be fetched based on gameId
  const game = {
    id: gameId || '1',
    sport: 'Cricket',
    icon: '🏏',
    title: 'Evening Cricket Match',
    venue: 'Elite Sports Arena',
    location: 'Koramangala, Bangalore',
    description: 'Looking for 3 more players for a casual 11v11 cricket match. We have all the equipment, just bring your whites and enthusiasm! The pitch is synthetic and well-maintained.',
    date: 'Thursday, Feb 5',
    time: '6:00 PM - 8:00 PM',
    totalPlayers: 22,
    joinedPlayers: 19,
    costPerPlayer: 150,
    skillLevel: 'Intermediate',
    intensity: 'Casual',
    organizer: {
      name: 'Rahul Sharma',
      rating: 4.8,
      gamesOrganized: 45,
      image: 'https://i.pravatar.cc/150?u=rahul'
    },
    amenities: ['Changing Rooms', 'Drinking Water', 'Parking', 'Floodlights'],
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="relative h-64 bg-blue-600 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1759733858225-f6d984629ea9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjB2ZW51ZSUyMGNyaWNrZXQlMjBmaWVsZHxlbnwxfHx8fDE3NzAxODI0NzB8MA&ixlib=rb-4.1.0&q=80&w=1080" 
          alt="Venue" 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <button 
            onClick={onBack}
            className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"
          >
            <ChevronLeft className="size-6" />
          </button>
          <div className="flex gap-2">
            <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white">
              <Share2 className="size-5" />
            </button>
          </div>
        </div>

        <div className="absolute bottom-6 left-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 bg-blue-600 rounded text-xs font-bold">{game.sport}</span>
            <span className="px-2 py-1 bg-white/20 backdrop-blur-md rounded text-xs">{game.intensity}</span>
          </div>
          <h1 className="text-3xl font-bold mb-1">{game.title}</h1>
          <div className="flex items-center gap-2 text-sm opacity-90">
            <MapPin className="size-4" />
            {game.venue}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-xl mb-4">About this Game</h2>
              <p className="text-gray-600 leading-relaxed">
                {game.description}
              </p>
            </section>

            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <Calendar className="size-5 text-blue-600 mb-2" />
                <div className="text-xs text-gray-500 uppercase tracking-wider">Date</div>
                <div className="text-sm font-medium">{game.date}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <Clock className="size-5 text-blue-600 mb-2" />
                <div className="text-xs text-gray-500 uppercase tracking-wider">Time</div>
                <div className="text-sm font-medium">{game.time}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <Users className="size-5 text-blue-600 mb-2" />
                <div className="text-xs text-gray-500 uppercase tracking-wider">Players</div>
                <div className="text-sm font-medium">{game.joinedPlayers}/{game.totalPlayers}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <TrendingUp className="size-5 text-blue-600 mb-2" />
                <div className="text-xs text-gray-500 uppercase tracking-wider">Skill</div>
                <div className="text-sm font-medium">{game.skillLevel}</div>
              </div>
            </section>

            <section>
              <h2 className="text-xl mb-4">Organizer</h2>
              <div className="flex items-center justify-between p-4 border border-gray-100 rounded-2xl">
                <div className="flex items-center gap-4">
                  <img src={game.organizer.image} alt={game.organizer.name} className="w-12 h-12 rounded-full" />
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      {game.organizer.name}
                      <Shield className="size-4 text-blue-600" />
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Star className="size-3 text-yellow-500 fill-yellow-500" />
                        {game.organizer.rating}
                      </div>
                      <span>•</span>
                      <span>{game.organizer.gamesOrganized} games organized</span>
                    </div>
                  </div>
                </div>
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full">
                  <MessageSquare className="size-6" />
                </button>
              </div>
            </section>

            <section>
              <h2 className="text-xl mb-4">Venue Amenities</h2>
              <div className="grid grid-cols-2 gap-3">
                {game.amenities.map(item => (
                  <div key={item} className="flex items-center gap-2 text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border border-gray-100 rounded-2xl p-6 shadow-xl shadow-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-2xl font-bold text-gray-900">₹{game.costPerPlayer}</span>
                  <span className="text-gray-500 text-sm ml-1">/ player</span>
                </div>
                <div className="text-green-600 text-sm font-medium bg-green-50 px-2 py-1 rounded">
                  {game.totalPlayers - game.joinedPlayers} spots left
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Game Fee</span>
                  <span>₹140</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Service Fee</span>
                  <span>₹10</span>
                </div>
                <div className="pt-4 border-t flex justify-between font-bold">
                  <span>Total Payable</span>
                  <span>₹150</span>
                </div>
              </div>

              <button 
                onClick={onJoin}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
              >
                Join Now
              </button>
              <p className="text-center text-[10px] text-gray-400 mt-4">
                By joining, you agree to our fair play policy and cancellation terms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
