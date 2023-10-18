/*
	1.Layout.jsx를 왜 만들었는지 설명
*/

import './Layout.scss';

export default function Layout({ title, children }) {
	return (
		<section className={`layout ${title} `}>
			<figure></figure>

			<div className='content'>
				<h1>{title}</h1>
				{children}
			</div>
		</section>
	);
}

/*
	1.리액트로 개발하는 프로젝트가 대단위 페이지이기 때문에 공통적인 틀안에서 특정 변화점이 생겼을때 유지보수 편하게 하려고 작성했다.
	- 원래 서브페이지를 따로 만들어서 작업을 하고 있었는데 서브페이지 구조를 변경할 일이 생겼는데 너무 반복작업이 많아져서 구글링을 한 결과 실무작업에서는 반복적인 페이지 패턴을 따로 컴포넌트로 만들어서 달라지는 부분만 props로 전달해서 호출하는 식으로 구현해봤습니다.
	
*/