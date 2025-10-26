import { UserIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
interface UserAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  name?: string;
  avatar?: string;
  className?: string;
}

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16'
};

const iconSizes = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8'
};

export default function UserAvatar({
  size = 'md',
  name = 'User',
  avatar,
  className = ''
}: UserAvatarProps) {
  // const initials = name
  //   .split(' ')
  //   .map(word => word[0])
  //   .join('')
  //   .toUpperCase()
  //   .slice(0, 2);

  return (
    <div className={`${sizeClasses[size]} bg-[#267452] rounded-full flex items-center justify-center overflow-hidden ${className}`}>
      {avatar ? (
        <Image
          src={avatar}
          alt={name}
          layout="fill"
          objectFit="cover"
        />
      ) : (
        <UserIcon className={`${iconSizes[size]} text-white`} />
      )}
    </div>
  );
}
