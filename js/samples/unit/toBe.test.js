const me = {
    firstName: "John",
    lastName: "Doe",
    age: 31
}

const color = "tomato"

describe('toBe Unit Test Suites', () => {
    it('should be my firstName', () => {
        expect(me.firstName).toBe("John")
    })

    it('should be my age', () => {
        expect(me.age).toBe(31)
    })

    it('should not be the color tomato', () => {
        expect(color).not.toBe('lightblue')
    })
})
