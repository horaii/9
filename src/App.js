import './styles/Global.scss';
import { Route, Switch } from 'react-router-dom';
import Header from './components/common/header/Header';
import Department from './components/sub/department/Department';
import Youtube from './components/sub/youtube/Youtube';
import Members from './components/sub/members/Members';
import Gallery from './components/sub/gallery/Gallery';
import Contact from './components/sub/contact/Contact';
import Detail from './components/sub/youtube/Detail';
import Community from './components/sub/community/Community';
import Main from './components/main/mainWrap/Main';
import { useMedia } from './hooks/useMedia';
import { useEffect } from 'react';
import { fetchFlickr } from './redux/flickrSlices';
import { fetchYoutube } from './redux/youtubeSlice';
import { useDispatch } from 'react-redux';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		//컴포넌트 마운트시 fetchYoutbe가 반환한 action객체를 dispatch함수를 통해서 리듀서에 전달
		dispatch(fetchYoutube());
	}, []);
	return (
		<main className={useMedia()}>
			<Switch>
				<Route exact path='/'>
					<Header isMain={true} />
					<Main />
				</Route>
				<Route path='/'>
					<Header isMain={false} />
				</Route>
			</Switch>
			<Route path='/department' component={Department} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/members' component={Members} />
			<Route path='/contact' component={Contact} />
			<Route path='/community' component={Community} />
			<Route path='/detail/:id' component={Detail} />
			{/* params는 url에 특정 컴포넌트를 연결할때 url로 정보값을 같이 전달 경로/:변수명 */}
			</main>
	);
}

export default App;