// const store = new MongoStore({
//     url: dbUrl,
//     secret: 'thisshouldbeabettersecret!',
//     touchAfter: 24 * 60 * 60
// });

// store.on("error",function(e) {
//     console.log("Session store error", e)
// })

// const sessionConfig = {
//     store,
//     name: 'session',
//     secret: 'thisshouldbeabettersecret!',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         httpOnly: true,
//         expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
//         maxAge: 1000 * 60 * 60 * 24 * 7
//     }
// }

// app.use(session(sessionConfig))
