import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';
import { CloudUpload, Image, Loader2 } from 'lucide-react';

const FileUpload = ({ 
  onFileSelect, 
  accept = '.jpg,.png,.jpeg', 
  maxSize = 10, // MB
  isLoading = false,
  className 
}) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [error, setError] = React.useState(null);
  const inputRef = React.useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const validateFile = (file) => {
    setError(null);
    
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a JPG or PNG file');
      return false;
    }
    
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`);
      return false;
    }
    
    return true;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        onFileSelect(file);
      }
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        onFileSelect(file);
      }
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div className={cn('w-full', className)}>
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className={cn(
          'relative flex flex-col items-center justify-center w-full min-h-[280px] rounded-xl border-2 border-dashed transition-all duration-300 cursor-pointer',
          isDragging 
            ? 'border-primary bg-primary/10' 
            : 'border-border hover:border-primary/50 hover:bg-card/50',
          isLoading && 'pointer-events-none opacity-70'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label="Upload file"
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleFileInput}
          className="hidden"
          aria-hidden="true"
        />
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent" />
        </div>

        <div className="relative flex flex-col items-center gap-4 p-6 text-center">
          {isLoading ? (
            <>
              <div className="h-16 w-16 rounded-2xl bg-primary/20 flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">Processing image...</h3>
                <p className="text-sm text-muted-foreground">This usually takes a few seconds</p>
              </div>
            </>
          ) : (
            <>
              <div className="h-16 w-16 rounded-2xl bg-primary/20 flex items-center justify-center">
                <CloudUpload className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">
                  {isDragging ? 'Drop your image here' : 'Drop your image here'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  or <span className="text-primary font-medium">click to browse</span> from your computer
                </p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/50 text-xs text-muted-foreground">
                <Image className="h-3 w-3" />
                <span>Supported formats: JPG, PNG (max {maxSize}MB)</span>
              </div>
            </>
          )}
        </div>
      </motion.div>
      
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-destructive"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export { FileUpload };
