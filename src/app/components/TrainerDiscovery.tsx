import { useState } from 'react';
import { ChevronLeft, Search, MapPin, Star, Award, Calendar, Users, Video, MessageCircle, Check } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const trainers = [
  {
    id: '1',
    name: 'Coach Rajesh Kumar',
    avatar: 'https://images.unsplash.com/photo-1540205453279-389ebbc43b5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwdHJhaW5lciUyMGNvYWNoaW5nfGVufDF8fHx8MTc3MDA5ODE1NXww&ixlib=rb-4.1.0&q=80&w=1080',
    sports: ['Cricket', 'Football'],
    experience: 12,
    certifications: ['Level 3 Cricket Coach', 'UEFA B License'],
    skillLevels: ['Beginner', 'Intermediate', 'Advanced'],
    trainingModes: ['Online', 'Offline'],
    location: 'Koramangala, Bangalore',
    rating: 4.9,
    reviews: 156,
    sessions: 340,
    price: {
      personal: 1200,
      group: 800,
      online: 600,
    },
  },
  {
    id: '2',
    name: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    sports: ['Badminton', 'Tennis'],
    experience: 8,
    certifications: ['BWF Level 2', 'PTR Certified'],
    skillLevels: ['Beginner', 'Intermediate', 'Advanced'],
    trainingModes: ['Offline'],
    location: 'HSR Layout, Bangalore',
    rating: 4.8,
    reviews: 98,
    sessions: 245,
    price: {
      personal: 1000,
      group: 700,
      online: null,
    },
  },
  {
    id: '3',
    name: 'Arjun Singh',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    sports: ['Basketball'],
    experience: 10,
    certifications: ['FIBA Level 2 Coach'],
    skillLevels: ['Intermediate', 'Advanced'],
    trainingModes: ['Online', 'Offline'],
    location: 'Indiranagar, Bangalore',
    rating: 4.7,
    reviews: 76,
    sessions: 198,
    price: {
      personal: 1500,
      group: 1000,
      online: 800,
    },
  },
  {
    id: '4',
    name: 'Sneha Reddy',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
    sports: ['Yoga', 'Swimming'],
    experience: 6,
    certifications: ['RYT 500', 'Swim Instructor Level 2'],
    skillLevels: ['Beginner', 'Intermediate'],
    trainingModes: ['Online', 'Offline'],
    location: 'Whitefield, Bangalore',
    rating: 4.9,
    reviews: 134,
    sessions: 289,
    price: {
      personal: 900,
      group: 600,
      online: 500,
    },
  },
];

interface TrainerDiscoveryProps {
  onBack: () => void;
  onViewTrainer: (trainerId: string) => void;
}

export function TrainerDiscovery({ onBack, onViewTrainer }: TrainerDiscoveryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sportFilter, setSportFilter] = useState('All');
  const [trainingTypeFilter, setTrainingTypeFilter] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const filteredTrainers = trainers.filter((trainer) => {
    const matchesSearch = trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         trainer.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSport = sportFilter === 'All' || trainer.sports.includes(sportFilter);
    const matchesType = trainingTypeFilter === 'All' || trainer.trainingModes.includes(trainingTypeFilter);
    return matchesSearch && matchesSport && matchesType;
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
            <h1 className="text-xl">Find Trainers</h1>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search trainers by name, sport, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-600"
            />
          </div>

          {/* Sport Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-2">
            {['All', 'Cricket', 'Football', 'Badminton', 'Tennis', 'Basketball', 'Yoga', 'Swimming'].map((sport) => (
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

          {/* Training Type Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {['All', 'Online', 'Offline'].map((type) => (
              <button
                key={type}
                onClick={() => setTrainingTypeFilter(type)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                  trainingTypeFilter === type
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Trainers Grid */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-4 text-gray-600">
          {filteredTrainers.length} trainers found
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTrainers.map((trainer) => (
            <div
              key={trainer.id}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onViewTrainer(trainer.id)}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <ImageWithFallback
                    src={trainer.avatar}
                    alt={trainer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="mb-1 truncate">{trainer.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                    <MapPin className="size-3 flex-shrink-0" />
                    <span className="truncate">{trainer.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="size-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm">{trainer.rating}</span>
                    <span className="text-xs text-gray-500">({trainer.reviews})</span>
                  </div>
                </div>
              </div>

              {/* Sports */}
              <div className="flex flex-wrap gap-1 mb-3">
                {trainer.sports.map((sport) => (
                  <span
                    key={sport}
                    className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                  >
                    {sport}
                  </span>
                ))}
              </div>

              {/* Experience */}
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-1">
                  <Award className="size-4" />
                  <span>{trainer.experience}y exp</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="size-4" />
                  <span>{trainer.sessions} sessions</span>
                </div>
              </div>

              {/* Training Modes */}
              <div className="flex gap-2 mb-4">
                {trainer.trainingModes.includes('Online') && (
                  <span className="flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-full">
                    <Video className="size-3" />
                    Online
                  </span>
                )}
                {trainer.trainingModes.includes('Offline') && (
                  <span className="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">
                    <MapPin className="size-3" />
                    Offline
                  </span>
                )}
              </div>

              {/* Pricing */}
              <div className="pt-3 border-t">
                <div className="text-sm text-gray-600 mb-2">Starting from</div>
                <div className="flex items-center justify-between">
                  <span className="text-lg text-blue-600">
                    ₹{Math.min(...Object.values(trainer.price).filter(p => p !== null) as number[])}/session
                  </span>
                  <button className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface TrainerProfileProps {
  onBack: () => void;
  onContact: () => void;
}

export function TrainerProfile({ onBack, onContact }: TrainerProfileProps) {
  const trainer = trainers[0]; // Example trainer
  const [selectedTab, setSelectedTab] = useState<'overview' | 'reviews'>('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
              <ChevronLeft className="size-6" />
            </button>
            <h1 className="text-xl">Trainer Profile</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Profile Header */}
        <div className="bg-white rounded-xl p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center overflow-hidden">
              <ImageWithFallback
                src={trainer.avatar}
                alt={trainer.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl mb-2">{trainer.name}</h2>
              <div className="flex items-center gap-2 text-gray-600 justify-center sm:justify-start mb-3">
                <MapPin className="size-4" />
                <span>{trainer.location}</span>
              </div>
              <div className="flex items-center gap-4 justify-center sm:justify-start">
                <div className="flex items-center gap-1">
                  <Star className="size-5 text-yellow-500 fill-yellow-500" />
                  <span>{trainer.rating}</span>
                  <span className="text-gray-600">({trainer.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <Award className="size-4" />
                  <span>{trainer.experience} years exp</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sports Coached */}
          <div className="mb-4">
            <h3 className="text-sm text-gray-600 mb-2">Sports Coached</h3>
            <div className="flex flex-wrap gap-2">
              {trainer.sports.map((sport) => (
                <span
                  key={sport}
                  className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg"
                >
                  {sport}
                </span>
              ))}
            </div>
          </div>

          {/* Training Modes */}
          <div className="mb-4">
            <h3 className="text-sm text-gray-600 mb-2">Training Modes</h3>
            <div className="flex gap-2">
              {trainer.trainingModes.map((mode) => (
                <span
                  key={mode}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg ${
                    mode === 'Online' ? 'bg-purple-50 text-purple-700' : 'bg-green-50 text-green-700'
                  }`}
                >
                  {mode === 'Online' ? <Video className="size-4" /> : <MapPin className="size-4" />}
                  {mode}
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-2xl mb-1">{trainer.sessions}</div>
              <div className="text-sm text-gray-600">Sessions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">{trainer.reviews}</div>
              <div className="text-sm text-gray-600">Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">{trainer.experience}+</div>
              <div className="text-sm text-gray-600">Years</div>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-white rounded-xl p-6 mb-6">
          <h3 className="mb-4">Certifications</h3>
          <div className="space-y-2">
            {trainer.certifications.map((cert, index) => (
              <div key={index} className="flex items-center gap-2">
                <Check className="size-4 text-green-600" />
                <span>{cert}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Levels */}
        <div className="bg-white rounded-xl p-6 mb-6">
          <h3 className="mb-4">Skill Levels Trained</h3>
          <div className="flex gap-2">
            {trainer.skillLevels.map((level) => (
              <span
                key={level}
                className={`px-3 py-1.5 rounded-lg ${
                  level === 'Advanced' ? 'bg-purple-100 text-purple-700' :
                  level === 'Intermediate' ? 'bg-blue-100 text-blue-700' :
                  'bg-green-100 text-green-700'
                }`}
              >
                {level}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white rounded-xl p-6 mb-6">
          <h3 className="mb-4">Session Pricing</h3>
          <div className="space-y-3">
            {trainer.price.personal && (
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <Users className="size-5 text-gray-400" />
                  <span>Personal (1:1)</span>
                </div>
                <span className="text-blue-600">₹{trainer.price.personal}/session</span>
              </div>
            )}
            {trainer.price.group && (
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <Users className="size-5 text-gray-400" />
                  <span>Group Training</span>
                </div>
                <span className="text-blue-600">₹{trainer.price.group}/session</span>
              </div>
            )}
            {trainer.price.online && (
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <Video className="size-5 text-gray-400" />
                  <span>Online Session</span>
                </div>
                <span className="text-blue-600">₹{trainer.price.online}/session</span>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl overflow-hidden mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setSelectedTab('overview')}
              className={`flex-1 py-3 ${
                selectedTab === 'overview'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setSelectedTab('reviews')}
              className={`flex-1 py-3 ${
                selectedTab === 'reviews'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600'
              }`}
            >
              Reviews
            </button>
          </div>

          <div className="p-6">
            {selectedTab === 'overview' && (
              <div className="space-y-4">
                <p className="text-gray-600">
                  With {trainer.experience} years of experience in coaching {trainer.sports.join(' and ')}, 
                  I specialize in helping players of all skill levels reach their full potential. 
                  My coaching philosophy focuses on building strong fundamentals while developing 
                  advanced techniques tailored to each athlete's goals.
                </p>
                <div>
                  <h4 className="mb-2">Training Locations</h4>
                  <div className="text-gray-600">Elite Sports Arena, Champions Turf</div>
                </div>
                <div>
                  <h4 className="mb-2">Available Days</h4>
                  <div className="text-gray-600">Monday - Saturday, 6:00 AM - 9:00 PM</div>
                </div>
              </div>
            )}

            {selectedTab === 'reviews' && (
              <div className="space-y-4">
                {[
                  {
                    name: 'Rahul Sharma',
                    rating: 5,
                    date: 'Jan 28, 2026',
                    comment: 'Excellent coach! Improved my batting technique significantly in just 2 months.',
                  },
                  {
                    name: 'Amit Patel',
                    rating: 5,
                    date: 'Jan 20, 2026',
                    comment: 'Very patient and knowledgeable. Highly recommend for beginners.',
                  },
                  {
                    name: 'Priya Singh',
                    rating: 4,
                    date: 'Jan 15, 2026',
                    comment: 'Great trainer with solid technical knowledge. Sessions are well-structured.',
                  },
                ].map((review, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <span>{review.name}</span>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`size-4 ${
                            star <= review.rating
                              ? 'text-yellow-500 fill-yellow-500'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Contact Button */}
        <button
          onClick={onContact}
          className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
        >
          <MessageCircle className="size-5" />
          Contact Trainer
        </button>
      </div>
    </div>
  );
}

interface ContactTrainerProps {
  onBack: () => void;
  onComplete: () => void;
}

export function ContactTrainer({ onBack, onComplete }: ContactTrainerProps) {
  const trainer = trainers[0];
  const [formData, setFormData] = useState({
    sport: trainer.sports[0],
    trainingType: 'personal',
    date: '',
    time: '',
    message: '',
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
            <h1 className="text-xl">Contact {trainer.name}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl p-6 space-y-6">
          <div>
            <label className="block text-sm mb-2">Select Sport *</label>
            <select
              value={formData.sport}
              onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg outline-none"
            >
              {trainer.sports.map((sport) => (
                <option key={sport} value={sport}>{sport}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-2">Training Type *</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'personal', label: '1:1', price: trainer.price.personal },
                { value: 'group', label: 'Group', price: trainer.price.group },
                { value: 'online', label: 'Online', price: trainer.price.online },
              ].filter(t => t.price !== null).map((type) => (
                <button
                  key={type.value}
                  onClick={() => setFormData({ ...formData, trainingType: type.value })}
                  className={`p-3 border rounded-lg ${
                    formData.trainingType === type.value
                      ? 'border-blue-600 bg-blue-50 text-blue-600'
                      : 'border-gray-300 hover:border-blue-400'
                  }`}
                >
                  <div>{type.label}</div>
                  <div className="text-xs">₹{type.price}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2">Preferred Date *</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                className="w-full p-3 border border-gray-300 rounded-lg outline-none"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Preferred Time *</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">Message (Optional)</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell the trainer about your goals and experience level..."
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg outline-none resize-none"
            />
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-2">Note</div>
            <p className="text-sm">
              Your request will be sent to the trainer. They will review and confirm the session based on availability.
            </p>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
}
