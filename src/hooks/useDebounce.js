import { useState, useRef } from 'react';

//해당 hook의 인수값으로 특정 값을 전달 받아서
//해당 값을 또다른 state에 옮겨담아줌
//내부적으로 0.5초안에 state변경이 일어나면 setTimeout의 리턴값을 초기화시키면서
//재이벤트 방지
//결과적으로 0.5초안에 계속 특정 값이 변경되고 있으면 state변경을 하고 있지 않다가
//값 변경후 0.5초가 지나야지만 state값을 갱신
export const useDebounce = (value) => {
	const [DebouncedVal, setDebouncedVal] = useState(value);
	const blocker = useRef(null);

	clearTimeout(blocker.current);

	blocker.current = setTimeout(() => {
		setDebouncedVal(value);
	}, 500);

	return DebouncedVal;
};