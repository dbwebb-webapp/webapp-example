# Transitions med css

> [!TIP]
>
> mdn har bra dokumentation och exempel:
>
> https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Transitions/Using
> 
> w3schools har bra information inklusive exempel
> https://www.w3schools.com/css/css3_transitions.asp

---

_För att köra exempel-koden så behöver du skapa en egen ```.env``` samt en API-key från lager api._

_Du kan utgå ifrån ```.env-example``` och däri byta ut till din egen API-nyckel till lager api._. 

_Installera med ```npm install``` och kör med ```npm run dev```_

---

## Inledning transitions

Med transitions kan man skapa visuell feedback på användarens interaktion med ens app/websida.  
I synnerhet på mobila enheter kan man få en mer visuell och effektiv användareupplevelse.

Transitions är en 'övergång' som specificeras med css och som uppfattas som en animering.

- En transition kräver två saker: ett **starttillstånd** och ett **sluttillstånd**
- CSS definierar båda tillstånden och hur övergången ska ske
- För att en transition ska starta, eller triggas som det kallas, så kan vi använda javascript (eller en CSS-pseudoklass) som **triggar** bytet mellan tillstånden

---

### Exempel 1

I ```index.html``` i style-blocket i template:
- .product-description har transition: transform 0.3s ease-out;
   och transform: translateX(100%); vilket är starttillståndet
- .product-description.show finns transform: translateX(0); vilket är sluttillståndet
  
- klicka på "Read description..." för en produkt; beskrivningen glider fram — det är en transition med transform och translateX

- i src/components/single-product.js: click-eventet som gör classList.toggle('show') — det är triggern

T
---

## syntax (css)

```css
transition: [property] [duration] [timing-function] [delay];
```

- **`transition-property`** — vilken CSS-egenskap som ska animeras
  - t ex `max-height` 
  - propertyn: `all` animerar alla egenskaper som ändras, men det är bättre att vara specifik för prestanda

- **`transition-duration`** — hur lång tid övergången tar
  - ange i sekunder, t ex `0.3s`, `2s` eller `0.05s`
  - Tumregel för mobil: 200–300ms för småsaker, 300–500ms för större rörelser

- **`transition-timing-function`** — acceleration
  - färdiga properties, t ex `ease` och `linear` — där linear är jämn hastighet (mekaniskt)
  - finns också `ease-in-out` — mjukt i båda ändar
  - eller t ex `ease-out` — snabb start, mjukt slut (bra för element som kommer in)

- **`transition-delay`** — fördröjning innan transitionen börjar
  - med `0.5s` får vi alltså en fördröjd start innan transitionen startar

### på vad kan man använda transition?

- **Snabba (GPU-accelererade) egenskaper — ok på mobil**
 - `transform` (translate, scale, rotate)
 - `opacity`
 - körs på GPU:n och blockerar inte maintråden

- **Fungerar men är mer perstandakrävande (kräver omritning/layout):**
  - `max-height`, `height`, `width`, `padding`, `margin`
  - `background-color`, `color`, `border-color`
  - Användbara men undvik i loopar eller på många element samtidigt

- **Kan INTE transiteras:**
  - `display` (none → block fungerar inte)
  - `visibility` fungerar, men "hoppar" — inget mellanläge
  - `font-family`

### Triggers på mobil vs desktop

- **`:hover`** — fungerar dåligt på mobil (inget hovra med fingret). hover-effekter är opålitliga på mobil.
- **`:active`** — elementet är "aktivt" medan fingret trycker. Kan användas för 'tryckkänsla'.
- **`:focus` / `:focus-within`** — fungerar på inputs och fokuserbara element. Bra för formulär.
- **JavaScript `classList.toggle()`** — mest pålitliga triggern på mobil (se i `single-product.js`)

_på mobil är JavaScript-triggade klassbyten med toggle mest stabilt, inte CSS-pseudoklasser._

---

### Exempel 2 - visuell feedback på bottom-nav vid tryck

I `style.css` har `.bottom-nav a` en transition:

```css
transition: background-color 0.15s ease-in-out, transform 0.15s ease-in-out, color 0.15s ease-in-out;
```

- 3 properties påverkas samtidigt: `background-color`, `transform` och `color`.

- trigger är pseudoklassen `:active` — den aktiveras medan fingret trycker ner (mobil) eller musen hålls nere (desktop). Ingen js behövs eftersom :active är trigger.

```css
.bottom-nav a:active {
  transform: scale(5.92);
  background-color: rgba(0, 0, 0, 0.1);
}
```

- **starttillstånd:** normalt utseende (scale 1, ingen bakgrund)
- **sluttillstånd:** `.bottom-nav a:active` — ökar till 92%, lätt grå bakgrund
- **trigger:** `:active` (CSS, inte JS)

Testa i mobilvyn — tryck och håll på en nav-länk.

---

### Exempel 3 - visuell feedback i meny/ny vy visas

Vi vill lägga till visuell feedback för att en ny vy laddas.  
Scenariot blir alltså när man använder bottom meny för att växla mellan vyer (produkter och lagerlista)  
så vill vi ge visuell feedback på skeendet;  
för detta la vi till en wrapper runt alla produkter för att enklare kunna arbeta med transitions.

Sist i ```routes.js```i render har vi lagt till en div som innesluter alla produkter;

```javascript
render() {
        const html = this.routes[this.currentRoute].view || "<not-found></not-found>";
        // wrappar in vyerna i en view-container som vi sedan kan lägga transitions på
        this.innerHTML = `<div class="view-container">${html}</div>`;
}
```

I ```style.css```la vi till transition;

```css
.view-container {

  transition: transform 2.3s ease-out, opacity 2.3s ease-in;
  transform: translateX(100%);
  opacity: 0.1; /* starttillståndet startar med genomskinlighet */
}

.view-container.visible {
  transform: translateX(0);
  opacity: 1; /*sluttillstånd - 1 blir ingen 'genomskinlighet'/opacitet
}
```

_Kom ihåg att man kan ändra värdena i DevTools och se vad som händer och för att testa olika värden._
