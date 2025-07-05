import { render, screen, waitFor } from "@testing-library/react";
import { OrderTable } from "./OrderTable";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import { MOCK_ORDERS } from "../../testUtils/mockOrders";
import * as api from "../../api/orders";

const waitForGrid = async () => {
  await waitFor(() => {
    const rows = document.querySelectorAll(".ag-center-cols-container .ag-row");
    expect(rows.length).toBeGreaterThan(0);
  });
};

describe("OrderTable", () => {
  it("renders the grid", async () => {
    render(<OrderTable />);
    expect(await screen.findByRole("grid")).toBeInTheDocument();
  });

  it("renders the correct number of rows", async () => {
    render(<OrderTable />);
    await waitForGrid();

    const rows = document.querySelectorAll(".ag-row");
    expect(rows.length).toBe(MOCK_ORDERS.length);
  });

  it("applies blue color for positive prices and red for negative", async () => {
    render(<OrderTable />);
    await waitForGrid();
    const RED = "rgb(255, 0, 0)";
    const BLUE = "rgb(0, 0, 255)";

    const priceCells = document.querySelectorAll('.ag-cell[col-id="price"]');

    expect(priceCells.length).toBe(MOCK_ORDERS.length);

    priceCells.forEach((cell) => {
      const value = parseFloat(cell.textContent || "0");
      if (value >= 0) {
        expect(cell).toHaveStyle({ color: BLUE });
      } else {
        expect(cell).toHaveStyle({ color: RED });
      }
    });
  });

  it("shows error UI when data fails to load", async () => {
    const spy = vi
      .spyOn(api, "fetchMockOrders")
      .mockRejectedValue(new Error("Mock failure"));

    render(<OrderTable />);
    const fallback = await screen.findByText(/error loading data/i);
    expect(fallback).toBeInTheDocument();

    spy.mockRestore();
  });
});
