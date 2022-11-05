FROM node:14-alpine

WORKDIR /app

COPY ./package.json ./

RUN npm install

COPY . .

EXPOSE 9000

# ENV NODE_ENV = development
# ENV MONGO_ATLAS_PW = wHJZXoermTUGyShc
# ENV JWT_KEY = is0tra1vas9ka9aska5
# ENV SECRETKEY = @@prayat8@@
# ENV CLIENT_ID = 238642986131-cmip2e3g1sjvkp8agi5q02g93if983si.apps.googleusercontent.com
# ENV CLIENT_SECRET = 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
# ENV ACCESS_TOKEN = ya29.A0AVA9y1vHg7tWXZ_j50ctepVRACsohcTdMENJCBsrfBYKdgwOHFnWFyi9tD3o4eAAUv1lRJsqfh2hue6bCGjuJGUcEP_GpbYEBiWNUJbOKViQ3zylq78q4qvvbZeNSTvvkRqS5LuOhzyMovVZ3_t6XBdQNaFoaCgYKATASATASFQE65dr8zDOJ8pm-GF31B09r7glQSQ0163
# ENV USEREMAIL = calup.connect@gmail.com
# ENV PASSWORD =  ovjtclzkmtzekxus
# ENV JWT_EMAIL_CONFIRMATION_KEY = darlin@5991

CMD ["npm","run","start"]