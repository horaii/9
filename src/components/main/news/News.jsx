import './News.scss';
import { useState, useEffect, useCallback, useMemo } from 'react';

function News() {
	//useMemo는 특정 함수가 리턴해주는 값만 메모이제이션 가능하므로 dummyData에 담길 값 자체를 함수가 리턴하게 처리하고 해당 함수를 useMemo의 인수로 전달한다음에 의존성 배열을 비워놓음
	//실제로는 useRef를 통해 참조객체에 담는게 더 효율적
	const dummyData = useMemo(() => {
		return [
			{
				title: 'title4',
				content: 'Here comes content description in detail4.',
				data: new Date(),
			},
			{
				title: 'title3',
				content: 'Here comes content description in detail3.',
				data: new Date(),
			},
			{
				title: 'title2',
				content: 'Here comes content description in detail2.',
				data: new Date(),
			},
			{
				title: 'title1',
				content: 'Here comes content description in detail1.',
				data: new Date(),
			},
		];
	}, []);

	const getLocalData = useCallback(() => {
		const data = localStorage.getItem('post');
		if (data) return JSON.parse(data);
		else return dummyData;
	}, [dummyData]);
	const [Post, setPost] = useState(getLocalData());

	useEffect(() => {
		setPost(getLocalData());
	}, [getLocalData]);

	return (
		<section className='news myScroll'>
			<h2>News</h2>
			<div className='postWrap'>
				{Post.map((el, idx) => {
					if (idx >= 4) return null;
					else
						return (
							<article key={idx}>
								<h2>{el.title}</h2>
								<p>{el.content}</p>
							</article>
						);
				})}
			</div>
		</section>
	);
}
export default News;