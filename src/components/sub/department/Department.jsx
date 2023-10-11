import Layout from '../../common/layout/Layout';
import { useEffect, useState } from 'react';
import './Department.scss';
const path = process.env.PUBLIC_URL;


export default function Department() {
	const [Department, setDepartment] = useState([]);

	useEffect(() => {
		fetch(`${path}/DB/department.json`)
			.then((data) => data.json())
			.then((json) => {
				setDepartment(json.members);
			});
	}, []);

	return (
		<Layout title={'Department'}>
			<div className='memberBox'>
				{Department.map((member, idx) => {
					return (
						<article key={idx}>
							<div className='current'></div>
							<div className='logo'>
								<img src={`${process.env.PUBLIC_URL}/img/—Pngtree—creative company_1420804.png`} alt="" />
							</div>
							<div className='pic'>
								<img src={`${path}/img/${member.pic}`} alt={member.name} />
							</div>
							<div className='txt'>
								<h2>{member.name}</h2>
								<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum esse deserunt totam.</p>
								<div>
									<p>{member.position}</p>
								</div>
								
							</div>
						</article>
					);
				})}
			</div>
		</Layout>
	);
}
/*
	hook의 개념

	useState, useEffect가 하는법

	컴포넌트가 하는 역할

	fetch문을 useEffect 안쪽에서 호출하는 이유
*/