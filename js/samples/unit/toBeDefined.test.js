/**
 * 
 * @returns {string}
 */
const getName = () => "user1"

const userAge =  31

describe('toBeDefined Unit Test Suites', () => {
    it('should return something', () => (
        expect(getName()).toBeDefined()
    ))

    it('should also return something', () => {
        expect(userAge).toBeDefined()
    })
})
