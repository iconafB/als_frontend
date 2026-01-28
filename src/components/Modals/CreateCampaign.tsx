import { useForm,Controller } from "react-hook-form"
import { campaignSchema } from "../../schemas/campaignSchema"
import { Paper,Stack, TextInput,Select,Group,Button } from "@mantine/core"
import type z from "zod"
import { useCreateCampaign } from "../../hooks/useCampaigns"
import type { create_campaign_response } from "../../api/campaigns/types"

type CampaignFormData=z.infer<typeof campaignSchema>

interface CreateCampaignInterface{
    opened:boolean;
    onClose:()=>void;
    onSuccess:(data:create_campaign_response)=>void;
}


// type CreateCampaignProps = {
//   onClose: () => void; // Function to close the form
//   opened:boolean;
//   onSuccess:(data:create_campaign_response)=>void;
// };



export function CreateCampaignModal({opened,onClose,onSuccess}:CreateCampaignInterface){

    console.log("Print is opened state")
    console.log(opened)
    console.log("Print onClose")
    console.log(onClose)
    const {control,handleSubmit,formState:{errors}}=useForm<CampaignFormData>({

        defaultValues:{
            branch:'',
            camp_code:'',
            campaign_name:''
        }
    });
    const createCampaign=useCreateCampaign()

    const handleFormSubmit=async(data:CampaignFormData)=>{
        const result= await createCampaign.mutateAsync({data})
        onSuccess(result)
    }
    
    return(

        <Paper shadow="xs" p="xl">
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <Stack align="stretch" justify="center" gap="md">
                    <Controller
                        name="campaign_name"
                        control={control}
                        render={({field})=>(
                            <TextInput
                                {...field}
                                label="Campaign Name"
                                required
                                placeholder="enter campaign name"
                                error={errors.campaign_name?.message}
                            />
                        )}
                    />
                    <Controller
                        name="camp_code"
                        control={control}
                        render={({field})=>(
                            <TextInput
                                {...field}
                                label="Campaign Code"
                                required
                                placeholder="Enter Campaign Code"
                                error={errors.camp_code?.message}
                            />
                        )}
                    />
                    <Controller
                        name="branch"
                        control={control}
                        render={({field})=>(
                            <Select
                                {...field}
                                placeholder="enter branch name"
                                label="Branch"
                                data={['HQ','P3','INVTNTDBN','DENEXIS']} 
                                required 
                                clearable
                            />
                        )}
                    />
                </Stack>

                <Group justify="center" mt="md">
                    <Button type="submit" variant="outline" className="hover:bg-blue-100 transition-colors">
                        CREATE CAMPAIGN
                    </Button>
                </Group>
            </form>
        </Paper>
    )
}

