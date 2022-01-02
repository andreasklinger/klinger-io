import { analyticsTrackingId } from '../config';

export function trackAnalyticsPageview(url: string): void {
  (<any>window).gtag('config', analyticsTrackingId, {
    page_path: url,
  });
}
