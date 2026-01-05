import { Modal,Flex,Button,Group,NumberInput,Box,Center } from "@mantine/core"
import type { Rule } from '../../api/campaign_rules/types';
import { useUpdateLeadsNumber } from "../../hooks/useRules";
import type { UpdateLeadsNumber } from "../../api/campaign_rules/types";
import { useForm,Controller } from "react-hook-form";
import { useEffect } from "react";

interface UpdateModalProps {
  opened: boolean;
  onClose: () => void;
  rule: Rule | null;
}

export const UpdateLeadsModal=({opened,onClose,rule}:UpdateModalProps)=>{
    if(!rule) return null;
    
    const updateLeadsNumber=useUpdateLeadsNumber()

    const {control,handleSubmit,reset}=useForm<UpdateLeadsNumber>({
        defaultValues:{
            number_of_leads:0,
            rule_code:0
        }
    })
     useEffect(() => {

    if (rule) {
      reset((values) => ({
        ...values,
        rule_code: rule.rule_code, // auto-fill only this
      }));
    }
  }, [rule, reset]);

    const onSubmit=(data:UpdateLeadsNumber)=>{
       
        updateLeadsNumber.mutate({
            payload:data
        },
        {
            onSuccess:()=>{
                reset();
                onClose();
            }
        }
    )
    };


    return(
        <Modal opened={opened} onClose={onClose} size="md" centered withCloseButton={false}>
            <form onSubmit={handleSubmit(onSubmit)}>
                 <Group justify="center">
                        <Flex justify="center" direction="row" gap="md" mt={15}>
                            <Controller
                                name="rule_code"
                                control={control}
                                render={({ field }) => <NumberInput label="Rule Code" required {...field} />}
                            />
                            <Controller
                                name="number_of_leads"
                                control={control}
                                render={({ field }) => <NumberInput label="Total Leads" required {...field} />}
                            />
                        </Flex>
                        <Center>
                            <Flex justify="center" align="center" gap={20}>
                                <Button c="orange" variant="light" loading={updateLeadsNumber.isPending} type="submit">
                                    UPDATE
                                </Button>
                                <Button onClick={onClose} c="red" variant="light">
                                    CANCEL
                                </Button>
                            </Flex>
                        </Center>
               </Group>
            </form>
        </Modal>
    )
}