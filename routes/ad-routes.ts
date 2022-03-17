const adRoute = (express: any, controller: any) => {
  const router = express.Router();

  router.post("/", controller.create);

  router.get("/:limit/:offset", controller.getAll);

  router.get("/:id", controller.getOne);

  return router;
};

export default adRoute;
