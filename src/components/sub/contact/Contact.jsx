import Layout from '../../common/layout/Layout';
import './Contact.scss';
import emailjs from '@emailjs/browser';
import { useRef, useEffect, useState } from 'react';
export default function Contact() {
	const form = useRef();
	const view = useRef(null);
	const map = useRef(null);
	const instance = useRef(null);
	const [Traffic, setTraffic] = useState(false);
	const [Index, setIndex] = useState(2);
	const [IsMap, setIsMap] = useState(true)
	// kakao api를 cdn방식으로 불러오고 있기 떄문에 리액트 컴포넌트가 실행되면 window객체에서 직접 비구조 할당으로 kakao객체를 뽑아옴
	const { kakao } = window;
	//첫번째 지도를 출력하기 위한 객체정보

	//지도 정보데이터를 객체형으로 구조화한다음에  데이터 기반으로 자동 지도화면이 생성되도록 만들었다.
	//데이터 정보가 많아질떄를 대비해서 유지보수에 최적화 되도록 코드개선
	//해당 정보 값은 자주 바뀌는 값이 아니기 떄문에 굳이 false를 담아서 불필요한 재렌더링을 막기 위해 useRef에 담아 봤다
	const info = useRef([
		{
			title: '삼성역 코엑스',
			latlng: new kakao.maps.LatLng(37.51100661425726, 127.06162026853143),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
		{
			title: '넥슨 본사',
			latlng: new kakao.maps.LatLng(37.40211707077346, 127.10344953763003),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker2.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
		{
			title: '서울 시청',
			latlng: new kakao.maps.LatLng(37.5662952, 126.9779451),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker3.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
	]);

	//위의 정보값을 활용한 마커 객체 생성
	const marker = new kakao.maps.Marker({
		position: info.current[Index].latlng,
		image: new kakao.maps.MarkerImage(
			info.current[Index].imgSrc,
			info.current[Index].imgSize,
			info.current[Index].imgPos
		),
	});

	//지도 위치를 중심으로 이동 시키는 헨들러 함수제작
	const setCenter = ()=>{
		instance.current.setCenter(info.current[Index].latlng);
	}

	useEffect(() => {
		map.current.innerHTML = ''
		//객체 정보를 활용한 지도 객체 생성
		instance.current = new kakao.maps.Map(map.current, {
			center: info.current[Index].latlng,
			level: 1,
		});
		//마커 객체에 지도 객체 연결
		marker.setMap(instance.current);
		//지도 타입 변경 UI추가
		const mapTypeControl = new kakao.maps.MapTypeControl();
		instance.current.addControl(
			mapTypeControl,
			kakao.maps.ControlPosition.BOTTOMLEFT
		);

		//지도 생성시 마커 고정적으로 적용되기 때문에 브라우저 리사이즈시 마커가 가운데 위치하지 않는 문제
		//마커를 가운데 고정시키는 함수를 제작한뒤 윈도우객체 직접 resize이벤트 발생시마다 핸들러함수 호출해서 마커위치 보정

		//Contact페이지에만 동작되야 되는 핸들러함수를 최상위 객체인 window에 직접 연결했기 때문에
		//라우터로 다른페이지이동하더라도 계속해서 setCenter호출되는 문제점 발생
		//해결방법: Contact 컴포넌트가 언마운트시 강제로 윈도우객체에서 setCenter핸들러를 제거
		window.addEventListener('resize', setCenter)

		

		//로드뷰
		
		new kakao.maps.RoadviewClient().getNearestPanoId(
			info.current[Index].latlng,
			100,//해당 지도의 위치 값에서 반경 100미터 안에 제일 가까운 도로 기준으로 로드뷰 화면생성
			(panoId) => {
				new kakao.maps.Roadview(view.current).setPanoId(
					panoId,
					info.current[Index].latlng
				);
			}
		);
		
		return () => {
			window.removeEventListener('resize', setCenter);
		};

	}, [Index]); //Index값이 변경될때마다 지도화면이 다시 갱신되어야 하므로 Index값을 의존성 배열에 등록

	useEffect(() => {
		//traffic 값이 바뀔때마다 실행될 구문
		Traffic
			? instance.current.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
			: instance.current.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);

	const resetForm = ()=>{
		const nameForm = form.current.querySelector('.nameEl')
		const emailForm = form.current.querySelector('.emailEl')
		const msgForm = form.current.querySelector('.msgEl')

		nameForm.value = ''
		emailForm.value = ''
		msgForm.value = ''
	}

	const sendEmail = (e) => {
		e.preventDefault()

		const nameForm = form.current.querySelector('.nameEl')
		const emailForm = form.current.querySelector('.emailEl')
		const msgForm = form.current.querySelector('.msgEl')

		if(!nameForm.value || !emailForm.value || !msgForm.value){
			return alert('사용자이름, 이메일주소, 문의내용은 필수 입력사항입니다.')
		}

		emailjs
			.sendForm(
				`${process.env.REACT_APP_SERVICE_ID}`,
				`${process.env.REACT_APP_TEMPLATE_ID}`,
				form.current,
				`${process.env.REACT_APP_PUBLIC_KEY}`
			)
			.then(
				(result) => {
					alert('문의내용이 메일로 발송되었습니다.');
					console.log(result)
					resetForm()
					
				},
				(error) => {
					alert('문의내용 전송에 실패했습니다.');
					console.log(error)
					resetForm()
				}
			);
	};

	
	return (
		<Layout title={'Contact'}>
			<div className='mailBox'>
				<form ref={form} onSubmit={sendEmail}>
				<div className='upper'>
						<label>Name</label>
						<input type='text' name='user_name' className='nameEl' />
						<label>Email</label>
						<input type='email' name='user_email' className='emailEl' />
					</div>

					<div className='lower'>
						<label>Message</label><br />
						<textarea name='message' className='msgEl' />
					</div>

					<div className='btnSet'>
						<input type='reset' value='Cancel' />
						<input type='submit' value='Send' />
					</div>
						
					
				</form>
			</div>

			<div className='mapBox'>
			<button onClick={() => setTraffic(!Traffic)}>
				{Traffic ? '교통정보 끄기' : '교통정보 켜기'}
			</button>

			<button onClick={setCenter}>
				지도위치 초기화
			</button>

			<button onClick={()=> setIsMap(!IsMap)}>
				{IsMap ? '로드뷰 보기' : '지도보기'}
			</button>
			<div className='container'>
				<div className={`view ${IsMap ? '' : 'on'}`} ref={view}></div>
				<div className={`map ${IsMap ? 'on' : ''}`} ref={map}></div>
			</div>
			{/* 데이터 기반으로 자동 버튼 처리 + 더 쉬운 유지보수 */}
			<ul>
				{info.current.map((el, idx) => (
					<li className={Index === idx ? 'on' : ''} key={idx} onClick={() => {
						setIndex(idx)
						setIsMap(true)
					}}>
						{el.title}
					</li>
				))}
			</ul>
			</div>
			
		</Layout>
	);
}