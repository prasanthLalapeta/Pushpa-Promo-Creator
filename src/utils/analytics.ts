// Google Analytics tracking ID
const GA_TRACKING_ID = 'G-SZFS383069'; // Replace with your actual tracking ID

// Initialize Google Analytics
export const initializeGA = () => {
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  gtag('js', new Date());
  gtag('config', GA_TRACKING_ID);
};

// Track events
export const trackEvent = (category: string, action: string, label?: string) => {
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
    });
  }
};