---
title: News and Updates
---

# News and Updates

<body>
  <!-- <img src="../assets/convening.svg"> -->
  <div id="card-container"></div>

```js
import yaml from 'js-yaml';

async function news() {
  try {
    const response = await FileAttachment("/data/news.yml").text();
    const data = yaml.load(response);
    const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
    renderCards(sortedData);
  } catch (error) {
    console.error('Error loading YAML file:', error);
  }
}

function renderCards(data) {
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = '';
  data.forEach(item => {
    const card = document.createElement('div');
    console.log(item.path)
    card.className = 'card';
    card.innerHTML = `
      <a href="${item.path}"><img src="${item.image}" alt="${item.title}" class="card-img"></a>
      <code class="card-date" style="font-size:0.8em;">${new Date(item.date).toLocaleDateString()}</code>
      <a href="${item.path}"><h3 class="card-title">${item.title}</h3></a>
      <p class="card-description"><i>${item.description}</i></p>
    `;
    cardContainer.appendChild(card);
  });
}

news();
```

</body>




<!-- ```js
const series = [42, 22, 0.5].map((x) =>
  d3.cumsum(Array.from({length: 100}), d3.randomNormal.source(d3.randomLcg(x))())
);
```

<div class="grid grid-cols-3">

```js
for (const data of series) {
  display(html`<div class="card">${Plot.lineY(data).plot()}</div>`);
} -->

<a class="sticker" href="https://arcade.allmaps.org"><img class="shake desktop-only" src="https://uxwing.com/wp-content/themes/uxwing/download/sport-and-awards/arcade-machine-game-icon.png" width="40px" ></img></a>