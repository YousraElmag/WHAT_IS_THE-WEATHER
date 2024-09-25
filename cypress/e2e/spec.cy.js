
// navbar
describe('Weather App Basic Tests', () => {
  beforeEach(() => {
      // Visit the application URL
      cy.visit('http://localhost:5173'); // Change this to your application's URL
  });

  it('should display loading initially', () => {
      // Check if the loading text is displayed
      cy.contains('Loading...').should('be.visible');
  });

  it('should navigate to the home route and display the RanderWeather component', () => {
      // Wait for loading to complete
      cy.contains('Loading...').should('not.exist');
  });

  it('should allow searching for a city and navigate to the search route', () => {
      // Wait for loading to complete
      cy.contains('Loading...').should('not.exist');

      // Type in the search input and click the search button
      const query = 'London'; // Example city
      cy.get('input[placeholder="Enter city or country"]').type(query); // Adjust selector for the input
      cy.get('button').contains('Search').click(); // Click the Search button

      // Check that the Search component is displayed and URL is correct
      cy.url().should('include', '/search?query=London'); // Ensure URL is correct
       // Adjust this based on your Search component's output
  });

  it('should display 404 for unknown routes', () => {
      // Visit a non-existent route
      cy.visit('http://localhost:5173/non-existent-route'); // Change to any non-existent route

      // Check for 404 Not Found message
      cy.contains('404 Not Found').should('be.visible');
  });

  it('should navigate back to the home page from search', () => {
      // Search for a city to navigate to the search page
      const query = 'London';
      cy.get('input[placeholder="Enter city or country"]').type(query);
      cy.get('button').contains('Search').click();

      // Ensure we are on the search page
      cy.url().should('include', '/search?query=London');

      // Click the Home button
      cy.get('button').contains('Home').click();

      // Check that we are back on the home page
      cy.url().should('eq', 'http://localhost:5173/');
  });
});

//render

describe('RanderWeather Component Tests', () => {
  beforeEach(() => {
      // Visit the application URL where RenderWeather is accessible
      cy.visit('http://localhost:5173'); // Adjust if necessary
  });

  it('should display loading initially', () => {
      // Check if the loading message is displayed
      cy.contains('Loading...').should('be.visible');
  });

  it('should display weather data when loaded', () => {
      // Wait for loading to complete
      cy.contains('Loading...').should('not.exist');
  });




  
})

