// Import Dependencies
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Import Components
import { milisToMinutesAndSeconds } from "../timeConverter";

describe('Time converter', () => {
    it("Return value isn't number", () => {
        expect(milisToMinutesAndSeconds()).not.toBe()
    })
})