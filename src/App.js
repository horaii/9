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
import Menu from './components/common/menu/Menu'
;import Footer from './components/common/footer/Footer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
	const queryClient = new QueryClient();
	

	return (
		<QueryClientProvider client={queryClient}>
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
				<Footer />
				<Menu />
			</main>
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}

export default App;