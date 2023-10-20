import { useRef } from 'react';

//인수로 특정 기능의 함수를 전달받아서 0.2초안에는 재호출 불가능하도록 다시 wrapping처리해서
//함수 형태로 반환

export const useThrottle = (func) => {
	const eventBlocker = useRef(null);

	return () => {
		if (eventBlocker.current) return;
		eventBlocker.current = setTimeout(() => {
			func();
			eventBlocker.current = null;
		}, 200);
	};
};
/*	
	Throttle
	단기간에 반복적인 이벤트가 많이 발생시
	이벤트호출에 강제로 인터벌을 발생시켜서 핸들러함수의 물리적인 호출 횟수 줄임
	Debounce
	단기간에 반복적인 이벤트가 많이 발생시
	일정 시간을 주기로 특정이벤트가 계속 실행중이면 지연시간을 계속 초기화시키면서
	아예 핸들러함수의 호출 자체를 막음
	실사용예 - 인풋의 값이 바뀔때마다 무거운 함수를 호출해야될때
*/