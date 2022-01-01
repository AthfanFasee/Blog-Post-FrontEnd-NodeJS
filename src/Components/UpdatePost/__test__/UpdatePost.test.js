import UpdatePost from '../UpdatePost'
import '@testing-library/jest-dom'
import {  render, screen} from '@testing-library/react'
import { HomePageProvider } from '../../../Helper/HomePageContexts/HomePageProvider'

const mockedUpdatePost = jest.fn()
describe("Checking Render", () => {
    it("Input", () => {
        render(<UpdatePost/>, {wrapper: HomePageProvider})
           
        const EditSection = screen.getByText(/Update Your Post/i)
        expect(EditSection).toBeTruthy()
    })

})

//Gotta fix Context Api