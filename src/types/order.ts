export interface Order {
  ticker: string;
  price: number;
  assetClass: AssetClass;
}

export type AssetClass = "Commodities" | "Equities" | "Credit";
