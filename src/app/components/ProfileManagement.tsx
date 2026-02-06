import { useState } from 'react';
import { ChevronLeft, User, Calendar, MapPin, Edit2, Settings, LogOut, Trash2, ChevronRight, Receipt, Wallet as WalletIcon, Star, Clock, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const userProfile = {
  name: 'Rahul Sharma',
  email: 'rahul.sharma@email.com',
  phone: '+91 98765 43210',
  avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400',
  gender: 'Male',
  dob: '1995-05-15',
  city: 'Bangalore',
  area: 'Koramangala',
  preferredSports: [
    { sport: 'Cricket', skillLevel: 'Advanced', gamesPlayed: 45 },
    { sport: 'Football', skillLevel: 'Intermediate', gamesPlayed: 23 },
  ],
};

const bookings = [
  {
    id: 'SPT12345ABC',
    type: 'venue',
    venue: 'Elite Sports Arena',
    sport: 'Cricket',
    date: 'Feb 5, 2026',
    time: '6:00 PM - 7:00 PM',
    status: 'upcoming',
    amount: 800,
  },
  {
    id: 'SPT67890DEF',
    type: 'game',
    venue: 'Champions Football Turf',
    sport: 'Football',
    date: 'Feb 6, 2026',
    time: '7:00 AM - 8:00 AM',
    status: 'upcoming',
    amount: 100,
  },
  {
    id: 'SPT11223GHI',
    type: 'trainer',
    trainer: 'Coach Rajesh Kumar',
    sport: 'Cricket',
    date: 'Feb 4, 2026',
    time: '5:00 PM - 6:00 PM',
    status: 'completed',
    amount: 1200,
  },
];

const walletTransactions = [
  { id: '1', type: 'credit', amount: 1000, description: 'Added to wallet', date: 'Feb 3, 2026', time: '10:30 AM' },
  { id: '2', type: 'debit', amount: 800, description: 'Venue booking - Elite Sports Arena', date: 'Feb 2, 2026', time: '6:00 PM' },
  { id: '3', type: 'credit', amount: 200, description: 'Refund - Cancelled booking', date: 'Feb 1, 2026', time: '2:15 PM' },
  { id: '4', type: 'debit', amount: 100, description: 'Game joined - Football', date: 'Jan 30, 2026', time: '7:00 AM' },
];

interface ProfileManagementProps {
  onBack: () => void;
  onLogout: () => void;
}

export function ProfileManagement({ onBack, onLogout }: ProfileManagementProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'bookings' | 'wallet' | 'settings'>('profile');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
              <ChevronLeft className="size-6" />
            </button>
            <h1 className="text-xl">My Profile</h1>
          </div>
        </div>
      </div>

      {/* Profile Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center overflow-hidden">
              <ImageWithFallback
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl mb-1">{userProfile.name}</h2>
              <div className="text-blue-100">{userProfile.phone}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-hide">
            {[
              { id: 'profile', label: 'Profile', icon: User },
              { id: 'bookings', label: 'Bookings', icon: Receipt },
              { id: 'wallet', label: 'Wallet', icon: WalletIcon },
              { id: 'settings', label: 'Settings', icon: Settings },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600'
                }`}
              >
                <tab.icon className="size-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'profile' && (
          <div className="space-y-6">
            {/* Personal Info */}
            <div className="bg-white rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3>Personal Information</h3>
                <button className="flex items-center gap-1 text-blue-600 text-sm hover:underline">
                  <Edit2 className="size-4" />
                  Edit
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">Full Name</label>
                  <div>{userProfile.name}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Email</label>
                  <div>{userProfile.email}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Phone Number</label>
                  <div>{userProfile.phone}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Gender</label>
                  <div>{userProfile.gender}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Date of Birth</label>
                  <div>{new Date(userProfile.dob).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Location</label>
                  <div>{userProfile.area}, {userProfile.city}</div>
                </div>
              </div>
            </div>

            {/* Sports & Skills */}
            <div className="bg-white rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3>Sports & Skill Levels</h3>
                <button className="flex items-center gap-1 text-blue-600 text-sm hover:underline">
                  <Edit2 className="size-4" />
                  Edit
                </button>
              </div>
              <div className="space-y-3">
                {userProfile.preferredSports.map((sport) => (
                  <div key={sport.sport} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span>{sport.sport}</span>
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

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Calendar className="size-6 text-blue-600" />
                </div>
                <div className="text-2xl mb-1">68</div>
                <div className="text-sm text-gray-600">Games Played</div>
              </div>
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Star className="size-6 text-green-600" />
                </div>
                <div className="text-2xl mb-1">4.8</div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="size-6 text-purple-600" />
                </div>
                <div className="text-2xl mb-1">12</div>
                <div className="text-sm text-gray-600">This Month</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
                All
              </button>
              <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm">
                Upcoming
              </button>
              <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm">
                Completed
              </button>
              <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm">
                Cancelled
              </button>
            </div>

            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3>{booking.venue || booking.trainer}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          booking.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
                          booking.status === 'completed' ? 'bg-green-100 text-green-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mb-1">Booking ID: {booking.id}</div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <span>{booking.sport}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="mb-1">₹{booking.amount}</div>
                      <div className="text-sm text-gray-600">{booking.date}</div>
                      <div className="text-sm text-gray-600">{booking.time}</div>
                    </div>
                  </div>

                  {booking.status === 'upcoming' && (
                    <div className="flex gap-2 pt-4 border-t">
                      <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                        View Details
                      </button>
                      <button className="flex-1 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 text-sm">
                        Cancel
                      </button>
                    </div>
                  )}

                  {booking.status === 'completed' && (
                    <div className="flex gap-2 pt-4 border-t">
                      <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                        Download Invoice
                      </button>
                      <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                        Rate Experience
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'wallet' && (
          <div className="space-y-6">
            {/* Wallet Balance */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-sm opacity-90 mb-1">Available Balance</div>
                  <div className="text-3xl">₹1,200</div>
                </div>
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <WalletIcon className="size-8" />
                </div>
              </div>
              <button className="w-full bg-white text-blue-600 py-3 rounded-lg hover:bg-blue-50">
                Add Money
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4">
                <div className="text-sm text-gray-600 mb-1">This Month Spent</div>
                <div className="text-2xl text-red-600">₹3,400</div>
              </div>
              <div className="bg-white rounded-xl p-4">
                <div className="text-sm text-gray-600 mb-1">Total Saved</div>
                <div className="text-2xl text-green-600">₹850</div>
              </div>
            </div>

            {/* Transaction History */}
            <div className="bg-white rounded-xl p-6">
              <h3 className="mb-4">Transaction History</h3>
              <div className="space-y-3">
                {walletTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        <ChevronRight className={`size-5 ${
                          transaction.type === 'credit' ? 'text-green-600 rotate-180' : 'text-red-600'
                        }`} />
                      </div>
                      <div>
                        <div className="mb-1">{transaction.description}</div>
                        <div className="text-sm text-gray-600">{transaction.date} at {transaction.time}</div>
                      </div>
                    </div>
                    <div className={`${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl overflow-hidden">
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <User className="size-5 text-gray-600" />
                  <span>Edit Profile</span>
                </div>
                <ChevronRight className="size-5 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 border-t">
                <div className="flex items-center gap-3">
                  <Settings className="size-5 text-gray-600" />
                  <span>Notification Settings</span>
                </div>
                <ChevronRight className="size-5 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 border-t">
                <div className="flex items-center gap-3">
                  <Settings className="size-5 text-gray-600" />
                  <span>Privacy & Security</span>
                </div>
                <ChevronRight className="size-5 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 border-t">
                <div className="flex items-center gap-3">
                  <Receipt className="size-5 text-gray-600" />
                  <span>Payment Methods</span>
                </div>
                <ChevronRight className="size-5 text-gray-400" />
              </button>
            </div>

            <div className="bg-white rounded-xl overflow-hidden">
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <Settings className="size-5 text-gray-600" />
                  <span>Help & Support</span>
                </div>
                <ChevronRight className="size-5 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 border-t">
                <div className="flex items-center gap-3">
                  <Settings className="size-5 text-gray-600" />
                  <span>Terms & Conditions</span>
                </div>
                <ChevronRight className="size-5 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 border-t">
                <div className="flex items-center gap-3">
                  <Settings className="size-5 text-gray-600" />
                  <span>Privacy Policy</span>
                </div>
                <ChevronRight className="size-5 text-gray-400" />
              </button>
            </div>

            <div className="bg-white rounded-xl overflow-hidden">
              <button
                onClick={onLogout}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <LogOut className="size-5 text-red-600" />
                  <span className="text-red-600">Logout</span>
                </div>
                <ChevronRight className="size-5 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 border-t">
                <div className="flex items-center gap-3">
                  <Trash2 className="size-5 text-red-600" />
                  <span className="text-red-600">Delete Account</span>
                </div>
                <ChevronRight className="size-5 text-gray-400" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
