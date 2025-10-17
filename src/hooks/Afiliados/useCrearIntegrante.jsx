export const useCrearIntegrante = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [data, setData] = useState('')

    const crearUnIntegrante = async (data)=>{
        try {
            
        } catch () {
                   
        }finally{
            setLoading(false)
        }
    }
    return {
        loading,
        error,
        data
    }
}