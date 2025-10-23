import './RegisterGroup.css'
export function RegisterGroup({text,disabled=false}){
    return (
        <button className='btn-register-group__contenedor' disabled={disabled}>
            <svg
                width="23"
                height="23"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
            <path
                d="M17.7083 21.875V13.5417H7.29167V21.875M7.29167 3.125V8.33333H15.625M19.7917 21.875H5.20833C4.6558 21.875 4.12589 21.6555 3.73519 21.2648C3.34449 20.8741 3.125 20.3442 3.125 19.7917V5.20833C3.125 4.6558 3.34449 4.12589 3.73519 3.73519C4.12589 3.34449 4.6558 3.125 5.20833 3.125H16.6667L21.875 8.33333V19.7917C21.875 20.3442 21.6555 20.8741 21.2648 21.2648C20.8741 21.6555 20.3442 21.875 19.7917 21.875Z"
                stroke="#08315E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            </svg>

            {text}
        </button>
        

    )
}