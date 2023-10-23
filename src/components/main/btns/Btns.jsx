import Anime from '../../../asset/anime';
import { useThrottle } from '../../../hooks/useThrottle';
import './Btns.scss';
import { useRef, useEffect, useState } from 'react';

function Btns() {
	//ul요소를 담을 참조객체 생성
	const refBtns = useRef(null);
	//새로위치값이 배열로 담길 참조객체 생성
	let pos = useRef([]);
	const [Num, setNum] = useState(0);

	//컴포넌트 마운트시 myScroll클래스의 모든 섹션의 세로위치값을 배열에 저장하는 함수
	const getPos = () => {
		pos.current = [];
		const secs = document.body.querySelectorAll('.myScroll');
		for (let sec of secs) pos.current.push(sec.offsetTop);
		setNum(pos.current.length);
	};

	//브라우저 리사이즈시 현재 세로 스크롤값을 갱신하는 함수
	const modifyPos = () => {
		let activeIndex = 0;
		if (!refBtns.current) return;
		const lis = refBtns.current.querySelectorAll('li');
		lis.forEach((li, idx) => {
			li.classList.contains('on') && (activeIndex = idx);
		});
		window.scrollTo(0, pos.current[activeIndex]);
	};

	//브라우저 스크롤시 버튼을 반복돌면서 스크롤이 특정 섹션영역을 넘어가면 해당 순번의 버튼 활성화 함수
	const activation = () => {
		//컴포넌트 언마운트시 queryselector앞에 null오류가 뜰때에는
		//해결방법 - 해당값이 없을때 return 으로 강제 함수 종료
		if (!refBtns.current) return;
        console.log(refBtns.current)
		const btns = refBtns.current.querySelectorAll('li');
		const scroll = window.scrollY;
		pos.current.forEach((el, idx) => {
			if (scroll >= el - window.innerHeight / 2) {
				for (let btn of btns) btn.classList.remove('on');
				btns[idx].classList.add('on');
			}
		});
	};

	const throttledActivation = useThrottle(activation)
	const throttledGetPos = useThrottle(getPos)

	useEffect(() => {
		console.log('repeat');
		modifyPos();
		getPos();
		window.addEventListener('resize', throttledGetPos);
		window.addEventListener('resize', modifyPos);
		window.addEventListener('scroll', throttledActivation);
		return () => {
			window.removeEventListener('resize', throttledGetPos);
			window.removeEventListener('resize', modifyPos);
			window.removeEventListener('scroll', throttledActivation);
			//만약 스크롤 위치가 최상단으로 이동하지 않은상태에서 페이지 변경시 스크롤위치를 위로 올리기 위해서
			//해당 컴포넌트 언마운트시 무조건 스크롤 y축을 0으로 이동
			window.scrollTo(0, 0);
		};
	}, [throttledActivation, throttledGetPos]);

	return (
		<ul className='scroll_navi' ref={refBtns}>
			{Array(Num)
				.fill()
				.map((el, idx) => {
					return (
						<li
							className={idx === 0 ? 'on' : ''}
							key={idx}
							onClick={() => {
								new Anime(window, {
									prop: 'scroll',
									value: pos.current[idx],
									duration: 500,
								});
							}}
						></li>
					);
				})}
		</ul>
	);
}
export default Btns;
/*
  스크롤 모션 작업 단계
  1. 컴포넌트 마운트시 각각의 버튼 클릭시 이동해야되는 세로 섹션의 위치값들을 배열로 저장하는 함수 호출
  2. 각 세로버튼 클릭시 클릭한 버튼의 순번에 맞는 배열의 위치값을 anime를 활용해서 세로 스크롤 모션 이동
*/