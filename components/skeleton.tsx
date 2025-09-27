interface SkeletonProps {
  className?: string;
}

export default function Skeleton(props: SkeletonProps): JSX.Element {
  return <div className={`animate-pulse w-full h-4 bg-gray-300 dark:bg-gray-700 rounded-md ${props.className}`}></div>
}