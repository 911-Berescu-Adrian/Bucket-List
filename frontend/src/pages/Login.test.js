import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import LoginPage from "./LoginPage"; // replace with your component path
import { useLoginStore } from "../store/LoginStore";
import { useNavigate } from "react-router-dom";

jest.mock("../store/LoginStore");
jest.mock("react-router-dom", () => ({
    useNavigate: jest.fn(),
}));

test("submits the form with username and password", async () => {
    const saveUsername = jest.fn();
    const logIn = jest.fn();
    useLoginStore.mockReturnValue({ saveUsername, logIn, isLogged: false });

    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    const { getByLabelText, getByText } = render(<LoginPage />);

    const usernameInput = getByLabelText(/Username/i);
    const passwordInput = getByLabelText(/Password/i);
    const loginButton = getByText(/Login/i);

    fireEvent.change(usernameInput, { target: { value: "callisto" } });
    fireEvent.change(passwordInput, { target: { value: "123" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
        expect(saveUsername).toHaveBeenCalledWith("callisto");
        expect(logIn).toHaveBeenCalled();
    });
});
