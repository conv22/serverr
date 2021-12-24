FROM node:16

# Create app directory
WORKDIR /conv22/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY yarn.lock ./
COPY package.json ./
COPY prisma ./prisma/

# INSTALL DEPS
RUN yarn install

COPY . .

EXPOSE 4000

# RUN THE APP
CMD ["yarn", "ts-node-dev", "./src/index.ts"]
