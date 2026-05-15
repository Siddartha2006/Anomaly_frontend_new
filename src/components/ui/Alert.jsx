import React from 'react';
import { cn } from '../../lib/utils';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';

const Alert = ({ 
  variant = 'default', 
  title, 
  description, 
  dismissible = false, 
  onDismiss,
  className 
}) => {
  const variants = {
    default: {
      container: 'bg-card border-border',
      icon: <Info className="h-4 w-4 text-muted-foreground" />,
    },
    success: {
      container: 'bg-success/10 border-success/30',
      icon: <CheckCircle className="h-4 w-4 text-success" />,
    },
    warning: {
      container: 'bg-warning/10 border-warning/30',
      icon: <AlertTriangle className="h-4 w-4 text-warning" />,
    },
    destructive: {
      container: 'bg-destructive/10 border-destructive/30',
      icon: <AlertCircle className="h-4 w-4 text-destructive" />,
    },
    info: {
      container: 'bg-primary/10 border-primary/30',
      icon: <Info className="h-4 w-4 text-primary" />,
    },
  };

  const config = variants[variant];

  return (
    <div
      className={cn(
        'relative flex gap-3 rounded-lg border p-4',
        config.container,
        className
      )}
      role="alert"
    >
      <div className="flex-shrink-0 mt-0.5">{config.icon}</div>
      <div className="flex-1 space-y-1">
        {title && <h5 className="text-sm font-medium text-foreground">{title}</h5>}
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      {dismissible && (
        <button
          onClick={onDismiss}
          className="flex-shrink-0 p-1 rounded-md hover:bg-accent transition-colors"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>
      )}
    </div>
  );
};

export { Alert };
