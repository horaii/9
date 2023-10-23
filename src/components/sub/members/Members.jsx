import { useDebounce } from '../../../hooks/useDebounce';
import Layout from '../../common/layout/Layout';
import './Members.scss';
import { useState, useRef, useEffect } from 'react';
//해당 컴포넌트에 메모리 누수 콘솔오류가 뜨는 이유 (memory leak);
//Errs스테이트에 값이 담기는 시점이 useDebounce에 의해서 0.5초 이후인데
//Members 컴포넌트 접속하자마자 0.5초안에 다른 페이지로 넘어가면
//아직 state에 값이 담기지 않았는데 unmount된 경우이므로 뜨는 오류
//컴포넌트 unmount시 값을 Mounted값을 false로 변경해주고 해당 값이 true일때에만 state변경처리
export default function Members() {
	//console.log('test');
	const initVal = {
		userid: '',
		pwd1: '',
		pwd2: '',
		email: '',
		gender: '',
		interests: [],
		edu: '',
		comments: '',
	};
	const refCheckGroup = useRef(null);
	const refRadioGroup = useRef(null);
	const refSelGroup = useRef(null);
	const [Val, setVal] = useState(initVal);
	const [Errs, setErrs] = useState({});
	const [Mounted, setMounted] = useState(true);
	//기존의 onchange이벤트가 발생할때마다 변경되는 Val값을 useDebounce를 이용해서
	//Debouncing이 적용된 또다른 State를 전달 받음
	const DebouncedVal = useDebounce(Val);
	console.log(DebouncedVal);
	const resetForm = (e) => {
		e.preventDefault();
		setVal(initVal);
		[refCheckGroup, refRadioGroup].forEach((el) =>
			el.current
				.querySelectorAll('input')
				.forEach((input) => (input.checked = false))
		);
		refSelGroup.current.value = '';
	};
	const handleChange = (e) => {
		const { name, value } = e.target;
		setVal({ ...Val, [name]: value });
	};
	const handleCheck = (e) => {
		const { name } = e.target;
		let checkArr = [];
		const inputs = e.target.parentElement.querySelectorAll('input');
		//checkbox요소를 반복돌면서 해당 요소가 체크되어 있다면 해당 value값을 배열에 담아주고
		//배열을 state에 담아줌
		inputs.forEach((input) => input.checked && checkArr.push(input.value));
		setVal({ ...Val, [name]: checkArr });
	};

	const check = (value) => {
		console.log('check', value);
		const num = /[0-9]/;
		const txt = /[a-zA-Z]/;
		const spc = /[!@#$%^*()_]/;
		const errs = {};
		if (value.userid.length < 5) {
			errs.userid = '아이디는 최소 5글자 이상 입력하세요.';
		}
		//비밀번호 인증 (5글자 이상, 문자, 숫자, 특수문자 모두 포함)
		if (
			value.pwd1.length < 5 ||
			!num.test(value.pwd1) ||
			!txt.test(value.pwd1) ||
			!spc.test(value.pwd1)
		) {
			errs.pwd1 = '비밀번호는 5글자이상, 문자,숫자,특수문자를 모두 포함하세요';
		}
		//비밀번호 재확인 인증
		if (value.pwd1 !== value.pwd2 || !value.pwd2) {
			errs.pwd2 = '2개의 비밀번호를 같게 입력하세요.';
		}
		//이메일 인증
		if (!value.email || !/@/.test(value.email)) {
			errs.email = '이메일은 무조건 @를 포함해야 합니다.';
		} else {
			const [forward, backward] = value.email.split('@');
			if (!forward || !backward) {
				errs.email = '이메일에 @앞뒤로 문자값이 있어야 합니다.';
			} else {
				const [forward, backward] = value.email.split('.');
				if (!forward || !backward) {
					errs.email = '이메일 . 앞뒤로 문자값이 있어야 합니다.';
				}
			}
		}
		//성별인증
		if (!value.gender) {
			errs.gender = '성별은 필수 체크항목입니다.';
		}
		//관심사인증
		if (value.interests.length === 0) {
			errs.interests = '관심사를 하나이상 체크해주세요.';
		}
		//학력 인증
		if (!value.edu) {
			errs.edu = '학력을 선택하세요.';
		}
		//남기는말 인증
		if (value.comments.length < 10) {
			errs.comments = '남기는말은 10글자 이상 입력하세요.';
		}
		console.log(errs);
		return errs;
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (Object.keys(check(Val)).length === 0) {
			alert('인증통과');
		} else {
			setErrs(check(Val));
		}
	};
	//의존성 배열에 Debouncing이 적용된 state값을 등록해서
	//함수의 핸들러함수 호출의 빈도를 줄여줌
	//useDebounce는 state의 변경횟수 자체를 줄이는게 아니라.
	//해당 state에 따라 호출되는 함수의 빈도를 줄임[]
	useEffect(() => {
		const showCheck = () => {
			Mounted && setErrs(check(DebouncedVal));
		};
		//console.log('Val state값 변경에 의해서 showCheck함수 호출');
		showCheck();
	}, [DebouncedVal, Mounted]);

	//컴포넌트 언마운트시 한번만 Mounted값을 변경해야 되므로 의존성배열이 비어있는 상태에서 clean-up함수 리턴
	useEffect(() => {
		return () => setMounted(false);
	}, []);

	return (
		<Layout title={'Members'}>
			<form onSubmit={handleSubmit}>
				<fieldset>
					<legend className='h'>회원가입 폼 양식</legend>
					<table border='1'>
						<tbody>
							{/* userid */}
							<tr>
								<th scope='row'>
									<label htmlFor='userid'>Userid</label>
								</th>
								<td>
									<input
										type='text'
										id='userid'
										name='userid'
										value={Val.userid}
										onChange={handleChange}
										placeholder='아이디를 입력하세요.'
									/>
									{Errs.userid && <p>{Errs.userid}</p>}
								</td>
							</tr>
							{/* password */}
							<tr>
								<th scope='row'>
									<label htmlFor='pwd1'>Password</label>
								</th>
								<td>
									<input
										type='password'
										id='pwd1'
										name='pwd1'
										value={Val.pwd1}
										onChange={handleChange}
										placeholder='비밀번호를 입력하세요.'
									/>
									{Errs.pwd1 && <p>{Errs.pwd1}</p>}
								</td>
							</tr>
							{/* re password */}
							<tr>
								<th scope='row'>
									<label htmlFor='pwd2'>Re-Password</label>
								</th>
								<td>
									<input
										type='password'
										id='pwd2'
										name='pwd2'
										value={Val.pwd2}
										onChange={handleChange}
										placeholder='비밀번호를 재입력하세요.'
									/>
									{Errs.pwd2 && <p>{Errs.pwd2}</p>}
								</td>
							</tr>
							{/* email */}
							<tr>
								<th scope='row'>
									<label htmlFor='email'>E-mail</label>
								</th>
								<td>
									<input
										type='text'
										id='email'
										name='email'
										value={Val.email}
										onChange={handleChange}
										placeholder='이메일주소를 입력하세요.'
									/>
									{Errs.email && <p>{Errs.email}</p>}
								</td>
							</tr>
							{/* gender */}
							<tr>
								<th>Gender</th>
								<td ref={refRadioGroup}>
									<label htmlFor='female'>female</label>
									<input
										type='radio'
										name='gender'
										id='female'
										defaultValue='female'
										onChange={handleChange}
									/>
									<label htmlFor='male'>male</label>
									<input
										type='radio'
										name='gender'
										id='male'
										defaultValue='male'
										onChange={handleChange}
									/>
									{Errs.gender && <p>{Errs.gender}</p>}
								</td>
							</tr>
							{/* interests */}
							<tr>
								<th>Interests</th>
								<td ref={refCheckGroup}>
									<label htmlFor='sports'>sports</label>
									<input
										type='checkbox'
										id='sports'
										name='interests'
										defaultValue='sports'
										onChange={handleCheck}
									/>
									<label htmlFor='game'>game</label>
									<input
										type='checkbox'
										id='game'
										name='interests'
										defaultValue='game'
										onChange={handleCheck}
									/>
									<label htmlFor='music'>music</label>
									<input
										type='checkbox'
										id='music'
										name='interests'
										defaultValue='music'
										onChange={handleCheck}
									/>
									{Errs.interests && <p>{Errs.interests}</p>}
								</td>
							</tr>
							{/* education */}
							<tr>
								<th>
									<label htmlFor='edu'>Education</label>
								</th>
								<td>
									<select
										name='edu'
										id='edu'
										onChange={handleChange}
										ref={refSelGroup}
									>
										<option value=''>최종학력 선택하세요</option>
										<option value='elementary-school'>초등학교 졸업</option>
										<option value='middle-school'>중학교 졸업</option>
										<option value='high-school'>고등학교 졸업</option>
										<option value='college'>대학교 졸업</option>
									</select>
									{Errs.edu && <p>{Errs.edu}</p>}
								</td>
							</tr>
							{/* comments */}
							<tr>
								<th>
									<label htmlFor='comments'>Comments</label>
								</th>
								<td>
									<textarea
										name='comments'
										id=''
										cols='30'
										rows='3'
										value={Val.comments}
										onChange={handleChange}
										placeholder='남기는 말을 입력하세요.'
									></textarea>
									{Errs.comments && <p>{Errs.comments}</p>}
								</td>
							</tr>
							{/* btnSet */}
							<tr>
								<th colSpan='2'>
									<input type='reset' value='cancel' onClick={resetForm} />
									<input type='submit' value='send' />
								</th>
							</tr>
						</tbody>
					</table>
				</fieldset>
			</form>
		</Layout>
	);
}
/*
	react-hook-form을 쓰지 않고 직접 기능을 만들었냐?
	-- 라이브러리는 언제든지 연결할 수 있는건데, 아직 배우는 입장이기 때문에 부족하나마 어떤 인증로직이 처리되는지 직접 만들어 보고 싶었다.
	그래서 checkbox, radio, selector, textarea 같이 필수입력사항이 아닌 요소도 직접 인증구현을 해봤다.
	인증처리 하면서 제일 힘들었던 부분은 비밀번호, 이메일 인증 구현이 힘들었다
	구글링을 해보니 정규표현식의 예시코드가 많이 있었지만 아직 정규표현식을 제대로 공부한것이 아니라 모르는 상태에서 붙여넣기 식으로 구현하기는 싫어서 
	내가 알고 있는 문자열 관련 메서드를 최대한 활용해서 구현해봤다
*/