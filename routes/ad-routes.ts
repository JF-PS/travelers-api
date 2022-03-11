const adRoute = (express: any, controller: any) => {
  const router = express.Router();

  router.get("/:limit/:offset", controller.getAll);

  return router;
};

export default adRoute;
