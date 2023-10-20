import Layout from '../../common/layout/Layout';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import './Detail.scss';

function Detail() {
	const { id } = useParams();
	const [Data, setData] = useState(null);
	const [TOpen, setTOpen] = useState(false)
	const desc = Data?.description
	const refInfo = useRef(null)

	useEffect(() => {
		const api_key = process.env.REACT_APP_YOUTUBE_API;
		const baseURL = 'https://www.googleapis.com/youtube/v3/playlistItems';
		fetch(`${baseURL}?key=${api_key}&id=${id}&part=snippet`)
			.then((data) => data.json())
			.then((json) => {
				console.log(json.items[0].snippet);
				setData(json.items[0].snippet);
			});
	}, []);
		if(TOpen===true)refInfo.current?.classList.remove('on')
		else refInfo.current?.classList.add('on')

	return (
		<Layout title={'Detail'}>

			<div className='vidBox'>
				<iframe
					src={`https://www.youtube.com/embed/${Data?.resourceId.videoId}`}
					title='youtube'
				></iframe>
				<h2>{Data?.title}</h2>
				<div
					onClick={() => setTOpen(!TOpen)}
					className='infoBox'
					ref={refInfo}
				>
					{TOpen === true ?
						<p>{desc}</p>
						:
						<p>{desc?.length > 100 ? desc.substr(0, 100) + '...' : desc}</p>
					}
				</div>


			</div>
		</Layout>
	);
	
}

export default Detail;