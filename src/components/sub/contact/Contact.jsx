import Layout from '../../common/layout/Layout';
import './Contact.scss'
import { useRef, useEffect } from 'react';


export default function Contact() {
	const map = useRef(null)
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
		const instance = new kakao.maps.Map(map.current,{
			center: info.latlng,
			level: 1
		});
		//마커위치값생성
		marker.setMap(instance);
	})

	return (
		<Layout title={'Contact'}>
			<div className='map' ref={map}></div>
		</Layout>
	);
}
