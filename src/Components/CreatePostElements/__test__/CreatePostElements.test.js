import CreatePostElmnts from '../CreatePostElmnts'
import '@testing-library/jest-dom'
import { fireEvent, render, screen} from '@testing-library/react'

const mockedFunction= jest.fn()
describe("input and button elements should render", () => {
    it("input Element", () => {
        render(<CreatePostElmnts createPost={mockedFunction} setTitle={mockedFunction} setPostText={mockedFunction} />)
        const inputElement = screen.getByPlaceholderText("Title..")
        expect(inputElement).toBeInTheDocument()
    })

    it("textArea Element", () => {
        render(<CreatePostElmnts createPost={mockedFunction} setTitle={mockedFunction} setPostText={mockedFunction} />)
        const TextAreaElement = screen.getByPlaceholderText("Post...")
        expect(TextAreaElement).toBeInTheDocument()
    })

    it("Button", () => {
        render(<CreatePostElmnts createPost={mockedFunction} setTitle={mockedFunction} setPostText={mockedFunction} />)
        const Button = screen.getByRole("button", {name : /Submit Post/i})
        expect(Button).toBeInTheDocument()
    })
})

describe("should be able to type", () => {
    it("inputElement", () => {
        render(<CreatePostElmnts createPost={mockedFunction} setTitle={mockedFunction} setPostText={mockedFunction}/>)
        const inputElement = screen.getByPlaceholderText("Title..")
        fireEvent.change(inputElement, {target: {value : "Testing Text"}})
        expect(inputElement.value).toBe("Testing Text")
    })

    it("textArea Element", () => {
        render(<CreatePostElmnts  createPost={mockedFunction} setTitle={mockedFunction} setPostText={mockedFunction} />)
        const TextAreaElement = screen.getByPlaceholderText("Post...")
        fireEvent.change(TextAreaElement, {target: {value : "Testing Text"}})
        expect(TextAreaElement.value).toBe("Testing Text")
    })
})

describe("Button", () => {
    it("Button should be disabled at beginning", () => {
        render(<CreatePostElmnts createPost={mockedFunction} setTitle={mockedFunction} setPostText={mockedFunction} />)
        const Button = screen.getByRole("button", {name : /Submit Post/i})
        expect(Button).toBeDisabled()
    })

    // it("should run createPost onClick", () => {
    //     render(<CreatePostElmnts createPost={mockedFunction} setTitle={mockedFunction} setPostText={mockedFunction} />)
    //     const Button = screen.getByRole("button", {name : /Submit Post/i})
    //     fireEvent.click(Button)
    //     expect(mockedFunction).toHaveBeenCalled()
    // })

    // it("Button should be eneabled after input and textArea got values", () => {
    //     render(<CreatePostElmnts createPost={""} setTitle={mockedFunction} setPostText={mockedFunction} />)
    //     const Button = screen.getByRole("button", {name : /Submit Post/i})
    //     const inputElement = screen.getByPlaceholderText("Title..")
    //     const TextAreaElement = screen.getByPlaceholderText("Post...")
    //     fireEvent.change(inputElement, {target: {value : "Testing Title"}})
    //     fireEvent.change(TextAreaElement, {target: {value : "Testing TextArea"}})
    //     expect(Button).toBeEnabled()
    // })
})