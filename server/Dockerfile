FROM node:22-alpine
WORKDIR /app
COPY server/package.json ./package.json
COPY server/src ./src
EXPOSE 8787
CMD ["node", "--experimental-strip-types", "src/index.ts"]
