**Milestone Project 2: Interactive Frontend Development - Code Institute**

# League Lore

A website for users to find more information about champions in League of Legends. The site is designed for beginner and returning players 
to get basic information on any champion in the game.  There is an option for different languages to allow for a larger variety 
of users.

# Demo

![Responsive-Mockup](https://github.com/bob134552/LeagueLore/blob/master/assets/images/mockup/responsive_mockup.jpg)

A live version of the site can be found [here](https://bob134552.github.io/LeagueLore/). 

# UX

To make a responsive website that novice and returning League of Legends players can use to view information on champions within the game.

Balsamiq was used to create the following wireframe:

[Balsamiq Mobile and Desktop Wireframe](https://github.com/bob134552/LeagueLore/blob/master/assets/wireframe/LeagueLoreWF.pdf)

## The Strategy Plane

The objective is to create a site with the goal to let new and experienced players of League of Legends be able to view the base information
on the champions within the game. The immediate requirements are a search bar and language option for non-English speakers, a grid to display 
all current champions within the game and an information page that appears to display information on the selected champion along with a spotlight
video using the youtube API to search for the video.

## The Scope Plane

The website's requirement will be to allow as much choice to the user as possible. Therefore to acheive this a dropdown is available for the user to change language,
a search bar with autocomplete function for users to look for champions that they know the name of or part of the name, a grid that the user can browse available champions in the game
and a contact page where users can submit ideas on what else they would like to see on the site.

## The Structure Plane

The layout of the site would be a 2 page site; a champion page and contact page. Through these pages
the user will have access to a grid from which they can either use the search bar provide to find champions or
a particular champion they are looking for. On selection of a champion the grid would be cleared and filled with
information about the selected champion along with a youtube video of the champions spotlight (if available). 
There is also pagination available for mobile and tablet.

## The Skeleton Plane

The skeleton of the site was designed using Balsamiq and can be found in the link above (see UX section).

## The Surface Plane

The project is a 2 page site; a main page where the user is presented with a grid to choose a champion or a search bar to search
for a specific champion. While on the main page the user is able to click on the champions displayed and see more information
available for that champion. The second page is a contact page where users are able to submit future ideas on what could be changed
or added to the site.

The [Aquire Light font](https://befonts.com/aquire-free-font.html) is used for desktop to make the title more stylish and appeal more to
the user. If the font is not compatible for the device viewing the site, the font defaults to "Teko" is used with fantasy as backup.

## User Stories

- As a user, I want to be able to search for a specific champion or a champion that looks interesting.
- As a user, I want to be able to change language if I'm not a native English speaker.
- As a user, I want to be able to suggest changes that could be made to make the site more appealing in the future.
- As a user, I want the grid to be compact in mobile and tablet view to prevent having a large page.

# Features

The index page has 4 sections along with a navbar.

The sections are as follows:

- A section containing callout and site name.
- A section containing the champions grid.
- A section for the champion lore to be built in from the Riot API.
- A section for the champion spotlight video to be placed in from the Youtube API.

## Existing Features

The existing features are:

- Language selection that is remembered if page is refreshed.
- Search bar with autocomplete to display all names that match.
- Pagination for grid on mobile and tablet view to make it easier to use.
- Youtube video for selected champion (currently only available in English).
- Contact form to email site creator with site ideas and improvements.

## Features Left to Implement

- Youtube API search for other languages (search more than english riot games channel).
- Add in in-depth information for champion ability cooldowns and damage.
- Add in item builder and rune/ mastery information.
- Slideshow for each champions available skins.
- Add in recommended builds for champions.
- Sort by type of champion (mage, assassin etc.).

## Technologies Used

- [Javascript](https://en.wikipedia.org/wiki/JavaScript)
  - To create functions and get data from API and external JSONs.
- [Balsamiq](https://balsamiq.com/)
  - For a basic wireframe mockup.
- [HTML](https://en.wikipedia.org/wiki/HTML)
  - To create the site.
- [CSS](https://en.wikipedia.org/wiki/Cascading_Style_Sheets)
  - To create custom styles.
- [JQuery](https://jquery.com)
  - To simplify DOM manipulation.
- [Bootstrap](https://getbootstrap.com/)
  - For better responsiveness.
- [Font Awesome](https://fontawesome.com/)
  - To add icons to navbar.
- [Youtube API](https://developers.google.com/youtube/v3)
  - To search Youtube videos.
- [EmailJS](https://www.emailjs.com/)
  - To link contact page to google email account.
- [Riot API](https://developer.riotgames.com/docs/lol)
  - To obtain data on champions and search specific champions.

# Testing

The site was tested on several devices and browsers to ensure responsiveness throughout.

Friends and family were asked to test the site and give feedback on any bugs or possible changes.

Browsers: Chrome, Microsoft Edge and Safari

Devices included: Samsung Galaxy S10+, iPhone X, Samsung Galaxy Tab A, Desktop PC, iPad Pro and MacBook Air.

The custom font "Aquire Light" only works on desktop.

## Manual testing of elements on each page.

### Home page:

#### Navigation bar

1. Clicking on the site icon returns user to home page or resets grid if there is currently lore being displayed on a champion.
2. Clicking on the home icon acts the same as the site icon.
3. Clicking on the email icon takes the user to the contact page.

#### Language and Search bar

1. The default language is set to English.
2. Clicking on the dropdown allows the user to select a different language.
3. When new language is selected the grid is reloaded to match with the new language.
    - Refreshing the page or returning to the site remembers the new language if it was selected.
    - Newly selected language is displayed in the dropdown on refresh or return to site.
4. Searching for a champion shows autocomplete that contains all champions that begin with the text the user has input.
    - The more the champions name is fully written the less names are shown for auto complete.
    - Hitting enter builds the lore for the champions name that matches in alphabetical order (Anivia would be priority before Annie if search was just "An").
    - Clearing the input field removes the autocomplete elements.

#### Champion grid

1. Clicking on a icon builds the lore for selected champion.
2. On release of new champion to the game that champions icon is added to the grid.
3. On mobile and tablet the grid is reduced to showing 20 champions per page with pagination buttons at the bottom of the page.

#### Youtube Video

1. Video is available if Youtube API quota hasn't been met.
2. Video scales with window size.

### Contact page:

#### Navigation bar

1. Clicking on the site icon returns user to home page or resets grid if there is currently lore being displayed on a champion.
2. Clicking on the home icon acts the same as the site icon.
3. Clicking on the email icon takes the user to the contact page.

#### Email form

1. Leaving either name, email or the text section blank notifies user that the missing box is required.
2. After sending an email the form is cleared, the send button notifies the user their message has been sent and becomes unable to be clicked.

## Testing based on user stories.

### As a user, I want to be able to search for a specific champion or a champion that looks interesting.

1. Filling in search bar brings up an autocomplete dropdown underneath the search bar to help narrow down a search, hitting enter fades the grid 
and builds the champions lore and video section.
    1. Searching with a blank search bar returns a warning that it is required to be filled.
    2. Searching with a name that doesn't match notifies user underneath the search bar that there is no result.

2. Clicking on a champions image in the grid, fades the grid and builds the champions lore section and video section.

3. In mobile and tablet view the grid is reduced to 20 champions with pagination below the grid.
    1. Previous button is disabled on first page.
    2. Clicking on next button moves to next 20 champions until there are no more champions to display then next button becomes disabled.

### As a user, I want to be able to change language if I'm not a native English speaker.

1. Clicking on the dropdown next to the search bar brings up a list of available language options with English as default.
    1. Changing the language rebuilds the grid to display names in selected language.
    2. Refreshing the page remembers the newly selected language.
    3. Clicking on a champion builds the champions lore in the selected language.
        - Returning from the lore to grid remembers the selected language.

### As a user, I want to be able to voice my options on changes that could be made to make the site more appealing in the future.

1. Leaving either name, email or idea box empty notifies user that they are required to be able to send.
2. After submitting form user is notified that email has been sent as the send button becomes disabled and text changes to notify user that the email has been sent.
3. After submitting the form is cleared.

### As a user, I want the grid to be compact in mobile and tablet view to prevent having a large page.

1. Resizing screen to tablet size sets the amount of items to be displayed to 20 and adds in pagination buttons to move through available champions.

# Bugs and Problems

- Sometimes when resizing from a large screen to tablet/mobile, when the pagination buttons appear they are both disabled.
    - This can be fixed by refreshing the page.

- When searching using the search bar, if a champion is available and submitted then the error message appears regardless.
    - This is due to the searchChamp function searching through all names in the array of names.
    - This was fixed by adding in break to the if statement when true and adding a delay before the error message appeared to avoid seeing it during the fade in of the lore page.

- Limited quota for Youtube API.
    - Once quota for Youtube API requests is reached, a 403 error is thrown.
        - Added error function to ajax request for when 403 error is shown.

## Validaton and Beautify

The code for index.html, contact.html and style.css was beautified using [Code Beautify](https://codebeautify.org/).

In addition, [jshint](https://jshint.com/), [W3C CSS Validator](https://jigsaw.w3.org/css-validator/) and [W3C HTML Validator](https://validator.w3.org/#validate_by_input+with_options) was used to validate and check 
the code.

# Deployment

The project was deployed through Github pages, from the master branch. 

This was done by going to the "Settings" in the repository and scrolling to
the "GitHub Pages" section. At the "Source" option click the dropdown and select "Master Branch"
and the site should be published after the page refreshes. 

Additionally the site will be updated after any git push to the master branch.

### Forking the repository.

To fork the repository visit the [GitHub Repository](https://github.com/bob134552/LeagueLore) and above the "Settings" button(next to the star button)
click the  "Fork" button.

### How to clone the repo.

To run the site locally you can visit [here](https://github.com/bob134552/LeagueLore) and click on the "Code" drop down option,
you then copy the HTTPS code provided into a code editor of your choice by typing git clone followed by the HTTPS code you copied and pressing Enter.

Further information on cloning can be found on [GitHub docs](https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/cloning-a-repository).

# Credits

## Code

- Javascript code for autocomplete was originally taken from [W3Schools](https://www.w3schools.com/howto/howto_js_autocomplete.asp) example and edited.


## Content

Contents provided from the Riot games API and the Riot games youtube channel.

## Media

- Callout image obtained from google images, filtering by usage rights.
- Images obtained from Riot API.
- Videos from the Youtube API.

## Acknowledgements

- My mentor for feedback throughout the project.
- My wife for style suggestions and layout help.
- My parents for help with testing and grammar and spell checking.