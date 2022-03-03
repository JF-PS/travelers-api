const userRoute = (express: any, controller: any) => {
  const router = express.Router();

  router.post("/signin", controller.signIn);

  router.post("/signup", controller.signUp);

  return router;
};

export default userRoute;
