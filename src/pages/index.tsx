import CampaignPicker from "@/components/campaigns/CampaignPicker";
import { fetchCampaigns } from "@/components/campaigns/hooks";
import { PriceRangeFilter } from "@/components/products/PriceRangeFilter";
import { ProductCardList } from "@/components/products/ProductCardList";
import { useProductSelection } from "@/components/products/hooks";
import { ProviderFilter } from "@/components/providers/ProviderFilter";
import { ProviderPicker } from "@/components/providers/ProviderPicker";
import { Badge } from "@/components/ui/badge";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Building2, Coins, ListFilter } from "lucide-react";
import { type InferGetServerSidePropsType } from "next";
import Head from "next/head";

// TODO: Add a ui loading and error state for the queries (campaign and products)

const Home = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { campaignRes: preloadedCampaignResponse } = props;
  const {
    products,

    selectedCampaign,
    campaignQuery,

    priceRanges,
    providers,

    handleSelectedCampaignChange,
    handleSelectedPriceRangesChange,
    handleSelectedProvidersChange,
  } = useProductSelection(preloadedCampaignResponse);

  const selectedPriceRanges = () => {
    return priceRanges.filter((priceRange) => priceRange.selected);
  };

  const selectedProviders = () => {
    return providers.filter((provider) => provider.selected);
  };

  return (
    <>
      <Head>
        <title>Mweb - Fibre</title>
        <meta name="description" content="Mweb Fibre Products" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-full min-h-screen bg-slate-100 px-4 md:px-16 text-center">
        <h1 className="py-2 pt-16 md:pt-28 text-3xl font-bold">Fibre products</h1>
        <div className="text pb-8 pt-2">
          Pick a fibre provider, explore their products and complete a coverage
          search.
        </div>
        <ProviderPicker
          providers={providers}
          handleSelectedProvidersChange={handleSelectedProvidersChange}
        />
        <div className="flex flex-wrap gap-2 md:gap-8 pt-4">
          <div className="w-1/6 min-w-fit">
            <CampaignPicker
              selectedCampaign={selectedCampaign?.code}
              handleSelectedCampaignChange={handleSelectedCampaignChange}
              campaigns={campaignQuery.data?.campaigns || []}
            />
          </div>
          <div className="flex gap-2">
            <Menubar>
              <ListFilter size={20}  />
              <MenubarMenu>
                <MenubarTrigger>
                  <div className="flex gap-2 ">
                    <Coins size={18} />
                    <div className="text-sm whitespace-nowrap">Price Range</div>
                    <Badge className="bg-green-600 text-xs">
                      {selectedPriceRanges().length}
                    </Badge>
                  </div>
                </MenubarTrigger>
                <MenubarContent className="w-full">
                  <PriceRangeFilter
                    priceRanges={priceRanges}
                    handleSelectedPriceRangesChange={
                      handleSelectedPriceRangesChange
                    }
                  />
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger>
                  <div className="flex gap-2 ">
                    <Building2 size={18} />
                    <div className="text-sm">Providers</div>
                    <Badge className="bg-green-600 text-xs">
                      {selectedProviders().length}
                    </Badge>
                  </div>
                </MenubarTrigger>
                <MenubarContent className="w-full">
                  <ProviderFilter
                    providers={providers}
                    handleSelectedProvidersChange={
                      handleSelectedProvidersChange
                    }
                  />
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>

        <ProductCardList products={products} />
      </div>
    </>
  );
};

export default Home;

export const getServerSideProps = async () => {
  // It's better UX to fetch campaigns on the server side so that the page is rendered with the filters
  const campaignRes = await fetchCampaigns();

  return { props: { campaignRes } };
};
