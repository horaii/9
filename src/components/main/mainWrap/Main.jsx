import Info from '../info/Info';
import News from '../news/News';
import Visual from '../visual/Visual';
import './Main.scss';

function Main() {
	return (
		<main className='mainWrap'>
			<Visual />
			<News />
			<Info />
		</main>
	);
}

export default Main;