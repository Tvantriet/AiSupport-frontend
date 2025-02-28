FROM node:22-alpine

ARG CI_COMMIT_REF_SLUG
ARG APP_DIR

WORKDIR /app

RUN apk update && apk add git

COPY $APP_DIR/.npmrc* ./
COPY $APP_DIR/package*.json ./
RUN npm install
COPY $APP_DIR .

#RUN npm run build --if-present
#RUN npm run lwg-build --if-present

CMD [ "npm", "run", "dev" ]
