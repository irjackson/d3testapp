<script>
  import svelteLogo from './assets/svelte.svg'
  import Counter from './lib/Counter.svelte'
  import * as d3 from 'd3';
  import { scaleBand, scaleLinear } from "d3-scale";

const data = [
    { country: "China", population: 1439324 },
    { country: "India", population: 1380004 },
    { country: "United States of America", population: 331003 },
    { country: "Indonesia", population: 273524 },
    { country: "Pakistan", population: 220892 },
    { country: "Brazil", population: 212559 },
    { country: "Nigeria", population: 206140 },
    { country: "Bangladesh", population: 164689 },
    { country: "Russian Federation", population: 145934 },
    { country: "Mexico", population: 128933 },
]

  const width = 800;
  const height = 600;

  const margin = { top: 20, right: 20, bottom: 20, left: 180 };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  $: xDomain = data.map((d) => d.country);
  $: yDomain = data.map((d) => +d.population);

  $: yScale = scaleBand().domain(xDomain).range([0, innerHeight]).padding(0.1);
  $: xScale = scaleLinear()
    .domain([0, Math.max.apply(null, yDomain)])
    .range([0, innerWidth]);

</script>

<main>
  <svg {width} {height}>
    <g transform={`translate(${margin.left},${margin.top})`}>
      {#each xScale.ticks() as tickValue}
        <g transform={`translate(${xScale(tickValue)},0)`}>
          <line y2={innerHeight} stroke="black" />
          <text text-anchor="middle" dy=".71em" y={innerHeight + 3}>
            {tickValue}
          </text>
        </g>
      {/each}
      {#each data as d}
        <text
          text-anchor="end"
          x="-3"
          dy=".32em"
          y={yScale(d.country) + yScale.bandwidth() / 2}
        >
          {d.country}
        </text>
        <rect
          x="0"
          y={yScale(d.country)}
          width={xScale(d.population)}
          height={yScale.bandwidth()}
        />
      {/each}
    </g>
  </svg>
  <div class="card">
    <Counter />
  </div>

  <p>
    Check out <a href="https://github.com/sveltejs/kit#readme" target="_blank">SvelteKit</a>, the official Svelte app framework powered by Vite!
  </p>
  <p class="read-the-docs">
    Click on the Vite and Svelte logos to learn more
  </p>
</main>

<style>
  .read-the-docs {
    color: rgb(216, 216, 216);
  }
</style>
