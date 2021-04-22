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

- What others have already done with the data?
- Why is your approach original?
- What source of inspiration do you take? Visualizations that you found on other websites or magazines (might be unrelated to your data).
- In case you are using a dataset that you have already explored in another context (ML or ADA course, semester project...), you are required to share the report of that work to outline the differences with the submission for this class.
