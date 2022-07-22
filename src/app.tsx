import React, { useEffect, useState } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { HashRouter, Routes, Route } from 'react-router-dom';
import CookieConsent, {
  getCookieConsentValue,
  Cookies,
} from 'react-cookie-consent';
import ReactGA from 'react-ga4';
import { ErrorFallback } from './components/common/error-fallback';
import { LinkedInPracticesPage } from './pages/linkedin-practices';
import LinkedInPracticesMenuPage from './pages/linkedin-practices-menu';
import LivePreviewPractices from './pages/live-preview';

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const { DEV } = import.meta.env;

const App = () => {
  const [isConsent, setIsConsent] = useState(() => getCookieConsentValue());

  const handleAcceptCookie = () => {
    setIsConsent(getCookieConsentValue());
  };

  const handleDeclineCookie = () => {
    // remove google analytics cookies
    Cookies.remove('_ga');
    Cookies.remove('_gat');
    Cookies.remove('_gid');
  };

  useEffect(() => {
    if (isConsent) {
      if (DEV && GA_MEASUREMENT_ID) {
        ReactGA.initialize(GA_MEASUREMENT_ID, { gtagOptions: { debug_mode: true } });
      } else if (!DEV) {
        ReactGA.initialize(GA_MEASUREMENT_ID);
      }
    }
  }, [isConsent]);

  return (
    <main className="mx-4 desktop:w-3/4 desktop:mx-auto">
      <HashRouter basename="/">
        <Routes>
          <Route path="/" element={<LinkedInPracticesMenuPage />} />
          <Route path="/linkedin/:encodedUrl" element={<LinkedInPracticesPage />} />
          <Route path="/playground" element={<LivePreviewPractices />} />
        </Routes>
      </HashRouter>
      <CookieConsent
        enableDeclineButton
        onAccept={handleAcceptCookie}
        onDecline={handleDeclineCookie}
      >
        This website use cookies to know is there even people using this app.
      </CookieConsent>
    </main>
  );
};

const AppWithErrorBoundary = withErrorBoundary(App, {
  FallbackComponent: ErrorFallback,
});

export default AppWithErrorBoundary;
