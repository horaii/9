import './Modal.scss';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { close } from '../../../redux/modalSlice';

const Modal = ({ children }) => {
	const dispatch = useDispatch();
    useEffect(()=>{
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = 'auto'
        }
    },[])
	return (
		<aside className='modal'>
			<div className='con'>{children}</div>
			<span onClick={() => dispatch(close())}>close</span>
		</aside>
	);
};

export default Modal;