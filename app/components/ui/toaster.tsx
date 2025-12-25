<<<<<<< HEAD
"use client"

=======
'use client';

import { useToast } from '@/hooks/use-toast';
>>>>>>> a1d85df (typos)
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
<<<<<<< HEAD
} from "@/app/components/ui/toast"
import { useToast } from "@/app/components/ui/use-toast"

export function Toaster() {
  const { toasts } = useToast()
=======
} from '@/components/ui/toast';

export function Toaster() {
  const { toasts } = useToast();
>>>>>>> a1d85df (typos)

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
<<<<<<< HEAD
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
=======
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
>>>>>>> a1d85df (typos)
}
