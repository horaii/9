import Layout from '../../common/layout/Layout';
import Modal from '../../common/modal/Modal';
import './Youtube.scss'
import { useEffect, useState, useRef } from 'react';

export default function Youtube() {
	const refEl = useRef(null)
	const  [Youtube, setYoutube] = useState([])
	const [IsModal, setIsModal] = useState(false)

	console.log(Youtube)

	const fetchYoutube = () =>{
		const api_key = process.env.REACT_APP_YOUTUBE_API;
		const buseURL = 'https://www.googleapis.com/youtube/v3/playlistItems';
		const pid = 'PLIJIst4Jupsuzo-GHZ--Fwsb4VgZzkq5_';
		const num = 5;
		const resultURL = `${buseURL}?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;
		fetch(resultURL)
			.then((data) => data.json())
			.then((json) => {
				console.log(json.items)
				setYoutube(json.items)
			})
	}

	useEffect(() =>{
		fetchYoutube()
	}, [])

	return (
		<>
			
			<Layout title={'Youtube'}>
				{Youtube.map((data, idx) => {
					return (
						<article key={idx}>
							<h2 onClick={()=>console.log(refEl)}>{data.snippet.title}</h2>
							<p>{data.snippet.description}</p>
							<div className='pic' onClick={() => refEl.current.open()}>
								<img 
									src={data.snippet.thumbnails.standard.url}
									alt={data.title}
								/>
							</div>
						</article>
					)
				})}
			</Layout>
			<Modal setIsModal={setIsModal} ref={refEl}></Modal>
		</>
	);
}
