import { Modal,Flex,Button,NumberInput,Box } from "@mantine/core"
import type { Rule } from '../../api/campaign_rules/types';
import { useUpdateSalary } from "../../hooks/useRules";
import type { UpdateSalaryPayload } from "../../api/campaign_rules/types";
import { useForm,Controller } from "react-hook-form";
import { useEffect } from "react";

interface UpdateModalProps {
  opened: boolean;
  onClose: () => void;
  rule: Rule | null;
}

export const UpdateSalaryModal=({opened,onClose,rule}:UpdateModalProps)=>{
    if(!rule) return null;

    console.log(rule)

    const updateSalary=useUpdateSalary()

    const {control,handleSubmit,reset}=useForm<UpdateSalaryPayload>({

        defaultValues:{
            rule_code:0,
            salary:0,
            lower_limit_salary:0,
            upper_limit_salary:0
        }
    })

    useEffect(()=>{
        if(rule){
            reset((prev)=>({
                ...prev,
                rule_code:rule.rule_code
            }))
        }
    },[rule,reset])

    const onSubmit=(data:UpdateSalaryPayload)=>{

            if (rule.salary.operator=="between"){

                 updateSalary.mutate({
                    payload:data
            },
            {
                onSuccess:()=>{
                    reset();
                    onClose();
                }
            }
                )
                
            }
            else{

                updateSalary.mutate({
                    payload:data
                },{
                    onSuccess:()=>{
                        reset();
                        onClose();
                    }

                })
            }
           
        };


    return(
        <Modal  opened={opened} onClose={onClose} size="md" centered withCloseButton={false}>
            
            <form onSubmit={handleSubmit(onSubmit)}>
                 <Flex direction="column">
                        <Flex justify="center" direction="column" gap="md">
                            <Controller
                                name="rule_code"
                                control={control}
                                render={({ field }) => <NumberInput label="RULE CODE" required {...field} />}
                            />
                            {rule.salary.operator=="between" ? (
                                <Flex>
                                    <Controller
                                        name="lower_limit_salary"
                                        control={control}
                                        render={({field})=><NumberInput mr={20} label="SALARY UPPER LIMIT" required {...field}/>}
                                    />
                                    <Controller
                                      name="upper_limit_salary"
                                      control={control}
                                      render={({field})=><NumberInput label="SALARY LOWER LIMIT" required {...field}/>}
                                    />
                                </Flex>

                            ):(
                                <Controller 
                                    name="salary"
                                    control={control}
                                    render={({field})=><NumberInput label="Salary" required {...field}/>}
                                />
                            )}

                        </Flex>
                        
                        <Box mt={25}>
                            <Flex justify="center" align="center" gap={20}>
                                <Button c="orange" variant="light" loading={updateSalary.isPending} type="submit">
                                    UPDATE SALARY
                                </Button>
                                <Button onClick={onClose} c="red" variant="light">
                                    CANCEL UPDATE
                                </Button>
                            </Flex>
                        </Box>
               </Flex>
            </form>
        </Modal>
    )
}