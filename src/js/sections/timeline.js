import * as d3 from 'd3';
import { gsap, ScrollTrigger } from '../scroll.js';
import { getCategoryColor, getResponsiveValue, formatDateRange } from '../utils.js';

let svg, tooltip;

export function initTimeline(women, lang) {
  const container = document.getElementById('timelineViz');
  if (!container) return;

  // Clear previous
  container.innerHTML = '';

  const isMobile = window.innerWidth < 768;

  if (isMobile) {
    renderVerticalTimeline(container, women, lang);
  } else {
    renderHorizontalTimeline(container, women, lang);
  }
}

function renderHorizontalTimeline(container, women, lang) {
  const margin = { top: 40, right: 40, bottom: 60, left: 40 };
  const width = container.clientWidth - margin.left - margin.right;
  const height = getResponsiveValue(300, 400, 450);

  // Sort by birth year, filter out very old ones for cleaner view
  const sorted = [...women]
    .filter((w) => w.birthYear > 1700)
    .sort((a, b) => a.birthYear - b.birthYear);

  svg = d3
    .select(container)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  // Scales
  const minYear = d3.min(sorted, (d) => d.birthYear);
  const maxYear = 2025;
  const x = d3.scaleLinear().domain([minYear, maxYear]).range([0, width]);
  const y = height / 2;

  // River path
  const riverPoints = [];
  const numPoints = 20;
  for (let i = 0; i <= numPoints; i++) {
    const px = (i / numPoints) * width;
    const py = y + Math.sin((i / numPoints) * Math.PI * 3) * 30;
    riverPoints.push([px, py]);
  }

  const lineGen = d3.line().curve(d3.curveBasis);

  // River background (wide, light)
  svg
    .append('path')
    .attr('d', lineGen(riverPoints))
    .attr('fill', 'none')
    .attr('stroke', '#E8D5A3')
    .attr('stroke-width', 40)
    .attr('stroke-linecap', 'round')
    .attr('opacity', 0.3);

  // River main
  const riverPath = svg
    .append('path')
    .attr('d', lineGen(riverPoints))
    .attr('fill', 'none')
    .attr('stroke', '#C8A951')
    .attr('stroke-width', 4)
    .attr('stroke-linecap', 'round')
    .attr('opacity', 0.6);

  // Animate river path drawing
  const pathLength = riverPath.node().getTotalLength();
  riverPath
    .attr('stroke-dasharray', pathLength)
    .attr('stroke-dashoffset', pathLength);

  ScrollTrigger.create({
    trigger: container,
    start: 'top 70%',
    end: 'bottom 30%',
    scrub: 1,
    onUpdate: (self) => {
      riverPath.attr('stroke-dashoffset', pathLength * (1 - self.progress));
    },
  });

  // Year axis
  const years = d3.range(Math.ceil(minYear / 50) * 50, maxYear + 1, 50);
  svg
    .selectAll('.year-label')
    .data(years)
    .enter()
    .append('text')
    .attr('class', 'year-label')
    .attr('x', (d) => x(d))
    .attr('y', height - 10)
    .attr('text-anchor', 'middle')
    .attr('fill', '#5A5A5A')
    .attr('font-size', '12px')
    .attr('font-family', 'Inter, sans-serif')
    .text((d) => d);

  // Year tick lines
  svg
    .selectAll('.year-tick')
    .data(years)
    .enter()
    .append('line')
    .attr('x1', (d) => x(d))
    .attr('x2', (d) => x(d))
    .attr('y1', y - 60)
    .attr('y2', y + 60)
    .attr('stroke', '#E8D5A3')
    .attr('stroke-width', 1)
    .attr('opacity', 0.3);

  // Tooltip div
  tooltip = d3
    .select(container)
    .append('div')
    .attr('class', 'tooltip timeline-tooltip')
    .style('position', 'absolute')
    .style('pointer-events', 'none');

  // Woman nodes
  const getNodeY = (d, i) => {
    const baseY = y + Math.sin((x(d.birthYear) / width) * Math.PI * 3) * 30;
    const offset = (i % 2 === 0 ? -1 : 1) * (25 + Math.random() * 20);
    return baseY + offset;
  };

  const nodes = svg
    .selectAll('.woman-node')
    .data(sorted)
    .enter()
    .append('g')
    .attr('class', 'woman-node')
    .attr('transform', (d, i) => `translate(${x(d.birthYear)},${getNodeY(d, i)})`)
    .style('cursor', 'pointer')
    .style('opacity', 0);

  // Node circles
  nodes
    .append('circle')
    .attr('r', 8)
    .attr('fill', (d) => getCategoryColor(d.category))
    .attr('stroke', 'white')
    .attr('stroke-width', 2)
    .attr('opacity', 0.85);

  // Name labels (small, hidden by default, shown on hover)
  nodes
    .append('text')
    .attr('dy', -14)
    .attr('text-anchor', 'middle')
    .attr('font-size', '10px')
    .attr('font-family', "'Playfair Display', serif")
    .attr('font-weight', '600')
    .attr('fill', '#2C2C2C')
    .attr('opacity', 0)
    .text((d) => d.name[lang]);

  // Interactions
  nodes
    .on('mouseenter', function (event, d) {
      const node = d3.select(this);
      node.select('circle').transition().duration(200).attr('r', 12);
      node.select('text').transition().duration(200).attr('opacity', 1);

      tooltip
        .html(`
          <div class="tooltip__name">${d.name[lang]}</div>
          <div class="tooltip__description">${d.shortBio[lang]}</div>
          <div style="font-size:11px;color:#5A5A5A;margin-top:4px;">${formatDateRange(d.birthYear, d.deathYear)}</div>
        `)
        .classed('is-visible', true)
        .style('left', `${event.offsetX + 15}px`)
        .style('top', `${event.offsetY - 10}px`);
    })
    .on('mouseleave', function () {
      const node = d3.select(this);
      node.select('circle').transition().duration(200).attr('r', 8);
      node.select('text').transition().duration(200).attr('opacity', 0);
      tooltip.classed('is-visible', false);
    });

  // Scroll-triggered node reveal
  ScrollTrigger.create({
    trigger: container,
    start: 'top 70%',
    once: true,
    onEnter: () => {
      nodes
        .transition()
        .delay((d, i) => i * 40)
        .duration(500)
        .style('opacity', 1);
    },
  });
}

function renderVerticalTimeline(container, women, lang) {
  const sorted = [...women]
    .filter((w) => w.birthYear > 1700)
    .sort((a, b) => a.birthYear - b.birthYear);

  const timeline = document.createElement('div');
  timeline.className = 'timeline-vertical';
  timeline.style.cssText = 'position:relative;padding-left:40px;';

  // Vertical line
  const line = document.createElement('div');
  line.style.cssText =
    'position:absolute;left:18px;top:0;bottom:0;width:2px;background:linear-gradient(to bottom, #C8A951, #8B2252);opacity:0.3;';
  timeline.appendChild(line);

  sorted.forEach((woman) => {
    const item = document.createElement('div');
    item.className = 'timeline-item reveal';
    item.style.cssText = 'position:relative;margin-bottom:1.5rem;';

    const dot = document.createElement('div');
    dot.style.cssText = `position:absolute;left:-30px;top:6px;width:14px;height:14px;border-radius:50%;background:${getCategoryColor(woman.category)};border:2px solid white;box-shadow:0 0 0 2px ${getCategoryColor(woman.category)}33;`;

    const content = document.createElement('div');
    content.innerHTML = `
      <div style="font-family:'Playfair Display',serif;font-weight:700;font-size:1rem;">${woman.name[lang]}</div>
      <div style="font-size:0.8rem;color:#5A5A5A;">${formatDateRange(woman.birthYear, woman.deathYear)}</div>
      <div style="font-size:0.875rem;margin-top:4px;">${woman.shortBio[lang]}</div>
    `;

    item.appendChild(dot);
    item.appendChild(content);
    timeline.appendChild(item);
  });

  container.appendChild(timeline);

  // Trigger reveal for each item
  container.querySelectorAll('.timeline-item').forEach((item) => {
    ScrollTrigger.create({
      trigger: item,
      start: 'top 90%',
      once: true,
      onEnter: () => item.classList.add('is-visible'),
    });
  });
}
