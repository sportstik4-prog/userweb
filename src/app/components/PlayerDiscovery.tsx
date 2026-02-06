import { useState } from 'react';
import { ChevronLeft, Search, MapPin, Star, MessageCircle, UserPlus } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const players = [
  {
    id: '1',
    name: 'Rahul Sharma',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400',
    location: 'Koramangala, Bangalore',
    sports: [
      { name: 'Cricket', skillLevel: 'Advanced', gamesPlayed: 45 },
      { name: 'Football', skillLevel: 'Intermediate', gamesPlayed: 23 },
    ],
    rating: 4.8,
    totalGames: 68,
  },
  {
    id: '2',
    name: 'Priya Singh',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
    location: 'HSR Layout, Bangalore',
    sports: [
      { name: 'Badminton', skillLevel: 'Advanced', gamesPlayed: 67 },
      { name: 'Tennis', skillLevel: 'Intermediate', gamesPlayed: 34 },
    ],
    rating: 4.9,
    totalGames: 101,
  },
  {
    id: '3',
    name: 'Arjun Patel',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    location: 'Indiranagar, Bangalore',
    sports: [
      { name: 'Football', skillLevel: 'Advanced', gamesPlayed: 89 },
    ],
    rating: 4.7,
    totalGames: 89,
  },
  {
    id: '4',
    name: 'Sneha Reddy',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    location: 'Whitefield, Bangalore',
    sports: [
      { name: 'Basketball', skillLevel: 'Intermediate', gamesPlayed: 42 },
      { name: 'Volleyball', skillLevel: 'Beginner', gamesPlayed: 12 },
    ],
    rating: 4.6,
    totalGames: 54,
  },
  {
    id: '5',
    name: 'Amit Kumar',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    location: 'BTM Layout, Bangalore',
    sports: [
      { name: 'Cricket', skillLevel: 'Intermediate', gamesPlayed: 56 },
      { name: 'Badminton', skillLevel: 'Beginner', gamesPlayed: 18 },
    ],
    rating: 4.5,
    totalGames: 74,
  },
  {
    id: '6',
    name: 'Neha Gupta',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    location: 'Jayanagar, Bangalore',
    sports: [
      { name: 'Tennis', skillLevel: 'Advanced', gamesPlayed: 78 },
    ],
    rating: 4.9,
    totalGames: 78,
  },
];

interface PlayerDiscoveryProps {
  onBack: () => void;
  onViewProfile: (playerId: string) => void;
}

export function PlayerDiscovery({ onBack, onViewProfile }: PlayerDiscoveryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sportFilter, setSportFilter] = useState('All');
  const [skillFilter, setSkillFilter] = useState('All');

  const filteredPlayers = players.filter((player) => {
    const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         player.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSport = sportFilter === 'All' || player.sports.some(s => s.name === sportFilter);
    const matchesSkill = skillFilter === 'All' || player.sports.some(s => s.skillLevel === skillFilter);
    return matchesSearch && matchesSport && matchesSkill;
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
            <h1 className="text-xl">Find Players</h1>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search players by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-600"
            />
          </div>

          {/* Sport Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-2">
            {['All', 'Cricket', 'Football', 'Badminton', 'Tennis', 'Basketball'].map((sport) => (
              <button
                key={sport}
                onClick={() => setSportFilter(sport)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                  sportFilter === sport
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {sport}
              </button>
            ))}
          </div>

          {/* Skill Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {['All', 'Beginner', 'Intermediate', 'Advanced'].map((skill) => (
              <button
                key={skill}
                onClick={() => setSkillFilter(skill)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                  skillFilter === skill
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Players Grid */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-4 text-gray-600">
          {filteredPlayers.length} players found
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPlayers.map((player) => (
            <div
              key={player.id}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <ImageWithFallback
                    src={player.avatar}
                    alt={player.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="mb-1 truncate">{player.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                    <MapPin className="size-3 flex-shrink-0" />
                    <span className="truncate">{player.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="size-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm">{player.rating}</span>
                    <span className="text-xs text-gray-500">({player.totalGames} games)</span>
                  </div>
                </div>
              </div>

              {/* Sports */}
              <div className="space-y-2 mb-4">
                {player.sports.map((sport) => (
                  <div key={sport.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span>{sport.name}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        sport.skillLevel === 'Advanced' ? 'bg-purple-100 text-purple-700' :
                        sport.skillLevel === 'Intermediate' ? 'bg-blue-100 text-blue-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {sport.skillLevel}
                      </span>
                    </div>
                    <span className="text-gray-500 text-xs">{sport.gamesPlayed} games</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => onViewProfile(player.id)}
                  className="flex-1 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 text-sm"
                >
                  View Profile
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <UserPlus className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface PlayerProfileProps {
  onBack: () => void;
}

export function PlayerProfile({ onBack }: PlayerProfileProps) {
  const player = players[0]; // Example player

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
              <ChevronLeft className="size-6" />
            </button>
            <h1 className="text-xl">Player Profile</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Profile Header */}
        <div className="bg-white rounded-xl p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center overflow-hidden">
              <ImageWithFallback
                src={player.avatar}
                alt={player.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl mb-2">{player.name}</h2>
              <div className="flex items-center gap-2 text-gray-600 justify-center sm:justify-start mb-3">
                <MapPin className="size-4" />
                <span>{player.location}</span>
              </div>
              <div className="flex items-center gap-4 justify-center sm:justify-start">
                <div className="flex items-center gap-1">
                  <Star className="size-5 text-yellow-500 fill-yellow-500" />
                  <span>{player.rating} Rating</span>
                </div>
                <div className="text-gray-600">
                  {player.totalGames} Games Played
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                <MessageCircle className="size-4" />
                Message
              </button>
            </div>
          </div>
        </div>

        {/* Sports & Skills */}
        <div className="bg-white rounded-xl p-6 mb-6">
          <h3 className="mb-4">Sports & Skill Levels</h3>
          <div className="space-y-4">
            {player.sports.map((sport) => (
              <div key={sport.name} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span>{sport.name}</span>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    sport.skillLevel === 'Advanced' ? 'bg-purple-100 text-purple-700' :
                    sport.skillLevel === 'Intermediate' ? 'bg-blue-100 text-blue-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {sport.skillLevel}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  {sport.gamesPlayed} games played
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6">
          <h3 className="mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { game: 'Cricket Match', venue: 'Elite Sports Arena', date: 'Feb 3, 2026' },
              { game: 'Football Practice', venue: 'Champions Turf', date: 'Feb 1, 2026' },
              { game: 'Cricket Tournament', venue: 'Elite Sports Arena', date: 'Jan 28, 2026' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                <div>
                  <div className="mb-1">{activity.game}</div>
                  <div className="text-sm text-gray-600">{activity.venue}</div>
                </div>
                <div className="text-sm text-gray-500">{activity.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
