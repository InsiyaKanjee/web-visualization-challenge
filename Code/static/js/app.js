
// Fetch the JSON data and console log it
function PlotData(useId) {
  console.log('id',useId);
    d3.json("samples.json").then(function (dataload) {
      //get only samples from full data
        var samples = dataload.samples;
      //filter appropriate data 
        var useData = samples.filter(s => s.id == useId);
        console.log('sample data', samples);
        console.log('use data', useData);
        var otuIds = useData[0].otu_ids;
        console.log('OTU IDs First ID', otuIds);
        var sampleValues = useData[0].sample_values;
        console.log('Sample Values First ID', sampleValues);
        var sampleLabels = useData[0].otu_labels;
        console.log('Otu Labels First ID', sampleLabels);
        // after investigation, the sample values look sorted in descending order
        var topOtu = otuIds.slice(0, 10).reverse();
        var topOtu = topOtu.map(nummap => "OTU " + nummap);
        console.log('Top 10 OTU IDs First ID', topOtu);
        var topSampleValues = sampleValues.slice(0, 10).reverse();
        console.log('Top 10 Sample Values First ID', topSampleValues);
        var topSampleLabels = sampleLabels.slice(0, 10).reverse();
        console.log('Top 10 OTU Labels First ID', topSampleLabels);

        //horizontal bar chart
        var trace1 = {
            y: topOtu,
            x: topSampleValues,
            text: topSampleLabels,
            marker: {
              color: 'darkmagenta',
              width: 1
            },
            type: "bar",
            orientation: "h"

        };
        var data = [trace1];

        var layout = {
            title: {
              text:'Top 10 OTU by Sample Values' , font: { size: 24 },
            }
        };

        Plotly.newPlot("bar", data, layout);

        //bubble chart
        var trace2 = {
            x: otuIds,
            y: sampleValues,
            text: sampleLabels,
            mode: 'markers',
            marker: {
                color: otuIds,
                opacity: otuIds,
                size: sampleValues
            }
        };

        var data2 = [trace2];

        var layout = {
            title: {
              text:'All OTU by Sample Values' , font: { size: 24 },
            },
            xaxis: {
              title: {
                text: 'OTU ID',
              },
            },
            yaxis: {
              title: {
                text: 'Sample Values'
              }
            }
          };

    Plotly.newPlot('bubble', data2, layout);

    console.log('metadata, 1st ID', dataload.metadata[0]);

    //metadata for that ID
    var metaData=dataload.metadata;
    //filter appropriate data 
    var useMetaData = metaData.filter(m => m.id == useId);
    useMetaData = useMetaData[0];
    //select panel
    var metaDataPanel= d3.select("#sample-metadata");
    metaDataPanel.html("");
    Object.entries(useMetaData).forEach((key) => {   
      metaDataPanel.append("h5").text(key[0] + ": " + key[1] + "\n");    
  });
    console.log('metaDataUse', useMetaData);
    var wfreq = useMetaData.wfreq;
    var data3 = [
      {
        type: "indicator",
        mode: "gauge+number",
        value: wfreq,
        title: { text: "Scrubs Per Week"},
        gauge: {
          axis: { range: [null, 9], tickwidth: 1, tickcolor: "indigo" },
          bar: { color: "indigo" },
          // bgcolor: "white",
          borderwidth: 0,
          // bordercolor: "black",
          steps: [
            { range: [0, 1], color: "lavender" },
            { range: [1, 2], color: "thistle" },
            { range: [2, 3], color: "plum" },
            { range: [3, 4], color: "orchid" },
            { range: [4, 5], color: "violet" },
            { range: [5, 6], color: "mediumorchid" },
            { range: [6, 7], color: "darkorchid" },
            { range: [7, 8], color: "darkviolet" },
            { range: [8, 9], color: "darkmagenta" }
          ]
        }
      }
    ];
    
    var layout3 = {
      title: { text: "Belly Button Washing Frequency", font: { size: 24 }}
      // width: 500,
      // height: 400,
      // margin: { t: 25, r: 25, l: 25, b: 25 },
      // // paper_bgcolor: "lavender",
      // font: { color: "indigo", family: "Arial" }
    };
    
    Plotly.newPlot('gauge', data3, layout3);


});
};

function LoadPage(){
      //select dropdown
      var dropdwon= d3.select("#selDataset");
      d3.json("samples.json").then(function (dataload) {
        dataload.names.forEach(function(name){
          dropdwon.append("option").text(name).property("value");
        });
        PlotData(dataload.names[0]);  
      });
};
function optionChanged(useId) {
  PlotData(useId);
};

LoadPage();

