
my node js version : 20.12.2

tip: use nvm for node js version manager

you need to run nvm install 20.12.2 to install this node version

1. CLIENT DOCS


  - Initial setup for client 

    make sure your npm is available

    1. Run npm install --save (this is for install all the required packages in package.json)
    2. make sure you copy the env.example as .env with this command : cp .env.example .env
    3. then run this command : npm run dev

    External Dependencies :

    1. npm install -D tailwindcss postcss autoprefixer
    2. npm i jwt-decode --save
    3. npm i zustand --save
    4. npm i --save react-query
    5. npm i --save axios
    6. npm i --save react-router-dom
    7. npm i --save remixicon
    8. npm i --save lodash.debounce
    9. npm i --save react-loading

    Build command : npm run build

2. SERVER DOCS

  - Initial setup for server 

    You need to install nestjs cli first, you can run this command : 

    npm i -g @nestjs/cli

    1. After that you need to run npm install --save
    2. make sure you copy the env.example as .env
    3. then run this command : npm run start:dev

    External Dependencies :

    1. npm i --save @nestjs-modules/mailer
    2. npm i --save @nestjs/config
    3. npm i --save @nestjs/jwt
    4. npm i --save @nestjs/swagger
    5. npm install --save @nestjs/typeorm typeorm mysql2
    6. npm i -D @types/bcrypt
    7. npm i --save class-validator class-transformer
    8. npm i --save ejs 
    9. npm i --save nodemailer
    10.  npm i --save @nestjs/throttler (rate limiting)

    Build command : npm run build

    run project : npm run start:dev

    api docs url : http://localhost:8080/docs