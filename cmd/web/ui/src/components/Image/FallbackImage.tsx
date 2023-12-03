import clsx from 'clsx'

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  rounded?: boolean
  pulse?: boolean
  size: 'full' | 'mini'
}

const FallbackImage: React.FC<Props> = ({
  children,
  rounded,
  size,
  pulse,
  className,
  ...props
}) => (
  <div
    className={clsx(
      'aspect-square',
      size === 'full' && 'sm:w-64 sm:h-64',
      size === 'mini' && 'sm:w-16 sm:h-16',
      pulse && 'animate-pulse',
      rounded && 'rounded',
      'flex items-center justify-center',
      'font-semibold text-2xl',
      'bg-neutral-300 dark:bg-neutral-800',
      className
    )}
    {...props}
  >
    {children}
  </div>
)


export default FallbackImage