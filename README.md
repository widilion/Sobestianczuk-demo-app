Creator: Piotr Maciej Sobestiańczuk

Using:
* Vue.js
* TypeScript
* JavaScript
* Pinia
* Vue-router
* Axios
* Vitest

Description:
App done by myself in Vue.js and TypeScript.
Using vue-router and Pinia store.
Also using axios for http requests.
Unit testing done in Vitest.

App is showing products from reqres.in rest API paginated by 5 items on a single page.
Color of table rows is taken from every product details.
You can search products by ID (only digits are accepted in the search field).
When you click on a specific row you are shown full product details.
There is an error modal when request had 5XX or 4XX errors.
Clicking on the logo takes you back to the first page.
Query is saved in the query params in the URL, you can copy and paste it to another tab or browser.
