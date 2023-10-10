import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import Masonry from 'react-masonry-component';
import { useState, useEffect } from 'react';

export default function Gallery() {
	const my_id = '199265262@N05'
	const [Pics, setPics] = useState([])
	const fetchData = async (opt) => {
		let url = ''
		const api_key = '7cf5d864e01a94df5ca57b17747506c6'
		const method_interest = 'flickr.interestingness.getList'
		const method_user = 'flickr.people.getPhotos'
		const num = 50
		if(opt.type == 'interest'){
			url = `https://www.flickr.com/services/rest/?method=${method_interest}&api_key=${api_key}&per_page=${num}&nojsoncallback=1&format=json`
		}
		if(opt.type =='user'){
			url = `https://www.flickr.com/services/rest/?method=${method_user}&api_key=${api_key}&per_page=${num}&nojsoncallback=1&format=json&user_id=${opt.id}`
		}
		
		const data = await fetch(url)
		const json = await data.json()
		console.log(json.photo)
		setPics(json.photos.photo)
	}
	useEffect(()=>{
	fetchData({type: 'user', id : my_id});
	},[])

	
	return (
		<Layout title={'Gallery'}>
			<button onClick={()=>fetchData({type: 'user', id : my_id})}>myGallrey</button>
			<button onClick={()=>fetchData({type: 'interest'})}>interest</button>
			<div className='picFrame'>
				{/* 반복 도는 article요소를 Masonry로 wrapping후 세팅 */}
				<Masonry
					elementType={'div'}
					options={{ transitionDuration: '0.5s' }}
					disableImagesLoaded={false}
					updateOnEachImageLoad={false}
				>
					{Pics.map((data, idx) => {
						return (
							<article key={idx}>
								<div className='inner'>
									<img className='pic'
										src={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg`}
										alt={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg`}
									/>

									<h2>{data.title}</h2>

									<div className='profile'>
										<img
											src={`http://farm${data.farm}.staticflickr.com/${data.server}/buddyicons/${data.owner}.jpg`}
											alt={data.owner}
										/>
										<span>{data.owner}</span>
									</div>
								</div>
							</article>
						);
					})}
				</Masonry>
			</div>
		</Layout>
	);
}
