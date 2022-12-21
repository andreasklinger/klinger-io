import {analyticsTrackingId} from '../config';

export function trackAnalyticsPageview(url: string): void {
    // todo: update analytics provider
    if (analyticsTrackingId) {
        (<any>window).gtag('config', analyticsTrackingId, {
            page_path: url,
        });
    }
}
