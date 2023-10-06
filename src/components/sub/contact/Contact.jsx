import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Layout from '../../common/layout/Layout';
import './Contact.scss';
import { useRef, useEffect, useState } from 'react';
export default function Contact() {
	const map = useRef(null);
	const instance = useRef(null);
	const [Traffic, setTraffic] = useState(false);
	const [Index, setIndex] = useState(2);
	const { kakao } = window;
	//첫번째 지도를 출력하기 위한 객체정보
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
	}, [Index]); //Index값이 변경될때마다 지도화면이 다시 갱신되어야 하므로 Index값을 의존성 배열에 등록

	useEffect(() => {
		//traffic 값이 바뀔때마다 실행될 구문
		Traffic
			? instance.current.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
			: instance.current.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);
	return (
		<Layout title={'Contact'}>
			<button onClick={() => setTraffic(!Traffic)}>
				{Traffic ? '교통정보 끄기' : '교통정보 켜기'}
			</button>
			<div className='map' ref={map}></div>

			<ul>
				{info.current.map((el, idx) => (
					<li className={Index == idx ? 'on' : ''} key={idx} onClick={() => setIndex(idx)}>
						{el.title}
					</li>
				))}
			</ul>
		</Layout>
	);
}