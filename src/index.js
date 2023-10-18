import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import youtubeReducer from './redux/youtubeSlice';
import flickrReducer from './redux/flickrSlices'
import modalReducer from './redux/modalSlice'
import menuReducer from './redux/menuSlice'


const store = configureStore({
	reducer: {
		youtube: youtubeReducer,
		flickr: flickrReducer,
		modal: modalReducer,
		menu: menuReducer,
	},
});

ReactDOM.render(
	<HashRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</HashRouter>,
	document.getElementById('root')
);
/*
	1. csr방식에 대해서 설명하시오
	- Client Side Rendering vs (Server Side Rendering)
	- 예전 SSR방식은 각 페이지마다 html파일을 직접 만들어놓은뒤 사용자가 url입력시 직접 서버에서 각각의 HTML파일을 불러와서 렌더링하는 방식
	- 사용자가 브라우저에 url입력해서 페이지요청하면 빈 html파일만 서버쪽에서 가져오고 그와동시에 JSX를 반환하는 리액트 컴포넌트를 파일을 같이 불러옴
	- 리액트 컴포넌트가 모두 동작되면 빈 HTML문서에 동적으로 모든 컴포넌트가 렌더링됨
	- 초기 모든 서브페이지에 대한 파일들을 모두가져와서 url요청에 따라서 미리 가져온 리액트 컴포넌트를 바꾸면서 화면을 변경
	2. ssr방식에 비해 csr방식의 장점과 단점에 대해서 설명 
	- 초기로딩속도가 SSR방식에 비해서는 오래 걸림
	- 처음에 빈 HTML파일을 가져오고 모든 리액트 컴포넌트가 마운트되기 전까지 사용자는 빈화면을 봐야 되고 --> 검색엔진에 안좋음
	- 해결방법 (Next.js라는 framework을 이용해서 SSR, CSR방식이 결합된 hydration을 활용)
	- 해결방식 index.html을 불러오고 동적인 react리액트 컴포넌트 마운트되기 전까지 static 데이터를 미리 출력해서 검색엔진 최적화
	3. react 프로젝트에서 public, src 폴더를 통해서 어떤식으로 빌드되면서 화면 렌더링
	- index.js를 구동파일로 해서 App.js모든 컴포넌트를 불러온다음에 내부적으로 내장되어있는 webpack이라는 번들러에 의해서 하나의 js파일로 번들링되고 번들링된 파일이 index.js에 의해서 public폴더 안쪽에 있는 index.html에 합치면서 최종 빌드가 완료된
	- 그럼 브라우저에서는 빌드완료된 index.html을 읽어서 화면 렌더링
	
*/