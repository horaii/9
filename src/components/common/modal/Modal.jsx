import './Modal.scss';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { close } from '../../../redux/modalSlice';
import { AnimatePresence, motion } from 'framer-motion';
import { useSelector } from 'react-redux';
const Modal = ({ children }) => {
	const dispatch = useDispatch();
	const {isOpen} = useSelector((store) => store.modal)
    useEffect(()=>{
        isOpen ? document.body.style.overflow = 'hidden'
		: 
		document.body.style.overflow = 'auto'
    },[isOpen])
	return (
		<AnimatePresence>
			{isOpen && (
				
				<motion.aside 
			className='modal'
			initial={{opacity:0}}
			animate={{opacity:1}}
			exit={{opacity:0}}
			transition={{duration: 0.5}}
		>
				<div className='con'>{children}</div>
				<span onClick={() => dispatch(close())}>close</span>
			</motion.aside>
			)}
		</AnimatePresence>
	);
};

export default Modal;