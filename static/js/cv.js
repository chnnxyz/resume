let w = 350;
let h = 350;
let r = w/3;
let cx = w/2;
let cy = h/2;
const svg = d3.select("#radarplot")
              .append("svg")
              .attr("width", w+"px")
              .attr("height", h+"px");
const chartgroup = svg.append("g")

const basegroup = chartgroup.append("g").attr("id","base");
const linegroup = chartgroup.append("g").attr("id","lines");
for(let i=1;i<6;i++){
    basegroup.append("circle")
    .attr("cx",cx + "px")
    .attr("cy",cy + "px")
    .attr("r", (i/5)*r+"px")
    .attr("fill","none")
    .attr("color","black")
    .attr("stroke","#9e9ea2");
}
for(let i=0;i<8;i++){
    basegroup.append("line")
             .attr("x1",cx)
             .attr("y1",cy)
             .attr("x2", cx + r*Math.cos(2*i*Math.PI/8))
             .attr("y2", cx + r*Math.sin(2*i*Math.PI/8))
             .attr("stroke","#9e9ea2")
}
const langs = [
    {"name":"Python", "val":5, "t": 0, "frameworks":"Tensorflow SciKit-Learn XGBoost LightGBM Numpy Pandas PyMongo SQLAlchemy Flask FBProphet PySpark"},
    {"name":"Java", "val":3, "t":2*Math.PI/8, "frameworks":"Groovy"},
    {"name":"HTML/CSS", "val":3, "t":4*Math.PI/8, "frameworks":"Bootstrap Materialize"},
    {"name":"JavaScript", "val":4, "t":6*Math.PI/8, "frameworks":"D3js<br>Plotly<br>Leaflet<br>JQuery"},
    {"name":"R", "val":5, "t":8*Math.PI/8, "frameworks":"Tidyverse<br>RPart<br>RandomForest<br>Cluster<br>RMD"},
    {"name":"Rust", "val":2, "t":10*Math.PI/8, "frameworks":"NA"},
    {"name":"SQL", "val":4, "t":12*Math.PI/8, "frameworks":"MySQL<br>PostgreSQL<br>SQL Server<br>MariaDB<br>MongoDB"},
    {"name":"Spark", "val":4, "t":14*Math.PI/8, "frameworks":"NA"},
    {"name":"python", "val":5, "t": 2*Math.PI, "frameworks":"NA"}
];

let lineGen = d3.line()
                .x(d => cx + d.val/5 * r * Math.cos(d.t))
                .y(d => cy + d.val/5 * r * Math.sin(d.t));

const centers = [
    {"name":"Python", "val":0, "t": 0},
    {"name":"Java", "val":0, "t":2*Math.PI/8},
    {"name":"HTML/CSS", "val":0, "t":4*Math.PI/8},
    {"name":"JavaScript", "val":0, "t":6*Math.PI/8},
    {"name":"R", "val":0, "t":8*Math.PI/8},
    {"name":"Rust", "val":0, "t":10*Math.PI/8},
    {"name":"SQL", "val":0, "t":12*Math.PI/8},
    {"name":"Spark", "val":0, "t":14*Math.PI/8},
    {"name":"python", "val":0, "t": 2*Math.PI}
];

let pth = linegroup.append("path")
         .attr("fill","blue")
         .attr("fill-opacity","0.15")
         .attr("stroke","black")
         .attr("d",lineGen(centers))


pth.transition()
    .duration(1000)
    .attr("d",lineGen(langs));
const langs2 = langs.slice(0,8);

let txtGroup = svg.selectAll("text")
                 .data(langs2)
                 .enter()
                 .append("text")
                 .text(d => d.name)
                 .attr("x",d => cx + r * Math.cos(d.t)+"px")
                 .attr("y",d => cy + r * Math.sin(d.t)+"px")
                 .attr("text-anchor", d=>{
                    if(Math.abs(cx + r * Math.cos(d.t) - cx) < 1){
                        // console.log("center")
                        return "middle"
                    }
                    if(cx+r * Math.cos(d.t) < cx){

                        return "end"
                    } else{
                        return "start"
                    }
                 })
                 .attr("dominant-baseline", d=>{

                    if(Math.abs(cy + r * Math.sin(d.t) - cy) < 2){
                        // console.log("center")
                        return "central"
                    } 
                    if(cy + r * Math.sin(d.t) > cy){

                        return "hanging"
                    } 
                    else{
                        return "auto"
                    }
                 });

var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
    return (`<strong>Frameworks</strong><hr>${d.frameworks}`);
});
         
chartgroup.call(toolTip)
txtGroup.on("mouseover", function(d) {
    toolTip.show(d, this);
})
txtGroup.on("mouseout", function(d) {
    toolTip.hide(d, this);
})
