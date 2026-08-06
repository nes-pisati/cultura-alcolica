import { test, expect } from '@playwright/test'
import { TAPPE } from '../src/dati/tappe'
import { avviaTour, spostaA } from './percorso'

const statoAudio = (page: import('@playwright/test').Page) =>
  page.evaluate(() => {
    const audio = document.querySelector('audio')
    return audio
      ? { presente: true, sorgente: audio.currentSrc, fermo: audio.paused, istante: audio.currentTime }
      : { presente: false, sorgente: '', fermo: true, istante: 0 }
  })

test('il primo tocco sblocca un solo elemento audio, caricato sulla tappa attiva', async ({
  page,
}) => {
  await avviaTour(page)

  await expect
    .poll(async () => (await statoAudio(page)).sorgente)
    .toContain(`audio/tappa-${TAPPE[0].id}.m4a`)

  expect(await page.locator('audio').count()).toBe(1)
})

test('arrivando sulla tappa la guida parte da sola', async ({ page }) => {
  await avviaTour(page)
  await spostaA(page, TAPPE[0].coordinate)

  await expect(page.locator('.sheet--arrivo')).toBeVisible()

  const stato = await statoAudio(page)
  expect(stato.sorgente).toContain(`audio/tappa-${TAPPE[0].id}.m4a`)
  await expect.poll(async () => (await statoAudio(page)).fermo).toBe(false)
})

test('senza rete gli audio scaricati arrivano dalla cache', async ({ page }) => {
  await avviaTour(page)
  await page.context().setOffline(true)

  const esito = await page.evaluate(async (id) => {
    const risposta = await fetch(`/audio/tappa-${id}.m4a`)
    return { ok: risposta.ok, byte: (await risposta.blob()).size }
  }, TAPPE[0].id)

  await page.context().setOffline(false)

  expect(esito.ok).toBe(true)
  expect(esito.byte).toBeGreaterThan(100000)
})
