const passport = require("passport");
const local = require("passport-local");
const GitHubStrategy = require("passport-github2");
const userService = require("../models/user");
const {
    createHash,
    isValidPassword
} = require("../utils/index");
require("dotenv").config();

const LocalStrategy = local.Strategy;
const initializePassport = () => {
        //Logica de registro con passport:
        passport.use(
            "register",
            new LocalStrategy({
                    passReqToCallback: true,
                    usernameField: "email"
                },
                async (req, username, password, done) => {
                    const {
                        first_name,
                        last_name,
                        email,
                        age
                    } = req.body;
                    try {
                        let user = await userService.findOne({
                            email: username
                        });
                        if (user) {
                            console.log("Usuario ya existe");
                            return done(null, false);
                        }
                        const newUser = {
                            first_name,
                            last_name,
                            email,
                            age,
                            password: createHash(password),
                        };
                        let result = await userService.create(newUser);
                        return done(null, result);
                    } catch (error) {
                        return done("Error al obtener el usuario: " + error);
                    }
                }
            )
        );}
        //Logica para registrarse con GitHub:
passport.use(
    "github",
    new GitHubStrategy({
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_SECRET,
            callbackURL: process.env.GITHUB_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await userService.findOne({
                    email: profile._json.email
                });
                if (!user) {
                    let newUser = {
                        first_name: profile._json.name,
                        last_name: "",
                        age: 0,
                        email: profile._json.email,
                        password: "",
                    };
                    let result = await userService.create(newUser);
                    done(null, result);
                } else {
                    done(null, user);
                }
            } catch (error) {
                return done(error);
            }
        }
    )
);

  //Logica de login con passport:
passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (username, password, done) => {
      try {
        const user = await userService.findOne({
          email: username,
        });
        if (!user) {
          console.log("Usuario no existe");
          return done(null, false);
        }
        if (!isValidPassword(user, password)) return done(null, false);

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
  let user = await userService.findOne({
    email,
  });
  done(null, user);
});
module.exports = {
  initializePassport,
};
