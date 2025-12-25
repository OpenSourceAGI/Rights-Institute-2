'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { signIn, useSession } from '@/lib/auth-client';

export function GoogleOneTap() {
  const { data: session } = useSession();
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (!scriptLoaded || typeof window === 'undefined') return;
    if (session) return; // Don't show if already signed in

    const handleCredentialResponse = async (response: any) => {
      try {
        await signIn.social({
          provider: 'google',
          callbackURL: '/dashboard',
          idToken: response.credential,
        });
      } catch (error) {
        console.error('Sign in failed:', error);
      }
    };

    // Initialize Google One Tap
    if ((window as any).google?.accounts?.id) {
      (window as any).google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
        callback: handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
        itp_support: true,
      });

      // Show the One Tap prompt
      (window as any).google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // One Tap is not displayed or was skipped
          console.log('Google One Tap not displayed:', notification.getNotDisplayedReason());
        }
      });
    }
  }, [scriptLoaded, session]);

  const handleScriptLoad = () => {
    setScriptLoaded(true);
  };

  return (
    <Script
      src="https://accounts.google.com/gsi/client"
      strategy="afterInteractive"
      onLoad={handleScriptLoad}
    />
  );
}
