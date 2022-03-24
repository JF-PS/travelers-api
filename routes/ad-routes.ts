const adRoute = (express: any, controller: any) => {
  const router = express.Router();

  router.post("/", controller.create);

  router.get("/", controller.getAll);

  router.get("/:id", controller.getOne);

  router.delete("/:id", controller.deleteOne);

  router.put("/:id", controller.updateOne);

  return router;
};

export default adRoute;
