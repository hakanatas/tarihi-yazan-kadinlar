import * as d3 from 'd3';
import { gsap, ScrollTrigger } from '../scroll.js';
import { getCategoryColor, getCategoryLightColor, getResponsiveValue, formatDateRange } from '../utils.js';
import { t } from '../i18n.js';

let currentFilter = 'all';
let filtersInitialized = false;
let storedWomen = null;
let storedLang = null;

export function initConstellation(women, lang) {
  const container = document.getElementById('constellationViz');
  if (!container) return;

  storedWomen = women;
  storedLang = lang;

  container.innerHTML = '';
  if (!filtersInitialized) {
    setupFilters();
    filtersInitialized = true;
  }
  renderBubbleChart(container, women, lang, currentFilter);
}

function setupFilters() {
  const filtersContainer = document.getElementById('constellationFilters');
  if (!filtersContainer) return;

  filtersContainer.querySelectorAll('.category-filter').forEach((btn) => {
    btn.addEventListener('click', () => {
      filtersContainer.querySelectorAll('.category-filter').forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      currentFilter = btn.dataset.category;

      const container = document.getElementById('constellationViz');
      container.innerHTML = '';
      renderBubbleChart(container, storedWomen, storedLang, currentFilter);
    });
  });
}

function renderBubbleChart(container, women, lang, filter) {
  const width = container.clientWidth || 800;
  const height = getResponsiveValue(450, 550, 620);

  const filtered = filter === 'all' ? women : women.filter((w) => w.category === filter);

  const categories = ['science', 'arts', 'politics', 'sports', 'business'];
  const hierarchyData = {
    name: 'root',
    children: categories
      .map((cat) => ({
        name: cat,
        children: filtered
          .filter((w) => w.category === cat)
          .map((w) => ({
            name: w.name[lang],
            value: 1,
            data: w,
          })),
      }))
      .filter((cat) => cat.children.length > 0),
  };

  const root = d3
    .hierarchy(hierarchyData)
    .sum((d) => d.value || 0)
    .sort((a, b) => b.value - a.value);

  const pack = d3.pack().size([width, height]).padding(getResponsiveValue(10, 15, 20));
  pack(root);

  const svg = d3
    .select(container)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('preserveAspectRatio', 'xMidYMid meet');

  const g = svg.append('g');

  const zoom = d3
    .zoom()
    .scaleExtent([0.5, 5])
    .on('zoom', (event) => {
      g.attr('transform', event.transform);
    });

  svg.call(zoom);

  // Tooltip
  const tooltip = d3
    .select(container)
    .append('div')
    .attr('class', 'tooltip constellation-tooltip')
    .style('position', 'absolute')
    .style('pointer-events', 'none');

  // Category circles
  const categoryNodes = root.children || [];

  g.selectAll('.category-circle')
    .data(categoryNodes)
    .enter()
    .append('circle')
    .attr('cx', (d) => d.x)
    .attr('cy', (d) => d.y)
    .attr('r', 0)
    .attr('fill', (d) => getCategoryColor(d.data.name))
    .attr('opacity', 0.06)
    .attr('stroke', (d) => getCategoryColor(d.data.name))
    .attr('stroke-width', 2)
    .attr('stroke-opacity', 0.15)
    .attr('stroke-dasharray', '4 4');

  // Category labels
  g.selectAll('.category-label-text')
    .data(categoryNodes)
    .enter()
    .append('text')
    .attr('x', (d) => d.x)
    .attr('y', (d) => d.y - d.r + 22)
    .attr('text-anchor', 'middle')
    .attr('font-family', "'Playfair Display', serif")
    .attr('font-size', getResponsiveValue('11px', '13px', '14px'))
    .attr('font-weight', '700')
    .attr('fill', (d) => getCategoryColor(d.data.name))
    .attr('opacity', 0)
    .text((d) => t(`categories.${d.data.name}`));

  // Woman leaf nodes
  const leaves = root.leaves();

  const leafNodes = g
    .selectAll('.woman-bubble')
    .data(leaves)
    .enter()
    .append('g')
    .attr('class', 'woman-bubble')
    .attr('transform', (d) => `translate(${d.x},${d.y})`)
    .style('cursor', 'pointer');

  // Glow ring
  leafNodes
    .append('circle')
    .attr('class', 'bubble-glow')
    .attr('r', 0)
    .attr('fill', 'none')
    .attr('stroke', (d) => getCategoryColor(d.parent.data.name))
    .attr('stroke-width', 1)
    .attr('opacity', 0);

  // Main circle
  leafNodes
    .append('circle')
    .attr('class', 'bubble-main')
    .attr('r', 0)
    .attr('fill', (d) => getCategoryLightColor(d.parent.data.name))
    .attr('stroke', (d) => getCategoryColor(d.parent.data.name))
    .attr('stroke-width', 1.5)
    .attr('opacity', 0.85);

  // Initials
  leafNodes
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('dy', '0.35em')
    .attr('font-family', "'Playfair Display', serif")
    .attr('font-size', (d) => `${Math.max(8, d.r * 0.55)}px`)
    .attr('font-weight', '700')
    .attr('fill', 'white')
    .attr('pointer-events', 'none')
    .attr('opacity', 0)
    .text((d) => {
      const name = d.data.name;
      const parts = name.split(' ');
      if (d.r > 25) return parts.length > 1 ? `${parts[0][0]}${parts[parts.length - 1][0]}` : parts[0][0];
      return parts[0][0];
    });

  // Hover
  leafNodes
    .on('mouseenter', function (event, d) {
      d3.select(this).select('.bubble-main').transition().duration(200).attr('opacity', 1).attr('stroke-width', 3);
      d3.select(this).select('.bubble-glow').transition().duration(200).attr('r', d.r + 6).attr('opacity', 0.3);

      const woman = d.data.data;
      if (woman) {
        tooltip
          .html(`
            <div class="tooltip__name">${woman.name[lang]}</div>
            <div class="tooltip__description">${woman.shortBio[lang]}</div>
            <div style="font-size:11px;color:#5A5A5A;margin-top:4px;">${formatDateRange(woman.birthYear, woman.deathYear)} &bull; ${woman.nationality}</div>
          `)
          .classed('is-visible', true)
          .style('left', `${event.offsetX + 15}px`)
          .style('top', `${event.offsetY - 10}px`);
      }
    })
    .on('mouseleave', function () {
      d3.select(this).select('.bubble-main').transition().duration(200).attr('opacity', 0.85).attr('stroke-width', 1.5);
      d3.select(this).select('.bubble-glow').transition().duration(200).attr('r', 0).attr('opacity', 0);
      tooltip.classed('is-visible', false);
    });

  // Entrance animation
  ScrollTrigger.create({
    trigger: container,
    start: 'top 75%',
    once: true,
    onEnter: () => {
      g.selectAll('.category-circle')
        .transition().duration(800).delay((d, i) => i * 150).attr('r', (d) => d.r);

      g.selectAll('.category-label-text')
        .transition().duration(600).delay((d, i) => 400 + i * 150).attr('opacity', 0.8);

      leafNodes.selectAll('.bubble-main')
        .transition().duration(600).delay((d, i) => 600 + i * 20).attr('r', (d) => d.r);

      leafNodes.selectAll('text')
        .transition().duration(400).delay((d, i) => 800 + i * 20).attr('opacity', 1);
    },
  });
}
