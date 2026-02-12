import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { ScrollTrigger } from '../scroll.js';
import { getCategoryColor, getResponsiveValue, formatDateRange } from '../utils.js';
import { t } from '../i18n.js';
import worldData from '../../data/geo/world-110m.json';

let currentMapFilter = 'all';
let mapFiltersInitialized = false;
let storedWomen = null;
let storedLang = null;

export function initWorldMap(women, lang) {
  const container = document.getElementById('worldmapViz');
  if (!container) return;

  storedWomen = women;
  storedLang = lang;

  container.innerHTML = '';
  if (!mapFiltersInitialized) {
    setupMapFilters();
    mapFiltersInitialized = true;
  }
  renderMap(container, women, lang, currentMapFilter);
}

function setupMapFilters() {
  const filtersContainer = document.getElementById('mapFilters');
  if (!filtersContainer) return;

  filtersContainer.querySelectorAll('.category-filter').forEach((btn) => {
    btn.addEventListener('click', () => {
      filtersContainer.querySelectorAll('.category-filter').forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      currentMapFilter = btn.dataset.category;

      const container = document.getElementById('worldmapViz');
      container.innerHTML = '';
      renderMap(container, storedWomen, storedLang, currentMapFilter);
    });
  });
}

function renderMap(container, women, lang, filter) {
  const width = container.clientWidth || 800;
  const height = getResponsiveValue(380, 480, 520);

  const filtered = filter === 'all' ? women : women.filter((w) => w.category === filter);

  const svg = d3
    .select(container)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .style('background', 'var(--color-cream-warm)');

  const g = svg.append('g');

  // Zoom
  const zoom = d3
    .zoom()
    .scaleExtent([1, 8])
    .on('zoom', (event) => {
      g.attr('transform', event.transform);
    });

  svg.call(zoom);

  // Projection
  const projection = d3
    .geoNaturalEarth1()
    .scale(getResponsiveValue(130, 155, 165))
    .translate([width / 2, height / 2]);

  const path = d3.geoPath().projection(projection);

  // Draw actual country shapes from TopoJSON
  const countries = topojson.feature(worldData, worldData.objects.countries);

  g.selectAll('.country')
    .data(countries.features)
    .enter()
    .append('path')
    .attr('class', 'country')
    .attr('d', path)
    .attr('fill', '#F0E6D4')
    .attr('stroke', '#E0D0B8')
    .attr('stroke-width', 0.5)
    .attr('opacity', 0);

  // Graticule for grid lines
  const graticule = d3.geoGraticule();
  g.append('path')
    .datum(graticule())
    .attr('d', path)
    .attr('fill', 'none')
    .attr('stroke', '#E8D5A3')
    .attr('stroke-width', 0.3)
    .attr('opacity', 0.3);

  // World outline
  g.append('path')
    .datum({ type: 'Sphere' })
    .attr('d', path)
    .attr('fill', 'none')
    .attr('stroke', '#C8A951')
    .attr('stroke-width', 0.8)
    .attr('opacity', 0.4);

  // Tooltip
  const tooltip = d3
    .select(container)
    .append('div')
    .attr('class', 'tooltip map-tooltip')
    .style('position', 'absolute')
    .style('pointer-events', 'none');

  // Woman markers
  const markersData = filtered.filter((w) => w.coordinates);

  const markers = g
    .selectAll('.map-marker')
    .data(markersData)
    .enter()
    .append('g')
    .attr('class', 'map-marker')
    .attr('transform', (d) => {
      const [x, y] = projection([d.coordinates.lng, d.coordinates.lat]);
      return `translate(${x},${y})`;
    })
    .style('cursor', 'pointer');

  // Pulse ring
  markers
    .append('circle')
    .attr('class', 'marker-pulse')
    .attr('r', 12)
    .attr('fill', (d) => getCategoryColor(d.category))
    .attr('opacity', 0);

  // Main dot
  markers
    .append('circle')
    .attr('class', 'marker-dot')
    .attr('r', 0)
    .attr('fill', (d) => getCategoryColor(d.category))
    .attr('stroke', 'white')
    .attr('stroke-width', 1.5)
    .attr('opacity', 0.9);

  // Interactions
  markers
    .on('mouseenter', function (event, d) {
      d3.select(this).select('.marker-pulse').transition().duration(200).attr('opacity', 0.2).attr('r', 20);
      d3.select(this).select('.marker-dot').transition().duration(200).attr('r', 8);

      tooltip
        .html(`
          <div class="tooltip__name">${d.name[lang]}</div>
          <div class="tooltip__description">${d.shortBio[lang]}</div>
          <div style="font-size:11px;color:#5A5A5A;margin-top:4px;">
            ${formatDateRange(d.birthYear, d.deathYear)} &bull; ${d.nationality}
          </div>
        `)
        .classed('is-visible', true)
        .style('left', `${event.offsetX + 15}px`)
        .style('top', `${event.offsetY - 10}px`);
    })
    .on('mouseleave', function () {
      d3.select(this).select('.marker-pulse').transition().duration(200).attr('opacity', 0).attr('r', 12);
      d3.select(this).select('.marker-dot').transition().duration(200).attr('r', 6);
      tooltip.classed('is-visible', false);
    });

  // Entrance animation
  ScrollTrigger.create({
    trigger: container,
    start: 'top 75%',
    once: true,
    onEnter: () => {
      // Fade in countries
      g.selectAll('.country')
        .transition()
        .duration(600)
        .delay((d, i) => i * 3)
        .attr('opacity', 1);

      // Markers appear
      markers
        .selectAll('.marker-dot')
        .transition()
        .delay((d, i) => 400 + i * 50)
        .duration(500)
        .attr('r', 6);
    },
  });
}
