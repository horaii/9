import Layout from '../../common/layout/Layout';
import './Contact.scss'
import { useRef, useEffect, useState } from 'react';


export default function Contact() {
	const map = useRef(null)
	const instance = useRef(null)
	const [Traffic, setTraffic] = useState(false)

	const{kakao} = window
	const info = {
		latlng: new kakao.maps.LatLng(37.58478163978524, 126.88566424098676),
		imgSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
		imgSize: new kakao.maps.Size(232, 99),
		imgPos: {offset: new kakao.maps.Point(116, 99)}

	}
	
	const marker = new kakao.maps.Marker({
		position: info.latlng,
		image: new kakao.maps.MarkerImage(info.imgSrc,
		info.imgSize, info.imgPos)
	});
	

	useEffect(() => {
		instance.current = new kakao.maps.Map(map.current,{
			center: info.latlng,
			level: 1
		});
		//마커위치값생성
		marker.setMap(instance.current);
		const mapTypeControl = new kakao.maps.MapTypeControl()
		instance.current.addControl(
			mapTypeControl,
			kakao.maps.ControlPosition.BUTTONLEFT
		)
	})
	useEffect(()=>{
		Traffic
			? instance.current.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
			: instance.current.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic])

	return (
		<Layout title={'Contact'}>
			<button onClick={()=> setTraffic(!Traffic)}>
				{Traffic ? '교통정보 끄기' : '교통정보 켜기'}
			</button>
			<div className='map' ref={map}></div>
		</Layout>
	);
}
