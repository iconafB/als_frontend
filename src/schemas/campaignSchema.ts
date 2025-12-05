import {z} from 'zod'

export const campaignSchema=z.object({
    campaign_name:z.string().min(1,'champaign name should be at least two characters').max(50,'champaign name should not have more 50 characters'),
    camp_code:z.string().min(1,'champaign code should be at least two characters').max(20,'champaign code should not be more that 20 characters'),
    branch:z.string().min(1,'branch name should be at least be more than two characters').max(20,'branch name should not be more than 20 characters')
})


