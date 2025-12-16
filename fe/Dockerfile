ARG NODE_VERSION=22.14.0

FROM node:${NODE_VERSION}-alpine AS development

WORKDIR /home/node/app

COPY package.json .
COPY package-lock.json .

RUN chown -R node:node /home/node/app

USER node

RUN --mount=type=cache,target=/home/node/.npm

RUN npm install

COPY --chown=node:node . .

RUN npm run build

FROM nginx:alpine AS production

COPY --from=development /home/node/app/dist /usr/share/nginx/html

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
