# Use an offical node.js runtime as a parent image
FROM node:22-alpine


# Set the working Dir in the container
WORKDIR  /app



# Copy the package.json amnd the package-lock.json
COPY package*.json .


# Install the dependencies
RUN npm install

#Copy the rest of the application code
COPY . .


# Expose the PORT that the app run on
EXPOSE 5000

# Define the command to run appliucation
CMD ('node',"./src/server.js")


