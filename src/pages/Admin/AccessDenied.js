import { BsExclamationDiamond } from 'react-icons/bs';

export default function AccessDenied() {
    return(
        <div className="pt-5 pb-4 tab background">
            <div className='text-light text-center' style={{'marginTop':'15%'}}>
                <BsExclamationDiamond size={150}/>
                <div className='mt-3'>
                    <h5 className='d-inline'>Sorry, you don't have permission to access this page.</h5>
                </div>
                <p className='text-warning'>ERROR CODE: 403</p>
            </div>
        </div>
    );
}