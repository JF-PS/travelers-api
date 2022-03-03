const userRoute = (express: any, controller: any) => {
  const router = express.Router();

  router.post("/signin", controller.signIn);

  router.post("/signup", controller.signUp);

  router.put("/validate/:token", controller.validate);

  return router;
};

export default userRoute;
