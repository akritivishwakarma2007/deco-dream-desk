import React from 'react';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'hero' | 'premium';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  asChild?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', size = 'md', className = '', asChild, children, ...props }, ref) => {
    const classes = `btn btn-${variant} btn-${size === 'md' ? 'default-size' : size} ${className}`.trim();
    
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement, {
        className: `${(children as React.ReactElement).props.className || ''} ${classes}`.trim(),
      });
    }
    
    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
