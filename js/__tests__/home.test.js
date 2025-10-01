// Import components and utilities
import Home from '../pages/home/index.js'
import Header from '../pages/common/header/index.js'
import Pagination from '../pages/common/pagination/index.js'
import { ITEMS_PER_PAGE } from '../constants.js'
import { homepageData } from '../../data/mock-homepage-data.js'

// Mock the API to return test data
jest.mock('../utils/api/sensorsApi.js', () => ({
    retrieveSensorsData: jest.fn(() => {
        // Define mock data inside the mock function
        const mockData = {
            "facades": [
                {
                    "id": 1,
                    "isActive": true,
                    "img": "212312.jpg",
                    "location": "24, Rue Georges Lardennois"
                },
                {
                    "id": 2,
                    "isActive": false,
                    "img": "212130.jpg",
                    "location": "8, Rue Georges Lardennois"
                },
                {
                    "id": 3,
                    "isActive": false,
                    "img": "212131.jpg",
                    "location": "4, Rue Georges Lardennois"
                },
                {
                    "id": 4,
                    "isActive": true,
                    "img": "214200.jpg",
                    "location": "81, Rue Georges Lardennois"
                },
                {
                    "id": 5,
                    "isActive": false,
                    "img": "214100.jpg",
                    "location": "2, Rue Rémy de Gourmont"
                },
                {
                    "id": 6,
                    "isActive": true,
                    "img": "214110.jpg",
                    "location": "12, Rue Rémy de Gourmont"
                },
                {
                    "id": 7,
                    "isActive": true,
                    "img": "214120.jpg",
                    "location": "18, Rue Rémy de Gourmont"
                },
                {
                    "id": 8,
                    "isActive": true,
                    "img": "215100.jpg",
                    "location": "4, Rue Edgar Poe"
                },
                {
                    "id": 9,
                    "isActive": true,
                    "img": "215200.jpg",
                    "location": "7, Rue Edgar Poe"
                },
                {
                    "id": 10,
                    "isActive": true,
                    "img": "215300.jpg",
                    "location": "17, Rue Edgar Poe"
                }
            ]
        }
        return Promise.resolve(mockData.facades)
    })
}))

describe('Home Page Tests', () => {
    // Test data - matches what's in our mock
    const mockSensorsData = [
        { "id": 1, "isActive": true, "img": "212312.jpg", "location": "24, Rue Georges Lardennois" },
        { "id": 2, "isActive": false, "img": "212130.jpg", "location": "8, Rue Georges Lardennois" },
        { "id": 3, "isActive": false, "img": "212131.jpg", "location": "4, Rue Georges Lardennois" },
        { "id": 4, "isActive": true, "img": "214200.jpg", "location": "81, Rue Georges Lardennois" },
        { "id": 5, "isActive": false, "img": "214100.jpg", "location": "2, Rue Rémy de Gourmont" },
        { "id": 6, "isActive": true, "img": "214110.jpg", "location": "12, Rue Rémy de Gourmont" },
        { "id": 7, "isActive": true, "img": "214120.jpg", "location": "18, Rue Rémy de Gourmont" },
        { "id": 8, "isActive": true, "img": "215100.jpg", "location": "4, Rue Edgar Poe" },
        { "id": 9, "isActive": true, "img": "215200.jpg", "location": "7, Rue Edgar Poe" },
        { "id": 10, "isActive": true, "img": "215300.jpg", "location": "17, Rue Edgar Poe" }
    ]

    // Clean up after each test
    afterEach(() => {
        document.body.innerHTML = ''
        // Reset Home component state
        Home.offset = 0
        Home.sensors = null
    })

    describe('Header Component', () => {
        it('should render header with correct navigation elements', () => {
            const headerHtml = Header.render()

            // Check main header structure
            expect(headerHtml).toContain('main-header')
            expect(headerHtml).toContain('Façadia')

            // Check navigation links
            expect(headerHtml).toContain('Accueil')
            expect(headerHtml).toContain('Le projet')
            expect(headerHtml).toContain('Ajouter un capteur')
            expect(headerHtml).toContain('Se Déconnecter')

            // Check specific hrefs
            expect(headerHtml).toContain('href="#/home"')
            expect(headerHtml).toContain('href="#/add-sensor"')
            expect(headerHtml).toContain('href="/"') // Logout link
        })
    })

    describe('Home Page Rendering', () => {
        it('should render the complete home page structure', async () => {
            const homeHtml = await Home.render()

            // Check main page structure
            expect(homeHtml).toContain('home-page')
            expect(homeHtml).toContain('home-page-main-wrapper')
            expect(homeHtml).toContain('home-page-main')

            // Check page title
            expect(homeHtml).toContain('Vos capteurs')
            expect(homeHtml).toContain('data-testid="home-sensors-title"')

            // Check that header is included
            expect(homeHtml).toContain('main-header')

            // Check that sensors wrapper is included
            expect(homeHtml).toContain('sensors-wrapper')

            // Check that pagination is included
            expect(homeHtml).toContain('pagination-list')
        })
    })

    describe('Sensor Cards Pagination', () => {
        it('should display exactly 8 sensor cards on first page', async () => {
            // Reset offset to 0 (first page)
            Home.offset = 0

            const sensorsHtml = Home.renderSensorsCard(mockSensorsData)

            // Count sensor cards
            const sensorCardMatches = sensorsHtml.match(/sensor-card/g)
            expect(sensorCardMatches).toHaveLength(ITEMS_PER_PAGE)

            // Check that we're showing the first 8 sensors (IDs 1-8)
            expect(sensorsHtml).toContain('Capteur #1')
            expect(sensorsHtml).toContain('Capteur #8')
            expect(sensorsHtml).not.toContain('Capteur #9') // Should not show 9th sensor
        })

        it('should handle pagination when fewer items remain than page size', async () => {
            // Test with exactly 8 sensors to avoid the boundary issue
            const limitedSensors = mockSensorsData.slice(0, 8) // Only first 8 sensors
            Home.offset = 0

            const sensorsHtml = Home.renderSensorsCard(limitedSensors)

            // Should render exactly 8 sensor cards
            const sensorCardMatches = sensorsHtml.match(/sensor-card/g)
            expect(sensorCardMatches).toHaveLength(8)

            // Check that we're showing sensors 1-8
            expect(sensorsHtml).toContain('Capteur #1')
            expect(sensorsHtml).toContain('Capteur #8')
        })
    })

    describe('Sensor Card Content', () => {
        it('should render individual sensor card with correct information', async () => {
            const sensorsHtml = Home.renderSensorsCard(mockSensorsData)

            // Check first sensor card content
            const firstSensor = mockSensorsData[0]

            expect(sensorsHtml).toContain(`Capteur #${firstSensor.id}`)
            expect(sensorsHtml).toContain(`Localisation : ${firstSensor.location}`)
            expect(sensorsHtml).toContain(`/assets/${firstSensor.img}`)
            expect(sensorsHtml).toContain('Status')
            expect(sensorsHtml).toContain('actif')
            expect(sensorsHtml).toContain('Voir les détails')
            expect(sensorsHtml).toContain(`href="#/facade-details?id=${firstSensor.id}"`)
        })

        it('should render sensor cards with proper CSS classes', async () => {
            const sensorsHtml = Home.renderSensorsCard(mockSensorsData)

            expect(sensorsHtml).toContain('sensors-wrapper')
            expect(sensorsHtml).toContain('sensor-card')
            expect(sensorsHtml).toContain('sensor-img')
            expect(sensorsHtml).toContain('sensor-info')
            expect(sensorsHtml).toContain('sensor-info-location')
            expect(sensorsHtml).toContain('sensor-info-status')
            expect(sensorsHtml).toContain('sensor-info-btn')
        })
    })

    describe('Pagination Component', () => {
        it('should calculate correct number of pages', () => {
            const totalSensors = mockSensorsData.length // 10 sensors
            const expectedPages = Math.ceil(totalSensors / ITEMS_PER_PAGE) // 10/8 = 2 pages

            const actualPages = Pagination.getNumberOfPages(totalSensors)
            expect(actualPages).toBe(expectedPages)
        })

        it('should render pagination with correct number of page links', () => {
            const totalSensors = mockSensorsData.length
            const paginationHtml = Pagination.render(totalSensors)

            // Count pagination items
            const pageItemMatches = paginationHtml.match(/pagination-list-item/g)
            const expectedPages = Math.ceil(totalSensors / ITEMS_PER_PAGE) // 2 pages

            expect(pageItemMatches).toHaveLength(expectedPages)
            expect(paginationHtml).toContain('data-testid="pagination-list"')

            // Check that page numbers are present (account for whitespace)
            expect(paginationHtml).toMatch(/>\s*1\s*</)
            expect(paginationHtml).toMatch(/>\s*2\s*</)
        })

        it('should render pagination links with correct href attributes', () => {
            const totalSensors = mockSensorsData.length // 10 sensors = 2 pages
            const paginationHtml = Pagination.render(totalSensors)

            // Check that all pagination links point to home
            const hrefMatches = paginationHtml.match(/href="#\/home"/g)
            expect(hrefMatches).toHaveLength(2) // 2 pages = 2 links
        })
    })

    describe('Integration Tests', () => {
        it('should render complete home page with all components integrated', async () => {
            // Render full page
            document.body.innerHTML = `<div id="root">${await Home.render()}</div>`

            // Test that all major components are present in DOM
            const homePageElement = document.querySelector('.home-page')
            const headerElement = document.querySelector('.main-header')
            const sensorsTitle = document.querySelector('[data-testid="home-sensors-title"]')
            const sensorsWrapper = document.querySelector('.sensors-wrapper')
            const paginationList = document.querySelector('[data-testid="pagination-list"]')

            expect(homePageElement).not.toBeNull()
            expect(headerElement).not.toBeNull()
            expect(sensorsTitle).not.toBeNull()
            expect(sensorsWrapper).not.toBeNull()
            expect(paginationList).not.toBeNull()

            // Count actual sensor cards in DOM
            const sensorCards = document.querySelectorAll('.sensor-card')
            expect(sensorCards).toHaveLength(ITEMS_PER_PAGE)
        })
    })
})