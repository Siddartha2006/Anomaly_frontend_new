import React from 'react';
import { cn } from '../../lib/utils';

const Input = React.forwardRef(({ className, type, icon: Icon, error, ...props }, ref) => {
  return (
    <div className="relative">
      {Icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Icon className="h-4 w-4" />
        </div>
      )}
      <input
        type={type}
        className={cn(
          'flex h-11 w-full rounded-lg border border-input bg-background/50 px-4 py-2 text-sm ring-offset-background transition-colors',
          'file:border-0 file:bg-transparent file:text-sm file:font-medium',
          'placeholder:text-muted-foreground',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:border-primary',
          'disabled:cursor-not-allowed disabled:opacity-50',
          Icon && 'pl-10',
          error && 'border-destructive focus:ring-destructive',
          className
        )}
        ref={ref}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-xs text-destructive">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

const Textarea = React.forwardRef(({ className, error, ...props }, ref) => {
  return (
    <div>
      <textarea
        className={cn(
          'flex min-h-[120px] w-full rounded-lg border border-input bg-background/50 px-4 py-3 text-sm ring-offset-background transition-colors',
          'placeholder:text-muted-foreground',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:border-primary',
          'disabled:cursor-not-allowed disabled:opacity-50 resize-none',
          error && 'border-destructive focus:ring-destructive',
          className
        )}
        ref={ref}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-xs text-destructive">{error}</p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export { Input, Textarea };
