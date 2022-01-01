import HomePageProvider, {HomePageContext} from '../HomePageProvider'
import '@testing-library/jest-dom'
import { render, screen} from '@testing-library/react'

describe('HomePageContext State Values', () => {
    it('editsection should be false as default', () => {
        render(<HomePageProvider>
            <HomePageContext.Consumer>
                {
                    value => <span>is Edit Section : {value.editsection.toString()}</span>
                }
            </HomePageContext.Consumer>
        </HomePageProvider>)
        const EditSection = screen.getByText(/is Edit Section : false/i)
        expect(EditSection).toBeTruthy()
    })
})