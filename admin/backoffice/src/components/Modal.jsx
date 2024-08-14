const Modal = ({ isVisble, onClose, children}) => {
    if (!isVisble) return null;

    const handleClose = (e) => {
        if(e.target.id === 'wrapper'){
            onClose();
        } 
    }

    return (
        <div className='fixed inset-0 bg-black bg-opacity-5 backdrop-blur-sm flex justify-center items-center' id='wrapper' onClick={handleClose}>
            <div className='w-[600px] flex flex-col'>
                <button className='text-white text-xl place-self-end' onClick={e => onClose()}>X</button>
                <div className='bg-transparent p-2 rounded'>{children}</div>
            </div>
        </div>
    )
}

export default Modal
