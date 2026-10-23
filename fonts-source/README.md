# Fonts

The files in `src/fonts/` are trimmed copies of free fonts (SIL Open Font License),
downloaded from https://github.com/google/fonts. Trimming cut them from ~740 KB to ~235 KB.

| File | Original | Kept |
|---|---|---|
| archivo.woff2 | Archivo[wdth,wght] | weight 400–900, width 100–125 |
| archivo-italic.woff2 | Archivo-Italic[wdth,wght] | weight 700–900 |
| source-serif.woff2 | SourceSerif4[opsz,wght] | weight 600–750, optical size 48 |
| source-serif-italic.woff2 | SourceSerif4-Italic[opsz,wght] | weight 600–700, optical size 36 |
| jost.woff2 / jost-italic.woff2 | Jost[wght] / Jost-Italic[wght] | 500–700 / 700 |
| hand.woff2 | ShadowsIntoLightTwo-Regular | – |

Characters kept: basic Latin, Latin-1, č ć đ š ž (and capitals), dashes, quotes, •, …, €, ← →.

If a new special character ever appears in a different-looking fallback font, it has to be
added. With Python's `fonttools` installed:

```bash
fonttools varLib.instancer "Archivo[wdth,wght].ttf" wght=400:900 wdth=100:125 -o tmp.ttf
pyftsubset tmp.ttf --unicodes="U+0020-007E,U+00A0-00FF,U+0106-0107,U+010C-010D,U+0110-0111,U+0160-0161,U+017D-017E,U+2013-2014,U+2018-201E,U+2022,U+2026,U+20AC,U+2190-2193" --layout-features='*' --flavor=woff2 --output-file=archivo.woff2
```
