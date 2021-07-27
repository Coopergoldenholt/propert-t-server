require("dotenv").config();
const express = require("express");
const session = require("express-session");
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;
const path = require("path");
const { Storage } = require("@google-cloud/storage");
const massive = require("massive");
const userCtrl = require("./controllers/sessionController");
const companyCtrl = require("./controllers/companyController");
const postCtrl = require("./controllers/postController");
const customerCtrl = require("./controllers/customerController");
const projectCtrl = require("./controllers/projectController");
const authCtrl = require("./controllers/authorizationController");

const app = express();

const gc = new Storage({
	projectId: "landscaping-1596651165198",
	keyFilename: path.join(
		__dirname,
		"../landscaping-1596651165198-d20b30bb1c9f.json"
	),
});

gc.getBuckets().then((res) => console.log(res));

const bucket = gc.bucket("proper-t-images");

// gc.getBuckets().then((res) => console.log(res));

app.use(express.json({ limit: "100mb", extended: true }));
app.use(express.static("images"));

app.use(
	session({
		secret: SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
	})
);

//Authentication Calls
app.post("/api/login", userCtrl.loginUser);
app.post("/api/register", userCtrl.registerUser);
app.post("/api/signup", userCtrl.setUserPassword);
app.get("/api/companies/:id", companyCtrl.getManagedCompanies);
app.post("/api/user/logout", userCtrl.logoutUser);

//Admin Calls
app.get("/api/company/users", companyCtrl.getUsers);
app.get("/api/company/properties", companyCtrl.getProperties);

app.post("/api/company/properties", companyCtrl.addProperty);
app.post("/api/company/managing-company", companyCtrl.addManagedCompany);
app.put("/api/user/delete/:id", userCtrl.deleteUser);
app.put("/api/company/property/delete/:companyId", companyCtrl.deleteProperty);
app.put("/api/company/delete/:companyId", companyCtrl.deleteCompany);

//Post Calls
app.post("/api/company/post", postCtrl.savePost);
app.get("/api/company/property/:propertyId", postCtrl.getPropertyPosts);
app.get("/api/company/posts", postCtrl.getPosts);

//Project Calls
app.get("/api/projects", projectCtrl.getProjects);
app.get("/api/project/:id", projectCtrl.getProject);
app.post("/api/projects", projectCtrl.createProject);
app.post("/api/project/user", projectCtrl.addUserToProject);
app.get("/api/project/forms/:id", projectCtrl.getProjectForms);
app.get("/api/project/users/:id", projectCtrl.getUsersForProject);
app.put("/api/project/delete/:id", projectCtrl.deleteProject);

//Authorization Calls
app.post("/api/property/auth", authCtrl.setAuthByEmployee);

massive({
	connectionString: CONNECTION_STRING,
	ssl: { rejectUnauthorized: false },
}).then(async (db) => {
	await app.set("db", db);
	app.listen(SERVER_PORT, () => console.log(`${SERVER_PORT} is listening`));
});
