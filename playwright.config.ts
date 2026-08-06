import { defineConfig } from '@playwright/test'

const PORTA = 5173
const INDIRIZZO = `http://localhost:${PORTA}`

export default defineConfig({
  testDir: 'test',
  timeout: 180000,
  expect: { timeout: 10000 },
  fullyParallel: false,
  workers: 1,
  reporter: [['list']],
  use: {
    baseURL: INDIRIZZO,
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    permissions: ['geolocation'],
    geolocation: { latitude: 45.433, longitude: 12.3269, accuracy: 12 },
    launchOptions: {
      args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
    },
  },
  webServer: {
    command: `npm run dev -- --port ${PORTA}`,
    url: INDIRIZZO,
    reuseExistingServer: true,
    timeout: 60000,
  },
})
