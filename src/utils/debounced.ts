export const debounced = <T>(fn: (a: T) => void, delay: number) => {
	let timer: NodeJS.Timeout;
	return (a: T) => {
		clearTimeout(timer);
		timer = setTimeout(() => fn(a), delay);
	};
};
