import {analyticsTrackingId} from '../config';

export function trackAnalyticsPageview(url: string): void {
    if (analyticsTrackingId) {
        (<any>window).gtag('config', analyticsTrackingId, {
            page_path: url,
        });
    }
}
