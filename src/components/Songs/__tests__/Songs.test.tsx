// Import Dependencies
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Import Components
import Songs from "../index";

describe("Songs", () => {
  it("does not render incomplete songs data", () => {
    // @ts-expect-error testing incomplete data
    const { data } = render(<Songs />);

    expect(data).toBeFalsy();
  });

  it("song items length limit is 10(ten)", () => {
    render(<Songs />)
    const divElements = screen.getAllByTestId("song-container")
    expect(divElements.length).toBe(10)
  });
});
