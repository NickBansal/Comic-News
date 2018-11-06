# Nick Bansal - ComicNews
## Front End React App

ComicNews is a news aggregation client demo I built in React.js during week nine of the Northcoders' Full Stack Developer Course.

This project largely showcases a lot of the skills I have learnt throughout my time at Northcoders including three weeks of front end ReactJS study and 9 weeks of Javascript intensive learning. Here you will find the following React subjects including:

* React DOM
* React Lifecycle
* React Routing
* Optimistic Rendering
* Error Handling
* This front end application interacts with the back end RESTful API. Details of the API may be found on Github: https://github.com/NickBansal/BE2-northcoders-news/.

## Using NC News
I have deployed my project on the following link using Heroku: https://evening-plains-23561.herokuapp.com/ for your viewing pleasure. Please feel free to browse the site.
I tried to make this project as fun as possible, so I decided to go for a Comic style application built into a Television. This site will include a lot of wacky features such as an on/off button for the TV and some fun buttons

## Functionality

### Logging in/Logging Out
I have tried to implement a fully usable Reddit style website including the capability of logging in and viewing a users profile. For demonstration purposes, 'tickle122' is entered into the log in form so you can view the site when signed in. An option to log out is also available form the 'Login' page.

### Home and Topic Routes
The home page is a simple design with a link to all the articles. On loading, the demo requests a list of the articles from the API. 

Topics and users are passed to the Navigation component in order to generate the menu which is located in the hamburger dropdown. On the topics menu you can navigate to all the articles from a certain topic and also view them individually.
There is also a User menu where you can view all the users information and acces each user to view all their respective articles and comments.


### Main Article Page
The main Articles component displays all articles and can be sorted by
* Created
* vote count
* comment count

Some more features of the main articles:
* Authorised users may vote articles up or down

Each article can also be accessed by clicking on the highlighted article

### Individual Article Routes

The Article component requests and displays an article based on the supplied route. It displays:

* the full article
* associated meta data:
  * author
  * publication date
  * image
  * topic
  * vote and comment counts
* comments associated with the article

Authorised users may:

* vote the article up or down
* vote comments up or down
* publish comments on the article
* delete their own comments

### New Article Page

This component allows an authorised user to publish a new article.
If there is no user logged in, you will not be able to access the new article form
After submitting, the new comment appears in the list

### Errors

Bad route errors result in the relevant 400/404 page.
API errors result in the API error status code and message being displayed to the user.
Avatar images are hosted externally and some URLs are out of date. The Avatar component includes an onError event handler that will replace missing images with a default avatar.

## Installing a Local Copy

These instructions will help you to get a copy of NC News up and running on your local machine for testing purposes.

### Installing

Please ensure you have Node.js installed, to check if node is installed please type the follwoing into your terminal.
```js
node -v
```

Duplicate or fork this repository from https://github.com/NickBansal/BE2-northcoders-news/

Inside this new directory, install the required NPM packages:

```js
npm install
```

### Run the application

To start the application, run this command in the CLI:

```js
npm start
```

If successful, your browser should open http://localhost:3000.

## Built With
* Node.js - JavaScript runtime built on Chrome's V8 JavaScript engine
* React.js - Facebook's JavaScript library for building user interfaces
* Axios - A promised based HTTP client (alternative to Fetch)
* CSS FlexBox

## Author
Nick Bansal - Northcoders Student - northcoders.com