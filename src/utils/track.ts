import { browser } from '$app/environment';
declare global {
	interface Window {
		umami:
			| {
					track: (eventName: string, data?: any) => void;
			  }
			| undefined;
	}
}

export const track = (eventName: string, data?: any) => {
	if (!browser) return;

	if (location && location.hostname === 'localhost') console.log(`[track] ${eventName}`, data);

	if (!window || !(window as unknown as any).umami?.track) return;

	if (data) {
		window.umami?.track(eventName, data);
	} else {
		window.umami?.track(eventName);
	}
};
