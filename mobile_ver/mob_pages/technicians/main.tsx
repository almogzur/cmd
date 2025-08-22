import { useTechnicianServiceCalls } from "@/hooks/use_technician_service_calls"
import MobTechCallsAccordion from "@/mobile_ver/components/accordions/mob_tech_calls_accordion"
import { useSession } from "next-auth/react"
import { useEffect } from "react"

const  MobilTechnicianMainPage : React.FC =()=> {

        const { data: session, status } = useSession()

        const { serviceCalls , isLoading , isError} = useTechnicianServiceCalls(session?.user.id)

        useEffect(() => {
            console.log(serviceCalls)
        }, [serviceCalls]);
        
        if(isLoading || !serviceCalls) return <div>Loading...</div>
    
    return (
        <>
            
            <MobTechCallsAccordion calls={serviceCalls}/>
            
        </>
    )
}

export default MobilTechnicianMainPage  