import Layout from '../../common/layout/Layout';
import Modal from '../../common/modal/Modal';
import './Gallery.scss';
import { useState, useRef } from 'react';
import Masonry from 'react-masonry-component';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFlickr } from '../../../redux/flickrSlices';
import { open } from '../../../redux/modalSlice';
export default function Gallery() {
	const dispatch = useDispatch();
	const Pics = useSelector((store) => store.flickr.data);
	const IsModal = useSelector((store) => store.modal.isOpen);
	const refFrame = useRef(null);
	const refInput = useRef(null);
	const refBtnSet = useRef(null);
	const [ActiveURL, setActiveURL] = useState('');
	const [IsUser, setIsUser] = useState(true);
	const my_id = '199265262@N05'
	

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsUser(false);

		const btns = refBtnSet.current.querySelectorAll('button');
		btns.forEach((btn) => btn.classList.remove('on'));

		if (refInput.current.value.trim() === '') {
			return alert('검색어를 입력하세요.');
		}

		dispatch(fetchFlickr({ type: 'search', tags: refInput.current.value }));
		refInput.current.value = '';
	};

	const handleClickMy = (e) => {
		setIsUser(true);
		if (e.target.classList.contains('on')) return;

		const btns = refBtnSet.current.querySelectorAll('button');
		btns.forEach((btn) => btn.classList.remove('on'));
		e.target.classList.add('on');

		dispatch(fetchFlickr({ type: 'user', id: my_id }));
	};

	const handleClickInterest = (e) => {
		setIsUser(false);
		if (e.target.classList.contains('on')) return;

		const btns = refBtnSet.current.querySelectorAll('button');
		btns.forEach((btn) => btn.classList.remove('on'));
		e.target.classList.add('on');

		dispatch(fetchFlickr({ type: 'interest' }));
	};

	const handleClickProfile = (e) => {
		if (IsUser) return;
		dispatch(fetchFlickr({ type: 'user', id: e.target.innerText }));
		setIsUser(true);
	};

	
	return (
		<>
			<Layout title={'Gallery'}>
				<div className='searchBox'>
					<form onSubmit={handleSubmit}>
						<input
							ref={refInput}
							type='text'
							placeholder='검색어를 입력하세요'
						/>
						<button>검색</button>
					</form>
				</div>

				<div className='btnSet' ref={refBtnSet}>
					<button className='on' onClick={handleClickMy}>
						My Gallery
					</button>

					<button onClick={handleClickInterest}>Interest Gallery</button>
				</div>
				<div className='picFrame' ref={refFrame}>
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
										<img
											className='pic'
											src={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg`}
											alt={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg`}
											onClick={(e) => {
												setActiveURL(e.target.getAttribute('alt'));
												dispatch(open())
											}}
										/>
										<h2>{data.title}</h2>

										<div className='profile'>
											<img
												src={`http://farm${data.farm}.staticflickr.com/${data.server}/buddyicons/${data.owner}.jpg`}
												alt={data.owner}
												onError={(e) => {
													e.target.setAttribute(
														'src',
														'https://www.flickr.com/images/buddyicon.gif'
													);
												}}
											/>
											<span onClick={handleClickProfile}>{data.owner}</span>
										</div>
									</div>
								</article>
							);
						})}
					</Masonry>
				</div>
			</Layout>
			{IsModal && (
				<Modal >
					<img src={ActiveURL} alt='img' />
				</Modal>
			)}
		</>
	);
}


//Youtube컴포넌트 작업을 하면서 비동기데이터를 redux-toolkit을 이용해서 전역데이터 관리하는게 익숙해서 flickr도 시도해봤다
//이슈사항1 - flickr데이터를 가져온다음에 버튼을 클릭하거나 검색어입력등의 이벤트가 발생할때마다 실시간으로 전역 store데이터를 변경요청해야 되는게 많이 어려웠다.
//어려웠던 이유, : 유튜브나 구글링을해도 해당 내용이 없어서 혼자서 해결을 해야 되는 부분이 어려웠다.
//이벤트가 발생할때마다 생성된 액션객체를 계속해서 dispatch로 reducer에 데이터 변경 요청을 하도록 처리했다.

//두번재 이슈1- 내 아이디 갤러리나 사용자 아이디를 클릭해서 출력하는 user 타입의 갤러리 렌더링시에는 사용자 아이디를 클릭할때마다 중복 데이터 호출이 일어나기 때문에 해당 문제점을 해결하기 위해서 user타입의 갤러리가 렌더링될때에만 state값 변경하고 state에 따라서 사용자 아이디의 클릭 이벤트를 막음으로서 불필요한 서버 데이터 호출을 방지했다.

/*
	클릭한 버튼을 또 클릭했을때 같은 데이터를 불필요하게 또다시 fetching요청하지 않도록
	클릭한 버튼에 on이 붙어있을때 함수 호출을 강제 중지
	현재 출력되는 갤러리 방식이 User type 갤러리일때 같은 사용자의 갤러리가 보이는 형태이므로
	사용자 아이디를 클릭하게되면 같은 데이터 요청을 보내게됨
	--- 사용자 타입의 갤러리를 호출할때마다 IsUser state값을 true로 변경해서 
		--- 이벤트가 발생할때마다 IsUser값이 true 사용자 아이디 클릭 이벤트 핸들러 제거
*/