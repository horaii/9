import Layout from '../../common/layout/Layout';
import Modal from '../../common/modal/Modal';
import './Youtube.scss';
import { useEffect, useState } from 'react';
/*
	리액트는 단방향 데이터 바인딩
	- 부모에서 자식으로 데이터 전달가능하지만 자식에서 부모로는 데이터를 전달 불가
	- props전달, children 전달
	
	리액트에서 자식 컴포넌트에서는 직접적으로 부모 컴포넌트의 state값 변경이 불가
	- 해결방법 부모의 state변경함수를 자식 컴포넌트로 전달
	- 자식컴포넌트에서는 전달받은 state변경함수로 간접적으로 부모 state값 변경가능

	useRef로 jsx는 참조 객체에 담을 수 있음
*/

export default function Youtube() {
	const [Youtube, setYoutube] = useState([]);
	const [IsModal, setIsModal] = useState(false);
	const [Index, setIndex] = useState(0)

	const fetchYoutube = () => {
		const api_key = process.env.REACT_APP_YOUTUBE_API;
		const baseURL = 'https://www.googleapis.com/youtube/v3/playlistItems';
		const pid = 'PLIJIst4Jupsuzo-GHZ--Fwsb4VgZzkq5_';
		const num = 5;
		const resultURL = `${baseURL}?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;

		fetch(resultURL)
			.then((data) => data.json())
			.then((json) => {
				console.log(json.items);
				setYoutube(json.items);
			});
	};
	useEffect(() => {
		fetchYoutube();
	}, []);

	return (
		<>
			<Layout title={'Youtube'}>
				{Youtube.map((data, idx) => {
					let tit = data.snippet.title;
					let desc = data.snippet.description;
					let date = data.snippet.publishedAt;

					return (
						<article key={idx}>
							<h2>{tit.length >60 ? tit.substr(0,60) + '...' : tit}</h2>
							<p>{desc.length >100 ? desc.substr(0,100)+'...':desc}</p>
							<span>{date.split('T')[0].split('-').join('.')}</span>
							<div 
								className='pic'
								onClick={	() =>{
									setIndex(idx);
									setIsModal(true);
								}
							}>
								<img
									src={data.snippet.thumbnails.standard.url}
									alt={data.title}
								/>
							</div>
						</article>
					);
				})}
			</Layout>
			{IsModal && 
				<Modal setIsModal={setIsModal}>
					<iframe src={`https://www.youtube.com/embed/${Youtube[Index].snippet.resourceId.videoId}`} title='youtube'></iframe>
				</Modal>
			}
		</>
	);
}