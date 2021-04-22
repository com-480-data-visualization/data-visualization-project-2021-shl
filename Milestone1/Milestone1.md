## Milestone 1

### Dataset ###

We found this datasets on [kaggle](https://www.kaggle.com/michau96/restaurant-business-rankings-2020). You could also find the datasets we used in [dataset](../dataset/) file.

These datasets represent a ranking of the top restaurants in 2020 based on their sales in the USA. They are split into 3 different datasets, The top 250 best restaurants, the top 100 best restaurants among the independent ones and the predicted top 50 of restaurants. We choose to use 2 datasets -  the top 250 best restaurants, the top 100 best restaurants among the independent ones  in our project. They give all kinds of information about the restaurant like their ranking, their sales, their location, their year on year sales increase, type of food served and so on.

For this particular task of a project like this, these datasets are great as they do not require much preprocessing or data cleaning in order to fit our project. The main task will be to find a way to use the data together, come up with an interesting story and visualize it in an enthusiastic way.

### Problematic ###

**Motivation**

As we all love food and are wondering about the impact of covid-19 on the restaurant. We wanted to show the impact on the sales from the year 2019 to 2020 on the restaurant, as everything was closed, whether the sale from all the restaurants would drop or if some big one would still have a stable or even an increase in sales. We had multiple ideas on how to represent it.

**Visualization Ideas**

For Top 100 independent Ranking List
- We could show the sales of restaurants by taking the logo of the ones with the best increase and the one with the worst increase and proportionally increase or decrease the size of the logo. - We will represent it using some kind of interactive charts, when the mouse hover it the concret number will be shown.
- We could also visualize our data on a map and show what kind of region has the best ranked restaurants, most number of restaurants or maybe a different kind of food.

For Top 250 Best Ranked Restaurant
- We have the information about what kind of food is served and that could be really nice to show what kind of food is the most popular or what kind of food became more popular because of the pandemic, as we could guess it should be fast food for the take away options. Here a nice way to show it could be through some small image representing the kind of food and the most popular it is the biggest it get or using an interactive pie chart that would change depending on what we chose, for example if we want the best ranked kind of food or the kind of food that got the bigger increase in sales.
- It could also be interesting to show the impact of covid on the number of premises. What kind of restaurant has to close some premises or maybe build new ones. Also show if the best ranked restaurant also has the highest number of premises or not.

**Target audience**

The audience for this project would be those food lovers, either like us who are curious about what are the best ranked restaurants and what are the popular cuisines, and maybe also  the impact of covid-19 on the restaurant; or could be someone wishing to start a restaurant, they would find our website useful to see what kind of food works and where it works in the USA.


### Exploratory Data Analysis ###

Please find the detalied exploratory data analysis in the [ipynb](EDA.ipynb) file.

Here are the first row of the dataset representing the top 250 and top 100 restaurants, with different kind of information on their sales, type of food, location and more. We decided to focus more on those two dataset and not on the one about the future 50 best restaurant as we can already do a lot with those two but if we got some time and great ideas we might also use this dataset.

Here is the Top 100 restaurant Dataset:

**![ScreenShot](../image/top100.PNG?raw=true)**

Here is the Top 250 restaurant Dataset:

**![ScreenShot](../image/top250.PNG?raw=true)**

The different type of food for the top 250:

**![ScreenShot](../image/250FoodType.PNG?raw=true)**

The location of the top 100 restaurant:

**![ScreenShot](../image/100Location.PNG?raw=true)**

The sales for the top 250:

**![ScreenShot](../image/250Sales.PNG?raw=true)**

The sales for the top 100:

**![ScreenShot](../image/100Sales.PNG?raw=true)**


### Related work ###
**Others work with this data**

There are many people who have already explored the data in a more statistical way, for example showing the correlation of each factor and the histogram of pizza sales.

![Correlation with sales](https://user-images.githubusercontent.com/32882147/115751621-a516f100-a399-11eb-8e71-467f7abf8b19.png)

Correlation With sales

![Most Ordered Type of Food](https://user-images.githubusercontent.com/32882147/115751856-dbed0700-a399-11eb-9ec4-b79f2fc4b7c7.png)

![Pizza Sales Top Restaurants](https://user-images.githubusercontent.com/32882147/115751999-faeb9900-a399-11eb-978d-857eb9ffa415.png)


**Our approach**

We will not only show numbers and plots, our website will combine those plots we made and the finding behind it into a story, so that we will convey the information to our target audience in an enthusiastic way. More specifically, we will not only show our plot with interaction, but also design related logos for food and restaurants, so that it is straightforward and pleasant for our audiences.  

**Inspiration**

- Report about restaurants
(https://brandongaille.com/33-awesome-restaurant-industry-statistics-and-facts/)

![Restaurant-Industry-Statistics1](https://user-images.githubusercontent.com/32882147/115752524-78afa480-a39a-11eb-9333-7842a7beb7db.jpg)

We really like their graphic design, where the data and pictures suit each other and let the audience understand their purpose and information immediately. But their report below has less interaction with this visualization, we would like to fix those issues on our website.

- Fast food statistic

![fast food](https://user-images.githubusercontent.com/32882147/115752552-7ea58580-a39a-11eb-8a6a-a651d5755ebb.jpg)

Here they used one page including the statistic information showing them in multiple ways like map, bar chart, pie chart. What's more, they used food icons and nice designs which make us even feel hungry.

- America’s Favorite Fast Food(snopes.com/fact-check/americas-favorite-fast-food/)

![ezgif com-gif-maker](https://user-images.githubusercontent.com/32882147/115754569-9d0c8080-a39c-11eb-9580-3ca5f2390584.jpg)


This map looks really funny but it is not based on real data, it is a prank by Barstool Sports, but the visualization way did inspire us to show the distribution of restaurants in the USA with map.

With our clean dataset and lots of inspiration, we are looking forward to making further steps and excited about the results.
