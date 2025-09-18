import { useForm,Controller } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { campaignSchema } from "../schemas/campaignSchema"
import { Paper,Stack, TextInput,Select,Group,Button } from "@mantine/core"
import type z from "zod"
import { campaigns_api } from "../api/campaigns/campaigns"
import { toast } from "react-toastify"

type CampaignFormData=z.infer<typeof campaignSchema>

/* interface CreateCampaignModalProps{
    opened:boolean;
    onClose:()=>void;
    isLoading:boolean;
} */

export function CreateCampaign(){

    const {control,handleSubmit,reset,formState:{errors}}=useForm<CampaignFormData>({
        defaultValues:{
            campaign_name:'',
            campaign_code:'',
            branch:''
        }
    })
    //useMutation to create a campaign
    const campaign_mutation=useMutation({
        mutationFn:campaigns_api.create_campaign,
        onSuccess:(data)=>{
            toast.success(`campaign:${data.campaign_name} created at:${data.created_at}`)
            reset();
        },
        onError:(error)=>{
            toast.error(`${error.message} occurred while creating campaign`)
        }
    })

    const handleFormSubmit=(data:CampaignFormData)=>{
        campaign_mutation.mutate(data)
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
                        name="campaign_code"
                        control={control}
                        render={({field})=>(
                            <TextInput
                                {...field}
                                label="Campaign Code"
                                required
                                placeholder="Enter Campaign Code"
                                error={errors.campaign_code?.message}
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
                                data={['HQ','P3','INVTNTDBN']} 
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