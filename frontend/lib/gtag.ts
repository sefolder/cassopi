declare global {
  interface Window {
    gtag: (param1: string, param2: string, param3: object) => void;
  }
}

const GA_TRAKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

// log the pageview with their URL
export const pageview = (url: any) => {
  window.gtag("config", `${GA_TRAKING_ID}`, {
    page_path: url,
  });
};

// log specific events happening.
export const event = ({ action, category, label, value }: any) => {
  window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
  });
};
