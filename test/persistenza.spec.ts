import { test, expect, type Page } from '@playwright/test'
import { TAPPE } from '../src/dati/tappe'
import { avviaTour, spostaA } from './percorso'

const CHIAVE = 'cultura-alcolica:tour'

const statoSalvato = (page: Page) =>
  page.evaluate((chiave) => {
    const grezzo = localStorage.getItem(chiave)
    return grezzo ? (JSON.parse(grezzo) as Record<string, unknown>) : null
  }, CHIAVE)

const nomiCache = (page: Page) => page.evaluate(() => caches.keys())

const segnaUnOmbra = async (page: Page) => {
  await page.locator('.pulsante-flottante').nth(1).click()
  await page.getByRole('button', { name: /un’ombra/ }).click()
  await page.getByRole('button', { name: 'Chiudi il conto' }).click()
}

test('ricaricando la pagina il tour riprende da dove era', async ({ page }) => {
  await avviaTour(page)
  await spostaA(page, TAPPE[0].coordinate)
  await expect(page.locator('.sheet--arrivo')).toBeVisible()
  await page.getByRole('button', { name: 'Apri la tappa' }).click()
  await page.getByRole('button', { name: 'Torna alla mappa' }).click()
  await segnaUnOmbra(page)

  await expect.poll(async () => (await statoSalvato(page))?.indiceAttiva).toBe(1)

  await page.reload()

  await expect(page.getByRole('button', { name: 'Riprendi il tour' })).toBeVisible()
  await page.locator('.inizia__pulsante').click()

  await expect(page.locator('.barra-tappa__titolo')).toHaveText(TAPPE[1].titolo)
  await expect(page.locator('.pulsante-flottante__conto')).toHaveText('1')
})

test('terminando il tour si svuotano stato e download offline', async ({ page }) => {
  await avviaTour(page)
  await segnaUnOmbra(page)

  expect(await nomiCache(page)).toContain('mappa-pmtiles')
  expect(await statoSalvato(page)).not.toBeNull()

  await page.getByRole('button', { name: 'Termina tour' }).click()
  await page.getByRole('button', { name: 'Termina e libera lo spazio' }).click()

  await expect(page.getByRole('button', { name: 'Torna all’inizio' })).toBeVisible()
  await expect.poll(() => statoSalvato(page)).toBeNull()
  await expect
    .poll(async () =>
      (await nomiCache(page)).filter((nome) => !nome.startsWith('workbox-precache')),
    )
    .toEqual([])

  await page.reload({ waitUntil: 'load' })
  await expect(page.getByRole('button', { name: 'Comincia' })).toBeVisible({ timeout: 30000 })
})
