[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Tic-Tac-Toe

## Description

This project is a game of Tic Tac Toe - a simple game that takes seconds to learn and also seconds to master. I created a front-end client
to interact with an existing backend API.

My implementation can be viewed and played at https://acharliekelly.github.io/ttt-client/

## Technologies Used

List:
- HTML
- CSS/SCSS
- JavaScript
- jQuery
- Bootstrap
- AJAX


## History

### Planning
The one goal I had that I actually stuck to was making a single page app that behaved like a SPA - that is, the full page is visible at all times, rather than simulating a multi-page app by showing and hiding different views. The only exception is that my modal forms are hidden when not in use. (I tried storing them separate html snippet files when not in use, and inserting them via the jQuery $().load method - a clever technical work-around to the single-page limitation. However, it didn't actually solve any of my problems, and turned out to be more trouble than it was worth.)

And because I couldn't come up with a single theme, I had the idea of making themes something you could change within the app. I was thinking it would be one of many game options; more of an add-on than the main feature of the app. But the other play modes ended up being more complicated than I anticipated, so themes are ultimately what my app does best.

### Development Process
I started with a version of Tic-Tac-Toe that I made a few weeks ago, before I knew the full specs of the project. It's basically just the game without the API, so it allows 2 players at the same computer, without any logging in or saving games. I figured it would be a snap to stitch that together with the API, but I ended up going down a number of rabbit holes, and spent much longer than I feel like I should have.
The first issue was trying to re-use a single modal form for all the auhtentication requests. It seemed redundant to make multiple forms, so I spent a really long time on multiple different attempts to make all auth requests go through one form (including loading fields saved in HTML files stored elsewhere, as if that would be less redundant somehow).

Anyway, I stopped trying to take shortcuts yesterday (Tuesday) morning, and also gave up being overly concerned with elegance. I started just writing explicit handlers that referenced elements by ID, instead of using complicated systems of referencing classes and data attributes. The obtuseness of this approach pains me, but it's been a lot simpler since then.

### Strategy
I was trying to make things as modular as possible. I'm a big fan of OOP, but while I know ES6 allows for much more class-like code, I didn't feel comfortable enough trying to do it that way. So instead I tried to sort of mimic object encapsulation by exporting (public) or not exporting (private) variables and methods. I was also trying to keep each panel tied to it's own code, sort of like React. I was only somewhat successful. Mostly I followed MVC rules, which are essentially the same as I used with JSP-based web-apps: you keep the display code (UI) out of the controller and API areas. It's a little more complicated with the Node requirements about avoiding circular references, which I didn't have with J2EE, but mostly it's the same idea.

But I can't help feeling like my final product is lacking in the robustness department. There are too many details that are being controlled from too many different places. And it's too late to really do anything about it. There are some specific bugs that I'm aware of, but fixing them would mean tampering with too many discreet features for it to be worth the risk at this late stage. So, I guess it was a good learning experience.


## For future iterations
1. Better adherence to modularization, possibly with ES6 class model
2. Multi-player mode
3. AI (JS implementation of Minimax algorithm, which I started but never got around to completing)
4. More themes (because styling is something that can never be overdone, imho)
5. Also, theme structure could be DRY'd out - several style details are defined both in the Theme object and in the associated CSS, and then used in both places, which is just asking for conflicts


## User Stories
As a user, I want to be able to ...

1. Create an account
2. Log into my account
3. Play a game with someone who is standing next to me
4. Play a game with someone who is online
5. Play a game against a computer opponent
6. See my win/loss record against each type of opponent
7. Change my password
8. Log out of my account
9. Be unable to play without logging in (requirement)

## Wireframes
These are my original wireframes. The final product differs somewhat.
1. (../public/wireframes/signup.pdf "Sign Up")
2. (../public/wireframes/login.pdf "Log In")
3. (../public/wireframes/start-game.pdf "Start Game")
4. (../public/wireframes/2nd-move.pdf "2nd Move")
5. (../public/wireframes/game-options.pdf "Game Options")
6. (../public/wireframes/signed-out.pdf "Signed Out")
