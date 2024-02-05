<picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://forthebadge.com/images/logo.svg">
   <source media="(prefers-color-scheme: light)" srcset="https://forthebadge.com/images/logo_black.svg">
   <img alt="forthebadge logo" src="https://forthebadge.com/images/logo.svg" style="max-width: 100%; height: auto;">
</picture>

## For standard users

To explore our unique collection and generate badges, simply visit [our official website](https://forthebadge.com). Our site is designed to enrich your experience with an array of features and services, all dedicated to badges.

## For advanced users

We have open-sourced our badge generator so you can self-host and run our classic generator! It all started with our obsession for badges, and it ends with badges for badges' sake.

### Running Locally

To run the For the Badge Generator on your local computer, follow these simple steps:

1. Clone the repository:

   ```
   git clone https://github.com/forthebadge/for-the-badge.git
   cd for-the-badge
   ```

2. Install the project dependencies using npm:

   ```
   npm install
   ```

3. Start the local server using Vite:

   ```
   npx vite
   ```

4. Your badge generator will be available at `http://localhost:5173`. You can access it through your web browser.

5. To build the project for production:
   ```
   npx vite build
   ```

### Using Docker

You can also run the For the Badge Badge Generator using Docker. Here are the steps:

1. Build and run the Docker image:

   ```
   docker build -t for-the-badge .
   docker run -p 8080:8080 for-the-badge
   ```

2. Your badge generator will be available at `http://localhost:8080`.

### Want to Contribute?

Contributions are welcome and keep this project going! If you'd like to contribute, please fork the repository, make your changes, and submit a pull request. Your contributions may be featured on our official site!

## License

This project is licensed under the GNU General Public License v3.0 - see the [COPYING](https://github.com/forthebadge/for-the-badge/blob/master/COPYING) file for details.
