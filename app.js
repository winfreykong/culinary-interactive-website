function finalProject(){
    var filePath="data/feeding-america.csv";
    var filePath2 = "data/ethnic_recipes.csv";
    var filePath3 = "data/top100_ing.csv";
    var breadsweets = "data/breadsweets.json";
    var accompaniments = "data/accompaniments.json";
    var beverages = "data/beverages.json";
    var eggscheesedairy = "data/eggscheesedairy.json";
    var fruitvegbeans = "data/fruitvegbeans.json";
    var meatfishgame = "data/meatfishgame.json";
    var medhealth = "data/medhealth.json";
    var soups = "data/soups.json";
    var filePath4 = "data/ing_ranking.csv";
    var filePath5 = "data/countries.csv";

    plot0(filePath, filePath2);
    plot1(filePath);
    plot2(filePath);
    plot3(filePath3);
    plot4(breadsweets, accompaniments, beverages, eggscheesedairy, fruitvegbeans, meatfishgame, medhealth, soups);
    plot5(filePath,filePath3);
    plot6(filePath4);
    plot7(filePath2, filePath5);
}

var plot0=function(filePath, filePath2){
    d3.csv(filePath).then(function(data){
        console.log(data)
    });

    d3.csv(filePath2).then(function(data){
        console.log(data)
    })
}

var plot1=function(filePath){
    d3.csv(filePath).then(function(data){
        var data1 = Array.from(d3.rollup(data, v=>v.length, d=>d.date))
        console.log(data1)
        data1 = data1.sort(function(x, y){return d3.ascending(parseInt(x[0]), parseInt(y[0]))})
        var margin = 80
        var marginTop = 30
        var marginBottom = 50
        var height = 400 - marginBottom - marginTop
        var width = 800 - margin - margin
        
        var svg = d3.select("#plot1").append('svg')
        .attr("height", height + marginBottom + marginTop)
        .attr("width", width + margin + margin)
        .append("g")
        .attr("transform", `translate(${margin}, ${marginTop})`)

        var xScale = d3.scaleLinear()
        .domain([d3.min(data1, function(d){return parseInt(d[0])}), d3.max(data1, function(d){return parseInt(d[0])})])
        .nice()
        .range([0, width]);

        var yScale = d3.scaleLinear()
        .domain([0, d3.max(data1, function(d){return d[1]})])
        .range([height, 0])

        const xAxis = d3.axisBottom(xScale)
        const yAxis = d3.axisLeft(yScale)

        svg.append("g")
        .attr("class", "xAxis1")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis)

        svg.append("g")
        .attr("class", "yAxis1")
        .attr("transform", `translate(0, 0)`)
        .call(yAxis)

        svg.selectAll("circle").data(data1).enter().append('circle')
        .attr("cx", function(d){return xScale(parseInt(d[0]))})
        .attr("cy", function(d){return yScale(0)})
        .attr("r", 0)
        .attr("fill", "#55BAFF")

        const delay = 50
        svg.selectAll("circle")
        .transition()
        .duration(500)
        .attr("cy", function(d){return yScale(d[1])})
        .attr("r", 5)
        .delay(function(d, i){return (i*delay)})

        // Axes label
        var ypadding = 20
        var xpadding = 10
        var scaleFactor =2
        svg.append("text")
        .attr("class", "ylabel")
        .attr("text-anchor", "middle")
        .attr("transform", "translate("+(ypadding-margin)+","+(height/scaleFactor)+")rotate(-90)")
        .text("Number of Recipes")
        .style("font-size", 13)
        .style("font-weight", 300)
        .style("fill", "black") 

        svg.append("text")
        .attr("class", "xlabel")
        .attr("text-anchor", "middle")
        .attr("x", width/scaleFactor)
        .attr("y", height+marginBottom-xpadding)
        .text("Year")
        .style("font-size", 13)
        .style("font-weight", 200)
        .style("fill", "black") 


    })
}
//
var plot2=function(filePath){
    d3.csv(filePath).then(function(data){
        var data2 = Array.from(d3.rollup(data, v=>v.length, d=>d.recipe_class))
        console.log(data2)
        const total_recipe = d3.sum(data2, d=>d[1])
        console.log(total_recipe)
        // Getting the percentage of recipe type, instead of total count
        data2 = data2.map(function(d){return [d[0], d[1]/total_recipe*100]})
        console.log(data2)

        data2 = data2.sort(function(x,y){return d3.descending(x[1], y[1])})

        var types = data2.map(function(d){return d[0]})
        console.log(types)

        var margin = 80
        var marginBottom = 100
        var marginTop = 30
        var height = 920 - marginBottom - marginTop
        var width = 800 - margin - margin
        var svg = d3.select("#plot2").append('svg')
        .attr("height", (height + marginBottom + marginTop))
        .attr("width", width + margin + margin)
        .append("g")
        .attr("transform", `translate(${margin}, ${marginTop})`)

        var numRows = Math.floor(d3.max(data2, function(d){return d[1]}))+1

        var xScale = d3.scaleBand()
        .domain(types)
        .range([0, width])
        .padding(0.2);

        // var yScale = d3.scaleLinear()
        // .domain([0, d3.max(data2, function(d){return d[1]})])
        // .range([height, 0])

        const xAxis = d3.axisBottom(xScale).tickSize(0)
        // const yAxis = d3.axisLeft(yScale)

        svg.append("g")
        .attr("class", "xAxis2")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis)
        .selectAll('text')
        .attr("text-anchor", "end")
        .attr("transform", `rotate(-30)`)
        .attr("font-size", 13)
        

        // svg.append("g")
        // .attr("class", "yAxis")
        // .attr("transform", `translate(0, 0)`)
        // .call(yAxis)

        // svg.selectAll("rect").data(data2).enter().append('rect')
        // .attr("x", function(d){return xScale(d[0])})
        // .attr("y", function(d){return yScale(d[1])})
        // .attr("height", function(d){return height-yScale(d[1])})
        // .attr("width", xScale.bandwidth())
        // .attr("fill", "#55BAFF")

        var bread = svg.append("defs").append("g").attr("id", "breadsweets")

        bread.append('path')
        .attr("d", "M785.9,275.5c-12.3,0-24.2,1.3-35.8,3.3C724.6,164.1,622.4,78.2,500,78.2c-122.4,0-224.7,85.9-250.1,200.6c-11.7-2.1-23.6-3.3-35.8-3.3c-112.7,0-204,91.3-204,204c0,83.8,50.6,155.7,122.9,187.1l93.5,211.3H195c0,24.2,19.6,43.9,43.9,43.9h522.4c24.2,0,43.8-19.6,43.8-43.9h-31.5L867,666.6c72.3-31.3,123-103.3,123-187.1C990,366.8,898.6,275.5,785.9,275.5z M497.1,130.6c38.6,0,74.4,11.2,104.8,30.4c-22-8.4-45.7-13.2-70.6-13.2c-90.1,0-166,60.4-189.6,143h-38.4C320.8,199.6,400.9,130.6,497.1,130.6z M273.1,870.4l-83.4-188.5c8,1,16.1,1.6,24.3,1.6c42.7,0,82.2-13.1,114.9-35.6l5.8,222.5H273.1z M475.2,870.4h-86.3l-52.9-227.7c7.4-5.6,14.5-11.3,21.1-17.8c35.8,35.2,84.4,57.1,138.3,58.4L475.2,870.4z M611.1,870.4h-79.6l-20.1-187.5c51.2-2.8,97.3-24.2,131.6-58c6.6,6.5,13.7,12.3,21.1,17.8L611.1,870.4z M726.8,870.4h-61.6l5.8-222.5c32.7,22.4,72.2,35.6,114.9,35.6c8.2,0,16.3-0.6,24.3-1.6L726.8,870.4z")
        .attr("transform", "translate(0,-5) scale(0.028)")

        var meat = svg.select("defs").append("g").attr("id", "meatfishgame")

        meat.append("path")
        .attr("d", "M990,614.9c-3.3,31.4-5.7,61-9.6,90.3c-18.1,137.9-172.6,194.9-266.9,112.7c-90.7-79-191.7-103.9-307.9-85.1c-47,7.6-94.8,9.6-142.3,14.1c-64.8,6.1-125.8-4.5-181-40.9c-64.2-42.4-83.2-82.9-66.6-157.3c42.8-192.3,168-320.9,332-415.8c105.3-61,220.7-69.1,337.1-39.1c176,45.2,266,166.3,288.4,342C980.8,495.7,984.6,556.2,990,614.9z M954.6,625.3c-11.8-86.9-18.9-162.6-33.2-236.9c-13.9-72.2-45-138.8-107.1-182.4c-142.1-99.7-331.1-146.5-505.6-15.9C206.3,266.7,114.4,351.4,63.5,471.9c-40.7,96.2-23.7,139.7,72.5,177.7c91.8,36.2,187.3,50.3,283.1,17.8c101.2-34.4,193.9-27.6,281,38.3c23.2,17.6,51.2,29.7,78.5,40.8c53.7,21.9,107.7,18.2,143.8-28.9C942.9,690.9,946.2,651,954.6,625.3z")
        .attr("transform", "translate(0,-5) scale(0.03)")
        meat.append("path")
        .attr("d", "M895.4,860.4c-48.5,58.1-128.7,79.1-192.4,49.1c-33.7-15.8-65.6-35.7-97.2-55.4c-63.3-39.4-130.6-48.5-203.9-37.7c-69.6,10.3-140.8,21.8-210.4,17.8C99.8,829,33.6,761.4,19.8,673.9C103,784.2,217.1,776.2,332.1,766c56.4-5,113-7.5,169.4-13.3c51.8-5.3,96.2,10.8,137.2,40.6c21.9,15.9,44.4,30.9,66.2,46.9c52.4,38.7,108.1,52.7,170.1,24.4C880.4,862.2,887.1,862.1,895.4,860.4z")
        .attr("transform", "translate(0,-5) scale(0.03)")
        meat.append("path")
        .attr("d", "M926.4,580.9c0,18.6-1.5,36.8,0.3,54.6c8.2,84.8-71.5,114.6-129.1,93.8c-30-10.8-60.7-24-86-42.8c-92.1-68.4-190.3-76.2-296.6-41c-96.6,32-191.3,15.8-282.9-21.2c-66.8-27-79.7-59.3-54.5-128C120,380.5,204.9,299.2,298.8,224.3c149.3-119.1,303.7-115,464.4-26.4c85.5,47.1,124.4,124.3,141.3,214.9C914.8,468.3,919.3,525,926.4,580.9z M533.7,238.8c-65.4,0.1-112.7,20.6-151,62.3c-43.1,47-29.2,101.4,32.3,118.3c66.2,18.3,127.1,0.8,182.6-36.5c28.4-19.1,45.7-45.7,36.3-82.1c-9.6-37.1-38.6-52.7-72.8-60.3C550,238,538.1,239,533.7,238.8z")
        .attr("transform", "translate(0,-5) scale(0.03)")
        meat.append("path")
        .attr("d", "M464.4,367.9c-13.2-6.8-29-14.9-44.8-23c11.8-14.9,20.7-36.1,36.1-43.2c22.1-10.2,49.1-13.9,73.6-12.8c12.1,0.5,28.1,16.3,33.1,28.8c2.5,6.3-13.8,25.4-25.3,30.6C516.6,357.6,493.2,360.6,464.4,367.9z")
        .attr("transform", "translate(0,-5) scale(0.03)")

        var vege = svg.select("defs").append("g").attr("id", "fruitvegbeans")

        vege.append("path")
        .attr("d", "M4776.5,4994.4c-169.5-23.9-406.9-109.7-564.5-201.5c-167.5-99.7-420.9-347.1-502.7-492.7l-59.8-103.7l-217.4-8c-253.3-8-396.9-41.9-616.3-147.6c-207.4-99.7-387-237.4-522.6-398.9c-103.7-125.7-251.3-394.9-275.3-502.7l-12-51.9l165.6-12c572.5-43.9,1133-365,1350.4-771.9c59.8-113.7,105.7-219.4,93.8-219.4c-4,0-63.8,67.8-133.6,151.6c-237.4,283.2-556.5,494.7-875.6,580.4c-185.5,49.9-678.2,49.9-857.7,0c-422.9-115.7-785.9-412.9-977.4-801.8c-121.7-245.3-145.6-359-149.6-674.2l-4-275.3l-69.8-73.8C125,548.3-8.7-48.1,190.8-610.6c139.6-396.9,456.8-728,855.7-897.6c125.7-53.9,179.5-65.8,293.2-65.8c233.4,0,580.4,131.6,873.6,331.1c61.8,41.9,113.7,69.8,113.7,59.8c0-35.9-257.3-275.3-369-341.1c-135.6-81.8-389-175.5-528.6-193.5c-117.7-16-119.7-27.9-47.9-173.5C1587-2300,1988-2615.2,2420.8-2710.9c155.6-33.9,488.7-41.9,608.4-14c87.8,20,77.8,37.9,133.6-247.3c75.8-392.9,141.6-1087.1,141.6-1527.9c0-125.7,8-161.6,41.9-205.5c71.8-89.8,119.7-97.7,345.1-51.9c440.8,87.8,678.2,107.7,1238.7,107.7c564.5,0,871.7-25.9,1298.5-109.7c189.5-37.9,207.5-37.9,265.3-10c85.8,45.9,113.7,113.7,129.6,311.2c37.9,466.7,173.5,1368.3,253.3,1677.5c18,71.8,19.9,73.8,93.8,55.9c119.7-27.9,452.8-19.9,608.4,14c79.8,15.9,237.4,75.8,353,131.6c183.5,87.8,229.4,121.7,389,283.2c189.5,189.5,303.2,373,381,606.4c18,59.8,47.9,111.7,65.8,117.7c616.3,185.5,1035.2,666.2,1119,1288.5c57.9,\
        410.9-75.8,849.7-357.1,1184.8c-89.8,107.7-135.6,145.6-223.4,179.5c-165.6,65.8-418.9,93.7-630.3,67.8c-151.6-19.9-450.8-87.8-574.5-133.6c-31.9-12-29.9-6,10,25.9c281.2,223.4,728,303.2,1202.8,215.4l73.8-14v121.7c0,686.2-528.6,1328.4-1202.8,1464.1l-123.7,25.9l-41.9,163.6c-147.6,558.5-546.5,969.4-1097.1,1123c-193.5,55.8-518.6,59.8-746,10c-357-77.8-688.1-303.2-993.3-680.2c-81.8-101.7-79.8-79.8,6,99.7c83.8,177.5,281.2,392.9,470.7,520.6c141.6,93.7,395,211.4,512.6,235.4c35.9,8,63.8,27.9,63.8,43.9c0,43.9-273.3,309.2-408.9,396.9C5532.5,4960.5,5131.5,5046.2,4776.5,4994.4z M5360.9-419.1c27.9-10,33.9-53.9,33.9-307.2c2-261.3,23.9-588.4,53.9-771.9c15.9-99.7,97.7-167.6,201.4-167.6c77.8,0,103.7,14,265.3,149.6c229.4,191.5,420.9,400.9,544.6,586.4c51.9,79.8,95.7,153.6,95.7,161.6c0,8,127.7-29.9,285.2-83.8c155.6-51.9,299.2-95.7,319.2-95.7c18,0,33.9-4,33.9-8c0-6-49.9-79.8-111.7-165.6c-205.5-283.2-408.9-765.9-546.5-1294.5c-115.7-444.8-259.3-1290.5-291.2-1707.4c-8-93.8-20-181.5-25.9-193.5c-10-13.9-71.8-12-201.5,8c-656.2,99.7-1741.3,89.8-2255.9-19.9l-51.9-12l-14,285.2c-61.8,1278.6-353.1,2257.9-839.7,2828.4c-91.8,105.7-93.8,107.7-47.9,121.7c291.2,83.8,620.3,213.4,797.9,311.2c6,4,27.9-33.9,45.9-83.8c77.8-203.5,313.2-504.6,536.6-692.1c141.6-117.7,235.4-129.6,333.1-39.9c59.8,51.9,63.8,65.8,91.8,313.2c19.9,161.6,27.9,381,23.9,586.4l-6,327.1l349.1-12C5171.4-401.1,5343-411.1,5360.9-419.1z")
        .attr("transform", "translate(30,10) scale(0.0025) rotate(-180)")

        var acc = svg.select("defs").append("g").attr("id", "accompaniments")

        acc.append("path")
        .attr("d", "M891.9,253.9h-36.3v-51.6H794L748.8,10H741l-47.7,192.3h-54.5v51.6h-37.2c-7.9,0-14.4,6.6-14.4,14.8v705.5c0,8.1,6.5,14.8,14.4,14.8h290.4c7.9,0,14.4-6.6,14.4-14.8V268.7C906.3,260.5,899.8,253.9,891.9,253.9z M864.3,806.2c0,17.8-14.5,32.3-32.3,32.3H661.4c-17.8,0-32.3-14.5-32.3-32.3V564.6c0-17.8,14.5-32.3,32.3-32.3H832c17.8,0,32.3,14.5,32.3,32.3V806.2z")
        .attr("transform", "translate(0,-3) scale(0.025)")
        acc.append("path")
        .attr("d", "M545.4,557.1c-115.5-48.7-121.1-273.7-121.1-380.7l-197,0.1l0,0c2.2,188.1-35.9,320.7-133,380.8C74.8,1133.5,564.4,1135,545.4,557.1z M435.8,806.2c0,17.8-14.5,32.3-32.3,32.3H232.8c-17.8,0-32.3-14.5-32.3-32.3V564.6c0-17.8,14.5-32.3,32.3-32.3h170.6c17.8,0,32.3,14.5,32.3,32.3V806.2L435.8,806.2z")
        .attr("transform", "translate(0,-3) scale(0.025)")
        acc.append("path")
        .attr("d", "M193,63.7C194-7.2,461.6-4,460.6,63.7v61.2H193V63.7z")
        .attr("transform", "translate(0,-3) scale(0.025)")

        var dairy = svg.select("defs").append("g").attr("id", "eggscheesedairy")
        
        dairy.append("path")
        .attr("d", "M989.5,373.5c-3.7-4.4-6.2-10-10.1-14.2c-6.3,0.6,5.2-5.9-2-6.1c1.7-5.7-2.9-5.3-2-10.1c-10.2-3.9-17.6-10.8-26.4-16.2c-9.6-5.3-19.6-10.2-28.4-16.2c-22.5-7.2-40.6-18.8-64.9-24.3c-7.6-6.6-21.2-7.2-30.4-12.2c-12.6-2.3-19.9-9.9-34.5-10.1c-8.4-6.4-21.5-8.3-32.4-12.2c-3.9-3.6-10.6-4.3-16.2-6.1c-4.9-2.5-9.9-5-16.2-6.1c-4.1-3.6-9.1-3.9-14.2-6.1c-1.3-0.5-4.6-3.4-6.1-4c-4.4-1.9-12.4-4.5-16.2-6.1c-28.7-11.8-54.3-28.9-81.1-42.6c-28.7-17-57.9-30.8-87.2-44.6c-10.1-4.8-21.2-12.4-34.5-10.1c-3.8-0.5-4.5,2.3-8.1,2c-95,14.5-174.8,44.2-249.4,79.1c-19.6,7.5-34.9,19.2-54.7,26.4c-6,7.6-17.7,9.4-24.3,16.2c-9.6,4.6-19.8,8.6-26.4,16.2c-19.1,7.9-33.6,20.5-50.7,30.4c-8.1,5.4-14.3,12.8-24.3,16.2c-6.3,7.9-13.7,14.7-20.3,22.3c-0.9,13.1-0.8,19.2-4,32.4c-5.1,8.4-5.1,21.9-8.1,32.5c-2.8,24.9-5.7,49.7-6.1,77c-1.6,57,8.7,102.2,18.2,148c5,8.6,5.5,21.5,10.1,30.4c3.1,10.4,6.5,20.5,10.1,30.4c7.5,20.2,16.4,39,24.3,58.8c9.7,18,17.3,38.1,26.4,56.8c2.4,11.1,9.1,17.9,10.1,30.4c6.1,8.1,6.3,22.1,18.2,\
        24.3c-0.3,4.4,7.2,0.9,10.1,2c2.9-1.1,10.5,2.4,10.1-2h26.4c14,3.6,33.7,1.5,50.7,2c32.7,2.5,66,4.3,99.4,6.1c171.6,2.1,339.6,7.8,515,6.1c33.5-1.7,68.4,9.8,97.3,0c12.7-11.6,23.1-25.6,20.3-52.7c3-22,3-47,4-71c-2.1-7.4-6.3-12.6-12.2-16.2c-2.7-7.5-6.7-13.5-12.2-18.2c-5.2-15.1-15.2-25.3-16.2-44.6c-1.1-11.2,1.2-19.1,2-28.4c4-3.4,3.2-11.6,8.1-14.2c0.9-6.5,7.7-7.2,8.1-14.2c7.2-6.3,15.4-11.6,24.3-16.2c4.5-2.2,10.2-3.4,14.2-6.1c3.9-3.5,12.5-2.4,12.2-10.1C991,517.4,988.5,444.7,989.5,373.5z M407.6,184.9c16.6,10.4,31.7,22.3,50.7,30.4c7.2,6.4,16.1,10.9,26.4,14.2c5.3,5.4,22.5,9.4,28.4,2c-0.2-14.7-13-16.7-18.2-26.4c-17.4-8.2-32-19.4-48.7-28.4c6.3-4.5,16.1-5.5,26.4-6.1c23.9,8.6,35.1,29.8,66.9,30.4c4.5-0.3,0.9-8.6,2-12.2c29.3,18,58.7,35.9,89.2,52.7c14.4,9.3,33,14.3,46.6,24.3c17.4,5.6,33.7,12.3,48.7,20.3c36.5,10.9,70.7,24,105.4,36.5c18,5.6,35.5,11.8,50.7,20.3c9.8,1.7,16.4,6.5,24.3,10.1c6.2,5.3,18.5,4.5,20.3,14.2H618.4c-10.8-3.3-18.1-10.3-28.4-14.2c1.7-9.8,5.8-17.2,6.1-28.4c-2-6.1-6.1-10.1-12.2-12.2c-13.3,\
        2.2-15.2,15.9-20.3,26.4c-9.8-1.1-17-4.6-24.3-8.1c3.4-15.4,4-36.9-14.2-36.5c-13.7,1.8-9.4,21.7-12.2,34.5c-3.4,4-2.2,12.7-4,18.2c-2.7,4.8-0.9,14-4.1,18.2c-14.7-0.8-33,1.9-44.6-2c1.9-17.7,5.6-33.6,8.1-50.7c2.9-12.1,12.7-37.7,0-46.6c-13.2-1.8-12.9,10.1-20.3,14.2c-5.9,16.4-9.6,35-14.2,52.7c-5.5-10.1-16.1-15-22.3-24.3c2.5-17.7,5.4-35.1,8.1-52.7c5-3.5,21.8,4.4,26.4-4c-1.4-20.2-20.7-22.5-32.4-32.4c-7.3-3.5-14.3-7.4-20.3-12.2c-5.2-0.2-7.1-3.7-10.1-6.1c-3.9-0.9-8.7-0.7-8.1-6.1C384.9,190.7,396.7,188.3,407.6,184.9z M626.6,468.8C624.1,469,625.3,465.8,626.6,468.8c1.6,0.5,4,0.1,4,2c3.5-0.1,5.2,1.6,6.1,4c8.4-1.9,0.4,6.1,0,0c-2.8,0.1-4.4-0.9-6.1-2v-2C629,470.4,626.6,470.8,626.6,468.8z M620.5,414h101.4c3.7,6.2-4.4,15-6.1,22.3c-7.7,3.1-8.5,13.1-16.2,16.2C657.4,455.6,626.5,447.2,620.5,414z M557.6,365.4h-24.3c1.7-6.5,1.3-14.9,4-20.3C544.9,351.1,556.6,352.9,557.6,365.4z M431.9,363.4h-24.3c0.8-8.7-2-20.9,2-26.4c8.4,2.3,16,2.3,24.3,0C432.2,344.8,431.3,353.3,431.9,363.4z M360.9,221.4c3.3-0.6,3.5,1.9,6.1,2c10.6,9,\
        23.9,15.3,36.5,22.3c-3.3,7.5-6.9,14.7-10.1,22.3c-2.7,8.1-4,17.6-8.1,24.3c-12-7.6-24-15.3-34.5-24.3C353,251.3,356.6,236,360.9,221.4z M346.7,300.5c11.8,6.4,21.8,14.7,32.4,22.3c-0.8,14.7-2.7,28.4-6.1,40.6c-12.3,1.5-18.4-3.2-30.4-2C342.4,339.4,342.6,318,346.7,300.5z M308.2,217.4c6.5-2.3,12-5.6,20.3-6.1c1.7-3,5.1-4.4,10.1-4.1c-2,15.6-9.9,25.3-10.1,42.6c-10-0.1-12.3-8-20.3-10.1c-4.4-5-11.8-7.1-16.2-12.2C292.9,219.7,303.2,221.1,308.2,217.4z M283.9,255.9c3.3-0.6,3.5,1.9,6.1,2c9,9.3,22.2,14.3,30.4,24.3c-0.5,15.7-5,27.5-4.1,44.6c-6.2,3.7-11.8-7.7-18.2-10.1c-7.1-3.7-11.8-9.9-20.3-12.2C276.6,285.1,282.6,272.8,283.9,255.9z M273.8,337h6.1c3.2,6.9,13.9,6.3,18.2,12.2c6.7,2.8,17.4,1.5,16.2,12.2h-40.6V337z M241.3,247.8c6.1-4.7,12.4-9.3,22.3-10.1c3.3,5.2-3.7,14.3-4.1,22.3c-3.4,6.7-3.7,16.6-6.1,24.3c-9.4-0.8-13.9-6.3-18.2-12.2C236.5,263.2,240.5,257.1,241.3,247.8z M227.1,304.5c9.5,1.3,12.7,8.9,20.3,12.2v40.6c-7.8-0.3-8-8.2-14.2-10.1c-4-3.5-10.1-4.7-12.2-10.1C223.4,326.5,223.2,313.5,227.1,304.5z M188.6,272.1c10.4,\
        0.4,12.8,8.9,18.2,14.2c-3,11.2-5.6,22.8-8.1,34.5c-8.2-3.3-15.5-7.5-20.3-14.2C179.5,292.7,183.8,282.2,188.6,272.1z M172.4,332.9c10.4,5.8,25.7,6.8,24.3,24.3h-26.4C169.5,347.7,171,340.4,172.4,332.9z M133.8,335c0.1-8,1-15.2,4.1-20.3v-6.1h6.1c4.7,7.3,0,19.4-2,26.4c-1.3,5.5,2.6,16.1-2,18.2h-4C127.3,353.3,133.4,338.7,133.8,335z M99.4,326.9c6.1,5-1.5,13.2,0,20.3c-7.9-0.2-12.6-3.6-18.2-6.1C84.6,333.7,94.1,332.4,99.4,326.9z M66.9,598.6c1.1-3.1,2.1-0.1,2,2C67.9,603.7,66.8,600.7,66.9,598.6z M73,582.3c0.4-2.3,2-1.1,2,0C74.6,584.6,73,583.5,73,582.3z M930.7,568.1c-39.8,10.3-66.1,34-93.3,56.8c-4.3,8.6-11.1,14.6-16.2,22.3c-3.7,15.1-6.8,27.8-4.1,44.6c14.1,36.6,36.7,64.7,77,75h30.4c-4.4,18.5-2,44-8.1,60.8c-134.5-8.8-285.6-1-423.8-6.1c2.6-15,11.3-23.9,14.2-38.5c5.9-10.2,12-27.6,0-34.5c-12.7-1.2-16.9,6.1-20.3,14.2c-7.6,3.2-6.1,15.5-12.2,20.3c-2.1,8.7-5.1,16.6-10.1,22.3c0.5,11.4-3.4,18.2-16.2,16.2c-4.5-9.3,8.3-16.8,10.1-26.4c4.5-9,13-14.1,12.2-28.4c-0.7-7.4-6.9-9.3-12.2-12.2c-18.5,1.8-20.4,20.1-28.4,32.4c-10.5,9.8-10.1,\
        30.5-26.4,34.5c-5.8-6.8,5.6-9.4,6.1-16.2c5.5-4.3,0.2-14.9-2-18.2c-13-1.5-20.5,2.5-24.3,10.1c-2.4,3.7-5.3,6.9-8.1,10.1c-1.9,3.6-0.7,10.1-4.1,12.2c-68.3,7.2-143-4.4-210.9,2c0.8-10.7,9-14,10.1-24.3c5.4-5.4,6.4-15.2,8.1-24.3c-3-6.5-4-14.9-14.2-14.2c-18.3,0.6-16.9,21-18.2,38.5c-7.7,0.9-2.9-10.6-8.1-12.2c0.2-5.8-1.1-13.3,2-16.2c1.7-11.2,6.7-19,8.1-30.4c4.7-8.1,6.8-18.9,8.1-30.4c5.8-7.1,4.9-21.6-4.1-24.3c-13.9-0.4-16.1,10.9-20.3,20.3c-7.2,6.3-9.5,17.5-14.2,26.4c-5.1-4,1.1-13.6,2-18.2c0.8-7.3,2.6-13.6,4.1-20.3c3.2-12.3,6.4-24.7,10.1-36.5c2.6-12.9,6.8-24.3,10.1-36.5c3.6-10.3,8.1-30.3-4.1-34.5c-7.6-2.2-7.9,5.1-10.1,8.1c-2.4,3.2-6.3,5.8-6.1,10.1c-6.4,5.1-9.1,13.9-12.2,22.3c-9,14-11.6,34.4-18.2,50.7c-12.7-9.2-0.4-26.6,0-40.6c5.7-11.9,6.5-28.6,12.2-40.6c1.9-15.7,8.1-27.1,10.1-42.6c2.5-13.9,11-30.8-2-38.5c-16.2,0.7-17.7,16.1-24.3,26.4c-4.4,11.8-10,22.4-12.2,36.5c-3.3,1.5-3.3-9.6,0-8.1c1.1-3-2.4-10.5,2-10.1c-0.2-7.6,0.9-14,4.1-18.2c0.2-14.7,3.6-26.1,6.1-38.5c1-14.5,4.6-26.5,6.1-40.6c6.1-9.7,4.4-26.6-8.1-28.4c-19.3,\
        1-16.6,24-22.3,38.5c-4.6,15-8.2,31-12.2,46.6c-4.6-2.2-0.8-12.7-2-18.2c-3.1-3-1.8-10.4-2-16.2v-38.5c-1.6-7,3-7.8,2-14.2c-0.4-19.4,0-37.8,2-54.8v-6.1c22,10.6,47.2,20.9,77,26.4c40.6,7.5,89.3,9.1,139.9,10.1c100.7,5.4,208,4.3,310.2,8.1c3.6,3.4-1.8,6.8,0,14.2v18.2c4.9,29.6,22.4,46.5,42.6,60.8c14.6,3.7,34.3,5.9,50.7,2c38.6-18.9,72-42.9,77.1-95.3c71-1.3,149.4,4.7,206.8-10.1c1.2,54.2-2.5,113.3,2,164.2L930.7,568.1L930.7,568.1z M914.5,730.4c-6.9-0.6-11.7-3.2-20.3-2c-20.7-11.8-39-25.9-44.6-52.7c2.9-31.6,29.8-39.1,46.6-56.8c2.4-0.3,3.6,0.4,4,2c-3.8,8.4-5.2,19.2-8.1,28.4v20.3C894,695.4,906,711.1,914.5,730.4z M679.3,339c5.5,3.2,10.2,5.9,14.2,8.1c5.7,3.1,13.8,7,18.2,8.1c7.4,1.9,11.1,2.2,18.2,2c5.2-7.1-5.7-12.3-8.1-18.2c-6.8-3.3-12.1-8.2-18.2-12.2c-14.3-6.7-25.6-16.3-40.6-22.3c-11.9-8.4-23.7-16.9-38.5-22.3c-10.4-10.6-27.8-14.1-40.6-22.3h-6.1v8.1c20,19.9,43,36.7,68.9,50.7C657.1,326.2,670.4,333.9,679.3,339z M458.3,489.1c-4-8.1-8.1-16.2-12.2-24.3c-7.2-7-15-13.4-22.3-20.3c-15.5-4.8-33-7.5-54.8-6.1c-1.2,0.1-2.4,0.3-2,\
        2c-10.4-1.6-13.3,4.3-22.3,4c-4.2,4.6-10.4,7.2-16.2,10.1c-1.7,7.7-11.4,7.5-18.2,10.1c-4.3,11.2-12.7,18.4-18.2,28.4c-6.3,19.2-5.3,43.8-2,56.8c0.6,2.6,1.6,4.3,2,6.1c1.4,5.7,6,9.8,6.1,12.2c0.1,2.3,1.3,0.9,2,2c4.7,7.2,9.5,13,14.2,18.2c16.5,7.8,33.3,15.3,58.8,14.2c42.6-4.1,66.3-27,83.1-56.8c4.3-13.9,4.6-31.9,4.1-50.7C457.9,494.8,458.1,492,458.3,489.1z M328.5,497.2C328.7,499.6,325.5,498.4,328.5,497.2c-1-6.4,5.5-5.4,6.1-10.1C340.1,490.1,331.1,495.5,328.5,497.2z M429.9,533.7c-9.9,13.8-23.4,24-38.5,32.4c-14.2-6.1-30.3-10.2-38.5-22.3c-2.1-19.6,3.2-31.9,8.1-44.6c13.4-9.6,26.3-19.7,44.6-24.3c14.2,2.7,19.4,14.3,26.4,24.3C432,511.4,432.5,524.2,429.9,533.7z M839.5,493.1c-6.3,2.7-11.2-6-14.2,0c-18-1.1-23.9,9.9-30.4,20.3c-1.7,13.9,2.8,21.6,8.1,28.4c18.7,9.4,39.5-1.9,48.7-14.2c3-11.8-0.7-18.3-4.1-28.4C842.5,499.6,841.2,496.1,839.5,493.1z M835.4,525.6c-4.9,6.5-19.7,8.5-26.4,2c-4.3-19.5,8.6-29.3,24.3-22.3C835.5,510.6,835.8,517.7,835.4,525.6z M223.1,531.7c20.2-18.2-14.3-51.6-26.4-26.4C200.1,519.4,203.2,534,223.1,531.7z M488.7,\
        511.4c-1.3,13.5,3.6,20.7,14.2,22.3c7.5-2.6,13.2-7.1,14.2-16.2C513.9,504.1,496.4,499.6,488.7,511.4z M588,566.1c3-2.4,5.7-5.1,8.1-8.1c3.6-19.8-19.5-32.6-28.4-16.2V556C573.3,560.5,575.5,568.5,588,566.1z M683.3,606.7c-5.3-0.8-11.1-1-14.2-4h-28.4c-1.2,0.1-2.4,0.3-2,2h-4c-22.9,9.3-41.1,32.8-48.7,54.8c-3.1,7-1.8,18.5-2,28.4c3.8,10.4,10.5,17.8,14.2,28.4c6,8.9,14.2,15.5,22.3,22.3c13.9,5.3,34.7,5.3,48.7,0c29.7-17.7,57.1-48.1,46.6-99.4C709.6,623.7,696.1,615.5,683.3,606.7z M654.9,706c-7.8-0.3-8-8.2-14.2-10.1c-2.8-5.3-8.5-7.7-10.1-14.2c-1.4-10.1,1.9-15.7,2-24.3c6.2-10,17.7-14.7,24.3-24.3c15,1.9,25.3,8.4,30.4,20.3C686.2,680.5,672.2,694.9,654.9,706z M340.7,661.4c-11.2-9.4-29.2-17.1-48.7-16.2c-1.2,0.1-2.4,0.4-2,2c-11.6-0.8-19.9,1.8-26.4,6.1c-9.4,1.4-13.7,7.9-22.3,10.1c-10.3,11.3-21.1,22.1-28.4,36.5c-3.6,39.4,9.9,61.8,30.4,77c12.4,1.8,22.5,5.9,36.5,6.1c9.8-1.7,18.8-4.2,28.4-6.1c18.6-11.1,32.7-26.8,42.6-46.6c3.5-17.6,2.7-41.5-2-56.8C343.6,672,343.6,665.2,340.7,661.4z M290,744.6c-7.5-0.6-7.6-8.6-12.2-12.2c-5.8-1.6-5.1-9.8-8.1-14.2c-0.8-9.6,\
        3.6-13.9,2-24.3c10.9-8.6,19.9-23.3,40.6-16.2c1.8,3.6,4.5,6.3,8.1,8.1c-0.2,2.9-0.3,5.7,2,6.1C323.7,721.5,310.6,736.8,290,744.6z M579.9,744.6c-13.4,2.2-11.2,19.9-12.2,34.5c5.7,6.5,9.4,15,22.3,14.2C617.8,787.8,608.2,743.2,579.9,744.6z M687.4,777c6.8,7.4,21.7,7.3,22.3-6.1C709.1,755.9,681.3,757.5,687.4,777z")
        .attr("transform", "translate(0,-3) scale(0.03)")

        var soup = svg.select("defs").append("g").attr("id", "soups")

        soup.append("path")
        .attr("d", "M269.7,990h411.6v-39.2H269.7V990z M518.9,406.9c22.1,0,157.5-98.8,16.2-217.9c-26.5-31.4-64-86.9-17.7-179C274.6,117.8,569.7,247.4,518.9,406.9z M409.1,485.3c14.8,0,105.6-65.9,10.9-145.3c-17.8-21-42.9-57.9-11.8-119.3C245.2,292.6,443.1,379,409.1,485.3z M98.7,691.1c-0.1,1.7-0.5,3.3-0.5,5c0,124.4,170,225.3,379.8,225.3c209.7,0,379.8-100.9,379.8-225.3c0-1.7-0.4-3.3-0.5-5H98.7z M931.4,137.4c-12.9,0-24.7,4.4-34.3,11.5c-183,150.1-308.8,341.3-308.8,341.3h81.1c0,0,83.3-115.4,270-233.8c28.6-4,50.7-28.8,50.7-59.1C990,164.2,963.7,137.4,931.4,137.4z M877,529.4H69.1c-32.6,0-59.1,26.3-59.1,58.8V647h926.1v-58.8C936.1,555.7,909.6,529.4,877,529.4z")
        .attr("transform", "translate(0,-7) scale(0.03)")

        var bev = svg.select("defs").append("g").attr("id", "beverages")

        bev.append("path")
        .attr("d", "M2102.6,4987.4C1513,4888,1002.5,4501.7,751.8,3964.1c-221.4-469.9-221.4-1055,0-1527.1c230.4-490.2,661.9-840.3,1222.1-989.4c176.2-47.4,623.5-52,750-9c128.8,42.9,183,176.2,126.5,302.7c-42.9,94.9-106.2,110.7-451.8,115.2c-388.5,6.8-517.3,45.2-786.1,225.9c-377.3,257.5-589.6,661.9-589.6,1120.5c0,375,133.3,698,395.3,960.1c273.3,275.6,582.8,402.1,971.4,402.1c397.6,0,718.4-142.3,994-438.2c74.5-81.3,173.9-219.1,221.4-309.5c92.6-176.2,131-207.8,248.5-207.8c131,0,212.3,108.4,196.5,259.8c-6.8,70-151.4,325.3-275.6,478.9C3394.8,4827,2708,5089.1,2102.6,4987.4z")
        .attr("transform", "translate(30,12)rotate(-180) scale(0.0023)")
        bev.append("path")
        .attr("d", "M7031.7,4969.3c-70-33.9-128.8-126.5-485.7-765.8l-406.6-727.4l-1960.8-6.8l-1963.1-6.8l-42.9-54.2c-29.4-36.1-42.9-88.1-42.9-171.7V3117l1457-2198l1457-2198v-1497.7v-1497.7h-817.8c-763.5,0-824.5-2.2-890-42.9c-142.3-85.8-155.9-277.9-29.4-399.8l67.8-65.5l1913.3-4.5c2060.2-6.8,1976.6-11.3,2069.2,113c81.3,108.4,40.7,314-72.3,370.5c-20.3,9-413.4,22.6-874.2,29.4l-835.8,11.3l-4.5,1479.6l-6.8,1479.6L7022.7,896.4c801.9,1210.8,1463.8,2227.4,1470.6,2263.5c15.8,79.1-27.1,205.6-85.8,259.8c-45.2,40.7-106.2,42.9-858.4,54.2l-811,11.3l280.1,497l280.1,497l975.9,6.8c942,4.5,978.1,6.8,1041.4,52c94.9,65.5,126.5,201,72.3,309.5c-79.1,164.9-70,162.6-1237.9,162.6C7205.7,5010,7104,5005.5,7031.7,4969.3z M5918.1,3096.6c-4.5-11.3-124.2-223.6-264.3-476.6l-255.3-456.3l-1106.9,4.5l-1106.9,6.8l-277.9,451.8c-151.3,248.5-277.8,458.6-277.8,469.9c-2.3,9,740.9,15.8,1649.1,15.8C5183.9,3112.5,5922.6,3105.7,5918.1,3096.6z M7680,2638.1l-298.2-474.4h-682.2c-377.2,0-684.5,6.8-684.5,13.6c0,18.1,469.9,865.2,503.8,908.1c15.8,20.3,192,27.1,738.7,27.1H7976L7680,2638.1z")
        .attr("transform", "translate(30,12)rotate(-180) scale(0.0023)")

        var med = svg.select("defs").append("g").attr("id", "medhealth")

        med.append("path")
        .attr("d", "M5606,4387.9c-404-55.5-806.1-217.9-1119-451.6C4332.5,3819.4,686.2,175.1,565.4,16.7C420.8-173.5,238.6-551.8,179.2-785.5c-130.7-515-99-1010.1,91.1-1495.4c227.8-576.4,726.9-1077.5,1305.2-1309.2c736.8-293.1,1538.9-209.9,2204.4,227.8c186.2,120.8,358.5,287.2,2085.6,2016.3C7881.8,670.2,7871.9,658.4,8040.2,1024.8c146.6,316.9,208,572.4,223.8,919c49.5,1162.6-768.5,2196.5-1913.3,2418.3C6158.6,4399.7,5784.3,4413.6,5606,4387.9z M6283.4,3876.9c342.6-71.3,633.8-223.8,891.3-465.4c267.4-251.5,427.8-509,534.8-857.6c47.5-158.4,53.5-204,53.5-501.1c2-362.4-17.8-475.3-136.7-756.6c-128.7-305-200-388.2-1182.4-1372.6l-926.9-930.9l-1327,1327l-1327,1327l917,917c503.1,505.1,968.5,956.6,1033.9,1004.2C5231.7,3867,5776.4,3981.8,6283.4,3876.9z M1963.7,272.2C1528-163.6,1155.6-524.1,1133.8-530c-49.5-11.9-211.9,134.7-211.9,194.1c0,27.7,249.6,291.2,796.2,837.8l798.2,798.2l118.8-118.8l118.8-118.8L1963.7,272.2z")
        .attr("transform", "translate(0,12) scale(0.0023)")
        med.append("path")
        .attr("d", "M8099.6,214.7c-19.8-29.7-445.6-465.4-946.7-970.5c-503.1-505.1-917-921-921-925c-3.9-5.9,818-9.9,1830.1-9.9h1838l-13.9,106.9c-17.8,150.5-101,427.8-180.2,602.1C9452.4-434.9,8951.3,12.7,8384.8,198.9C8145.2,276.1,8141.2,276.1,8099.6,214.7z")
        .attr("transform", "translate(0,12) scale(0.0023)")
        med.append("path")
        .attr("d", "M5608-2302.7l-136.7-136.7l23.8-95.1c37.6-144.6,150.5-408,239.6-556.5c520.9-857.6,1536.9-1269.6,2501.5-1016.1c713,188.2,1315.1,742.7,1552.8,1435.9c51.5,152.5,105,382.3,105,457.5v47.5H7818.4H5742.7L5608-2302.7z")
        .attr("transform", "translate(0,12) scale(0.0023)")

        var yScale = d3.scaleBand()
        .domain(d3.range(numRows))
        .range([height, 0])

        var grid = d3.range(numRows)

        console.log(grid)

        // ['breadsweets', 'meatfishgame', 'fruitvegbeans', 'accompaniments', 'eggscheesedairy', 'soups', 'beverages', 'medhealth']
        var colorScale = d3.scaleOrdinal()
        .domain(types)
        .range(['brown', 'pink', 'darkgreen', 'olive', 'orange', '#F9CB45', 'darkblue', 'red'])

        for (let i = 0; i<data2.length; i++){
            let type = data2[i][0]
            console.log(xScale(type))
            let percent = Math.floor(data2[i][1])
            svg.selectAll(`use${type}`)
                .data(grid)
                .enter()
                .append("use")
			    .attr("xlink:href", `#${type}`)
                .attr("x", xScale(type))
                .attr("y", function(d){return yScale(d)})
                //.attr("r", 12)
                .attr("fill", function(d){return d < percent ? colorScale(type):"white"})
        }

        // Axes label
        var ypadding = 20
        var xpadding = 90
        var scaleFactor =2
        svg.append("text")
        .attr("class", "ylabel")
        .attr("text-anchor", "middle")
        .attr("transform", "translate("+(ypadding-margin)+","+(height/scaleFactor)+")rotate(-90)")
        .text("Percentage of Recipe Type")
        .style("font-size", 13)
        .style("font-weight", 600)
        .style("fill", "black") 

        svg.append("text")
        .attr("class", "xlabel")
        .attr("text-anchor", "middle")
        .attr("x", width/scaleFactor)
        .attr("y", height+xpadding)
        .text("Recipe Type")
        .style("font-size", 13)
        .style("font-weight", 600)
        .style("fill", "black") 

        // Value labels
        var valuePadding = 30
        var padding = 20
        svg.selectAll("valueLabel")
        .data(data2)
        .enter()
        .append("text")
        .attr("class", "valueLabel")
        .text(function(d){return Math.floor(d[1])+"%"})
        .attr("x", function(d){return xScale(d[0])+valuePadding})
        .attr("y", function(d){
            return yScale(Math.floor(d[1]))+padding})
        .style("fill", "#0B456F")
    })
    
}

var plot3=function(filePath){
    d3.csv(filePath).then(function(data){
        var margin = 80
        var marginBottom = 50
        var marginTop = 50
        var height = 500 - marginBottom - marginTop
        var width = 800 - margin - margin
        var svg = d3.select("#plot3").append('svg')
        .attr("height", (height + marginBottom + marginTop))
        .attr("width", width + margin + margin)
        .append("g")
        .attr("transform", `translate(${margin}, ${marginTop})`)

        var rank = ["1-10", "11-20", "21-30", "31-40", "41-50", "51-60", "61-70", "71-80", "81-90", "91-100"]
        console.log(rank.indexOf("11-20"))
        // Dropdown button
        d3.select("#plot3_dropdown")
        .selectAll("plot3_options")
        .data(rank)
        .enter()
        .append("option")
        .text(function(d){return "Top "+d})
        .attr("value", function(d){return d})

        var start = 2
        var end = 12
        var top10 = data.columns.slice(start, end)
        console.log(top10)

        d3.select("#bin_description").append("text").text("This bin contains: " + top10)

        var xScale = d3.scaleLinear()
        .domain(d3.extent(data, function(d){return parseInt(d.date)}))
        .range([0, width])

        // xAxis
        var tickPadding = 5
        const xAxis = d3.axisBottom(xScale).tickSize(-height).tickValues([1803, 1820, 1840, 1860, 1880, 1900, 1922])

        svg.append("g")
        .attr("class", "xAxis3")
        .attr("transform", `translate(0, ${height+tickPadding})`)
        .call(xAxis)
        .select(".domain").remove()
        .selectAll('text')
        .attr("font-size", 13)

        svg.selectAll(".tick line").attr("stroke", "lightgray")

        // xAxis label
        var xpadding = 40
        var scaleFactor = 2
        svg.append("text")
        .attr("class", "xlabel")
        .attr("text-anchor", "middle")
        .attr("x", width/scaleFactor)
        .attr("y", height+xpadding)
        .text("Year")
        .style("font-size", 13)
        .style("font-weight", 400)
        .style("fill", "black") 

        var upper = d3.max(data, function(d){
            return d3.sum(Object.values(d).slice(start, end))
        })
        console.log(upper)
        var yScale = d3.scaleLinear()
        .domain([0, upper]).nice()
        .range([height, 0])

        // yAxis
        var yAxis = d3.axisLeft(yScale)

        svg.append("g")
        .attr("class", "yAxis3")
        .attr("transform", `translate(0, 0)`)
        .call(yAxis)
        .select(".domain")
        .attr("stroke", "lightgray")

        // yAxis label
        var ypadding = 10
        svg.append("text")
        .attr("class", "ylabel")
        .attr("text-anchor", "middle")
        .attr("transform", "translate("+(ypadding-margin)+","+(height/scaleFactor)+")rotate(-90)")
        .text("Total Number of Mentions")
        .style("font-size", 13)
        .style("font-weight", 400)
        .style("fill", "black") 

        svg.selectAll(".tick line").attr("stroke", "lightgray")

        var colorScale = d3.scaleOrdinal(d3.schemeSet3)
        .domain(top10)

        console.log(colorScale('salt'))

        var series = d3.stack().keys(top10).offset(d3.stackOffsetNone)
        var stack = series(data)
        console.log(stack)
        
        var Tooltip = d3.select("#plot3").append("div")
        .style("opacity", 0)
        .attr("class", "tooltip1")

        var mouseover = function(d){
            Tooltip.transition().duration(50).style('opacity', 1)
            d3.selectAll(".area")
            .style("opacity", .2)
            
            d3.select(this)
            .style("stroke", "black")
            .style("opacity", 1)
        }

        var mousePadding = 10
        var mousemove = function(event, d){
            console.log(event)
            var xPosition = event.layerX + mousePadding;
            var yPosition = event.layerY + mousePadding;
            let val = d.key
            console.log(val)
            d3.select(".tooltip1")
            .style("left", xPosition+'px')
            .style("top", yPosition+'px')
            .text(val)
        }

        var mouseleave = function(d){
            Tooltip.transition().duration(50).style("opacity", 0)
            d3.selectAll(".area")
            .style("opacity", 1)
            .style("stroke", "none")
        }

        svg.selectAll("streamgraphLayers")
        .data(stack).enter().append("path")
        .attr("class", "area")
        .style("fill", function(d){return colorScale(d.key)})
        .attr("d", d3.area()
                    .x(function(d){return xScale(parseInt(d.data.date))})
                    .y0(function(d){return yScale(d[0])})
                    .y1(function(d){return yScale(d[1])}))
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)

        var drop = d3.select("#plot3_dropdown").on("change", function(d){
            console.log(d)
            var curr_idx = rank.indexOf(d.target.value)
            // need to change start, end, colorScale.domain, series.keys, stack, streamgraphLayers
            var new_start = start + curr_idx*10
            var new_end = end + curr_idx*10
            top10 = data.columns.slice(new_start, new_end)
            console.log(top10)
            d3.select("#bin_description").text("This bin contains: " + top10)

            upper = d3.max(data, function(d){
                return d3.sum(Object.values(d).slice(new_start, new_end))
            })
            console.log(upper)
            yScale = yScale.domain([0, upper]).nice()
            yAxis = d3.axisLeft(yScale)
            d3.selectAll("g.yAxis3")
            .transition()
            .duration(1000)
            .call(yAxis)

            colorScale = colorScale.domain(top10)
            series = d3.stack().keys(top10).offset(d3.stackOffsetNone)
            stack = series(data)
            console.log(stack)

            console.log(d3.selectAll("streamgraphLayers.area"))
            d3.selectAll("path.area")
            .data(stack)
            .transition()
            .duration(1000)
            .style("fill", function(d){return colorScale(d.key)})
            .attr("d", d3.area()
                    .x(function(d){return xScale(parseInt(d.data.date))})
                    .y0(function(d){return yScale(d[0])})
                    .y1(function(d){return yScale(d[1])}))
            // .on("mouseover", mouseover)
            // .on("mousemove", mousemove)
            // .on("mouseleave", mouseleave)
        })

    })
}

var plot4=function(breadsweets, accompaniments, beverages, eggscheesedairy, fruitvegbeans, meatfishgame, medhealth, soups){
    Promise.all([
        d3.json(breadsweets),
        d3.json(accompaniments),
        d3.json(beverages),
        d3.json(eggscheesedairy),
        d3.json(fruitvegbeans),
        d3.json(meatfishgame),
        d3.json(medhealth),
        d3.json(soups)
    ]).then(function([bread, acc, bev, dairy, vege, meat, med, soup]){
        console.log(bread)
        console.log(acc)
        console.log(bev)
        console.log(dairy)
        console.log(vege)
        console.log(meat)
        console.log(med)
        console.log(soup)

        var name_map = {
            'bread': 'breadsweets',
            'acc': 'accompaniments', 
            'bev': 'beverages', 
            'dairy':'eggscheesedairy', 
            'vege':'fruitvegbeans', 
            'meat':'meatfishgame', 
            'med':'medhealth', 
            'soup':'soups'
        }

        var data_map = {
            'bread': bread,
            'acc': acc, 
            'bev': bev, 
            'dairy':dairy, 
            'vege':vege, 
            'meat':meat, 
            'med':med, 
            'soup':soup
        }

        var current = "bread"
        var curr_data = data_map[current]

        function addLinks(data){
            data['links'] = []
        
            for (let i = 0; i < data.edges.length; i++){
                var obj = {}
                obj['source'] = data.edges[i]['source'].id
                obj['target'] = data.edges[i]['target'].id
                obj['chem'] = data.edges[i]['chem']
                data.links.push(obj)
            }

            data['links'] = data['links'].sort(function(x, y){return d3.ascending(x.chem, y.chem)})
            return data
        }
        
        curr_data = addLinks(curr_data)

        var margin = 80
        var marginBottom = 10
        var marginTop = 10
        var height = 800 - marginBottom - marginTop
        var width = 800 - margin - margin
        var svg = d3.select("#plot4").append('svg')
        .attr("height", (height + marginBottom + marginTop))
        .attr("width", width + margin + margin)
        .append("g")
        .attr("transform", `translate(${margin}, ${marginTop})`)

        var minThickness = 1
        var maxThickness = 8
        var chemScale = d3.scaleLinear()
        .domain([d3.min(curr_data.links, function(d){return d.chem}), d3.max(curr_data.links, function(d){return d.chem})])
        .range([minThickness, maxThickness])

        var chemColor = d3.scaleSequential(d3.interpolatePurples)
        .domain([d3.min(curr_data.links, function(d){return d.chem}), d3.max(curr_data.links, function(d){return d.chem})])

        var links = svg.selectAll("line")
            .data(curr_data.links)
            
        links.enter()
            .append("line")
            .attr("stroke", function(d){return chemColor(d.chem)})
            .attr("stroke-width", function(d){return chemScale(d.chem)})

        var nodes = svg.selectAll("circle")
            .data(curr_data.nodes)

        nodes.enter()
            .append("circle")
            .style("fill", "#FEB379")

        var label = svg.selectAll("label")
            .data(curr_data.nodes)

        label.enter()
            .append("text")
            .attr("class", "nodeLabel")
            .text(function(d){return d.name})
            .style("fill", "black")
            .style("font-weight", 600)

        var centerScale = 2
        var force = d3.forceSimulation(curr_data.nodes)
            .force("charge", d3.forceManyBody().strength(-3000))
            .force("link", d3.forceLink(curr_data.links).id(function(d){return d.id}))
            .force("center", d3.forceCenter(width/centerScale, height/centerScale))

        force.on('tick', function(d){
                links
                .attr("x1", function(d){return d.source.x})
                .attr("y1", function(d){return d.source.y})
                .attr("x2", function(d){return d.target.x})
                .attr("y2", function(d){return d.target.y})

                nodes
                .attr("cx", function(d){return d.x})
                .attr("cy", function(d){return d.y})
                .attr("r", 20)

                label
                .attr("x", function(d){return d.x})
                .attr("y", function(d){return d.y})
                .attr("font-size", 13)
                .attr("stroke-width", 1000)
            })

        function update(data){
            chemScale = chemScale.domain([d3.min(data.links, function(d){return d.chem}), d3.max(data.links, function(d){return d.chem})])
            chemColor = chemColor.domain([d3.min(data.links, function(d){return d.chem}), d3.max(data.links, function(d){return d.chem})])

            links = svg.selectAll("line")
            .data(data.links)
            
            links
            .data(data.links)
            .enter()
            .append("line")
            .merge(links)
            .transition()
            .duration(100000)
            .attr("stroke", function(d){return chemColor(d.chem)})
            .attr("stroke-width", function(d){return chemScale(d.chem)})

            nodes = svg.selectAll("circle")
            .data(data.nodes)

            nodes.enter()
            .append("circle")
            .merge(nodes)
            .transition()
            .duration(100000)
            .style("fill", "#FEB379")

            label = svg.selectAll(".nodeLabel")
            .data(data.nodes)

            label.enter()
            .append("text")
            .merge(label)
            .transition()
            .duration(100000)
            .attr("class", "nodeLabel")
            .text(function(d){return d.name})
            .style("fill", "black")
            .style("font-weight", 600)

            force = d3.forceSimulation(data.nodes)
            .force("charge", d3.forceManyBody().strength(-3000))
            .force("link", d3.forceLink(data.links).id(function(d){return d.id}))
            .force("center", d3.forceCenter(width/centerScale, height/centerScale))

            force.on('tick', function(d){
                links
                .attr("x1", function(d){return d.source.x})
                .attr("y1", function(d){return d.source.y})
                .attr("x2", function(d){return d.target.x})
                .attr("y2", function(d){return d.target.y})

                nodes
                .attr("cx", function(d){return d.x})
                .attr("cy", function(d){return d.y})
                .attr("r", 20)

                label
                .attr("x", function(d){return d.x})
                .attr("y", function(d){return d.y})
                .attr("font-size", 13)
                .attr("stroke-width", 1000)
            })
        }

        update(curr_data)

        d3.select("#section4 #bin_description").text("Current selection is: " + name_map[current])
        var buttons = d3.select("#plot4_buttons")
        .on("click", function(d){
            console.log(d.target.value)
            current = d.target.value
            d3.select("#section4 #bin_description").text("Current selection is: " + name_map[current])

            curr_data = data_map[current]
            curr_data = addLinks(curr_data)

            console.log(curr_data)
            update(curr_data)

        })
        
    })

}

var plot5=function(master, filePath){
    var rowConverter = function(d){
        return{
            date: parseInt(d.date),
            sugar: parseFloat(d.sugar),
            molass: parseFloat(d.molass),
            yeast: parseFloat(d.yeast),
            "baking powder": parseFloat(d['baking powder']),
            tomato: parseFloat(d.tomato),
            celery: parseFloat(d.celery)
        }
    }
    Promise.all([
        d3.csv(filePath, rowConverter),
        d3.csv(master)
    ]).then(function([data, master]){
        console.log(data)
        var recipe_counts = Object.fromEntries(d3.rollup(master, v=>v.length, d=>d.date))
        console.log(recipe_counts)

        for (let i = 0; i<data.length; i++){
            let total = recipe_counts[data[i]['date']]
            data[i]['sugar'] =  data[i]['sugar']/total
            data[i]['molass'] =  data[i]['molass']/total
            data[i]['yeast'] =  data[i]['yeast']/total
            data[i]['baking powder'] =  data[i]['baking powder']/total
            data[i]['tomato'] =  data[i]['tomato']/total
            data[i]['celery'] =  data[i]['celery']/total
        }

        console.log(data)
        var group_map = {
            'Group1': ['sugar', 'molass'],
            'Group2': ['yeast', 'baking powder'],
            'Group3': ['tomato', 'celery']
        }
        var curr_group = 'Group2'
        var curr_pair = group_map[curr_group]
        console.log(curr_pair[0])

        var margin = 80
        var marginTop = 30
        var marginBottom = 50
        var height = 400 - marginBottom - marginTop
        var width = 800 - margin - margin
        
        var svg = d3.select("#plot5").append('svg')
        .attr("height", height + marginBottom + marginTop)
        .attr("width", width + margin + margin)
        .append("g")
        .attr("transform", `translate(${margin}, ${marginTop})`)

        var xScale = d3.scaleLinear()
        .domain([d3.min(data, function(d){return d.date}), d3.max(data, function(d){return d.date})])
        .nice()
        .range([0, width]);

        var yScale = d3.scaleLinear()
        .domain([0, d3.max(data, function(d){
            return d3.max([d[curr_pair[0]], d[curr_pair[1]]])})])
        .nice()
        .range([height, 0])

        const xAxis = d3.axisBottom(xScale)
        var yAxis = d3.axisLeft(yScale)

        svg.append("g")
        .attr("class", "xAxis5")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis)

        svg.append("g")
        .attr("class", "yAxis5")
        .attr("transform", `translate(0, 0)`)
        .call(yAxis)

        var colorScale = d3.scaleOrdinal(d3.schemeSet2)
        .domain(curr_pair)

        // Points Ingredient 1
        svg.selectAll("circle_ing1")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "circle_ing1")
        .attr("cx", function(d){return xScale(d.date)})
        .attr("cy", function(d){return yScale(d[curr_pair[0]])})
        .attr("r", 2)
        .style("fill", colorScale(curr_pair[0]))

        // Lines Ingredient 1
        svg.append("path")
        .attr("class", "line_ing1")
        .datum(data)
        .attr("d", d3.line()
                    .x(function(d){return xScale(d.date)})
                    .y(function(d){return yScale(d[curr_pair[0]])})
                    )
        .attr("stroke", colorScale(curr_pair[0]))
        .style("stroke-width", 2)
        .style("fill", "none");

        // Points Ingredient 2
        svg.selectAll("circle_ing2")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "circle_ing2")
        .attr("cx", function(d){return xScale(d.date)})
        .attr("cy", function(d){return yScale(d[curr_pair[1]])})
        .attr("r", 2)
        .style("fill", colorScale(curr_pair[1]))

        // Lines Ingredient 2
        svg.append("path")
        .attr("class", "line_ing2")
        .datum(data)
        .attr("d", d3.line()
                    .x(function(d){return xScale(d.date)})
                    .y(function(d){return yScale(d[curr_pair[1]])})
                    )
        .attr("stroke", colorScale(curr_pair[1]))
        .style("stroke-width", 2)
        .style("fill", "none");


        // Axes label
        var ypadding = 20
        var xpadding = 10
        var scaleFactor =2
        svg.append("text")
        .attr("class", "ylabel")
        .attr("text-anchor", "middle")
        .attr("transform", "translate("+(ypadding-margin)+","+(height/scaleFactor)+")rotate(-90)")
        .text("Fraction of Recipe in which the Ingredient Was Mentioned")
        .style("font-size", 12)
        .style("font-weight", 600)
        .style("fill", "black") 

        svg.append("text")
        .attr("class", "xlabel")
        .attr("text-anchor", "middle")
        .attr("x", width/scaleFactor)
        .attr("y", height+marginBottom-xpadding)
        .text("Year")
        .style("font-size", 13)
        .style("font-weight", 600)
        .style("fill", "black")

        // Legend
        var legendpadding = 100
        var legendsep = 30
        svg.selectAll("legendColor")
        .data(curr_pair)
        .enter()
        .append("circle")
            .attr("cx", width+margin-legendpadding)
            .attr("cy", function(d, i){return margin + i*legendsep})
            .attr("r", 6)
            .style("fill", function(d){return colorScale(d)})
        
        var labelpadding = 20
        svg.selectAll("legendLabel")
        .data(curr_pair)
        .enter()
        .append("text")
        .attr("class", "legendLabel")
            .attr("x", width+margin-legendpadding+labelpadding)
            .attr("y", function(d, i){return margin + i*legendsep})
            .text(function(d){return d})
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")
            .style("font-size", 13)

        d3.select("#section5 #bin_description").text("Current selection is: " + curr_group + " [" + curr_pair[0] + " vs " + curr_pair[1] + "]")
        var buttons = d3.select("#plot5_buttons")
        .on("click", function(d){
            console.log(d.target.value)
            curr_group = d.target.value
            console.log(curr_group)
            curr_pair = group_map[curr_group]
            d3.select("#section5 #bin_description").text("Current selection is: " + curr_group + " [" + curr_pair[0] + " vs " + curr_pair[1] + "]")
            
            // Update scales
            yScale = yScale
            .domain([0, d3.max(data, function(d){
                return d3.max([d[curr_pair[0]], d[curr_pair[1]]])})])
            .nice()

            yAxis = d3.axisLeft(yScale)
            d3.selectAll("g.yAxis5")
            .transition()
            .call(yAxis)

            colorScale = colorScale.domain(curr_pair)

            // Points Ingredient 1
            d3.selectAll("circle.circle_ing1")
            .data(data)
            .transition()
            .duration(1000)
            .attr("cx", function(d){return xScale(d.date)})
            .attr("cy", function(d){return yScale(d[curr_pair[0]])})

            // Lines Ingredient 1
            d3.selectAll('path.line_ing1')
            .datum(data)
            .transition()
            .duration(1000)
            .attr("d", d3.line()
                        .x(function(d){return xScale(d.date)})
                        .y(function(d){return yScale(d[curr_pair[0]])})
                        )
            .attr("stroke", colorScale(curr_pair[0]))

            // Points Ingredient 2
            d3.selectAll("circle.circle_ing2")
            .data(data)
            .transition()
            .duration(1000)
            .attr("cx", function(d){return xScale(d.date)})
            .attr("cy", function(d){return yScale(d[curr_pair[1]])})

            // Lines Ingredient 2
            d3.selectAll('path.line_ing2')
            .datum(data)
            .transition()
            .duration(1000)
            .attr("d", d3.line()
                        .x(function(d){return xScale(d.date)})
                        .y(function(d){return yScale(d[curr_pair[1]])})
                        )
            .attr("stroke", colorScale(curr_pair[1]))

            d3.selectAll("text.legendLabel")
            .data(curr_pair)
            .text(function(d){return d})
        })
    })


}

var plot6=function(filePath){
    var rowConverter = function(d){
        return {
            ingredient: d[""],
            ethnic: parseFloat(d.Ethnic),
            general: parseFloat(d.General)
        }
    }
    d3.csv(filePath, rowConverter).then(function(data){
        console.log(data)

        var margin = 80
        var marginTop = 30
        var marginBottom = 50
        var height = 500 - marginBottom - marginTop
        var width = 580 - margin - margin
        
        var svg = d3.select("#plot6").append('svg')
        .attr("height", height + marginBottom + marginTop)
        .attr("width", width + margin + margin)
        .append("g")
        .attr("transform", `translate(${margin}, ${marginTop})`)

        var xScale = d3.scaleLinear()
        .domain([0, d3.max(data, function(d){return d.general})])
        .nice()
        .range([0, width]);

        var yScale = d3.scaleLinear()
        .domain([0, d3.max(data, function(d){return d.ethnic})])
        .nice()
        .range([height, 0])

        var xAxis = d3.axisBottom(xScale)
        var yAxis = d3.axisLeft(yScale)

        svg
        .append("g")
        .attr("class", "xAxis6")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis)

        svg
        .append("g")
        .attr("class", "yAxis6")
        .attr("transform", `translate(0, 0)`)
        .call(yAxis)

        // Axes label
        var ypadding = 20
        var xpadding = 10
        var scaleFactor =2
        svg.append("text")
        .attr("class", "ylabel")
        .attr("text-anchor", "middle")
        .attr("transform", "translate("+(ypadding-margin)+","+(height/scaleFactor)+")rotate(-90)")
        .text("Ranking in Ethnic Recipe")
        .style("font-size", 12)
        .style("font-weight", 600)
        .style("fill", "black") 

        svg.append("text")
        .attr("class", "xlabel")
        .attr("text-anchor", "middle")
        .attr("x", width/scaleFactor)
        .attr("y", height+marginBottom-xpadding)
        .text("Ranking in Non-Ethnic Recipe")
        .style("font-size", 13)
        .style("font-weight", 600)
        .style("fill", "black")

        var colorScale = d3.scaleSequential(d3.interpolateRdBu)
        .domain([d3.min(data, function(d){return -(d.general-d.ethnic)}), d3.max(data, function(d){return -(d.general-d.ethnic)})])

        // Adding a clipPath
        var clip = svg
        .append("defs")
        .append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr("width", width)
        .attr("height", height)
        .attr("x", 0)
        .attr("y", 0)

        var Tooltip = d3.select("#plot6").append("div")
        .style("opacity", 0)
        .attr("class", "tooltip2")

        var mouseover = function(d){
            Tooltip.transition().duration(5).style('opacity', 1)
            d3.select(this)
            .style("stroke", "black")
            .style("opacity", 1)
        }

        var mousePadding = 10
        var mousemove = function(event, d){
            console.log(d)

            var xPosition = event.layerX + mousePadding;
            var yPosition = event.layerY + mousePadding;
            let val = d.ingredient
            d3.select(".tooltip2")
            .style("left", xPosition+'px')
            .style("top", yPosition+'px')
            .text(val)
        }

        var mouseleave = function(d){
            Tooltip.transition().duration(5).style("opacity", 0)
            d3.select(this)
            .style("stroke", "none")
        }

        var zoom = d3.zoom()
        .scaleExtent([0.5, 10])
        .extent([[0,0], [width, height]])
        .on("zoom", function(event){
            update(event)
        })

        svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .style("fill", "none")
        .style("pointer-events", "all")
        .attr("transform", `translate(${margin}, ${marginTop})`)
        .call(zoom);

        var g = svg.append("g")

        var scatter = g.append("g")
        .attr("clip-path", "url(#clip)")
        
        scatter
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "ing_ranking")
        .attr("cx", function(d){return xScale(d.general)})
        .attr("cy", function(d){return yScale(d.ethnic)})
        .attr("r", 7)
        .attr("fill", function(d){return colorScale(-(d.general-d.ethnic))})
        .style('opacity', 0.8)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseout", mouseleave)

        function update(e){
            var newX = e.transform.rescaleX(xScale)
            var newY = e.transform.rescaleY(yScale)

            yAxis = d3.axisLeft(newY)
            d3.selectAll("g.yAxis6")
            .call(yAxis)

            xAxis = d3.axisBottom(newX)
            d3.selectAll("g.xAxis6")
            .call(xAxis)

            scatter
            .selectAll("circle")
            .attr("cx", function(d){return newX(d.general)})
            .attr("cy", function(d){return newY(d.ethnic)})
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseout", mouseleave)
        }

        

    })


}

var plot7=function(filePath, filePath2){
    var rowConverter = function(d){
        return{
            recipe_id: d.recipe_id,
            ethnic: d.ethnicgroup
        }
    }
    var rowConverter2 = function(d){
        return{
            country: d.name,
            lat: parseFloat(d.latitude),
            long: parseFloat(d.longitude)
        }
    }
    Promise.all([
        d3.csv(filePath, rowConverter),
        d3.csv(filePath2, rowConverter2)
    ]).then(function([data, countries]){
        console.log(data)
        console.log(countries)
        // Here we define a list of ethnicity and its native country
        var native_country = {
            'mexican': 'Mexico',
            'portuguese': 'Portugal',
            'italian': 'Italy',
            'hungarian': 'Hungary',
            'polish': 'Poland',
            'russian': 'Russia',
            'slovenian': 'Slovenia',
            'armenian': 'Armenia',
            'syrian': 'Syria',
            'turkish': 'Turkey',
            'greek': 'Greece',
            'persian': 'Iran',
            'english': 'United Kingdom',
            'french': 'France',
            'alsatian': 'France',
            'german': 'Germany',
            'spanish': 'Spain',
            'brazilian': 'Brazil',
            'portugaise': 'Portugal',
            'portugal': 'Portugal',
            'swedish': 'Sweden',
            'cuban': 'Cuba',
            'danish': 'Denmark', 
            'egyptian': 'Egypt',
            'japanese': 'Japan',
            'scotch': 'United Kingdom', 
            'parisian': 'France',
            'londoner': 'United Kingdom',
            'belgian': 'Belgium',
            'norman': 'France',
            'pole': 'Poland',
            'hamburg': 'Germany',
            'boulogne': 'France',
            'austrian': 'Austria',
            'rouen': 'France',
            'genevan': 'Switzerland',
            'bavarian': 'Germany',
            'sicilian': 'Italy',
            'berlin': 'Germany',
            'montpellier': 'France',
            'coblentz': 'Germany',
            'tyrolian': 'Austria',
            'tyrolean': 'Austria',
            'swiss': 'Switzerland',
            'roumanian': 'Romania',
            'turkis': 'Turkey',
            'genoese': 'Italy',
            'irish': 'Ireland',
            'saxon': 'Germany', 
            'german-jewish': 'Germany',
            'indian': 'India',
            'norwegian': 'Norway',
            'milanese': 'Italy',
            'spanish/mexican': 'Mexico',
            'american': 'United States',
            'bremen': 'Germany',
            'germany': 'Germany',
            'saxony': 'Germany',
            'vienna': 'Austria',
            'dutch': 'Netherlands',
            'frnch': 'France',
            'hispanic/mexican': 'Mexico',
            'scottish': 'United Kingdom',
            'brittany': 'France',
            'venetian': 'Italy',
            'mirabeau': 'France',
            'neapolitan': 'Italy', 
            'russia': 'Russia',
            'chinese': 'China', 
            'france': 'France', 
            'circassian': 'Russia', 
            'puerto rican': 'Puerto Rico'
        }

        var data6 = Array.from(d3.rollup(data, v=>v.length, d=>d.ethnic))
        console.log(data6)
        var country_count = []
        for(let i=0; i<data6.length; i++){
            if (data6[i][0] in native_country){
                country_count.push({
                    country: native_country[data6[i][0]],
                    count: data6[i][1]
                })
            }
        }
        country_count = Array.from(d3.rollup(country_count, v=>d3.sum(v, d=>d.count), d=>d.country))
        console.log(country_count)
        var country_position = {}
        for(let i = 0; i<countries.length; i++){
            country_position[countries[i]['country']] = [countries[i]['long'], countries[i]['lat']]
        }
        console.log(country_position)

        var margin = 80
        var marginTop = 30
        var marginBottom = 80
        var height = 600 - marginBottom - marginTop
        var width = 1200 - margin - margin
        
        var svg = d3.select("#plot7").append('svg')
        .attr("height", height + marginBottom + marginTop)
        .attr("width", width + margin + margin)
        .append("g")
        .attr("transform", `translate(${margin}, ${marginTop})`)

        var scaleFactor = 2
        const projection = d3.geoNaturalEarth1().scale(200).translate([width/scaleFactor, height/scaleFactor])

        var minR = 5
        var maxR = 20
        var radiusScale = d3.scaleLinear()
        .domain([0, d3.max(country_count, function(d){return d[1]})])
        .nice()
        .range([minR, maxR])

        var colorScale = d3.scaleSequential(d3.interpolateYlOrRd)
        .domain([d3.min(country_count, function(d){return d[1]}), d3.max(country_count, function(d){return d[1]})])
        .nice()

        var Tooltip = d3.select("#plot7").append("div")
        .style("opacity", 0)
        .attr("class", "tooltip3")

        var mouseover = function(d){
            Tooltip.transition().duration(5).style('opacity', 1)
            d3.selectAll(".points")
            .style("opacity", .2)

            d3.select(this)
            .style("stroke", "black")
            .style("opacity", 1)
        }

        var mousePadding = 10
        var mousemove = function(event, d){
            console.log(d)

            var xPosition = event.layerX + mousePadding;
            var yPosition = event.layerY + mousePadding;
            let country = d[0]
            let count = d[1]
            d3.select(".tooltip3")
            .style("left", xPosition+'px')
            .style("top", yPosition+'px')
            .html(`Country: ${country}`+ "<br/>"+`Number of Recipes: ${count}`)
        }

        var mouseleave = function(d){
            Tooltip.transition().duration(5).style("opacity", 0)
            d3.selectAll(".points")
            .style("opacity", .9)
        }

        const worldmap = d3.json("data/world.json")
        worldmap.then(function(map){
            var path = d3.geoPath().projection(projection)
            svg.selectAll("path").data(map.features).enter().append("path")
            .attr('d', path)
            .style("fill", "darkblue")
            .style("stroke", "white")
            .style("stroke-opacity", 0.5)

            svg.append("g")
            .selectAll("circle")
            .data(country_count)
            .enter()
            .append("circle")
            .attr("class", "points")
            .attr("cx", function(d){
                console.log(d[0])
                return projection(country_position[d[0]])[0]
            })
            .attr("cy", function(d){
                return projection(country_position[d[0]])[1]
            })
            .attr("r", function(d){return radiusScale(d[1])})
            .style("fill",function(d){return colorScale(d[1])})
            .style("opacity", 0.9)
            .style("stroke", "darkblue")
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseout", mouseleave)
        })

        svg.append("g")
        .attr("class", "sizeLegend")
        .attr("transform", "translate("+0+","+ (height-marginBottom)+")")

        var cells = [0, 200, 400, 500, 700]
        var sizeLegend = d3.legendSize().scale(radiusScale)
        .cells(cells)
        .shape("circle")
        .shapePadding(20)
        .labelOffset(20)
        .labelFormat(",.1r")
        .orient("horizontal")
        .title("Number of Recipes as Size")

        svg.select(".sizeLegend").call(sizeLegend);

        svg.selectAll(".swatch")
        .attr("fill", function(d){return colorScale(d)})
        .attr("stroke", "black")
        .attr("opacity", 0.9)

    })


}
