const colorsList = [
    'primary',
    'secondary',
    'muted',
    'dark',
    'bgPrimary',
    'bgSecondary',
] as const

type color = typeof colorsList[number];
type themeColors = {
    [T in typeof colorsList[number]]:string
}

type contrast = 'white' | 'black';

type theme = {
    contrast: contrast;
} & themeColors;