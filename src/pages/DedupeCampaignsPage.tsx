import {Container,Title,Grid,Card,Text,Badge,Flex,Group,ActionIcon,Stack,Button,Avatar,Timeline,SimpleGrid,Modal,FileInput,TextInput} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {IconCalendarEvent,IconClock,IconUsers,IconPlus,IconVideo,IconFile,IconX, IconList, IconDatabase, IconHandClick, IconUpload} from '@tabler/icons-react';
import { useMutation, useQuery } from '@tanstack/react-query';

import DedupedCampaignTable from '../components/DedupeCampaignsTables';



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



  return (

    <Container size="xl" px={0}>
      <Stack gap="xl">
        <div>
          <Group justify="space-between" mb="lg" className='md:'>
            <Title order={2} c="dark">
              DEDUPE CAMPAIGNS 
            </Title>
             <Button leftSection={<IconPlus size={16} />} onClick={openDedupeCampaignModal} variant='outline'>
              CREATE DEDUPE CAMPAIGN
            </Button>
            <Button leftSection={<IconPlus size={16} />} onClick={manualDedupeInsertOpen}>
              MANUAL DEDUPE FILE INSERT
            </Button>
            <Button leftSection={<IconList size={16}/>} onClick={openInsertDedupeList} variant='outline'>
              INSERT DEDUPE LIST
            </Button>
            <Button leftSection={<IconPlus size={16}/>} onClick={openInsertEnrichedData}>
              INSERT ENRICHED DATA
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

      <Modal opened={openedInsertDedupeList} onClose={closeInsertDedupeList} title="INSERT DEDUPE LIST" withCloseButton={false} size="lg" styles={{header:{justifyContent:'center',position:'relative'},title:{flex:1,textAlign:'center'}}} centered>
        {/**insert dedupe list */}
        <form>
          <Stack>
            <FileInput
              label="INSERT DEDUPE LIST"
              placeholder="insert dedupe list"
              leftSection={<IconUpload size={24}/>}
              accept='.csv'
            />
            <Flex justify="end" align="center" gap={20}>
              <Button variant='outline' onClick={()=>{console.log("Insert the dedupe list")}} leftSection={<IconList/>}>
                INSERT DEDUPE LIST
              </Button>
              <Button variant='outline' color='red' leftSection={<IconX/>} onClick={closeInsertDedupeList}>
                Cancel
              </Button>
            </Flex>
          </Stack>
        </form>

      </Modal>
      
      <Modal opened={openedInsertEnrichedData} onClose={closeInsertEnrichedData} title="INSERT ENRICHED DATA" withCloseButton={false} size="lg" styles={{header:{justifyContent:'center',position:'relative'},title:{flex:1,textAlign:'center'}}} centered>
          <form>
            <Stack>
              <FileInput
                label="ENRICHED DATA FILE"
                placeholder="upload data file"
                required
                leftSection={<IconUpload size={30}/>}
                accept='.csv,.xlsx,.xls'
                mt="md"
                p={20}
              />
            </Stack>
            <Flex justify="end" align="enter" gap={20} mt={15}>
              <Button variant='outline' color='blue'>
                INSERT
              </Button>
              <Button variant='outline' color='red' onClick={closeInsertEnrichedData} leftSection={<IconX/>} p={12}>
                CANCEL
              </Button>
            </Flex>
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