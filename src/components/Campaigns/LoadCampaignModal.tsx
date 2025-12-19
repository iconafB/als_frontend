import { useState,useEffect } from "react";
import {Modal,Stack,Button,Flex,Text} from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useDebouncedValue } from "@mantine/hooks";
import { campaigns_api } from "../../api/campaigns/campaigns";
import type { PaginatedInfiniteResponse } from "../../api/campaigns/types";
import { showNotification } from "@mantine/notifications";
import type { create_campaign } from "../../api/campaigns/types";
import type { LoadCampaign } from "../../api/campaigns/types";


interface LoadCampaignModalProps {
  opened: boolean;
  onClose: () => void;
  row:{
    branch: string;
    camp_code:string;
    campaign_name:string;
  } | null;
}


export const LoadCampaignModal=({ opened, onClose,row }:LoadCampaignModalProps) => {

  const {register,handleSubmit,reset} = useForm<LoadCampaign>({
    defaultValues: {
      branch: row?.branch,
      camp_code: row?.camp_code,
    },
  });


  console.log(row)

  useEffect(()=>{
    if(row){
      reset({
        branch:row.branch,
        camp_code:row.camp_code
      })
    }
  },[row,reset])
 
  
  const loadCampaignMutation = useMutation({
    mutationFn: (payload:LoadCampaign)=>campaigns_api.load_campaigns(payload),
    onSuccess: () => {
      showNotification({ message: "Campaign submitted successfully!", color: "green" });
      onClose();
    },
    onError: (error: any) => {
      showNotification({ message: "Failed to submit campaign", color: "red" });
      console.error(error);
    },
  });
   
 const onSubmit=(values:LoadCampaign)=>{
    loadCampaignMutation.mutate({
      branch:values.branch,
      camp_code:values?.camp_code
    })

  };

  return (
    <Modal opened={opened} onClose={onClose} title={<Text fw={600} c="green">LOAD CAMPAIGN: {row?.campaign_name}</Text>} size="lg" centered withCloseButton={false}>
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack gap="md">
          <Text fw={600} size="sm">BRANCH</Text>
          <input className="border p-2 rounded w-full bg-gray-100 cursor-not-allowed"  {...register("branch")}  readOnly/>
          <div>
            <div style={{ height: 15 }} />
          </div>
          <Text fw={600} size="sm">CAMPAIGN CODE</Text>
          <input className="border p-2 rounded w-full bg-gray-100 cursor-not-allowed" {...register("camp_code")} readOnly />
          {/* Actions */}
          <Flex justify="end" gap="sm" mt="md">
            <Button type="submit">
              LOAD CAMPAIGN
            </Button>
            <Button type="button" variant="outline" color="red" onClick={onClose}>
              CANCEL
            </Button>
          </Flex>
        </Stack>
      </form>
    </Modal>
  );
};
