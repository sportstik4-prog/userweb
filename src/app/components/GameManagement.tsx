import { useState } from 'react';
import { ChevronLeft, Plus, MapPin, Calendar, Clock, Users, DollarSign, TrendingUp, Search, Filter } from 'lucide-react';

const availableGames = [
  {
    id: '1',
    sport: 'Cricket',
    icon: '🏏',
    title: 'Evening Cricket Match',
    venue: 'Elite Sports Arena',
    location: 'Koramangala',
    organizer: 'Rahul Sharma',
    date: 'Today',
    time: '6:00 PM',
    totalPlayers: 11,
    joinedPlayers: 8,
    costPerPlayer: 150,
    skillLevel: 'Intermediate',
    visibility: 'public',
  },
  {
    id: '2',
    sport: 'Football',
    icon: '⚽',
    title: 'Weekend Football',
    venue: 'Champions Football Turf',
    location: 'Indiranagar',
    organizer: 'Arjun Patel',
    date: 'Tomorrow',
    time: '7:00 AM',
    totalPlayers: 11,
    joinedPlayers: 10,
    costPerPlayer: 100,
    skillLevel: 'All Levels',
    visibility: 'public',
  },
  {
    id: '3',
    sport: 'Badminton',
    icon: '🏸',
    title: 'Doubles Practice',
    venue: 'Ace Badminton Academy',
    location: 'HSR Layout',
    organizer: 'Priya Singh',
    date: 'Feb 6',
    time: '5:30 PM',
    totalPlayers: 4,
    joinedPlayers: 3,
    costPerPlayer: 200,
    skillLevel: 'Advanced',
    visibility: 'public',
  },
  {
    id: '4',
    sport: 'Basketball',
    icon: '🏀',
    title: 'Pickup Game',
    venue: 'Hoops Basketball Arena',
    location: 'BTM Layout',
    organizer: 'Amit Kumar',
    date: 'Feb 7',
    time: '8:00 PM',
    totalPlayers: 10,
    joinedPlayers: 6,
    costPerPlayer: 120,
    skillLevel: 'Beginner',
    visibility: 'public',
  },
];

interface GameManagementProps {
  onBack: () => void;
  onCreateGame: () => void;
  onViewGameDetail: (gameId: string) => void;
}

export function GameManagement({ onBack, onCreateGame, onViewGameDetail }: GameManagementProps) {
  const [activeTab, setActiveTab] = useState<'available' | 'my-games'>('available');
  const [searchQuery, setSearchQuery] = useState('');
  const [sportFilter, setSportFilter] = useState('All');

  const filteredGames = availableGames.filter((game) => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         game.venue.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSport = sportFilter === 'All' || game.sport === sportFilter;
    return matchesSearch && matchesSport;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
                <ChevronLeft className="size-6" />
              </button>
              <h1 className="text-xl">Games</h1>
            </div>
            <button
              onClick={onCreateGame}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="size-5" />
              Create Game
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 border-b">
            <button
              onClick={() => setActiveTab('available')}
              className={`pb-3 px-2 ${
                activeTab === 'available'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600'
              }`}
            >
              Available Games
            </button>
            <button
              onClick={() => setActiveTab('my-games')}
              className={`pb-3 px-2 ${
                activeTab === 'my-games'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600'
              }`}
            >
              My Games
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'available' && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Search and Filters */}
          <div className="mb-6 space-y-4">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {['All', 'Cricket', 'Football', 'Badminton', 'Basketball', 'Tennis'].map((sport) => (
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
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGames.map((game) => (
              <div
                key={game.id}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onViewGameDetail(game.id)}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                    {game.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="mb-1 truncate">{game.title}</h3>
                    <div className="text-xs text-gray-600 flex items-center gap-1">
                      <MapPin className="size-3 flex-shrink-0" />
                      <span className="truncate">{game.venue}, {game.location}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="size-4" />
                    <span>{game.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="size-4" />
                    <span>{game.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="size-4" />
                      <span>{game.joinedPlayers}/{game.totalPlayers} players</span>
                    </div>
                    <span className="text-blue-600">₹{game.costPerPlayer}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    {game.skillLevel}
                  </span>
                  <button className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                    Join Game
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="mt-3">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all"
                      style={{ width: `${(game.joinedPlayers / game.totalPlayers) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'my-games' && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="size-10 text-gray-400" />
            </div>
            <h3 className="text-xl mb-2">No Games Yet</h3>
            <p className="text-gray-600 mb-6">Create or join a game to get started</p>
            <button
              onClick={onCreateGame}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Your First Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

interface CreateGameProps {
  onBack: () => void;
  onComplete: () => void;
}

export function CreateGame({ onBack, onComplete }: CreateGameProps) {
  const [formData, setFormData] = useState({
    sport: 'Cricket',
    venue: '',
    date: '',
    time: '',
    totalPlayers: 11,
    costPerPlayer: '',
    skillLevel: 'All Levels',
    visibility: 'public',
    description: '',
  });

  const handleSubmit = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
              <ChevronLeft className="size-6" />
            </button>
            <h1 className="text-xl">Create a Game</h1>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl p-6 space-y-6">
          {/* Sport Selection */}
          <div>
            <label className="block text-sm mb-2">Sport *</label>
            <select
              value={formData.sport}
              onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg outline-none"
            >
              <option value="Cricket">Cricket</option>
              <option value="Football">Football</option>
              <option value="Badminton">Badminton</option>
              <option value="Tennis">Tennis</option>
              <option value="Basketball">Basketball</option>
              <option value="Volleyball">Volleyball</option>
            </select>
          </div>

          {/* Venue */}
          <div>
            <label className="block text-sm mb-2">Venue *</label>
            <select
              value={formData.venue}
              onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg outline-none"
            >
              <option value="">Select Venue</option>
              <option value="Elite Sports Arena">Elite Sports Arena</option>
              <option value="Champions Football Turf">Champions Football Turf</option>
              <option value="Ace Badminton Academy">Ace Badminton Academy</option>
            </select>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2">Date *</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                className="w-full p-3 border border-gray-300 rounded-lg outline-none"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Time *</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg outline-none"
              />
            </div>
          </div>

          {/* Players and Cost */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2">Total Players *</label>
              <input
                type="number"
                value={formData.totalPlayers}
                onChange={(e) => setFormData({ ...formData, totalPlayers: Number(e.target.value) })}
                min="2"
                className="w-full p-3 border border-gray-300 rounded-lg outline-none"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Cost per Player (₹) *</label>
              <input
                type="number"
                value={formData.costPerPlayer}
                onChange={(e) => setFormData({ ...formData, costPerPlayer: e.target.value })}
                placeholder="100"
                className="w-full p-3 border border-gray-300 rounded-lg outline-none"
              />
            </div>
          </div>

          {/* Skill Level */}
          <div>
            <label className="block text-sm mb-2">Skill Level *</label>
            <div className="grid grid-cols-3 gap-2">
              {['Beginner', 'Intermediate', 'Advanced', 'All Levels'].map((level) => (
                <button
                  key={level}
                  onClick={() => setFormData({ ...formData, skillLevel: level })}
                  className={`p-3 text-sm border rounded-lg ${
                    formData.skillLevel === level
                      ? 'border-blue-600 bg-blue-50 text-blue-600'
                      : 'border-gray-300 hover:border-blue-400'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Visibility */}
          <div>
            <label className="block text-sm mb-2">Visibility *</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setFormData({ ...formData, visibility: 'public' })}
                className={`p-3 border rounded-lg ${
                  formData.visibility === 'public'
                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                    : 'border-gray-300 hover:border-blue-400'
                }`}
              >
                Public
              </button>
              <button
                onClick={() => setFormData({ ...formData, visibility: 'invite' })}
                className={`p-3 border rounded-lg ${
                  formData.visibility === 'invite'
                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                    : 'border-gray-300 hover:border-blue-400'
                }`}
              >
                Invite Only
              </button>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm mb-2">Description (Optional)</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Add any additional details about the game..."
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg outline-none resize-none"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Create Game
          </button>
        </div>
      </div>
    </div>
  );
}
