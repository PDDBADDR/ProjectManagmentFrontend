export const sizeName = [
  'mobileS',
  'mobileM',
  'mobileL',
  'tablet',
  'laptop',
  'laptopL',
  'desktop',
] as const

const size: { [T in typeof sizeName[number]]: string } = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
}

export type deviceType = { [T in typeof sizeName[number]]: string }

export const devices: deviceType = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
}
