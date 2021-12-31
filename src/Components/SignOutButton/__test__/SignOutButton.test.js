import SignOutButton from '../SignOutButton'
import '@testing-library/jest-dom'
import { fireEvent, render, screen} from '@testing-library/react'

const mockedFunction= jest.fn()
describe("SignOutButton", () => {
    it("SignOutButton should render", () => {
        render(<SignOutButton setIsAuth={mockedFunction}/>)
        const SignOutBtn = screen.getByRole("button", {name : /LogOut/i})
        expect(SignOutBtn).toBeInTheDocument()
    })

    // it("SignOutButton should run signout onClick", () => {
    //     render(<SignOutButton setIsAuth={mockedFunction}/>)
    //     const SignOutBtn = screen.getByRole("button", {name : /LogOut/i})
    //     fireEvent.click(SignOutBtn)
    //     expect(mockedFunction).toHaveBeenCalled()
    // })
})