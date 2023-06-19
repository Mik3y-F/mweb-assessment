import { type Campaign } from "./hooks";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type CampaignPickerProps = {
  selectedCampaign?: string;
  handleSelectedCampaignChange: (value: string) => void;
  campaigns: Campaign[];
};

export default function CampaignPicker(props: CampaignPickerProps) {
  const { selectedCampaign, handleSelectedCampaignChange, campaigns } = props;

  return (
    <div className="max-w-sm">
      <Select
        onValueChange={handleSelectedCampaignChange}
        defaultValue={selectedCampaign}
      >
        <SelectTrigger className="min-w-max max-w-md gap-4 bg-white px-4 shadow-sm">
          <SelectValue placeholder="Pick a campaign" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Campaigns</SelectLabel>
            {campaigns.map((campaign) => (
              <SelectItem value={campaign.code} key={campaign.code}>
                {campaign.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
