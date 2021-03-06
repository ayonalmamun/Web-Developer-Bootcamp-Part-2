var express 	= require("express"),
	router 		= express.Router(),
	passport	= require("passport"),
	User		= require('../models/user');

router.get("/", function(req, res){
		
	res.render("home");
});

//auth routes
//show sign up form
router.get("/register", function(req, res){
	res.render("register");
});

router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/campgrounds");
		})
	});
});
//login routes
//show login form
router.get("/login", function(req, res){
	res.render("login");
});
//login logic
//passport.authenticate(middleware)
router.post("/login",passport.authenticate("local",{
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}) ,function(req, res){
});

//logout

router.get("/logout", function(req, res){
	req.logout();
	res.redirect("/");
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}	
	res.redirect("/login");
};
module.exports = router;