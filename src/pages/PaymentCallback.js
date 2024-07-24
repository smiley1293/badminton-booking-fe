import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

const PaymentCallback = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    useEffect(()=>{
        let paying = searchParams.get('IsPaying')
        console.log(paying)
        if(paying){
            navigate("/Pricing")
        }
        else{
            navigate("/")
        }
    },[])
    return(
        <></>
    )
}

export default PaymentCallback
