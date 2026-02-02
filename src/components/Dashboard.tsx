import React,{useState} from 'react';
import { Stack,Button,Text, Group,AppShell, ActionIcon,Tabs,Tooltip,Divider} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import {IconCalendar, IconLogout, IconMenu2,IconTable} from '@tabler/icons-react'
import { ScaleIcon, ArchiveRestoreIcon,House } from 'lucide-react';
import DMARecordsPage from '../pages/DMARecordsPage';
import DedupeCampaignsPage from '../pages/DedupeCampaignsPage';
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
    navigate("/")
  }

  const isXs = useMediaQuery('(max-width: 36em)');
  const isSm = useMediaQuery('(max-width: 48em)');
  const titleSizeClass = 'text-lg sm:text-xl md:text-2xl';
  const tabFontSize = isXs ? 'xs' : isSm ? 'sm' : 'md';
  const tabIconSize = isXs ? 14 : isSm ? 16 : 18;

  // Navbar sizing (UI-only, keeps functionality intact)

  const navButtonSize = isXs ? 'xs' : isSm ? 'sm' : 'md';
  const navIconSize = isXs ? 14 : isSm ? 16 : 18;
  const navLabelClass = 'truncate text-xs sm:text-sm md:text-base';
  const navSectionLabelSize = isXs ? 'xs' : 'sm';
  const navPadding = isXs ? 'xs' : 'md';

    const renderPage = () => {

    switch (activePage) {
      case 'home':
        return <HomePage />

      case 'campaigns':
        return <Campaigns/>
      case 'campaign-rules':
        return <RulesPage/>
      case 'dedupe campaigns':
        return <DedupeCampaignsPage/>
      /* case 'rules':
        return <CampaignRulesPage/> */
      case 'dma':
        return <DMARecordsPage/>
      
      default:
        return <HomePage />;
    }

    };

  return (
  
        <AppShell
         header={{ height: { base: 56, sm: 70 } }}
          navbar={{
            width: { base: 240, sm: 280, md: 320 },
            breakpoint:'sm',
            collapsed:{mobile:!opened}
          }}
          
          padding="md"
        >
            <AppShell.Header>
              <Group  h="100%" px="md" justify='space-between' className="min-w-0">
                <Group className="min-w-0">
                  <ActionIcon variant='subtle' color='gray' onClick={toggle} hiddenFrom='sm'>
                    <IconMenu2 size={18}/>
                  </ActionIcon>
                   <Text fw={700} c="blue" className={`truncate ${titleSizeClass}`}>
                      ALS Dashboard
                    </Text>
                </Group>
              <Tabs
                value={activePage}
                onChange={(value)=>setActivePage(value as PageType)}
                variant='pills'
                visibleFrom='xs'

              >
                {/* <div className="scroll-x max-w-full">
                  <Tabs.List className="flex-nowrap">
                  <Tabs.Tab value='home' leftSection={<House size={16}/>} fz="lg" fw="bold">
                    HOME
                  </Tabs.Tab>
                  <Tabs.Tab value='campaigns' leftSection={<IconTable size={16}/>} fz="lg" fw="bold">
                    CAMPAIGNS
                  </Tabs.Tab>
                  <Tabs.Tab value='campaign-rules' leftSection={<ScaleIcon size={16}/>} fz="lg" fw="bold">
                    CAMPAIGN RULES
                  </Tabs.Tab>
                  <Tabs.Tab value='dedupe campaigns' leftSection={<IconCalendar size={16}/>} fz="lg" fw="bold">
                    DEDUPE CAMPAIGNS OVERVIEW
                  </Tabs.Tab>
                 
                  <Tabs.Tab value='dma' leftSection={<ArchiveRestoreIcon size={16}/>} fz="lg" fw="bold">
                    DMA OVERVIEW
                  </Tabs.Tab>
                  </Tabs.List>
                </div> */}
                  <div className="scroll-x max-w-full">
                  <Tabs.List className="flex-nowrap">
                  <Tabs.Tab value='home' className="whitespace-nowrap" leftSection={<House size={tabIconSize}/>} fz={tabFontSize} fw="bold">
                    <span className={navLabelClass}>HOME</span>
                  </Tabs.Tab>
                  <Tabs.Tab value='campaigns' className="whitespace-nowrap" leftSection={<IconTable size={tabIconSize}/>} fz={tabFontSize} fw="bold">
                    <span className={navLabelClass}>CAMPAIGNS</span>
                  </Tabs.Tab>
                  <Tabs.Tab value='campaign-rules' className="whitespace-nowrap" leftSection={<ScaleIcon size={tabIconSize}/>} fz={tabFontSize} fw="bold">
                    <span className="hidden sm:inline">CAMPAIGN RULES</span><span className="sm:hidden">RULES</span>
                  </Tabs.Tab>
                  <Tabs.Tab value='dedupe campaigns' className="whitespace-nowrap" leftSection={<IconCalendar size={tabIconSize}/>} fz={tabFontSize} fw="bold">
                    <span className="hidden sm:inline">DEDUPE CAMPAIGNS OVERVIEW</span><span className="sm:hidden">DEDUPE</span>
                  </Tabs.Tab>
                  <Tabs.Tab value='dma' className="whitespace-nowrap" leftSection={<ArchiveRestoreIcon size={tabIconSize}/>} fz={tabFontSize} fw="bold">
                    <span className="hidden sm:inline">DMA OVERVIEW</span><span className="sm:hidden">DMA</span>
                  </Tabs.Tab>
                  </Tabs.List>
                </div>
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
          
       
          
          <AppShell.Main>
            {renderPage()}
          </AppShell.Main>
          
        </AppShell>
  );
};



  //  <AppShell.Navbar p={navPadding}>
            
  //           <Stack gap="lg">
  //             <div>
  //               <Text size={navSectionLabelSize} fw={500} c="dimmed" mb="xs">
  //                 <span className="tracking-wide">NAVIGATION</span>
  //               </Text>
  //               <Stack gap="xs">

  //                 <Button 
  //                    variant={activePage === 'home' ? 'filled' : 'subtle'}
  //                   size={navButtonSize}
  //                     leftSection={<House size={navIconSize} />}
  //                     justify="flex-start"
  //                     onClick={() => setActivePage('home')}
  //                     fullWidth
  //                 >
  //                   <span className={navLabelClass}>HOME</span>
  //                 </Button>

  //                 <Button
  //                   variant={activePage === 'campaigns' ? 'filled' : 'subtle'}
  //                   size={navButtonSize}
  //                   leftSection={<IconTable size={navIconSize} />}
  //                   justify="flex-start"
  //                   onClick={() => setActivePage('campaigns')}
  //                   fullWidth
  //                   >
  //                   <span className={navLabelClass}>CAMPAIGNS</span>
  //                 </Button>

  //                 <Button
  //                   variant={activePage === 'campaign-rules' ? 'filled' : 'subtle'}
  //                   size={navButtonSize}
  //                   leftSection={<ScaleIcon size={navIconSize} />}
  //                   justify="flex-start"
  //                   onClick={() => setActivePage('campaign-rules')}
  //                   fullWidth
  //                   >
  //                   <span className={navLabelClass}><span className="hidden sm:inline">CAMPAIGN RULES</span><span className="sm:hidden">RULES</span></span>
  //                 </Button>
                  
  //                 <Button
  //                   variant={activePage === 'dedupe campaigns' ? 'filled' : 'subtle'}
  //                   size={navButtonSize}
  //                   leftSection={<IconCalendar size={navIconSize} />}
  //                   justify="flex-start"
  //                   onClick={() => setActivePage('dedupe campaigns')}
  //                   fullWidth
  //                 >
  //                   <span className={navLabelClass}><span className="hidden sm:inline">DEDUPE CAMPAIGNS OVERVIEW</span><span className="sm:hidden">DEDUPE</span></span>
  //                 </Button>
                 
  //                 <Button
  //                   variant={activePage ==='dma'?'filled':'subtle'}
  //                   size={navButtonSize}
  //                   leftSection={<ArchiveRestoreIcon size={navIconSize}/>}
  //                   justify='flex-start'
  //                   onClick={()=>setActivePage('dma')}
  //                   fullWidth
  //                 >
  //                   <span className={navLabelClass}><span className="hidden sm:inline">DMA OVERVIEW</span><span className="sm:hidden">DMA</span></span>
  //                 </Button>
                   
  //               </Stack>
  //             </div>
  //             <Divider/>

  //             <div>
  //               <Text size="sm" fw={500} c="dimmed" mb="xs">
  //                 Recent Activity
  //               </Text>
  //               <Stack gap="xs">
  //                 <Text size='xs' c="dimmed">
  //                   CAMPAIGNS LOADED
  //                 </Text>
  //                  <Text size='xs' c="dimmed">
  //                   DMA RECORDS READY
  //                 </Text>
  //                  <Text size='xs' c="dimmed">
  //                   DEDUPED CAMPAIGNS UPLOAD
  //                 </Text>
  //               </Stack>
  //             </div>
  //           </Stack>
  //         </AppShell.Navbar>