import {Container,Title,Card,Text,Flex,Group,ActionIcon,Stack,Button,SimpleGrid,Modal,FileInput,TextInput, Center} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {IconCalendarEvent,IconPlus,IconX, IconList, IconDatabase, IconHandClick, IconUpload, IconFileFilled, IconSpeakerphone, IconTarget} from '@tabler/icons-react';
import DedupedCampaignTable from '../components/DedupeCampaignsTables';

import { useUploadDedupeCampaignRecords,useAddDedupeList } from '../hooks/useDedupe';

import { useForm,Controller } from 'react-hook-form';
import { toast } from 'react-toastify';


interface UploadFormValues{
  campaign_name:string;
  camp_code:string;
  dedupe_file:File | null;
}


interface AddDedupeListInterface{
  camp_code:string;
}
const DedupeCampaignsPage = () => {

  const stats = [
    { title: 'Dedupe Campaigns', value: '12', icon: IconCalendarEvent, color: 'blue' },
    { title: 'Manual Dedupes', value: '4', icon: IconHandClick, color: 'green' },
    { title: 'Enriched Data', value: '6', icon: IconDatabase, color: 'purple' },
    { title: 'Dedupe List', value: '234', icon: IconList, color: 'orange' },
  ];
  
  const [manualOpened,{open:manualDedupeInsertOpen,close:manualDedupeInsertClose}]=useDisclosure(false)
  const [openedInsertDedupeList,{open:openInsertDedupeList,close:closeInsertDedupeList}]=useDisclosure(false)
  const [openedInsertEnrichedData,{open:openInsertEnrichedData,close:closeInsertEnrichedData}]=useDisclosure(false)
  const [createDedupeCampaignsOpened,{open:openDedupeCampaignModal,close:closeDedupeCampaignModal}]=useDisclosure(false)

  const {control,register,handleSubmit,reset}=useForm<UploadFormValues>()
  const addDedupeListForm=useForm<AddDedupeListInterface>()

  const uploadMutation=useUploadDedupeCampaignRecords()

  const addDedupeList=useAddDedupeList()


  const onSubmit=(data:UploadFormValues)=>{
    if (!data.dedupe_file){
      toast.error("Please select a csv or excel file")
      return
    }

    uploadMutation.mutate({
      campaign_name:data?.campaign_name,
      camp_code:data?.camp_code,
      file_upload:{
        dedupe_file: data.dedupe_file
      }
    })
    reset()
  }

  const addDedupeListSubmit=(data:AddDedupeListInterface)=>{
    addDedupeList.mutate({
      camp_code:data.camp_code
    })
    reset()
  }


  return (
    <Container size="xl" px={0}>
      <Stack gap="xl">
        <div>
          <Group justify="space-between" mb="lg" className='md:'>
            <Title order={2} c="dark">
              DEDUPE CAMPAIGNS 
            </Title>
             <Button leftSection={<IconPlus size={16} />} onClick={openDedupeCampaignModal} variant='outline'>
              SUBMIT DEDUPE RETURN
            </Button>
            <Button leftSection={<IconPlus size={16} />} onClick={manualDedupeInsertOpen}>
              MANUAL DEDUPE FILE INSERT
            </Button>
            <Button leftSection={<IconList size={16}/>} onClick={openInsertDedupeList} variant='outline'>
              ADD DEDUPE LIST
            </Button>
            <Button leftSection={<IconPlus size={16}/>} onClick={openInsertEnrichedData}>
              UPLOAD DEDUPE RECORDS
            </Button>
            
          </Group>
          <Text c="dimmed" size="sm">
            Manage and observe dedupe campaigns
          </Text>
        </div>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
          {stats.map((stat) => (
            <Card key={stat.title} padding="md" radius="md" withBorder>
              <Group justify="space-between">
                <div>
                  <Text c="dimmed" size="sm" tt="uppercase" fw={700}>
                    {stat.title}
                  </Text>
                  <Text fw={700} size="xl">
                    {stat.value}
                  </Text>
                </div>
                <ActionIcon
                  color={stat.color}
                  variant="light"
                  radius="md"
                  size="xl"
                >
                  <stat.icon size={22} />
                </ActionIcon>
              </Group>
            </Card>
          ))}
        </SimpleGrid>
        <DedupedCampaignTable/>
      </Stack>

      <Modal opened={manualOpened} onClose={manualDedupeInsertClose} title="MANUAL DEDUPE FILE INSERT" size="lg" centered withCloseButton={false} styles={{header:{justifyContent:'center',position:'relative'},title:{flex:1,textAlign:'center'}}}>
        <form>
          {/**Manual Dedupe file upload */}
          <Stack>
            <TextInput
              
            />
            <FileInput
              label="MANUAL DEDUPE FILE"
              placeholder="enter manual dedupe file"
              leftSection={<IconUpload size={30}/>}
              p={12}
              clearable
              required
              accept='.csv,.xls,.xlsx'
            />
          </Stack>
          <Flex justify="end" align="center" gap={12}>
            <Button type='submit' variant='outline' justify='center'>
               DEDUPE
            </Button>
            <Button variant='outline' color='red' onClick={manualDedupeInsertClose} leftSection={<IconX size={18}/>}>
              CANCEL
            </Button>
          </Flex>
        </form>
      </Modal>

      <Modal opened={openedInsertDedupeList} onClose={closeInsertDedupeList} title="ADD DEDUPE LIST" withCloseButton={false} size="lg" styles={{header:{justifyContent:'center',position:'relative'},title:{flex:1,textAlign:'center'}}} centered>
        {/**insert dedupe list */}
        <form onSubmit={addDedupeListForm.handleSubmit(addDedupeListSubmit)}>

          <Stack>
            <TextInput
              label="ADD DEDUPE LIST"
              placeholder="Enter the campaign code"
              leftSection={<IconList size={24}/>}
              {...addDedupeListForm.register("camp_code",{required:"Campaign code is required"})}
              withAsterisk
            />
            <Center mt={40}>

              <Flex justify="end" align="center" gap={20}>
                <Button variant='outline' type="submit" leftSection={<IconList/>} loading={addDedupeList?.isPending}>
                  ADD DEDUPE LIST
                </Button>
                <Button variant='outline' color='red' leftSection={<IconX/>} onClick={closeInsertDedupeList}>
                  CANCEL
                </Button>
              </Flex>
            </Center>
          </Stack>
        </form>
      </Modal>
      
      <Modal opened={openedInsertEnrichedData} onClose={closeInsertEnrichedData} title="UPLOAD DEDUPE RECORDS" withCloseButton={false} size="lg" styles={{header:{justifyContent:'center',position:'relative'},title:{flex:1,textAlign:'center'}}} centered>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
              <TextInput label="Campaign Name" leftSection={<IconTarget/>} placeholder='enter campaign name' ml={10} {...register("campaign_name",{required:"Campaign name is required"})}/>
              <TextInput label="Campaign Code" leftSection={<IconTarget/>} placeholder='enter campaign code' ml={10} {...register("camp_code",{required:"Campaign code is required"})}/>
              <Controller
                name='dedupe_file'
                control={control}
                rules={{required:"CSV or Excel file is required"}}
                render={({field,fieldState})=>(
                    <FileInput 
                      value={field.value ?? null}
                      onChange={(file)=>field.onChange(file)}
                      label="Dedupe File" 
                      withAsterisk 
                      placeholder="upload dedupe campaign file with ids and cell numbers" 
                      accept='.csv,.xls,.xlsx' 
                      leftSection={<IconFileFilled size={30}/>} 
                      p="md" 
                      mr={30}
                      clearable
                      error={fieldState?.error?.message}
                      />
                )}
              />
            </Stack>
            <Center mt={40}>
              <Flex justify="end" align="enter" gap={20} mt={15}>
                <Button variant='outline' color='blue' type='submit'>
                  UPLOAD 
                </Button>
                <Button variant='outline' color='red' onClick={closeInsertEnrichedData} leftSection={<IconX/>} p={12}>
                  CANCEL
                </Button>
              </Flex>
            </Center>
          </form>
      </Modal>

      <Modal opened={createDedupeCampaignsOpened} onClose={closeDedupeCampaignModal} title="CREATE DEDUPE CAMPAIGN" centered withCloseButton={false}>
        <Stack>
          <form>
            <Stack>
              <TextInput
                label='Branch'
                placeholder='Enter Branch name'
                required
              />
              <TextInput
                label="Campaign Name"
                placeholder='Enter Campaign Name'
                required
              />
              <TextInput 
                label="Camapign Code"
                placeholder='Enter Campaign Code'
                required
              />
            </Stack>
            <Flex gap="xl" justify="center" align="center" mt={20}>
            <Button variant='outline'>
              CREATE CAMPAIGN
            </Button>
            <Button variant='outline' color='red' leftSection={<IconX/>} onClick={closeDedupeCampaignModal}>
              CANCEL 
            </Button>
            </Flex>
          </form>
        </Stack>
      </Modal>
    </Container>
  );

};


export default DedupeCampaignsPage;