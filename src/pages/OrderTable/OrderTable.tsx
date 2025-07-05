import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule } from "ag-grid-community";
import type { Order } from "../../types/order";
import { getOrderRowStyle, ORDER_COLUMN_DEFS } from "./constants";
import { fetchMockOrders } from "../../api/orders";

export const OrderTable = () => {
  const [rowData, setRowData] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOrders = async () => {
      setError(null);
      try {
        const data = await fetchMockOrders();
        setRowData(data);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unknown error";
        setError(message);
      }
    };

    loadOrders();
  }, []);

  if (error) return <p>Error loading data: {error}</p>;

  return (
    <div className="ag-theme-quartz" style={{ height: 500, width: "100%" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={ORDER_COLUMN_DEFS}
        getRowStyle={getOrderRowStyle}
        defaultColDef={{ flex: 1 }}
        modules={[AllCommunityModule]}
      />
    </div>
  );
};
