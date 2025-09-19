import React,{useState} from 'react';
import { Button, Text, Group, Avatar, Stack,AppShell, ActionIcon,Tabs,Tooltip,Menu, rem,Badge, Divider } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {notifications} from '@mantine/notifications'

// import { LogOut, User, Mail, Divide } from 'lucide-react';

import {IconBell,IconDownload,IconRefresh,IconFilter,IconSearch,IconPlus ,IconBriefcase, IconCalendar, IconCalendarEvent, IconLogout, IconMenu2, IconSchool, IconSettings, IconUser, IconTable} from '@tabler/icons-react'

import DMAPage from '../pages/DMARecordsPage';
import DedupeCampaignsPage from '../pages/DedupeCampaignsPage';
import ProfilesPage from '../pages/ProfilesPage';
import HomePage from '../pages/HomePage';
import CampaignsTable from './CampaignsTable';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

type PageType='home'|'dedupe'|'education'|'dma'|'campaigns'

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
    { icon: IconPlus, label: 'Create New', color: 'blue' },
    { icon: IconSearch, label: 'Search', color: 'green' },
    { icon: IconFilter, label: 'Filter', color: 'orange' },
    { icon: IconDownload, label: 'Export', color: 'purple' },
    { icon: IconRefresh, label: 'Refresh', color: 'teal' },
  ];


    const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'dedupe':
        return <DedupeCampaignsPage />;
      case 'education':
        return <DMAPage />;
      case 'dma':
        return <ProfilesPage />;
      case 'campaigns':
        return <CampaignsTable/>;
        
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
                  <Tabs.Tab value='home' leftSection={<IconBriefcase size={16}/>} fz="lg" fw="bold">
                    HOME
                  </Tabs.Tab>
                  <Tabs.Tab value='campaigns' leftSection={<IconTable size={16}/>} fz="lg" fw="bold">
                    CAMPAIGNS
                  </Tabs.Tab>
                  <Tabs.Tab value='dedupe' leftSection={<IconCalendar size={16}/>} fz="lg" fw="bold">
                    DEDUPE CAMPAIGNS
                  </Tabs.Tab>
                  <Tabs.Tab value='dma' leftSection={<IconUser size={16}/>} fz="lg" fw="bold">
                    CAMPAIGN RULES
                  </Tabs.Tab>
                  <Tabs.Tab value='education' leftSection={<IconSchool size={16}/>} fz="lg" fw="bold">
                    DMA
                  </Tabs.Tab>
                </Tabs.List>
              </Tabs>

              <Group gap="sm">
                <Tooltip label="Notifications">
                  <ActionIcon  variant='subtle' color='gray'>
                    <IconBell size={18}/>
                  </ActionIcon>
                </Tooltip>
                <Menu shadow='md' width={200}>

                  <Menu.Target>
                     <Avatar
                        src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1"
                        alt="User Avatar"
                        size="sm"
                        style={{ cursor: 'pointer' }}
                      />
                      
                  </Menu.Target>


                  <Menu.Dropdown>
                    <Menu.Label>
                      Application
                    </Menu.Label>
                    <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
                        Settings
                    </Menu.Item>
                    <Menu.Divider/>

                    <Menu.Item
                      color="red"
                      leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
                      onClick={handleLogout}
                      >
                        Logout
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
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
                      leftSection={<IconBriefcase size={16} />}
                      justify="flex-start"
                      onClick={() => setActivePage('home')}
                      fullWidth
                  >
                    HOME
                  </Button>
                  <Button
                    variant={activePage === 'dedupe' ? 'filled' : 'subtle'}
                    leftSection={<IconCalendarEvent size={16} />}
                    justify="flex-start"
                    onClick={() => setActivePage('dedupe')}
                    fullWidth
                    >
                    DEDUPE CAMPAIGN
                  </Button>
                  <Button
                    variant={activePage === 'education' ? 'filled' : 'subtle'}
                    leftSection={<IconSchool size={16} />}
                    justify="flex-start"
                    onClick={() => setActivePage('education')}
                    fullWidth
                  >
                    DMA
                  </Button>
                  <Button
                    variant={activePage === 'dma' ? 'filled' : 'subtle'}
                    leftSection={<IconUser size={16} />}
                    justify="flex-start"
                    onClick={() => setActivePage('dma')}
                    fullWidth
                    >
                    CAMPAIGN RULES
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