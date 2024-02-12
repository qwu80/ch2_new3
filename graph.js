d3onload = () => {

  heightD3 = 400,
    widthD3 = 500;

  svg = d3.selectAll('#d3-viz')
    .attr('height', heightD3)
    .attr('width', widthD3)
    .attr('transform', 'translate(-60,0)');

  // svg.append('rect')
  //   .attr('width', '100%')
  //   .attr('height', '100%')
  //   .attr('fill', 'pink');


  xScale = d3.scaleLinear()
    .domain([1, 3])
    .range([60, widthD3 - 30]);

  barScale = d3.scaleLinear()
    .domain([1, 3])
    .range([widthD3 / 4, 3 * widthD3 / 4]);

  yScale = d3.scaleLinear()
    .domain([0, 200000])
    .range([heightD3 - 60, 30]);

  barYScale = d3.scaleLinear()
    .domain([0, 80])
    .range([0, heightD3 / 2]);

  let xAxis = d3.axisBottom()
    .scale(xScale)
    .tickValues([]);

  let yAxis = d3.axisLeft()
    .scale(yScale)
    .tickValues([]);

  svg.append('g')
    .call(xAxis)
    .attr('transform', `translate(0,${heightD3/2})`)
    .attr('class', 'axis');

  svg.append("text")
    .attr("transform",
      "translate(" + (widthD3 / 4) + " ," +
      (heightD3 - 30) + ")")
    .attr('class', 'label')
    .style("text-anchor", "middle")
    .text("Potential Energy");

  svg.append("text")
    .attr("transform",
      "translate(" + (widthD3 / 2) + " ," +
      (heightD3 - 30) + ")")
    .attr('class', 'label')
    .style("text-anchor", "middle")
    .text("Kinetic Energy");

  svg.append("text")
    .attr("transform",
      "translate(" + 3 * (widthD3 / 4) + " ," +
      (heightD3 - 30) + ")")
    .attr('class', 'label')
    .style("text-anchor", "middle")
    .text("Total Energy");

  svg.append('g')
    .call(yAxis)
    .attr('transform', `translate(58,0)`)
    .attr('class', 'axis');

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 30)
    .attr("x", 0 - (heightD3 / 2))
    .attr("dy", "1em")
    .attr('class', 'label')
    .style("text-anchor", "middle")
    .text("Energy");
}

drawEnergies = (energies) => {
  svg.selectAll('.bars')
    .data(energies)
    .enter()
    .append('rect')
    .attr('class', 'bars')
    .attr('x', d => barScale(d.type))
    .attr('y', d => {
      if (d.value > 0) {
        return (heightD3 / 2 - barYScale(d.value));
      } else {
        return heightD3 / 2;
      }
    })
    .attr('height', d => {
      // if (d.value > 0) {
      //   yScale(d.value);
      // } else {
      //   yScale(-d.value);
      // }

      return barYScale(Math.abs(d.value));
    })
    .attr('width', 30)
    .attr('fill', 'white');

  svg.selectAll('.bars')
    .data(energies)
    .attr('x', d => barScale(d.type))
    .attr('y', d => {
      if (d.value > 0) {
        return (heightD3 / 2 - barYScale(d.value));
      } else {
        return heightD3 / 2;
      }
    })
    .attr('height', d => {
      // if (d.value > 0) {
      //   yScale(d.value);
      // } else {
      //   yScale(-d.value);
      // }

      return barYScale(Math.abs(d.value));
    })
    .attr('width', 30)
    .attr('fill', 'white');

  // svg.selectAll('.value-label')
  //   .data(energies)
  //   .attr('y', d => {
  //     if (d.value > 0) {
  //       return (heightD3 / 2 - barYScale(d.value)) - 10;
  //     } else {
  //       return heightD3 / 2 + barYScale(d.value) + 10;
  //     }
  //   })
  //   .text(d => `${d.value} eV`);

  svg.selectAll('.values')
    .data(energies)
    .enter()
    .append('text')
    .attr('class', 'values')
    .attr('x', d => barScale(d.type))
    .attr('y', d => {
      if (d.value > 0) {
        return (heightD3 / 2 - barYScale(d.value)) - 10;
      } else {
        return (heightD3 / 2 + barYScale(d.value)) + 10;
      }
    })
    .attr('fill', 'white')
    .text(d => `${(d.value/10).toFixed(1)} eV`);

  svg.selectAll('.values')
    .data(energies)
    .attr('y', d => {
      if (d.value > 0) {
        return (heightD3 / 2 - barYScale(d.value)) - 10;
      } else {
        return (heightD3 / 2 + barYScale(d.value)) + 10;
      }
    })
    .text(d => `${(d.value).toFixed(1)} eV`);
}

potentialEnergyGraph = (p5width, currpos) => {

  let dataset = [];

  for (i = -p5width / 3; i <= p5width / 3; i++) {
    dataset.push({
      x: i,
      y: 2000000 / ((p5width / 3 + i + 1) * (p5width / 3 + i + 1))
    });
  }


  // console.table(areaDataSet);

  heightD3 = 400,
    widthD3 = 500;

  svgpe = d3.selectAll('#pe-viz')
    .attr('height', heightD3)
    .attr('width', widthD3)
    .attr('transform', 'translate(-60,0)');

  // svgpe.append('rect')
  //   .attr('width', '100%')
  //   .attr('height', '100%')
  //   .attr('fill', 'pink');

  xScale = d3.scaleLinear()
    .domain([-p5width / 3, p5width / 3])
    .range([30, widthD3 - 30]);

  yScale = d3.scaleLinear()
    .domain([200, 0])
    .range([heightD3 - 60, 30]);

  let xAxis = d3.axisTop()
    .scale(xScale)
    .tickValues([]);

  let yAxis = d3.axisLeft()
    .scale(yScale)
    .tickValues([]);

  svgpe.append('path')
    .attr('id', 'area');

  svgpe.append('g')
    .call(xAxis)
    .attr('transform', `translate(0,${yScale(0)})`)
    .attr('class', 'axis');

  svgpe.append('g')
    .call(yAxis)
    .attr('transform', `translate(${widthD3/2},0)`)
    .attr('class', 'axis');

  svgpe.append("text")
    .attr("transform",
      "translate(" + (widthD3 / 2) + " ," +
      (heightD3 - 30) + ")")
    .attr('class', 'label')
    .style("text-anchor", "middle")
    .text("Displacement from Reference Point");

  svgpe.selectAll('.pe-circle')
    .data(dataset)
    .enter()
    .append('circle')
    .attr('class', 'pe-circle')
    .attr('cx', d => xScale(d.x))
    .attr('cy', d => yScale(d.y))
    .attr('r', 1)
    .attr('fill', 'white');

  svgpe.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 30)
    .attr("x", 0 - (heightD3 / 2))
    .attr("dy", "1em")
    .attr('class', 'label')
    .style("text-anchor", "middle")
    .text("External force");

  svgpe.append('rect')
    .attr('width', 16)
    .attr('height', 16)
    .attr('transform', `translate(${widthD3 - 180}, ${heightD3 - 112})`)
    .attr('fill', "#FFF7AE");

  svgpe.append('text')
    .attr('transform', `translate(${widthD3 - 160}, ${heightD3 - 96})`)
    .attr('class', 'label')
    .text('Negative P.E.');

  svgpe.append('rect')
    .attr('width', 16)
    .attr('height', 16)
    .attr('transform', `translate(${widthD3 - 180}, ${heightD3 - 152})`)
    .attr('fill', "#6ECF7F");

  svgpe.append('text')
    .attr('transform', `translate(${widthD3 - 160}, ${heightD3 - 136})`)
    .attr('class', 'label')
    .text('Positive P.E.');
}

potentialChange = (p5width, currpos) => {
  let areaDataSet = [];

  if (currpos > 0) {
    for (let i = 0; i <= currpos; i++) {
      areaDataSet.push({
        x: i,
        y: 2000000 / ((p5width / 3 + i + 1) * (p5width / 3 + i + 1))
      });
    }
  } else {
    for (let i = currpos; i <= 0; i++) {
      areaDataSet.push({
        x: i,
        y: 2000000 / ((p5width / 3 + i + 1) * (p5width / 3 + i + 1))
      });
    }
  }

  svgpe.select('#area')
    .datum(areaDataSet)
    .attr('id', 'area')
    .attr("fill", d => {
      if (d[0].x < 0) {
        return '#FFF7AE';
      } else {
        return '#6ECF7F';
      }
    })
    // .attr("stroke", "#FFF7AE")
    .attr("stroke-width", 1.5)
    .attr("d", d3.area()
      .x(function (d) {
        return xScale(d.x)
      })
      .y0(yScale(0))
      .y1(function (d) {
        return yScale(d.y)
      })
    )
}

secondGraph = () => {
  heightD3 = 400,
    widthD3 = 500;

  svg = d3.selectAll('#sec-viz')
    .attr('height', heightD3)
    .attr('width', widthD3)
    .attr('transform', 'translate(-60,0)');

  // svg.append('rect')
  //   .attr('width', '100%')
  //   .attr('height', '100%')
  //   .attr('fill', 'pink');


  yScale = d3.scaleLinear()
    .domain([-13.60, 0])
    .range([heightD3 - 60, 30]);

  let xAxis = d3.axisBottom()
    .scale(xScale)
    .tickValues([]);

  let yAxis = d3.axisLeft()
    .scale(yScale)
    .tickValues([]);

  // svg.append('g')
  //   .call(xAxis)
  //   .attr('transform', `translate(0,0)`)
  //   .attr('class', 'axis');

  svg.append('line')
    // .attr('transform', `translate()`)
    .attr('stroke', 'white')
    .attr('x1', 58)
    .attr('y1', yScale(-1.51))
    .attr('x2', widthD3 - 58)
    .attr('y2', yScale(-1.51));

  svg.append('line')
    // .attr('transform', `translate()`)
    .attr('stroke', 'white')
    .attr('x1', 58)
    .attr('y1', yScale(-3.40))
    .attr('x2', widthD3 - 58)
    .attr('y2', yScale(-3.40));

  svg.append('line')
    // .attr('transform', `translate()`)
    .attr('stroke', 'white')
    .attr('x1', 58)
    .attr('y1', yScale(-13.60))
    .attr('x2', widthD3 - 58)
    .attr('y2', yScale(-13.60));

  svg.append("text")
    .attr("transform",
      `translate(${100},${(yScale(-13.60) - 10).toFixed(2)} )`)
    .attr('class', 'label')
    .style("text-anchor", "middle")
    .text("n = 1");

  svg.append("text")
    .attr("transform",
      `translate(${100},${(yScale(-3.40) - 10)} )`)
    .attr('class', 'label')
    .style("text-anchor", "middle")
    .text("n = 2");

  svg.append("text")
    .attr("transform",
      `translate(${100},${(yScale(-1.51) - 10)} )`)
    .attr('class', 'label')
    .style("text-anchor", "middle")
    .text("n = 3");

  svg.append("text")
    .attr("transform",
      `translate(${56},${(yScale(-13.60) - 10).toFixed(2)} )`)
    .attr('class', 'label')
    .style("text-anchor", "end")
    .text("-13.60eV");

  svg.append("text")
    .attr("transform",
      `translate(${56},${(yScale(-3.40) - 10)} )`)
    .attr('class', 'label')
    .style("text-anchor", "end")
    .text("-3.40eV");

  svg.append("text")
    .attr("transform",
      `translate(${56},${(yScale(-1.51) - 10)} )`)
    .attr('class', 'label')
    .style("text-anchor", "end")
    .text("-1.51eV");

  svg.append('rect')
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .attr('x', widthD3 / 2)
    .attr('y', yScale(-13.6) - 31)
    .attr('width', 30)
    .attr('height', 30);

  svg.append('rect')
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .attr('x', widthD3 / 2 - 45)
    .attr('y', yScale(-3.4) - 31)
    .attr('width', 30)
    .attr('height', 30);
  svg.append('rect')
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .attr('x', widthD3 / 2 - 15)
    .attr('y', yScale(-3.4) - 31)
    .attr('width', 30)
    .attr('height', 30);
  svg.append('rect')
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .attr('x', widthD3 / 2 + 15)
    .attr('y', yScale(-3.4) - 31)
    .attr('width', 30)
    .attr('height', 30);
  svg.append('rect')
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .attr('x', widthD3 / 2 + 45)
    .attr('y', yScale(-3.4) - 31)
    .attr('width', 30)
    .attr('height', 30);

  svg.append('rect')
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .attr('x', widthD3 / 2)
    .attr('y', yScale(-1.51) - 31)
    .attr('width', 30)
    .attr('height', 30);

  svg.append('rect')
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .attr('x', widthD3 / 2 + 30)
    .attr('y', yScale(-1.51) - 31)
    .attr('width', 30)
    .attr('height', 30);

  svg.append('rect')
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .attr('x', widthD3 / 2 - 30)
    .attr('y', yScale(-1.51) - 31)
    .attr('width', 30)
    .attr('height', 30);

  svg.append('rect')
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .attr('x', widthD3 / 2 + 60)
    .attr('y', yScale(-1.51) - 31)
    .attr('width', 30)
    .attr('height', 30);

  svg.append('rect')
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .attr('x', widthD3 / 2 - 60)
    .attr('y', yScale(-1.51) - 31)
    .attr('width', 30)
    .attr('height', 30);

  svg.append('rect')
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .attr('x', widthD3 / 2 + 90)
    .attr('y', yScale(-1.51) - 31)
    .attr('width', 30)
    .attr('height', 30);

  svg.append('rect')
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .attr('x', widthD3 / 2 - 90)
    .attr('y', yScale(-1.51) - 31)
    .attr('width', 30)
    .attr('height', 30);

  svg.append('rect')
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .attr('x', widthD3 / 2 + 120)
    .attr('y', yScale(-1.51) - 31)
    .attr('width', 30)
    .attr('height', 30);

  svg.append('rect')
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .attr('x', widthD3 / 2 - 120)
    .attr('y', yScale(-1.51) - 31)
    .attr('width', 30)
    .attr('height', 30);

  svg.append('line')
    .attr('id', 'electron')
    .attr('stroke', '#FFF7AE')
    .attr('stroke-width', '2px')
    .attr('x1', widthD3 / 2 + 15)
    .attr('x2', widthD3 / 2 + 15)
    .attr('y1', yScale(-13.6) - 25)
    .attr('y2', yScale(-13.6) - 5);

  svg.append('g')
    .call(yAxis)
    .attr('transform', `translate(58,0)`)
    .attr('class', 'axis');

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 30)
    .attr("x", 0 - (heightD3 / 2))
    .attr("dy", "1em")
    .attr('class', 'label')
    .style("text-anchor", "middle")
    .text("Energy");

  // svg.append('rect')
  //   .attr('id', 'energy-rect')
  //   .attr('x', widthD3 / 2)
  //   .attr('y', heightD3 / 2)
  //   .attr('width', 30)
  //   .attr('height', barYScale(50))
  //   .attr('fill', 'white');

  // svg.append('text')
  //   .attr('id', 'energy-text')
  //   .attr('x', widthD3 / 2)
  //   .attr('y', heightD3 / 2 + barYScale(50) + 20)
  //   .text('-13.6eV')
  //   .attr('fill', 'white');

}

changeD3 = (val) => {
  if (val == -1.51 && !con1) {
    let r = [-120, -90, -60, -30, 0, 30, 60, 90, 120];
    let i = Math.floor(Math.random() * r.length)
    x = widthD3 / 2 + 15 + r[i];
    con1 = true;
    con2 = false;
  } else if (val == -3.4 && !con2) {
    let r = [-45, -15, 15, 45];
    let i = Math.floor(Math.random() * r.length)
    x = widthD3 / 2 + 15 + r[i];
    con2 = true;
    con1 = false;
  } else if (val == -13.6) {
    x = widthD3 / 2 + 15;
    con1 = false;
    con2 = false;
  }

  svg.select('#electron')
    .transition()
    .duration(100)
    .attr('stroke', '#FFF7AE')
    .attr('stroke-width', '4px')
    .attr('x1', x)
    .attr('x2', x)
    .attr('y1', yScale(val) - 25)
    .attr('y2', yScale(val) - 5);
}