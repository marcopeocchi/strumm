import { Palette } from "../types"

export const isColorTooDark = (hexValue: string, lumaTreshold = 60) => {
  const rgb = parseInt(hexValue.substring(1), 16)

  const r = (rgb >> 16) & 0xff
  const g = (rgb >> 8) & 0xff
  const b = rgb & 0xff

  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b

  console.log(luma, lumaTreshold, luma < lumaTreshold)

  return luma < lumaTreshold || luma > 236
}

export const pickBrightest = (palette: Palette) => {
  if (!isColorTooDark(palette.dominant)) return palette.dominant
  if (!isColorTooDark(palette.lessDominant)) return palette.lessDominant
  return palette.accent
}