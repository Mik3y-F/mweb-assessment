import { type Campaign } from "./campaignHooks";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

type CampaignPickerProps = {
  selectedCampaign: string;
  handleSelectedCampaignChange: (value: string) => void;
  campaigns: Campaign[];
};

export default function CampaignPicker(props: CampaignPickerProps) {
  const { selectedCampaign, handleSelectedCampaignChange, campaigns } = props;

  return (
    <div>
      <div className="mb-2">Select a campaign</div>
      <RadioGroup
        defaultValue={selectedCampaign}
        onValueChange={handleSelectedCampaignChange}
        className="mx-auto w-full max-w-xs"
      >
        {campaigns.map((campaign) => (
          <div key={campaign.code} className="flex items-center space-x-2">
            <RadioGroupItem value={campaign.code} id={campaign.code} />
            <Label htmlFor={campaign.code}>{campaign.name}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
