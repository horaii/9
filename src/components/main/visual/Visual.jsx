import './Visual.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState } from 'react';
import 'swiper/css';
import { Link } from 'react-router-dom';
import { useYoutubeQuery } from '../../../hooks/useYoutube';

function Visual() {
	const [Index, setIndex] = useState(0);
	const { data, isSuccess } = useYoutubeQuery();

	/*
		data: react-query가 반환데이터
		isError: 데이터 응답 실패시 true,
		isSucess: 데이터 응답 성공시 true,
		isLoading: 데이터 요청 pending상태일때 true
		isRefetching: true 동일한데이터라도 다시 refecthing 처리유무 (기본값 false)
	*/

	return (
		<section className='visual'>
			<div className='titBox'>
				<ul>
					{isSuccess &&
						data.map((tit, idx) => {
							if (idx >= 7) return null;
							return (
								<li key={idx} className={idx === Index ? 'on' : ''}>
									<h3>{tit.snippet.title}</h3>
									<p>{tit.snippet.description.substr(0, 300) + '...'}</p>
									<button>
										<Link to={`/detail/${tit.id}`}>View Deatil</Link>
									</button>
								</li>
							);
						})}
				</ul>
			</div>
			<Swiper
				slidesPerView={1}
				spaceBetween={50}
				loop={true}
				centeredSlides={true}
				onSlideChange={(el) => setIndex(el.realIndex)}
				breakpoints={{
					//1000px보다 브라우저폭이 커졌을때
					1000: {
						slidesPerView: 2,
						spaceBetween: 50,
					},
					1400: {
						slidesPerView: 3,
						spaceBetween: 50,
					},
				}}
			>
				{isSuccess &&
					data.map((vid, idx) => {
						if (idx >= 5) return null;
						return (
							<SwiperSlide key={idx}>
								<div className='pic'>
									<img
										src={vid.snippet.thumbnails.maxres.url}
										alt={vid.title}
									/>
									<img
										src={vid.snippet.thumbnails.maxres.url}
										alt={vid.title}
									/>
								</div>

								<h2>{vid.snippet.title}</h2>
							</SwiperSlide>
						);
					})}
			</Swiper>
		</section>
	);
}

export default Visual;