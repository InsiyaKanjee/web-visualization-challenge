# Belly Button Biodiversity

In this repository, an interactive dashboard is built to explore the [Belly Button Biodiversity dataset](http://robdunnlab.com/projects/belly-button-biodiversity/), which catalogs the microbes that colonize human navels.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

## Step 1: Plotly

1. Used the D3 library to read in `samples.json`.

2. Created a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

3. Created a bubble chart that displays each sample.

4. Displayed the sample metadata, i.e., an individual's demographic information.

5. Displayed each key-value pair from the metadata JSON object somewhere on the page.

6. Updates all of the plots any time that a new sample is selected.

7. Created a gauge chart to plot the weekly washing frequency of the individual.

## Deployment

* Deployed app to GitHub Pages. Submit the links to your deployment and your GitHub repo.