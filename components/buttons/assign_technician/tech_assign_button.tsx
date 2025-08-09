

import { useAdminTechnicians } from '@/hooks/use_admin_technicians';
import TechniciansDropMenu from '@/components/buttons/assign_technician/tech_dropdown_menu';
import { ButtonProps } from '@mui/material';


type Props = {
    callId: string,
    technicianId?: string
    btnProps: ButtonProps
}


const TechAssignButton: React.FC<Props> = ({ callId, technicianId, btnProps }: Props) => {


    const { technicians, isLoading, isError, mutate } = useAdminTechnicians()

    const techList = technicians?.map(tech => ({ label: tech.name }))

    const updateServiceCall = async (techId: number) => {
        fetch('/api/service_calls/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(technicianId),
        })
    }

    if (isError) return <div>error</div>

    if (isLoading || !technicians) return <div>Loading...</div>

    return (
        <TechniciansDropMenu
            items={techList}
            btnText='שייך'
            btnProps={btnProps}

        />
    )
}

export default TechAssignButton