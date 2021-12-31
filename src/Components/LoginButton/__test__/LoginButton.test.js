import LoginButton from '../LoginButton'
import '@testing-library/jest-dom'
import { fireEvent, render, screen} from '@testing-library/react'

const mockedFunction= jest.fn()

describe("LoginButton", () => {
    it("LoginButton should render", () => {
        render(<LoginButton signInWithGoogle={mockedFunction}/>)
        const LoginBtn = screen.getByRole("button", {name : /Sign in with Google/i})
        expect(LoginBtn).toBeInTheDocument()
    })

    it("should run signInWithGoogle onClick", () => {
        render(<LoginButton signInWithGoogle={mockedFunction}/>)
        const LoginBtn = screen.getByRole("button", {name : /Sign in with Google/i})
        fireEvent.click(LoginBtn)
        expect(mockedFunction).toHaveBeenCalled()
    })
})