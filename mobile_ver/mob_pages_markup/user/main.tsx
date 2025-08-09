import UserAccordion from "@/components/accordions/mob_user_calls_accordion"
import { useUserServiceCalls } from "@/hooks/use_user_service_calls"
import { useSession } from "next-auth/react"
import router from "next/router"
import { useEffect } from "react"


const MobileUserMainPage = () => {

    const { data: session, status } = useSession()
    const { serviceCalls , isLoading , isError} = useUserServiceCalls( session?.user.id )

    useEffect(() => {
        if (status === "loading") return; // Wait for session to load
    
        if (!session || status !== 'authenticated') {
          router.push("/");
        }
      }, [session, status]);


    if(isLoading || !serviceCalls) return <div>Loading...</div>

    if(isError) return <div>Error</div>

    return (
        <>
             <UserAccordion 
             title="קריאות שירות" 
             items={serviceCalls}
             userName={session?.user.name}
             />
        </>
    )
}

export default MobileUserMainPage