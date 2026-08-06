import type { ComponentProps } from 'react'

type ProprietaPulsante = ComponentProps<'button'>

const classi = (...valori: (string | false | undefined)[]) => valori.filter(Boolean).join(' ')

export function PulsanteGrande({
  chiaro = false,
  className,
  ...resto
}: ProprietaPulsante & { chiaro?: boolean }) {
  return (
    <button
      type="button"
      className={classi('pulsante-grande', chiaro && 'pulsante-grande--chiaro', className)}
      {...resto}
    />
  )
}

export function PulsantePillola({
  neutro = false,
  largo = false,
  suScuro = false,
  className,
  ...resto
}: ProprietaPulsante & { neutro?: boolean; largo?: boolean; suScuro?: boolean }) {
  return (
    <button
      type="button"
      className={classi(
        'pulsante-pillola',
        neutro && 'pulsante-pillola--neutro',
        largo && 'pulsante-pillola--largo',
        suScuro && 'pulsante-pillola--su-scuro',
        className,
      )}
      {...resto}
    />
  )
}

export function PulsanteTondo({ className, ...resto }: ProprietaPulsante) {
  return <button type="button" className={classi('pulsante-tondo', className)} {...resto} />
}

export function PulsanteFlottante({
  conto,
  className,
  children,
  ...resto
}: ProprietaPulsante & { conto?: number }) {
  return (
    <button type="button" className={classi('pulsante-flottante', className)} {...resto}>
      {children}
      {conto !== undefined && <span className="pulsante-flottante__conto">{conto}</span>}
    </button>
  )
}
