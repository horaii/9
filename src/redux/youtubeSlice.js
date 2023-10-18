import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

//비동기 서버통신으로 데이터를 전달받아서 내부적으로 action타입을 자동 생성해서 액션객체 생성까지 완료하는 함수
export const fetchYoutube = createAsyncThunk('youtube/request', async () => {
	const api_key = process.env.REACT_APP_YOUTUBE_API;
	const baseURL = 'https://www.googleapis.com/youtube/v3/playlistItems';
	const pid = 'PLIJIst4Jupsuzo-GHZ--Fwsb4VgZzkq5_';
	const num = 10;
	const resultURL = `${baseURL}?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;

	const result = await axios.get(resultURL);
	return result.data.items;
});
//{type:'대기'}
//{type:'성공': payload:[데이터]}
//{type:'실패': payload:에러객체}

//createAsyncThunk가 반환하는 action객체를 받아서 전역스토어 데이터를 변형하는 reducer함수등록
const youtubeSlice = createSlice({
	name: 'youtube',
	initialState: {
		data: [],
		isLoading: false,
	},
	extraReducers: {
		[fetchYoutube.pending]: (state) => {
			state.isLoading = true;
		},
		[fetchYoutube.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
		[fetchYoutube.rejected]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
	},
});

export default youtubeSlice.reducer;
//리덕스에서 전역상태 관리에 쓰이는 용어정리
/*
  store : 전역 state 저장공간 (은행금고)
  reducer : store의 전역 state값을 변경해주는 함수 (변형자) (금고관리인,점장)
  dispatch : reducer에 데이터 변경요청을 해주는 함수 (전달자) (창구직원)
  action : dispatch로 리듀서에 데이터 변경요청을 위해 필요한 특별한 형태의 객체 (창구직원에게 전달하기 위한 지로용지)
  action객체의 구조 : {type, payload}
  1-컴포넌트에서 데이터변경이나 데이터요청을 위한 action객체를 만들어서 dispatch함수에 전달
  2-dispatch는 action객체를 가지고 리듀서 함수에 전달
  3-reducer함수는 dispatch가 전달되는 action객체의 타입에 따라 store의 데이터 변경처리
  4-변경 store데이터는 index.js에 의해서 App.jsx에 전달됨
  5-루트 컴포넌트인 App.jsx에 데이터가 전달되었기 때문에 자식 컴포넌트 어디에서는 해당 데이터에 접근 가능
*/
