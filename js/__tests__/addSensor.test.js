// Import the component to test
import AddSensor from '../pages/addSensor/index.js'
import Header from '../pages/common/header/index.js'

// Mock fetch for API calls
global.fetch = jest.fn()

describe('AddSensor Component Tests', () => {
    // Clean up after each test
    afterEach(() => {
        document.body.innerHTML = ''
        // Clear all mocks
        fetch.mockClear()
    })

    describe('Component Rendering', () => {
        it('should render the add sensor page HTML structure', () => {
            const html = AddSensor.render()

            // Check main page structure
            expect(html).toContain('add-sensor-page')
            expect(html).toContain('add-sensor-main-wrapper')
            expect(html).toContain('add-sensor-page-main')
            
            // Check page title
            expect(html).toContain('Ajout d\'un nouveau capteur')
            expect(html).toContain('data-testid="add-sensor-title"')
            
            // Check that header is included
            expect(html).toContain('main-header')
        })

        it('should render the form with all required elements', () => {
            const html = AddSensor.render()
            
            // Check form structure
            expect(html).toContain('add-sensor-form')
            expect(html).toContain('id="add-sensor-form"')
            expect(html).toContain('method="POST"')
            
            // Check fieldset and legend
            expect(html).toContain('<fieldset>')
            expect(html).toContain('Informations de base du capteur')
            
            // Check form fields
            expect(html).toContain('id="sensor-name"')
            expect(html).toContain('name="name"')
            expect(html).toContain('placeholder="TempSensor"')
            expect(html).toContain('required')
            
            expect(html).toContain('id="sensor-type"')
            expect(html).toContain('name="type"')
            expect(html).toContain('placeholder="temperature"')
            
            // Check labels
            expect(html).toContain('Nom du capteur')
            expect(html).toContain('Type du capteur')
            
            // Check submit button
            expect(html).toContain('Ajouter le capteur')
            expect(html).toContain('type="submit"')
            
            // Check message div
            expect(html).toContain('id="sensor-message"')
        })

        it('should render form fields with proper CSS classes', () => {
            const html = AddSensor.render()
            
            expect(html).toContain('form-group')
            expect(html).toContain('submit-btn')
            expect(html).toContain('section-title')
        })
    })

    describe('Form Interaction Tests', () => {
        beforeEach(() => {
            // Set up DOM with the component
            document.body.innerHTML = AddSensor.render()
            // Set up event listeners
            AddSensor.afterRender()
        })

        it('should have empty form fields initially', () => {
            const nameInput = document.querySelector('#sensor-name')
            const typeInput = document.querySelector('#sensor-type')
            const messageDiv = document.querySelector('#sensor-message')
            
            expect(nameInput.value).toBe('')
            expect(typeInput.value).toBe('')
            expect(messageDiv.textContent).toBe('')
        })

        it('should accept user input in form fields', () => {
            const nameInput = document.querySelector('#sensor-name')
            const typeInput = document.querySelector('#sensor-type')
            
            // Simulate user input
            nameInput.value = 'TestSensor'
            typeInput.value = 'humidity'
            
            expect(nameInput.value).toBe('TestSensor')
            expect(typeInput.value).toBe('humidity')
        })
    })

    describe('Form Submission Tests', () => {
        beforeEach(() => {
            document.body.innerHTML = AddSensor.render()
            AddSensor.afterRender()
        })

        it('should show success message when sensor is added successfully', async () => {
            // Mock successful API response
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ id: 123, name: 'TestSensor', type: 'temperature' })
            })

            const form = document.querySelector('#add-sensor-form')
            const nameInput = document.querySelector('#sensor-name')
            const typeInput = document.querySelector('#sensor-type')
            const messageDiv = document.querySelector('#sensor-message')
            
            // Fill form
            nameInput.value = 'TestSensor'
            typeInput.value = 'temperature'
            
            // Submit form
            const submitEvent = new Event('submit', {
                bubbles: true,
                cancelable: true
            })
            form.dispatchEvent(submitEvent)
            
            // Wait for async operations
            await new Promise(resolve => setTimeout(resolve, 0))
            
            // Check success message
            expect(messageDiv.textContent).toContain('Capteur ajouté avec succès')
            expect(messageDiv.textContent).toContain('id: 123')
            expect(messageDiv.style.color).toBe('green')
            
            // Check form is reset
            expect(nameInput.value).toBe('')
            expect(typeInput.value).toBe('')
        })

        it('should show error message when API returns error', async () => {
            // Mock API error response
            fetch.mockResolvedValueOnce({
                ok: false,
                json: async () => ({ error: 'Capteur avec ce nom existe déjà' })
            })

            const form = document.querySelector('#add-sensor-form')
            const nameInput = document.querySelector('#sensor-name')
            const typeInput = document.querySelector('#sensor-type')
            const messageDiv = document.querySelector('#sensor-message')
            
            // Fill form
            nameInput.value = 'ExistingSensor'
            typeInput.value = 'temperature'
            
            // Submit form
            const submitEvent = new Event('submit', {
                bubbles: true,
                cancelable: true
            })
            form.dispatchEvent(submitEvent)
            
            // Wait for async operations
            await new Promise(resolve => setTimeout(resolve, 0))
            
            // Check error message
            expect(messageDiv.textContent).toBe('Capteur avec ce nom existe déjà')
            expect(messageDiv.style.color).toBe('red')
            
            // Form should not be reset on error
            expect(nameInput.value).toBe('ExistingSensor')
            expect(typeInput.value).toBe('temperature')
        })

        it('should show generic error message when API returns error without message', async () => {
            // Mock API error response without specific error message
            fetch.mockResolvedValueOnce({
                ok: false,
                json: async () => ({})
            })

            const form = document.querySelector('#add-sensor-form')
            const nameInput = document.querySelector('#sensor-name')
            const typeInput = document.querySelector('#sensor-type')
            const messageDiv = document.querySelector('#sensor-message')
            
            nameInput.value = 'TestSensor'
            typeInput.value = 'temperature'
            
            const submitEvent = new Event('submit', {
                bubbles: true,
                cancelable: true
            })
            form.dispatchEvent(submitEvent)
            
            await new Promise(resolve => setTimeout(resolve, 0))
            
            expect(messageDiv.textContent).toBe('Erreur lors de l\'ajout du capteur')
            expect(messageDiv.style.color).toBe('red')
        })

        it('should show connection error when fetch fails', async () => {
            // Mock fetch to throw an error (network error)
            fetch.mockRejectedValueOnce(new Error('Network Error'))

            const form = document.querySelector('#add-sensor-form')
            const nameInput = document.querySelector('#sensor-name')
            const typeInput = document.querySelector('#sensor-type')
            const messageDiv = document.querySelector('#sensor-message')
            
            nameInput.value = 'TestSensor'
            typeInput.value = 'temperature'
            
            const submitEvent = new Event('submit', {
                bubbles: true,
                cancelable: true
            })
            form.dispatchEvent(submitEvent)
            
            await new Promise(resolve => setTimeout(resolve, 0))
            
            expect(messageDiv.textContent).toBe('Erreur de connexion au backend')
            expect(messageDiv.style.color).toBe('red')
        })

        it('should send correct data to API', async () => {
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ id: 456 })
            })

            const form = document.querySelector('#add-sensor-form')
            const nameInput = document.querySelector('#sensor-name')
            const typeInput = document.querySelector('#sensor-type')
            
            nameInput.value = 'MySensor'
            typeInput.value = 'pressure'
            
            const submitEvent = new Event('submit', {
                bubbles: true,
                cancelable: true
            })
            form.dispatchEvent(submitEvent)
            
            await new Promise(resolve => setTimeout(resolve, 0))
            
            // Check that fetch was called with correct parameters
            expect(fetch).toHaveBeenCalledWith('http://localhost:3001/sensors', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: 'MySensor', type: 'pressure' })
            })
        })
    })

    describe('Integration Tests', () => {
        it('should render complete add sensor page with all components integrated', () => {
            document.body.innerHTML = `<div id="root">${AddSensor.render()}</div>`
            AddSensor.afterRender()
            
            // Test that all major components are present in DOM
            const addSensorPage = document.querySelector('.add-sensor-page')
            const headerElement = document.querySelector('.main-header')
            const addSensorTitle = document.querySelector('[data-testid="add-sensor-title"]')
            const addSensorForm = document.querySelector('#add-sensor-form')
            const nameInput = document.querySelector('#sensor-name')
            const typeInput = document.querySelector('#sensor-type')
            const submitButton = document.querySelector('.submit-btn')
            const messageDiv = document.querySelector('#sensor-message')
            
            expect(addSensorPage).not.toBeNull()
            expect(headerElement).not.toBeNull()
            expect(addSensorTitle).not.toBeNull()
            expect(addSensorForm).not.toBeNull()
            expect(nameInput).not.toBeNull()
            expect(typeInput).not.toBeNull()
            expect(submitButton).not.toBeNull()
            expect(messageDiv).not.toBeNull()
            
            // Check that form fields are properly configured
            expect(nameInput.hasAttribute('required')).toBe(true)
            expect(typeInput.hasAttribute('required')).toBe(true)
        })
    })
})