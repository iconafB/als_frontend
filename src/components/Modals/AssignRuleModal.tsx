import { Modal,Flex,Button,Text,NumberInput,TextInput,Box,Container } from "@mantine/core"
import type { Rule } from '../../api/campaign_rules/types';
import { useAssignRuleToCampaign } from "../../hooks/useRules";
import type { AssignRuleToCampaignPayload } from "../../api/campaign_rules/types";

import { useForm,Controller } from "react-hook-form";

import { useEffect } from "react";

interface UpdateModalProps {
  opened: boolean;
  onClose: () => void;
  rule: Rule | null;
}

export const AssignRuleToCampaignModal=({opened,onClose,rule}:UpdateModalProps)=>{
    if(!rule) return null;
    console.log(rule);

    const assignRuleToCampaign=useAssignRuleToCampaign()

    const {control,handleSubmit,reset}=useForm<AssignRuleToCampaignPayload>({

        defaultValues:{
            rule_code:0,
            camp_code:''
        }
    })

    useEffect(()=>{
        if(rule){
            reset((prev)=>({
                ...prev,
                rule_code:rule.rule_code,
                camp_code:rule.rule_name
            }))
        }
    },[rule,reset])


    const onSubmit=(data:AssignRuleToCampaignPayload)=>{

        assignRuleToCampaign.mutate({payload:data},
          {
            onSuccess:()=>{
            reset();
            onClose();
        }
      }
    )
            
  };

    return(
        <Modal 
            title={
                <Text ta="center" fw={600} size="lg" w="100%" c="green">
                    ASSIGN CAMPAIGN RULE TO CAMPAIGN
                </Text>
            } 
            styles={{
                header:{
                    justifyContent:'center'
                },
                title:{
                    width:"100%",
                    textAlign:"center",
                    marginRight:"auto"
                }
            }}
            opened={opened} 
            onClose={onClose} 
            size="lg" 
            centered 
            withCloseButton={false}
            >
            <form onSubmit={handleSubmit(onSubmit)}>

                 <Container size={800}>
                        <Flex justify="center" direction="row" gap="md" mt={10}>
                            <Controller
                                name="rule_code"
                                control={control}
                                render={({ field }) => <NumberInput label="RULE CODE" required {...field} radius="lg" />}
                            />
                            <Controller
                              name="camp_code"
                              control={control}
                              render={({ field }) => <TextInput label="CAMPAIGN CODE" required {...field} radius="lg" />}
                            />

                        </Flex>

                        <Box mt={25}>
                            <Flex justify="center" align="center" gap={20}>
                                <Button c="orange" variant="light" loading={assignRuleToCampaign.isPending} type="submit" size="sm">
                                    ASSIGN RULE TO CAMPAIGN
                                </Button>
                                <Button onClick={onClose} c="red" variant="light" size="sm">
                                    CANCEL ASSIGN
                                </Button>
                            </Flex>
                        </Box>

               </Container>
            </form>
        </Modal>

    )
}