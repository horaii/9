import './Modal.scss'
import { forwardRef, useState, useImperativeHandle } from 'react'

const Modal = forwardRef(({ children}, ref) => {
    const [Open, setOpen] = useState(false)
    useImperativeHandle(ref, () => {
        return {open: () => setOpen(true)}
    })
    return (
        <>
            {Open &&(<aside className='modal'>
                <div className='con'></div>
                <span onClick={()=> setOpen(false)}>close</span>
            </aside>)}
        </>
    )
  })

export default Modal