import { useState } from 'react';
import { ChevronLeft, Search, Filter, MapPin, Calendar, Clock, Users, ArrowUpDown } from 'lucide-react';

const upcomingGames = [
  {
    id: '1',
    sport: 'Cricket',
    icon: '🏏',
    title: 'Evening Cricket Match',
    venue: 'Elite Sports Arena',
    location: 'Koramangala',
    distance: '1.2 km',
    organizer: 'Rahul Sharma',
    date: 'Today',
    time: '6:00 PM',
    totalPlayers: 11,
    joinedPlayers: 8,
    costPerPlayer: 150,
    skillLevel: 'Intermediate',
    intensity: 'Casual',
  },
  {
    id: '2',
    sport: 'Football',
    icon: '⚽',
    title: 'Weekend Football',
    venue: 'Champions Football Turf',
    location: 'Indiranagar',
    distance: '2.5 km',
    organizer: 'Arjun Patel',
    date: 'Tomorrow',
    time: '7:00 AM',
    totalPlayers: 11,
    joinedPlayers: 10,
    costPerPlayer: 100,
    skillLevel: 'All Levels',
    intensity: 'Competitive',
  },
  {
    id: '3',
    sport: 'Badminton',
    icon: '🏸',
    title: 'Doubles Practice',
    venue: 'Ace Badminton Academy',
    location: 'HSR Layout',
    distance: '0.8 km',
    organizer: 'Priya Singh',
    date: 'Feb 6',
    time: '5:30 PM',
    totalPlayers: 4,
    joinedPlayers: 3,
    costPerPlayer: 200,
    skillLevel: 'Advanced',
    intensity: 'Pro',
  },
  {
    id: '4',
    sport: 'Basketball',
    icon: '🏀',
    title: 'Pickup Game',
    venue: 'Hoops Basketball Arena',
    location: 'BTM Layout',
    distance: '3.4 km',
    organizer: 'Amit Kumar',
    date: 'Feb 7',
    time: '8:00 PM',
    totalPlayers: 10,
    joinedPlayers: 6,
    costPerPlayer: 120,
    skillLevel: 'Beginner',
    intensity: 'Casual',
  },
  {
    id: '5',
    sport: 'Tennis',
    icon: '🎾',
    title: 'Singles Open',
    venue: 'Clay Court Club',
    location: 'Jayanagar',
    distance: '1.9 km',
    organizer: 'Vikram Rao',
    date: 'Today',
    time: '4:00 PM',
    totalPlayers: 2,
    joinedPlayers: 1,
    costPerPlayer: 300,
    skillLevel: 'Intermediate',
    intensity: 'Competitive',
  },
];

interface UpcomingGamesPageProps {
  onBack: () => void;
  onSelectGame: (gameId: string) => void;
  onJoinGame: (gameId: string) => void;
}

export function UpcomingGamesPage({ onBack, onSelectGame, onJoinGame }: UpcomingGamesPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState('All');
  const [selectedSkill, setSelectedSkill] = useState('All');
  const [sortBy, setSortBy] = useState<'distance' | 'time' | 'price'>('distance');

  const sports = ['All', 'Cricket', 'Football', 'Badminton', 'Basketball', 'Tennis'];
  const skillLevels = ['All', 'Beginner', 'Intermediate', 'Advanced', 'All Levels'];

  const filteredGames = upcomingGames.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          game.venue.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSport = selectedSport === 'All' || game.sport === selectedSport;
    const matchesSkill = selectedSkill === 'All' || game.skillLevel === selectedSkill;
    return matchesSearch && matchesSport && matchesSkill;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
              <ChevronLeft className="size-6" />
            </button>
            <h1 className="text-xl">Upcoming Games Near You</h1>
          </div>

          <div className="flex flex-col gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by area or arena..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-100 border-none rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filters Row */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <div className="flex items-center gap-2 pr-2 border-r">
                <Filter className="size-4 text-gray-500" />
                <span className="text-sm text-gray-500">Filters:</span>
              </div>
              {sports.map(sport => (
                <button
                  key={sport}
                  onClick={() => setSelectedSport(sport)}
                  className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                    selectedSport === sport 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white border border-gray-200 hover:border-blue-400'
                  }`}
                >
                  {sport}
                </button>
              ))}
            </div>

            {/* Skill Level & Sorting */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <select 
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                  className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-blue-500"
                >
                  {skillLevels.map(level => (
                    <option key={level} value={level}>{level} Skill</option>
                  ))}
                </select>
              </div>
              <button 
                onClick={() => setSortBy(sortBy === 'distance' ? 'price' : 'distance')}
                className="flex items-center gap-2 text-sm text-gray-600 bg-white border border-gray-200 px-3 py-1.5 rounded-lg"
              >
                <ArrowUpDown className="size-4" />
                Sort by {sortBy}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-600">Showing {filteredGames.length} games found near you</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-500">Live Updates</span>
          </div>
        </div>

        <div className="space-y-4">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              onClick={() => onSelectGame(game.id)}
              className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-transparent hover:border-blue-100 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-4">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                    {game.icon}
                  </div>
                  <div>
                    <h3 className="mb-1">{game.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="size-4 text-blue-500" />
                        <span>{game.venue}</span>
                      </div>
                      <span className="text-gray-300">•</span>
                      <span className="text-blue-600">{game.distance} away</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-blue-600 mb-1 font-medium">₹{game.costPerPlayer}</div>
                  <div className="text-xs text-gray-400">per player</div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-t border-b border-gray-50 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="size-4 text-gray-400" />
                  <span className="text-sm text-gray-700">{game.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="size-4 text-gray-400" />
                  <span className="text-sm text-gray-700">{game.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="size-4 text-gray-400" />
                  <span className="text-sm text-gray-700">{game.joinedPlayers}/{game.totalPlayers} Joined</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                    game.intensity === 'Pro' ? 'bg-red-100 text-red-600' :
                    game.intensity === 'Competitive' ? 'bg-orange-100 text-orange-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    {game.intensity}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?u=${game.id}${i}`} alt="player" />
                      </div>
                    ))}
                    {game.joinedPlayers > 3 && (
                      <div className="w-7 h-7 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-[10px] text-blue-600 font-bold">
                        +{game.joinedPlayers - 3}
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">Joined by {game.organizer} & others</span>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onJoinGame(game.id);
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200"
                >
                  Join Game
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="size-10 text-gray-300" />
            </div>
            <h3 className="text-xl mb-2 text-gray-700">No matches found</h3>
            <p className="text-gray-500">Try adjusting your filters or searching for another area</p>
          </div>
        )}
      </div>
    </div>
  );
}
