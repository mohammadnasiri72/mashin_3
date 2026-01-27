import SelectType from "./components/SelectType";

export async function generateMetadata() {
  return {
    title: "مقایسه خودروهای بازار",
    description: "مقایسه خودروهای بازار",
  };
}

async function pageCompare() {
  return <SelectType />;
}

export default pageCompare;
