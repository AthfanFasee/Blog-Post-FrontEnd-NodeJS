import DeleteButton from '../DeleteButton'
import '@testing-library/jest-dom'
import { fireEvent, render, screen} from '@testing-library/react'

const mockedFunction= jest.fn()
describe("DeleteButton", () => {
    it("DeleteButton should render", () => {
        render(<DeleteButton deletePost={mockedFunction}/>)
        const DeleteBtn = screen.getByTitle(/Delete Post/i)
        expect(DeleteBtn).toBeInTheDocument()
    })
    it("should run deletePost onClick", () => {
        render(<DeleteButton deletePost={mockedFunction}/>)
        const DeleteBtn = screen.getByTitle(/Delete Post/i)
        fireEvent.click(DeleteBtn)
        expect(mockedFunction).toHaveBeenCalled()
    })
})