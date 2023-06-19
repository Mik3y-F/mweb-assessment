import CampaignPicker from "@/components/campaigns/CampaignPicker";
import { fetchCampaigns } from "@/components/campaigns/hooks";
import { ProductCardList } from "@/components/products/ProductCardList";
import { ProductFilterMenuBar } from "@/components/products/ProductFilterMenuBar";
import { useProductSelection } from "@/components/products/hooks";
import { ProviderPicker } from "@/components/providers/ProviderPicker";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import { type InferGetServerSidePropsType } from "next";
import Head from "next/head";

const Home = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { preloadedCampaignResponse } = props;
  const {
    products,
    productsQuery,

    selectedCampaign,
    campaignQuery,

    priceRanges,
    providers,

    handleSelectedCampaignChange,
    handleSelectedPriceRangesChange,
    handleSelectedProvidersChange,
    handleClearSelectedFilters,
  } = useProductSelection(preloadedCampaignResponse);

  return (
    <>
      <Head>
        <title>Mweb - Fibre</title>
        <meta name="description" content="Mweb Fibre Products" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className="h-full min-h-screen w-full bg-slate-100 px-4 text-center md:px-10"
        style={{
          backgroundImage: `url(/sprinkle.svg)`,
        }}
      >
        <h1 className="py-2 pt-10 text-4xl font-bold">Fibre products</h1>
        <div className="text pb-8 pt-2">
          Pick a fibre provider, explore their products and complete a coverage
          search.
        </div>
        <ProviderPicker
          providers={providers}
          handleSelectedProvidersChange={handleSelectedProvidersChange}
        />
        <div className="flex flex-wrap gap-2 pt-4 md:gap-8">
          <div className="w-1/6 min-w-fit">
            <CampaignPicker
              selectedCampaign={selectedCampaign?.code}
              handleSelectedCampaignChange={handleSelectedCampaignChange}
              campaigns={campaignQuery.data?.campaigns || []}
            />
          </div>
          <div className="flex flex-wrap">
            <ProductFilterMenuBar
              priceRanges={priceRanges}
              handleSelectedPriceRangesChange={handleSelectedPriceRangesChange}
              providers={providers}
              handleSelectedProvidersChange={handleSelectedProvidersChange}
            />
            <Button
              className="gap-1 font-bold"
              variant={"ghost"}
              onClick={handleClearSelectedFilters}
            >
              <XCircle size={20} />
              Clear
            </Button>
          </div>
        </div>

        <ProductCardList
          products={products}
          isLoading={productsQuery.isLoading || campaignQuery.isLoading}
          isError={productsQuery.isError || campaignQuery.isError}
        />
      </div>
    </>
  );
};

export default Home;

export const getServerSideProps = async () => {
  // It's better UX to fetch campaigns on the server side so that the page is rendered with the filters
  const preloadedCampaignResponse = await fetchCampaigns();

  return { props: { preloadedCampaignResponse } };
};
