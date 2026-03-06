import * as d3 from 'd3';
import { ScrollTrigger } from '../scroll.js';
import { getResponsiveValue } from '../utils.js';
import statisticsData from '../../data/statistics.json';

export function initStatistics(lang) {
  renderNobelChart(lang);
  renderParliamentChart(lang);
}

function renderNobelChart(lang) {
  const container = document.querySelector('#nobelChart .statistics__chart-container');
  if (!container) return;

  container.innerHTML = '';

  const data = statisticsData.nobelPrizes.byDecade;

  const margin = { top: 20, right: 20, bottom: 50, left: 40 };
  const width = (container.clientWidth || 350) - margin.left - margin.right;
  const height = getResponsiveValue(220, 260, 300) - margin.top - margin.bottom;

  const svg = d3
    .select(container)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const x = d3
    .scaleBand()
    .domain(data.map((d) => d.decade))
    .range([0, width])
    .padding(0.25);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.count) + 2])
    .range([height, 0]);

  // Grid lines
  svg.selectAll('.grid-line')
    .data(y.ticks(4))
    .enter()
    .append('line')
    .attr('x1', 0)
    .attr('x2', width)
    .attr('y1', (d) => y(d))
    .attr('y2', (d) => y(d))
    .attr('stroke', '#E8D5A3')
    .attr('stroke-width', 0.5)
    .attr('opacity', 0.4);

  // X axis
  svg
    .append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x).tickSize(0))
    .call((g) => g.select('.domain').remove())
    .selectAll('text')
    .attr('font-size', '9px')
    .attr('font-family', 'Inter, sans-serif')
    .attr('fill', '#5A5A5A')
    .attr('transform', 'rotate(-45)')
    .style('text-anchor', 'end');

  // Y axis
  svg
    .append('g')
    .call(d3.axisLeft(y).ticks(4).tickSize(-width))
    .call((g) => g.select('.domain').remove())
    .call((g) => g.selectAll('.tick line').attr('stroke', 'transparent'))
    .selectAll('text')
    .attr('font-size', '10px')
    .attr('font-family', 'Inter, sans-serif')
    .attr('fill', '#5A5A5A');

  // Gradient for bars
  const defs = svg.append('defs');
  const gradient = defs.append('linearGradient')
    .attr('id', 'nobelBarGrad')
    .attr('x1', '0%').attr('y1', '100%')
    .attr('x2', '0%').attr('y2', '0%');
  gradient.append('stop').attr('offset', '0%').attr('stop-color', '#8B2252');
  gradient.append('stop').attr('offset', '100%').attr('stop-color', '#C75B39');

  // Bars
  const bars = svg
    .selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', (d) => x(d.decade))
    .attr('width', x.bandwidth())
    .attr('y', height)
    .attr('height', 0)
    .attr('rx', 3)
    .attr('ry', 3)
    .attr('fill', 'url(#nobelBarGrad)')
    .attr('opacity', 0.85);

  // Value labels on top of bars
  const valueLabels = svg
    .selectAll('.bar-label')
    .data(data)
    .enter()
    .append('text')
    .attr('x', (d) => x(d.decade) + x.bandwidth() / 2)
    .attr('y', (d) => y(d.count) - 6)
    .attr('text-anchor', 'middle')
    .attr('font-size', '9px')
    .attr('font-family', 'Inter, sans-serif')
    .attr('font-weight', '700')
    .attr('fill', '#8B2252')
    .attr('opacity', 0)
    .text((d) => d.count);

  // Animate on scroll
  ScrollTrigger.create({
    trigger: container,
    start: 'top 80%',
    once: true,
    onEnter: () => {
      bars
        .transition()
        .duration(800)
        .delay((d, i) => i * 60)
        .ease(d3.easeBackOut.overshoot(0.3))
        .attr('y', (d) => y(d.count))
        .attr('height', (d) => height - y(d.count));

      valueLabels
        .transition()
        .duration(400)
        .delay((d, i) => 400 + i * 60)
        .attr('opacity', 1);
    },
  });
}

function renderParliamentChart(lang) {
  const container = document.querySelector('#parliamentChart .statistics__chart-container');
  if (!container) return;

  container.innerHTML = '';

  const data = statisticsData.parliamentRepresentation.global;
  const [minYear, maxYear] = d3.extent(data, (d) => d.year);

  const margin = { top: 20, right: 20, bottom: 40, left: 50 };
  const width = (container.clientWidth || 350) - margin.left - margin.right;
  const height = getResponsiveValue(220, 260, 300) - margin.top - margin.bottom;

  const svg = d3
    .select(container)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const x = d3.scaleLinear().domain([minYear, maxYear]).range([0, width]);
  const y = d3.scaleLinear().domain([0, 35]).range([height, 0]);

  // Grid lines
  svg.selectAll('.grid-line')
    .data([10, 20, 30])
    .enter()
    .append('line')
    .attr('x1', 0)
    .attr('x2', width)
    .attr('y1', (d) => y(d))
    .attr('y2', (d) => y(d))
    .attr('stroke', '#E8D5A3')
    .attr('stroke-width', 0.5)
    .attr('opacity', 0.4);

  // X axis
  svg
    .append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x).tickFormat(d3.format('d')).ticks(6).tickSize(0))
    .call((g) => g.select('.domain').attr('stroke', '#E8D5A3'))
    .selectAll('text')
    .attr('font-size', '10px')
    .attr('font-family', 'Inter, sans-serif')
    .attr('fill', '#5A5A5A');

  // Y axis
  svg
    .append('g')
    .call(d3.axisLeft(y).ticks(4).tickFormat((d) => `${d}%`).tickSize(0))
    .call((g) => g.select('.domain').remove())
    .selectAll('text')
    .attr('font-size', '10px')
    .attr('font-family', 'Inter, sans-serif')
    .attr('fill', '#5A5A5A');

  // Gradient for area
  const defs = svg.append('defs');
  const areaGradient = defs.append('linearGradient')
    .attr('id', 'areaGrad')
    .attr('x1', '0%').attr('y1', '0%')
    .attr('x2', '0%').attr('y2', '100%');
  areaGradient.append('stop').attr('offset', '0%').attr('stop-color', '#2E6B62').attr('stop-opacity', 0.3);
  areaGradient.append('stop').attr('offset', '100%').attr('stop-color', '#2E6B62').attr('stop-opacity', 0.02);

  // Area
  const area = d3
    .area()
    .x((d) => x(d.year))
    .y0(height)
    .y1((d) => y(d.percentage))
    .curve(d3.curveMonotoneX);

  svg
    .append('path')
    .datum(data)
    .attr('d', area)
    .attr('fill', 'url(#areaGrad)')
    .attr('opacity', 0);

  // Line
  const line = d3
    .line()
    .x((d) => x(d.year))
    .y((d) => y(d.percentage))
    .curve(d3.curveMonotoneX);

  const linePath = svg
    .append('path')
    .datum(data)
    .attr('d', line)
    .attr('fill', 'none')
    .attr('stroke', '#2E6B62')
    .attr('stroke-width', 2.5)
    .attr('stroke-linecap', 'round');

  const lineLength = linePath.node().getTotalLength();
  linePath.attr('stroke-dasharray', lineLength).attr('stroke-dashoffset', lineLength);

  // Dots
  const dots = svg
    .selectAll('.dot')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', (d) => x(d.year))
    .attr('cy', (d) => y(d.percentage))
    .attr('r', 0)
    .attr('fill', '#2E6B62')
    .attr('stroke', 'white')
    .attr('stroke-width', 2);

  // Value labels
  const labels = svg
    .selectAll('.value-label')
    .data(data)
    .enter()
    .append('text')
    .attr('x', (d) => x(d.year))
    .attr('y', (d) => y(d.percentage) - 12)
    .attr('text-anchor', 'middle')
    .attr('font-size', '10px')
    .attr('font-family', 'Inter, sans-serif')
    .attr('font-weight', '600')
    .attr('fill', '#2E6B62')
    .attr('opacity', 0)
    .text((d) => `${d.percentage}%`);

  // Animate
  ScrollTrigger.create({
    trigger: container,
    start: 'top 80%',
    once: true,
    onEnter: () => {
      linePath
        .transition()
        .duration(1500)
        .ease(d3.easeQuadOut)
        .attr('stroke-dashoffset', 0);

      svg
        .select('path[fill="url(#areaGrad)"]')
        .transition()
        .duration(1500)
        .delay(500)
        .attr('opacity', 1);

      dots
        .transition()
        .duration(400)
        .delay((d, i) => 300 + i * 100)
        .attr('r', 4);

      labels
        .transition()
        .duration(400)
        .delay((d, i) => 500 + i * 100)
        .attr('opacity', 1);
    },
  });
}
