import './Visual.scss';
import { useSelector } from 'react-redux';

function Visual() {
	const { data } = useSelector((store) => store.youtube);
	return (
		<section className='visual'>
			<h2>Visual</h2>
			{data.map((vid, idx) => {
				if (idx >= 5) return null;
				return (
					<article key={idx}>
						<h2>{vid.snippet.title}</h2>
					</article>
				);
			})}
		</section>
	);
}

export default Visual;