import { useEffect, useState } from "react"
import { AssignRuleToCampaignModal } from "../Modals/AssignRuleModal";
import { CreateRuleModal } from "../Modals/CreateRuleModal";
import { CreateCampaignModal } from "../Modals/CreateCampaign";
import type { create_campaign_response } from "../../api/campaigns/types";
import type { Rule } from "../../api/campaign_rules/types";
interface RulesFlowsProps{
    opened: boolean;
    onClose:()=>void;
}
export default function CreateCampaignsFlow({ opened, onClose }: RulesFlowsProps) {
    
  const [campaignModalOpen, setCampaignModalOpen] = useState(false);
  const [ruleModalOpen, setRuleModalOpen] = useState(false);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [campaign, setCampaign] = useState<create_campaign_response | null>(null);
  const [rule, setRule] = useState<Rule | null>(null);

  useEffect(() => {
    if (opened) setCampaignModalOpen(true);
  }, [opened]);

  // Open assign modal automatically after rule is set
  useEffect(() => {
    if (rule) setAssignModalOpen(true);
  }, [rule]);

  const resetFlow = () => {
    setCampaign(null);
    setRule(null);
    setCampaignModalOpen(false);
    setRuleModalOpen(false);
    setAssignModalOpen(false);
    onClose();
  };

  return (
    <>
      <CreateCampaignModal
        opened={campaignModalOpen}
        onClose={resetFlow}
        onSuccess={(createdCampaign) => {
          setCampaign(createdCampaign);
          setCampaignModalOpen(false);
          setRuleModalOpen(true);
        }}
      />

      <CreateRuleModal
        opened={ruleModalOpen}
        onClose={resetFlow}
        campaignCode={campaign?.camp_code ?? ""}
        onSuccess={(createdRule) => {
          if (!createdRule?.rule_code) {
            console.error("Invalid rule created", createdRule);
            return;
          }
          setRule(createdRule); // triggers Assign modal via useEffect
          setRuleModalOpen(false);
        }}
      />

      <AssignRuleToCampaignModal
        opened={assignModalOpen}
        rule={rule}
        onClose={resetFlow}
        onSuccess={resetFlow}
      />
    </>
  );
}
