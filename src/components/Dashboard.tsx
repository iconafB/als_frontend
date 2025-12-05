import React,{useState} from 'react';
import { Button, Text, Group, Avatar, Stack,AppShell, ActionIcon,Tabs,Tooltip,Menu, rem,Badge, Divider } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {notifications} from '@mantine/notifications'
import {IconBell,IconDownload,IconRefresh,IconFilter,IconSearch,IconPlus ,IconBriefcase, IconCalendar, IconCalendarEvent, IconLogout, IconMenu2, IconSchool, IconSettings, IconUser, IconTable} from '@tabler/icons-react'
import { ScaleIcon, ArchiveRestoreIcon,House } from 'lucide-react';
import DMARecordsPage from '../pages/DMARecordsPage';
import DedupeCampaignsPage from '../pages/DedupeCampaignsPage';
import CampaignRulesPage from '../pages/CampaignsRulePage';
import HomePage from '../pages/HomePage';
import Campaigns from './Campaigns';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { RulesPage } from './CampaignRules/RulesPage';

type PageType='home'|'campaigns'|'dedupe campaigns'|'rules'|'dma'|'campaign-rules'


export const Dashboard: React.FC = () => {

  const [opened,{toggle}]=useDisclosure(false)

  const [activePage, setActivePage] = useState<PageType>('home')

  const navigate=useNavigate()

  const handleLogout=()=>{
    toast.success("Logout from the als dashboard")
    localStorage.removeItem("token");
    console.log("print the token from the localStorage")
    console.log(localStorage.getItem("token"))
    navigate("/")
  }

   const handleSidebarAction = (action: string, page: PageType) => {
    notifications.show({
      title: `${action} - ${page.charAt(0).toUpperCase() + page.slice(1)}`,
      message: `${action} action triggered for ${page} page`,
      color: 'green',
    
    }); 
  };


    const sidebarActions = [
    { icon: IconPlus, label: 'Create Campaign', color: 'blue' },
    { icon: IconPlus, label: 'Create Campaign Rule', color: 'green' },
    { icon: IconFilter, label: 'Submit DMA Record', color: 'orange' },
    { icon: IconDownload, label: 'Create Dedupe Campaign', color: 'purple' },
    { icon: IconRefresh, label: 'Manual Dedupe File Insert', color: 'teal' },
  ];


    const renderPage = () => {

    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'campaigns':
        return <Campaigns/>
      case 'dedupe campaigns':
        return <DedupeCampaignsPage/>
      case 'rules':
        return <CampaignRulesPage/>
      case 'dma':
        return <DMARecordsPage/>
      case 'campaign-rules':
        return <RulesPage/>
      default:
        return <HomePage />;
    }
    };

  return (
  
        <AppShell

          header={{height:70}}
          navbar={{
            width:280,
            breakpoint:'sm',
            collapsed:{mobile:!opened}
          }}
          
          padding="md"
        >
          <div className='p-40'>
            <AppShell.Header>
              <Group h="100%" justify='space-between'>
                <div className='px-18'>
                <Group>
                  <ActionIcon variant='subtle' color='gray' onClick={toggle} hiddenFrom='sm'>
                    <IconMenu2 size={18}/>
                  </ActionIcon>
                    <Text size="xl" fw={700} c="blue">
                      ALS Dashboard
                    </Text>
                </Group>
                </div>
              <Tabs
                value={activePage}
                onChange={(value)=>setActivePage(value as PageType)}
                variant='pills'
                visibleFrom='xs'
              >
                <Tabs.List>
                  <Tabs.Tab value='home' leftSection={<House size={16}/>} fz="lg" fw="bold">
                    HOME
                  </Tabs.Tab>
                  <Tabs.Tab value='campaigns' leftSection={<IconTable size={16}/>} fz="lg" fw="bold">
                    CAMPAIGNS
                  </Tabs.Tab>
                  <Tabs.Tab value='dedupe campaigns' leftSection={<IconCalendar size={16}/>} fz="lg" fw="bold">
                    DEDUPE CAMPAIGNS
                  </Tabs.Tab>
                  <Tabs.Tab value='rules' leftSection={<ScaleIcon size={16}/>} fz="lg" fw="bold">
                    CAMPAIGN RULES
                  </Tabs.Tab>
                  <Tabs.Tab value='dma' leftSection={<ArchiveRestoreIcon size={16}/>} fz="lg" fw="bold">
                    DMA
                  </Tabs.Tab>
                  <Tabs.Tab value='campaign-rules' leftSection={<ArchiveRestoreIcon size={16}/>} fz="lg" fw="bold">
                    RULES
                  </Tabs.Tab>
                </Tabs.List>
              </Tabs>

              <Group gap="sm" mr={20}>
                <Tooltip label="Logout" color='red'>
                  <ActionIcon  variant='subtle' color='gray' onClick={handleLogout}>
                    <IconLogout size={26} color='red'/>
                  </ActionIcon>
                </Tooltip>

              </Group>
            </Group>
          </AppShell.Header>

          <AppShell.Navbar p="md">
            <Stack gap="lg">
              <div>
                <Text size='sm' fw={500} c="dimmed" mb="xs">
                  NAVIGATION
                </Text>
                <Stack gap="xs">

                  <Button 
                     variant={activePage === 'home' ? 'filled' : 'subtle'}
                      leftSection={<House size={16} />}
                      justify="flex-start"
                      onClick={() => setActivePage('home')}
                      fullWidth
                  >
                    HOME
                  </Button>

                  <Button
                    variant={activePage === 'campaigns' ? 'filled' : 'subtle'}
                    leftSection={<IconTable size={16} />}
                    justify="flex-start"
                    onClick={() => setActivePage('campaigns')}
                    fullWidth
                    >
                    Campaigns
                  </Button>
                  <Button
                    variant={activePage === 'dedupe campaigns' ? 'filled' : 'subtle'}
                    leftSection={<IconCalendar size={16} />}
                    justify="flex-start"
                    onClick={() => setActivePage('dedupe campaigns')}
                    fullWidth
                  >
                    Dedupe Campaigns
                  </Button>
                  <Button
                    variant={activePage === 'rules' ? 'filled' : 'subtle'}
                    leftSection={<ScaleIcon size={16} />}
                    justify="flex-start"
                    onClick={() => setActivePage('rules')}
                    fullWidth
                    >
                    CAMPAIGN RULES
                  </Button>
                  <Button
                    variant={activePage ==='dma'?'filled':'subtle'}
                    leftSection={<ArchiveRestoreIcon size={16}/>}
                    justify='flex-start'
                    onClick={()=>setActivePage('dma')}
                    fullWidth
                  >
                    DMA 
                  </Button>
                </Stack>
              </div>
              <Divider/>

              <div>
                <Text size='sm' fw={500} c="dimmed" mb="xs">
                  QUCIK ACTIONS
                </Text>
                <Stack gap="xs">
                  {
                    sidebarActions.map((action)=>(
                      <Button key={action.label} variant='subtle' color={action.color} leftSection={<action.icon size={16}/>} justify='flex-start' onClick={() => handleSidebarAction(action.label, activePage)} fullWidth size="sm">
                        {action.label}
                      </Button>
                    ))
                  }
                </Stack>
              </div>
              <Divider/>
              <div>
                <Text size="sm" fw={500} c="dimmed" mb="xs">
                  Recent Activity
                </Text>
                <Stack gap="xs">
                  <Text size='xs' c="dimmed">
                    CAMPAIGNS LOADED
                  </Text>
                   <Text size='xs' c="dimmed">
                    DMA RECORDS READY
                  </Text>
                   <Text size='xs' c="dimmed">
                    DEDUPED CAMPAIGNS UPLOAD
                  </Text>
                </Stack>
              </div>
            </Stack>
          </AppShell.Navbar>
          <AppShell.Main>
            {renderPage()}
          </AppShell.Main>
        </div>
          
        </AppShell>
  );
};