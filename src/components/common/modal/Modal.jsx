import './Modal.scss';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useGlobalData } from '../../../hooks/useGlobalContext';

const Modal = ({ children }) => {
	const { ModalOpen, setModalOpen } = useGlobalData();

	useEffect(() => {
		ModalOpen
			? (document.body.style.overflow = 'hidden')
			: (document.body.style.overflow = 'auto');
	}, [ModalOpen]);
	return (
		<AnimatePresence>
			{ModalOpen && (
				<motion.aside
					className='modal'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.5 }}
				>
					<div className='con'>{children}</div>
					<span onClick={() => setModalOpen(false)}>close</span>
				</motion.aside>
			)}
		</AnimatePresence>
	);
};

export default Modal;