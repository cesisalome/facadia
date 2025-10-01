// Import the component you want to test
import SignIn from '../pages/signIn/index.js'
import { handleSignInForm } from '../utils/signInForm/index.js'

describe('SignIn Component Tests', () => {
    // Clean up after each test
    afterEach(() => {
        document.body.innerHTML = ''
    })

    it('should render the sign-in page HTML', () => {
        // Call the render function
        const html = SignIn.render()

        // Test the output
        expect(html).toContain('sign-in-page')
        expect(html).toContain('Façadia')
        expect(html).toContain('sign-in-form')
        expect(html).toContain('Veuillez vous connecter')
        expect(html).toContain('Votre addresse e-mail')
        expect(html).toContain('Votre mot de passe')
        expect(html).toContain('Se connecter')
        expect(html).toContain('user-email-error-msg')
        expect(html).toContain('user-password-error-msg')
    })

    it('should hide error messages on initial render', () => {
        const container = document.createElement('div')
        container.innerHTML = SignIn.render()

        const emailError = container.querySelector('.user-email-error-msg')
        const passwordError = container.querySelector('.user-password-error-msg')

        expect(emailError.classList.contains('hidden')).toBe(true)
        expect(passwordError.classList.contains('hidden')).toBe(true)
    })

    it('should show email error when email is invalid', () => {
        // Set up DOM
        document.body.innerHTML = SignIn.render()

        // CRITICAL: Call the function to set up event listeners
        handleSignInForm()

        // Get elements
        const form = document.querySelector('.sign-in-form')
        const emailInput = document.querySelector('#user-email')
        const emailError = document.querySelector('.user-email-error-msg')
        const passwordInput = document.querySelector('#user-password')

        // Set values
        emailInput.value = 'wrong@email.com'
        passwordInput.value = 'azerty'

        // Create a more robust event
        const submitEvent = new Event('submit', {
            bubbles: true,
            cancelable: true
        })

        // Dispatch the event
        form.dispatchEvent(submitEvent)

        expect(emailError.classList.contains('hidden')).toBe(false)
    })

    it('should show password error when password is invalid', () => {
        document.body.innerHTML = SignIn.render()

        // CRITICAL: Call the function to set up event listeners
        handleSignInForm()

        const form = document.querySelector('.sign-in-form')
        const emailInput = document.querySelector('#user-email')
        const passwordInput = document.querySelector('#user-password')
        const passwordError = document.querySelector('.user-password-error-msg')

        emailInput.value = 'user1@facadia.com'
        passwordInput.value = 'wrongpassword'

        const submitEvent = new Event('submit', {
            bubbles: true,
            cancelable: true
        })

        form.dispatchEvent(submitEvent)

        expect(passwordError.classList.contains('hidden')).toBe(false)
    })
})