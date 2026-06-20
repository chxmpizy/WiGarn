import * as React from 'react';

import { cn } from '@ui/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode; // เพิ่ม Property นี้เข้าไปตรงๆ ที่คอมโพเนนต์เรา
}

function Input({ className, type, icon, ...props }: InputProps) {
  return (
    <div className="relative flex w-full items-center">
      {/* 2. ถ้ามีการส่ง icon เข้ามา ให้เรนเดอร์จัดวางไว้ทางซ้าย */}
      {icon && (
        <div className="text-muted-foreground pointer-events-none absolute left-3 flex items-center">
          {icon}
        </div>
      )}

      <input
        type={type}
        data-slot="input"
        className={cn(
          'border-input selection:bg-primary selection:text-primary-foreground file:text-foreground placeholder:text-muted-foreground dark:bg-input/30 h-9 w-full min-w-0 rounded-md border bg-transparent py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',

          // 3. เงื่อนไขสำคัญ: ถ้ามี icon ให้เขยิบตัวหนังสือไปทางขวาด้วย pl-9 (Padding-Left) ตัวหนังสือจะได้ไม่ทับไอคอน
          icon ? 'pr-3 pl-9' : 'px-3',

          className,
        )}
        {...props}
      />
    </div>
  );
}

export { Input };
