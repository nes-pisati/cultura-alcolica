import { test, expect } from '@playwright/test'
import { TAPPE } from '../src/dati/tappe'
import { avviaTour, LONTANO, passiLungoIlPercorso, spostaA } from './percorso'

test('camminando sul percorso si attivano tutte le tappe, in ordine e una volta ciascuna', async ({
  page,
}) => {
  await avviaTour(page)

  const arrivo = page.locator('.sheet--arrivo')
  const attivate: number[] = []

  for (const punto of passiLungoIlPercorso()) {
    await spostaA(page, punto)
    await page.waitForTimeout(50)
    if (!(await arrivo.isVisible())) continue

    attivate.push(Number(await page.locator('.arrivo__numero').innerText()))
    await page.getByRole('button', { name: 'Apri la tappa' }).click()
    await page.getByRole('button', { name: 'Torna alla mappa' }).click()
  }

  expect(attivate).toEqual(TAPPE.map((tappa) => tappa.id))
})

test('una tappa già attivata non riscatta quando la posizione oscilla', async ({ page }) => {
  await avviaTour(page)
  const arrivo = page.locator('.sheet--arrivo')

  await spostaA(page, TAPPE[0].coordinate)
  await expect(arrivo).toBeVisible()

  await page.getByRole('button', { name: 'Non sono ancora qui' }).click()
  await expect(arrivo).toBeHidden()

  await spostaA(page, LONTANO)
  await page.waitForTimeout(500)
  await spostaA(page, TAPPE[0].coordinate)
  await page.waitForTimeout(1500)

  await expect(arrivo).toBeHidden()
})

test('le posizioni oltre 60 m di accuratezza non attivano la tappa', async ({ page }) => {
  await avviaTour(page)
  const arrivo = page.locator('.sheet--arrivo')

  await spostaA(page, TAPPE[0].coordinate, 80)
  await page.waitForTimeout(1500)
  await expect(arrivo).toBeHidden()

  await spostaA(page, TAPPE[0].coordinate, 12)
  await expect(arrivo).toBeVisible()
})

test('il pulsante manuale attiva la tappa anche senza geofence', async ({ page }) => {
  await avviaTour(page)

  await spostaA(page, LONTANO)
  await page.waitForTimeout(500)
  await expect(page.locator('.sheet--arrivo')).toBeHidden()

  await page.getByRole('button', { name: 'Sono qui' }).click()
  await expect(page.locator('.sheet--arrivo')).toBeVisible()
})
