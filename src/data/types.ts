export type FediAPICommunityEntry = {
	community: {
		id: number;
		name: string;
		title: string;
		description: string;
		removed: boolean;
		published: string;
		updated: string;
		deleted: boolean;
		nsfw: boolean;
		actor_id: string;
		local: boolean;
		hidden: boolean;
		posting_restricted_to_mods: boolean;
		instance_id: number;
		icon?: string;
		banner?: string;
	};
	subscribed: string;
	blocked: boolean;
	counts: {
		id: number;
		community_id: number;
		subscribers: number;
		posts: number;
		comments: number;
		published: string;
		users_active_day: number;
		users_active_week: number;
		users_active_month: number;
		users_active_half_year: number;
	};
	url: string;
	id: string;
};

export type CommunityEntry = {
	instanceDomain: string;
	id: string;
	name: string;
	title: string;
	description: string;
	nsfw: boolean;

	icon?: string;
	banner?: string;

	counts: {
		subscribers: number;
		posts: number;
		comments: number;
		usersActiveDay: number;
	};
};

export type InstanceEntry = {
	id: string;
	domain: string;
	name: string;
	icon?: string;
	banner?: string;
	// languageCodes: string[];
	// federatedInstances: {
	// 	linked: string[];
	// 	allowed: string[];
	// 	blocked: string[];
	// };
};

type FediAPIInstanceSite = {
	name: string;
	id: number;
	icon?: string;
	banner?: string;
	actor_id: string;
};

export type FediAPIInstance = {
	site_view: {
		site: FediAPIInstanceSite;
	};
	federated_instances: {
		linked: string[] | null;
		allowed: string[] | null;
		blocked: string[] | null;
	};
	all_languages: {
		id: number;
		code: string;
		name: string;
	}[];
	discussion_languages: number[];
};

export type LanguageEntry = {
	id: string;
	name: string;
};
