import CampaignRules from "./CampaignRules"
import Campaigns from "./Campaigns"
import DedupeCampaigns from "./DedupeCampaigns"
import DMA from "./DMA"
import NavBar from "./NavBar"
import Pings from "./Pings"

const MainPage = () => {

  return (
    <main>
      <div>
        <NavBar/>
      </div>
      <CampaignRules/>
      <Campaigns/>
      <DedupeCampaigns/>
      <DMA/>
      <Pings/>
    </main>
  )
}

export default MainPage