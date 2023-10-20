export function useSplitText() {
	return (ref, interval = 0, delay = 0) => {
		let text = ref.current.innerText;
		let tags = '';
		let count = 0;

		for (let letter of text) {
			tags += `<span style='display:inline-block; transition-delay:${
				interval * count + delay
			}s'>${letter}</span>`;
			count++;
		}
		ref.current.innerHTML = tags;
	};
}