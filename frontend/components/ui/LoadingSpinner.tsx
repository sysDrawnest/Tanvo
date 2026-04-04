// // components/ui/LoadingSpinner.tsx
// import React from 'react';
// import { motion } from 'framer-motion';

// interface LoadingSpinnerProps {
//   size?: 'sm' | 'md' | 'lg';
//   color?: 'primary' | 'secondary' | 'accent' | 'cream';
//   fullScreen?: boolean;
//   text?: string;
//   variant?: 'spinner' | 'weave' | 'thread';
// }

// const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
//   size = 'md',
//   color = 'primary',
//   fullScreen = false,
//   text,
//   variant = 'spinner'
// }) => {
//   const colorMap = {
//     primary: '#B43F3F', // Burgundy
//     secondary: '#FF8225', // Orange
//     accent: '#173B45', // Teal
//     cream: '#F8EDED' // Cream
//   };

//   const spinnerColor = colorMap[color] || colorMap.primary;

//   const sizeClasses = {
//     sm: 'w-6 h-6',
//     md: 'w-10 h-10',
//     lg: 'w-16 h-16'
//   };

//   const borderSizes = {
//     sm: 'border-2',
//     md: 'border-3',
//     lg: 'border-4'
//   };

//   const Spinner = () => (
//     <div
//       className={`${sizeClasses[size]} ${borderSizes[size]} rounded-full animate-spin`}
//       style={{
//         borderColor: `${spinnerColor}20`,
//         borderTopColor: spinnerColor
//       }}
//     />
//   );

//   const WeaveSpinner = () => (
//     <div className="relative flex items-center justify-center">
//       {/* Outer rotating ring */}
//       <motion.div
//         className={`${sizeClasses[size]} rounded-full border-2 border-transparent`}
//         style={{
//           borderTopColor: spinnerColor,
//           borderRightColor: `${spinnerColor}80`,
//           borderBottomColor: spinnerColor,
//           borderLeftColor: `${spinnerColor}80`,
//         }}
//         animate={{ rotate: 360 }}
//         transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
//       />

//       {/* Inner weave pattern */}
//       <div className="absolute inset-0 flex items-center justify-center">
//         <div className="grid grid-cols-2 gap-0.5">
//           <div className="w-1 h-1" style={{ backgroundColor: spinnerColor }} />
//           <div className="w-1 h-1" style={{ backgroundColor: 'transparent' }} />
//           <div className="w-1 h-1" style={{ backgroundColor: 'transparent' }} />
//           <div className="w-1 h-1" style={{ backgroundColor: spinnerColor }} />
//         </div>
//       </div>
//     </div>
//   );

//   const ThreadSpinner = () => (
//     <div className="relative flex items-center justify-center">
//       {/* Animated thread line */}
//       <motion.div
//         className="absolute"
//         style={{
//           width: size === 'sm' ? 20 : size === 'md' ? 30 : 40,
//           height: 2,
//           background: `linear-gradient(90deg, transparent, ${spinnerColor}, transparent)`,
//         }}
//         animate={{
//           rotate: [0, 360],
//           scale: [1, 1.2, 1],
//         }}
//         transition={{
//           duration: 1.5,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />

//       {/* Center dot */}
//       <div
//         className={`rounded-full ${size === 'sm' ? 'w-1 h-1' : size === 'md' ? 'w-1.5 h-1.5' : 'w-2 h-2'}`}
//         style={{ backgroundColor: spinnerColor }}
//       />
//     </div>
//   );

//   const SareeSpinner = () => (
//     <div className="relative flex items-center justify-center">
//       {/* Drapery fold effect */}
//       <motion.div
//         className="absolute"
//         style={{
//           width: size === 'sm' ? 20 : size === 'md' ? 30 : 40,
//           height: size === 'sm' ? 20 : size === 'md' ? 30 : 40,
//           background: `radial-gradient(circle at 30% 30%, ${spinnerColor}40, transparent 70%)`,
//           borderRadius: '50%',
//         }}
//         animate={{
//           scale: [1, 1.1, 1],
//           opacity: [0.5, 0.8, 0.5],
//         }}
//         transition={{
//           duration: 2,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />

//       {/* Rotating border */}
//       <motion.div
//         className={`${sizeClasses[size]} rounded-full border-2 border-dashed`}
//         style={{
//           borderColor: spinnerColor,
//         }}
//         animate={{ rotate: 360 }}
//         transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//       />

//       {/* Center motif */}
//       <div
//         className="absolute text-[8px]"
//         style={{ color: spinnerColor }}
//       >
//         ✦
//       </div>
//     </div>
//   );

//   const renderSpinner = () => {
//     switch (variant) {
//       case 'weave':
//         return <WeaveSpinner />;
//       case 'thread':
//         return <ThreadSpinner />;
//       default:
//         return <Spinner />;
//     }
//   };

//   const containerClasses = fullScreen
//     ? 'fixed inset-0 flex flex-col items-center justify-center bg-brandBackground/80 backdrop-blur-sm z-50'
//     : 'flex flex-col items-center justify-center p-4';

//   return (
//     <div className={containerClasses}>
//       {/* Textile texture overlay for fullscreen */}
//       {fullScreen && (
//         <div
//           className="absolute inset-0 pointer-events-none"
//           style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v2H0V0zm0 4h40v2H0V4zm0 4h40v2H0V8zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2z' fill='%23B43F3F' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E")`,
//             opacity: 0.5,
//           }}
//         />
//       )}

//       {renderSpinner()}

//       {text && (
//         <motion.p
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="mt-4 text-sm font-medium"
//           style={{ color: colorMap.accent }}
//         >
//           {text}
//         </motion.p>
//       )}

//       {/* Decorative thread line for fullscreen */}
//       {fullScreen && (
//         <motion.div
//           className="absolute bottom-20 left-0 right-0 h-[1px] mx-auto"
//           style={{
//             width: 100,
//             background: `linear-gradient(90deg, transparent, ${spinnerColor}, transparent)`,
//           }}
//           animate={{
//             scaleX: [1, 1.5, 1],
//             opacity: [0.3, 0.6, 0.3],
//           }}
//           transition={{
//             duration: 2,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//         />
//       )}
//     </div>
//   );
// };

// // Pre-configured spinners for common use cases
// export const PageLoader: React.FC<{ text?: string }> = ({ text = "Weaving your experience..." }) => (
//   <LoadingSpinner size="lg" color="primary" fullScreen text={text} variant="weave" />
// );

// export const ProductLoader: React.FC = () => (
//   <LoadingSpinner size="md" color="secondary" text="Handpicking collections..." variant="thread" />
// );

// export const CartLoader: React.FC = () => (
//   <LoadingSpinner size="md" color="accent" text="Preparing your cart..." variant="saree" />
// );

// export const ButtonLoader: React.FC = () => (
//   <LoadingSpinner size="sm" color="cream" />
// );

// export default LoadingSpinner;
// components/ui/LoadingSpinner.tsx
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'accent' | 'cream';
  fullScreen?: boolean;
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  fullScreen = false,
  text
}) => {
  const colorMap = {
    primary: '#B43F3F', // Burgundy
    secondary: '#FF8225', // Orange
    accent: '#173B45', // Teal
    cream: '#F8EDED' // Cream
  };

  const spinnerColor = colorMap[color] || colorMap.primary;

  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4'
  };

  const containerClasses = fullScreen
    ? 'fixed inset-0 flex flex-col items-center justify-center bg-[#F8EDED]/80 backdrop-blur-sm z-50'
    : 'flex flex-col items-center justify-center';

  return (
    <div className={containerClasses}>
      {/* Textile texture overlay for fullscreen */}
      {fullScreen && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v2H0V0zm0 4h40v2H0V4zm0 4h40v2H0V8zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2zm0 4h40v2H0v-2z' fill='%23B43F3F' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            opacity: 0.5,
          }}
        />
      )}

      <div
        className={`${sizeClasses[size]} rounded-full animate-spin`}
        style={{
          borderColor: `${spinnerColor}20`,
          borderTopColor: spinnerColor
        }}
      />

      {text && (
        <p
          className="mt-4 text-sm font-medium"
          style={{ color: '#173B45' }}
        >
          {text}
        </p>
      )}
    </div>
  );
};

// Pre-configured spinners
export const PageLoader: React.FC = () => (
  <LoadingSpinner size="lg" color="primary" fullScreen text="Weaving your experience..." />
);

export default LoadingSpinner;