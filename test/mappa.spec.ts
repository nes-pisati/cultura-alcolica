import { test, expect } from '@playwright/test'
import { avviaTour } from './percorso'

test('la mappa non chiede caratteri e icone a un dominio esterno', async ({ page }) => {
  const esterne: string[] = []
  page.on('request', (richiesta) => {
    const url = new URL(richiesta.url())
    if (url.hostname !== 'localhost') esterne.push(url.href)
  })

  await avviaTour(page)
  await expect(page.locator('.mappa canvas')).toBeVisible()
  await page.waitForTimeout(4000)

  expect(esterne).toEqual([])
})
