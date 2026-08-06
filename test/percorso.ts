import { expect, type Page } from '@playwright/test'
import { PERCORSO } from '../src/dati/tappe'

const RAGGIO_TERRESTRE = 6371000
const radianti = (gradi: number) => (gradi * Math.PI) / 180

export const distanzaMetri = (
  [lngA, latA]: [number, number],
  [lngB, latB]: [number, number],
) => {
  const deltaLat = radianti(latB - latA)
  const deltaLng = radianti(lngB - lngA)
  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(radianti(latA)) * Math.cos(radianti(latB)) * Math.sin(deltaLng / 2) ** 2
  return 2 * RAGGIO_TERRESTRE * Math.asin(Math.sqrt(a))
}

export const LONTANO: [number, number] = [12.3269, 45.433]

const PASSO_METRI = 10

export const passiLungoIlPercorso = () => {
  const passi: [number, number][] = []
  for (let i = 1; i < PERCORSO.length; i++) {
    const partenza = PERCORSO[i - 1]
    const arrivo = PERCORSO[i]
    const quanti = Math.max(1, Math.ceil(distanzaMetri(partenza, arrivo) / PASSO_METRI))
    for (let k = 0; k < quanti; k++) {
      passi.push([
        partenza[0] + (arrivo[0] - partenza[0]) * (k / quanti),
        partenza[1] + (arrivo[1] - partenza[1]) * (k / quanti),
      ])
    }
  }
  passi.push(PERCORSO[PERCORSO.length - 1])
  return passi
}

export const spostaA = (page: Page, [lng, lat]: [number, number], accuratezza = 12) =>
  page.context().setGeolocation({ longitude: lng, latitude: lat, accuracy: accuratezza })

export const avviaTour = async (page: Page) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Comincia' }).click()
  await page.getByRole('button', { name: 'Salta per ora' }).click()
  await page.getByRole('button', { name: /^Scarica/ }).click()
  await page.getByRole('button', { name: 'Vai al tour' }).click({ timeout: 120000 })
  await page.locator('.inizia__pulsante').click()
  await expect(page.locator('.schermata-mappa')).toBeVisible()
}
