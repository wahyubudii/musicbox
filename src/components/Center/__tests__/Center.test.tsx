// Import Dependencies
import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Import Components
import Center from "../index";
import { Provider } from "react-redux";
import store from "../../../store";

const setup = () => {
    const utils = render(
        <Provider store={store}>
            <Center />
        </Provider>
    )
    const input = utils.getByPlaceholderText('Search')
    const button = utils.getByTestId('search-button')
    
    return {
        input,
        button,
      ...utils,
    }
}

describe("Center", () => {
    test("input value change should contain from user", () => {
        const { input } = setup()
        userEvent.type(input, 'Tulus')
        expect(input).toHaveValue('Tulus')
    });

    test("button be disable", () => {
        const { button } = setup()
        expect(button).not.toBeDisabled()
    });
})