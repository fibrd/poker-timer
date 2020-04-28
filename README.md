# Poker Timer

Jednoduchá single page aplikace využitelná pro trackování "Home Games" - amatérských poker turnajů s reaktivním zobrazením základních statistik.
Tvorba frontendu v JavaScriptu / Vue.js.

## Popis a nastavení

```
Primární funkce SPA je sledování aktuálních blind-levelů s využitím nastavitelného časovače a dalších turnajových statistik. Pro spuštění časovače a zahájení turnaje je nutné do hry přidat dva a více hráčů. Časovač hru ukončí automaticky po eliminaci posledního možného hráče. K zahájení další hry je nutné časovač manuálně vyresetovat.
```

### Barevná schémata

```
V aplikaci je uloženo několik základních barevných schémat stránky, která se v pravidelných intervalech po změně blindů postupně mění.
```

### VUEX

```
Komunikace mezi jednotlivými komponenty probíhá s využitím VUEX. Globální data aplikace jsou uložena ve VUEX, zatícmco samostatné komponenty drží pouze data lokální.
```

### Local Storage

```
Po opuštění aplikace se aktuální data automaticky ukládají do Local Storage, ze kterého se po opětovném načtení stránky znovu načítají.
```

### Webpage

Ukázka Single Page Aplikace k nahlédnutí: [Poker Timer](https://poker-timer.tk).

### Timer

K měření přesnějších časových intervalů využit [Duck Timer Package](https://www.npmjs.com/package/duck-timer). Ukládání časových údajů, naformátování jejich výpisů i vykreslení "Orbit Countdownu" naprogramováno zvlášť bez využití jiných packagů.
