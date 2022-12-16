
import React, { useState, forwardRef, useImperativeHandle,useRef} from 'react';

const Modal = forwardRef((props, publicRef) => {

    const [modalText, setModalText] = useState();
    const modalRef = useRef();

    const openModal = (text) => {
         setModalText(text);
        modalRef.current.showModal();
    }

    const hideModal = () => {
        modalRef.current.close();
        setModalText('');
    }

    useImperativeHandle(publicRef, ()=>{
        return {
            open(text){
                openModal(text);
            },
            close(){
                hideModal();
            }
        }
    })

  return (
    <dialog ref={modalRef}>
        <div>
            <h1>My Modal</h1>
            <p>{modalText}</p>
            <button onClick={hideModal}>Hide Modal</button>
        </div>
    </dialog>
  )
});

export default Modal