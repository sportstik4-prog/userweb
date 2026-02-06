import { useState } from 'react';
import { AuthFlow } from './components/AuthFlow';
import { HomeScreen } from './components/HomeScreen';
import { VenueDiscovery } from './components/VenueDiscovery';
import { VenueDetail } from './components/VenueDetail';
import { BookingFlow } from './components/BookingFlow';
import { GameManagement, CreateGame } from './components/GameManagement';
import { PlayerDiscovery, PlayerProfile } from './components/PlayerDiscovery';
import { TrainerDiscovery, TrainerProfile, ContactTrainer } from './components/TrainerDiscovery';
import { ProfileManagement } from './components/ProfileManagement';

import { UpcomingGamesPage } from './components/UpcomingGamesPage';
import { GameDetailPage } from './components/GameDetailPage';
import { MerchandiseDetail } from './components/MerchandiseDetail';
import { ShoppingCart, CartItem } from './components/ShoppingCart';
import { CheckoutPage } from './components/CheckoutPage';

import { Home, MapPin, Trophy, User, ShoppingBag } from 'lucide-react';

type Page = 
  | 'auth' 
  | 'home' 
  | 'venues' 
  | 'venue-detail' 
  | 'booking' 
  | 'games' 
  | 'upcoming-games'
  | 'create-game' 
  | 'game-detail'
  | 'players'
  | 'player-profile'
  | 'trainers'
  | 'trainer-profile'
  | 'contact-trainer'
  | 'profile'
  | 'merchandise-detail'
  | 'cart'
  | 'checkout';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pendingPage, setPendingPage] = useState<Page | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string>('m1');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAuthComplete = () => {
    setIsAuthenticated(true);
    if (pendingPage) {
      setCurrentPage(pendingPage);
      setPendingPage(null);
    } else {
      setCurrentPage('home');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('auth');
  };

  const navigateTo = (page: Page) => {
    const protectedPages: Page[] = ['booking', 'create-game', 'profile', 'checkout'];
    
    if (!isAuthenticated && protectedPages.includes(page)) {
      setPendingPage(page);
      setCurrentPage('auth');
      return;
    }
    
    setCurrentPage(page);
  };

  const handleJoinGame = () => {
    if (!isAuthenticated) {
      setPendingPage('home'); // or wherever makes sense, maybe the game detail
      setCurrentPage('auth');
      return;
    }
    // Logic for joining game would go here
    navigateTo('home');
  };

  const handleAddToCart = (item: CartItem) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        i => i.id === item.id && i.size === item.size
      );
      
      if (existingItemIndex >= 0) {
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += item.quantity;
        return newItems;
      }
      
      return [...prevItems, item];
    });
    
    // Show success feedback (optional)
    navigateTo('cart');
  };

  const handleUpdateCartQuantity = (id: string, size: string, quantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveFromCart = (id: string, size: string) => {
    setCartItems(prevItems =>
      prevItems.filter(item => !(item.id === id && item.size === size))
    );
  };

  const handleOrderComplete = () => {
    setCartItems([]);
    navigateTo('home');
  };

  const handleNavigateToProduct = (productId: string) => {
    setSelectedProductId(productId);
    navigateTo('merchandise-detail');
  };

  const handleNavigateFromHome = (page: string, productId?: string) => {
    if (productId) {
      setSelectedProductId(productId);
    }
    navigateTo(page as Page);
  };

  return (
    <div className={`size-full ${isAuthenticated && currentPage !== 'auth' ? 'pb-20 md:pb-0' : ''}`}>
      {currentPage === 'auth' && (
        <AuthFlow onComplete={handleAuthComplete} />
      )}
      
      {currentPage === 'home' && (
        <HomeScreen 
          onNavigate={handleNavigateFromHome} 
          onJoinGame={handleJoinGame}
        />
      )}
      
      {currentPage === 'venues' && (
        <VenueDiscovery 
          onSelectVenue={() => navigateTo('venue-detail')} 
          onBack={() => navigateTo('home')} 
        />
      )}
      
      {currentPage === 'venue-detail' && (
        <VenueDetail 
          onBack={() => navigateTo('venues')} 
          onBookNow={() => navigateTo('booking')} 
        />
      )}
      
      {currentPage === 'booking' && (
        <BookingFlow 
          onBack={() => navigateTo('venue-detail')} 
          onComplete={() => navigateTo('home')} 
        />
      )}
      
      {currentPage === 'games' && (
        <GameManagement 
          onBack={() => navigateTo('home')} 
          onCreateGame={() => navigateTo('create-game')}
          onViewGameDetail={() => navigateTo('game-detail')}
        />
      )}

      {currentPage === 'upcoming-games' && (
        <UpcomingGamesPage 
          onBack={() => navigateTo('home')}
          onSelectGame={() => navigateTo('game-detail')}
          onJoinGame={handleJoinGame}
        />
      )}
      
      {currentPage === 'game-detail' && (
        <GameDetailPage 
          onBack={() => navigateTo('upcoming-games')}
          onJoin={handleJoinGame}
        />
      )}
      
      {currentPage === 'create-game' && (
        <CreateGame 
          onBack={() => navigateTo('games')} 
          onComplete={() => navigateTo('games')} 
        />
      )}
      
      {currentPage === 'players' && (
        <PlayerDiscovery 
          onBack={() => navigateTo('home')} 
          onViewProfile={() => navigateTo('player-profile')}
        />
      )}
      
      {currentPage === 'player-profile' && (
        <PlayerProfile onBack={() => navigateTo('players')} />
      )}
      
      {currentPage === 'trainers' && (
        <TrainerDiscovery 
          onBack={() => navigateTo('home')} 
          onViewTrainer={() => navigateTo('trainer-profile')}
        />
      )}
      
      {currentPage === 'trainer-profile' && (
        <TrainerProfile 
          onBack={() => navigateTo('trainers')} 
          onContact={() => navigateTo('contact-trainer')}
        />
      )}
      
      {currentPage === 'contact-trainer' && (
        <ContactTrainer 
          onBack={() => navigateTo('trainer-profile')} 
          onComplete={() => navigateTo('home')}
        />
      )}
      
      {currentPage === 'profile' && (
        <ProfileManagement 
          onBack={() => navigateTo('home')} 
          onLogout={handleLogout}
        />
      )}

      {currentPage === 'merchandise-detail' && (
        <MerchandiseDetail
          productId={selectedProductId}
          onBack={() => navigateTo('home')}
          onAddToCart={handleAddToCart}
          onNavigateToProduct={handleNavigateToProduct}
        />
      )}

      {currentPage === 'cart' && (
        <ShoppingCart
          cartItems={cartItems}
          onBack={() => navigateTo('home')}
          onUpdateQuantity={handleUpdateCartQuantity}
          onRemoveItem={handleRemoveFromCart}
          onProceedToCheckout={() => navigateTo('checkout')}
        />
      )}

      {currentPage === 'checkout' && (
        <CheckoutPage
          cartItems={cartItems}
          onBack={() => navigateTo('cart')}
          onOrderComplete={handleOrderComplete}
        />
      )}

      {/* Mobile Footer Navigation */}
      {isAuthenticated && currentPage !== 'auth' && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50">
          <button 
            onClick={() => navigateTo('home')}
            className={`flex flex-col items-center gap-1 ${currentPage === 'home' ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <Home className="size-6" />
            <span className="text-[10px] font-medium">Home</span>
          </button>
          <button 
            onClick={() => navigateTo('venues')}
            className={`flex flex-col items-center gap-1 ${currentPage === 'venues' ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <MapPin className="size-6" />
            <span className="text-[10px] font-medium">Venues</span>
          </button>
          <button 
            onClick={() => navigateTo('games')}
            className={`flex flex-col items-center gap-1 ${currentPage === 'games' || currentPage === 'upcoming-games' ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <Trophy className="size-6" />
            <span className="text-[10px] font-medium">Games</span>
          </button>
          <button 
            onClick={() => navigateTo('cart')}
            className={`flex flex-col items-center gap-1 relative ${currentPage === 'cart' || currentPage === 'merchandise-detail' || currentPage === 'checkout' ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <ShoppingBag className="size-6" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 size-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
            <span className="text-[10px] font-medium">Cart</span>
          </button>
          <button 
            onClick={() => navigateTo('profile')}
            className={`flex flex-col items-center gap-1 ${currentPage === 'profile' ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <User className="size-6" />
            <span className="text-[10px] font-medium">Profile</span>
          </button>
        </div>
      )}
    </div>
  );
}