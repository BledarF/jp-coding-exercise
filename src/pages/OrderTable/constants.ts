import type { ColDef, RowClassParams } from "ag-grid-community";
import type { AssetClass, Order } from "../../types/order";

interface AssetClassInformation {
  order: number;
  color: string;
}

export const ASSET_CLASS_INFORMATION: Record<
  AssetClass,
  AssetClassInformation
> = {
  Commodities: { order: 1, color: "white" },
  Equities: { order: 2, color: "#d0e7ff" },
  Credit: { order: 3, color: "#d4f8d4" },
};

export const ORDER_COLUMN_DEFS: ColDef<Order>[] = [
  {
    field: "assetClass",
    sortable: true,
    comparator: (a: AssetClass, b: AssetClass) =>
      ASSET_CLASS_INFORMATION[a].order - ASSET_CLASS_INFORMATION[b].order,
  },
  {
    field: "price",
    sortable: true,
    sortingOrder: ["desc", "asc", null],
    cellStyle: (params) => ({
      color: params.value >= 0 ? "blue" : "red",
    }),
  },
  {
    field: "ticker",
    sortable: true,
  },
];

export const getOrderRowStyle = (params: RowClassParams) => ({
  backgroundColor:
    ASSET_CLASS_INFORMATION[params.data.assetClass as AssetClass].color,
});
