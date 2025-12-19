import { Modal,Flex,Button,Text,NumberInput,Box,Container } from "@mantine/core"
import type { Rule } from '../../api/campaign_rules/types';
import { useUpdateAge } from "../../hooks/useRules";

import type { UpdateAgePayload } from "../../api/campaign_rules/types";
import { useForm,Controller } from "react-hook-form";
import { useEffect } from "react";

interface UpdateModalProps {
  opened: boolean;
  onClose: () => void;
  rule: Rule | null;
}

export const UpdateAgeModal=({opened,onClose,rule}:UpdateModalProps)=>{
    if(!rule) return null;
    
    const updateAge=useUpdateAge()
    const {control,handleSubmit,reset}=useForm<UpdateAgePayload>({

        defaultValues:{
            rule_code:0,
            age_value:0,
            age_lower_limit:0,
            age_upper_limit:0
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



    const onSubmit=(data:UpdateAgePayload)=>{
            if (rule.salary.operator=="between"){
                 updateAge.mutate({
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
                
                updateAge.mutate({
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
                 <Container size={800}>

                        <Flex justify="center" direction="row" gap="md" mt={10}>
                            <Controller
                                name="rule_code"
                                control={control}
                                render={({ field }) => <NumberInput label="RULE CODE" required {...field} radius="lg" />}
                            />
                            {rule.age.operator=="between" ? (
                                
                               <Flex gap={10}>

                                    <Controller
                                        name="age_lower_limit"
                                        control={control}
                                        render={({field})=><NumberInput label="NEW AGE LOWER LIMIT" required {...field} radius="lg"/>}
                                    />
                                    
                                    <Controller
                                      name="age_upper_limit"
                                      control={control}
                                      render={({field})=><NumberInput label="NEW AGE UPPER LIMIT" required {...field} radius="lg"/>}
                                    />
                                    
                                </Flex>

                            ):(
                                <Controller 
                                    name="age_value"
                                    control={control}
                                    render={({field})=><NumberInput label="NEW AGE ENTRY" required {...field} radius="lg"/>}

                                />
                            )}

                        </Flex>

                        <Box mt={25}>
                            <Flex justify="center" align="center" gap={20}>
                                <Button c="orange" variant="light" loading={updateAge.isPending} type="submit" size="sm">
                                    UPDATE AGE
                                </Button>
                                <Button onClick={onClose} c="red" variant="light" size="sm">
                                    CANCEL UPDATE
                                </Button>
                            </Flex>
                        </Box>

               </Container>
            </form>
        </Modal>
    )
}