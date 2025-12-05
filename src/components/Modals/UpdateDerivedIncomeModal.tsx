import { Modal,Flex,Button,Group,NumberInput,Box,Text,Center } from "@mantine/core"
import type { Rule } from '../../api/campaign_rules/types';
import { useUpdateDerivedIncome } from "../../hooks/useRules";
import type { UpdateDerivedIncomePayload } from "../../api/campaign_rules/types";

import { useForm,Controller } from "react-hook-form";
import { useEffect } from "react";

interface UpdateModalProps {
  opened: boolean;
  onClose: () => void;
  rule: Rule | null;
}

export const UpdateDerivedIncomeModal=({opened,onClose,rule}:UpdateModalProps)=>{
    if(!rule) return null;
    console.log(rule)
    const updateSalary=useUpdateDerivedIncome()
    const {control,handleSubmit,reset}=useForm<UpdateDerivedIncomePayload>({

        defaultValues:{
            rule_code:0,
            derived_income_value:0,
            lower_limit_derived_income:0,
            upper_limit_derived_income:0
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


    const onSubmit=(data:UpdateDerivedIncomePayload)=>{

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
        <Modal 
             title={
                    <Text ta="center" fw={600} size="lg" w="100%" c="green">
                        UPDATE AGE FOR CAMPAIGN RULE
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
                 <Group>
                        <Flex justify="center" direction="row" gap="md">
                            <Controller
                                name="rule_code"
                                control={control}
                                render={({ field }) => <NumberInput label="Rule Code" required {...field} />}

                            />

                            {rule.derived_income.operator=="between" ? (
                                <Flex>
                               
                                    <Controller
                                        name="lower_limit_derived_income"
                                        control={control}
                                        render={({field})=><NumberInput label="Derived Income Upper Limit" required {...field}/>}
                                    />

                                    <Controller
                                      name="upper_limit_derived_income"
                                      control={control}
                                      render={({field})=><NumberInput label="Derived Income Lower Limit" required {...field}/>}
                                    />
                                </Flex>

                            ):(
                                <Controller 
                                    name="derived_income_value"
                                    control={control}
                                    render={({field})=><NumberInput label="DERIVED INCOME" required {...field}/>}
                                />
                            )}

                        </Flex>

                        <Center mt={25}>
                            <Box>
                                <Flex gap={10}>
                                <Button c="orange" variant="light" loading={updateSalary.isPending} type="submit">
                                    UPDATE DERIVED INCOME
                                </Button>
                                <Button onClick={onClose} c="red" variant="light">
                                    CANCEL UPDATE
                                </Button>
                                </Flex>
                            </Box>
                        </Center>
               </Group>
            </form>
        </Modal>
    )
}