# Project of Data Visualization (COM-480)

| Student's name | SCIPER |
| -------------- | ------ |
| Signer Loïc | 289076 |
| Jiang Shasha | 321733 |
| Sheng Haoyu | 321449 |


# Esport earning visualizations
Project for COM-480 Data Visualization Course at EPFL

## How to use it ?
That's really simple, you just need to go to our [website](https://com-480-data-visualization.github.io/data-visualization-project-2021-shl/website/), under the visualizations section and you'll be able to interact with multiple visualizations showing different aspects of the earnings in Esport.

## Dataset

- https://www.kaggle.com/rankirsh/esports-earnings

## Screencast

Have a look on our fancy [screencast](https://www.youtube.com/watch?v=UAp2G3y2WLw)!

## Milestones
**Milestone 1**:
see [here](Milestone1/Milestone1.md)

**Milestone 2**:
see [here](Milestone2/Milestone2.md)

**Milestone 3**:
see our [process book](Milestone3/ProcessBook.pdf)

Get an intial introduction to our website by viewing [screencast](https://www.youtube.com/watch?v=UAp2G3y2WLw)!!

[Go to our website !](https://com-480-data-visualization.github.io/data-visualization-project-2021-shl/website/)

## Project Structure

There are three files for Milestone 1, 2 and 3. The dataset file contains the original datasets we get from kaggle. Our website codes are in the file named "website". Except the Earned player part (the bubble chart), the scatter plot, bar race chart, the line chart and stacked bar chart all have accordingly embedded html which in the website folder.  Inside website folder, the assets folder contains css, js, data and vendor files. The vendor files contains those addtional libraries. The css files contains each page's according css styles. The js files contains d3.js codes. The data file contains those data we summarized from orginial datasets that used in our visualizations.

```console
├── Milestone1
│   ├── EDA.ipynb
│   └── Milestone1.md
├── Milestone2
│   ├── Milestone2.md
│   └── Milestone2_Report.pdf
├── Milestone3
│   └── ProcessBook.pdf
├── README.md
├── dataset
│   ├── GeneralEsportData.csv
│   └── HistoricalEsportData.csv
├── image
└── website
    ├── assets
    │   ├── css
    │   │   ├── barrace.css
    │   │   ├── linechart.css
    │   │   ├── scatter.css
    │   │   ├── stackbar.css
    │   │   └── style.css
    │   ├── data
    │   │   ├── GeneralEsportData.csv
    │   │   ├── HistoricalEsportData.csv
    │   │   ├── gamecategory.csv
    │   │   ├── tournament2.csv
    │   │   ├── tournaments_earnings.csv
    │   │   └── yearlyEarning.csv
    │   ├── img
    │   ├── js
    │   │   ├── barrace.js
    │   │   ├── circlePack.js
    │   │   ├── linechart.js
    │   │   ├── main.js
    │   │   ├── scatter.js
    │   │   ├── stackbar.js
    │   │   └── visuYear.json
    │   └── vendor

​    ├── forms    

​    ├── barrace.html
​    ├── index.html
​    ├── linechart.html
​    ├── scatter.html
​    └── stackbar.html
```
