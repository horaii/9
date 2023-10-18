import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import youtubeReducer from './redux/youtubeSlice';
import flickrReducer from './redux/flickrSlices'
import modalReducer from './redux/modalSlice'

//youtubeReducer반환한 데이터를 youtube property담아서 객체형태로 store에 등록
//store에는 하나의 객체만 등록가능하기 때문에 여러개의 데이터 카테고리는 reducer로 통합해서 등록
const store = configureStore({
	reducer: {
		youtube: youtubeReducer,
		flickr: flickrReducer,
		modal: modalReducer,
	},
});

ReactDOM.render(
	<HashRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</HashRouter>,
	document.getElementById('root')
);
