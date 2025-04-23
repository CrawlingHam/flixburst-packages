import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names and resolves Tailwind CSS conflicts
 * @param inputs - Class names or class name arrays to combine
 * @returns A single string of combined and deduplicated class names
 * @example
 * ```tsx
 * // Basic usage
 * cn('text-red-500', 'text-lg') // 'text-lg text-red-500'
 *
 * // With conditional classes
 * cn(
 *   'base-class',
 *   isActive && 'active-class',
 *   isDisabled ? 'disabled-class' : 'enabled-class'
 * )
 *
 * // With arrays
 * cn(['class1', 'class2'], 'class3', ['class4', 'class5'])
 * ```
 */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));
