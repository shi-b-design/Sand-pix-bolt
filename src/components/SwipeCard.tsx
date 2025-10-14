import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { Heart, X } from 'lucide-react';
import { BrandDesign } from '../types/preferences';

interface SwipeCardProps {
  brand: BrandDesign;
  onSwipe: (liked: boolean) => void;
  isActive: boolean;
}

export default function SwipeCard({ brand, onSwipe, isActive }: SwipeCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-30, 30]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 100) {
      onSwipe(info.offset.x > 0);
    }
  };

  return (
    <motion.div
      style={{
        x,
        rotate,
        opacity,
        cursor: isActive ? 'grab' : 'default',
      }}
      drag={isActive ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      className="absolute w-full h-full"
    >
      <div className="relative w-full h-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <img
          src={brand.image}
          alt={brand.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h2 className="text-4xl font-bold mb-2">{brand.name}</h2>
          <p className="text-lg opacity-90">
            {brand.aestheticAndMood.primaryMoods.luxury > 7 ? 'Luxury' : ''}
            {brand.aestheticAndMood.primaryMoods.playful > 7 ? 'Playful' : ''}
            {brand.aestheticAndMood.primaryMoods.minimalist > 7 ? 'Minimalist' : ''}
            {brand.aestheticAndMood.primaryMoods.techy > 7 ? 'Tech-Forward' : ''}
            {brand.aestheticAndMood.primaryMoods.corporate > 7 ? 'Corporate' : ''}
            {' Brand'}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
