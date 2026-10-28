# Local tour manager

The manager lets you edit the home page and destinations, replace their photos, add or remove destinations, create tour pages, edit itineraries, and archive or restore tours. It does not use an online database or login. Changes are saved to files in this project on your computer.

## Open the manager

Start the local website, then visit `http://localhost:3000/manager`. Create a page with **New**, then add its itinerary. Use the preview to check the visitor-facing page layout. The existing Cold Desert itinerary is prefilled.

The manager saves tour pages, archive status, and expedition hero photo choices in `data/local-expeditions.json`; itinerary days are saved in `data/local-itineraries.json`; home and destination content is saved in `data/site-content.json`. Uploaded expedition photos are placed in `public/images/expeditions`, and uploaded home or destination photos are placed in `public/images/site`. Those files are part of the website project, so keep them when backing up or moving the project.

## Publish your changes

The manager works only on the local development site. When you are ready to publish, include the changed data files in your normal project commit and deploy the website. The deployed site will read those files and show the updated tour pages. The online manager itself is not enabled on the published site.

## Remove a tour page

Use **Remove page** to hide a tour from the public pages. It moves to **Archived expeditions**, where you can restore it. Removing a page from the manager does not delete its saved itinerary data.
