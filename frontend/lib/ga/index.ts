declare global {
  interface Window {
    gtag: (param1: string, param2: string, param3: object) => void;
  }
}

// log the pageview with their URL
export const pageview = (url: any) => {
  window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS!, {
    page_path: url,
  });
};

// log specific events happening.
export const event = ({ action, params }: any) => {
  window.gtag("event", action, params);
};
