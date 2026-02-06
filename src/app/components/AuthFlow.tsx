import { useState } from 'react';
import { Phone, ArrowRight, User, Calendar, MapPin, Dumbbell, ChevronRight } from 'lucide-react';

const sports = [
  { id: 'cricket', name: 'Cricket', icon: '🏏' },
  { id: 'football', name: 'Football', icon: '⚽' },
  { id: 'badminton', name: 'Badminton', icon: '🏸' },
  { id: 'tennis', name: 'Tennis', icon: '🎾' },
  { id: 'basketball', name: 'Basketball', icon: '🏀' },
  { id: 'volleyball', name: 'Volleyball', icon: '🏐' },
  { id: 'swimming', name: 'Swimming', icon: '🏊' },
  { id: 'yoga', name: 'Yoga', icon: '🧘' },
];

const skillLevels = ['Beginner', 'Intermediate', 'Advanced'];

interface AuthFlowProps {
  onComplete: () => void;
}

export function AuthFlow({ onComplete }: AuthFlowProps) {
  const [step, setStep] = useState<'phone' | 'otp' | 'profile'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [profile, setProfile] = useState({
    fullName: '',
    gender: '',
    dob: '',
    city: '',
    area: '',
    preferredSports: [] as string[],
    skillLevels: {} as Record<string, string>,
  });

  const handleSendOTP = () => {
    if (phoneNumber.length === 10) {
      setStep('otp');
    }
  };

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      setStep('profile');
    }
  };

  const toggleSport = (sportId: string) => {
    if (profile.preferredSports.includes(sportId)) {
      setProfile({
        ...profile,
        preferredSports: profile.preferredSports.filter(s => s !== sportId),
      });
    } else {
      setProfile({
        ...profile,
        preferredSports: [...profile.preferredSports, sportId],
      });
    }
  };

  const setSkillLevel = (sportId: string, level: string) => {
    setProfile({
      ...profile,
      skillLevels: {
        ...profile.skillLevels,
        [sportId]: level,
      },
    });
  };

  const handleCompleteProfile = () => {
    onComplete();
  };

  if (step === 'phone') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <img 
              src="figma:asset/8ae1b7e9fc5eb182fbb472b0451115094fd063df.png" 
              alt="Sportstik" 
              className="h-12 mx-auto mb-4"
            />
            <h1 className="text-2xl mb-2">Welcome to Sportstik</h1>
            <p className="text-gray-600">Let's get you started with your sports journey</p>
          </div>

          <div className="mb-6">
            <label className="block text-sm mb-2">Mobile Number</label>
            <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-3">
              <Phone className="size-5 text-gray-400" />
              <span className="text-gray-600">+91</span>
              <input
                type="tel"
                placeholder="Enter 10-digit mobile number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                className="flex-1 outline-none"
                maxLength={10}
              />
            </div>
          </div>

          <button
            onClick={handleSendOTP}
            disabled={phoneNumber.length !== 10}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
          >
            Send OTP
            <ArrowRight className="size-5" />
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    );
  }

  if (step === 'otp') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="size-8 text-blue-600" />
            </div>
            <h1 className="text-2xl mb-2">Verify OTP</h1>
            <p className="text-gray-600">We've sent a code to +91 {phoneNumber}</p>
          </div>

          <div className="mb-6">
            <label className="block text-sm mb-2">Enter OTP</label>
            <div className="flex gap-2 justify-center">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={otp[index] || ''}
                  onChange={(e) => {
                    const newOtp = otp.split('');
                    newOtp[index] = e.target.value;
                    setOtp(newOtp.join(''));
                    if (e.target.value && index < 5) {
                      const nextInput = e.target.parentElement?.children[index + 1] as HTMLInputElement;
                      nextInput?.focus();
                    }
                  }}
                  className="w-12 h-12 text-center border border-gray-300 rounded-lg text-xl outline-none focus:border-blue-600"
                />
              ))}
            </div>
          </div>

          <button
            onClick={handleVerifyOTP}
            disabled={otp.length !== 6}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Verify & Continue
          </button>

          <button className="w-full text-blue-600 text-sm mt-4 hover:underline">
            Resend OTP
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 overflow-y-auto">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 my-8">
        <div className="mb-8">
          <h1 className="text-2xl mb-2">Complete Your Profile</h1>
          <p className="text-gray-600">Help us personalize your sports experience</p>
        </div>

        <div className="space-y-6">
          {/* Basic Info */}
          <div>
            <label className="block text-sm mb-2">Full Name *</label>
            <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-3">
              <User className="size-5 text-gray-400" />
              <input
                type="text"
                placeholder="Enter your full name"
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                className="flex-1 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2">Gender *</label>
              <select
                value={profile.gender}
                onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                className="w-full border border-gray-300 rounded-lg p-3 outline-none"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2">Date of Birth *</label>
              <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-3">
                <Calendar className="size-5 text-gray-400" />
                <input
                  type="date"
                  value={profile.dob}
                  onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
                  className="flex-1 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2">City *</label>
              <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-3">
                <MapPin className="size-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Your city"
                  value={profile.city}
                  onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                  className="flex-1 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2">Area *</label>
              <input
                type="text"
                placeholder="Your area"
                value={profile.area}
                onChange={(e) => setProfile({ ...profile, area: e.target.value })}
                className="w-full border border-gray-300 rounded-lg p-3 outline-none"
              />
            </div>
          </div>

          {/* Preferred Sports */}
          <div>
            <label className="block text-sm mb-2">
              <Dumbbell className="size-4 inline mr-1" />
              Preferred Sports * (Select at least one)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {sports.map((sport) => (
                <button
                  key={sport.id}
                  onClick={() => toggleSport(sport.id)}
                  className={`p-3 border rounded-lg text-center transition-all ${
                    profile.preferredSports.includes(sport.id)
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-400'
                  }`}
                >
                  <div className="text-2xl mb-1">{sport.icon}</div>
                  <div className="text-xs">{sport.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Skill Levels */}
          {profile.preferredSports.length > 0 && (
            <div>
              <label className="block text-sm mb-3">Skill Level for Selected Sports *</label>
              <div className="space-y-4">
                {profile.preferredSports.map((sportId) => {
                  const sport = sports.find(s => s.id === sportId);
                  return (
                    <div key={sportId} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl">{sport?.icon}</span>
                        <span>{sport?.name}</span>
                      </div>
                      <div className="flex gap-2">
                        {skillLevels.map((level) => (
                          <button
                            key={level}
                            onClick={() => setSkillLevel(sportId, level)}
                            className={`flex-1 py-2 px-3 text-sm rounded-lg border transition-colors ${
                              profile.skillLevels[sportId] === level
                                ? 'border-blue-600 bg-blue-600 text-white'
                                : 'border-gray-300 hover:border-blue-400'
                            }`}
                          >
                            {level}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <button
            onClick={handleCompleteProfile}
            disabled={
              !profile.fullName ||
              !profile.gender ||
              !profile.dob ||
              !profile.city ||
              !profile.area ||
              profile.preferredSports.length === 0 ||
              profile.preferredSports.some(sportId => !profile.skillLevels[sportId])
            }
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
          >
            Complete Profile
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
