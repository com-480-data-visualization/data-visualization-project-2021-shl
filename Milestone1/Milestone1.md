## Milestone 1

### Dataset ###

We found this datasets on [kaggle](https://www.kaggle.com/michau96/restaurant-business-rankings-2020). You could also find the datasets we used in [dataset](../dataset/) file.

This dataset represent a ranking of the top restaurant in 2020 based on their sales. It is split into 3 different datasets, The top 250 best restaurant, the top 100 best restaurant among the independent ones and the predicted top 50 of restaurants. We choose to use 2 datasets -  the top 250 best restaurant, the top 100 best restaurant among the independent ones  in our project. They give all kind of information about the restaurant lke their ranking, their sales, their location, their year on year sales increase, type of food served and more.

For this particular task of a project like this, thoses datasets are great as they do not require much preprocessing or data cleaning to be usable. The main task will be to find a way to use the data together and really show what is interesting about it.

### Problematic ###

Frame the general topic of your visualization and the main axis that you want to develop.

- What am I trying to show with my visualization?
- Think of an overview for the project, your motivation, and the target audience.

As we all love food and where wondering about the impact of covid-19 on the restaurant we wanted to show the impact on the sales from the year 2019 to 2020 on the restaurant if as everything was closed all the restaurant sales would drop or if some big one would still have a stable or even an increase in sales. We had multiple ideas on how to represent it but maybe their not all feasible but for example we could take the logo of the ones with the best increase and the one with the worst increase and proportionally increase or decrease the size of the logo. Or we will have to represent it using some kind of interactive charts.

Another interesting part is that for the top 250 best ranked restaurant we have the information about what kind of food is serve and that could be really nice to show what kind of food is the most popular or what kind of food became more popular because of the pandemic, as we could guess it should be fast food for the take away options. Here a nice way to show it could be through some small image represanting the kind of food and the most popular it is the biggest it get or using an interactive pie chart that would change depending on what we chose, for example if we want the best ranked kind of food or the kind of food that got the bigger increase in sales.

It could also be interesting to show the impact of covid on the number of premises. What kind of restaurant has to close some premises or maybe build new ones. Also show if the best ranked restaurant also have the highest number of premises or not.

We could also visualize our data on a map and show what kind of region has the best ranked restaurant or maybe a different kind of food.

The audience for this project would be pretty sparse, it could be either for curious food enthousiast like us that are curious about the impact of covid-19 on the restaurant and also what are the best ranked restaurant. Maybe someone wishing to start a restaurant could find our website useful to see what kind of food works and where it works.

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
