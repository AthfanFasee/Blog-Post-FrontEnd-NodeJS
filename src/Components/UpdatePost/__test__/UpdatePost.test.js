import UpdatePost from '../UpdatePost'
import '@testing-library/jest-dom'
import { fireEvent, render, screen} from '@testing-library/react'

const mockedFunction= jest.fn()
describe("Checking Render", () => {
    it("Input", () => {
        // render(<UpdatePost updatePost={mockedFunction}/>)
        // const InputElement = screen.getByPlaceholderText("Title..")
        // expect(InputElement).toBeInTheDocument()
    })

})

//Gotta fix Context Api