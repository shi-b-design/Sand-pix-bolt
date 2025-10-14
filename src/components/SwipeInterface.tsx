import { Heart, X } from 'lucide-react';
import SwipeCard from './SwipeCard';
import ProgressBar from './ProgressBar';
import { brandDesigns } from '../utils/brandData';
import { useSwipeStore } from '../store/useSwipeStore';

export default function SwipeInterface() {
  const { currentIndex, addSwipeResult, nextCard, setCurrentPhase } = useSwipeStore();

  const handleSwipe = (liked: boolean) => {
    const brand = brandDesigns[currentIndex];
    addSwipeResult({
      brandName: brand.name,
      liked,
      brandDesign: brand,
      timestamp: new Date(),
    });

    if (currentIndex === brandDesigns.length - 1) {
      setTimeout(() => {
        setCurrentPhase('brandInfo');
      }, 300);
    } else {
      nextCard();
    }
  };

  if (currentIndex >= brandDesigns.length) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mb-8">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
          Discover Your Style
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Swipe right on designs you love, left on ones you don't
        </p>
        <ProgressBar current={currentIndex + 1} total={brandDesigns.length} />
      </div>

      <div className="relative w-full max-w-md aspect-[3/4] mb-8">
        {brandDesigns.map((brand, index) => (
          <div
            key={brand.name}
            className="absolute inset-0"
            style={{
              zIndex: brandDesigns.length - index,
              display: index >= currentIndex && index < currentIndex + 3 ? 'block' : 'none',
            }}
          >
            <SwipeCard
              brand={brand}
              onSwipe={handleSwipe}
              isActive={index === currentIndex}
            />
          </div>
        ))}
      </div>

      <div className="flex gap-6">
        <button
          onClick={() => handleSwipe(false)}
          className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
        >
          <X className="w-8 h-8 text-red-500" />
        </button>
        <button
          onClick={() => handleSwipe(true)}
          className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
        >
          <Heart className="w-8 h-8 text-green-500" />
        </button>
      </div>
    </div>
  );
}
