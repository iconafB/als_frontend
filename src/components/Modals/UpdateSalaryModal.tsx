import { Modal,Flex,Button,Group,NumberInput,Box } from "@mantine/core"
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
        <Modal title="UPADTE SALARY" opened={opened} onClose={onClose} size="md" centered >
            
            <form onSubmit={handleSubmit(onSubmit)}>
                 <Group>
                        <Flex justify="center" direction="row" gap="md">
                            <Controller
                                name="rule_code"
                                control={control}
                                render={({ field }) => <NumberInput label="Rule Code" required {...field} />}
                            />
                            {rule.salary.operator=="between" ? (
                                <Flex>
                               
                                    <Controller
                                        name="lower_limit_salary"
                                        control={control}
                                        render={({field})=><NumberInput label="Salary Upper Limit" required {...field}/>}
                                    />
                                    <Controller
                                      name="upper_limit_salary"
                                      control={control}
                                      render={({field})=><NumberInput label="Salary Lower Limit" required {...field}/>}
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
                        <Box>
                            <Flex justify="center" align="center" gap={20}>
                                <Button c="orange" variant="light" loading={updateSalary.isPending} type="submit">
                                    UPDATE SALARY
                                </Button>
                                <Button onClick={onClose} c="red" variant="light">
                                    CANCEL UPDATE
                                </Button>
                            </Flex>
                        </Box>
               </Group>
            </form>
        </Modal>
    )
}