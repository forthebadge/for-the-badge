<picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://forthebadge.com/images/logo.svg">
   <source media="(prefers-color-scheme: light)" srcset="https://forthebadge.com/images/logo_black.svg">
   <img alt="forthebadge logo" src="https://forthebadge.com/images/logo.svg" style="max-width: 100%; height: auto;">
</picture>

## For standard users

To explore our unique collection and generate badges, simply visit [our official website](https://forthebadge.com). Our site is designed to enrich your experience with an array of features and services, all dedicated to badges.

## For advanced users

We have open-sourced our badge generator so you can self-host and run our classic generator! It all started with our obsession for badges, and it ends with badges for badges' sake.

We have posted a tutorial on our youtube channel that walks through how to setup this project, [you can view it here](https://www.youtube.com/watch?v=fIKNEauzU-g)

### Running Locally

To run For the Badge on your local computer, follow these simple steps:

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

4. The badge generator will be available at `http://localhost:5173`. You can access it through your web browser.

5. To build the project for production:
   ```
   npx vite build
   ```

### Using Docker

You can run For the Badge using Docker in two different ways. Choose the method that best suits your needs:

#### Method 1: Pull and Run the Docker Image

Use this method if you want to quickly run the latest stable version of For the Badge without building it yourself.

1. Pull the Docker image from our repository:

   ```
   docker pull forthebadge/forthebadge
   ```

2. Run the Docker image:
   ```
   docker run -p 8080:8080 forthebadge/forthebadge
   ```

#### Method 2: Build and Run the Docker Image Yourself

This method is ideal if you have downloaded the source code and wish to build the Docker image yourself, perhaps for development or testing purposes.

1. Build the Docker image:

   ```
   docker build -t for-the-badge .
   ```

2. Run the Docker image:
   ```
   docker run -p 8080:8080 for-the-badge
   ```

Regardless of the method chosen, The badge generator will be available at `http://localhost:8080`. You can access it through your web browser.

### Want to Contribute?

Contributions are welcome and keep this project going! If you'd like to contribute, please fork the repository, make your changes, and submit a pull request. Your contributions may be featured on our official site!

## License

This project is licensed under the GNU General Public License v3.0 - see the [COPYING](https://github.com/forthebadge/for-the-badge/blob/master/COPYING) file for details.
